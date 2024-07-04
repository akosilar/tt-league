import Navbar from '../components/Navbar';
import PlayerList from '../components/PlayerList.jsx';
import { useState, useEffect } from 'react';
import GroupSettings from '../components/GroupSettings';
import { usePlayers } from '../contexts/PlayersContext.jsx';
import { useNavigate } from 'react-router-dom';
import CheckedinPlayersList from '../components/CheckedinPlayersList.jsx';
export default function CreateGroups() {
    //************************ Getting players from DB ****************************************** //
    const [players, setPlayers] = useState([]);
    //************************ Web stuff ****************************************** //
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


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
    // ********************* fetch players in beginning ************************* //
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('/api/players')
                if (!response.ok) {
                    throw new Error(`http error! status: ${response.status}`)
                }
                const json = await response.json()
                setPlayers(json)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false);
            }

        }

        fetchPlayers()
    }, [])

    return (<>

        <Navbar />

        <GroupSettings selectedSize={selectedSize} onSizeChange={handleGSChange}></GroupSettings>

        <button className="border border-black px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md" onClick={createGroups}>Create Groups</button>
        <div className="md:container md:mx-auto shadow-md p-6 h-screen mt-2 ">
            {/*todo make it so it saves on refresh who's selected*/}
            <div className='flex justify-around'>
                <PlayerList
                    players={players}
                    setPlayer={setPlayers}
                    loading={loading}
                    setLoading={setLoading}
                    error={error}
                    setError={setError}
                />
                <CheckedinPlayersList checkedPlayers={checkedPlayers} />
            </div>
        </div>
    </>);
}
