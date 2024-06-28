import Navbar from '../components/Navbar';

//hooks
import {useLocation} from 'react-router-dom';
function confirmMatches(){
   //clear out local storage of selected players
   console.log("clearing local storage");
   localStorage.removeItem('checkedPlayers');
}

export default function ConfirmGroups() {
    const location = useLocation();
    const {checkedPlayers} = location.state || {checkedPlayers: []};

    return (<div> 
        <Navbar />
        creating groups
        <ul>
            {checkedPlayers.map(player => (
                <li key={player._id}>
                    <p>ID: {player._id}</p>
                    <p>name: {player.firstName} {player.lastName}</p>
                    <p>rating: {player.rating}</p>
                </li>
            ))}
        </ul>

        {/*todo here this will post to database*/}
        <button className="border border-black px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md" onClick = {confirmMatches}>Confirm matches</button>
        </div>);
}