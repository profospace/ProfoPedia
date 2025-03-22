// import React, { useState, useEffect, useRef } from 'react';
// import { Search, User, X } from 'lucide-react';
// import { base_url } from '../utils/base_url';
// import Button from '../components/Button';
// import Card from '../components/Card';
// import Table from '../components/Table';
// import Pagination from '../components/Pagination';
// import Alert from '../components/Alert';

// const PartyNameSearch = () => {
//     // State for search and results
//     const [searchQuery, setSearchQuery] = useState('');
//     const [districtCode, setDistrictCode] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [suggestions, setSuggestions] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const [selectedName, setSelectedName] = useState(null);
//     const [records, setRecords] = useState([]);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//     const [totalPages, setTotalPages] = useState(0);
//     const [totalRecords, setTotalRecords] = useState(0);

//     // Districts dropdown options
//     const [districts, setDistricts] = useState([
//         { value: '164', label: 'Kanpur Nagar' },
//         { value: '229', label: 'Lucknow' },
//         { value: '146', label: 'Agra' },
//         { value: '266', label: 'Sambhal' }
//     ]);

//     // Ref for search input and suggestions dropdown
//     const searchInputRef = useRef(null);
//     const suggestionsRef = useRef(null);

//     // Close suggestions dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 suggestionsRef.current &&
//                 !suggestionsRef.current.contains(event.target) &&
//                 searchInputRef.current &&
//                 !searchInputRef.current.contains(event.target)
//             ) {
//                 setShowSuggestions(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // Fetch suggestions when search query changes
//     useEffect(() => {
//         const fetchSuggestions = async () => {
//             if (!districtCode) {
//                 setError("Please select a district first");
//                 return;
//             }

//             if (!searchQuery || searchQuery.length < 2) {
//                 setSuggestions([]);
//                 setShowSuggestions(false);
//                 return;
//             }

//             try {
//                 setIsLoading(true);
//                 setError(null);

//                 const response = await fetch(
//                     `${base_url}/api/property-records/party-suggestions?districtCode=${districtCode}&query=${encodeURIComponent(searchQuery)}`
//                 );

//                 if (!response.ok) {
//                     throw new Error(`API error: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 console.log("data" , data)

//                 if (data.success) {
//                     setSuggestions(data.data);
//                     setShowSuggestions(true);
//                 } else {
//                     setError(data.message || "Failed to fetch suggestions");
//                     setSuggestions([]);
//                 }
//             } catch (err) {
//                 setError(`Error fetching suggestions: ${err.message}`);
//                 setSuggestions([]);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         // Use debounce to avoid too many API calls
//         const debounceTimer = setTimeout(() => {
//             if (searchQuery && searchQuery.length >= 2 && districtCode) {
//                 fetchSuggestions();
//             }
//         }, 300);

//         return () => clearTimeout(debounceTimer);
//     }, [searchQuery, districtCode]);

//     // Fetch records when a name is selected
//     useEffect(() => {
//         const fetchRecordsByName = async () => {
//             if (!selectedName || !districtCode) return;

//             try {
//                 setIsLoading(true);
//                 setError(null);

//                 const response = await fetch(
//                     `${base_url}/api/property-records/party-records?districtCode=${districtCode}&name=${encodeURIComponent(selectedName)}&page=${page}&limit=${limit}`
//                 );

//                 if (!response.ok) {
//                     throw new Error(`API error: ${response.status}`);
//                 }

//                 const data = await response.json();

//                 if (data.success) {
//                     setRecords(data.data);
//                     setTotalPages(data.totalPages);
//                     setTotalRecords(data.totalCount);
//                 } else {
//                     setError(data.message || "Failed to fetch records");
//                     setRecords([]);
//                 }
//             } catch (err) {
//                 setError(`Error fetching records: ${err.message}`);
//                 setRecords([]);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchRecordsByName();
//     }, [selectedName, districtCode, page, limit]);

//     // Handle name selection from suggestions
//     const handleSelectName = (name) => {
//         setSelectedName(name);
//         setSearchQuery(name);
//         setShowSuggestions(false);
//         setPage(1); // Reset to first page
//     };

//     // Handle search input change
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//         if (selectedName) {
//             setSelectedName(null); // Clear selected name when input changes
//             setRecords([]);
//         }
//     };

//     // Handle district change
//     const handleDistrictChange = (e) => {
//         setDistrictCode(e.target.value);
//         setSearchQuery('');
//         setSelectedName(null);
//         setSuggestions([]);
//         setShowSuggestions(false);
//         setRecords([]);
//     };

//     // Handle pagination
//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setPage(newPage);
//         }
//     };

//     // Clear search
//     const handleClearSearch = () => {
//         setSearchQuery('');
//         setSelectedName(null);
//         setSuggestions([]);
//         setShowSuggestions(false);
//         setRecords([]);
//     };

