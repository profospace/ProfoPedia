import React, { useState, useEffect } from 'react';
import { Search, ArrowUpDown, FileText, MapPin, Calendar, ChevronDown, ChevronRight, Users, Home, CreditCard, AlertCircle } from 'lucide-react';

const DeedDashboard = () => {
    const [deeds, setDeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTab, setSelectedTab] = useState('overview');
    const [selectedDeed, setSelectedDeed] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'registrationDate', direction: 'desc' });

    // Sample data for demonstration
    useEffect(() => {
        // In a real app, this would fetch from your MongoDB API
        setTimeout(() => {
            setDeeds([
                {
                    id: 1,
                    deedType: 'विक्रय पत्र',
                    documentNumber: '3131',
                    year: '2024',
                    district: 'कानपुर नगर',
                    subRegistrar: 'सदर तृतीय',
                    marketValue: 1270000,
                    transactionValue: 1700000,
                    stampDuty: 119000,
                    area: 36.75,
                    unitType: 'वर्ग मीटर',
                    registrationDate: '2024-03-22',
                    executionDate: '2024-03-22',
                    firstParty: [{ name: 'मोतीलाल वर्मा', parentName: 'फदाली वर्मा' }],
                    secondParty: [{ name: 'अरुणेन्द्र सिंह', parentName: 'लवकुश सिंह' }]
                },
                {
                    id: 2,
                    deedType: 'विक्रय पत्र',
                    documentNumber: '2854',
                    year: '2024',
                    district: 'कानपुर नगर',
                    subRegistrar: 'सदर प्रथम',
                    marketValue: 3500000,
                    transactionValue: 3700000,
                    stampDuty: 259000,
                    area: 45.5,
                    unitType: 'वर्ग मीटर',
                    registrationDate: '2024-03-18',
                    executionDate: '2024-03-16',
                    firstParty: [{ name: 'रमेश कुमार', parentName: 'हरिप्रसाद' }],
                    secondParty: [{ name: 'सुनील गुप्ता', parentName: 'राम कुमार गुप्ता' }]
                },
                {
                    id: 3,
                    deedType: 'बंधक पत्र',
                    documentNumber: '1845',
                    year: '2024',
                    district: 'कानपुर नगर',
                    subRegistrar: 'सदर द्वितीय',
                    marketValue: 5200000,
                    transactionValue: 4800000,
                    stampDuty: 336000,
                    area: 75.2,
                    unitType: 'वर्ग मीटर',
                    registrationDate: '2024-03-10',
                    executionDate: '2024-03-09',
                    firstParty: [{ name: 'सविता देवी', parentName: 'महेश प्रसाद' }],
                    secondParty: [{ name: 'स्टेट बैंक ऑफ इंडिया', parentName: 'N/A' }]
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    // Calculate summary statistics
    const totalTransactionValue = deeds.reduce((sum, deed) => sum + deed.transactionValue, 0);
    const totalMarketValue = deeds.reduce((sum, deed) => sum + deed.marketValue, 0);
    const totalStampDuty = deeds.reduce((sum, deed) => sum + deed.stampDuty, 0);
    const averageTransactionValue = deeds.length ? totalTransactionValue / deeds.length : 0;

    // Sort function
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Get sorted deeds
    const getSortedDeeds = () => {
        const sortableDeeds = [...deeds];
        if (sortConfig.key) {
            sortableDeeds.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableDeeds;
    };

    // Filter function
    const getFilteredDeeds = () => {
        if (!searchTerm) return getSortedDeeds();

        return getSortedDeeds().filter(deed =>
            deed.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deed.deedType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deed.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deed.firstParty.some(party => party.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            deed.secondParty.some(party => party.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    };

    // Format currency values
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">भूलेख डैशबोर्ड (Deed Dashboard)</h1>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search deeds..."
                                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4">
                <div className="max-w-7xl mx-auto">
                    {/* Tabs */}
                    <div className="flex space-x-1 bg-white p-1 rounded-lg shadow mb-6">
                        <button
                            className={`px-4 py-2 rounded-md ${selectedTab === 'overview' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            onClick={() => setSelectedTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${selectedTab === 'deeds' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            onClick={() => setSelectedTab('deeds')}
                        >
                            All Deeds
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${selectedTab === 'analytics' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            onClick={() => setSelectedTab('analytics')}
                        >
                            Analytics
                        </button>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}

                    {/* Tab Content */}
                    {!loading && selectedTab === 'overview' && (
                        <div>
                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                                            <FileText size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Total Deeds</p>
                                            <p className="text-2xl font-semibold text-gray-900">{deeds.length}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-green-100 text-green-500">
                                            <CreditCard size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Total Transaction Value</p>
                                            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalTransactionValue)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                                            <Home size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Total Market Value</p>
                                            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalMarketValue)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
                                            <AlertCircle size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Total Stamp Duty</p>
                                            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalStampDuty)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Deeds */}
                            <div className="bg-white rounded-lg shadow">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-medium text-gray-900">Recent Deeds</h2>
                                </div>
                                <ul className="divide-y divide-gray-200">
                                    {getFilteredDeeds().slice(0, 5).map((deed) => (
                                        <li key={deed.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedDeed(deed)}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {deed.deedType} - {deed.documentNumber}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {deed.firstParty[0]?.name} → {deed.secondParty[0]?.name}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {formatCurrency(deed.transactionValue)}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatDate(deed.registrationDate)}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="px-6 py-4 border-t border-gray-200">
                                    <button
                                        className="text-sm text-blue-500 hover:text-blue-700"
                                        onClick={() => setSelectedTab('deeds')}
                                    >
                                        View all deeds
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading && selectedTab === 'deeds' && (
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">All Deeds</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => requestSort('documentNumber')}
                                            >
                                                <div className="flex items-center">
                                                    Doc # <ArrowUpDown className="ml-1 h-4 w-4" />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Parties
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => requestSort('transactionValue')}
                                            >
                                                <div className="flex items-center">
                                                    Value <ArrowUpDown className="ml-1 h-4 w-4" />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => requestSort('registrationDate')}
                                            >
                                                <div className="flex items-center">
                                                    Date <ArrowUpDown className="ml-1 h-4 w-4" />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                District
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {getFilteredDeeds().map((deed) => (
                                            <tr
                                                key={deed.id}
                                                className="hover:bg-gray-50 cursor-pointer"
                                                onClick={() => setSelectedDeed(deed)}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{deed.documentNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deed.deedType}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {deed.firstParty[0]?.name} → {deed.secondParty[0]?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(deed.transactionValue)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(deed.registrationDate)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deed.district}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {!loading && selectedTab === 'analytics' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Transaction Values</h2>
                                <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                                    <p className="text-gray-500">Transaction Value Chart Will Appear Here</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Registration Trends</h2>
                                <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                                    <p className="text-gray-500">Registration Trend Chart Will Appear Here</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">District-wise Distribution</h2>
                                <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                                    <p className="text-gray-500">District Distribution Chart Will Appear Here</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Deed Detail Modal */}
            {selectedDeed && (
                <div className="fixed inset-0 overflow-y-auto z-50">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setSelectedDeed(null)}></div>
                        </div>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full">
                                        <div className="border-b pb-4 mb-4">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedDeed.deedType} - {selectedDeed.documentNumber}</h3>
                                                <span className="text-gray-500 text-sm">{formatDate(selectedDeed.registrationDate)}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-2">Property Details</h4>
                                                <dl className="space-y-2">
                                                    <div className="flex">
                                                        <dt className="w-1/2 text-sm text-gray-500">Area:</dt>
                                                        <dd className="w-1/2 text-sm text-gray-900">{selectedDeed.area} {selectedDeed.unitType}</dd>
                                                    </div>
                                                    <div className="flex">
                                                        <dt className="w-1/2 text-sm text-gray-500">District:</dt>
                                                        <dd className="w-1/2 text-sm text-gray-900">{selectedDeed.district}</dd>
                                                    </div>
                                                    <div className="flex">
                                                        <dt className="w-1/2 text-sm text-gray-500">Sub-Registrar:</dt>
                                                        <dd className="w-1/2 text-sm text-gray-900">{selectedDeed.subRegistrar}</dd>
                                                    </div>
                                                </dl>
                                            </div>

                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-2">Financial Details</h4>
                                                <dl className="space-y-2">
                                                    <div className="flex">
                                                        <dt className="w-1/2 text-sm text-gray-500">Transaction Value:</dt>
                                                        <dd className="w-1/2 text-sm text-gray-900">{formatCurrency(selectedDeed.transactionValue)}</dd>
                                                    </div>
                                                    <div className="flex">
                                                        <dt className="w-1/2 text-sm text-gray-500">Market Value:</dt>
                                                        <dd className="w-1/2 text-sm text-gray-900">{formatCurrency(selectedDeed.marketValue)}</dd>
                                                    </div>
                                                    <div className="flex">
                                                        <dt className="w-1/2 text-sm text-gray-500">Stamp Duty:</dt>
                                                        <dd className="w-1/2 text-sm text-gray-900">{formatCurrency(selectedDeed.stampDuty)}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h4 className="font-medium text-gray-900 mb-2">Parties</h4>
                                            <div className="border rounded-lg overflow-hidden">
                                                <div className="bg-gray-50 px-4 py-2 border-b">
                                                    <h5 className="text-sm font-medium text-gray-900">First Party</h5>
                                                </div>
                                                <div className="px-4 py-2">
                                                    {selectedDeed.firstParty.map((party, index) => (
                                                        <div key={index} className="mb-2 last:mb-0">
                                                            <p className="text-sm font-medium">{party.name}</p>
                                                            <p className="text-xs text-gray-500">{party.parentName}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="border rounded-lg overflow-hidden mt-4">
                                                <div className="bg-gray-50 px-4 py-2 border-b">
                                                    <h5 className="text-sm font-medium text-gray-900">Second Party</h5>
                                                </div>
                                                <div className="px-4 py-2">
                                                    {selectedDeed.secondParty.map((party, index) => (
                                                        <div key={index} className="mb-2 last:mb-0">
                                                            <p className="text-sm font-medium">{party.name}</p>
                                                            <p className="text-xs text-gray-500">{party.parentName}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setSelectedDeed(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeedDashboard;