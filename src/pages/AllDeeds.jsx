// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//     RefreshCw,
//     Filter,
//     ChevronDown,
//     ChevronLeft,
//     ChevronRight,
//     ArrowUp,
//     ArrowDown,
//     Search,
//     Download,
//     Trash2,
//     Eye,
//     FileText
// } from 'lucide-react';
// import { base_url } from '../utils/base_url';

// function AllDeeds({deeds , setDeeds}) {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [totalDeeds, setTotalDeeds] = useState(0);
//     const [limit, setLimit] = useState(10);
//     const [sortField, setSortField] = useState('registrationDateParsed');
//     const [sortOrder, setSortOrder] = useState('desc');
//     const [filterMenuOpen, setFilterMenuOpen] = useState(false);
//     const [filters, setFilters] = useState({
//         search: '',
//         deedType: '',
//         district: '',
//         year: '',
//         minValue: '',
//         maxValue: '',
//         fromDate: '',
//         toDate: ''
//     });
//     const [districts, setDistricts] = useState([]);
//     const [deedTypes, setDeedTypes] = useState([]);
//     const [years, setYears] = useState([]);
//     const [selectedDeeds, setSelectedDeeds] = useState([]);

//     const navigate = useNavigate()

//     useEffect(() => {
//         fetchDeeds();
//         fetchReferenceData();
//     }, [page, limit, sortField, sortOrder, filters]);

//     const fetchDeeds = async () => {
//         try {
//             setLoading(true);

//             // Build query parameters
//             const params = {
//                 page,
//                 limit,
//                 sort: `${sortOrder === 'desc' ? '-' : ''}${sortField}`
//             };

//             // Add filters
//             Object.keys(filters).forEach(key => {
//                 if (filters[key]) {
//                     params[key] = filters[key];
//                 }
//             });

//             const response = await axios.get(`${base_url}/deeds/get-all-deeds`, { params });

//             setDeeds(response.data.data);
//             setTotalPages(response.data.pages);
//             setTotalDeeds(response.data.total);
//             setError(null);
//         } catch (err) {
//             setError('Failed to load deeds. Please try again.');
//             console.error('Error fetching deeds:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchReferenceData = async () => {
//         try {
//             // Get unique districts
//             const districtsResponse = await axios.get(`${base_url}/deeds/get/districts`);
//             setDistricts(districtsResponse.data.data || []);

//             // Get unique deed types
//             const deedTypesResponse = await axios.get(`${base_url}/deeds/get/deed-types`);
//             setDeedTypes(deedTypesResponse.data.data || []);

//             // Generate a list of years (current year down to 2000)
//             const currentYear = new Date().getFullYear();
//             const yearsList = Array.from(
//                 { length: currentYear - 1999 },
//                 (_, i) => (currentYear - i).toString()
//             );
//             setYears(yearsList);
//         } catch (err) {
//             console.error('Error fetching reference data:', err);
//         }
//     };

