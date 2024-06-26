import ToggleDarkMode from '../components/ToggleDarkMode.jsx';
const Navbar = () => {

    function handleClick() {
        if (localStorage.theme === "dark" || !("theme" in localStorage)) {
            //add class=dark in html element
            document.documentElement.classList.add("dark");
        } else {
            //remove class=dark in html element
            document.documentElement.classList.remove("dark");
        }

        if (localStorage.theme === "dark") {
            localStorage.theme = "light";
        } else {
            localStorage.theme = "dark";
        }
    }

    return (<div className="flex justify-center space-x-4">
        <a href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 me-2 mt-2">Home</a>
        <a href="/ManagePlayers" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 me-2 mt-2">Manage Players</a>
        <a href="/CreateGroups" className="relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 me-2 mt-2">New Matches </a>
        <ToggleDarkMode onClick={handleClick} />

    </div>);
}

export default Navbar;
