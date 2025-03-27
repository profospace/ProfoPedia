// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, Bell, Menu, ChevronDown } from 'lucide-react';

// function Header({ sidebarOpen, setSidebarOpen, allDistricts, district, setDistrict }) {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [notificationsOpen, setNotificationsOpen] = useState(false);

//     const handleSearch = (e) => {
//         e.preventDefault();
//         console.log('Searching for:', searchTerm);
//         // Implement search functionality here
//     };


//     const handleDistrictChange = (e) => {
//         const selectedDistrict = e.target.value;
//         console.log(selectedDistrict)
//         setDistrict(selectedDistrict); // Update the districts state with the selected district
//     };



//     return (
//         <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
//             <div className="px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     {/* Left: Hamburger button */}
//                     <div className="flex-shrink-0 lg:hidden">
//                         <button
//                             className="text-gray-500 hover:text-gray-600"
//                             onClick={() => setSidebarOpen(!sidebarOpen)}
//                         >
//                             <span className="sr-only">Open sidebar</span>
//                             <Menu className="w-6 h-6" />
//                         </button>
//                     </div>

//                     {/* Center: Search bar */}
//                     <div className="flex-1 max-w-lg mx-auto lg:max-w-xs">
//                         <form className="relative" onSubmit={handleSearch}>
//                             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                                 <Search className="w-5 h-5 text-gray-400" />
//                             </div>
//                             <input
//                                 type="text"
//                                 className="block w-full py-2 pl-10 pr-3 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                                 placeholder="Search deeds, parties, documents..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </form>
//                     </div>

//                     {/* Right: Actions */}
//                     <div className="flex items-center space-x-3">
//                         <div>
//                             <select
//                                 className="form-select rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                 onChange={handleDistrictChange}
//                                 value={district}
//                             >
//                                 <option value="">Select District</option>
//                                 {allDistricts?.length > 0 && allDistricts?.map((district, index) => (
//                                     <option key={index} value={district}>
//                                         {district}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         {/* Notifications */}
//                         <div className="relative">
//                             <button
//                                 className="p-2 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 onClick={() => setNotificationsOpen(!notificationsOpen)}
//                             >
//                                 <span className="sr-only">View notifications</span>
//                                 <Bell className="w-6 h-6" />
//                                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//                             </button>

//                             {/* Dropdown */}
//                             {notificationsOpen && (
//                                 <div
//                                     className="absolute right-0 w-80 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//                                     onClick={() => setNotificationsOpen(false)}
//                                 >
//                                     <div className="px-4 py-3">
//                                         <p className="text-sm font-medium text-gray-900">Notifications</p>
//                                     </div>
//                                     <div className="py-1">
//                                         <div className="px-4 py-3">
//                                             <div className="flex items-start">
//                                                 <div className="flex-shrink-0">
//                                                     <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
//                                                         <FileText className="w-4 h-4 text-indigo-600" />
//                                                     </div>
//                                                 </div>
//                                                 <div className="ml-3">
//                                                     <p className="text-sm font-medium text-gray-900">New deed added</p>
//                                                     <p className="text-sm text-gray-500">A new deed (#3131) was added by admin</p>
//                                                     <p className="mt-1 text-xs text-gray-400">10 minutes ago</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="px-4 py-3 bg-gray-50">
//                                             <div className="flex items-start">
//                                                 <div className="flex-shrink-0">
//                                                     <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
//                                                         <AlertCircle className="w-4 h-4 text-yellow-600" />
//                                                     </div>
//                                                 </div>
//                                                 <div className="ml-3">
//                                                     <p className="text-sm font-medium text-gray-900">System update</p>
//                                                     <p className="text-sm text-gray-500">The system will be updated at 3:00 PM</p>
//                                                     <p className="mt-1 text-xs text-gray-400">1 hour ago</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="py-1">
//                                         <Link
//                                             to="/notifications"
//                                             className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100"
//                                         >
//                                             View all notifications
//                                         </Link>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* User dropdown */}
//                         <div className="relative">
//                             <button
//                                 className="flex items-center space-x-2 text-sm focus:outline-none"
//                                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                             >
//                                 <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
//                                     A
//                                 </div>
//                                 <span className="hidden md:inline-flex">
//                                     <span className="font-medium text-gray-800">Admin User</span>
//                                     <ChevronDown className="w-5 h-5 ml-1 text-gray-500" />
//                                 </span>
//                             </button>

