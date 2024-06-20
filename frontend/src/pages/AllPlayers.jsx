//components
import Navbar from '../components/Navbar';
import Players from '../components/Players.jsx'
//styles
import '../App.css'

import { useEffect, useState } from "react";



export default function AllPlayers() {
    const [checkedInCount, setCheckedInCount] = useState(0);

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

    return (
        <div>
            <Navbar checkedInCount={checkedInCount} />
            <div className="md:container md:mx-auto flex justify-center">
                <Players setCheckedInCount={setCheckedInCount} />
            </div>
        </div>
    )
}
