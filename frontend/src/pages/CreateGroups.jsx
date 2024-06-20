import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
export default function CreateGroups() {
    const [checkedInCount, setCheckedInCount] = useState(0);
    const [players, setPlayers] = useState([])

    useEffect(() => {
        const fetchCheckedInCount = async () => {
            try {
                const response = await fetch('/api/matches/checkin/count');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCheckedInCount(data.count);
            } catch (error) {
                console.error('Failed to fetch checked-in count:', error);
            }
        };

        fetchCheckedInCount();
    }, []);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('/api/matches')
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


    return (<div> <Navbar checkedInCount={checkedInCount} />creating groups {players.map((player) => player.firstName)}</div>);
}