//     // Define table columns for property records
//     const propertyRecordsColumns = [
//         {
//             header: 'Registration Details',
//             accessor: 'regNo',
//             render: (row) => (
//                 <div>
//                     <div><span className="font-medium">Reg No:</span> {row.regNo}/{row.year}</div>
//                     <div><span className="font-medium">Date:</span> {row.regDate}</div>
//                     <div><span className="font-medium">Type:</span> {row.deedType}</div>
//                 </div>
//             )
//         },
//         {
//             header: 'Location',
//             accessor: 'searchInfo',
//             render: (row, originalRow) => (
//                 <div>
//                     <div><span className="font-medium">District:</span> {originalRow.searchInfo.districtCode}</div>
//                     <div><span className="font-medium">SRO:</span> {originalRow.searchInfo.sroCode}</div>
//                     <div><span className="font-medium">Village:</span> {originalRow.searchInfo.gaonCode1}</div>
//                 </div>
//             )
//         },
//         {
//             header: 'Parties',
//             accessor: 'partyNames',
//             render: (row) => (
//                 <div>
//                     {row.partyNames && row.partyNames.map((name, idx) => (
//                         <div key={idx} className={name === selectedName ? "font-semibold bg-yellow-100 p-1 rounded" : ""}>
//                             {idx === 0 ? '1st Party: ' : idx === 1 ? '2nd Party: ' : `Party ${idx + 1}: `}
//                             {name}
//                         </div>
//                     ))}
//                 </div>
//             )
//         },
//         {
//             header: 'Property',
//             accessor: 'propertyDesc',
//             render: (row) => (
//                 <div className="max-w-md">
//                     <div className="line-clamp-3">{row.propertyDesc || 'No description available'}</div>
//                 </div>
//             )
//         }
//     ];

//     return (
//         <div className="container mx-auto py-8 px-4">
//             <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
//                 <User className="mr-2" size={28} />
//                 Search by Party Name
//             </h1>

//             <Card title="Search by Party Name" className="mb-8">
//                 <div className="space-y-4">
//                     {/* District Selection */}
//                     <div>
//                         <label htmlFor="districtCode" className="block text-sm font-medium text-gray-700 mb-1">
//                             District
//                         </label>
//                         <select
//                             id="districtCode"
//                             value={districtCode}
//                             onChange={handleDistrictChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         >
//                             <option value="">Select District</option>
//                             {districts.map(district => (
//                                 <option key={district.value} value={district.value}>
//                                     {district.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Party Name Search */}
//                     <div className="relative">
//                         <label htmlFor="partyName" className="block text-sm font-medium text-gray-700 mb-1">
//                             Party Name
//                         </label>
//                         <div className="relative flex">
//                             <div className="relative flex-grow">
//                                 <input
//                                     id="partyName"
//                                     ref={searchInputRef}
//                                     type="text"
//                                     value={searchQuery}
//                                     onChange={handleSearchChange}
//                                     onClick={() => {
//                                         if (suggestions.length > 0) {
//                                             setShowSuggestions(true);
//                                         }
//                                     }}
//                                     placeholder="Start typing a name (min 2 characters)"
//                                     disabled={!districtCode}
//                                     className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                 />
//                                 {searchQuery && (
//                                     <button
//                                         type="button"
//                                         onClick={handleClearSearch}
//                                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                                     >
//                                         <X size={16} />
//                                     </button>
//                                 )}
//                             </div>
//                             <Button
//                                 type="button"
//                                 className="ml-2"
//                                 disabled={!searchQuery || isLoading || !districtCode}
//                                 onClick={() => {
//                                     if (searchQuery) {
//                                         handleSelectName(searchQuery);
//                                     }
//                                 }}
//                             >
//                                 <Search size={16} className="mr-1" />
//                                 Search
//                             </Button>
//                         </div>

//                         {/* Suggestions Dropdown */}
//                         {showSuggestions && suggestions.length > 0 && (
//                             <div
//                                 ref={suggestionsRef}
//                                 className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-64 overflow-y-auto"
//                             >
//                                 <ul className="py-1">
//                                     {suggestions.map((suggestion, index) => (
//                                         <li
//                                             key={index}
//                                             onClick={() => handleSelectName(suggestion.name)}
//                                             className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center"
//                                         >
//                                             <span>{suggestion.name}</span>
//                                             <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
//                                                 {suggestion.count} records
//                                             </span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}
//                     </div>

//                     {/* Selected Name Display */}
//                     {selectedName && (
//                         <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
//                             <h4 className="text-sm font-medium text-blue-800 mb-1">Selected Name</h4>
//                             <div className="flex justify-between items-center">
//                                 <span className="text-blue-700 font-medium">{selectedName}</span>
//                                 <span className="text-xs bg-blue-100 px-2 py-1 rounded-full">
//                                     {totalRecords} records found
//                                 </span>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </Card>

//             {/* Error Alert */}
//             {error && (
//                 <Alert
//                     type="error"
//                     title="Error"
//                     message={error}
//                 />
//             )}

//             {/* Results Section */}
//             {selectedName && (
//                 <Card
//                     title={`Results for "${selectedName}"`}
//                     className="mb-8"
//                 >
//                     <div className="overflow-x-auto">
//                         <Table
//                             columns={propertyRecordsColumns}
//                             data={records.map(r => ({ ...r.propertyRecord, searchInfo: r.searchInfo }))}
//                             emptyMessage={`No property records found for "${selectedName}" in the selected district.`}
//                         />
//                     </div>

