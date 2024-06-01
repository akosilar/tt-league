import PlayerRow from "./PlayerRow"
export default function Players() {

  let players =
    [
      {
        "name": {
          "first": "Chelsea",
          "last": "Stanton"
        },
        "email": "Travis.Powlowski@gmail.com",
        "rating": 1098,
        "uuid": "8679e63e-fcc8-4b21-946a-89b0a7b327b9"
      },
      {
        "name": {
          "first": "Muriel",
          "last": "Jast"
        },
        "email": "Lenora_Kulas94@example.com",
        "rating": 2399,
        "uuid": "1055346a-f953-44c7-8216-c7f31b4915e4"
      },
      {
        "name": {
          "first": "Emmy",
          "last": "Altenwerth"
        },
        "email": "Lupe_Schaefer@example.com",
        "rating": 1439,
        "uuid": "5d0ec68b-6707-4ff3-83a8-d92700827e4d"
      },
      {
        "name": {
          "first": "Blaze",
          "last": "Hahn"
        },
        "email": "Alfredo.Walter@gmail.com",
        "rating": 1506,
        "uuid": "86eadd98-0959-4558-ab02-5ea548091a87"
      },
      {
        "name": {
          "first": "Kenna",
          "last": "Fadel"
        },
        "email": "Gina_Donnelly@example.com",
        "rating": 1365,
        "uuid": "5ed3f611-85f1-484c-865c-c2a703dd7ac7"
      }
    ]
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                Email
                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                </svg></a>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                Rating
                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                </svg></a>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map(player =>
            <PlayerRow
              firstName={player.name.first}
              lastName={player.name.last}
              email={player.email}
              rating={player.rating}
              key={player.uuid}
            />
          )}
        </tbody>
      </table>
    </div>

  )
}

