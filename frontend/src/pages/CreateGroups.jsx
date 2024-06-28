import Navbar from '../components/Navbar';
import { useState } from 'react';
import Players from '../components/Players';
import GroupSettings from '../components/GroupSettings';
import { usePlayers } from '../contexts/PlayersContext.jsx';
import { useNavigate } from 'react-router-dom';
export default function CreateGroups() {

    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState('5');
    const { checkedPlayers } = usePlayers();

    const handleGSChange = (size) => {
        setSelectedSize(size);
    }

    //navigate to confirm groups page, still haven't posted to db
    function createGroups (){

        console.log('making groups');
        //todo create checks for everyone's id and make sure they are valid players
        navigate('/ConfirmGroups', {state: {checkedPlayers}});
        
    }

    return ( <>

        <Navbar />

        <GroupSettings selectedSize={selectedSize} onSizeChange={handleGSChange}></GroupSettings>

        <div className="md:container md:mx-auto flex justify-center">
            {/*todo make it so it saves on refresh who's selected*/}
            <Players />
        </div>
        <button className="border border-black px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md" onClick = {createGroups}>Create Groups</button>
    </>);
}
