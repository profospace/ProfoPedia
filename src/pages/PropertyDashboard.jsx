// import React, { useState, useEffect, useRef } from 'react';
// import { Search, Filter, FileText, ChevronLeft, Info, Download, Copy, X, Loader } from 'lucide-react';
// import { base_url } from '../utils/base_url';
// import Button from '../components/Button';
// import Input from '../components/Input';
// import FieldDisplay from '../components/FieldDisplay';
// import Alert from '../components/Alert';
// import Card from '../components/Card';
// import Pagination from '../components/Pagination';
// import Select from '../components/Select';
// import Table from '../components/Table';
// import UnifiedLocationSearch from '../components/UnifiedLocationSearch';
// import LocationSelectionDialog from '../components/LocationSelectionDialog ';

// // Enhanced HighlightText component that properly handles full exact matches
// const HighlightText = ({ text, searchTerm, exactMatchPriority = true }) => {
//     if (!searchTerm || searchTerm.length < 2) return <span>{text}</span>;

//     // Check for exact match with the entire search term
//     if (exactMatchPriority && text.trim() === searchTerm.trim()) {
//         return <span className="bg-yellow-200 font-medium">{text}</span>;
//     }

//     // Check for exact match ignoring case
//     if (exactMatchPriority && text.trim().toLowerCase() === searchTerm.trim().toLowerCase()) {
//         return <span className="bg-yellow-200 font-medium">{text}</span>;
//     }

//     // For partial matches, handle multiple search terms
//     const searchTerms = searchTerm.split(/\s+/).filter(term => term.length >= 2);

//     // If it's a full phrase match (e.g. "श्री डा० प्रदीप त्रिपाठी")
//     // We should check if the text contains the exact phrase
//     if (searchTerm.length > 5 && text.includes(searchTerm)) {
//         let parts = text.split(new RegExp(`(${searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'g'));

//         return (
//             <span>
//                 {parts.map((part, i) =>
//                     part === searchTerm ?
//                         <span key={i} className="bg-yellow-200 font-medium">{part}</span> : part
//                 )}
//             </span>
//         );
//     }

//     // For individual term highlighting (when no full phrase match)
//     // Process each search term separately with regex
//     let highlightedText = text;
//     let indices = [];

//     // Collect all matches and their indices to avoid overlapping highlights
//     searchTerms.forEach(term => {
//         const regex = new RegExp(term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
//         let match;
//         while ((match = regex.exec(text)) !== null) {
//             indices.push({
//                 start: match.index,
//                 end: match.index + match[0].length,
//                 term: match[0]
//             });
//         }
//     });

//     // Sort by start index and handle overlapping
//     indices.sort((a, b) => a.start - b.start);

//     // Remove overlapping matches
//     for (let i = 0; i < indices.length - 1; i++) {
//         if (indices[i + 1] && indices[i].end > indices[i + 1].start) {
//             // If current match ends after next match starts, remove the shorter one
//             if (indices[i].end - indices[i].start > indices[i + 1].end - indices[i + 1].start) {
//                 indices.splice(i + 1, 1);
//             } else {
//                 indices.splice(i, 1);
//             }
//             i--; // Recheck the current index
//         }
//     }

//     // If no matches found after processing
//     if (indices.length === 0) {
//         return <span>{text}</span>;
//     }

//     // Build the result with highlights
//     let lastIndex = 0;
//     const parts = [];

//     indices.forEach((index, i) => {
//         // Add text before the match
//         if (index.start > lastIndex) {
//             parts.push(
//                 <span key={`text-${i}`}>
//                     {text.substring(lastIndex, index.start)}
//                 </span>
//             );
//         }

//         // Add the highlighted match
//         parts.push(
//             <span key={`highlight-${i}`} className="bg-yellow-200 font-medium">
//                 {text.substring(index.start, index.end)}
//             </span>
//         );

//         lastIndex = index.end;
//     });

//     // Add any remaining text
//     if (lastIndex < text.length) {
//         parts.push(
//             <span key={`text-last`}>
//                 {text.substring(lastIndex)}
//             </span>
//         );
//     }

//     return <span>{parts}</span>;
// };

// // Enhanced SuggestionItem component
// const SuggestionItem = ({ suggestion, searchQuery, onSelect, index, copiedIndex, onCopy }) => {
//     // Check if this is an exact match with the search query
//     const isExactMatch = suggestion.exactMatch ||
//         suggestion.name.trim() === searchQuery.trim() ||
//         suggestion.name.trim().toLowerCase() === searchQuery.trim().toLowerCase();

//     // Updated to pass the entire suggestion object with location data
//     const handleSelect = () => {
//         onSelect({
//             name: suggestion.name,
//             sroCode: suggestion.sroCode,
//             gaonCode1: suggestion.gaonCode1,
//             // Include other useful fields
//             sroCodes: suggestion.sroCodes,
//             gaonCodes: suggestion.gaonCodes,
//             count: suggestion.count,
//             exactMatch: suggestion.exactMatch
//         });
//     };

//     return (
//         <li
//             onClick={handleSelect}
//             className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
//         >
//             <div className="flex justify-between items-center">
//                 <div className="flex-1 mr-2">
//                     {/* Use the improved HighlightText component */}
//                     <HighlightText
//                         text={suggestion.name}
//                         searchTerm={searchQuery}
//                         exactMatchPriority={true}
//                     />
//                 </div>
//                 <div className="flex items-center">
//                     <span className="text-xs bg-gray-100 px-2 py-1 rounded-full mr-2">
//                         {suggestion.count} records
//                     </span>
//                     <button
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             onCopy(suggestion.name, index);
//                         }}
//                         className="text-gray-400 hover:text-gray-600 p-1"
//                         title="Copy name"
//                     >
//                         {copiedIndex === index ? (
//                             <span className="text-green-500 text-xs">Copied!</span>
//                         ) : (
//                             <Copy size={14} />
//                         )}
//                     </button>
//                 </div>
//             </div>
//             {/* Display exact match indicator */}
//             {isExactMatch && (
//                 <div className="mt-1 text-xs text-green-600">
//                     Exact match
//                 </div>
//             )}
//             {/* Display location info (only if available) */}
//             {(suggestion.sroCode || suggestion.gaonCode1) && (
//                 <div className="mt-1 text-xs text-gray-500">
//                     Location: {suggestion.sroCode && `SRO: ${suggestion.sroCode}`}
//                     {suggestion.sroCode && suggestion.gaonCode1 && ' | '}
//                     {suggestion.gaonCode1 && `Gaon: ${suggestion.gaonCode1}`}
//                 </div>
//             )}
//         </li>
//     );
// };

// // Main Dashboard Component
// const PropertyDashboard = () => {
//     // State for filter values
//     const [districtCode, setDistrictCode] = useState('');
//     const [sroCode, setSroCode] = useState('');
//     const [gaonCode1, setGaonCode1] = useState('');
//     const [propertyId, setPropertyId] = useState('');
//     const [regNo, setRegNo] = useState('');
//     const [year, setYear] = useState('');
//     const [partyName, setPartyName] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // State for selected location
//     const [selectedLocation, setSelectedLocation] = useState(null);

//     // State for search results and pagination
//     const [records, setRecords] = useState([]);
//     const [currentRecord, setCurrentRecord] = useState(null);
//     const [totalRecords, setTotalRecords] = useState(0);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//     const [totalPages, setTotalPages] = useState(1);



//     const [searchQuery, setSearchQuery] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [suggestionsLoading, setSuggestionsLoading] = useState(false);
//     const [suggestions, setSuggestions] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const [selectedName, setSelectedName] = useState(null);
//     const [exactMatch, setExactMatch] = useState(true);
//     const [searching, setSearching] = useState(false);
//     const [copiedIndex, setCopiedIndex] = useState(null);
//     const [noSuggestions, setNoSuggestions] = useState(false);

//     const [selectedSuggestion, setSelectedSuggestion] = useState(null);

//     const [showLocationDialog, setShowLocationDialog] = useState(false);
//     const [locationOptions, setLocationOptions] = useState([]);
//     const [isLoadingLocations, setIsLoadingLocations] = useState(false);

//     // Modified handleSelectName function
//     const handleSelectName = async (suggestionData) => {
//         // Update the search query with the name
//         setSearchQuery(suggestionData.name);

//         // First check if this name might exist in multiple locations
//         if (suggestionData.count > 10) { // Adjust this threshold as needed
//             try {
//                 setIsLoadingLocations(true);

//                 // Fetch all locations for this name
//                 const response = await fetch(
//                     `${base_url}/api/property-records/party-locations?districtCode=${districtCode}&name=${encodeURIComponent(suggestionData.name)}`
//                 );

//                 if (!response.ok) {
//                     throw new Error(`API error: ${response.status}`);
//                 }

//                 const data = await response.json();

//                 if (data.success && data.data.length > 1) {
//                     // If multiple locations exist, show the selection dialog
//                     setLocationOptions(data.data);
//                     setSelectedName(suggestionData.name);
//                     setShowLocationDialog(true);
//                     setShowSuggestions(false);
//                     return; // Exit early, wait for user selection
//                 } else if (data.success && data.data.length === 1) {
//                     // Only one location, continue with that
//                     handleLocationSelect(data.data[0]);
//                 } else {
//                     // No locations found, unusual case, just continue with suggestion data
//                     console.warn("No locations found for this name, using suggestion data");
//                     proceedWithSuggestion(suggestionData);
//                 }
//             } catch (error) {
//                 console.error("Error fetching locations:", error);
//                 // Fallback to using suggestion data directly
//                 proceedWithSuggestion(suggestionData);
//             } finally {
//                 setIsLoadingLocations(false);
//             }
//         } else {
//             // For names with few occurrences, proceed directly
//             proceedWithSuggestion(suggestionData);
//         }
//     };