//                     {records.length > 0 && (
//                         <Pagination
//                             currentPage={page}
//                             totalPages={totalPages}
//                             onPageChange={handlePageChange}
//                         />
//                     )}
//                 </Card>
//             )}
//         </div>
//     );
// };

// export default PartyNameSearch;


// import React, { useState, useEffect, useRef } from 'react';
// import { Search, User, X, Filter, Info } from 'lucide-react';
// import { base_url } from '../utils/base_url';
// import Button from '../components/Button';
// import Card from '../components/Card';
// import Table from '../components/Table';
// import Pagination from '../components/Pagination';
// import Alert from '../components/Alert';

// const PartyNameSearch = () => {
//     // State for search and results
//     const [searchQuery, setSearchQuery] = useState('');
//     const [districtCode, setDistrictCode] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [suggestions, setSuggestions] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const [selectedName, setSelectedName] = useState(null);
//     const [exactMatch, setExactMatch] = useState(true);
//     const [records, setRecords] = useState([]);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//     const [totalPages, setTotalPages] = useState(0);
//     const [totalRecords, setTotalRecords] = useState(0);
//     const [searching, setSearching] = useState(false);

//     // Districts dropdown options
//     const [districts, setDistricts] = useState([
//         { value: '164', label: 'Kanpur Nagar' },
//         { value: '229', label: 'Lucknow' },
//         { value: '146', label: 'Agra' },
//         { value: '266', label: 'Sambhal' }
//     ]);

//     // Ref for search input and suggestions dropdown
//     const searchInputRef = useRef(null);
//     const suggestionsRef = useRef(null);

//     // Close suggestions dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 suggestionsRef.current &&
//                 !suggestionsRef.current.contains(event.target) &&
//                 searchInputRef.current &&
//                 !searchInputRef.current.contains(event.target)
//             ) {
//                 setShowSuggestions(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // Fetch suggestions when search query changes
//     useEffect(() => {
//         const fetchSuggestions = async () => {
//             if (!districtCode) {
//                 setError("Please select a district first");
//                 return;
//             }

//             if (!searchQuery || searchQuery.length < 2) {
//                 setSuggestions([]);
//                 setShowSuggestions(false);
//                 return;
//             }

//             try {
//                 setIsLoading(true);
//                 setError(null);

//                 const response = await fetch(
//                     `${base_url}/api/property-records/party-suggestions?districtCode=${districtCode}&query=${encodeURIComponent(searchQuery)}`
//                 );

//                 if (!response.ok) {
//                     throw new Error(`API error: ${response.status}`);
//                 }

//                 const data = await response.json();

//                 if (data.success) {
//                     setSuggestions(data.data);
//                     setShowSuggestions(data.data.length > 0);
//                 } else {
//                     setError(data.message || "Failed to fetch suggestions");
//                     setSuggestions([]);
//                 }
//             } catch (err) {
//                 setError(`Error fetching suggestions: ${err.message}`);
//                 setSuggestions([]);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         // Use debounce to avoid too many API calls
//         const debounceTimer = setTimeout(() => {
//             if (searchQuery && searchQuery.length >= 2 && districtCode) {
//                 fetchSuggestions();
//             }
//         }, 300);

//         return () => clearTimeout(debounceTimer);
//     }, [searchQuery, districtCode]);

//     // Handle name selection from suggestions
//     const handleSelectName = (name) => {
//         setSelectedName(name);
//         setSearchQuery(name);
//         setShowSuggestions(false);
//         setPage(1); // Reset to first page
//     };

//     // Fetch records when a name is selected or search parameters change
//     const fetchRecordsByName = async () => {
//         if (!selectedName || !districtCode) return;

//         try {
//             setSearching(true);
//             setError(null);

//             const response = await fetch(
//                 `${base_url}/api/property-records/party-records?districtCode=${districtCode}&name=${encodeURIComponent(selectedName)}&exactMatch=${exactMatch}&page=${page}&limit=${limit}`
//             );

//             if (!response.ok) {
//                 throw new Error(`API error: ${response.status}`);
//             }

//             const data = await response.json();

//             if (data.success) {
//                 setRecords(data.data);
//                 setTotalPages(data.totalPages);
//                 setTotalRecords(data.totalCount);

//                 if (data.data.length === 0) {
//                     setError(`No records found for "${selectedName}". Try using partial match option.`);
//                 }
//             } else {
//                 setError(data.message || "Failed to fetch records");
//                 setRecords([]);
//             }
//         } catch (err) {
//             setError(`Error fetching records: ${err.message}`);
//             setRecords([]);
//         } finally {
//             setSearching(false);
//         }
//     };

//     // Trigger search when parameters change
//     useEffect(() => {
//         if (selectedName) {
//             fetchRecordsByName();
//         }
//     }, [selectedName, exactMatch, page, limit, districtCode]);

