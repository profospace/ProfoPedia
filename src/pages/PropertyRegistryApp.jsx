import React, { useState, useEffect } from 'react';
import { Search, Download, Filter, X } from 'lucide-react';
import { extractPropertyData, getUniqueValues, filterProperties, exportToJson, exportToCsv } from './PropertyDataService';

const PropertyRegistryApp = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterDeedType, setFilterDeedType] = useState('');
    const [filterRegNo, setFilterRegNo] = useState('');
    const [filterKhataNo, setFilterKhataNo] = useState('');

    // Filter options
    const [years, setYears] = useState([]);
    const [deedTypes, setDeedTypes] = useState([]);

    // Advanced filter visibility
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    // Load and parse data
    useEffect(() => {
        const parseHtml = async () => {
            try {
                setLoading(true);
                const htmlContent = await window.fs.readFile('paste.txt', { encoding: 'utf8' });
                const extractedProperties = extractPropertyData(htmlContent);
                setProperties(extractedProperties);
                setFilteredProperties(extractedProperties);

                // Extract unique values for filters
                setYears(getUniqueValues(extractedProperties, 'year'));
                setDeedTypes(getUniqueValues(extractedProperties, 'deedType'));

                setLoading(false);
            } catch (err) {
                setError('Failed to parse property data: ' + err.message);
                setLoading(false);
            }
        };

        parseHtml();
    }, []);

    // Apply filters
    useEffect(() => {
        const applyFilters = () => {
            const filtered = filterProperties(properties, {
                searchTerm,
                year: filterYear,
                deedType: filterDeedType,
                regNo: filterRegNo,
                khataNo: filterKhataNo
            });

            setFilteredProperties(filtered);
        };

        applyFilters();
    }, [properties, searchTerm, filterYear, filterDeedType, filterRegNo, filterKhataNo]);

    // Reset all filters
    const resetFilters = () => {
        setSearchTerm('');
        setFilterYear('');
        setFilterDeedType('');
        setFilterRegNo('');
        setFilterKhataNo('');
        setShowAdvancedFilters(false);
    };

    // Export functions
    const handleExportJson = () => {
        const jsonStr = exportToJson(filteredProperties);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'property_registrations.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleExportCsv = () => {
        const csvStr = exportToCsv(filteredProperties);
        const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'property_registrations.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // View property details
    const viewPropertyDetails = (property) => {
        alert(`
      पंजीकरण विवरण:
      
      पंजीकरण संख्या: ${property.regNo}
      वर्ष: ${property.year}
      लेखपत्र का प्रकार: ${property.deedType}
      पंजीकरण तिथि: ${property.regDate}
      रसीद संख्या: ${property.details.recieptNo}
      
      पक्षकार: ${property.partyNames.join(', ')}
      
      सम्पत्ति विवरण: ${property.propertyDesc}
    `);
    };

    return (
        <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">सम्पत्ति पंजीकरण अनुक्रमणिका पंजिका</h1>

            {/* Loading state */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-100 p-4 rounded-lg text-red-700">
                    {error}
                </div>
            ) : (
                <>
                    {/* Search and Basic Filters */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search input */}
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="search"
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="खोजें (नाम, पता, संपत्ति विवरण)"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-2">
                                {/* Advanced filter toggle */}
                                <button
                                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                                >
                                    <Filter className="w-4 h-4" />
                                    {showAdvancedFilters ? 'सरल फ़िल्टर' : 'उन्नत फ़िल्टर'}
                                </button>

                                {/* Reset filters */}
                                {(searchTerm || filterYear || filterDeedType || filterRegNo || filterKhataNo) && (
                                    <button
                                        onClick={resetFilters}
                                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                                    >
                                        <X className="w-4 h-4" />
                                        रीसेट
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Basic Filters */}
                        {!showAdvancedFilters && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {/* Year filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">पंजीकरण वर्ष</label>
                                    <select
                                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={filterYear}
                                        onChange={(e) => setFilterYear(e.target.value)}
                                    >
                                        <option value="">सभी वर्ष</option>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Deed type filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">लेखपत्र का प्रकार</label>
                                    <select
                                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={filterDeedType}
                                        onChange={(e) => setFilterDeedType(e.target.value)}
                                    >
                                        <option value="">सभी प्रकार</option>
                                        {deedTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Advanced Filters */}
                        {showAdvancedFilters && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                                {/* Year filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">पंजीकरण वर्ष</label>
                                    <select
                                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={filterYear}
                                        onChange={(e) => setFilterYear(e.target.value)}
                                    >
                                        <option value="">सभी वर्ष</option>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Deed type filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">लेखपत्र का प्रकार</label>
                                    <select
                                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={filterDeedType}
                                        onChange={(e) => setFilterDeedType(e.target.value)}
                                    >
                                        <option value="">सभी प्रकार</option>
                                        {deedTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Registration number filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">पंजीकरण संख्या</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="पंजीकरण संख्या दर्ज करें"
                                        value={filterRegNo}
                                        onChange={(e) => setFilterRegNo(e.target.value)}
                                    />
                                </div>

                                {/* Khata number filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">खसरा/मकान/गाटा संख्या</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="खसरा संख्या दर्ज करें"
                                        value={filterKhataNo}
                                        onChange={(e) => setFilterKhataNo(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Export buttons */}
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={handleExportJson}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                JSON निर्यात
                            </button>
                            <button
                                onClick={handleExportCsv}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                CSV निर्यात
                            </button>
                        </div>
                    </div>

                    {/* Results counter */}
                    <div className="mb-4 font-medium">
                        <span className="text-blue-700 font-bold text-lg">{filteredProperties.length}</span> रिकॉर्ड मिले (कुल {properties.length} में से)
                    </div>

                    {/* Property Table */}
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-800">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">क्र.सं.</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">पंजी. वर्ष</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">पंजी. सं.</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">पक्षकार का नाम</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">पक्षकार का पता</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">सम्पत्ति का विवरण</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">खसरा संख्या</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">पंजीकरण तिथि</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">लेखपत्र का विवरण</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">विवरण</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProperties.length > 0 ? (
                                    filteredProperties.map((property, index) => (
                                        <tr key={`${property.year}-${property.regNo}`} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{property.serialNo}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{property.year}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{property.regNo}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                <ul className="space-y-1">
                                                    {property.partyNames.map((name, idx) => (
                                                        <li key={idx} className="leading-tight">{name}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                <ul className="space-y-1">
                                                    {property.partyAddresses.map((address, idx) => (
                                                        <li key={idx} className="leading-tight">{address}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{property.propertyDesc}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{property.khataNo}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{property.regDate}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{property.deedType}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                <button
                                                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                                    onClick={() => viewPropertyDetails(property)}
                                                >
                                                    चयन करे
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="px-4 py-6 text-center text-gray-500">
                                            कोई मिलान वाला रिकॉर्ड नहीं मिला
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination component can be added here if needed */}

                    {/* Footer with information */}
                    <div className="mt-8 text-center text-gray-600 bg-white p-4 rounded-lg shadow-md">
                        <p>
                            <span className="font-semibold">नोट:</span> ऑनलाइन प्रदान की गई जानकारी अपडेट की गई है, और कोई भौतिक यात्रा की आवश्यकता नहीं है।
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default PropertyRegistryApp;