//     // Helper function to proceed with suggestion data
//     const proceedWithSuggestion = (suggestionData) => {
//         setSelectedSuggestion(suggestionData);
//         setSelectedName(suggestionData.name);

//         // If suggestion contains location data, update the location fields
//         if (suggestionData.sroCode) {
//             setSroCode(suggestionData.sroCode);
//         }

//         if (suggestionData.gaonCode1) {
//             setGaonCode1(suggestionData.gaonCode1);
//         }

//         setShowSuggestions(false);
//         setPage(1); // Reset to first page

//         // Optionally trigger search immediately
//         fetchRecordsByName();
//     };

//     // Handler for when user selects a location from dialog
//     const handleLocationSelect = (locationData) => {
//         setShowLocationDialog(false);

//         // Create a full suggestion object with the selected location data
//         const enhancedSuggestion = {
//             name: selectedName,
//             sroCode: locationData.sroCode,
//             gaonCode1: locationData.gaonCode1,
//             districtCode: locationData.districtCode,
//             count: locationData.recordCount || 0
//         };

//         // Process with the enhanced suggestion that now has location data
//         proceedWithSuggestion(enhancedSuggestion);
//     };

//     // State for district options
//     const [districts, setDistricts] = useState([
//         { value: '164', label: 'Kanpur Nagar' },
//         { value: '229', label: 'Lucknow' },
//         { value: '146', label: 'Agra' },
//         { value: '266', label: 'Sambhal' }
//     ]);

//     // Define table columns for property records
//     const propertyRecordsColumns = [
//         { header: 'S.No', accessor: 'serialNo' },
//         { header: 'Reg No.', accessor: 'regNo' },
//         { header: 'Year', accessor: 'year' },
//         { header: 'Deed Type', accessor: 'deedType' },
//         { header: 'Reg Date', accessor: 'regDate' },
//         { header: 'Khata No.', accessor: 'khataNo', render: (row) => row.khataNo || '-' },
//         {
//             header: 'First Party',
//             accessor: 'partyNames',
//             render: (row) => row.partyNames && row.partyNames.length > 0 ? row.partyNames[0] : '-'
//         },
//         {
//             header: 'First Party Address',
//             accessor: 'partyAddresses',
//             render: (row) => (
//                 <div className="max-w-2xl">
//                     {row.partyAddresses && row.partyAddresses.length > 0 ? row.partyAddresses[0] : '-'}
//                 </div>
//             )
//         },
//         {
//             header: 'Second Party',
//             accessor: 'partyNames',
//             render: (row) => row.partyNames && row.partyNames.length > 1 ? row.partyNames[1] : '-'
//         },
//         {
//             header: 'Property Description',
//             accessor: 'propertyDesc',
//             render: (row) => (
//                 <div className="max-w-2xl">
//                     {row.propertyDesc || '-'}
//                 </div>
//             )
//         }
//     ];

//     // Handle location selection from UnifiedLocationSearch
//     // const handleLocationSelect = (locationData) => {
//     //     if (locationData) {
//     //         // Set SRO code and Gaon code based on selected location
//     //         setSroCode(locationData.tehsilCode); // tehsilCode is same as sroCode
//     //         setGaonCode1(locationData.gaonCode1);
//     //         setSelectedLocation(locationData);
//     //     } else {
//     //         // Clear location data if selection is cleared
//     //         setSroCode('');
//     //         setGaonCode1('');
//     //         setSelectedLocation(null);
//     //     }
//     // };

//     // Reset pagination when filters change
//     useEffect(() => {
//         setPage(1);
//     }, [districtCode, sroCode, gaonCode1, regNo, year, partyName, startDate, endDate]);

//     // Function to view details of a specific property
//     const viewPropertyDetails = (property) => {
//         setCurrentRecord(property);
//     };

//     // Function to get paginated records - now handled by the server
//     const getPaginatedRecords = () => {
//         // With the updated API, pagination is handled on the server side
//         // So we just return the current records as they are already paginated
//         return records;
//     };

//     // Search function - Submit new search criteria to API
//     const handleSearch = async (e) => {
//         e.preventDefault();

//         try {
//             setLoading(true);
//             setError(null);
//             setPage(1); // Reset to first page on new search

//             // Check required fields
//             if (!districtCode) {
//                 setError('Please select a district to search');
//                 setLoading(false);
//                 return;
//             }

//             // Prepare request body with all filter criteria
//             const requestBody = {
//                 districtCode,
//                 page,
//                 limit
//             };

//             // Add optional filters if they have values
//             if (sroCode) requestBody.sroCode = sroCode;
//             if (gaonCode1) requestBody.gaonCode1 = gaonCode1;
//             if (regNo) requestBody.regNo = regNo;
//             if (year) requestBody.year = year;
//             if (partyName) requestBody.partyName = partyName;
//             if (startDate) requestBody.startDate = startDate;
//             if (endDate) requestBody.endDate = endDate;
//             if (propertyId) requestBody.propertyId = propertyId;

//             console.log("Search request body:", requestBody);

//             // Send POST request to API
//             const response = await fetch(`${base_url}/api/property-records/search`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(requestBody)
//             });

//             // Handle non-successful responses
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to fetch property data');
//             }

//             // Parse data from successful response
//             const data = await response.json();
//             console.log("Search response:", data);

//             // Extract property records based on the updated API response structure
//             let propertyRecords = [];

//             if (data && data.success) {
//                 if (data.data && Array.isArray(data.data)) {
//                     // Process each record from the updated API format
//                     propertyRecords = data.data.flatMap(record =>
//                         record.matchingRecords || []
//                     );

//                     // Update pagination information from the API response
//                     setTotalRecords(data.totalCount || 0);
//                     setTotalPages(data.totalPages || 1);
//                     setPage(data.page || 1);
//                 }
//             }

//             setRecords(propertyRecords);

//             // Show success message if records were found
//             if (propertyRecords.length > 0) {
//                 setError(null);
//             } else {
//                 setError('No property records found for the given criteria.');
//             }

//         } catch (err) {
//             setError('An error occurred: ' + (err.message || err));
//             console.error('Error searching property data:', err);
//             setRecords([]);
//             setTotalRecords(0);
//             setTotalPages(0);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Clear filters
//     const handleClear = () => {
//         setDistrictCode('');
//         setSroCode('');
//         setGaonCode1('');
//         setSelectedLocation(null);
//         setPropertyId('');
//         setRegNo('');
//         setYear('');
//         setPartyName('');
//         setStartDate('');
//         setEndDate('');
//         setCurrentRecord(null);
//         setPage(1);
//         setRecords([]);
//         setTotalRecords(0);
//         setTotalPages(0);
//     };

//     // Handle pagination - now triggers a new search with updated page number
//     const handlePageChange = async (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setPage(newPage);

//             // Immediately trigger a new search with the updated page number
//             try {
//                 setLoading(true);

//                 // Prepare request body with all filter criteria and the new page number
//                 const requestBody = {
//                     districtCode,
//                     page: newPage,
//                     limit
//                 };

//                 // Add optional filters if they have values
//                 if (sroCode) requestBody.sroCode = sroCode;
//                 if (gaonCode1) requestBody.gaonCode1 = gaonCode1;
//                 if (regNo) requestBody.regNo = regNo;
//                 if (year) requestBody.year = year;
//                 if (partyName) requestBody.partyName = partyName;
//                 if (startDate) requestBody.startDate = startDate;
//                 if (endDate) requestBody.endDate = endDate;
//                 if (propertyId) requestBody.propertyId = propertyId;

//                 // Send POST request to API
//                 const response = await fetch(`${base_url}/api/property-records/search`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(requestBody)
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || 'Failed to fetch property data');
//                 }

//                 const data = await response.json();

//                 // Extract property records
//                 let propertyRecords = [];
//                 if (data && data.success && data.data && Array.isArray(data.data)) {
//                     propertyRecords = data.data.flatMap(record =>
//                         record.matchingRecords || []
//                     );

//                     // Update pagination information
//                     setTotalRecords(data.totalCount || 0);
//                     setTotalPages(data.totalPages || 1);
//                 }

//                 setRecords(propertyRecords);

//             } catch (err) {
//                 setError('Error changing page: ' + (err.message || err));
//                 console.error('Error fetching page data:', err);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     // Export current data to CSV
//     const exportToCSV = () => {
//         if (records.length === 0) return;

//         // Define all headers
//         const headers = [
//             'Serial No', 'Reg No', 'Year', 'Deed Type', 'Reg Date', 'Khata No',
//             'Property Description', 'First Party', 'First Party Address',
//             'Second Party', 'Second Party Address', 'District Code', 'SRO Code',
//             'PCode', 'Receipt No', 'Property Number', 'Sub Deed Code', 'ID'
//         ];

//         // Format data rows
//         const csvRows = records.map(record => {
//             const firstParty = record.partyNames && record.partyNames.length > 0 ? record.partyNames[0] : '';
//             const firstPartyAddress = record.partyAddresses && record.partyAddresses.length > 0 ? record.partyAddresses[0] : '';
//             const secondParty = record.partyNames && record.partyNames.length > 1 ? record.partyNames[1] : '';
//             const secondPartyAddress = record.partyAddresses && record.partyAddresses.length > 1 ? record.partyAddresses[1] : '';

