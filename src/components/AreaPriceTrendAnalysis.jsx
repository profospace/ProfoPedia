import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area } from 'recharts';
import { MapPin, TrendingUp, Filter, ChevronRight, ArrowUpRight } from 'lucide-react';

const AreaPriceTrendAnalysis = ({ data, onAreaSelect }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [localities, setLocalities] = useState([]);
    const [selectedLocality, setSelectedLocality] = useState('all');
    const [timeFrame, setTimeFrame] = useState('monthly');
    const [view, setView] = useState('price'); // 'price', 'pricePerSqm', 'transaction'
    const [displayLimit, setDisplayLimit] = useState('all'); // 'all', 'top10', 'top50'
    const [topLocalities, setTopLocalities] = useState([]);
    const [areaDetailOpen, setAreaDetailOpen] = useState(false);

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Extract unique localities
        const uniqueLocalities = [...new Set(data.map(deed => deed.locality))].filter(Boolean);
        setLocalities(uniqueLocalities);

        // Calculate top localities by transaction volume/value
        const localityStats = {};

        data.forEach(deed => {
            if (!deed.locality) return;

            if (!localityStats[deed.locality]) {
                localityStats[deed.locality] = {
                    name: deed.locality,
                    transactionCount: 0,
                    totalValue: 0,
                    totalArea: 0
                };
            }

            localityStats[deed.locality].transactionCount += 1;
            localityStats[deed.locality].totalValue += deed.transactionValue || 0;
            localityStats[deed.locality].totalArea += deed.area || 0;
        });

        // Convert to array and calculate average values
        const localitiesArray = Object.values(localityStats).map(locality => ({
            ...locality,
            avgValue: locality.totalValue / locality.transactionCount || 0,
            avgPricePerSqm: locality.totalValue / locality.totalArea || 0
        }));

        // Sort by transaction count (can be changed to sort by other metrics)
        localitiesArray.sort((a, b) => b.transactionCount - a.transactionCount);

        setTopLocalities(localitiesArray);

        processData();
    }, [data, selectedLocality, timeFrame, view, displayLimit]);

    const processData = () => {
        if (!data || data.length === 0) return;

        // Filter data by selected locality if needed
        let processedData = data;

        if (selectedLocality !== 'all') {
            processedData = data.filter(deed => deed.locality === selectedLocality);
        } else if (displayLimit !== 'all') {
            // Filter to only include top localities
            const limit = displayLimit === 'top10' ? 10 : 50;
            const topLocalityNames = topLocalities.slice(0, limit).map(l => l.name);
            processedData = data.filter(deed => topLocalityNames.includes(deed.locality));
        }

        // Parse dates and extract month/year information
        const dateProcessed = processedData.map(deed => {
            const registrationDate = deed.registrationDateParsed
                ? new Date(deed.registrationDateParsed)
                : new Date(deed.registrationDate);

            return {
                ...deed,
                month: registrationDate.getMonth() + 1,
                year: registrationDate.getFullYear(),
                monthYear: `${registrationDate.getMonth() + 1}/${registrationDate.getFullYear()}`,
                quarter: `Q${Math.floor(registrationDate.getMonth() / 3) + 1}/${registrationDate.getFullYear()}`,
                // Calculate price per square meter (if transaction value exists)
                pricePerSqm: deed.transactionValue && deed.area ? deed.transactionValue / deed.area : 0
            };
        });

        // Group by time period
        const groupKey = timeFrame === 'monthly' ? 'monthYear' : 'quarter';

        // Create aggregated data for the chart
        const groupedData = {};

        dateProcessed.forEach(deed => {
            const key = deed[groupKey];
            if (!key) return;

            if (!groupedData[key]) {
                groupedData[key] = {
                    period: key,
                    count: 0,
                    totalValue: 0,
                    totalArea: 0,
                    localities: new Set(),
                    avgPricePerSqm: 0
                };
            }

            groupedData[key].count += 1;
            groupedData[key].totalValue += deed.transactionValue || 0;
            groupedData[key].totalArea += deed.area || 0;
            if (deed.locality) groupedData[key].localities.add(deed.locality);
        });

        // Convert to array and calculate averages
        const chartData = Object.values(groupedData).map(item => ({
            ...item,
            localities: item.localities.size,
            avgValue: item.totalValue / item.count || 0,
            avgPricePerSqm: item.totalValue / item.totalArea || 0
        }));

        // Sort by time period
        chartData.sort((a, b) => {
            const [aMonth, aYear] = a.period.split('/').map(Number);
            const [bMonth, bYear] = b.period.split('/').map(Number);
            return aYear === bYear ? aMonth - bMonth : aYear - bYear;
        });

        setFilteredData(chartData);
    };

    const getYAxisLabel = () => {
        switch (view) {
            case 'price': return 'Average Transaction Value (₹)';
            case 'pricePerSqm': return 'Average Price per Sq. Meter (₹)';
            case 'transaction': return 'Number of Transactions';
            default: return 'Value';
        }
    };

    const getDataKey = () => {
        switch (view) {
            case 'price': return 'avgValue';
            case 'pricePerSqm': return 'avgPricePerSqm';
            case 'transaction': return 'count';
            default: return 'avgValue';
        }
    };

    const formatTooltipValue = (value, name) => {
        if (view === 'price' || view === 'pricePerSqm') {
            return [`₹${(value / 1000).toFixed(2)}K`, name];
        }
        return [value, name];
    };

    // Calculate growth rates for insights
    const calculateGrowth = () => {
        if (filteredData.length < 2) return { monthly: 0, overall: 0 };

        const dataKey = getDataKey();
        const lastIndex = filteredData.length - 1;
        const lastValue = filteredData[lastIndex][dataKey];
        const previousValue = filteredData[lastIndex - 1][dataKey];
        const firstValue = filteredData[0][dataKey];

        const monthlyGrowth = previousValue ? ((lastValue - previousValue) / previousValue) * 100 : 0;
        const overallGrowth = firstValue ? ((lastValue - firstValue) / firstValue) * 100 : 0;

        return {
            monthly: monthlyGrowth.toFixed(2),
            overall: overallGrowth.toFixed(2)
        };
    };

    const handleAreaClick = (locality) => {
        setSelectedLocality(locality);
        if (onAreaSelect) {
            onAreaSelect(locality);
        }
    };

    const growth = calculateGrowth();

    // Top localities table for area details panel
    const TopLocalitiesTable = () => (
        <div className="overflow-x-auto max-h-64">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locality</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Value</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {topLocalities.slice(0, 10).map((locality, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{locality.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{locality.transactionCount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ₹{(locality.avgValue / 1000).toFixed(2)}K
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                    onClick={() => handleAreaClick(locality.name)}
                                    className="text-indigo-600 hover:text-indigo-900 flex items-center"
                                >
                                    View <ArrowUpRight className="w-4 h-4 ml-1" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Area-wise Price Trend Analysis</h2>

                <div className="flex flex-wrap gap-2">
                    <select
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={selectedLocality}
                        onChange={(e) => setSelectedLocality(e.target.value)}
                    >
                        <option value="all">All Localities</option>
                        {localities.map(locality => (
                            <option key={locality} value={locality}>{locality}</option>
                        ))}
                    </select>

                    <select
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={timeFrame}
                        onChange={(e) => setTimeFrame(e.target.value)}
                    >
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                    </select>

                    <select
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={view}
                        onChange={(e) => setView(e.target.value)}
                    >
                        <option value="price">Transaction Value</option>
                        <option value="pricePerSqm">Price per Sq. Meter</option>
                        <option value="transaction">Transaction Count</option>
                    </select>

                    {/* New dropdown for top 10/50 filter */}
                    <select
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={displayLimit}
                        onChange={(e) => setDisplayLimit(e.target.value)}
                    >
                        <option value="all">All Areas</option>
                        <option value="top10">Top 10 Areas</option>
                        <option value="top50">Top 50 Areas</option>
                    </select>
                </div>
            </div>

            {/* Insights Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Last Period Growth</p>
                            <p className={`text-xl font-bold ${Number(growth.monthly) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {Number(growth.monthly) >= 0 ? '+' : ''}{growth.monthly}%
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Overall Growth</p>
                            <p className={`text-xl font-bold ${Number(growth.overall) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {Number(growth.overall) >= 0 ? '+' : ''}{growth.overall}%
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-purple-50 p-4 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
                    onClick={() => setAreaDetailOpen(!areaDetailOpen)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Active Localities</p>
                                <p className="text-xl font-bold text-purple-600">
                                    {localities.length}
                                </p>
                            </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-purple-600 transform transition-transform ${areaDetailOpen ? 'rotate-90' : ''}`} />
                    </div>
                </div>
            </div>

            {/* Area Details Panel */}
            {areaDetailOpen && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg transition-all">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-700">Top Performing Areas</h3>
                        <button
                            onClick={() => setAreaDetailOpen(false)}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Close
                        </button>
                    </div>
                    <TopLocalitiesTable />
                </div>
            )}

            {/* Main Chart */}
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
                        <XAxis
                            dataKey="period"
                            label={{
                                value: timeFrame === 'monthly' ? 'Month/Year' : 'Quarter/Year',
                                position: 'insideBottom',
                                offset: -5
                            }}
                        />
                        <YAxis
                            label={{
                                value: getYAxisLabel(),
                                angle: -90,
                                position: 'insideLeft'
                            }}
                        />
                        <Tooltip
                            formatter={formatTooltipValue}
                            labelFormatter={(label) => timeFrame === 'monthly' ? `Month: ${label}` : `Quarter: ${label}`}
                        />
                        <Legend />
                        <Bar
                            dataKey={getDataKey()}
                            name={view === 'price' ? 'Avg Transaction Value' : view === 'pricePerSqm' ? 'Price per Sq. Meter' : 'Transaction Count'}
                            fill="#8884d8"
                            barSize={20}
                        />
                        <Line
                            type="monotone"
                            dataKey={getDataKey()}
                            stroke="#ff7300"
                            name="Trend"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                        />
                        {view !== 'transaction' && (
                            <Area
                                type="monotone"
                                dataKey="count"
                                fill="#82ca9d"
                                stroke="#82ca9d"
                                name="Transaction Volume"
                                opacity={0.3}
                            />
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Market Analysis Insights */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Market Insights</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    {growth.monthly > 0 ? (
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">▲</span>
                            <span>
                                {view === 'price' ? 'Property values' : view === 'pricePerSqm' ? 'Price per square meter' : 'Transaction volume'}
                                {' '}increased by {Math.abs(growth.monthly)}% in the most recent period, indicating a growing market.
                            </span>
                        </li>
                    ) : (
                        <li className="flex items-start">
                            <span className="text-red-500 mr-2">▼</span>
                            <span>
                                {view === 'price' ? 'Property values' : view === 'pricePerSqm' ? 'Price per square meter' : 'Transaction volume'}
                                {' '}decreased by {Math.abs(growth.monthly)}% in the most recent period, suggesting caution.
                            </span>
                        </li>
                    )}

                    {localities.length > 1 && (
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>With {localities.length} active localities in the dataset, consider exploring locality-specific trends for investment opportunities.</span>
                        </li>
                    )}

                    {filteredData.length > 2 && (
                        <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            <span>
                                The data spans {filteredData.length} {timeFrame === 'monthly' ? 'months' : 'quarters'},
                                showing an overall {growth.overall > 0 ? 'growth' : 'decline'} of {Math.abs(growth.overall)}%.
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AreaPriceTrendAnalysis;