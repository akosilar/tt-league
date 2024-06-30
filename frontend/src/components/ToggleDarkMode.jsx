export default function ToggleDarkMode({ onClick }) {
	return (
		<div className="bg-white dark:bg-gray-900  w-full justify-end flex flex-row items-center">
			<div className="flex flex-row justify-between toggle">
				<label htmlFor="dark-toggle" className="flex items-center cursor-pointer">
					<div className="relative">
						<input type="checkbox" name="dark-mode" id="dark-toggle" className="checkbox hidden" onClick={onClick} />
						<div className="block border-[1px] dark:border-white border-gray-900 w-14 h-8 rounded-full"></div>
						<div className="dot absolute left-1 top-1 dark:bg-white bg-gray-800 w-6 h-6 rounded-full transition"></div>
					</div>
					<div className="ml-3 dark:text-white text-gray-900 font-medium">
						Dark Mode
					</div>
				</label>
			</div>
		</div>
	)
}