//     // Handle search input change
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//         if (selectedName) {
//             setSelectedName(null); // Clear selected name when input changes
//             setRecords([]);
//         }
//     };

//     // Handle district change
//     const handleDistrictChange = (e) => {
//         setDistrictCode(e.target.value);
//         setSearchQuery('');
//         setSelectedName(null);
//         setSuggestions([]);
//         setShowSuggestions(false);
//         setRecords([]);
//     };

//     // Handle pagination
//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setPage(newPage);
//         }
//     };

//     // Clear search
//     const handleClearSearch = () => {
//         setSearchQuery('');
//         setSelectedName(null);
//         setSuggestions([]);
//         setShowSuggestions(false);
//         setRecords([]);
//     };

//     // Handle search button click
//     const handleSearchButton = () => {
//         if (searchQuery) {
//             setSelectedName(searchQuery);
//         }
//     };

//     // Toggle exact match option
//     const handleToggleExactMatch = () => {
//         setExactMatch(!exactMatch);
//     };

//     // Define table columns for property records
//     const propertyRecordsColumns = [
//         {
//             header: 'Registration Details',
//             accessor: 'regNo',
//             render: (row) => (
//                 <div>
//                     <div><span className="font-medium">Reg No:</span> {row.regNo}/{row.year}</div>
//                     <div><span className="font-medium">Date:</span> {row.regDate}</div>
//                     <div><span className="font-medium">Type:</span> {row.deedType}</div>
//                 </div>
//             )
//         },
//         {
//             header: 'Location',
//             accessor: 'searchInfo',
//             render: (row, originalRow) => (
//                 <div>
//                     <div><span className="font-medium">District:</span> {originalRow.searchInfo.districtCode}</div>
//                     <div><span className="font-medium">SRO:</span> {originalRow.searchInfo.sroCode}</div>
//                     <div><span className="font-medium">Village:</span> {originalRow.searchInfo.gaonCode1}</div>
//                 </div>
//             )
//         },
//         {
//             header: 'Parties',
//             accessor: 'partyNames',
//             render: (row) => (
//                 <div>
//                     {row.partyNames && row.partyNames.map((name, idx) => {
//                         // Highlight the matched name with the search term
//                         const isMatch = selectedName &&
//                             (exactMatch ?
//                                 name === selectedName :
//                                 name.toLowerCase().includes(selectedName.toLowerCase()));

//                         return (
//                             <div
//                                 key={idx}
//                                 className={isMatch ? "font-semibold bg-yellow-100 p-1 rounded mb-1" : "mb-1"}
//                             >
//                                 {idx === 0 ? '1st Party: ' : idx === 1 ? '2nd Party: ' : `Party ${idx + 1}: `}
//                                 {name}
//                             </div>
//                         );
//                     })}
//                 </div>
//             )
//         },
//         {
//             header: 'Property',
//             accessor: 'propertyDesc',
//             render: (row) => (
//                 <div className="max-w-md">
//                     <div className="line-clamp-3">{row.propertyDesc || 'No description available'}</div>
//                 </div>
//             )
//         }
//     ];

//     return (
//         <div className="min-h-screen mx-auto py-8 px-4">
//             <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
//                 <User className="mr-2" size={28} />
//                 Search by Party Name
//             </h1>

//             <Card title="Search by Party Name" className="mb-8">
//                 <div className="space-y-4">
//                     {/* District Selection */}
//                     <div>
//                         <label htmlFor="districtCode" className="block text-sm font-medium text-gray-700 mb-1">
//                             District
//                         </label>
//                         <select
//                             id="districtCode"
//                             value={districtCode}
//                             onChange={handleDistrictChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         >
//                             <option value="">Select District</option>
//                             {districts.map(district => (
//                                 <option key={district.value} value={district.value}>
//                                     {district.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Party Name Search */}
//                     <div className="relative">
//                         <label htmlFor="partyName" className="block text-sm font-medium text-gray-700 mb-1">
//                             Party Name
//                         </label>
//                         <div className="relative flex">
//                             <div className="relative flex-grow">
//                                 <input
//                                     id="partyName"
//                                     ref={searchInputRef}
//                                     type="text"
//                                     value={searchQuery}
//                                     onChange={handleSearchChange}
//                                     onClick={() => {
//                                         if (suggestions.length > 0) {
//                                             setShowSuggestions(true);
//                                         }
//                                     }}
//                                     placeholder="Start typing a name (min 2 characters)"
//                                     disabled={!districtCode}
//                                     className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                 />
//                                 {searchQuery && (
//                                     <button
//                                         type="button"
//                                         onClick={handleClearSearch}
//                                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                                     >
//                                         <X size={16} />
//                                     </button>
//                                 )}
//                             </div>
//                             <Button
//                                 type="button"
//                                 className="ml-2"
//                                 disabled={!searchQuery || isLoading || !districtCode || searching}
//                                 onClick={handleSearchButton}
//                             >
//                                 <Search size={16} className="mr-1" />
//                                 {searching ? 'Searching...' : 'Search'}
//                             </Button>
//                         </div>