//                             {/* Dropdown */}
//                             {dropdownOpen && (
//                                 <div
//                                     className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//                                     onClick={() => setDropdownOpen(false)}
//                                 >
//                                     <div className="py-1">
//                                         <Link
//                                             to="/profile"
//                                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                         >
//                                             Your Profile
//                                         </Link>
//                                         <Link
//                                             to="/settings"
//                                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                         >
//                                             Settings
//                                         </Link>
//                                     </div>
//                                     <div className="py-1">
//                                         <Link
//                                             to="/logout"
//                                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                         >
//                                             Sign out
//                                         </Link>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Header;

// // This imports are needed for notifications dropdown
// function FileText(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
//             <polyline points="14 2 14 8 20 8" />
//             <line x1="16" x2="8" y1="13" y2="13" />
//             <line x1="16" x2="8" y1="17" y2="17" />
//             <line x1="10" x2="8" y1="9" y2="9" />
//         </svg>
//     );
// }

// function AlertCircle(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <circle cx="12" cy="12" r="10" />
//             <line x1="12" x2="12" y1="8" y2="12" />
//             <line x1="12" x2="12.01" y1="16" y2="16" />
//         </svg>
//     );
// }


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, Bell, Menu, ChevronDown } from 'lucide-react';

// function Header({ sidebarOpen, setSidebarOpen, allDistricts, district, setDistrict }) {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [notificationsOpen, setNotificationsOpen] = useState(false);

//     const handleSearch = (e) => {
//         e.preventDefault();
//         console.log('Searching for:', searchTerm);
//         // Implement search functionality here
//     };

//     const handleDistrictChange = (e) => {
//         const selectedDistrict = e.target.value;
//         console.log(selectedDistrict);
//         setDistrict(selectedDistrict); // This will update App.js state and trigger localStorage save
//     };

//     return (
//         <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
//             <div className="px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     {/* Left: Hamburger button */}
//                     <div className="flex-shrink-0 lg:hidden">
//                         <button
//                             className="text-gray-500 hover:text-gray-600"
//                             onClick={() => setSidebarOpen(!sidebarOpen)}
//                         >
//                             <span className="sr-only">Open sidebar</span>
//                             <Menu className="w-6 h-6" />
//                         </button>
//                     </div>

//                     {/* Center: Search bar */}
//                     <div className="flex-1 max-w-lg mx-auto lg:max-w-xs">
//                         <form className="relative" onSubmit={handleSearch}>
//                             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                                 <Search className="w-5 h-5 text-gray-400" />
//                             </div>
//                             <input
//                                 type="text"
//                                 className="block w-full py-2 pl-10 pr-3 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                                 placeholder="Search deeds, parties, documents..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </form>
//                     </div>

//                     {/* Right: Actions */}
//                     <div className="flex items-center space-x-3">
//                         <div className="relative">
//                             <div className="inline-flex items-center overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
//                                 <select
//                                     className="cursor-pointer appearance-none bg-transparent px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none"
//                                     onChange={handleDistrictChange}
//                                     value={district}
//                                 >
//                                     <option value="" className="text-gray-500">Select District</option>
//                                     {allDistricts?.length > 0 && allDistricts?.map((district, index) => (
//                                         <option key={index} value={district} className="text-gray-800">
//                                             {district}
//                                         </option>
//                                     ))}
//                                 </select>

