import { useState } from 'react';



export default function PlayerRow({ player, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
        </div>
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {player.firstName} {player.lastName}
      </th>
      <td className="px-6 py-4">
        {player.email}
      </td>
      <td className="px-6 py-4">
        {player.rating}
      </td>
      <td className="px-6 py-4 text-right">
        <button onClick={onEdit} data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
      </td>

    </tr>
  )
}
