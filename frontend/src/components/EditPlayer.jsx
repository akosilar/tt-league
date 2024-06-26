import { useState, useEffect } from "react"
export default function EditPlayer({ onClose, player, onUpdatePlayer, onDeletePlayer }) {
	const [firstName, setFirstName] = useState(player.firstName || '')
	const [lastName, setLastName] = useState(player.lastName || '')
	const [rating, setRating] = useState(player.rating || '')
	const [email, setEmail] = useState(player.email || '')
	const [emptyFields, setEmptyFields] = useState([])
	const [error, setError] = useState('')
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);

	useEffect(() => {
		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [onClose]);

	const handleSave = async (e) => {
		e.preventDefault();

		const editedPlayer = { firstName, lastName, rating, email }


		const response = await fetch(`/api/players/${player._id}`, {
			method: 'PATCH',
			body: JSON.stringify(editedPlayer),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const json = await response.json()

		if (!response.ok) {
			setError(json.error)
			setEmptyFields(json.error || [])
		}
		if (response.ok) {
			setFirstName('')
			setLastName('')
			setRating('')
			setEmail('')
			setEmptyFields('')
			setError(null)
			console.log('player updated', json)
			onUpdatePlayer({ ...player, firstName, lastName, rating, email });
			onClose();

		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();

		const response = await fetch(`/api/players/${player._id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})


		if (response.ok) {
			console.log('player deleted')
			onDeletePlayer(player._id)
			onClose()
		} else {
			const json = await response.json()
			setError(json.error)
		}
	}
	return (
		<>
			{/* Edit user modal */}
			<div
				id="editUserModal"
				tabIndex={-1}
				aria-hidden="true"
				className="fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
			>
				<div className="relative w-full max-w-2xl max-h-full">
					{/* Modal content */}
					<form className="relative bg-white rounded-lg shadow dark:bg-gray-700" onSubmit={handleSave}>
						{/* Modal header */}
						<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								Edit user
							</h3>
							<button
								onClick={onClose}
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-hide="editUserModal"
							>
								<svg
									className="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						{/* Modal body */}
						<div className="p-6 space-y-6">
							<div className="grid grid-cols-6 gap-6">
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="first-name"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										First Name
									</label>
									<input
										type="text"
										onChange={(e) => setFirstName(e.target.value)}
										value={firstName}
										name="first-name"
										id="first-name"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Bonnie"
										required=""
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="last-name"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Last Name
									</label>
									<input
										type="text"
										onChange={(e) => setLastName(e.target.value)}
										value={lastName}
										name="last-name"
										id="last-name"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Green"
										required=""
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Email
									</label>
									<input
										type="email"
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										name="email"
										id="email"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="example@company.com"
										required=""
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="phone-number"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Phone Number
									</label>
									<input
										type="number"
										name="phone-number"
										id="phone-number"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="e.g. +(12)3456 789"
										required=""
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="rating"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Rating
									</label>
									<input
										type="number"
										onChange={(e) => setRating(e.target.value)}
										value={rating}
										name="rating"
										id="rating"
										className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
										placeholder={1300}
										required=""
									/>
								</div>
								{/*
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="current-password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Current Password
									</label>
									<input
										type="password"
										name="current-password"
										id="current-password"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="••••••••"
										required=""
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="new-password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										New Password
									</label>
									<input
										type="password"
										name="new-password"
										id="new-password"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="••••••••"
										required=""
									/>
								</div>
								*/}
							</div>
						</div>
						{/* Modal footer */}
						<div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								type="button"
								onClick={() => setShowConfirmDelete(true)}
								className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Delete
							</button>
							<button
								type="submit"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Save all
							</button>

						</div>
					</form>
				</div>
			</div>

			{showConfirmDelete && (
				<div
					className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-800 bg-opacity-50"
					tabIndex={-1}
					aria-hidden="true"
				>
					<div className="relative w-full max-w-md max-h-full">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
									Confirm Deletion
								</h3>
								<button
									onClick={() => setShowConfirmDelete(false)}
									type="button"
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								>
									<svg
										className="w-3 h-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 14"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
									<span className="sr-only">Close modal</span>
								</button>
							</div>
							<div className="p-6 space-y-6">
								<p className="text-sm text-gray-900 dark:text-white">
									Are you sure you want to delete this player?
								</p>
							</div>
							<div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
								<button
									onClick={handleDelete}
									className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									Yes, Delete
								</button>
								<button
									onClick={() => setShowConfirmDelete(false)}
									className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 border border-gray-300 rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
