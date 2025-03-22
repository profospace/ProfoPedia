import React, { useState } from 'react';
import axios from 'axios';
import {
    Play,
    Save,
    Download,
    Code,
    Filter,
    Cpu,
    HelpCircle,
    X,
    Check,
    ChevronRight
} from 'lucide-react';

function DataPlayground() {
    const [query, setQuery] = useState(`// Example: Find deeds with market value > transaction value
db.deeds.find({
  $expr: { $gt: ["$marketValue", "$transactionValue"] }
}).limit(10)`);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [savedQueries, setSavedQueries] = useState([
        {
            id: 1,
            name: 'Market > Transaction Value',
            description: 'Find deeds where market value exceeds transaction value',
            query: 'db.deeds.find({ $expr: { $gt: ["$marketValue", "$transactionValue"] } }).limit(10)'
        },
        {
            id: 2,
            name: 'High Value Transactions',
            description: 'Find transactions with value over ₹50 lakh',
            query: 'db.deeds.find({ transactionValue: { $gt: 5000000 } }).sort({ transactionValue: -1 }).limit(20)'
        },
        {
            id: 3,
            name: 'Recent Registrations',
            description: 'Find deeds registered in the last 30 days',
            query: 'db.deeds.find({ registrationDateParsed: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } }).sort({ registrationDateParsed: -1 })'
        }
    ]);
    const [queryName, setQueryName] = useState('');
    const [queryDescription, setQueryDescription] = useState('');
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [helpModalOpen, setHelpModalOpen] = useState(false);

    const runQuery = async () => {
        setLoading(true);
        setError(null);

        try {
            // This would typically call your backend to execute the MongoDB query
            // For demo purposes, we'll simulate a response
            // In a real application, you'd send the query to a secure endpoint that validates
            // and executes it against your database

            // Simulating API call delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Sample result data based on the query
            let sampleResult;

            if (query.includes('$gt: ["$marketValue", "$transactionValue"]')) {
                sampleResult = [
                    {
                        _id: "60d21b4667d0d8992e610c31",
                        documentNumber: "3131",
                        deedType: "विक्रय पत्र",
                        marketValue: 1270000,
                        transactionValue: 1200000,
                        district: "कानपुर नगर",
                        firstParty: [{ name: "मोतीलाल वर्मा" }],
                        secondParty: [{ name: "अरुणेन्द्र सिंह" }],
                        registrationDate: "22 MAR 2024"
                    },
                    {
                        _id: "60d21b4667d0d8992e610c32",
                        documentNumber: "2854",
                        deedType: "विक्रय पत्र",
                        marketValue: 3500000,
                        transactionValue: 3200000,
                        district: "कानपुर नगर",
                        firstParty: [{ name: "रमेश कुमार" }],
                        secondParty: [{ name: "सुनील गुप्ता" }],
                        registrationDate: "18 MAR 2024"
                    }
                ];
            } else if (query.includes('transactionValue: { $gt: 5000000 }')) {
                sampleResult = [
                    {
                        _id: "60d21b4667d0d8992e610c33",
                        documentNumber: "1845",
                        deedType: "बंधक पत्र",
                        marketValue: 5200000,
                        transactionValue: 5800000,
                        district: "कानपुर नगर",
                        firstParty: [{ name: "सविता देवी" }],
                        secondParty: [{ name: "स्टेट बैंक ऑफ इंडिया" }],
                        registrationDate: "10 MAR 2024"
                    }
                ];
            } else if (query.includes('registrationDateParsed: { $gte: new Date')) {
                sampleResult = [
                    {
                        _id: "60d21b4667d0d8992e610c31",
                        documentNumber: "3131",
                        deedType: "विक्रय पत्र",
                        marketValue: 1270000,
                        transactionValue: 1700000,
                        district: "कानपुर नगर",
                        firstParty: [{ name: "मोतीलाल वर्मा" }],
                        secondParty: [{ name: "अरुणेन्द्र सिंह" }],
                        registrationDate: "22 MAR 2024"
                    },
                    {
                        _id: "60d21b4667d0d8992e610c32",
                        documentNumber: "2854",
                        deedType: "विक्रय पत्र",
                        marketValue: 3500000,
                        transactionValue: 3700000,
                        district: "कानपुर नगर",
                        firstParty: [{ name: "रमेश कुमार" }],
                        secondParty: [{ name: "सुनील गुप्ता" }],
                        registrationDate: "18 MAR 2024"
                    }
                ];
            } else {
                // Default result for other queries
                sampleResult = [
                    {
                        _id: "60d21b4667d0d8992e610c31",
                        documentNumber: "3131",
                        deedType: "विक्रय पत्र",
                        marketValue: 1270000,
                        transactionValue: 1700000,
                        district: "कानपुर नगर",
                        firstParty: [{ name: "मोतीलाल वर्मा" }],
                        secondParty: [{ name: "अरुणेन्द्र सिंह" }],
                        registrationDate: "22 MAR 2024"
                    }
                ];
            }

            setResult({
                data: sampleResult,
                executionTime: Math.random() * 100 + 50, // Random execution time between 50-150ms
                count: sampleResult.length
            });
        } catch (err) {
            console.error('Error executing query:', err);
            setError('Failed to execute query. Please check your syntax and try again.');
        } finally {
            setLoading(false);
        }
    };

    const loadSavedQuery = (savedQuery) => {
        setQuery(savedQuery.query);
    };

    const saveQuery = () => {
        if (!queryName.trim()) {
            alert('Please provide a name for your query');
            return;
        }

        const newQuery = {
            id: savedQueries.length + 1,
            name: queryName,
            description: queryDescription,
            query: query
        };

        setSavedQueries([...savedQueries, newQuery]);
        setQueryName('');
        setQueryDescription('');
        setSaveModalOpen(false);
    };

    const downloadResults = () => {
        if (!result || !result.data) return;

        const jsonString = JSON.stringify(result.data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'query_results.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Data Playground</h1>
                    <p className="text-sm text-gray-500">Run custom queries against your deed registry database</p>
                </div>

                <div className="flex space-x-2 mt-4 md:mt-0">
                    <button
                        onClick={() => setHelpModalOpen(true)}
                        className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                    >
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Help
                    </button>

                    <button
                        onClick={runQuery}
                        disabled={loading}
                        className={`flex items-center px-4 py-2 rounded-md text-white text-sm ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Running...
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4 mr-2" />
                                Run Query
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Saved Queries Sidebar */}
                <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-1">
                    <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-md font-medium text-gray-900">Saved Queries</h2>
                    </div>
                    <div className="p-4">
                        <div className="space-y-4">
                            {savedQueries.map((savedQuery) => (
                                <div
                                    key={savedQuery.id}
                                    className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => loadSavedQuery(savedQuery)}
                                >
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-medium text-gray-900">{savedQuery.name}</h3>
                                        <button
                                            className="text-gray-400 hover:text-indigo-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                loadSavedQuery(savedQuery);
                                            }}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {savedQuery.description && (
                                        <p className="mt-1 text-xs text-gray-500">{savedQuery.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setSaveModalOpen(true)}
                            className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                        >
                            Save Current Query
                        </button>
                    </div>
                </div>

                {/* Query Editor and Results */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Query Editor */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <div className="flex items-center">
                                <Code className="w-5 h-5 text-gray-500 mr-2" />
                                <h2 className="text-md font-medium text-gray-900">Query Editor</h2>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setSaveModalOpen(true)}
                                    className="text-xs px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
                                >
                                    <Save className="w-3 h-3 inline mr-1" />
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="p-0">
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="font-mono w-full h-64 p-4 text-sm focus:outline-none border-0"
                                placeholder="Enter your MongoDB query here..."
                            />
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                            <div className="flex items-center">
                                <h2 className="text-md font-medium text-gray-900">Results</h2>
                                {result && (
                                    <span className="ml-2 text-xs text-gray-500">
                                        {result.count} documents in {result.executionTime.toFixed(2)}ms
                                    </span>
                                )}
                            </div>
                            {result && result.data && (
                                <button
                                    onClick={downloadResults}
                                    className="text-xs px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
                                >
                                    <Download className="w-3 h-3 inline mr-1" />
                                    Export
                                </button>
                            )}
                        </div>
                        <div className="p-4 max-h-96 overflow-auto">
                            {loading && (
                                <div className="flex justify-center items-center h-40">
                                    <div className="w-8 h-8 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
                                </div>
                            )}

                            {!loading && error && (
                                <div className="p-4 text-red-700 bg-red-50 rounded-md">
                                    <p className="font-medium">Error</p>
                                    <p className="mt-1 text-sm">{error}</p>
                                </div>
                            )}

                            {!loading && !error && !result && (
                                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                                    <Cpu className="w-12 h-12 mb-4 opacity-20" />
                                    <p>Run a query to see results</p>
                                </div>
                            )}

                            {!loading && !error && result && (
                                <pre className="font-mono text-xs overflow-auto">
                                    {JSON.stringify(result.data, null, 2)}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Query Modal */}
            {saveModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Save Query</h3>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label htmlFor="queryName" className="block text-sm font-medium text-gray-700">
                                                    Query Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="queryName"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    value={queryName}
                                                    onChange={(e) => setQueryName(e.target.value)}
                                                    placeholder="My Query"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="queryDescription" className="block text-sm font-medium text-gray-700">
                                                    Description (optional)
                                                </label>
                                                <textarea
                                                    id="queryDescription"
                                                    rows="3"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    value={queryDescription}
                                                    onChange={(e) => setQueryDescription(e.target.value)}
                                                    placeholder="What does this query do?"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={saveQuery}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setSaveModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Help Modal */}
            {helpModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Query Help</h3>
                                    <button
                                        onClick={() => setHelpModalOpen(false)}
                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Collection Names</h4>
                                        <p className="mt-1 text-sm text-gray-500">
                                            The main collection in this database is <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-700">deeds</code>.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Available Fields</h4>
                                        <div className="mt-1 grid grid-cols-2 gap-2 text-sm text-gray-500">
                                            <div>
                                                <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-700">documentNumber</code>
                                            </div>
                                            <div>Document number</div>

                                            <div>
                                                <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-700">deedType</code>
                                            </div>
                                            <div>Type of deed</div>

                                            <div>
                                                <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-700">district</code>
                                            </div>
                                            <div>District name</div>

                                            <div>
                                                <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-700">marketValue</code>
                                            </div>
                                            <div>Market value (number)</div>

                                            <div>
                                                <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-700">transactionValue</code>
                                            </div>
                                            <div>Transaction value (number)</div>

                                            <div>
                                                <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-700">firstParty</code>
                                            </div>
                                            <div>Array of first party details</div>

                                            <div>
                                                <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-700">secondParty</code>
                                            </div>
                                            <div>Array of second party details</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Example Queries</h4>
                                        <div className="mt-1 space-y-2 text-sm">
                                            <div className="p-2 bg-gray-50 rounded">
                                                <p className="font-medium text-gray-700">Find latest 10 deeds</p>
                                                <pre className="mt-1 text-xs text-gray-600 overflow-x-auto">
                                                    db.deeds.find().sort(&#123;registrationDateParsed: -1&#125;).limit(10)
                                                </pre>
                                            </div>

                                            <div className="p-2 bg-gray-50 rounded">
                                                <p className="font-medium text-gray-700">Count deeds by type</p>
                                                <pre className="mt-1 text-xs text-gray-600 overflow-x-auto">
                                                    db.deeds.aggregate([
                                                    &#123;$group: &#123;_id: "$deedType", count: &#123;$sum: 1&#125;&#125;&#125;,
                                                    &#123;$sort: &#123;count: -1&#125;&#125;
                                                    ])
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setHelpModalOpen(false)}
                                >
                                    Got it
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DataPlayground;