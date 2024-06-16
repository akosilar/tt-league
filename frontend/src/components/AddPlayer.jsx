import { useState, useEffect } from "react"

export default function AddPlayer({ onClose, onAddPlayer }) {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [rating, setRating] = useState('')
	const [email, setEmail] = useState('')
	const [emptyFields, setEmptyFields] = useState([])
	const [error, setError] = useState('')

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

	const handleSubmit = async (e) => {
		e.preventDefault()

		const player = { firstName, lastName, rating, email }

		const response = await fetch('/api/players', {
			method: 'POST',
			body: JSON.stringify(player),
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
			setEmail('')
			setRating('')
			setError(null)
			setEmptyFields([])
			console.log('new player added', json)
			onAddPlayer(json)
			onClose()
		}
	}
	return (
		<>
			{/* Add user modal */}
			<div
				id="editUserModal"
				tabIndex={-1}
				aria-hidden="true"
				className="fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
			>
				<div className="relative w-full max-w-2xl max-h-full">
					{/* Modal content */}
					<form className="relative bg-white rounded-lg shadow dark:bg-gray-700" onSubmit={handleSubmit}>
						{/* Modal header */}
						<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								Add player
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
										name="first-name"
										id="first-name"
										className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${emptyFields.includes('firstName') ? 'border-solid border-red-700' : ''}`}
										placeholder="Bonnie"
										required=""
										value={firstName}
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
										name="last-name"
										id="last-name"
										className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${emptyFields.includes('lastName') ? 'border-solid border-red-700' : ''}`}
										placeholder="Green"
										required=""
										value={lastName}
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
										name="email"
										id="email"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="example@company.com"
										required=""
										value={email}
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
								{/*
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="department"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Department
									</label>
									<input
										type="text"
										name="department"
										id="department"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Development"
										required=""
									/>
								</div>
								*/}
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
										name="rating"
										id="rating"
										className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${emptyFields.includes('rating') ? 'border-solid border-red-700' : ''}`}
										placeholder={1300}
										required=""
										value={rating}
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
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Save
							</button>
						</div>
						{error && <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}
					</form>
				</div>
			</div>
		</>
	)
}
