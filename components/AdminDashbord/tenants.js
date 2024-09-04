export default function Tenants() {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5 ">
                <div className="flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 ">
                    <div>
                        <button 
                            id="dropdownActionButton" 
                            data-dropdown-toggle="dropdownAction" 
                            className="inline-flex items-center text-text-dark bg-bg-light border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-bg-dark dark:text-text-light dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                            type="button">
                            <span className="sr-only">Action button</span>
                            Action
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div id="dropdownAction" className="z-10 hidden bg-bg-light divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-bg-dark dark:divide-gray-600">
                            <ul className="py-1 text-sm text-text-dark dark:text-text-light" aria-labelledby="dropdownActionButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-text-dark hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-text-light dark:hover:text-white">Delete User</a>
                            </div>
                        </div>
                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-text-dark border border-gray-300 rounded-lg w-80 bg-bg-light focus:ring-blue-500 focus:border-blue-500 dark:bg-bg-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-text-light dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-text-dark uppercase dark:text-text-light">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-bg-dark dark:focus:ring-offset-bg-dark focus:ring-2 dark:bg-bg-dark dark:border-gray-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Position
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example row */}
                        {[
                            {
                                id: 1,
                                name: 'Neil Sims',
                                email: 'neil.sims@flowbite.com',
                                position: 'React Developer',
                                status: 'Online',
                                imgSrc: 'https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_640.jpg'
                            },
                            {
                                id: 2,
                                name: 'Bonnie Green',
                                email: 'bonnie@flowbite.com',
                                position: 'Designer',
                                status: 'Online',
                                imgSrc: 'https://cdn.pixabay.com/photo/2022/10/19/01/02/woman-7531315_640.png'
                            },
                            {
                                id: 3,
                                name: 'Jese Leos',
                                email: 'jese@flowbite.com',
                                position: 'Vue JS Developer',
                                status: 'Online',
                                imgSrc: 'https://cdn.pixabay.com/photo/2020/06/21/05/59/lady-5323329_640.png'
                            },
                            {
                                id: 4,
                                name: 'Thomas Lean',
                                email: 'thomes@flowbite.com',
                                position: 'UI/UX Engineer',
                                status: 'Online',
                                imgSrc: 'https://cdn.pixabay.com/photo/2017/12/01/08/02/paint-2990357_640.jpg'
                            },
                            {
                                id: 5,
                                name: 'Leslie Livingston',
                                email: 'leslie@flowbite.com',
                                position: 'SEO Specialist',
                                status: 'Offline',
                                imgSrc: 'https://cdn.pixabay.com/photo/2021/08/11/11/15/man-6538205_640.jpg'
                            }
                        ].map(user => (
                            <tr key={user.id} className="bg-bg-light border-b dark:bg-bg-dark dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id={`checkbox-table-search-${user.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-bg-dark dark:focus:ring-offset-bg-dark focus:ring-2 dark:bg-bg-dark dark:border-gray-600" />
                                        <label htmlFor={`checkbox-table-search-${user.id}`} className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 text-text-dark whitespace-nowrap dark:text-text-light">
                                    <img className="w-10 h-10 rounded-full" src={user.imgSrc} alt={user.name} />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{user.name}</div>
                                        <div className="font-normal text-gray-500">{user.email}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {user.position}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full ${user.status === 'Online' ? 'bg-green-500' : 'bg-red-500'} me-2`}></div> {user.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" type="button" data-modal-show="editUserModal" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