//             return [
//                 record.serialNo || '',
//                 record.regNo || '',
//                 record.year || '',
//                 record.deedType || '',
//                 record.regDate || '',
//                 record.khataNo || '',
//                 record.propertyDesc || '',
//                 firstParty,
//                 firstPartyAddress,
//                 secondParty,
//                 secondPartyAddress,
//                 record.details?.dcode || '',
//                 record.details?.srocode || '',
//                 record.details?.pcode || '',
//                 record.details?.recieptNo || '',
//                 record.details?.propertyNum || '',
//                 record.details?.subDeedCode || '',
//                 record._id || ''
//             ];
//         });

//         // Create CSV content
//         const csvContent = [
//             headers.join(','),
//             ...csvRows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
//         ].join('\n');

//         // Create download link
//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', `property_records_${new Date().toISOString().slice(0, 10)}.csv`);
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };


//     /* Copy */
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

//     // Extract search terms for highlighting
//     const getHighlightTerms = (query) => {
//         if (!query) return [];
//         return query.split(/\s+/).filter(term => term.length >= 2);
//     };

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
//                 setNoSuggestions(false);
//                 return;
//             }

//             try {
//                 setSuggestionsLoading(true);
//                 setError(null);
//                 setNoSuggestions(false);

//                 const response = await fetch(
//                     `${base_url}/api/property-records/party-suggestions?districtCode=${districtCode}&query=${encodeURIComponent(searchQuery)}`
//                 );

//                 if (!response.ok) {
//                     throw new Error(`API error: ${response.status}`);
//                 }

//                 const data = await response.json();

//                 if (data.success) {
//                     setSuggestions(data.data);
//                     setShowSuggestions(true);
//                     setNoSuggestions(data.data.length === 0);
//                 } else {
//                     setError(data.message || "Failed to fetch suggestions");
//                     setSuggestions([]);
//                     setNoSuggestions(true);
//                 }
//             } catch (err) {
//                 setError(`Error fetching suggestions: ${err.message}`);
//                 setSuggestions([]);
//                 setNoSuggestions(true);
//             } finally {
//                 setSuggestionsLoading(false);
//             }
//         };

//         // Use debounce to avoid too many API calls
//         const debounceTimer = setTimeout(() => {
//             if (searchQuery && searchQuery.length >= 2 && districtCode) {
//                 setShowSuggestions(false)
//                 fetchSuggestions();
//             }
//         }, 300);

//         return () => clearTimeout(debounceTimer);
//     }, [searchQuery, districtCode]);

//     // Handle name selection from suggestions
//     // const handleSelectName = (name) => {
//     //     setSelectedName(name);
//     //     setSearchQuery(name);
//     //     setShowSuggestions(false);
//     //     setPage(1); // Reset to first page
//     // };

//     // // Fetch records when a name is selected or search parameters change
//     // const fetchRecordsByName = async () => {
//     //     if (!selectedName || !districtCode) return;

//     //     try {
//     //         setSearching(true);
//     //         setError(null);

//     //         const response = await fetch(
//     //             `${base_url}/api/property-records/party-records?districtCode=${districtCode}&name=${encodeURIComponent(selectedName)}&exactMatch=${exactMatch}&page=${page}&limit=${limit}`
//     //         );

//     //         if (!response.ok) {
//     //             throw new Error(`API error: ${response.status}`);
//     //         }

//     //         const data = await response.json();

//     //         if (data.success) {
//     //             setRecords(data.data);
//     //             setTotalPages(data.totalPages);
//     //             setTotalRecords(data.totalCount);

//     //             if (data.data.length === 0) {
//     //                 setError(`No records found for "${selectedName}". Try using partial match option.`);
//     //             }
//     //         } else {
//     //             setError(data.message || "Failed to fetch records");
//     //             setRecords([]);
//     //         }
//     //     } catch (err) {
//     //         setError(`Error fetching records: ${err.message}`);
//     //         setRecords([]);
//     //     } finally {
//     //         setSearching(false);
//     //     }
//     // };

//     // Update the handleSelectName function to accept the full suggestion object
//     // const handleSelectName = (suggestionData) => {
//     //     // Store the full suggestion data
//     //     setSelectedSuggestion(suggestionData);

//     //     // Update the search query with the name
//     //     setSearchQuery(suggestionData.name);

//     //     // Also set the name for backward compatibility
//     //     setSelectedName(suggestionData.name);

//     //     // If suggestion contains location data, update the location fields
//     //     if (suggestionData.sroCode) {
//     //         setSroCode(suggestionData.sroCode);
//     //     }

//     //     if (suggestionData.gaonCode1) {
//     //         setGaonCode1(suggestionData.gaonCode1);
//     //     }

//     //     // If there are multiple locations for this name, you might want to 
//     //     // display this information to the user
//     //     const hasMultipleLocations =
//     //         (suggestionData.sroCodes && suggestionData.sroCodes.length > 1) ||
//     //         (suggestionData.gaonCodes && suggestionData.gaonCodes.length > 1);

//     //     // Update UI to show the user if this name exists in multiple locations
//     //     if (hasMultipleLocations) {
//     //         // Could set a state variable to show this information
//     //         setShowMultipleLocationsInfo(true);
//     //     }

//     //     setShowSuggestions(false);
//     //     setPage(1); // Reset to first page
//     // };

//     // Update your fetchRecordsByName function to use the stored location data
//     const fetchRecordsByName = async () => {
//         if (!selectedName || !districtCode) return;

//         try {
//             setSearching(true);
//             setError(null);

//             // If we have selected suggestion with location data, use it
//             const sroCodeParam = selectedSuggestion?.sroCode || sroCode;
//             const gaonCodeParam = selectedSuggestion?.gaonCode1 || gaonCode1;

//             let url = `${base_url}/api/property-records/party-records?districtCode=${districtCode}&name=${encodeURIComponent(selectedName)}&exactMatch=${exactMatch}&page=${page}&limit=${limit}`;

//             // Append location parameters if available
//             if (sroCodeParam) {
//                 url += `&sroCode=${sroCodeParam}`;
//             }

//             if (gaonCodeParam) {
//                 url += `&gaonCode1=${gaonCodeParam}`;
//             }

//             const response = await fetch(url);

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

//     // Clear search
//     // const handleClearSearch = () => {
//     //     setSearchQuery('');
//     //     setSelectedName(null);
//     //     setSuggestions([]);
//     //     setShowSuggestions(false);
//     //     setRecords([]);
//     //     setNoSuggestions(false);
//     // };

//     // Modified clear search function to also clear the selectedSuggestion
//     const handleClearSearch = () => {
//         setSearchQuery('');
//         setSelectedName(null);
//         setSelectedSuggestion(null); // Add this line
//         setSuggestions([]);
//         setShowSuggestions(false);
//         setRecords([]);
//         setNoSuggestions(false);
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

//     // Copy name to clipboard
//     const handleCopyName = (name, index) => {
//         navigator.clipboard.writeText(name);
//         setCopiedIndex(index);
//         setTimeout(() => setCopiedIndex(null), 2000);
//     };

//     // Export results to CSV
//     const handleExportCSV = () => {
//         if (records.length === 0) return;

//         // Define headers
//         const headers = [
//             'Reg No', 'Year', 'Date', 'Type', 'District', 'SRO', 'Village',
//             'First Party', 'Second Party', 'Property Description'
//         ];

//         // Format data
//         const csvData = records.map(r => {
//             const record = r.propertyRecord;
//             return [
//                 record.regNo || '',
//                 record.year || '',
//                 record.regDate || '',
//                 record.deedType || '',
//                 r.searchInfo.districtCode || '',
//                 r.searchInfo.sroCode || '',
//                 r.searchInfo.gaonCode1 || '',
//                 record.partyNames && record.partyNames.length > 0 ? record.partyNames[0] : '',
//                 record.partyNames && record.partyNames.length > 1 ? record.partyNames[1] : '',
//                 record.propertyDesc || ''
//             ];
//         });

//         // Create CSV content
//         const csvContent = [
//             headers.join(','),
//             ...csvData.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
//         ].join('\n');

//         // Create download link
//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', `party_search_results_${new Date().toISOString().slice(0, 10)}.csv`);
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     // Get terms to highlight in suggestions
//     const highlightTerms = getHighlightTerms(searchQuery);

//     return (
//         <div className="container mx-auto py-8 px-4">
//             <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
//                 <FileText className="mr-2" size={28} />
//                 Property Records Dashboard
//             </h1>

//             {/* Filters Section */}
//             <Card
//                 title="Search Property Records"
//                 icon={<Filter size={18} />}
//                 className="mb-8"
//             >
//                 <form onSubmit={handleSearch} className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {/* District Selection */}
//                         <Select
//                             id="districtCode"
//                             label="District"
//                             value={districtCode}
//                             onChange={(value) => {
//                                 setDistrictCode(value);
//                                 // Clear dependent fields when district changes
//                                 setSroCode('');
//                                 setGaonCode1('');
//                                 setSelectedLocation(null);
//                             }}
//                             options={districts}
//                             placeholder="Select district first"
//                         />

//                         {/* Unified Location Search - Direct search across all tehsils/areas */}
//                         <UnifiedLocationSearch
//                             districtCode={districtCode}
//                             onSelectLocation={handleLocationSelect}
//                         />

//                         {/* Optional Property ID */}
//                         <Input
//                             id="propertyId"
//                             label="Property ID (Optional)"
//                             value={propertyId}
//                             onChange={(e) => setPropertyId(e.target.value)}
//                             placeholder="Enter Property ID if known"
//                         />

//                         {/* Registration Number */}
//                         <Input
//                             id="regNo"
//                             label="Registration Number"
//                             value={regNo}
//                             onChange={(e) => setRegNo(e.target.value)}
//                             placeholder="Enter Registration Number"
//                         />

//                         {/* Year */}
//                         <Input
//                             id="year"
//                             label="Year"
//                             value={year}
//                             onChange={(e) => setYear(e.target.value)}
//                             placeholder="Enter Year (e.g. 2024)"
//                         />

//                         {/* Date Range - Start Date */}
//                         <Input
//                             id="startDate"
//                             label="Start Date"
//                             type="date"
//                             value={startDate}
//                             onChange={(e) => setStartDate(e.target.value)}
//                         />

//                         {/* Date Range - End Date */}
//                         <Input
//                             id="endDate"
//                             label="End Date"
//                             type="date"
//                             value={endDate}
//                             onChange={(e) => setEndDate(e.target.value)}
//                         />


//                             <div className="space-y-4">
//                                 {/* Party Name Search */}
//                                 <div className="relative">
//                                     <div className="relative flex">
//                                         <div className="relative flex-grow">
//                                             <Input
//                                                 label="Party Name"
//                                                 id="partyName"
//                                                 ref={searchInputRef}
//                                                 type="text"
//                                                 value={searchQuery}
//                                                 onChange={handleSearchChange}
//                                                 onClick={() => {
//                                                     if (suggestions.length > 0) {
//                                                         setShowSuggestions(true);
//                                                     }
//                                                 }}
//                                                 placeholder="Start typing a name (min 2 characters)"
//                                                 // disabled={!districtCode}
//                                                 className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                             />
//                                             {searchQuery && !suggestionsLoading && (
//                                                 <button
//                                                     type="button"
//                                                     onClick={handleClearSearch}
//                                                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                                                 >
//                                                     <X size={16} />
//                                                 </button>
//                                             )}
//                                             {suggestionsLoading && (
//                                                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-500">
//                                                     <Loader size={16} className="animate-spin" />
//                                                 </div>
//                                             )}
//                                         </div>
//                                         {/* <Button
//                                             type="button"
//                                             className="ml-2"
//                                             disabled={!searchQuery || isLoading || !districtCode || searching}
//                                             onClick={handleSearchButton}
//                                         >
//                                             {searching ? (
//                                                 <>
//                                                     <Loader size={16} className="mr-1 animate-spin" />
//                                                     Searching...
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     <Search size={16} className="mr-1" />
//                                                     Search
//                                                 </>
//                                             )}
//                                         </Button> */}
//                                     </div>

//                                     {/* Suggestions Dropdown */}
//                                     {showSuggestions && (
//                                         <div
//                                             ref={suggestionsRef}
//                                             className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-96 overflow-y-auto"
//                                             style={{ maxHeight: '350px' }}
//                                         >
//                                             {suggestions.length > 0 ? (
//                                                 <ul className="py-1 divide-y divide-gray-100">
//                                                     {suggestions.map((suggestion, index) => (
//                                                         <SuggestionItem
//                                                             key={index}
//                                                             suggestion={suggestion}
//                                                             searchQuery={searchQuery}
//                                                             onSelect={handleSelectName}
//                                                             index={index}
//                                                             copiedIndex={copiedIndex}
//                                                             onCopy={handleCopyName}
//                                                         />
//                                                     ))}
//                                                 </ul>
//                                             ) : (
//                                                 noSuggestions && (
//                                                     <div className="p-4 text-center text-gray-500">
//                                                         No matching names found
//                                                     </div>
//                                                 )
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Search Options */}
//                                 <div className="flex items-center mt-2">
//                                     <label className="inline-flex items-center cursor-pointer">
//                                         <input
//                                             type="checkbox"
//                                             checked={exactMatch}
//                                             onChange={handleToggleExactMatch}
//                                             className="form-checkbox h-4 w-4 text-blue-600 rounded"
//                                         />
//                                         <span className="ml-2 text-sm text-gray-700">Exact name match</span>
//                                     </label>
//                                     <span className="ml-2 text-gray-500 text-xs flex items-center">
//                                         <Info size={14} className="mr-1" />
//                                         {exactMatch
//                                             ? "Only exact matches will be shown"
//                                             : "Partial matches will be included"}
//                                     </span>
//                                 </div>

//                                 {/* Selected Name Display */}
//                                 {selectedName && (
//                                     <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
//                                         <h4 className="text-sm font-medium text-blue-800 mb-1">Selected Name</h4>
//                                         <div className="flex justify-between items-center">
//                                             <span className="text-blue-700 font-medium">{selectedName}</span>
//                                             <span className="text-xs bg-blue-100 px-2 py-1 rounded-full">
//                                                 {searching ? (
//                                                     <span className="flex items-center">
//                                                         <Loader size={10} className="mr-1 animate-spin" />
//                                                         Searching...
//                                                     </span>
//                                                 ) : (
//                                                     `${totalRecords} records found`
//                                                 )}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>

//                         {/* Results Section */}
//                         {/* {selectedName && (
//                             <Card
//                                 title={
//                                     <div className="flex justify-between items-center">
//                                         <span>{`Results for "${selectedName}"`}</span>
//                                         <div className="flex items-center">
//                                             <span className="text-sm text-gray-500 mr-4">
//                                                 {exactMatch ? "Exact match only" : "Including partial matches"}
//                                             </span>
//                                             {records.length > 0 && (
//                                                 <Button
//                                                     variant="outline"
//                                                     size="sm"
//                                                     onClick={handleExportCSV}
//                                                     className="flex items-center text-sm"
//                                                 >
//                                                     <Download size={14} className="mr-1" />
//                                                     Export CSV
//                                                 </Button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 }
//                                 className="mb-8"
//                             >
//                                 {searching ? (
//                                     <div className="py-16 text-center text-gray-500">
//                                         <Loader size={32} className="animate-spin mx-auto mb-4" />
//                                         <p>Searching for records...</p>
//                                     </div>
//                                 ) : (
//                                     <>
//                                         <div className="overflow-x-auto">
//                                             <Table
//                                                 columns={propertyRecordsColumns}
//                                                 data={records.map(r => ({ ...r.propertyRecord, searchInfo: r.searchInfo }))}
//                                                 emptyMessage={`No property records found for "${selectedName}" in the selected district.`}
//                                             />
//                                         </div>

//                                         {records.length > 0 && (
//                                             <div className="mt-4">
//                                                 <Pagination
//                                                     currentPage={page}
//                                                     totalPages={totalPages}
//                                                     onPageChange={handlePageChange}
//                                                 />
//                                                 <div className="text-xs text-center text-gray-500 mt-2">
//                                                     Showing {records.length} of {totalRecords} records
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </>
//                                 )}
//                             </Card>
//                         )} */}
//                     </div>

//                     {/* Selected Location Display */}
//                     {selectedLocation && (
//                         <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mt-2">
//                             <h4 className="text-sm font-medium text-blue-800 mb-1 flex items-center">
//                                 <Info size={14} className="mr-1" />
//                                 Selected Location
//                             </h4>
//                             <div className="text-sm text-blue-700">
//                                 <p><span className="font-medium">{selectedLocation.villageNameEn}</span> ({selectedLocation.villageNameHi})</p>
//                                 <p className="text-xs text-blue-600 mt-1">
//                                     Area: {selectedLocation.tehsilName} • Codes: District={districtCode}, SRO={sroCode}, Gaon={gaonCode1}
//                                 </p>
//                             </div>
//                         </div>
//                     )}

//                     <div className="flex space-x-2">
//                         <Button
//                             type="submit"
//                             disabled={loading || !selectedLocation}
//                             className="flex items-center"
//                         >
//                             <Search className="mr-1" size={16} />
//                             {loading ? 'Searching...' : 'Search Records'}
//                         </Button>
//                         <Button
//                             type="button"
//                             variant="outline"
//                             onClick={handleClear}
//                         >
//                             Clear Filters
//                         </Button>
//                     </div>
//                 </form>
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
//             <Card
//                 title={
//                     <div className="flex justify-between items-center w-full">
//                         <span>Search Results</span>
//                         {records.length > 0 && (
//                             <Button
//                                 variant="outline"
//                                 onClick={exportToCSV}
//                                 className="flex items-center text-sm"
//                             >
//                                 <Download size={14} className="mr-1" />
//                                 Export to CSV
//                             </Button>
//                         )}
//                     </div>
//                 }
//                 className="mb-8"
//             >
//                 <div className="mb-4">
//                     <p className="text-sm text-gray-500">
//                         {totalRecords} records found
//                         {selectedLocation && (
//                             <span> in {selectedLocation.villageNameEn}</span>
//                         )}
//                     </p>
//                 </div>

//                 <div className="overflow-x-auto">
//                     <Table
//                         columns={propertyRecordsColumns}
//                         data={getPaginatedRecords()}
//                         onRowClick={(record) => viewPropertyDetails(record)}
//                         emptyMessage="No property records found. Please search using the filters above."
//                     />
//                 </div>

//                 {records.length > 0 && (
//                     <Pagination
//                         currentPage={page}
//                         totalPages={totalPages}
//                         onPageChange={handlePageChange}
//                     />
//                 )}
//             </Card>

//             {/* Detail View */}
//             {currentRecord && (
//                 <Card
//                     title={
//                         <div className="flex justify-between items-center w-full">
//                             <span>Property Detail: {currentRecord.regNo}/{currentRecord.year}</span>
//                             <div className="flex space-x-2">
//                                 <Button
//                                     variant="icon"
//                                     onClick={() => {
//                                         const jsonStr = JSON.stringify(currentRecord, null, 2);
//                                         navigator.clipboard.writeText(jsonStr);
//                                         alert('Record data copied to clipboard');
//                                     }}
//                                     title="Copy Record Data as JSON"
//                                 >
//                                     <Copy size={16} />
//                                 </Button>
//                             </div>
//                         </div>
//                     }
//                     className="mb-8"
//                 >
//                     <div className="space-y-6">
//                         {/* Registration Information */}
//                         <div className="bg-gray-50 p-4 rounded-lg border">
//                             <h3 className="text-lg font-semibold mb-3 text-gray-800">Registration Information</h3>
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                 <FieldDisplay label="Serial No" value={currentRecord.serialNo} copyable />
//                                 <FieldDisplay label="Reg. Number" value={currentRecord.regNo} copyable />
//                                 <FieldDisplay label="Year" value={currentRecord.year} />
//                                 <FieldDisplay label="Reg. Date" value={currentRecord.regDate} />
//                                 <FieldDisplay label="Deed Type" value={currentRecord.deedType} />
//                                 <FieldDisplay label="Khata No" value={currentRecord.khataNo} copyable />
//                             </div>
//                         </div>

//                         {/* Property Description */}
//                         <div className="bg-gray-50 p-4 rounded-lg border">
//                             <h3 className="text-lg font-semibold mb-3 text-gray-800">Property Description</h3>
//                             <div className="p-3 bg-white rounded border">
//                                 <p className="text-sm whitespace-pre-line">{currentRecord.propertyDesc || 'No description available'}</p>
//                             </div>
//                         </div>

//                         {/* Party Information */}
//                         <div className="bg-gray-50 p-4 rounded-lg border">
//                             <h3 className="text-lg font-semibold mb-3 text-gray-800">Party Information</h3>
//                             <div className="space-y-4">
//                                 {currentRecord.partyNames && currentRecord.partyNames.map((name, index) => (
//                                     <div key={index} className="p-3 bg-white rounded border">
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                                             <div>
//                                                 <span className="font-medium">Party {index + 1}: </span>
//                                                 <span>{name}</span>
//                                             </div>
//                                             {currentRecord.partyAddresses && currentRecord.partyAddresses[index] && (
//                                                 <div>
//                                                     <span className="font-medium">Address: </span>
//                                                     <span>{currentRecord.partyAddresses[index]}</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Additional Details */}
//                         <div className="bg-gray-50 p-4 rounded-lg border">
//                             <h3 className="text-lg font-semibold mb-3 text-gray-800">Additional Details</h3>
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                 <FieldDisplay label="District Code" value={currentRecord.details?.dcode} />
//                                 <FieldDisplay label="SRO Code" value={currentRecord.details?.srocode} />
//                                 <FieldDisplay label="PCode" value={currentRecord.details?.pcode} />
//                                 <FieldDisplay label="Sub Deed Code" value={currentRecord.details?.subDeedCode} />
//                                 <FieldDisplay label="Receipt No" value={currentRecord.details?.recieptNo} copyable />
//                                 <FieldDisplay label="Property Number" value={currentRecord.details?.propertyNum} copyable />
//                                 <FieldDisplay label="MongoDB ID" value={currentRecord._id} copyable />
//                             </div>
//                         </div>

//                         {/* Technical Details - collapsed by default */}
//                         <div className="bg-gray-50 p-4 rounded-lg border">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="text-lg font-semibold text-gray-800">Technical Details</h3>
//                                 <Button
//                                     variant="outline"
//                                     onClick={() => {
//                                         const jsonStr = JSON.stringify(currentRecord, null, 2);
//                                         const blob = new Blob([jsonStr], { type: "application/json" });
//                                         const url = URL.createObjectURL(blob);
//                                         const a = document.createElement("a");
//                                         a.href = url;
//                                         a.download = `property_${currentRecord.regNo}_${currentRecord.year}.json`;
//                                         document.body.appendChild(a);
//                                         a.click();
//                                         document.body.removeChild(a);
//                                     }}
//                                     className="text-sm flex items-center"
//                                 >
//                                     <Download size={14} className="mr-1" />
//                                     Download JSON
//                                 </Button>
//                             </div>

//                             <div className="mt-3 overflow-x-auto">
//                                 <pre className="bg-gray-100 p-3 rounded text-xs text-gray-800 overflow-x-auto">
//                                     {JSON.stringify(currentRecord, null, 2)}
//                                 </pre>
//                             </div>
//                         </div>
//                     </div>

//                     <Button
//                         variant="outline"
//                         onClick={() => setCurrentRecord(null)}
//                         className="flex items-center mt-6"
//                     >
//                         <ChevronLeft className="mr-1" size={16} />
//                         Back to Results
//                     </Button>
//                 </Card>
//             )}

//             {showLocationDialog && (
//                 <LocationSelectionDialog
//                     isOpen={showLocationDialog}
//                     onClose={() => setShowLocationDialog(false)}
//                     locations={locationOptions}
//                     partyName={selectedName}
//                     onSelectLocation={handleLocationSelect}
//                     districtOptions={districts}
//                 />
//             )}
//         </div>
//     );
// };

// export default PropertyDashboard;



import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, FileText, ChevronLeft, Info, Download, Copy, X, Eye, Loader } from 'lucide-react';
import { base_url } from '../utils/base_url';
import Button from '../components/Button';
import Input from '../components/Input';
import FieldDisplay from '../components/FieldDisplay';
import Alert from '../components/Alert';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import Select from '../components/Select';
import Table from '../components/Table';
import UnifiedLocationSearch from '../components/UnifiedLocationSearch';
import LocationSelectionDialog from '../components/LocationSelectionDialog ';

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

// Enhanced SuggestionItem component
const SuggestionItem = ({ suggestion, searchQuery, onSelect, index, copiedIndex, onCopy }) => {
    // Check if this is an exact match with the search query
    const isExactMatch = suggestion.exactMatch ||
        suggestion.name.trim() === searchQuery.trim() ||
        suggestion.name.trim().toLowerCase() === searchQuery.trim().toLowerCase();

    // Updated to pass the entire suggestion object with location data
    const handleSelect = () => {
        onSelect({
            name: suggestion.name,
            sroCode: suggestion.sroCode,
            gaonCode1: suggestion.gaonCode1,
            // Include other useful fields
            sroCodes: suggestion.sroCodes,
            gaonCodes: suggestion.gaonCodes,
            count: suggestion.count,
            exactMatch: suggestion.exactMatch
        });
    };

    return (
        <li
            onClick={handleSelect}
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
            {/* Display location info (only if available) */}
            {(suggestion.sroCode || suggestion.gaonCode1) && (
                <div className="mt-1 text-xs text-gray-500">
                    Location: {suggestion.sroCode && `SRO: ${suggestion.sroCode}`}
                    {suggestion.sroCode && suggestion.gaonCode1 && ' | '}
                    {suggestion.gaonCode1 && `Gaon: ${suggestion.gaonCode1}`}
                </div>
            )}
        </li>
    );
};

