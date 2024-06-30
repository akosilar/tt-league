import { usePlayers } from '../contexts/PlayersContext';

/**
 * this might be unnecessarily slow in the long run 
 * Checks if  player is in local storage to know if they should be drawn as checked
 */
function inLocalStorage(playerId) {
  let checkedPlayersLS = JSON.parse(localStorage.getItem('checkedPlayers')) || [];
  for (let player of checkedPlayersLS) {
    if (player._id == playerId) return true;
  }
  return false;
}

export default function PlayerRow({ player, }) {

  const { handleCheckboxChangeHook } = usePlayers();

  const handleCheckboxChange = (event) => {
    handleCheckboxChangeHook(player, event.target.checked);
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input type="checkbox" id={`checkbox-${player._id}`} onChange={handleCheckboxChange}
            checked={inLocalStorage(player._id)} /*whether it should be drawn as checked based off if its in local storage*/
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
        </div>
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {player.firstName} {player.lastName}
      </th>
      <td className="px-6 py-4">
        {player.rating}
      </td>

    </tr>
  )
}
