// // import React, { useState, useEffect } from 'react';
// // import { Search, Filter, FileText, ChevronLeft, Info, Download, Copy } from 'lucide-react';
// // import { base_url } from '../utils/base_url';
// // import Button from '../components/Button';
// // import Input from '../components/Input';
// // import FieldDisplay from '../components/FieldDisplay';
// // import Alert from '../components/Alert';
// // import Card from '../components/Card';
// // import Pagination from '../components/Pagination';
// // import Select from '../components/Select';
// // import Table from '../components/Table';

// // // Main Dashboard Component
// // const PropertyDashboard = () => {
// //     // State for filter values
// //     const [districtCode, setDistrictCode] = useState('');
// //     const [sroCode, setSroCode] = useState('');
// //     const [gaonCode1, setGaonCode1] = useState('');
// //     const [propertyId, setPropertyId] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);

// //     // State for search results and pagination
// //     const [records, setRecords] = useState([]);
// //     const [currentRecord, setCurrentRecord] = useState(null);
// //     const [totalRecords, setTotalRecords] = useState(0);
// //     const [page, setPage] = useState(1);
// //     const [limit, setLimit] = useState(10);
// //     const [totalPages, setTotalPages] = useState(1);

// //     // State for district and SRO options
// //     const [districts, setDistricts] = useState([
// //         { value: '164', label: 'Kanpur Nagar' },
// //         { value: '229', label: 'Lucknow' },
// //         { value: '146', label: 'Agra' },
// //         { value: '266', label: 'Sambhal' }
// //     ]);

// //     const [sroOptions, setSroOptions] = useState([
// //         { value: '210', label: 'Kanpur SRO' },
// //         { value: '229', label: 'Lucknow SRO' },
// //         { value: '003', label: 'Agra SRO' },
// //         { value: '266', label: 'Sambhal SRO' },
// //         { value: '104', label: 'Chakiya SRO' },
// //         { value: '259', label: 'Daurala SRO' }
// //     ]);

// //     // Define table columns for property records - comprehensive version with wrapped text
// //     const propertyRecordsColumns = [
// //         { header: 'S.No', accessor: 'serialNo' },
// //         { header: 'Reg No.', accessor: 'regNo' },
// //         { header: 'Year', accessor: 'year' },
// //         { header: 'Deed Type', accessor: 'deedType' },
// //         { header: 'Reg Date', accessor: 'regDate' },
// //         { header: 'Khata No.', accessor: 'khataNo', render: (row) => row.khataNo || '-' },
// //         {
// //             header: 'First Party',
// //             accessor: 'partyNames',
// //             render: (row) => row.partyNames && row.partyNames.length > 0 ? row.partyNames[0] : '-'
// //         },
// //         {
// //             header: 'First Party Address',
// //             accessor: 'partyAddresses',
// //             render: (row) => (
// //                 <div className="max-w-2xl">
// //                     {row.partyAddresses && row.partyAddresses.length > 0 ? row.partyAddresses[0] : '-'}
// //                 </div>
// //             )
// //         },
// //         {
// //             header: 'Second Party',
// //             accessor: 'partyNames',
// //             render: (row) => row.partyNames && row.partyNames.length > 1 ? row.partyNames[1] : '-'
// //         },
// //         {
// //             header: 'Second Party Address',
// //             accessor: 'partyAddresses',
// //             render: (row) => (
// //                 <div className="max-w-2xl">
// //                     {row.partyAddresses && row.partyAddresses.length > 1 ? row.partyAddresses[1] : '-'}
// //                 </div>
// //             )
// //         },
// //         {
// //             header: 'Property Description',
// //             accessor: 'propertyDesc',
// //             render: (row) => (
// //                 <div className="max-w-2xl">
// //                     {row.propertyDesc || '-'}
// //                 </div>
// //             )
// //         },
// //         // {
// //         //     header: 'District Code',
// //         //     accessor: 'details.dcode'
// //         // },
// //         // {
// //         //     header: 'SRO Code',
// //         //     accessor: 'details.srocode'
// //         // },
// //         // {
// //         //     header: 'Actions',
// //         //     accessor: '_id',
// //         //     render: (row) => (
// //         //         <div className="flex space-x-2">
// //         //             <Button
// //         //                 variant="outline"
// //         //                 onClick={(e) => {
// //         //                     e.stopPropagation();
// //         //                     viewPropertyDetails(row);
// //         //                 }}
// //         //                 className="text-sm px-3 py-1"
// //         //             >
// //         //                 View
// //         //             </Button>
// //         //         </div>
// //         //     )
// //         // }
// //     ];

// //     // Function to view details of a specific property
// //     const viewPropertyDetails = (property) => {
// //         setCurrentRecord(property);
// //     };

// //     // Function to get paginated records
// //     const getPaginatedRecords = () => {
// //         const startIndex = (page - 1) * limit;
// //         const endIndex = Math.min(startIndex + limit, records.length);
// //         return records.slice(startIndex, endIndex);
// //     };

// //     // Search function - Submit new search criteria to API
// //     // const handleSearch = async (e) => {
// //     //     e.preventDefault();

// //     //     try {
// //     //         setLoading(true);
// //     //         setError(null);
// //     //         setPage(1); // Reset to first page on new search

// //     //         // Check required fields
// //     //         if (!districtCode || !sroCode || !gaonCode1) {
// //     //             setError('District Code, SRO Code, and Village Code are required');
// //     //             setLoading(false);
// //     //             return;
// //     //         }

// //     //         // Prepare request body
// //     //         const requestBody = {
// //     //             districtCode,
// //     //             sroCode,
// //     //             propertyId: propertyId || '',
// //     //             propNEWAddress: '1',
// //     //             gaonCode1
// //     //         };

// //     //         // Send search request to API
// //     //         // const response = await fetch(`${base_url}/api/property-records`, {
// //     //         //     method: 'POST',
// //     //         //     headers: {
// //     //         //         'Content-Type': 'application/json'
// //     //         //     },
// //     //         //     body: JSON.stringify(requestBody)
// //     //         // });


// //     //         const response = await fetch(`${base_url}/api/property-records?districtCode=${districtCode}&sroCode=${sroCode}&gaonCode1=${gaonCode1}`)

// //     //         // Handle non-successful responses
// //     //         if (!response.ok) {
// //     //             const errorData = await response.json();
// //     //             throw new Error(errorData.message || 'Failed to fetch property data');
// //     //         }

// //     //         // Parse data from successful response
// //     //         const data = await response.json();
// //     //         console.log("Search response:", data);

// //     //         // Update state with API response - handle different possible response structures
// //     //         let propertyRecords = [];

// //     //         if (data && data.data && Array.isArray(data.data)) {
// //     //             // Direct array of property records
// //     //             propertyRecords = data.data;
// //     //         } else if (data && data.data && data.data.propertyRecords && Array.isArray(data.data.propertyRecords)) {
// //     //             // Nested property records array
// //     //             propertyRecords = data.data.propertyRecords;
// //     //         } else if (data && Array.isArray(data)) {
// //     //             // Data is directly the array
// //     //             propertyRecords = data;
// //     //         }

// //     //         setRecords(propertyRecords);
// //     //         setTotalRecords(propertyRecords.length);
// //     //         setTotalPages(Math.ceil(propertyRecords.length / limit));

// //     //         // Show success message if records were found
// //     //         if (propertyRecords.length > 0) {
// //     //             setError(null);
// //     //         } else {
// //     //             setError('No property records found for the given criteria.');
// //     //         }

// //     //     } catch (err) {
// //     //         setError('An error occurred: ' + (err.message || err));
// //     //         console.error('Error searching property data:', err);
// //     //         setRecords([]);
// //     //         setTotalRecords(0);
// //     //     } finally {
// //     //         setLoading(false);
// //     //     }
// //     // };
// //     const handleSearch = async (e) => {
// //         e.preventDefault();

// //         try {
// //             setLoading(true);
// //             setError(null);
// //             setPage(1); // Reset to first page on new search

// //             // Check required fields
// //             if (!districtCode || !sroCode || !gaonCode1) {
// //                 setError('District Code, SRO Code, and Village Code are required');
// //                 setLoading(false);
// //                 return;
// //             }

// //             // Prepare request body
// //             const requestBody = {
// //                 districtCode,
// //                 sroCode,
// //                 propertyId: propertyId || '',
// //                 propNEWAddress: '1',
// //                 gaonCode1
// //             };

// //             // Send search request to API
// //             const response = await fetch(`${base_url}/api/property-records?districtCode=${districtCode}&sroCode=${sroCode}&gaonCode1=${gaonCode1}`);

// //             // Handle non-successful responses
// //             if (!response.ok) {
// //                 const errorData = await response.json();
// //                 throw new Error(errorData.message || 'Failed to fetch property data');
// //             }

// //             // Parse data from successful response
// //             const data = await response.json();
// //             console.log("Search response:", data);

// //             // Extract property records based on the actual data structure
// //             let propertyRecords = [];

// //             if (data && data.success && data.data && Array.isArray(data.data)) {
// //                 // Check if data.data[0] has propertyRecords (as in your example JSON)
// //                 if (data.data[0] && Array.isArray(data.data[0].propertyRecords)) {
// //                     propertyRecords = data.data[0].propertyRecords;
// //                 } else {
// //                     // Fallback if the structure is different
// //                     propertyRecords = data.data;
// //                 }
// //             } else if (data && Array.isArray(data)) {
// //                 propertyRecords = data;
// //             } else if (data && data.data && Array.isArray(data.data.propertyRecords)) {
// //                 propertyRecords = data.data.propertyRecords;
// //             }

// //             setRecords(propertyRecords);
// //             setTotalRecords(propertyRecords.length);
// //             setTotalPages(Math.ceil(propertyRecords.length / limit));

// //             // Show success message if records were found
// //             if (propertyRecords.length > 0) {
// //                 setError(null);
// //             } else {
// //                 setError('No property records found for the given criteria.');
// //             }

// //         } catch (err) {
// //             setError('An error occurred: ' + (err.message || err));
// //             console.error('Error searching property data:', err);
// //             setRecords([]);
// //             setTotalRecords(0);
// //             setTotalPages(0);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // Clear filters
// //     const handleClear = () => {
// //         setDistrictCode('');
// //         setSroCode('');
// //         setGaonCode1('');
// //         setPropertyId('');
// //         setCurrentRecord(null);
// //         setPage(1);
// //         setRecords([]);
// //         setTotalRecords(0);
// //     };

// //     // Handle pagination
// //     const handlePageChange = (newPage) => {
// //         if (newPage >= 1 && newPage <= totalPages) {
// //             setPage(newPage);
// //         }
// //     };

// //     // Export current data to CSV
// //     const exportToCSV = () => {
// //         if (records.length === 0) return;

// //         // Define all headers
// //         const headers = [
// //             'Serial No', 'Reg No', 'Year', 'Deed Type', 'Reg Date', 'Khata No',
// //             'Property Description', 'First Party', 'First Party Address',
// //             'Second Party', 'Second Party Address', 'District Code', 'SRO Code',
// //             'PCode', 'Receipt No', 'Property Number', 'Sub Deed Code', 'ID'
// //         ];

// //         // Format data rows
// //         const csvRows = records.map(record => {
// //             const firstParty = record.partyNames && record.partyNames.length > 0 ? record.partyNames[0] : '';
// //             const firstPartyAddress = record.partyAddresses && record.partyAddresses.length > 0 ? record.partyAddresses[0] : '';
// //             const secondParty = record.partyNames && record.partyNames.length > 1 ? record.partyNames[1] : '';
// //             const secondPartyAddress = record.partyAddresses && record.partyAddresses.length > 1 ? record.partyAddresses[1] : '';

// //             return [
// //                 record.serialNo || '',
// //                 record.regNo || '',
// //                 record.year || '',
// //                 record.deedType || '',
// //                 record.regDate || '',
// //                 record.khataNo || '',
// //                 record.propertyDesc || '',
// //                 firstParty,
// //                 firstPartyAddress,
// //                 secondParty,
// //                 secondPartyAddress,
// //                 record.details?.dcode || '',
// //                 record.details?.srocode || '',
// //                 record.details?.pcode || '',
// //                 record.details?.recieptNo || '',
// //                 record.details?.propertyNum || '',
// //                 record.details?.subDeedCode || '',
// //                 record._id || ''
// //             ];
// //         });

// //         // Create CSV content
// //         const csvContent = [
// //             headers.join(','),
// //             ...csvRows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
// //         ].join('\n');

// //         // Create download link
// //         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// //         const url = URL.createObjectURL(blob);
// //         const link = document.createElement('a');
// //         link.href = url;
// //         link.setAttribute('download', `property_records_${new Date().toISOString().slice(0, 10)}.csv`);
// //         document.body.appendChild(link);
// //         link.click();
// //         document.body.removeChild(link);
// //     };

// //     return (
// //         <div className="container mx-auto py-8 px-4">
// //             <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
// //                 <FileText className="mr-2" size={28} />
// //                 Property Records Dashboard
// //             </h1>

// //             {/* Filters Section */}
// //             <Card
// //                 title="Search Filters"
// //                 icon={<Filter size={18} />}
// //                 className="mb-8"
// //             >
// //                 <form onSubmit={handleSearch} className="space-y-4">
// //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                         <Select
// //                             id="districtCode"
// //                             label="District"
// //                             value={districtCode}
// //                             onChange={setDistrictCode}
// //                             options={districts}
// //                         />

// //                         <Select
// //                             id="sroCode"
// //                             label="SRO Office"
// //                             value={sroCode}
// //                             onChange={setSroCode}
// //                             options={sroOptions}
// //                         />

// //                         <Input
// //                             id="gaonCode1"
// //                             label="Gaon/Village Code"
// //                             value={gaonCode1}
// //                             onChange={(e) => setGaonCode1(e.target.value)}
// //                             placeholder="Enter Gaon/Village Code"
// //                         />

// //                         <Input
// //                             id="propertyId"
// //                             label="Property ID (Optional)"
// //                             value={propertyId}
// //                             onChange={(e) => setPropertyId(e.target.value)}
// //                             placeholder="Enter Property ID if known"
// //                         />
// //                     </div>

// //                     <div className="flex space-x-2">
// //                         <Button
// //                             type="submit"
// //                             disabled={loading}
// //                             className="flex items-center"
// //                         >
// //                             <Search className="mr-1" size={16} />
// //                             {loading ? 'Searching...' : 'Search Records'}
// //                         </Button>
// //                         <Button
// //                             type="button"
// //                             variant="outline"
// //                             onClick={handleClear}
// //                         >
// //                             Clear Filters
// //                         </Button>
// //                     </div>
// //                 </form>
// //             </Card>

// //             {/* Error Alert */}
// //             {error && (
// //                 <Alert
// //                     type="error"
// //                     title="Error"
// //                     message={error}
// //                 />
// //             )}

// //             {/* Results Section */}
// //             <Card
// //                 title={
// //                     <div className="flex justify-between items-center w-full">
// //                         <span>Search Results</span>
// //                         {records.length > 0 && (
// //                             <Button
// //                                 variant="outline"
// //                                 onClick={exportToCSV}
// //                                 className="flex items-center text-sm"
// //                             >
// //                                 <Download size={14} className="mr-1" />
// //                                 Export to CSV
// //                             </Button>
// //                         )}
// //                     </div>
// //                 }
// //                 className="mb-8"
// //             >
// //                 <div className="mb-4">
// //                     <p className="text-sm text-gray-500">
// //                         {totalRecords} records found
// //                     </p>
// //                 </div>

// //                 <div className="overflow-x-auto">
// //                     <Table
// //                         columns={propertyRecordsColumns}
// //                         data={getPaginatedRecords()}
// //                         onRowClick={(record) => viewPropertyDetails(record)}
// //                     />
// //                 </div>

// //                 {records.length > 0 && (
// //                     <Pagination
// //                         currentPage={page}
// //                         totalPages={totalPages}
// //                         onPageChange={handlePageChange}
// //                     />
// //                 )}
// //             </Card>

// //             {/* Detail View */}
// //             {currentRecord && (
// //                 <Card
// //                     title={
// //                         <div className="flex justify-between items-center w-full">
// //                             <span>Property Detail: {currentRecord.regNo}/{currentRecord.year}</span>
// //                             <div className="flex space-x-2">
// //                                 <Button
// //                                     variant="icon"
// //                                     onClick={() => {
// //                                         const jsonStr = JSON.stringify(currentRecord, null, 2);
// //                                         navigator.clipboard.writeText(jsonStr);
// //                                         alert('Record data copied to clipboard');
// //                                     }}
// //                                     title="Copy Record Data as JSON"
// //                                 >
// //                                     <Copy size={16} />
// //                                 </Button>
// //                             </div>
// //                         </div>
// //                     }
// //                     className="mb-8"
// //                 >
// //                     <div className="space-y-6">
// //                         {/* Registration Information */}
// //                         <div className="bg-gray-50 p-4 rounded-lg border">
// //                             <h3 className="text-lg font-semibold mb-3 text-gray-800">Registration Information</h3>
// //                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                                 <FieldDisplay label="Serial No" value={currentRecord.serialNo} copyable />
// //                                 <FieldDisplay label="Reg. Number" value={currentRecord.regNo} copyable />
// //                                 <FieldDisplay label="Year" value={currentRecord.year} />
// //                                 <FieldDisplay label="Reg. Date" value={currentRecord.regDate} />
// //                                 <FieldDisplay label="Deed Type" value={currentRecord.deedType} />
// //                                 <FieldDisplay label="Khata No" value={currentRecord.khataNo} copyable />
// //                             </div>
// //                         </div>

// //                         {/* Property Description */}
// //                         <div className="bg-gray-50 p-4 rounded-lg border">
// //                             <h3 className="text-lg font-semibold mb-3 text-gray-800">Property Description</h3>
// //                             <div className="p-3 bg-white rounded border">
// //                                 <p className="text-sm whitespace-pre-line">{currentRecord.propertyDesc || 'No description available'}</p>
// //                             </div>
// //                         </div>