// Main Dashboard Component
const PropertyDashboard = () => {
    const [detailLoading, setDetailLoading] = useState(false);
    const [propertyDetail, setPropertyDetail] = useState(null);

    // State for filter values
    const [districtCode, setDistrictCode] = useState('');
    const [sroCode, setSroCode] = useState('');
    const [gaonCode1, setGaonCode1] = useState('');
    const [propertyId, setPropertyId] = useState('');
    const [regNo, setRegNo] = useState('');
    const [year, setYear] = useState('');
    const [partyName, setPartyName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State for selected location
    const [selectedLocation, setSelectedLocation] = useState(null);

    // State for search results and pagination
    const [records, setRecords] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    // State for party name search feature
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedName, setSelectedName] = useState(null);
    const [exactMatch, setExactMatch] = useState(true);
    const [searching, setSearching] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [noSuggestions, setNoSuggestions] = useState(false);

    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    const [showLocationDialog, setShowLocationDialog] = useState(false);
    const [locationOptions, setLocationOptions] = useState([]);
    const [isLoadingLocations, setIsLoadingLocations] = useState(false);

    const fetchPropertyDetail = async (property) => {
        if (!property || !property.details) return;

        try {
            setDetailLoading(true);
            setError(null);

            // Check if we need to add the property._id as propertyId
            const payload = {
                ...property.details,
                propertyId: property._id || undefined
            };

            const response = await fetch(`${base_url}/details/property-records/fetch-detail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch property detail');
            }

            const data = await response.json();

            if (data.success) {
                setPropertyDetail(data.data);
                // Also set the current record to show the detail view
                setCurrentRecord({
                    ...property,
                    fullDetail: data.data
                });
            } else {
                setError(data.message || 'Failed to fetch property detail');
            }
        } catch (err) {
            setError('Error fetching property detail: ' + (err.message || err));
            console.error('Error fetching property detail:', err);
        } finally {
            setDetailLoading(false);
        }
    };

    // Modified handleSelectName function
    const handleSelectName = async (suggestionData) => {
        // Update the search query with the name
        setSearchQuery(suggestionData.name);

        // First check if this name might exist in multiple locations
        if (suggestionData.count > 10) { // Adjust this threshold as needed
            try {
                setIsLoadingLocations(true);

                // Fetch all locations for this name
                const response = await fetch(
                    `${base_url}/api/property-records/party-locations?districtCode=${districtCode}&name=${encodeURIComponent(suggestionData.name)}`
                );

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                const data = await response.json();

                if (data.success && data.data.length > 1) {
                    // If multiple locations exist, show the selection dialog
                    setLocationOptions(data.data);
                    setSelectedName(suggestionData.name);
                    setShowLocationDialog(true);
                    setShowSuggestions(false);
                    return; // Exit early, wait for user selection
                } else if (data.success && data.data.length === 1) {
                    // Only one location, continue with that
                    handleLocationSelect(data.data[0]);
                } else {
                    // No locations found, unusual case, just continue with suggestion data
                    console.warn("No locations found for this name, using suggestion data");
                    proceedWithSuggestion(suggestionData);
                }
            } catch (error) {
                console.error("Error fetching locations:", error);
                // Fallback to using suggestion data directly
                proceedWithSuggestion(suggestionData);
            } finally {
                setIsLoadingLocations(false);
            }
        } else {
            // For names with few occurrences, proceed directly
            proceedWithSuggestion(suggestionData);
        }
    };

    // Helper function to proceed with suggestion data
    const proceedWithSuggestion = (suggestionData) => {
        setSelectedSuggestion(suggestionData);
        setSelectedName(suggestionData.name);
        setPartyName(suggestionData.name);

        // If suggestion contains location data, update the location fields
        if (suggestionData.sroCode) {
            setSroCode(suggestionData.sroCode);
        }

        if (suggestionData.gaonCode1) {
            setGaonCode1(suggestionData.gaonCode1);
        }

        setShowSuggestions(false);
        setPage(1); // Reset to first page
    };

    // Handler for when user selects a location from dialog
    // const handleLocationSelect = (locationData) => {
    //     setShowLocationDialog(false);

    //     // Create a full suggestion object with the selected location data
    //     const enhancedSuggestion = {
    //         name: selectedName,
    //         sroCode: locationData.sroCode,
    //         gaonCode1: locationData.gaonCode1,
    //         districtCode: locationData.districtCode,
    //         count: locationData.recordCount || 0
    //     };

    //     // Process with the enhanced suggestion that now has location data
    //     proceedWithSuggestion(enhancedSuggestion);
    // };

    // State for district options
    const [districts, setDistricts] = useState([
        { value: '164', label: 'Kanpur Nagar' },
        { value: '229', label: 'Lucknow' },
        { value: '146', label: 'Agra' },
        { value: '266', label: 'Sambhal' }
    ]);

    // Define table columns for property records
    const propertyRecordsColumns = [
        { header: 'S.No', accessor: 'serialNo' },
        { header: 'Reg No.', accessor: 'regNo' },
        { header: 'Year', accessor: 'year' },
        { header: 'Deed Type', accessor: 'deedType' },
        { header: 'Reg Date', accessor: 'regDate' },
        { header: 'Khata No.', accessor: 'khataNo', render: (row) => row.khataNo || '-' },
        {
            header: 'First Party',
            accessor: 'partyNames',
            render: (row) => {
                const name = row.partyNames && row.partyNames.length > 0 ? row.partyNames[0] : '-';
                // Highlight if it matches the searched party name
                return partyName && name.includes(partyName) ?
                    <div className="font-semibold bg-yellow-100 p-1 rounded">
                        <HighlightText text={name} searchTerm={partyName} />
                    </div> : name;
            }
        },
        {
            header: 'First Party Address',
            accessor: 'partyAddresses',
            render: (row) => (
                <div className="max-w-2xl">
                    {row.partyAddresses && row.partyAddresses.length > 0 ? row.partyAddresses[0] : '-'}
                </div>
            )
        },
        {
            header: 'Second Party',
            accessor: 'partyNames',
            render: (row) => {
                const name = row.partyNames && row.partyNames.length > 1 ? row.partyNames[1] : '-';
                // Highlight if it matches the searched party name
                return partyName && name.includes(partyName) ?
                    <div className="font-semibold bg-yellow-100 p-1 rounded">
                        <HighlightText text={name} searchTerm={partyName} />
                    </div> : name;
            }
        },
        {
            header: 'Property Description',
            accessor: 'propertyDesc',
            render: (row) => (
                <div className="max-w-2xl">
                    {row.propertyDesc || '-'}
                </div>
            )
        },
        {
            header: 'Detail',
            accessor: 'details',
            render: (row) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        fetchPropertyDetail(row);
                    }}
                    className="p-1 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
                    title="View complete property details"
                >
                    <Eye size={16} />
                </button>
            )
        }
    ];

    // Handle location selection from UnifiedLocationSearch
    const handleLocationSelect = (locationData) => {
        if (locationData) {
            // Set SRO code and Gaon code based on selected location
            setSroCode(locationData.tehsilCode); // tehsilCode is same as sroCode
            setGaonCode1(locationData.gaonCode1);
            setSelectedLocation(locationData);
        } else {
            // Clear location data if selection is cleared
            setSroCode('');
            setGaonCode1('');
            setSelectedLocation(null);
        }
    };

    // Reset pagination when filters change
    useEffect(() => {
        setPage(1);
    }, [districtCode, sroCode, gaonCode1, regNo, year, partyName, startDate, endDate]);

    // Function to view details of a specific property
    const viewPropertyDetails = (property) => {
        setCurrentRecord(property);
    };

    // Function to get paginated records - now handled by the server
    const getPaginatedRecords = () => {
        // With the updated API, pagination is handled on the server side
        // So we just return the current records as they are already paginated
        return records;
    };

    // Search function - Submit new search criteria to API
    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);
            setPage(1); // Reset to first page on new search

            // Check required fields
            if (!districtCode) {
                setError('Please select a district to search');
                setLoading(false);
                return;
            }

            // Prepare request body with all filter criteria
            const requestBody = {
                districtCode,
                page,
                limit
            };

            // Add optional filters if they have values
            if (sroCode) requestBody.sroCode = sroCode;
            if (gaonCode1) requestBody.gaonCode1 = gaonCode1;
            if (regNo) requestBody.regNo = regNo;
            if (year) requestBody.year = year;
            if (partyName) requestBody.partyName = partyName;
            if (startDate) requestBody.startDate = startDate;
            if (endDate) requestBody.endDate = endDate;
            if (propertyId) requestBody.propertyId = propertyId;

            console.log("Search request body:", requestBody);

            // Send POST request to API
            const response = await fetch(`${base_url}/api/property-records/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            // Handle non-successful responses
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch property data');
            }

            // Parse data from successful response
            const data = await response.json();
            console.log("Search response:", data);

            // Extract property records based on the updated API response structure
            let propertyRecords = [];

            if (data && data.success) {
                if (data.data && Array.isArray(data.data)) {
                    // Process each record from the updated API format
                    propertyRecords = data.data.flatMap(record =>
                        record.matchingRecords || []
                    );

                    // Update pagination information from the API response
                    setTotalRecords(data.totalCount || 0);
                    setTotalPages(data.totalPages || 1);
                    setPage(data.page || 1);
                }
            }

            setRecords(propertyRecords);

            // Show success message if records were found
            if (propertyRecords.length > 0) {
                setError(null);
            } else {
                setError('No property records found for the given criteria.');
            }

        } catch (err) {
            setError('An error occurred: ' + (err.message || err));
            console.error('Error searching property data:', err);
            setRecords([]);
            setTotalRecords(0);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    };

    // Clear filters
    const handleClear = () => {
        setDistrictCode('');
        setSroCode('');
        setGaonCode1('');
        setSelectedLocation(null);
        setPropertyId('');
        setRegNo('');
        setYear('');
        setPartyName('');
        setStartDate('');
        setEndDate('');
        setCurrentRecord(null);
        setPage(1);
        setRecords([]);
        setTotalRecords(0);
        setTotalPages(0);
        // Clear party name search related states
        setSearchQuery('');
        setSelectedName(null);
        setSelectedSuggestion(null);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    // Handle pagination - now triggers a new search with updated page number
    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);

            // Immediately trigger a new search with the updated page number
            try {
                setLoading(true);

                // Prepare request body with all filter criteria and the new page number
                const requestBody = {
                    districtCode,
                    page: newPage,
                    limit
                };

                // Add optional filters if they have values
                if (sroCode) requestBody.sroCode = sroCode;
                if (gaonCode1) requestBody.gaonCode1 = gaonCode1;
                if (regNo) requestBody.regNo = regNo;
                if (year) requestBody.year = year;
                if (partyName) requestBody.partyName = partyName;
                if (startDate) requestBody.startDate = startDate;
                if (endDate) requestBody.endDate = endDate;
                if (propertyId) requestBody.propertyId = propertyId;

                // Send POST request to API
                const response = await fetch(`${base_url}/api/property-records/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch property data');
                }

                const data = await response.json();

                // Extract property records
                let propertyRecords = [];
                if (data && data.success && data.data && Array.isArray(data.data)) {
                    propertyRecords = data.data.flatMap(record =>
                        record.matchingRecords || []
                    );

                    // Update pagination information
                    setTotalRecords(data.totalCount || 0);
                    setTotalPages(data.totalPages || 1);
                }

                setRecords(propertyRecords);

            } catch (err) {
                setError('Error changing page: ' + (err.message || err));
                console.error('Error fetching page data:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    // Export current data to CSV
    const exportToCSV = () => {
        if (records.length === 0) return;

        // Define all headers
        const headers = [
            'Serial No', 'Reg No', 'Year', 'Deed Type', 'Reg Date', 'Khata No',
            'Property Description', 'First Party', 'First Party Address',
            'Second Party', 'Second Party Address', 'District Code', 'SRO Code',
            'PCode', 'Receipt No', 'Property Number', 'Sub Deed Code', 'ID'
        ];

        // Format data rows
        const csvRows = records.map(record => {
            const firstParty = record.partyNames && record.partyNames.length > 0 ? record.partyNames[0] : '';
            const firstPartyAddress = record.partyAddresses && record.partyAddresses.length > 0 ? record.partyAddresses[0] : '';
            const secondParty = record.partyNames && record.partyNames.length > 1 ? record.partyNames[1] : '';
            const secondPartyAddress = record.partyAddresses && record.partyAddresses.length > 1 ? record.partyAddresses[1] : '';

            return [
                record.serialNo || '',
                record.regNo || '',
                record.year || '',
                record.deedType || '',
                record.regDate || '',
                record.khataNo || '',
                record.propertyDesc || '',
                firstParty,
                firstPartyAddress,
                secondParty,
                secondPartyAddress,
                record.details?.dcode || '',
                record.details?.srocode || '',
                record.details?.pcode || '',
                record.details?.recieptNo || '',
                record.details?.propertyNum || '',
                record.details?.subDeedCode || '',
                record._id || ''
            ];
        });

        // Create CSV content
        const csvContent = [
            headers.join(','),
            ...csvRows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `property_records_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                setShowSuggestions(false);
                fetchSuggestions();
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery, districtCode]);

    // Update fetchRecordsByName function to use the stored location data
    const fetchRecordsByName = async () => {
        if (!selectedName || !districtCode) return;

        try {
            setSearching(true);
            setError(null);

            // If we have selected suggestion with location data, use it
            const sroCodeParam = selectedSuggestion?.sroCode || sroCode;
            const gaonCodeParam = selectedSuggestion?.gaonCode1 || gaonCode1;

            let url = `${base_url}/api/property-records/party-records?districtCode=${districtCode}&name=${encodeURIComponent(selectedName)}&exactMatch=${exactMatch}&page=${page}&limit=${limit}`;

            // Append location parameters if available
            if (sroCodeParam) {
                url += `&sroCode=${sroCodeParam}`;
            }

            if (gaonCodeParam) {
                url += `&gaonCode1=${gaonCodeParam}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setRecords(data.data.map(r => r.propertyRecord));
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

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPartyName(e.target.value);
        if (selectedName) {
            setSelectedName(null); // Clear selected name when input changes
            setSelectedSuggestion(null);
        }
    };

    // Modified clear search function to also clear the selectedSuggestion
    const handleClearSearch = () => {
        setSearchQuery('');
        setPartyName('');
        setSelectedName(null);
        setSelectedSuggestion(null);
        setSuggestions([]);
        setShowSuggestions(false);
        setNoSuggestions(false);
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

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
                <FileText className="mr-2" size={28} />
                Property Records Dashboard
            </h1>

            {/* Filters Section */}
            <Card
                title="Search Property Records"
                icon={<Filter size={18} />}
                className="mb-8"
            >
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* District Selection */}
                        <Select
                            id="districtCode"
                            label="District"
                            value={districtCode}
                            onChange={(value) => {
                                setDistrictCode(value);
                                // Clear dependent fields when district changes
                                setSroCode('');
                                setGaonCode1('');
                                setSelectedLocation(null);
                                setPartyName('');
                                setSearchQuery('');
                                setSelectedName(null);
                                setSelectedSuggestion(null);
                            }}
                            options={districts}
                            placeholder="Select district first"
                        />

                        {/* Unified Location Search - Direct search across all tehsils/areas */}
                        <UnifiedLocationSearch
                            districtCode={districtCode}
                            onSelectLocation={handleLocationSelect}
                        />

                        {/* Optional Property ID */}
                        <Input
                            id="propertyId"
                            label="Property ID (Optional)"
                            value={propertyId}
                            onChange={(e) => setPropertyId(e.target.value)}
                            placeholder="Enter Property ID if known"
                        />

                        {/* Registration Number */}
                        <Input
                            id="regNo"
                            label="Registration Number"
                            value={regNo}
                            onChange={(e) => setRegNo(e.target.value)}
                            placeholder="Enter Registration Number"
                        />

                        {/* Year */}
                        <Input
                            id="year"
                            label="Year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="Enter Year (e.g. 2024)"
                        />

                        {/* Date Range - Start Date */}
                        <Input
                            id="startDate"
                            label="Start Date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />

                        {/* Date Range - End Date */}
                        <Input
                            id="endDate"
                            label="End Date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />

                        {/* Party Name Search Section */}
                        <div className="space-y-4 md:col-span-3">
                            {/* Party Name Search */}
                            <div className="relative">
                                <div className="relative flex">
                                    <div className="relative flex-grow">
                                        <Input
                                            label="Party Name"
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
                                                selectedSuggestion?.count ? `${selectedSuggestion.count} records found` : ""
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Selected Location Display */}
                    {selectedLocation && (
                        <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mt-2">
                            <h4 className="text-sm font-medium text-blue-800 mb-1 flex items-center">
                                <Info size={14} className="mr-1" />
                                Selected Location
                            </h4>
                            <div className="text-sm text-blue-700">
                                <p><span className="font-medium">{selectedLocation.villageNameEn}</span> ({selectedLocation.villageNameHi})</p>
                                <p className="text-xs text-blue-600 mt-1">
                                    Area: {selectedLocation.tehsilName} • Codes: District={districtCode}, SRO={sroCode}, Gaon={gaonCode1}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex space-x-2">
                        <Button
                            type="submit"
                            disabled={loading || (!selectedLocation && !partyName)}
                            className="flex items-center"
                        >
                            <Search className="mr-1" size={16} />
                            {loading ? 'Searching...' : 'Search Records'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClear}
                        >
                            Clear Filters
                        </Button>
                    </div>
                </form>
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
            <Card
                title={
                    <div className="flex justify-between items-center w-full">
                        <span>Search Results</span>
                        {records.length > 0 && (
                            <Button
                                variant="outline"
                                onClick={exportToCSV}
                                className="flex items-center text-sm"
                            >
                                <Download size={14} className="mr-1" />
                                Export to CSV
                            </Button>
                        )}
                    </div>
                }
                className="mb-8"
            >
                <div className="mb-4">
                    <p className="text-sm text-gray-500">
                        {totalRecords} records found
                        {selectedLocation && (
                            <span> in {selectedLocation.villageNameEn}</span>
                        )}
                        {partyName && (
                            <span> for party "{partyName}"</span>
                        )}
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <Table
                        columns={propertyRecordsColumns}
                        data={getPaginatedRecords()}
                        onRowClick={(record) => viewPropertyDetails(record)}
                        emptyMessage="No property records found. Please search using the filters above."
                    />
                </div>

                {records.length > 0 && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </Card>

            {/* Detail View */}
            {currentRecord && (
                <Card
                    title={
                        <div className="flex justify-between items-center w-full">
                            <span>Property Detail: {currentRecord.regNo}/{currentRecord.year}</span>
                            <div className="flex space-x-2">
                                <Button
                                    variant="icon"
                                    onClick={() => {
                                        const jsonStr = JSON.stringify(currentRecord, null, 2);
                                        navigator.clipboard.writeText(jsonStr);
                                        alert('Record data copied to clipboard');
                                    }}
                                    title="Copy Record Data as JSON"
                                >
                                    <Copy size={16} />
                                </Button>
                            </div>
                        </div>
                    }
                    className="mb-8"
                >
                    <div className="space-y-6">
                        {/* Registration Information */}
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">Registration Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FieldDisplay label="Serial No" value={currentRecord.serialNo} copyable />
                                <FieldDisplay label="Reg. Number" value={currentRecord.regNo} copyable />
                                <FieldDisplay label="Year" value={currentRecord.year} />
                                <FieldDisplay label="Reg. Date" value={currentRecord.regDate} />
                                <FieldDisplay label="Deed Type" value={currentRecord.deedType} />
                                <FieldDisplay label="Khata No" value={currentRecord.khataNo} copyable />
                            </div>
                        </div>

                        {/* Property Description */}
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">Property Description</h3>
                            <div className="p-3 bg-white rounded border">
                                <p className="text-sm whitespace-pre-line">{currentRecord.propertyDesc || 'No description available'}</p>
                            </div>
                        </div>

                        {/* Party Information */}
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">Party Information</h3>
                            <div className="space-y-4">
                                {currentRecord.partyNames && currentRecord.partyNames.map((name, index) => (
                                    <div key={index} className="p-3 bg-white rounded border">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <div>
                                                <span className="font-medium">Party {index + 1}: </span>
                                                {partyName && name.includes(partyName) ? (
                                                    <HighlightText text={name} searchTerm={partyName} />
                                                ) : (
                                                    <span>{name}</span>
                                                )}
                                            </div>
                                            {currentRecord.partyAddresses && currentRecord.partyAddresses[index] && (
                                                <div>
                                                    <span className="font-medium">Address: </span>
                                                    <span>{currentRecord.partyAddresses[index]}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">Additional Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FieldDisplay label="District Code" value={currentRecord.details?.dcode} />
                                <FieldDisplay label="SRO Code" value={currentRecord.details?.srocode} />
                                <FieldDisplay label="PCode" value={currentRecord.details?.pcode} />
                                <FieldDisplay label="Sub Deed Code" value={currentRecord.details?.subDeedCode} />
                                <FieldDisplay label="Receipt No" value={currentRecord.details?.recieptNo} copyable />
                                <FieldDisplay label="Property Number" value={currentRecord.details?.propertyNum} copyable />
                                <FieldDisplay label="MongoDB ID" value={currentRecord._id} copyable />
                            </div>
                        </div>

                        {currentRecord && currentRecord.fullDetail && (
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                                <h3 className="text-lg font-semibold mb-3 text-blue-800">
                                    Complete Property Details
                                </h3>

                                {/* Document Information */}
                                <div className="bg-white p-3 rounded-lg border mb-3">
                                    <h4 className="font-medium text-blue-700 mb-2">Document Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <FieldDisplay
                                            label="Document Type"
                                            value={currentRecord.fullDetail.parsedData.documentType}
                                        />
                                        <FieldDisplay
                                            label="Registration Year"
                                            value={currentRecord.fullDetail.parsedData.year}
                                        />
                                        <FieldDisplay
                                            label="Registration Number"
                                            value={currentRecord.fullDetail.parsedData.registrationNumber}
                                        />
                                        <FieldDisplay
                                            label="Bind Number"
                                            value={currentRecord.fullDetail.parsedData.bindNumber}
                                        />
                                        <FieldDisplay
                                            label="Execution Date"
                                            value={currentRecord.fullDetail.parsedData.executionDate}
                                        />
                                        <FieldDisplay
                                            label="Registration Date"
                                            value={currentRecord.fullDetail.parsedData.registrationDate}
                                        />
                                    </div>
                                </div>

                                {/* Location Information */}
                                <div className="bg-white p-3 rounded-lg border mb-3">
                                    <h4 className="font-medium text-blue-700 mb-2">Location Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <FieldDisplay
                                            label="District"
                                            value={currentRecord.fullDetail.parsedData.district}
                                        />
                                        <FieldDisplay
                                            label="Sub-Registrar"
                                            value={currentRecord.fullDetail.parsedData.sro}
                                        />
                                        <FieldDisplay
                                            label="Ward/Pargana"
                                            value={currentRecord.fullDetail.parsedData.ward}
                                        />
                                        <FieldDisplay
                                            label="Mohalla/Village"
                                            value={currentRecord.fullDetail.parsedData.mohalla}
                                        />
                                    </div>
                                </div>

                                {/* Property Information */}
                                <div className="bg-white p-3 rounded-lg border mb-3">
                                    <h4 className="font-medium text-blue-700 mb-2">Property Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <FieldDisplay
                                            label="Land Type"
                                            value={currentRecord.fullDetail.parsedData.landType}
                                        />
                                        <FieldDisplay
                                            label="Khata/House Number"
                                            value={currentRecord.fullDetail.parsedData.khataNumber || 'Not specified'}
                                        />
                                        <FieldDisplay
                                            label="Area"
                                            value={`${currentRecord.fullDetail.parsedData.area} ${currentRecord.fullDetail.parsedData.areaUnit}`}
                                        />
                                        <FieldDisplay
                                            label="Ownership Share"
                                            value={currentRecord.fullDetail.parsedData.ownershipShare || '0'}
                                        />
                                        <FieldDisplay
                                            label="Sold Share"
                                            value={currentRecord.fullDetail.parsedData.soldShare || '0'}
                                        />
                                    </div>

                                    {/* Property Description */}
                                    <div className="mt-3">
                                        <h5 className="font-medium text-sm text-gray-700">Property Description</h5>
                                        <p className="mt-1 text-sm bg-gray-50 p-2 rounded">
                                            {currentRecord.fullDetail.parsedData.propertyDescription || 'No description available'}
                                        </p>
                                    </div>

                                    {/* Property Boundaries */}
                                    {currentRecord.fullDetail.parsedData.boundaries &&
                                        (currentRecord.fullDetail.parsedData.boundaries.north ||
                                            currentRecord.fullDetail.parsedData.boundaries.south ||
                                            currentRecord.fullDetail.parsedData.boundaries.east ||
                                            currentRecord.fullDetail.parsedData.boundaries.west) && (
                                            <div className="mt-3">
                                                <h5 className="font-medium text-sm text-gray-700">Boundaries</h5>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                                                    <FieldDisplay
                                                        label="North"
                                                        value={currentRecord.fullDetail.parsedData.boundaries.north || 'Not specified'}
                                                    />
                                                    <FieldDisplay
                                                        label="South"
                                                        value={currentRecord.fullDetail.parsedData.boundaries.south || 'Not specified'}
                                                    />
                                                    <FieldDisplay
                                                        label="East"
                                                        value={currentRecord.fullDetail.parsedData.boundaries.east || 'Not specified'}
                                                    />
                                                    <FieldDisplay
                                                        label="West"
                                                        value={currentRecord.fullDetail.parsedData.boundaries.west || 'Not specified'}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                </div>

                                {/* Financial Information */}
                                <div className="bg-white p-3 rounded-lg border mb-3">
                                    <h4 className="font-medium text-blue-700 mb-2">Financial Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <FieldDisplay
                                            label="Market Value"
                                            value={`₹ ${currentRecord.fullDetail.parsedData.marketValue || '0'}`}
                                        />
                                        <FieldDisplay
                                            label="Transaction Value"
                                            value={`₹ ${currentRecord.fullDetail.parsedData.transactionValue || '0'}`}
                                        />
                                        <FieldDisplay
                                            label="Stamp Duty"
                                            value={`₹ ${currentRecord.fullDetail.parsedData.stampDuty || '0'}`}
                                        />
                                    </div>
                                </div>

                                {/* First Party Information */}
                                {currentRecord.fullDetail.parsedData.parties &&
                                    currentRecord.fullDetail.parsedData.parties.firstParty &&
                                    currentRecord.fullDetail.parsedData.parties.firstParty.length > 0 && (
                                        <div className="bg-white p-3 rounded-lg border mb-3">
                                            <h4 className="font-medium text-blue-700 mb-2">First Party</h4>
                                            <div className="space-y-2">
                                                {currentRecord.fullDetail.parsedData.parties.firstParty.map((party, index) => (
                                                    <div key={`first-party-${index}`} className="bg-gray-50 p-2 rounded">
                                                        <p className="font-medium">{party.name}</p>
                                                        {party.relationName && (
                                                            <p className="text-sm">
                                                                {party.relation ? `${party.relation} of ` : 'Related to '}
                                                                {party.relationName}
                                                            </p>
                                                        )}
                                                        {party.address && (
                                                            <p className="text-sm mt-1">{party.address}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                {/* Second Party Information */}
                                {currentRecord.fullDetail.parsedData.parties &&
                                    currentRecord.fullDetail.parsedData.parties.secondParty &&
                                    currentRecord.fullDetail.parsedData.parties.secondParty.length > 0 && (
                                        <div className="bg-white p-3 rounded-lg border mb-3">
                                            <h4 className="font-medium text-blue-700 mb-2">Second Party</h4>
                                            <div className="space-y-2">
                                                {currentRecord.fullDetail.parsedData.parties.secondParty.map((party, index) => (
                                                    <div key={`second-party-${index}`} className="bg-gray-50 p-2 rounded">
                                                        <p className="font-medium">{party.name}</p>
                                                        {party.relationName && (
                                                            <p className="text-sm">
                                                                {party.relation ? `${party.relation} of ` : 'Related to '}
                                                                {party.relationName}
                                                            </p>
                                                        )}
                                                        {party.address && (
                                                            <p className="text-sm mt-1">{party.address}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                {/* Witnesses Information */}
                                {currentRecord.fullDetail.parsedData.parties &&
                                    currentRecord.fullDetail.parsedData.parties.witnesses &&
                                    currentRecord.fullDetail.parsedData.parties.witnesses.length > 0 && (
                                        <div className="bg-white p-3 rounded-lg border">
                                            <h4 className="font-medium text-blue-700 mb-2">Witnesses</h4>
                                            <div className="space-y-2">
                                                {currentRecord.fullDetail.parsedData.parties.witnesses.map((witness, index) => (
                                                    <div key={`witness-${index}`} className="bg-gray-50 p-2 rounded">
                                                        <p className="font-medium">{witness.name}</p>
                                                        {witness.relationName && (
                                                            <p className="text-sm">
                                                                {witness.relation ? `${witness.relation} of ` : 'Related to '}
                                                                {witness.relationName}
                                                            </p>
                                                        )}
                                                        {witness.address && (
                                                            <p className="text-sm mt-1">{witness.address}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        )}

                        {/* Technical Details - collapsed by default */}
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">Technical Details</h3>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        const jsonStr = JSON.stringify(currentRecord, null, 2);
                                        const blob = new Blob([jsonStr], { type: "application/json" });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement("a");
                                        a.href = url;
                                        a.download = `property_${currentRecord.regNo}_${currentRecord.year}.json`;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                    }}
                                    className="text-sm flex items-center"
                                >
                                    <Download size={14} className="mr-1" />
                                    Download JSON
                                </Button>
                            </div>

                            <div className="mt-3 overflow-x-auto">
                                <pre className="bg-gray-100 p-3 rounded text-xs text-gray-800 overflow-x-auto">
                                    {JSON.stringify(currentRecord, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => setCurrentRecord(null)}
                        className="flex items-center mt-6"
                    >
                        <ChevronLeft className="mr-1" size={16} />
                        Back to Results
                    </Button>
                </Card>
            )}

            {showLocationDialog && (
                <LocationSelectionDialog
                    isOpen={showLocationDialog}
                    onClose={() => setShowLocationDialog(false)}
                    locations={locationOptions}
                    partyName={selectedName}
                    onSelectLocation={handleLocationSelect}
                    districtOptions={districts}
                />
            )}
        </div>
    );
};

export default PropertyDashboard;
