import Navbar from '../components/Navbar';

//hooks
import { useLocation } from 'react-router-dom';
function confirmMatches() {
    //clear out local storage of selected players
    console.log("clearing local storage");
    localStorage.removeItem('checkedPlayers');
}

export default function ConfirmGroups() {
    const location = useLocation();
    const { checkedPlayers } = location.state || { checkedPlayers: [] };

    return (<div>
        <Navbar />
        creating groups
        <div className="md:container md:mx-auto shadow-md p-6 h-screen mt-2 text-left">
            <div className='flex flex-wrap flex-col'>
                <div className='w-1/2 rounded shadow-md p-[20px]'>
                    <div className='rounded-t  py-1'><span className=''>Group:</span></div>
                    <table className='w-full  border-slate-400 border'>
                        <tbody>
                            {checkedPlayers.map(player => (
                                <tr className='cursor-pointer border  border-solid border-gray-600 border-1 hover:bg-gray-100 ' key={player._id}><td className='py-4'>
                                    <div className='flex-col mx-4'>
                                        <div className='text-[11px]'>{player.rating}</div>
                                        <div>{player.lastName}, {player.firstName} </div>
                                    </div>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {/*todo here this will post to database*/}
        <button className="border border-black px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md" onClick={confirmMatches}>Confirm matches</button>
    </div >);
}