// //                         {/* Party Information */}
// //                         <div className="bg-gray-50 p-4 rounded-lg border">
// //                             <h3 className="text-lg font-semibold mb-3 text-gray-800">Party Information</h3>
// //                             <div className="space-y-4">
// //                                 {currentRecord.partyNames && currentRecord.partyNames.map((name, index) => (
// //                                     <div key={index} className="p-3 bg-white rounded border">
// //                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// //                                             <div>
// //                                                 <span className="font-medium">Party {index + 1}: </span>
// //                                                 <span>{name}</span>
// //                                             </div>
// //                                             {currentRecord.partyAddresses && currentRecord.partyAddresses[index] && (
// //                                                 <div>
// //                                                     <span className="font-medium">Address: </span>
// //                                                     <span>{currentRecord.partyAddresses[index]}</span>
// //                                                 </div>
// //                                             )}
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>

// //                         {/* Additional Details */}
// //                         <div className="bg-gray-50 p-4 rounded-lg border">
// //                             <h3 className="text-lg font-semibold mb-3 text-gray-800">Additional Details</h3>
// //                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                                 <FieldDisplay label="District Code" value={currentRecord.details.dcode} />
// //                                 <FieldDisplay label="SRO Code" value={currentRecord.details.srocode} />
// //                                 <FieldDisplay label="PCode" value={currentRecord.details.pcode} />
// //                                 <FieldDisplay label="Sub Deed Code" value={currentRecord.details.subDeedCode} />
// //                                 <FieldDisplay label="Receipt No" value={currentRecord.details.recieptNo} copyable />
// //                                 <FieldDisplay label="Property Number" value={currentRecord.details.propertyNum} copyable />
// //                                 <FieldDisplay label="MongoDB ID" value={currentRecord._id} copyable />
// //                             </div>
// //                         </div>

// //                         {/* Technical Details */}
// //                         <div className="bg-gray-50 p-4 rounded-lg border">
// //                             <div className="flex justify-between items-center">
// //                                 <h3 className="text-lg font-semibold text-gray-800">Technical Details</h3>
// //                                 <Button
// //                                     variant="outline"
// //                                     onClick={() => {
// //                                         const jsonStr = JSON.stringify(currentRecord, null, 2);
// //                                         const blob = new Blob([jsonStr], { type: "application/json" });
// //                                         const url = URL.createObjectURL(blob);
// //                                         const a = document.createElement("a");
// //                                         a.href = url;
// //                                         a.download = `property_${currentRecord.regNo}_${currentRecord.year}.json`;
// //                                         document.body.appendChild(a);
// //                                         a.click();
// //                                         document.body.removeChild(a);
// //                                     }}
// //                                     className="text-sm flex items-center"
// //                                 >
// //                                     <Download size={14} className="mr-1" />
// //                                     Download JSON
// //                                 </Button>
// //                             </div>

// //                             <div className="mt-3 overflow-x-auto">
// //                                 <pre className="bg-gray-100 p-3 rounded text-xs text-gray-800 overflow-x-auto">
// //                                     {JSON.stringify(currentRecord, null, 2)}
// //                                 </pre>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <Button
// //                         variant="outline"
// //                         onClick={() => setCurrentRecord(null)}
// //                         className="flex items-center mt-6"
// //                     >
// //                         <ChevronLeft className="mr-1" size={16} />
// //                         Back to Results
// //                     </Button>
// //                 </Card>
// //             )}
// //         </div>
// //     );
// // };

// // export default PropertyDashboard;

// import React, { useState, useEffect } from 'react';
// import { Search, Filter, FileText, ChevronLeft, Info, Download, Copy } from 'lucide-react';
// import { base_url } from '../utils/base_url';
// import Button from '../components/Button';
// import Input from '../components/Input';
// import FieldDisplay from '../components/FieldDisplay';
// import Alert from '../components/Alert';
// import Card from '../components/Card';
// import Pagination from '../components/Pagination';
// import Select from '../components/Select';
// import Table from '../components/Table';
// import TehsilSelector from '../components/TehsilSelector';
// import VillageSelector from '../components/VillageSelector';

// // Main Dashboard Component
// const PropertyDashboard = () => {
//     // State for filter values
//     const [districtCode, setDistrictCode] = useState('');
//     const [sroCode, setSroCode] = useState('');
//     const [tehsilCode, setTehsilCode] = useState('');
//     const [gaonCode1, setGaonCode1] = useState('');
//     const [propertyId, setPropertyId] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // State for selected location display
//     const [selectedTehsil, setSelectedTehsil] = useState(null);
//     const [selectedVillage, setSelectedVillage] = useState(null);