//                         {/* Suggestions Dropdown */}
//                         {showSuggestions && suggestions.length > 0 && (
//                             <div
//                                 ref={suggestionsRef}
//                                 className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200  overflow-y-auto"
//                             >
//                                 <ul className="py-1">
//                                     {suggestions.map((suggestion, index) => (
//                                         <li
//                                             key={index}
//                                             onClick={() => handleSelectName(suggestion.name)}
//                                             className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center"
//                                         >
//                                             <span>{suggestion.name}</span>
//                                             <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
//                                                 {suggestion.count} records
//                                             </span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}
//                     </div>

//                     {/* Search Options */}
//                     <div className="flex items-center mt-2">
//                         <label className="inline-flex items-center cursor-pointer">
//                             <input
//                                 type="checkbox"
//                                 checked={exactMatch}
//                                 onChange={handleToggleExactMatch}
//                                 className="form-checkbox h-4 w-4 text-blue-600 rounded"
//                             />
//                             <span className="ml-2 text-sm text-gray-700">Exact name match</span>
//                         </label>
//                         <span className="ml-2 text-gray-500 text-xs flex items-center">
//                             <Info size={14} className="mr-1" />
//                             {exactMatch
//                                 ? "Only exact matches will be shown"
//                                 : "Partial matches will be included"}
//                         </span>
//                     </div>

//                     {/* Selected Name Display */}
//                     {selectedName && (
//                         <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
//                             <h4 className="text-sm font-medium text-blue-800 mb-1">Selected Name</h4>
//                             <div className="flex justify-between items-center">
//                                 <span className="text-blue-700 font-medium">{selectedName}</span>
//                                 <span className="text-xs bg-blue-100 px-2 py-1 rounded-full">
//                                     {searching ? 'Searching...' : `${totalRecords} records found`}
//                                 </span>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </Card>

//             {/* Error Alert */}
//             {error && (
//                 <Alert
//                     type="error"
//                     title="Error"
//                     message={error}
//                 />
//             )}

//             {/* Results Section */}
//             {selectedName && (
//                 <Card
//                     title={
//                         <div className="flex justify-between items-center">
//                             <span>{`Results for "${selectedName}"`}</span>
//                             <span className="text-sm text-gray-500">
//                                 {exactMatch ? "Exact match only" : "Including partial matches"}
//                             </span>
//                         </div>
//                     }
//                     className="mb-8"
//                 >
//                     {searching ? (
//                         <div className="py-8 text-center text-gray-500">
//                             Searching for records...
//                         </div>
//                     ) : (
//                         <>
//                             <div className="overflow-x-auto">
//                                 <Table
//                                     columns={propertyRecordsColumns}
//                                     data={records.map(r => ({ ...r.propertyRecord, searchInfo: r.searchInfo }))}
//                                     emptyMessage={`No property records found for "${selectedName}" in the selected district.`}
//                                 />
//                             </div>

//                             {records.length > 0 && (
//                                 <Pagination
//                                     currentPage={page}
//                                     totalPages={totalPages}
//                                     onPageChange={handlePageChange}
//                                 />
//                             )}
//                         </>
//                     )}
//                 </Card>
//             )}
//         </div>
//     );
// };

// export default PartyNameSearch;

import React, { useState, useEffect, useRef } from 'react';
import { Search, User, X, Filter, Info, Loader, Copy, FileText, Download } from 'lucide-react';
import { base_url } from '../utils/base_url';
import Button from '../components/Button';
import Card from '../components/Card';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Alert from '../components/Alert';