//     const handleSort = (field) => {
//         if (field === sortField) {
//             setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//         } else {
//             setSortField(field);
//             setSortOrder('asc');
//         }
//     };

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters(prevFilters => ({
//             ...prevFilters,
//             [name]: value
//         }));
//         setPage(1); // Reset to first page when filters change
//     };

//     const clearFilters = () => {
//         setFilters({
//             search: '',
//             deedType: '',
//             district: '',
//             year: '',
//             minValue: '',
//             maxValue: '',
//             fromDate: '',
//             toDate: ''
//         });
//         setPage(1);
//     };

//     const handleSelectAll = (e) => {
//         if (e.target.checked) {
//             setSelectedDeeds(deeds.map(deed => deed._id));
//         } else {
//             setSelectedDeeds([]);
//         }
//     };

//     const handleSelectDeed = (e, deedId) => {
//         if (e.target.checked) {
//             setSelectedDeeds([...selectedDeeds, deedId]);
//         } else {
//             setSelectedDeeds(selectedDeeds.filter(id => id !== deedId));
//         }
//     };

//     const formatCurrency = (value) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             maximumFractionDigits: 0
//         }).format(value);
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';

//         try {
//             const date = new Date(dateString);
//             return date.toLocaleDateString('en-IN', {
//                 year: 'numeric',
//                 month: 'short',
//                 day: 'numeric'
//             });
//         } catch (error) {
//             return dateString; // Return original string if parsing fails
//         }
//     };

//     const getSortIcon = (field) => {
//         if (field !== sortField) return null;

//         return sortOrder === 'asc' ? (
//             <ArrowUp className="w-4 h-4 ml-1" />
//         ) : (
//             <ArrowDown className="w-4 h-4 ml-1" />
//         );
//     };

//     const handleDeleteDeed = async (deedId) => {
//         if (!window.confirm('Are you sure you want to delete this deed?')) {
//             return;
//         }

//         try {
//             setLoading(true);
//             await axios.delete(`${base_url}/deeds/${deedId}`);

//             // Refresh the list
//             fetchDeeds();
//         } catch (err) {
//             setError('Failed to delete deed. Please try again.');
//             console.error('Error deleting deed:', err);
//             setLoading(false);
//         }
//     };

//     const handleDeleteSelected = async () => {
//         if (!window.confirm(`Are you sure you want to delete ${selectedDeeds.length} selected deeds?`)) {
//             return;
//         }

//         try {
//             setLoading(true);
//             await axios.delete(`${base_url}/deeds`, { data: { ids: selectedDeeds } });

//             // Clear selection and refresh the list
//             setSelectedDeeds([]);
//             fetchDeeds();
//         } catch (err) {
//             setError('Failed to delete selected deeds. Please try again.');
//             console.error('Error deleting selected deeds:', err);
//             setLoading(false);
//         }
//     };

//     const handleExportSelected = async () => {
//         try {
//             const idsParam = selectedDeeds.join(',');
//             // Using window.open for direct file download
//             window.open(`${base_url}/export/csv?ids=${idsParam}`, '_blank');
//         } catch (err) {
//             setError('Failed to export deeds. Please try again.');
//             console.error('Error exporting deeds:', err);
//         }
//     };

//     return (
//         <div>
//             {/* Page header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//                 <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">All Deeds</h1>

//                 <div className="flex space-x-2">
//                     <button
//                         onClick={() => setFilterMenuOpen(!filterMenuOpen)}
//                         className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
//                     >
//                         <Filter className="w-4 h-4 mr-2" />
//                         Filters
//                         <ChevronDown className="w-4 h-4 ml-1" />
//                     </button>

//                     <button
//                         onClick={fetchDeeds}
//                         className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
//                     >
//                         <RefreshCw className="w-4 h-4 mr-2" />
//                         Refresh
//                     </button>

//                     <Link
//                         to="/upload"
//                         className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
//                     >
//                         <span>Add New</span>
//                     </Link>
//                 </div>
//             </div>

//             {/* Filters panel */}
//             {filterMenuOpen && (
//                 <div className="bg-white rounded-lg shadow mb-6 p-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Search className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     type="text"
//                                     name="search"
//                                     value={filters.search}
//                                     onChange={handleFilterChange}
//                                     className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                                     placeholder="Search deed, party..."
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Deed Type</label>
//                             <select
//                                 name="deedType"
//                                 value={filters.deedType}
//                                 onChange={handleFilterChange}
//                                 className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                             >
//                                 <option value="">All Types</option>
//                                 {deedTypes.map((type, index) => (
//                                     <option key={index} value={type}>
//                                         {type}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
//                             <select
//                                 name="district"
//                                 value={filters.district}
//                                 onChange={handleFilterChange}
//                                 className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                             >
//                                 <option value="">All Districts</option>
//                                 {districts.map((district, index) => (
//                                     <option key={index} value={district}>
//                                         {district}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//                             <select
//                                 name="year"
//                                 value={filters.year}
//                                 onChange={handleFilterChange}
//                                 className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                             >
//                                 <option value="">All Years</option>
//                                 {years.map((year) => (
//                                     <option key={year} value={year}>
//                                         {year}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Min Value (₹)</label>
//                             <input
//                                 type="number"
//                                 name="minValue"
//                                 value={filters.minValue}
//                                 onChange={handleFilterChange}
//                                 className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                                 placeholder="Min value"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Max Value (₹)</label>
//                             <input
//                                 type="number"
//                                 name="maxValue"
//                                 value={filters.maxValue}
//                                 onChange={handleFilterChange}
//                                 className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                                 placeholder="Max value"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
//                             <input
//                                 type="date"
//                                 name="fromDate"
//                                 value={filters.fromDate}
//                                 onChange={handleFilterChange}
//                                 className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
//                             <input
//                                 type="date"
//                                 name="toDate"
//                                 value={filters.toDate}
//                                 onChange={handleFilterChange}
//                                 className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                             />
//                         </div>
//                     </div>

//                     <div className="mt-4 flex justify-end">
//                         <button
//                             onClick={clearFilters}
//                             className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 mr-2"
//                         >
//                             Clear Filters
//                         </button>
//                         <button
//                             onClick={() => setFilterMenuOpen(false)}
//                             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
//                         >
//                             Apply Filters
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Selection actions */}
//             {selectedDeeds.length > 0 && (
//                 <div className="bg-indigo-50 rounded-lg p-3 mb-4 flex items-center justify-between">
//                     <span className="text-sm text-indigo-700">
//                         {selectedDeeds.length} {selectedDeeds.length === 1 ? 'deed' : 'deeds'} selected
//                     </span>
//                     <div className="flex space-x-2">
//                         <button
//                             onClick={handleExportSelected}
//                             className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
//                         >
//                             <Download className="w-4 h-4 mr-1" />
//                             Export
//                         </button>
//                         <button
//                             className="flex items-center px-3 py-1 bg-red-50 border border-red-300 text-red-700 rounded-md hover:bg-red-100 transition-colors text-sm"
//                             onClick={handleDeleteSelected}
//                         >
//                             <Trash2 className="w-4 h-4 mr-1" />
//                             Delete
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Loading state */}
//             {loading && (
//                 <div className="flex justify-center my-8">
//                     <div className="w-8 h-8 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
//                 </div>
//             )}

//             {/* Error state */}
//             {error && !loading && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
//                     <p>{error}</p>
//                 </div>
//             )}

//             {/* Deeds table */}
//             {!loading && !error && (
//                 <div className="bg-white shadow rounded-lg overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th scope="col" className="px-3 py-3 text-left">
//                                         <div className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                                                 onChange={handleSelectAll}
//                                                 checked={selectedDeeds?.length === deeds?.length && deeds?.length > 0}
//                                             />
//                                         </div>
//                                     </th>
//                                     <th
//                                         scope="col"
//                                         className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                                         onClick={() => handleSort('documentNumber')}
//                                     >
//                                         <div className="flex items-center">
//                                             Doc #
//                                             {getSortIcon('documentNumber')}
//                                         </div>
//                                     </th>
//                                     <th
//                                         scope="col"
//                                         className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                                         onClick={() => handleSort('deedType')}
//                                     >
//                                         <div className="flex items-center">
//                                             Type
//                                             {getSortIcon('deedType')}
//                                         </div>
//                                     </th>
//                                     <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Parties
//                                     </th>
//                                     <th
//                                         scope="col"
//                                         className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                                         onClick={() => handleSort('transactionValue')}
//                                     >
//                                         <div className="flex items-center">
//                                             Value
//                                             {getSortIcon('transactionValue')}
//                                         </div>
//                                     </th>
//                                     <th
//                                         scope="col"
//                                         className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                                         onClick={() => handleSort('registrationDateParsed')}
//                                     >
//                                         <div className="flex items-center">
//                                             Date
//                                             {getSortIcon('registrationDateParsed')}
//                                         </div>
//                                     </th>
//                                     <th
//                                         scope="col"
//                                         className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                                         onClick={() => handleSort('district')}
//                                     >
//                                         <div className="flex items-center">
//                                             District
//                                             {getSortIcon('district')}
//                                         </div>
//                                     </th>
//                                     <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {deeds?.map((deed) => (
//                                     <tr
//                                         key={deed._id}
//                                         className="hover:bg-gray-50"
//                                     >
//                                         <td className="px-3 py-4 whitespace-nowrap">
//                                             <div className="flex items-center">
//                                                 <input
//                                                     type="checkbox"
//                                                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                                                     checked={selectedDeeds.includes(deed._id)}
//                                                     onChange={(e) => handleSelectDeed(e, deed._id)}
//                                                 />
//                                             </div>
//                                         </td>
//                                         <td className="px-3 py-4 whitespace-nowrap">
//                                             <div className="text-sm font-medium text-gray-900">{deed.documentNumber}</div>
//                                             <div className="text-xs text-gray-500">{deed.year}</div>
//                                         </td>
//                                         <td className="px-3 py-4 whitespace-nowrap">
//                                             <div className="text-sm text-gray-900">{deed.deedType}</div>
//                                         </td>
//                                         <td className="px-3 py-4">
//                                             <div className="text-sm text-gray-900">
//                                                 {deed.firstParty && deed.firstParty[0] ? deed.firstParty[0].name : 'N/A'}
//                                             </div>
//                                             <div className="text-xs text-gray-500">
//                                                 {deed.secondParty && deed.secondParty[0] ? deed.secondParty[0].name : 'N/A'}
//                                             </div>
//                                         </td>
//                                         <td className="px-3 py-4 whitespace-nowrap">
//                                             <div className="text-sm text-gray-900">{formatCurrency(deed.transactionValue)}</div>
//                                             {deed.marketValue !== deed.transactionValue && (
//                                                 <div className="text-xs text-gray-500">
//                                                     Mkt: {formatCurrency(deed.marketValue)}
//                                                 </div>
//                                             )}
//                                         </td>
//                                         <td className="px-3 py-4 whitespace-nowrap">
//                                             <div className="text-sm text-gray-900">{formatDate(deed.registrationDateParsed)}</div>
//                                             {deed.executionDateParsed && (
//                                                 <div className="text-xs text-gray-500">
//                                                     Exe: {formatDate(deed.executionDateParsed)}
//                                                 </div>
//                                             )}
//                                         </td>
//                                         <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {deed.district}
//                                         </td>
//                                         <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             <div className="flex items-center justify-end space-x-2">
//                                                 <div
//                                                     onClick={() => navigate(`/deeds/${deed?._id}`)}
//                                                     className="text-indigo-600 hover:text-indigo-900"
//                                                 >
//                                                     <Eye className="w-5 h-5" />
//                                                 </div>
//                                                 <button
//                                                     className="text-red-600 hover:text-red-900"
//                                                     onClick={() => handleDeleteDeed(deed._id)}
//                                                 >
//                                                     <Trash2 className="w-5 h-5" />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination */}
//                     <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//                         <div className="flex-1 flex justify-between sm:hidden">
//                             <button
//                                 onClick={() => setPage(Math.max(1, page - 1))}
//                                 disabled={page <= 1}
//                                 className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
//                                     }`}
//                             >
//                                 Previous
//                             </button>
//                             <button
//                                 onClick={() => setPage(Math.min(totalPages, page + 1))}
//                                 disabled={page >= totalPages}
//                                 className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page >= totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
//                                     }`}
//                             >
//                                 Next
//                             </button>
//                         </div>
//                         <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                             <div>
//                                 <p className="text-sm text-gray-700">
//                                     Showing{' '}
//                                     <span className="font-medium">
//                                         {deeds?.length > 0 ? (page - 1) * limit + 1 : 0}
//                                     </span>{' '}
//                                     to{' '}
//                                     <span className="font-medium">
//                                         {Math.min(page * limit, totalDeeds)}
//                                     </span>{' '}
//                                     of <span className="font-medium">{totalDeeds}</span> results
//                                 </p>
//                             </div>
//                             <div>
//                                 <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                                     <button
//                                         onClick={() => setPage(Math.max(1, page - 1))}
//                                         disabled={page <= 1}
//                                         className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${page <= 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
//                                             }`}
//                                     >
//                                         <span className="sr-only">Previous</span>
//                                         <ChevronLeft className="h-5 w-5" />
//                                     </button>

//                                     {/* Page numbers */}
//                                     {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
//                                         let pageNum;
//                                         if (totalPages <= 5) {
//                                             pageNum = i + 1;
//                                         } else if (page <= 3) {
//                                             pageNum = i + 1;
//                                         } else if (page >= totalPages - 2) {
//                                             pageNum = totalPages - 4 + i;
//                                         } else {
//                                             pageNum = page - 2 + i;
//                                         }

//                                         return (
//                                             <button
//                                                 key={i}
//                                                 onClick={() => setPage(pageNum)}
//                                                 className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === pageNum
//                                                     ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
//                                                     : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//                                                     }`}
//                                             >
//                                                 {pageNum}
//                                             </button>
//                                         );
//                                     })}

//                                     <button
//                                         onClick={() => setPage(Math.min(totalPages, page + 1))}
//                                         disabled={page >= totalPages}
//                                         className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${page >= totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
//                                             }`}
//                                     >
//                                         <span className="sr-only">Next</span>
//                                         <ChevronRight className="h-5 w-5" />
//                                     </button>
//                                 </nav>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* No results */}
//             {!loading && !error && deeds?.length === 0 && (
//                 <div className="bg-white shadow rounded-lg p-8 text-center">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//                         <FileText className="w-8 h-8 text-gray-500" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No deeds found</h3>
//                     <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
//                         {Object.values(filters).some(val => val)
//                             ? "No deeds match your current filters. Try adjusting or clearing your filters."
//                             : "There are no deeds in the system yet. Upload some deed documents to get started."}
//                     </p>
//                     {Object.values(filters).some(val => val) ? (
//                         <button
//                             onClick={clearFilters}
//                             className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                         >
//                             Clear Filters
//                         </button>
//                     ) : (
//                         <Link
//                             to="/upload"
//                             className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
//                         >
//                             Upload Deeds
//                         </Link>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default AllDeeds;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    RefreshCw,
    Filter,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ArrowUp,
    ArrowDown,
    Search,
    Download,
    Trash2,
    Eye,
    FileText
} from 'lucide-react';
import { base_url } from '../utils/base_url';