//     // State for search results and pagination
//     const [records, setRecords] = useState([]);
//     const [currentRecord, setCurrentRecord] = useState(null);
//     const [totalRecords, setTotalRecords] = useState(0);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//     const [totalPages, setTotalPages] = useState(1);

//     // State for district and SRO options
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

//     // Handle tehsil selection
//     const handleTehsilSelect = (tehsilData) => {
//         if (tehsilData) {
//             setTehsilCode(tehsilData.tehsilCode);
//             setSroCode(tehsilData.tehsilCode); // SRO code is the same as tehsil code in many cases
//             setSelectedTehsil(tehsilData);
//             // Clear village when tehsil changes
//             setGaonCode1('');
//             setSelectedVillage(null);
//         } else {
//             setTehsilCode('');
//             setSroCode('');
//             setSelectedTehsil(null);
//             setGaonCode1('');
//             setSelectedVillage(null);
//         }
//     };

//     // Handle village selection
//     const handleVillageSelect = (villageData) => {
//         if (villageData) {
//             setGaonCode1(villageData.gaonCode1);
//             setSelectedVillage(villageData);
//         } else {
//             setGaonCode1('');
//             setSelectedVillage(null);
//         }
//     };

//     // Function to view details of a specific property
//     const viewPropertyDetails = (property) => {
//         setCurrentRecord(property);
//     };

//     // Function to get paginated records
//     const getPaginatedRecords = () => {
//         const startIndex = (page - 1) * limit;
//         const endIndex = Math.min(startIndex + limit, records.length);
//         return records.slice(startIndex, endIndex);
//     };

//     // Search function - Submit new search criteria to API
//     const handleSearch = async (e) => {
//         e.preventDefault();

//         try {
//             setLoading(true);
//             setError(null);
//             setPage(1); // Reset to first page on new search

//             // Check required fields
//             if (!districtCode || !sroCode || !gaonCode1) {
//                 setError('Please select district, tehsil/area, and village/location to search');
//                 setLoading(false);
//                 return;
//             }

//             // Prepare request body
//             const requestBody = {
//                 districtCode,
//                 sroCode,
//                 propertyId: propertyId || '',
//                 propNEWAddress: '1',
//                 gaonCode1
//             };

//             // Send search request to API
//             const response = await fetch(`${base_url}/api/property-records?districtCode=${districtCode}&sroCode=${sroCode}&gaonCode1=${gaonCode1}`);

//             // Handle non-successful responses
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to fetch property data');
//             }

//             // Parse data from successful response
//             const data = await response.json();
//             console.log("Search response:", data);

//             // Extract property records based on the actual data structure
//             let propertyRecords = [];

//             if (data && data.success && data.data && Array.isArray(data.data)) {
//                 // Check if data.data[0] has propertyRecords (as in your example JSON)
//                 if (data.data[0] && Array.isArray(data.data[0].propertyRecords)) {
//                     propertyRecords = data.data[0].propertyRecords;
//                 } else {
//                     // Fallback if the structure is different
//                     propertyRecords = data.data;
//                 }
//             } else if (data && Array.isArray(data)) {
//                 propertyRecords = data;
//             } else if (data && data.data && Array.isArray(data.data.propertyRecords)) {
//                 propertyRecords = data.data.propertyRecords;
//             }

//             setRecords(propertyRecords);
//             setTotalRecords(propertyRecords.length);
//             setTotalPages(Math.ceil(propertyRecords.length / limit));

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
//         setTehsilCode('');
//         setSelectedTehsil(null);
//         setGaonCode1('');
//         setSelectedVillage(null);
//         setPropertyId('');
//         setCurrentRecord(null);
//         setPage(1);
//         setRecords([]);
//         setTotalRecords(0);
//     };

//     // Handle pagination
//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setPage(newPage);
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
//                                 setTehsilCode('');
//                                 setSroCode('');
//                                 setSelectedTehsil(null);
//                                 setGaonCode1('');
//                                 setSelectedVillage(null);
//                             }}
//                             options={districts}
//                         />

//                         {/* Tehsil Selection - User-friendly dropdown */}
//                         <TehsilSelector
//                             districtCode={districtCode}
//                             onSelectTehsil={handleTehsilSelect}
//                         />

//                         {/* Village Selection - Searchable dropdown */}
//                         <VillageSelector
//                             districtCode={districtCode}
//                             tehsilCode={tehsilCode}
//                             onSelectVillage={handleVillageSelect}
//                             placeholder="Search village/location name..."
//                         />