// Enhanced HighlightText component that properly handles full exact matches
const HighlightText = ({ text, searchTerm, exactMatchPriority = true }) => {
    if (!searchTerm || searchTerm.length < 2) return <span>{text}</span>;

    // Check for exact match with the entire search term
    if (exactMatchPriority && text.trim() === searchTerm.trim()) {
        return <span className="bg-yellow-200 font-medium">{text}</span>;
    }

    // Check for exact match ignoring case
    if (exactMatchPriority && text.trim().toLowerCase() === searchTerm.trim().toLowerCase()) {
        return <span className="bg-yellow-200 font-medium">{text}</span>;
    }

    // For partial matches, handle multiple search terms
    const searchTerms = searchTerm.split(/\s+/).filter(term => term.length >= 2);

    // If it's a full phrase match (e.g. "श्री डा० प्रदीप त्रिपाठी")
    // We should check if the text contains the exact phrase
    if (searchTerm.length > 5 && text.includes(searchTerm)) {
        let parts = text.split(new RegExp(`(${searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'g'));

        return (
            <span>
                {parts.map((part, i) =>
                    part === searchTerm ?
                        <span key={i} className="bg-yellow-200 font-medium">{part}</span> : part
                )}
            </span>
        );
    }

    // For individual term highlighting (when no full phrase match)
    // Process each search term separately with regex
    let highlightedText = text;
    let indices = [];

    // Collect all matches and their indices to avoid overlapping highlights
    searchTerms.forEach(term => {
        const regex = new RegExp(term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
        let match;
        while ((match = regex.exec(text)) !== null) {
            indices.push({
                start: match.index,
                end: match.index + match[0].length,
                term: match[0]
            });
        }
    });

    // Sort by start index and handle overlapping
    indices.sort((a, b) => a.start - b.start);

    // Remove overlapping matches
    for (let i = 0; i < indices.length - 1; i++) {
        if (indices[i + 1] && indices[i].end > indices[i + 1].start) {
            // If current match ends after next match starts, remove the shorter one
            if (indices[i].end - indices[i].start > indices[i + 1].end - indices[i + 1].start) {
                indices.splice(i + 1, 1);
            } else {
                indices.splice(i, 1);
            }
            i--; // Recheck the current index
        }
    }

    // If no matches found after processing
    if (indices.length === 0) {
        return <span>{text}</span>;
    }

    // Build the result with highlights
    let lastIndex = 0;
    const parts = [];

    indices.forEach((index, i) => {
        // Add text before the match
        if (index.start > lastIndex) {
            parts.push(
                <span key={`text-${i}`}>
                    {text.substring(lastIndex, index.start)}
                </span>
            );
        }

        // Add the highlighted match
        parts.push(
            <span key={`highlight-${i}`} className="bg-yellow-200 font-medium">
                {text.substring(index.start, index.end)}
            </span>
        );

        lastIndex = index.end;
    });

    // Add any remaining text
    if (lastIndex < text.length) {
        parts.push(
            <span key={`text-last`}>
                {text.substring(lastIndex)}
            </span>
        );
    }

    return <span>{parts}</span>;
};

// Usage in suggestion component
const SuggestionItem = ({ suggestion, searchQuery, onSelect, index, copiedIndex, onCopy }) => {
    // Check if this is an exact match with the search query
    const isExactMatch = suggestion.exactMatch ||
        suggestion.name.trim() === searchQuery.trim() ||
        suggestion.name.trim().toLowerCase() === searchQuery.trim().toLowerCase();

    return (
        <li
            onClick={() => onSelect(suggestion.name)}
            className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
        >
            <div className="flex justify-between items-center">
                <div className="flex-1 mr-2">
                    {/* Use the improved HighlightText component */}
                    <HighlightText
                        text={suggestion.name}
                        searchTerm={searchQuery}
                        exactMatchPriority={true}
                    />
                </div>
                <div className="flex items-center">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full mr-2">
                        {suggestion.count} records
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onCopy(suggestion.name, index);
                        }}
                        className="text-gray-400 hover:text-gray-600 p-1"
                        title="Copy name"
                    >
                        {copiedIndex === index ? (
                            <span className="text-green-500 text-xs">Copied!</span>
                        ) : (
                            <Copy size={14} />
                        )}
                    </button>
                </div>
            </div>
            {/* Display exact match indicator */}
            {isExactMatch && (
                <div className="mt-1 text-xs text-green-600">
                    Exact match
                </div>
            )}
        </li>
    );
};

const PartyNameSearch = () => {
    // State for search and results
    const [searchQuery, setSearchQuery] = useState('');
    const [districtCode, setDistrictCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedName, setSelectedName] = useState(null);
    const [exactMatch, setExactMatch] = useState(true);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searching, setSearching] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [noSuggestions, setNoSuggestions] = useState(false);

    // Districts dropdown options
    const [districts, setDistricts] = useState([
        { value: '164', label: 'Kanpur Nagar' },
        { value: '229', label: 'Lucknow' },
        { value: '146', label: 'Agra' },
        { value: '266', label: 'Sambhal' }
    ]);

    // Ref for search input and suggestions dropdown
    const searchInputRef = useRef(null);
    const suggestionsRef = useRef(null);

    // Close suggestions dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target) &&
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Extract search terms for highlighting
    const getHighlightTerms = (query) => {
        if (!query) return [];
        return query.split(/\s+/).filter(term => term.length >= 2);
    };

    // Fetch suggestions when search query changes
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!districtCode) {
                setError("Please select a district first");
                return;
            }

            if (!searchQuery || searchQuery.length < 2) {
                setSuggestions([]);
                setShowSuggestions(false);
                setNoSuggestions(false);
                return;
            }

            try {
                setSuggestionsLoading(true);
                setError(null);
                setNoSuggestions(false);

                const response = await fetch(
                    `${base_url}/api/property-records/party-suggestions?districtCode=${districtCode}&query=${encodeURIComponent(searchQuery)}`
                );

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    setSuggestions(data.data);
                    setShowSuggestions(true);
                    setNoSuggestions(data.data.length === 0);
                } else {
                    setError(data.message || "Failed to fetch suggestions");
                    setSuggestions([]);
                    setNoSuggestions(true);
                }
            } catch (err) {
                setError(`Error fetching suggestions: ${err.message}`);
                setSuggestions([]);
                setNoSuggestions(true);
            } finally {
                setSuggestionsLoading(false);
            }
        };

        // Use debounce to avoid too many API calls
        const debounceTimer = setTimeout(() => {
            if (searchQuery && searchQuery.length >= 2 && districtCode) {
                setShowSuggestions(false)
                fetchSuggestions();
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery, districtCode]);

    // Handle name selection from suggestions
    const handleSelectName = (name) => {
        setSelectedName(name);
        setSearchQuery(name);
        setShowSuggestions(false);
        setPage(1); // Reset to first page
    };

    // Fetch records when a name is selected or search parameters change
    const fetchRecordsByName = async () => {
        if (!selectedName || !districtCode) return;

        try {
            setSearching(true);
            setError(null);

            const response = await fetch(
                `${base_url}/api/property-records/party-records?districtCode=${districtCode}&name=${encodeURIComponent(selectedName)}&exactMatch=${exactMatch}&page=${page}&limit=${limit}`
            );

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setRecords(data.data);
                setTotalPages(data.totalPages);
                setTotalRecords(data.totalCount);

                if (data.data.length === 0) {
                    setError(`No records found for "${selectedName}". Try using partial match option.`);
                }
            } else {
                setError(data.message || "Failed to fetch records");
                setRecords([]);
            }
        } catch (err) {
            setError(`Error fetching records: ${err.message}`);
            setRecords([]);
        } finally {
            setSearching(false);
        }
    };

    // Trigger search when parameters change
    useEffect(() => {
        if (selectedName) {
            fetchRecordsByName();
        }
    }, [selectedName, exactMatch, page, limit, districtCode]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (selectedName) {
            setSelectedName(null); // Clear selected name when input changes
            setRecords([]);
        }
    };

    // Handle district change
    const handleDistrictChange = (e) => {
        setDistrictCode(e.target.value);
        setSearchQuery('');
        setSelectedName(null);
        setSuggestions([]);
        setShowSuggestions(false);
        setRecords([]);
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    // Clear search
    const handleClearSearch = () => {
        setSearchQuery('');
        setSelectedName(null);
        setSuggestions([]);
        setShowSuggestions(false);
        setRecords([]);
        setNoSuggestions(false);
    };

    // Handle search button click
    const handleSearchButton = () => {
        if (searchQuery) {
            setSelectedName(searchQuery);
        }
    };

    // Toggle exact match option
    const handleToggleExactMatch = () => {
        setExactMatch(!exactMatch);
    };

    // Copy name to clipboard
    const handleCopyName = (name, index) => {
        navigator.clipboard.writeText(name);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    // Export results to CSV
    const handleExportCSV = () => {
        if (records.length === 0) return;

        // Define headers
        const headers = [
            'Reg No', 'Year', 'Date', 'Type', 'District', 'SRO', 'Village',
            'First Party', 'Second Party', 'Property Description'
        ];

        // Format data
        const csvData = records.map(r => {
            const record = r.propertyRecord;
            return [
                record.regNo || '',
                record.year || '',
                record.regDate || '',
                record.deedType || '',
                r.searchInfo.districtCode || '',
                r.searchInfo.sroCode || '',
                r.searchInfo.gaonCode1 || '',
                record.partyNames && record.partyNames.length > 0 ? record.partyNames[0] : '',
                record.partyNames && record.partyNames.length > 1 ? record.partyNames[1] : '',
                record.propertyDesc || ''
            ];
        });

        // Create CSV content
        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `party_search_results_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Define table columns for property records
    const propertyRecordsColumns = [
        {
            header: 'Registration Details',
            accessor: 'regNo',
            render: (row) => (
                <div>
                    <div><span className="font-medium">Reg No:</span> {row.regNo}/{row.year}</div>
                    <div><span className="font-medium">Date:</span> {row.regDate}</div>
                    <div><span className="font-medium">Type:</span> {row.deedType}</div>
                </div>
            )
        },
        {
            header: 'Location',
            accessor: 'searchInfo',
            render: (row, originalRow) => (
                <div>
                    <div><span className="font-medium">District:</span> {originalRow.searchInfo.districtCode}</div>
                    <div><span className="font-medium">SRO:</span> {originalRow.searchInfo.sroCode}</div>
                    <div><span className="font-medium">Village:</span> {originalRow.searchInfo.gaonCode1}</div>
                </div>
            )
        },
        {
            header: 'Parties',
            accessor: 'partyNames',
            render: (row) => (
                <div>
                    {row.partyNames && row.partyNames.map((name, idx) => {
                        // Highlight the matched name with the search term
                        const isMatch = selectedName &&
                            (exactMatch ?
                                name === selectedName :
                                name.toLowerCase().includes(selectedName.toLowerCase()));

                        return (
                            <div
                                key={idx}
                                className={isMatch ? "font-semibold bg-yellow-100 p-1 rounded mb-1" : "mb-1"}
                            >
                                {idx === 0 ? '1st Party: ' : idx === 1 ? '2nd Party: ' : `Party ${idx + 1}: `}
                                {isMatch ? (
                                    <HighlightText text={name} searchTerm={selectedName} />
                                ) : (
                                    name
                                )}
                            </div>
                        );
                    })}
                </div>
            )
        },
        {
            header: 'Property',
            accessor: 'propertyDesc',
            render: (row) => (
                <div className="max-w-md">
                    <div className="line-clamp-3">{row.propertyDesc || 'No description available'}</div>
                </div>
            )
        }
    ];

    // Get terms to highlight in suggestions
    const highlightTerms = getHighlightTerms(searchQuery);

    return (
        <div className="min-h-screen mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
                <User className="mr-2" size={28} />
                Search by Party Name
            </h1>

            <Card title="Search by Party Name" className="mb-8">
                <div className="space-y-4">
                    {/* District Selection */}
                    <div>
                        <label htmlFor="districtCode" className="block text-sm font-medium text-gray-700 mb-1">
                            District
                        </label>
                        <select
                            id="districtCode"
                            value={districtCode}
                            onChange={handleDistrictChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select District</option>
                            {districts.map(district => (
                                <option key={district.value} value={district.value}>
                                    {district.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Party Name Search */}
                    <div className="relative">
                        <label htmlFor="partyName" className="block text-sm font-medium text-gray-700 mb-1">
                            Party Name
                        </label>
                        <div className="relative flex">
                            <div className="relative flex-grow">
                                <input
                                    id="partyName"
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onClick={() => {
                                        if (suggestions.length > 0) {
                                            setShowSuggestions(true);
                                        }
                                    }}
                                    placeholder="Start typing a name (min 2 characters)"
                                    disabled={!districtCode}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                {searchQuery && !suggestionsLoading && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                                {suggestionsLoading && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-500">
                                        <Loader size={16} className="animate-spin" />
                                    </div>
                                )}
                            </div>
                            <Button
                                type="button"
                                className="ml-2"
                                disabled={!searchQuery || isLoading || !districtCode || searching}
                                onClick={handleSearchButton}
                            >
                                {searching ? (
                                    <>
                                        <Loader size={16} className="mr-1 animate-spin" />
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <Search size={16} className="mr-1" />
                                        Search
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && (
                            <div
                                ref={suggestionsRef}
                                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-96 overflow-y-auto"
                                style={{ maxHeight: '350px' }}
                            >
                                {suggestions.length > 0 ? (
                                    <ul className="py-1 divide-y divide-gray-100">
                                        {suggestions.map((suggestion, index) => (
                                            <SuggestionItem
                                                key={index}
                                                suggestion={suggestion}
                                                searchQuery={searchQuery}
                                                onSelect={handleSelectName}
                                                index={index}
                                                copiedIndex={copiedIndex}
                                                onCopy={handleCopyName}
                                            />
                                        ))}
                                    </ul>
                                ) : (
                                    noSuggestions && (
                                        <div className="p-4 text-center text-gray-500">
                                            No matching names found
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    {/* Search Options */}
                    <div className="flex items-center mt-2">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={exactMatch}
                                onChange={handleToggleExactMatch}
                                className="form-checkbox h-4 w-4 text-blue-600 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Exact name match</span>
                        </label>
                        <span className="ml-2 text-gray-500 text-xs flex items-center">
                            <Info size={14} className="mr-1" />
                            {exactMatch
                                ? "Only exact matches will be shown"
                                : "Partial matches will be included"}
                        </span>
                    </div>

                    {/* Selected Name Display */}
                    {selectedName && (
                        <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                            <h4 className="text-sm font-medium text-blue-800 mb-1">Selected Name</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-blue-700 font-medium">{selectedName}</span>
                                <span className="text-xs bg-blue-100 px-2 py-1 rounded-full">
                                    {searching ? (
                                        <span className="flex items-center">
                                            <Loader size={10} className="mr-1 animate-spin" />
                                            Searching...
                                        </span>
                                    ) : (
                                        `${totalRecords} records found`
                                    )}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Error Alert */}
            {error && (
                <Alert
                    type="error"
                    title="Error"
                    message={error}
                />
            )}

            {/* Results Section */}
            {selectedName && (
                <Card
                    title={
                        <div className="flex justify-between items-center">
                            <span>{`Results for "${selectedName}"`}</span>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-500 mr-4">
                                    {exactMatch ? "Exact match only" : "Including partial matches"}
                                </span>
                                {records.length > 0 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleExportCSV}
                                        className="flex items-center text-sm"
                                    >
                                        <Download size={14} className="mr-1" />
                                        Export CSV
                                    </Button>
                                )}
                            </div>
                        </div>
                    }
                    className="mb-8"
                >
                    {searching ? (
                        <div className="py-16 text-center text-gray-500">
                            <Loader size={32} className="animate-spin mx-auto mb-4" />
                            <p>Searching for records...</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <Table
                                    columns={propertyRecordsColumns}
                                    data={records.map(r => ({ ...r.propertyRecord, searchInfo: r.searchInfo }))}
                                    emptyMessage={`No property records found for "${selectedName}" in the selected district.`}
                                />
                            </div>

                            {records.length > 0 && (
                                <div className="mt-4">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                    <div className="text-xs text-center text-gray-500 mt-2">
                                        Showing {records.length} of {totalRecords} records
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </Card>
            )}
        </div>
    );
};

export default PartyNameSearch;