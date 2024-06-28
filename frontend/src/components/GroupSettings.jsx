//bar at the top of creating groups page so you can set preferred group size, date etc 

export default function GroupSettings( { selectedGS, onGSChange }) {
    const handleGSChange = (e) => {
        onGSChange(e.target.value);
    };
    
    return(
        /*blue box*/
        <div className="bg-blue-500 text-white p-4 mb-4 mt-4 flex flex-row">
            {/*preferred group size selector*/}
            <div className="flex flex-col items-start mb-4 mr-4">
            <label htmlFor="size" className="mb-2 text-white-1100">
                Group Size:
            </label>
            <select
                id="size"
                name="size"
                value={selectedGS}
                onChange = {handleGSChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue = "5"
            >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
            </div>

            {/*date selector*/}
            <div className="flex flex-col items-start mb-4">
            <label htmlFor="date" className="mb-2 text-white-1100">
                Date: (todo)
            </label>
            <select></select>
            </div>
       
        </div>);
}