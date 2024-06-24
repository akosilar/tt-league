//components
import Navbar from '../components/Navbar';
import Players from '../components/Players.jsx'
//styles
import '../App.css'

//hooks
import { useEffect, useState } from "react";



export default function ManagePlayers() {
    // const [checkedInCount, setCheckedInCount] = useState(0);

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

    return (
        <div>
            <Navbar />
            <div className="md:container md:mx-auto flex justify-center">
                <Players />
            </div>
        </div>
    )
}
