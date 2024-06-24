import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import Players from '../components/Players';
import GroupSettings from '../components/GroupSettings';
import { usePlayers } from '../contexts/PlayersContext.jsx';
import { useNavigate } from 'react-router-dom';
export default function CreateGroups() {


    //get players list from previous page  

    // const [checkedInCount, setCheckedInCount] = useState(0);
    // const [players, setPlayers] = useState([])

    // useEffect(() => {
    //     const fetchCheckedInCount = async () => {
    //         try {
    //             const response = await fetch('/api/matches/checkin/count');
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             const data = await response.json();
    //             setCheckedInCount(data.count);
    //         } catch (error) {
    //             console.error('Failed to fetch checked-in count:', error);
    //         }
    //     };

    //     fetchCheckedInCount();
    // }, []);

    // useEffect(() => {
    //     const fetchPlayers = async () => {
    //         try {
    //             const response = await fetch('/api/matches')
    //             if (!response.ok) {
    //                 throw new Error(`http error! status: ${response.status}`)
    //             }
    //             const json = await response.json()
    //             setPlayers(json)
    //         } catch (error) {
    //             setError(error.message)
    //         } finally {
    //             setLoading(false);
    //         }

    //     }

    //     fetchPlayers()
    // }, [])

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
    <button onClick = {createGroups}>Create Groups</button>
    </>);
}