function AllDeeds({ deeds, setDeeds, district }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalDeeds, setTotalDeeds] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortField, setSortField] = useState('registrationDateParsed');
    const [sortOrder, setSortOrder] = useState('desc');
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        deedType: '',
        district: district || '', // Initialize with district from props if available
        year: '',
        minValue: '',
        maxValue: '',
        fromDate: '',
        toDate: ''
    });
    const [districts, setDistricts] = useState([]);
    const [deedTypes, setDeedTypes] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedDeeds, setSelectedDeeds] = useState([]);
    const [currentDeeds, setCurrentDeeds] = useState([]);

    const navigate = useNavigate();

    // Only fetch reference data on component mount
    useEffect(() => {
        fetchReferenceData();
        setLoading(false);
    }, []);

    // Apply filters when they change or when district prop changes
    useEffect(() => {
        if (deeds && deeds.length > 0) {
            applyFiltersAndPagination();
        }
    }, [page, limit, sortField, sortOrder, filters, deeds]);

    // Update filters.district when district prop changes
    useEffect(() => {
        if (district !== filters.district) {
            setFilters(prev => ({
                ...prev,
                district: district || ''
            }));
        }
    }, [district]);

    const applyFiltersAndPagination = () => {
        try {
            setLoading(true);

            // Start with all deeds from props
            let filteredDeeds = [...deeds];

            // Apply search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                filteredDeeds = filteredDeeds.filter(deed =>
                    (deed.documentNumber && deed.documentNumber.toLowerCase().includes(searchLower)) ||
                    (deed.deedType && deed.deedType.toLowerCase().includes(searchLower)) ||
                    (deed.district && deed.district.toLowerCase().includes(searchLower)) ||
                    (deed.firstParty && deed.firstParty[0] && deed.firstParty[0].name &&
                        deed.firstParty[0].name.toLowerCase().includes(searchLower)) ||
                    (deed.secondParty && deed.secondParty[0] && deed.secondParty[0].name &&
                        deed.secondParty[0].name.toLowerCase().includes(searchLower))
                );
            }

            // Apply other filters
            if (filters.deedType) {
                filteredDeeds = filteredDeeds.filter(deed =>
                    deed.deedType === filters.deedType
                );
            }

            if (filters.district) {
                filteredDeeds = filteredDeeds.filter(deed =>
                    deed.district === filters.district
                );
            }

            if (filters.year) {
                filteredDeeds = filteredDeeds.filter(deed =>
                    deed.year === filters.year
                );
            }

            if (filters.minValue) {
                filteredDeeds = filteredDeeds.filter(deed =>
                    deed.transactionValue >= parseFloat(filters.minValue)
                );
            }

            if (filters.maxValue) {
                filteredDeeds = filteredDeeds.filter(deed =>
                    deed.transactionValue <= parseFloat(filters.maxValue)
                );
            }

            if (filters.fromDate) {
                const fromDate = new Date(filters.fromDate);
                filteredDeeds = filteredDeeds.filter(deed =>
                    deed.registrationDateParsed && new Date(deed.registrationDateParsed) >= fromDate
                );
            }

            if (filters.toDate) {
                const toDate = new Date(filters.toDate);
                toDate.setHours(23, 59, 59, 999); // End of day
                filteredDeeds = filteredDeeds.filter(deed =>
                    deed.registrationDateParsed && new Date(deed.registrationDateParsed) <= toDate
                );
            }

            // Apply sorting
            filteredDeeds.sort((a, b) => {
                let valueA = a[sortField];
                let valueB = b[sortField];

                // Handle nested properties like dates
                if (sortField === 'registrationDateParsed' || sortField === 'executionDateParsed') {
                    valueA = valueA ? new Date(valueA).getTime() : 0;
                    valueB = valueB ? new Date(valueB).getTime() : 0;
                }

                if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
                if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });

            // Calculate pagination
            const totalFilteredDeeds = filteredDeeds.length;
            const startIndex = (page - 1) * limit;
            const paginatedDeeds = filteredDeeds.slice(startIndex, startIndex + limit);

            // Update state
            setTotalDeeds(totalFilteredDeeds);
            setTotalPages(Math.ceil(totalFilteredDeeds / limit));
            setCurrentDeeds(paginatedDeeds);
            setLoading(false);
        } catch (err) {
            setError('Failed to process deeds data.');
            console.error('Error processing deeds:', err);
            setLoading(false);
        }
    };

    const refreshData = () => {
        applyFiltersAndPagination();
    };

    const fetchReferenceData = async () => {
        try {
            // Get unique districts
            const districtsResponse = await axios.get(`${base_url}/deeds/get/districts`);
            setDistricts(districtsResponse.data.data || []);

            // Get unique deed types
            const deedTypesResponse = await axios.get(`${base_url}/deeds/get/deed-types`);
            setDeedTypes(deedTypesResponse.data.data || []);

            // Generate a list of years (current year down to 2000)
            const currentYear = new Date().getFullYear();
            const yearsList = Array.from(
                { length: currentYear - 1999 },
                (_, i) => (currentYear - i).toString()
            );
            setYears(yearsList);
        } catch (err) {
            console.error('Error fetching reference data:', err);
        }
    };

    const handleSort = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
        setPage(1); // Reset to first page when filters change
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            deedType: '',
            district: district || '', // Keep the district from props if it exists
            year: '',
            minValue: '',
            maxValue: '',
            fromDate: '',
            toDate: ''
        });
        setPage(1);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedDeeds(currentDeeds.map(deed => deed._id));
        } else {
            setSelectedDeeds([]);
        }
    };

    const handleSelectDeed = (e, deedId) => {
        if (e.target.checked) {
            setSelectedDeeds([...selectedDeeds, deedId]);
        } else {
            setSelectedDeeds(selectedDeeds.filter(id => id !== deedId));
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';

        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return dateString; // Return original string if parsing fails
        }
    };

    const getSortIcon = (field) => {
        if (field !== sortField) return null;

        return sortOrder === 'asc' ? (
            <ArrowUp className="w-4 h-4 ml-1" />
        ) : (
            <ArrowDown className="w-4 h-4 ml-1" />
        );
    };

    const handleDeleteDeed = async (deedId) => {
        if (!window.confirm('Are you sure you want to delete this deed?')) {
            return;
        }

        try {
            setLoading(true);
            await axios.delete(`${base_url}/deeds/${deedId}`);

            // Update local state
            const updatedDeeds = deeds.filter(deed => deed._id !== deedId);
            setDeeds(updatedDeeds);

            // The applyFiltersAndPagination will be triggered by the deeds change
        } catch (err) {
            setError('Failed to delete deed. Please try again.');
            console.error('Error deleting deed:', err);
            setLoading(false);
        }
    };

    const handleDeleteSelected = async () => {
        if (!window.confirm(`Are you sure you want to delete ${selectedDeeds.length} selected deeds?`)) {
            return;
        }

        try {
            setLoading(true);
            await axios.delete(`${base_url}/deeds`, { data: { ids: selectedDeeds } });

            // Update local state
            const updatedDeeds = deeds.filter(deed => !selectedDeeds.includes(deed._id));
            setDeeds(updatedDeeds);
            setSelectedDeeds([]);

            // The applyFiltersAndPagination will be triggered by the deeds change
        } catch (err) {
            setError('Failed to delete selected deeds. Please try again.');
            console.error('Error deleting selected deeds:', err);
            setLoading(false);
        }
    };

    const handleExportSelected = async () => {
        try {
            const idsParam = selectedDeeds.join(',');
            // Using window.open for direct file download
            window.open(`${base_url}/export/csv?ids=${idsParam}`, '_blank');
        } catch (err) {
            setError('Failed to export deeds. Please try again.');
            console.error('Error exporting deeds:', err);
        }
    };

    return (
        <div>
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">All Deeds</h1>

                <div className="flex space-x-2">
                    <button
                        onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                        className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                        <ChevronDown className="w-4 h-4 ml-1" />
                    </button>

                    <button
                        onClick={refreshData}
                        className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </button>

                    <Link
                        to="/upload"
                        className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
                    >
                        <span>Add New</span>
                    </Link>
                </div>
            </div>

            {/* Filters panel */}
            {filterMenuOpen && (
                <div className="bg-white rounded-lg shadow mb-6 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Search deed, party..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deed Type</label>
                            <select
                                name="deedType"
                                value={filters.deedType}
                                onChange={handleFilterChange}
                                className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">All Types</option>
                                {deedTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                            <select
                                name="district"
                                value={filters.district}
                                onChange={handleFilterChange}
                                className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                disabled={district ? true : false} // Disable if district is provided from props
                            >
                                <option value="">All Districts</option>
                                {districts.map((district, index) => (
                                    <option key={index} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div> */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                            <select
                                name="year"
                                value={filters.year}
                                onChange={handleFilterChange}
                                className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">All Years</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Min Value (₹)</label>
                            <input
                                type="number"
                                name="minValue"
                                value={filters.minValue}
                                onChange={handleFilterChange}
                                className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Min value"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Value (₹)</label>
                            <input
                                type="number"
                                name="maxValue"
                                value={filters.maxValue}
                                onChange={handleFilterChange}
                                className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Max value"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                            <input
                                type="date"
                                name="fromDate"
                                value={filters.fromDate}
                                onChange={handleFilterChange}
                                className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                            <input
                                type="date"
                                name="toDate"
                                value={filters.toDate}
                                onChange={handleFilterChange}
                                className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 mr-2"
                        >
                            Clear Filters
                        </button>
                        <button
                            onClick={() => setFilterMenuOpen(false)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}

            {/* Selection actions */}
            {selectedDeeds.length > 0 && (
                <div className="bg-indigo-50 rounded-lg p-3 mb-4 flex items-center justify-between">
                    <span className="text-sm text-indigo-700">
                        {selectedDeeds.length} {selectedDeeds.length === 1 ? 'deed' : 'deeds'} selected
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleExportSelected}
                            className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                        >
                            <Download className="w-4 h-4 mr-1" />
                            Export
                        </button>
                        <button
                            className="flex items-center px-3 py-1 bg-red-50 border border-red-300 text-red-700 rounded-md hover:bg-red-100 transition-colors text-sm"
                            onClick={handleDeleteSelected}
                        >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                        </button>
                    </div>
                </div>
            )}

            {/* Loading state */}
            {loading && (
                <div className="flex justify-center my-8">
                    <div className="w-8 h-8 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
                </div>
            )}

            {/* Error state */}
            {error && !loading && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                    <p>{error}</p>
                </div>
            )}

            {/* Deeds table */}
            {!loading && !error && (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-3 py-3 text-left">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                onChange={handleSelectAll}
                                                checked={selectedDeeds?.length === currentDeeds?.length && currentDeeds?.length > 0}
                                            />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('documentNumber')}
                                    >
                                        <div className="flex items-center">
                                            Doc #
                                            {getSortIcon('documentNumber')}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('deedType')}
                                    >
                                        <div className="flex items-center">
                                            Type
                                            {getSortIcon('deedType')}
                                        </div>
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Parties
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('transactionValue')}
                                    >
                                        <div className="flex items-center">
                                            Value
                                            {getSortIcon('transactionValue')}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('registrationDateParsed')}
                                    >
                                        <div className="flex items-center">
                                            Date
                                            {getSortIcon('registrationDateParsed')}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('district')}
                                    >
                                        <div className="flex items-center">
                                            District
                                            {getSortIcon('district')}
                                        </div>
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentDeeds?.map((deed) => (
                                    <tr
                                        key={deed._id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                    checked={selectedDeeds.includes(deed._id)}
                                                    onChange={(e) => handleSelectDeed(e, deed._id)}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{deed.documentNumber}</div>
                                            <div className="text-xs text-gray-500">{deed.year}</div>
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{deed.deedType}</div>
                                        </td>
                                        <td className="px-3 py-4">
                                            <div className="text-sm text-gray-900">
                                                {deed.firstParty && deed.firstParty[0] ? deed.firstParty[0].name : 'N/A'}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {deed.secondParty && deed.secondParty[0] ? deed.secondParty[0].name : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatCurrency(deed.transactionValue)}</div>
                                            {deed.marketValue !== deed.transactionValue && (
                                                <div className="text-xs text-gray-500">
                                                    Mkt: {formatCurrency(deed.marketValue)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatDate(deed.registrationDateParsed)}</div>
                                            {deed.executionDateParsed && (
                                                <div className="text-xs text-gray-500">
                                                    Exe: {formatDate(deed.executionDateParsed)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {deed.district}
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <div
                                                    onClick={() => navigate(`/deeds/${deed?._id}`)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </div>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => handleDeleteDeed(deed._id)}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page <= 1}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(Math.min(totalPages, page + 1))}
                                disabled={page >= totalPages}
                                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page >= totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing{' '}
                                    <span className="font-medium">
                                        {currentDeeds?.length > 0 ? (page - 1) * limit + 1 : 0}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium">
                                        {Math.min(page * limit, totalDeeds)}
                                    </span>{' '}
                                    of <span className="font-medium">{totalDeeds}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => setPage(Math.max(1, page - 1))}
                                        disabled={page <= 1}
                                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${page <= 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>

                                    {/* Page numbers */}
                                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (page <= 3) {
                                            pageNum = i + 1;
                                        } else if (page >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = page - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => setPage(pageNum)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === pageNum
                                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                                        disabled={page >= totalPages}
                                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${page >= totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* No results */}
            {!loading && !error && (!currentDeeds || currentDeeds.length === 0) && (
                <div className="bg-white shadow rounded-lg p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <FileText className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No deeds found</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                        {Object.values(filters).some(val => val !== '' && val !== district)
                            ? "No deeds match your current filters. Try adjusting or clearing your filters."
                            : "There are no deeds in the system yet. Upload some deed documents to get started."}
                    </p>
                    {Object.values(filters).some(val => val !== '' && val !== district) ? (
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Clear Filters
                        </button>
                    ) : (
                        <Link
                            to="/upload"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                        >
                            Upload Deeds
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default AllDeeds;