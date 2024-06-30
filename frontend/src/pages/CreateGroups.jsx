import Navbar from '../components/Navbar';
import PlayerList from '../components/PlayerList.jsx';
import { useState } from 'react';
import GroupSettings from '../components/GroupSettings';
import { usePlayers } from '../contexts/PlayersContext.jsx';
import { useNavigate } from 'react-router-dom';
import CheckedinPlayersList from '../components/CheckedinPlayersList.jsx';
export default function CreateGroups() {

    //pass stuff to confirm groups page
    const navigate = useNavigate();

    //group size dropdown
    const [selectedSize, setSelectedSize] = useState('5');

    //track checked players
    const { checkedPlayers } = usePlayers();

    const handleGSChange = (size) => {
        setSelectedSize(size);
    }

    //navigate to confirm groups page, still haven't posted to db
    function createGroups() {

        console.log('making groups');
        //todo create checks for everyone's id and make sure they are valid players
        navigate('/ConfirmGroups', { state: { checkedPlayers } });

    }

    return (<>

        <Navbar />

        <GroupSettings selectedSize={selectedSize} onSizeChange={handleGSChange}></GroupSettings>

        <button className="border border-black px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md" onClick={createGroups}>Create Groups</button>
        <div className="md:container md:mx-auto shadow-md p-6 h-screen mt-2 ">
            {/*todo make it so it saves on refresh who's selected*/}
            <div className='flex justify-around'>
                <PlayerList />
                <CheckedinPlayersList checkedPlayers={checkedPlayers} />
            </div>
        </div>
    </>);
}
