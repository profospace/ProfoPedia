import React, { useState, useEffect } from 'react';
import { Search, Globe, ArrowLeft, Download, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Language translations
const translations = {
    english: {
        title: "Saved Property Records",
        subtitle: "View and filter all saved property records",
        searchPlaceholder: "Search by property ID, owner name, address...",
        backToDashboard: "Back to Dashboard",
        exportCSV: "Export CSV",
        filter: "Filter",
        clearFilters: "Clear Filters",
        noRecords: "No property records found.",
        propertyId: "Property ID",
        ownerName: "Owner Name",
        address: "Address",
        village: "Village/Mohalla",
        tehsil: "Tehsil/SRO",
        area: "Area (sq. m)",
        documentNo: "Document No.",
        registrationDate: "Registration Date",
        filters: {
            title: "Filters",
            tehsil: "Tehsil/SRO",
            village: "Village/Mohalla",
            dateRange: "Date Range",
            startDate: "Start Date",
            endDate: "End Date",
            apply: "Apply Filters"
        }
    },
    hindi: {
        title: "सहेजे गए सम्पत्ति अभिलेख",
        subtitle: "सभी सहेजे गए सम्पत्ति अभिलेखों को देखें और फ़िल्टर करें",
        searchPlaceholder: "सम्पत्ति आईडी, मालिक का नाम, पता खोजें...",
        backToDashboard: "डैशबोर्ड पर वापस जाएं",
        exportCSV: "CSV निर्यात करें",
        filter: "फ़िल्टर",
        clearFilters: "फ़िल्टर हटाएं",
        noRecords: "कोई सम्पत्ति रिकॉर्ड नहीं मिला।",
        propertyId: "सम्पत्ति आईडी",
        ownerName: "मालिक का नाम",
        address: "पता",
        village: "गांव/मोहल्ला",
        tehsil: "तहसील/एसआरओ",
        area: "क्षेत्रफल (वर्ग मी.)",
        documentNo: "दस्तावेज़ संख्या",
        registrationDate: "पंजीकरण तिथि",
        filters: {
            title: "फ़िल्टर",
            tehsil: "तहसील/एसआरओ",
            village: "गांव/मोहल्ला",
            dateRange: "तिथि सीमा",
            startDate: "प्रारंभ तिथि",
            endDate: "अंतिम तिथि",
            apply: "फ़िल्टर लागू करें"
        }
    }
};

const SavedRecords = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('english');
    const [propertyRecords, setPropertyRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [tehsilFilter, setTehsilFilter] = useState('');
    const [villageFilter, setVillageFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');

    // Available tehsils and villages for filtering
    const [availableTehsils, setAvailableTehsils] = useState([]);
    const [availableVillages, setAvailableVillages] = useState([]);

    // Get current language text
    const text = translations[language];

    // Toggle language function
    const toggleLanguage = () => {
        setLanguage(language === 'english' ? 'hindi' : 'english');
    };

    // Fetch property records from API
    useEffect(() => {
        const fetchRecords = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/property-records');

                if (!response.ok) {
                    throw new Error('Failed to fetch property records');
                }

                const data = await response.json();
                setPropertyRecords(data);
                setFilteredRecords(data);

                // Extract unique tehsils and villages for filters
                const tehsils = [...new Set(data.map(record => record.tehsil))];
                const villages = [...new Set(data.map(record => record.village))];

                setAvailableTehsils(tehsils);
                setAvailableVillages(villages);
            } catch (error) {
                console.error('Error fetching property records:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    // Filter records based on search and filters
    useEffect(() => {
        let results = [...propertyRecords];

        // Apply search
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            results = results.filter(record =>
                record.propertyId.toLowerCase().includes(searchLower) ||
                record.ownerName.toLowerCase().includes(searchLower) ||
                record.address.toLowerCase().includes(searchLower) ||
                record.village.toLowerCase().includes(searchLower) ||
                record.tehsil.toLowerCase().includes(searchLower) ||
                record.documentNo.toLowerCase().includes(searchLower)
            );
        }

        // Apply tehsil filter
        if (tehsilFilter) {
            results = results.filter(record => record.tehsil === tehsilFilter);
        }

        // Apply village filter
        if (villageFilter) {
            results = results.filter(record => record.village === villageFilter);
        }

        // Apply date range filters
        if (startDateFilter) {
            const startDate = new Date(startDateFilter);
            results = results.filter(record => new Date(record.registrationDate) >= startDate);
        }

        if (endDateFilter) {
            const endDate = new Date(endDateFilter);
            results = results.filter(record => new Date(record.registrationDate) <= endDate);
        }

        setFilteredRecords(results);
    }, [searchTerm, propertyRecords, tehsilFilter, villageFilter, startDateFilter, endDateFilter]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Apply filters
    const applyFilters = () => {
        setShowFilters(false);
    };

    // Clear all filters
    const clearFilters = () => {
        setTehsilFilter('');
        setVillageFilter('');
        setStartDateFilter('');
        setEndDateFilter('');
        setShowFilters(false);
    };

    // Export records as CSV
    const exportCSV = () => {
        if (filteredRecords.length === 0) return;

        // Create CSV header
        const headers = Object.keys(filteredRecords[0]);
        const csvHeader = headers.join(',') + '\n';

        // Create CSV rows
        const csvRows = filteredRecords.map(record => {
            return headers.map(header => {
                let value = record[header] || '';
                // Handle values with commas
                if (value.toString().includes(',')) {
                    value = `"${value}"`;
                }
                return value;
            }).join(',');
        }).join('\n');

        // Combine header and rows
        const csvContent = csvHeader + csvRows;

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        // Set download attributes
        link.setAttribute('href', url);
        link.setAttribute('download', 'property_records.csv');
        link.style.visibility = 'hidden';

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Navigate back to dashboard
    const navigateToDashboard = () => {
        navigate('/');
    };

    // Dummy data for demonstration
    const dummyRecords = [
        {
            id: 1,
            propertyId: "21190023400001",
            ownerName: "Rajiv Kumar Sharma",
            address: "117 Ambedkar Nagar, Kanpur",
            village: "अम्‍बेडकर नगर 117 चक",
            tehsil: "Sadar Fourth",
            area: "230.5",
            documentNo: "KNP/SD4/2023/1152",
            registrationDate: "2023-07-15"
        },
        {
            id: 2,
            propertyId: "21190026200002",
            ownerName: "Aarti Singh",
            address: "84 Anwar Ganj, Kanpur",
            village: "अनवर गंज 84 चक",
            tehsil: "Sadar Fourth",
            area: "185.2",
            documentNo: "KNP/SD4/2023/2314",
            registrationDate: "2023-08-22"
        },
        {
            id: 3,
            propertyId: "21090093400005",
            ownerName: "Vikram Joshi",
            address: "Ashok Nagar, Chak-111, Kanpur",
            village: "अशोक नगर चक–111 व 111ए",
            tehsil: "Sadar Second",
            area: "310.8",
            documentNo: "KNP/SD2/2023/3452",
            registrationDate: "2023-06-10"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{text.title}</h1>
                    <p className="text-gray-600">{text.subtitle}</p>
                </div>

                {/* Language toggle button */}
                <button
                    onClick={toggleLanguage}
                    className="px-3 py-2 bg-white rounded-full shadow-md flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                >
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">{language === 'english' ? 'हिंदी' : 'English'}</span>
                </button>
            </header>

            {/* Action buttons */}
            <div className="mb-6 flex flex-wrap gap-3">
                <button
                    onClick={navigateToDashboard}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-md flex items-center space-x-2 hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>{text.backToDashboard}</span>
                </button>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-200 transition-colors"
                >
                    <Filter className="h-5 w-5" />
                    <span>{text.filter}</span>
                </button>

                <button
                    onClick={exportCSV}
                    disabled={filteredRecords.length === 0}
                    className={`px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-colors ${filteredRecords.length === 0
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                >
                    <Download className="h-5 w-5" />
                    <span>{text.exportCSV}</span>
                </button>

                {(tehsilFilter || villageFilter || startDateFilter || endDateFilter) && (
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg shadow-md hover:bg-red-200 transition-colors"
                    >
                        {text.clearFilters}
                    </button>
                )}
            </div>

            {/* Filter panel */}
            {showFilters && (
                <div className="mb-6 p-4 bg-white rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4">{text.filters.title}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Tehsil filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {text.filters.tehsil}
                            </label>
                            <select
                                value={tehsilFilter}
                                onChange={(e) => setTehsilFilter(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All</option>
                                {availableTehsils.map((tehsil, index) => (
                                    <option key={index} value={tehsil}>{tehsil}</option>
                                ))}
                            </select>
                        </div>

                        {/* Village filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {text.filters.village}
                            </label>
                            <select
                                value={villageFilter}
                                onChange={(e) => setVillageFilter(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All</option>
                                {availableVillages.map((village, index) => (
                                    <option key={index} value={village}>{village}</option>
                                ))}
                            </select>
                        </div>

                        {/* Start date filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {text.filters.startDate}
                            </label>
                            <input
                                type="date"
                                value={startDateFilter}
                                onChange={(e) => setStartDateFilter(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* End date filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {text.filters.endDate}
                            </label>
                            <input
                                type="date"
                                value={endDateFilter}
                                onChange={(e) => setEndDateFilter(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={applyFilters}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                        >
                            {text.filters.apply}
                        </button>
                    </div>
                </div>
            )}

            {/* Search box */}
            <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder={text.searchPlaceholder}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Records table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {text.propertyId}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {text.ownerName}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {text.address}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {text.village}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {text.tehsil}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {text.area}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {text.documentNo}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {text.registrationDate}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                                        <div className="flex justify-center items-center space-x-2">
                                            <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                            <span>Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredRecords.length > 0 ? (
                                // Using dummy data for demonstration
                                dummyRecords.map((record) => (
                                    <tr key={record.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                            {record.propertyId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.ownerName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {record.address}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.village}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.tehsil}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.area}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.documentNo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.registrationDate}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-10 text-center text-sm text-gray-500">
                                        {text.noRecords}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SavedRecords;