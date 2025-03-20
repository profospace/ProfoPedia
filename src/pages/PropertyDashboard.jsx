import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, AlertCircle, ChevronLeft, ChevronRight, Info, Download, Copy } from 'lucide-react';
import { base_url } from '../utils/base_url';

// Custom Button Component
const Button = ({ children, variant = 'primary', disabled = false, onClick, type = 'button', className = '' }) => {
    const baseStyle = "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
        outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
        icon: "p-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 rounded-full"
    };

    const disabledStyle = "opacity-50 cursor-not-allowed";

    return (
        <button
            type={type}
            className={`${baseStyle} ${variantStyles[variant]} ${disabled ? disabledStyle : ''} ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

// Custom Input Component
const Input = ({ id, label, value, onChange, placeholder, type = 'text' }) => {
    return (
        <div className="mb-4">
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
};

// Custom Select Component
const Select = ({ id, label, value, onChange, options }) => {
    return (
        <div className="mb-4">
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Select</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

// Card Component
const Card = ({ title, icon, children, className = '' }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
            {title && (
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold flex items-center text-gray-800">
                        {icon && <span className="mr-2">{icon}</span>}
                        {title}
                    </h3>
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

// Table Component with horizontal scrolling and text wrapping
const Table = ({ columns, data, onRowClick }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data && data.length > 0 ? data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => onRowClick && onRowClick(row)}
                        >
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="px-2 py-4 text-sm text-gray-500 break-words">
                                    {column.render ? column.render(row) : row[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

// Alert Component
const Alert = ({ type, title, message }) => {
    const types = {
        error: "bg-red-50 border-red-400 text-red-700",
        warning: "bg-yellow-50 border-yellow-400 text-yellow-700",
        success: "bg-green-50 border-green-400 text-green-700",
        info: "bg-blue-50 border-blue-400 text-blue-700"
    };

    return (
        <div className={`p-4 border-l-4 ${types[type]} rounded-md mb-4`}>
            <div className="flex items-center">
                {type === 'error' && <AlertCircle className="h-5 w-5 mr-2" />}
                <h3 className="text-sm font-medium">{title}</h3>
            </div>
            {message && <p className="mt-1 text-sm">{message}</p>}
        </div>
    );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-between mt-4">
            <Button
                variant="outline"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex items-center space-x-1"
            >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
            </Button>

            <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages || 1}
            </span>

            <Button
                variant="outline"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= (totalPages || 1)}
                className="flex items-center space-x-1"
            >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};

// Field Display Component for detail view
const FieldDisplay = ({ label, value, copyable = false }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="mb-2">
            <div className="flex items-center">
                <span className="font-medium text-gray-700 mr-2">{label}:</span>
                <span className="text-gray-900">{value || 'N/A'}</span>
                {copyable && value && (
                    <button
                        onClick={copyToClipboard}
                        className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        title="Copy to clipboard"
                    >
                        {copied ? 'Copied!' : <Copy size={14} />}
                    </button>
                )}
            </div>
        </div>
    );
};

// Main Dashboard Component
const PropertyDashboard = () => {
    // State for filter values
    const [districtCode, setDistrictCode] = useState('');
    const [sroCode, setSroCode] = useState('');
    const [gaonCode1, setGaonCode1] = useState('');
    const [propertyId, setPropertyId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State for search results and pagination
    const [records, setRecords] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    // State for district and SRO options
    const [districts, setDistricts] = useState([
        { value: '164', label: 'Kanpur Nagar' },
        { value: '229', label: 'Lucknow' },
        { value: '146', label: 'Agra' },
        { value: '266', label: 'Sambhal' }
    ]);

    const [sroOptions, setSroOptions] = useState([
        { value: '210', label: 'Kanpur SRO' },
        { value: '229', label: 'Lucknow SRO' },
        { value: '003', label: 'Agra SRO' },
        { value: '266', label: 'Sambhal SRO' },
        { value: '104', label: 'Chakiya SRO' },
        { value: '259', label: 'Daurala SRO' }
    ]);

    // Define table columns for property records - comprehensive version with wrapped text
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
            header: 'Second Party Address',
            accessor: 'partyAddresses',
            render: (row) => (
                <div className="max-w-2xl">
                    {row.partyAddresses && row.partyAddresses.length > 1 ? row.partyAddresses[1] : '-'}
                </div>
            )
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
        // {
        //     header: 'District Code',
        //     accessor: 'details.dcode'
        // },
        // {
        //     header: 'SRO Code',
        //     accessor: 'details.srocode'
        // },
        // {
        //     header: 'Actions',
        //     accessor: '_id',
        //     render: (row) => (
        //         <div className="flex space-x-2">
        //             <Button
        //                 variant="outline"
        //                 onClick={(e) => {
        //                     e.stopPropagation();
        //                     viewPropertyDetails(row);
        //                 }}
        //                 className="text-sm px-3 py-1"
        //             >
        //                 View
        //             </Button>
        //         </div>
        //     )
        // }
    ];

    // Function to view details of a specific property
    const viewPropertyDetails = (property) => {
        setCurrentRecord(property);
    };

    // Function to get paginated records
    const getPaginatedRecords = () => {
        const startIndex = (page - 1) * limit;
        const endIndex = Math.min(startIndex + limit, records.length);
        return records.slice(startIndex, endIndex);
    };

    // Search function - Submit new search criteria to API
    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);
            setPage(1); // Reset to first page on new search

            // Check required fields
            if (!districtCode || !sroCode || !gaonCode1) {
                setError('District Code, SRO Code, and Village Code are required');
                setLoading(false);
                return;
            }

            // Prepare request body
            const requestBody = {
                districtCode,
                sroCode,
                propertyId: propertyId || '',
                propNEWAddress: '1',
                gaonCode1
            };

            // Send search request to API
            const response = await fetch(`${base_url}/api/property-data`, {
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

            // Update state with API response - handle different possible response structures
            let propertyRecords = [];

            if (data && data.data && Array.isArray(data.data)) {
                // Direct array of property records
                propertyRecords = data.data;
            } else if (data && data.data && data.data.propertyRecords && Array.isArray(data.data.propertyRecords)) {
                // Nested property records array
                propertyRecords = data.data.propertyRecords;
            } else if (data && Array.isArray(data)) {
                // Data is directly the array
                propertyRecords = data;
            }

            setRecords(propertyRecords);
            setTotalRecords(propertyRecords.length);
            setTotalPages(Math.ceil(propertyRecords.length / limit));

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
        } finally {
            setLoading(false);
        }
    };

    // Clear filters
    const handleClear = () => {
        setDistrictCode('');
        setSroCode('');
        setGaonCode1('');
        setPropertyId('');
        setCurrentRecord(null);
        setPage(1);
        setRecords([]);
        setTotalRecords(0);
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
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
                title="Search Filters"
                icon={<Filter size={18} />}
                className="mb-8"
            >
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select
                            id="districtCode"
                            label="District"
                            value={districtCode}
                            onChange={setDistrictCode}
                            options={districts}
                        />

                        <Select
                            id="sroCode"
                            label="SRO Office"
                            value={sroCode}
                            onChange={setSroCode}
                            options={sroOptions}
                        />

                        <Input
                            id="gaonCode1"
                            label="Gaon/Village Code"
                            value={gaonCode1}
                            onChange={(e) => setGaonCode1(e.target.value)}
                            placeholder="Enter Gaon/Village Code"
                        />

                        <Input
                            id="propertyId"
                            label="Property ID (Optional)"
                            value={propertyId}
                            onChange={(e) => setPropertyId(e.target.value)}
                            placeholder="Enter Property ID if known"
                        />
                    </div>

                    <div className="flex space-x-2">
                        <Button
                            type="submit"
                            disabled={loading}
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
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <Table
                        columns={propertyRecordsColumns}
                        data={getPaginatedRecords()}
                        onRowClick={(record) => viewPropertyDetails(record)}
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
                                <FieldDisplay label="District Code" value={currentRecord.details.dcode} />
                                <FieldDisplay label="SRO Code" value={currentRecord.details.srocode} />
                                <FieldDisplay label="PCode" value={currentRecord.details.pcode} />
                                <FieldDisplay label="Sub Deed Code" value={currentRecord.details.subDeedCode} />
                                <FieldDisplay label="Receipt No" value={currentRecord.details.recieptNo} copyable />
                                <FieldDisplay label="Property Number" value={currentRecord.details.propertyNum} copyable />
                                <FieldDisplay label="MongoDB ID" value={currentRecord._id} copyable />
                            </div>
                        </div>

                        {/* Technical Details */}
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