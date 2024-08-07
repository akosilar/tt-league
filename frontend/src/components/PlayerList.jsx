import PlayerListRow from "./PlayerListRow"
import AddPlayer from "./AddPlayer";
import EditPlayer from './EditPlayer';
import { useState, useEffect } from "react"
import { createPortal } from 'react-dom';


export default function Players({ players, setPlayers, loading, setLoading, error, setError }) {

  //************************ Sorting players list ****************************************** //
  const [sortField, setSortField] = useState(null); //which criteria is used to sort 
  const [sortOrder, setSortOrder] = useState('asc'); //ascending or descending


  //************************ Editing players ****************************************** //
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState(null);


  /** sorts the players displayed based on what sorting button was clicked
   * 
   * @param {String} field by rating, email or firstName
   */
  const handleSort = (field) => {

    //if was ascending and clicked the button we already were sorting, then go to descending
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';

    const sortedPlayers = [...players].sort((a, b) => {
      const aValue = typeof a[field] === 'string' ? a[field].toLowerCase() : a[field];
      const bValue = typeof b[field] === 'string' ? b[field].toLowerCase() : b[field];

      if (aValue < bValue) return newSortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return newSortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setPlayers(sortedPlayers);
    setSortField(field);
    setSortOrder(newSortOrder);

  };



  // ******************** updating players  ********************* //
  const addPlayerToList = (newPlayer) => {
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  };

  const updatePlayerInList = (updatedPlayer) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player._id === updatedPlayer._id ? updatedPlayer : player
      )
    );
  };

  const deletePlayerFromList = (playerId) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player._id !== playerId)
    );
  };


  const handleEditPlayer = (player) => {
    setPlayerToEdit(player);
    setShowEditModal(true);

  };

  // const handleCheckInPlayer = async (playerId) => {
  //   try {
  //     const response = await fetch(`/api/matches/${playerId}/checkin`, {
  //       method: 'POST',
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to check in player');
  //     }
  //     const updatedStatus = await response.json();
  //     setPlayers((prevPlayers) =>
  //       prevPlayers.map((player) =>
  //         player._id === updatedStatus.playerId
  //           ? { ...player, checkedIn: updatedStatus.checkedIn }
  //           : player
  //       )
  //     );
  //     // Fetch the updated checked-in count
  //     const countResponse = await fetch('/api/matches/checkin/count');
  //     if (!countResponse.ok) {
  //       throw new Error(`HTTP error! status: ${countResponse.status}`);
  //     }
  //     const countData = await countResponse.json();
  //     setCheckedInCount(countData.count);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  if (loading) return <div> Loading...</div>
  if (error) return <div> Error: {error}</div>
  return (
    <div className="relative overflow-x-auto shadow-xl sm:rounded-lg p-4 ">
      {showModal && createPortal(
        <AddPlayer onClose={() => setShowModal(false)} onAddPlayer={addPlayerToList} />,
        document.body
      )}
      {showEditModal && createPortal(
        <EditPlayer
          player={playerToEdit}
          onClose={() => setShowEditModal(false)}
          onUpdatePlayer={updatePlayerInList}
          onDeletePlayer={deletePlayerFromList}
        />,
        document.body
      )}

      <div className="flex items-center justify-end flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mr-2">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-70 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                Name
                <a href="#" onClick={() => handleSort("lastName")}><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                </svg></a>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                Rating
                <a href="#" onClick={() => handleSort("rating")}><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                </svg></a>
              </div>
            </th>
          </tr>
        </thead>
        <tbody id="playersList">
          {players.map(player =>
            <PlayerListRow
              player={player}
              key={player._id}
              // checkedIn={player.checkedIn}
              onEdit={() => handleEditPlayer(player)}
            // onCheckIn={() => handleCheckInPlayer(player._id)}
            />
          )}
        </tbody>
      </table>
    </div>

  )
}