//                         {/* Optional Property ID */}
//                         <Input
//                             id="propertyId"
//                             label="Property ID (Optional)"
//                             value={propertyId}
//                             onChange={(e) => setPropertyId(e.target.value)}
//                             placeholder="Enter Property ID if known"
//                         />
//                     </div>

//                     {/* Selected Location Display */}
//                     {(selectedTehsil || selectedVillage) && (
//                         <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mt-2">
//                             <h4 className="text-sm font-medium text-blue-800 mb-1 flex items-center">
//                                 <Info size={14} className="mr-1" />
//                                 Selected Location
//                             </h4>
//                             <div className="text-sm text-blue-700 space-y-1">
//                                 {selectedTehsil && (
//                                     <p>Tehsil: <span className="font-medium">{selectedTehsil.tehsilNameEn}</span> ({selectedTehsil.tehsilNameHi})</p>
//                                 )}
//                                 {selectedVillage && (
//                                     <p>Village: <span className="font-medium">{selectedVillage.villageNameEn}</span> ({selectedVillage.villageNameHi})</p>
//                                 )}
//                                 <p className="text-xs text-blue-600">
//                                     Codes: District={districtCode}, SRO={sroCode}, Gaon={gaonCode1}
//                                 </p>
//                             </div>
//                         </div>
//                     )}

//                     <div className="flex space-x-2">
//                         <Button
//                             type="submit"
//                             disabled={loading}
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
//                         {selectedVillage && (
//                             <span> in {selectedVillage.villageNameEn}</span>
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
//         </div>
//     );
// };

// export default PropertyDashboard;

// import React, { useState, useEffect } from 'react';
// import { Search, Filter, FileText, ChevronLeft, Info, Download, Copy } from 'lucide-react';
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

// // Main Dashboard Component
// const PropertyDashboard = () => {
//     // State for filter values
//     const [districtCode, setDistrictCode] = useState('');
//     const [sroCode, setSroCode] = useState('');
//     const [gaonCode1, setGaonCode1] = useState('');
//     const [propertyId, setPropertyId] = useState('');
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

//     // Handle location selection
//     const handleLocationSelect = (locationData) => {
//         if (locationData) {
//             setSroCode(locationData.sroCode);
//             setGaonCode1(locationData.gaonCode1);
//             setSelectedLocation(locationData);
//         } else {
//             setSroCode('');
//             setGaonCode1('');
//             setSelectedLocation(null);
//         }
//     };

//     // Function to view details of a specific property
//     const viewPropertyDetails = (property) => {
//         setCurrentRecord(property);
//     };

//     // Function to get paginated records
//     const getPaginatedRecords = () => {
//         const startIndex = (page - 1) * limit;
//         const endIndex = Math.min(startIndex + limit, records.length);
//         return records.slice(startIndex, endIndex);
//     };

//     // Search function - Submit new search criteria to API
//     const handleSearch = async (e) => {
//         e.preventDefault();

//         try {
//             setLoading(true);
//             setError(null);
//             setPage(1); // Reset to first page on new search

//             // Check required fields
//             if (!districtCode || !sroCode || !gaonCode1) {
//                 setError('Please select district and location to search');
//                 setLoading(false);
//                 return;
//             }

//             // Send search request to API
//             const response = await fetch(`${base_url}/api/property-records?districtCode=${districtCode}&sroCode=${sroCode}&gaonCode1=${gaonCode1}`);

//             // Handle non-successful responses
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to fetch property data');
//             }

//             // Parse data from successful response
//             const data = await response.json();
//             console.log("Search response:", data);

//             // Extract property records based on the actual data structure
//             let propertyRecords = [];

//             if (data && data.success && data.data && Array.isArray(data.data)) {
//                 // Check if data.data[0] has propertyRecords (as in your example JSON)
//                 if (data.data[0] && Array.isArray(data.data[0].propertyRecords)) {
//                     propertyRecords = data.data[0].propertyRecords;
//                 } else {
//                     // Fallback if the structure is different
//                     propertyRecords = data.data;
//                 }
//             } else if (data && Array.isArray(data)) {
//                 propertyRecords = data;
//             } else if (data && data.data && Array.isArray(data.data.propertyRecords)) {
//                 propertyRecords = data.data.propertyRecords;
//             }

//             setRecords(propertyRecords);
//             setTotalRecords(propertyRecords.length);
//             setTotalPages(Math.ceil(propertyRecords.length / limit));

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
//         setCurrentRecord(null);
//         setPage(1);
//         setRecords([]);
//         setTotalRecords(0);
//     };

//     // Handle pagination
//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setPage(newPage);
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
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
//         </div>
//     );
// };

// export default PropertyDashboard;