//                                 <div className="shrink-0 bg-gray-50 px-2 py-2 border-l border-gray-300">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-4 w-4 text-gray-500"
//                                         viewBox="0 0 20 20"
//                                         fill="currentColor"
//                                     >
//                                         <path
//                                             fillRule="evenodd"
//                                             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                             clipRule="evenodd"
//                                         />
//                                     </svg>
//                                 </div>
//                             </div>
//                         </div>
                        

//                         {/* User dropdown */}
//                         <div className="relative">
//                             <button
//                                 className="flex items-center space-x-2 text-sm focus:outline-none"
//                                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                             >
//                                 <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
//                                     A
//                                 </div>
//                                 <span className="hidden md:inline-flex">
//                                     <span className="font-medium text-gray-800">Admin User</span>
//                                     <ChevronDown className="w-5 h-5 ml-1 text-gray-500" />
//                                 </span>
//                             </button>

//                             {/* Dropdown */}
//                             {dropdownOpen && (
//                                 <div
//                                     className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//                                     onClick={() => setDropdownOpen(false)}
//                                 >
//                                     <div className="py-1">
//                                         <Link
//                                             to="/profile"
//                                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                         >
//                                             Your Profile
//                                         </Link>
//                                         <Link
//                                             to="/settings"
//                                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                         >
//                                             Settings
//                                         </Link>
//                                     </div>
//                                     <div className="py-1">
//                                         <Link
//                                             to="/logout"
//                                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                         >
//                                             Sign out
//                                         </Link>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Header;

// // This imports are needed for notifications dropdown
// function FileText(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
//             <polyline points="14 2 14 8 20 8" />
//             <line x1="16" x2="8" y1="13" y2="13" />
//             <line x1="16" x2="8" y1="17" y2="17" />
//             <line x1="10" x2="8" y1="9" y2="9" />
//         </svg>
//     );
// }

// function AlertCircle(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <circle cx="12" cy="12" r="10" />
//             <line x1="12" x2="12" y1="8" y2="12" />
//             <line x1="12" x2="12.01" y1="16" y2="16" />
//         </svg>
//     );
// }


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, ChevronDown } from 'lucide-react';

function Header({ sidebarOpen, setSidebarOpen, allDistricts, district, setDistrict }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
        // Implement search functionality here
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictCode = e.target.value;
        console.log(selectedDistrictCode);
        setDistrict(selectedDistrictCode); // This will update App.js state and trigger localStorage save
    };

    return (
        <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Hamburger button */}
                    <div className="flex-shrink-0 lg:hidden">
                        <button
                            className="text-gray-500 hover:text-gray-600"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Center: Search bar */}
                    <div className="flex-1 max-w-lg mx-auto lg:max-w-xs">
                        <form className="relative" onSubmit={handleSearch}>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full py-2 pl-10 pr-3 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Search deeds, parties, documents..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="inline-flex items-center overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                <select
                                    className="cursor-pointer appearance-none bg-transparent px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none"
                                    onChange={handleDistrictChange}
                                    value={district}
                                >
                                    <option value="" className="text-gray-500">Select District</option>
                                    {allDistricts?.length > 0 && allDistricts?.map((districtItem) => (
                                        <option key={districtItem.code} value={districtItem.code} className="text-gray-800">
                                            {districtItem.name}
                                        </option>
                                    ))}
                                </select>

                                <div className="shrink-0 bg-gray-50 px-2 py-2 border-l border-gray-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>


                        {/* User dropdown */}
                        <div className="relative">
                            <button
                                className="flex items-center space-x-2 text-sm focus:outline-none"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                    A
                                </div>
                                <span className="hidden md:inline-flex">
                                    <span className="font-medium text-gray-800">Admin User</span>
                                    <ChevronDown className="w-5 h-5 ml-1 text-gray-500" />
                                </span>
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div
                                    className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <div className="py-1">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Your Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Settings
                                        </Link>
                                    </div>
                                    <div className="py-1">
                                        <Link
                                            to="/logout"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;


