import Navbar from '../components/Navbar';

//hooks
import {useLocation} from 'react-router-dom';

export default function ConfirmGroups() {
    const location = useLocation();
    const {checkedPlayers} = location.state || {checkedPlayers: []};

    return (<div> 
        <Navbar />
        creating groups
        <ul>
            {checkedPlayers.map((playerId, index) => (
                <li key={index}>{playerId}</li>
            ))}
        </ul>

        {/*todo here this will post to database*/}
        <button className="border border-black px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md" >Confirm matches</button>
        </div>);
}