// import React, { useState, useEffect } from 'react';
// import { Search, Filter, FileText, ChevronLeft, Info, Download, Copy } from 'lucide-react';
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

// // Main Dashboard Component
// const PropertyDashboard = () => {
//     // State for filter values
//     const [districtCode, setDistrictCode] = useState('');
//     const [sroCode, setSroCode] = useState('');
//     const [gaonCode1, setGaonCode1] = useState('');
//     const [propertyId, setPropertyId] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [year , setYear] = useState('')
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
//     const handleLocationSelect = (locationData) => {
//         if (locationData) {
//             // Set SRO code and Gaon code based on selected location
//             setSroCode(locationData.tehsilCode); // tehsilCode is same as sroCode
//             setGaonCode1(locationData.gaonCode1);
//             setSelectedLocation(locationData);
//         } else {
//             // Clear location data if selection is cleared
//             setSroCode('');
//             setGaonCode1('');
//             setSelectedLocation(null);
//         }
//     };

//     // Function to view details of a specific property
//     const viewPropertyDetails = (property) => {
//         setCurrentRecord(property);
//     };

//     // Function to get paginated records
//     const getPaginatedRecords = () => {
//         const startIndex = (page - 1) * limit;
//         const endIndex = Math.min(startIndex + limit, records.length);
//         return records.slice(startIndex, endIndex);
//     };

//     // Search function - Submit new search criteria to API
//     const handleSearch = async (e) => {
//         e.preventDefault();

//         try {
//             setLoading(true);
//             setError(null);
//             setPage(1); // Reset to first page on new search

//             // Check required fields
//             if (!districtCode || !sroCode || !gaonCode1) {
//                 setError('Please select district and location to search');
//                 setLoading(false);
//                 return;
//             }

//             // Send search request to API
//             const response = await fetch(`${base_url}/api/property-records?districtCode=${districtCode}&sroCode=${sroCode}&gaonCode1=${gaonCode1}`);

//             // Handle non-successful responses
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to fetch property data');
//             }

//             // Parse data from successful response
//             const data = await response.json();
//             console.log("Search response:", data);

//             // Extract property records based on the actual data structure
//             let propertyRecords = [];

//             if (data && data.success && data.data && Array.isArray(data.data)) {
//                 // Check if data.data[0] has propertyRecords (as in your example JSON)
//                 if (data.data[0] && Array.isArray(data.data[0].propertyRecords)) {
//                     propertyRecords = data.data[0].propertyRecords;
//                 } else {
//                     // Fallback if the structure is different
//                     propertyRecords = data.data;
//                 }
//             } else if (data && Array.isArray(data)) {
//                 propertyRecords = data;
//             } else if (data && data.data && Array.isArray(data.data.propertyRecords)) {
//                 propertyRecords = data.data.propertyRecords;
//             }

//             setRecords(propertyRecords);
//             setTotalRecords(propertyRecords.length);
//             setTotalPages(Math.ceil(propertyRecords.length / limit));

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
//         setCurrentRecord(null);
//         setPage(1);
//         setRecords([]);
//         setTotalRecords(0);
//     };

//     // Handle pagination
//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setPage(newPage);
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
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

//                         {/* year filter */}
//                         <Input
//                             id="year"
//                             label="Select Year (Optional)"
//                             value={year}
//                             onChange={(e) => setYear(e.target.value)}
//                             placeholder="Enter Year"
//                         />


//                         {/* Optional Property ID */}
//                         <Input
//                             id="propertyId"
//                             label="Property ID (Optional)"
//                             value={propertyId}
//                             onChange={(e) => setPropertyId(e.target.value)}
//                             placeholder="Enter Property ID if known"
//                         />
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
//         </div>
//     );
// };

// export default PropertyDashboard;



import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, ChevronLeft, Info, Download, Copy } from 'lucide-react';
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

// Main Dashboard Component
const PropertyDashboard = () => {
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
            render: (row) => row.partyNames && row.partyNames.length > 0 ? row.partyNames[0] : '-'
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
            render: (row) => row.partyNames && row.partyNames.length > 1 ? row.partyNames[1] : '-'
        },
        {
            header: 'Property Description',
            accessor: 'propertyDesc',
            render: (row) => (
                <div className="max-w-2xl">
                    {row.propertyDesc || '-'}
                </div>
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

                        {/* Party Name */}
                        <Input
                            id="partyName"
                            label="Party Name"
                            value={partyName}
                            onChange={(e) => setPartyName(e.target.value)}
                            placeholder="Search by party name"
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
                            disabled={loading || !selectedLocation}
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
                                                <span>{name}</span>
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
        </div>
    );
};

export default PropertyDashboard;

