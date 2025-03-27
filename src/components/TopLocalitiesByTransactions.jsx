// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { Map, TrendingUp, Filter, ChevronUp, ChevronDown } from 'lucide-react';
// import _ from 'lodash';

// const TopLocalitiesByTransactions = ({ data }) => {
//     const [topCount, setTopCount] = useState(10);
//     const [viewMode, setViewMode] = useState('bar'); // 'bar', 'pie'
//     const [sortBy, setSortBy] = useState('count'); // 'count', 'value', 'avgValue'
//     const [localitiesData, setLocalitiesData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [expandedLocality, setExpandedLocality] = useState(null);

//     useEffect(() => {
//         if (!data || data.length === 0) {
//             setLoading(false);
//             return;
//         }

//         // Process the data
//         processLocalityData();
//     }, [data, sortBy]);

//     const processLocalityData = () => {
//         // Group deeds by locality
//         const groupedByLocality = _.groupBy(data, 'locality');

//         const localityStats = Object.entries(groupedByLocality).map(([locality, deeds]) => {
//             if (!locality || locality === 'undefined') return null;

//             // Count transactions
//             const transactionCount = deeds.length;

//             // Sum transaction values
//             const totalValue = _.sumBy(deeds, 'transactionValue') || 0;

//             // Sum area
//             const totalArea = _.sumBy(deeds, 'area') || 0;

//             // Calculate average transaction value
//             const avgTransactionValue = transactionCount > 0 ? totalValue / transactionCount : 0;

//             // Calculate average price per square meter
//             const avgPricePerSqm = totalArea > 0 ? totalValue / totalArea : 0;

//             // Extract deed types
//             const deedTypes = _.countBy(deeds, 'deedType');

//             // Extract property types (simplified approach based on landType)
//             const propertyTypes = _.countBy(deeds, 'landType');

//             // Dates for time pattern
//             const dates = deeds.map(deed => {
//                 return deed.registrationDateParsed
//                     ? new Date(deed.registrationDateParsed)
//                     : new Date(deed.registrationDate);
//             }).sort((a, b) => a - b);

//             // Time span
//             const timeSpan = dates.length > 1
//                 ? Math.round((dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24))
//                 : 0;

//             return {
//                 locality,
//                 transactionCount,
//                 totalValue,
//                 avgTransactionValue,
//                 avgPricePerSqm,
//                 deedTypes,
//                 propertyTypes,
//                 firstTransaction: dates[0],
//                 lastTransaction: dates[dates.length - 1],
//                 timeSpan, // in days
//                 totalArea
//             };
//         }).filter(Boolean); // Remove null entries

//         // Sort based on selected criteria
//         let sortedData;
//         if (sortBy === 'count') {
//             sortedData = _.orderBy(localityStats, ['transactionCount'], ['desc']);
//         } else if (sortBy === 'value') {
//             sortedData = _.orderBy(localityStats, ['totalValue'], ['desc']);
//         } else if (sortBy === 'avgValue') {
//             sortedData = _.orderBy(localityStats, ['avgTransactionValue'], ['desc']);
//         }

//         // Limit to top N
//         setLocalitiesData(sortedData);
//         setLoading(false);
//     };

//     const formatValue = (value) => {
//         if (value === 0) return '₹0';
//         if (value < 100000) return `₹${value.toLocaleString()}`;
//         if (value < 10000000) return `₹${(value / 100000).toFixed(2)}L`;
//         return `₹${(value / 10000000).toFixed(2)}Cr`;
//     };

//     const getSortLabel = () => {
//         switch (sortBy) {
//             case 'count': return 'Transaction Count';
//             case 'value': return 'Total Value';
//             case 'avgValue': return 'Avg. Transaction Value';
//             default: return 'Transaction Count';
//         }
//     };

//     const getDataKey = () => {
//         switch (sortBy) {
//             case 'count': return 'transactionCount';
//             case 'value': return 'totalValue';
//             case 'avgValue': return 'avgTransactionValue';
//             default: return 'transactionCount';
//         }
//     };

//     const formatTooltipValue = (value, name) => {
//         if (name === 'Total Value' || name === 'Avg. Transaction Value') {
//             return [formatValue(value), name];
//         }
//         return [value, name];
//     };

//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

//     const toggleExpand = (locality) => {
//         if (expandedLocality === locality) {
//             setExpandedLocality(null);
//         } else {
//             setExpandedLocality(locality);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//                 <span className="ml-3 text-gray-600">Analyzing transaction data...</span>
//             </div>
//         );
//     }

//     // Get the limited dataset based on topCount
//     const topLocalitiesData = localitiesData.slice(0, topCount);

//     return (
//         <div className="bg-white rounded-lg shadow p-6">
//             <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Top Localities by Transactions</h2>

//                 <div className="flex flex-wrap gap-3">
//                     {/* Top N selector */}
//                     <div className="flex items-center bg-gray-100 rounded-md">
//                         <button
//                             onClick={() => setTopCount(10)}
//                             className={`px-3 py-2 text-sm rounded-l-md ${topCount === 10 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
//                         >
//                             Top 10
//                         </button>
//                         <button
//                             onClick={() => setTopCount(15)}
//                             className={`px-3 py-2 text-sm ${topCount === 15 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
//                         >
//                             Top 15
//                         </button>
//                         <button
//                             onClick={() => setTopCount(20)}
//                             className={`px-3 py-2 text-sm rounded-r-md ${topCount === 20 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
//                         >
//                             Top 20
//                         </button>
//                     </div>

//                     {/* View mode toggle */}
//                     <div className="flex items-center bg-gray-100 rounded-md">
//                         <button
//                             onClick={() => setViewMode('bar')}
//                             className={`px-3 py-2 text-sm rounded-l-md ${viewMode === 'bar' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
//                         >
//                             Bar
//                         </button>
//                         <button
//                             onClick={() => setViewMode('pie')}
//                             className={`px-3 py-2 text-sm rounded-r-md ${viewMode === 'pie' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
//                         >
//                             Pie
//                         </button>
//                     </div>

//                     {/* Sort by selector */}
//                     <select
//                         className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         value={sortBy}
//                         onChange={(e) => setSortBy(e.target.value)}
//                     >
//                         <option value="count">Sort by Transactions</option>
//                         <option value="value">Sort by Total Value</option>
//                         <option value="avgValue">Sort by Avg. Value</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Main Visualization */}
//             <div className="mb-6">
//                 <div className="h-96">
//                     {viewMode === 'bar' ? (
//                         <ResponsiveContainer width="100%" height="100%">
//                             <BarChart
//                                 data={topLocalitiesData}
//                                 layout="vertical"
//                                 margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
//                             >
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis type="number" />
//                                 <YAxis
//                                     dataKey="locality"
//                                     type="category"
//                                     width={120}
//                                     tick={{ fontSize: 12 }}
//                                 />
//                                 <Tooltip formatter={formatTooltipValue} />
//                                 <Legend />
//                                 <Bar
//                                     dataKey={getDataKey()}
//                                     name={getSortLabel()}
//                                     fill="#8884d8"
//                                 >
//                                     {topLocalitiesData.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     ))}
//                                 </Bar>
//                             </BarChart>
//                         </ResponsiveContainer>
//                     ) : (
//                         <ResponsiveContainer width="100%" height="100%">
//                             <PieChart>
//                                 <Pie
//                                     data={topLocalitiesData}
//                                     cx="50%"
//                                     cy="50%"
//                                     labelLine={true}
//                                     label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                                     outerRadius={130}
//                                     fill="#8884d8"
//                                     dataKey={getDataKey()}
//                                     nameKey="locality"
//                                 >
//                                     {topLocalitiesData.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     ))}
//                                 </Pie>
//                                 <Tooltip formatter={formatTooltipValue} />
//                             </PieChart>
//                         </ResponsiveContainer>
//                     )}
//                 </div>
//             </div>

//             {/* Data Table */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Rank
//                             </th>
//                             <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Locality/Mohalla
//                             </th>
//                             <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Transactions
//                             </th>
//                             <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Total Value
//                             </th>
//                             <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Avg. Transaction
//                             </th>
//                             <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Details
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {topLocalitiesData.map((locality, index) => (
//                             <React.Fragment key={index}>
//                                 <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                     <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
//                                         {index + 1}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
//                                         {locality.locality}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
//                                         {locality.transactionCount}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
//                                         {formatValue(locality.totalValue)}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
//                                         {formatValue(locality.avgTransactionValue)}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
//                                         <button
//                                             onClick={() => toggleExpand(locality.locality)}
//                                             className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
//                                         >
//                                             {expandedLocality === locality.locality ?
//                                                 <ChevronUp className="w-5 h-5" /> :
//                                                 <ChevronDown className="w-5 h-5" />
//                                             }
//                                         </button>
//                                     </td>
//                                 </tr>
//                                 {expandedLocality === locality.locality && (
//                                     <tr>
//                                         <td colSpan="6" className="px-4 py-4 text-sm text-gray-500">
//                                             <div className="bg-gray-50 p-4 rounded-lg">
//                                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                                     <div>
//                                                         <h4 className="font-semibold text-gray-700">Transaction Details</h4>
//                                                         <p>Total Area: {locality.totalArea.toFixed(2)} sq.m</p>
//                                                         <p>Avg. Price/sq.m: {locality.avgPricePerSqm > 0 ? `₹${locality.avgPricePerSqm.toFixed(2)}` : 'N/A'}</p>
//                                                         <p>Time Span: {locality.timeSpan > 0 ? `${locality.timeSpan} days` : 'Single day'}</p>
//                                                     </div>

//                                                     <div>
//                                                         <h4 className="font-semibold text-gray-700">Deed Types</h4>
//                                                         <ul className="list-disc pl-5">
//                                                             {Object.entries(locality.deedTypes).map(([type, count], i) => (
//                                                                 <li key={i}>{type}: {count}</li>
//                                                             ))}
//                                                         </ul>
//                                                     </div>

//                                                     <div>
//                                                         <h4 className="font-semibold text-gray-700">Property Types</h4>
//                                                         <ul className="list-disc pl-5">
//                                                             {Object.entries(locality.propertyTypes).map(([type, count], i) => (
//                                                                 <li key={i}>{type}: {count}</li>
//                                                             ))}
//                                                         </ul>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </React.Fragment>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Summary Stats */}
//             <div className="mt-6 bg-gray-50 p-5 rounded-lg">
//                 <h3 className="text-lg font-medium text-gray-800 mb-4">Locality Market Insights</h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     <div>
//                         <h4 className="text-base font-semibold text-gray-700 mb-2">Market Concentration</h4>
//                         <ul className="space-y-2 text-sm">
//                             <li className="flex items-start">
//                                 <span className="text-blue-500 mr-2">•</span>
//                                 <span>
//                                     Top {topCount} localities account for{' '}
//                                     {((_.sumBy(topLocalitiesData, 'transactionCount') / data.length) * 100).toFixed(1)}%
//                                     {' '}of all transactions
//                                 </span>
//                             </li>

//                             <li className="flex items-start">
//                                 <span className="text-green-500 mr-2">•</span>
//                                 <span>
//                                     Highest transaction locality ({topLocalitiesData[0]?.locality || 'N/A'}) has{' '}
//                                     {topLocalitiesData[0]?.transactionCount || 0} transactions
//                                 </span>
//                             </li>

//                             <li className="flex items-start">
//                                 <span className="text-purple-500 mr-2">•</span>
//                                 <span>
//                                     Most valuable locality: {
//                                         _.orderBy(topLocalitiesData, ['totalValue'], ['desc'])[0]?.locality || 'N/A'
//                                     } with {
//                                         formatValue(_.orderBy(topLocalitiesData, ['totalValue'], ['desc'])[0]?.totalValue || 0)
//                                     }
//                                 </span>
//                             </li>
//                         </ul>
//                     </div>

//                     <div>
//                         <h4 className="text-base font-semibold text-gray-700 mb-2">Key Observations</h4>
//                         <ul className="space-y-2 text-sm">
//                             <li className="flex items-start">
//                                 <span className="text-blue-500 mr-2">•</span>
//                                 <span>
//                                     Highest avg. transaction value: {
//                                         _.orderBy(topLocalitiesData, ['avgTransactionValue'], ['desc'])[0]?.locality || 'N/A'
//                                     } ({
//                                         formatValue(_.orderBy(topLocalitiesData, ['avgTransactionValue'], ['desc'])[0]?.avgTransactionValue || 0)
//                                     })
//                                 </span>
//                             </li>

//                             <li className="flex items-start">
//                                 <span className="text-green-500 mr-2">•</span>
//                                 <span>
//                                     Largest total area transacted: {
//                                         _.orderBy(topLocalitiesData, ['totalArea'], ['desc'])[0]?.locality || 'N/A'
//                                     } ({
//                                         _.orderBy(topLocalitiesData, ['totalArea'], ['desc'])[0]?.totalArea.toFixed(2) || 0
//                                     } sq.m)
//                                 </span>
//                             </li>

//                             <li className="flex items-start">
//                                 <span className="text-purple-500 mr-2">•</span>
//                                 <span>
//                                     Most common property type:{' '}
//                                     {(() => {
//                                         // Aggregate property types across all localities
//                                         const allTypes = {};
//                                         topLocalitiesData.forEach(locality => {
//                                             Object.entries(locality.propertyTypes).forEach(([type, count]) => {
//                                                 allTypes[type] = (allTypes[type] || 0) + count;
//                                             });
//                                         });
//                                         // Find the most common type
//                                         const mostCommonType = Object.entries(allTypes).sort((a, b) => b[1] - a[1])[0];
//                                         return mostCommonType ? `${mostCommonType[0]} (${mostCommonType[1]})` : 'N/A';
//                                     })()}
//                                 </span>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TopLocalitiesByTransactions;

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Map, TrendingUp, Filter, ChevronUp, ChevronDown, Calendar } from 'lucide-react';
import _ from 'lodash';

const TopLocalitiesByTransactions = ({ data }) => {
    const [topCount, setTopCount] = useState(10);
    const [viewMode, setViewMode] = useState('bar'); // 'bar', 'pie'
    const [sortBy, setSortBy] = useState('count'); // 'count', 'value', 'avgValue'
    const [localitiesData, setLocalitiesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedLocality, setExpandedLocality] = useState(null);
    const [timePeriod, setTimePeriod] = useState('all'); // 'all', '3m', '6m', '1y'
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (!data || data.length === 0) {
            setLoading(false);
            return;
        }

        // Filter data based on time period
        filterDataByTimePeriod();
    }, [data, timePeriod]);

    useEffect(() => {
        if (filteredData.length > 0) {
            // Process the filtered data
            processLocalityData();
        }
    }, [filteredData, sortBy]);

    const filterDataByTimePeriod = () => {
        if (timePeriod === 'all') {
            setFilteredData(data);
            return;
        }

        const currentDate = new Date();
        let cutoffDate;

        // For fixed time periods based on data
        // Get the latest date in the dataset to use as reference
        const allDates = data.map(item => {
            if (item.registrationDateParsed) {
                return new Date(item.registrationDateParsed);
            } else {
                // Parse from string format "DD MMM YYYY"
                const parts = item.registrationDate.split(' ');
                if (parts.length === 3) {
                    const monthMap = {
                        'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
                        'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
                    };

                    return new Date(
                        parseInt(parts[2]), // Year
                        monthMap[parts[1]], // Month
                        parseInt(parts[0])  // Day
                    );
                }
            }
            return new Date(); // Fallback
        }).filter(date => !isNaN(date.getTime())); // Filter out invalid dates

        // Get the latest date in the dataset
        const latestDate = allDates.length > 0 ? new Date(Math.max(...allDates)) : new Date();

        // Calculate cutoff date based on selected time period from the latest date
        switch (timePeriod) {
            case '3m':
                cutoffDate = new Date(latestDate);
                cutoffDate.setMonth(latestDate.getMonth() - 3);
                break;
            case '6m':
                cutoffDate = new Date(latestDate);
                cutoffDate.setMonth(latestDate.getMonth() - 6);
                break;
            case '1y':
                cutoffDate = new Date(latestDate);
                cutoffDate.setFullYear(latestDate.getFullYear() - 1);
                break;
            default:
                setFilteredData(data);
                return;
        }

        // Filter data based on registration date
        const filtered = data.filter(item => {
            let registrationDate;

            if (item.registrationDateParsed) {
                registrationDate = new Date(item.registrationDateParsed);
            } else {
                // Try to parse from the string format "DD MMM YYYY"
                const parts = item.registrationDate.split(' ');
                if (parts.length === 3) {
                    const monthMap = {
                        'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
                        'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
                    };

                    registrationDate = new Date(
                        parseInt(parts[2]), // Year
                        monthMap[parts[1]], // Month
                        parseInt(parts[0])  // Day
                    );
                } else {
                    return false; // Skip if date can't be parsed
                }
            }

            return registrationDate >= cutoffDate;
        });

        setFilteredData(filtered);
    };

    const processLocalityData = () => {
        // Group deeds by locality
        const groupedByLocality = _.groupBy(filteredData, 'locality');

        const localityStats = Object.entries(groupedByLocality).map(([locality, deeds]) => {
            if (!locality || locality === 'undefined') return null;

            // Count transactions
            const transactionCount = deeds.length;

            // Sum transaction values
            const totalValue = _.sumBy(deeds, 'transactionValue') || 0;

            // Sum area
            const totalArea = _.sumBy(deeds, 'area') || 0;

            // Calculate average transaction value
            const avgTransactionValue = transactionCount > 0 ? totalValue / transactionCount : 0;

            // Calculate average price per square meter
            const avgPricePerSqm = totalArea > 0 ? totalValue / totalArea : 0;

            // Extract deed types
            const deedTypes = _.countBy(deeds, 'deedType');

            // Extract property types (simplified approach based on landType)
            const propertyTypes = _.countBy(deeds, 'landType');

            // Dates for time pattern
            const dates = deeds.map(deed => {
                return deed.registrationDateParsed
                    ? new Date(deed.registrationDateParsed)
                    : new Date(deed.registrationDate);
            }).sort((a, b) => a - b);

            // Time span
            const timeSpan = dates.length > 1
                ? Math.round((dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24))
                : 0;

            return {
                locality,
                transactionCount,
                totalValue,
                avgTransactionValue,
                avgPricePerSqm,
                deedTypes,
                propertyTypes,
                firstTransaction: dates[0],
                lastTransaction: dates[dates.length - 1],
                timeSpan, // in days
                totalArea
            };
        }).filter(Boolean); // Remove null entries

        // Sort based on selected criteria
        let sortedData;
        if (sortBy === 'count') {
            sortedData = _.orderBy(localityStats, ['transactionCount'], ['desc']);
        } else if (sortBy === 'value') {
            sortedData = _.orderBy(localityStats, ['totalValue'], ['desc']);
        } else if (sortBy === 'avgValue') {
            sortedData = _.orderBy(localityStats, ['avgTransactionValue'], ['desc']);
        }

        // Limit to top N
        setLocalitiesData(sortedData);
        setLoading(false);
    };

    const formatValue = (value) => {
        if (value === 0) return '₹0';
        if (value < 100000) return `₹${value.toLocaleString()}`;
        if (value < 10000000) return `₹${(value / 100000).toFixed(2)}L`;
        return `₹${(value / 10000000).toFixed(2)}Cr`;
    };

    const getSortLabel = () => {
        switch (sortBy) {
            case 'count': return 'Transaction Count';
            case 'value': return 'Total Value';
            case 'avgValue': return 'Avg. Transaction Value';
            default: return 'Transaction Count';
        }
    };

    const getDataKey = () => {
        switch (sortBy) {
            case 'count': return 'transactionCount';
            case 'value': return 'totalValue';
            case 'avgValue': return 'avgTransactionValue';
            default: return 'transactionCount';
        }
    };

    const formatTooltipValue = (value, name) => {
        if (name === 'Total Value' || name === 'Avg. Transaction Value') {
            return [formatValue(value), name];
        }
        return [value, name];
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

    const toggleExpand = (locality) => {
        if (expandedLocality === locality) {
            setExpandedLocality(null);
        } else {
            setExpandedLocality(locality);
        }
    };

    const getTimePeriodLabel = () => {
        // If we have the latest date from the dataset, show that in the label
        const formattedLatestDate = (() => {
            if (filteredData.length === 0) return '';

            // Find the latest registration date in the dataset
            const latestDateEntry = _.maxBy(data, item => {
                if (item.registrationDateParsed) {
                    return new Date(item.registrationDateParsed).getTime();
                }
                // Parse from string format
                const parts = item.registrationDate?.split(' ');
                if (parts && parts.length === 3) {
                    const monthMap = {
                        'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
                        'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
                    };

                    return new Date(
                        parseInt(parts[2]), // Year
                        monthMap[parts[1]], // Month
                        parseInt(parts[0])  // Day
                    ).getTime();
                }
                return 0;
            });

            if (!latestDateEntry) return '';

            const latestDate = latestDateEntry.registrationDateParsed
                ? new Date(latestDateEntry.registrationDateParsed)
                : new Date(latestDateEntry.registrationDate);

            return latestDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short'
            });
        })();

        switch (timePeriod) {
            case '3m': return `Last 3 Months (ending ${formattedLatestDate})`;
            case '6m': return `Last 6 Months (ending ${formattedLatestDate})`;
            case '1y': return `Last 1 Year (ending ${formattedLatestDate})`;
            default: return 'All Time';
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600">Analyzing transaction data...</span>
            </div>
        );
    }

    // Get the limited dataset based on topCount
    const topLocalitiesData = localitiesData.slice(0, topCount);

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Top Localities by Transactions</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {getTimePeriodLabel()} • {filteredData.length} Transactions
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
                    {/* Time Period Selector - New Addition */}
                    <div className="flex items-center bg-gray-100 rounded-md">
                        <button
                            onClick={() => setTimePeriod('all')}
                            className={`px-3 py-2 text-sm ${timePeriod === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'} rounded-l-md`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setTimePeriod('3m')}
                            className={`px-3 py-2 text-sm ${timePeriod === '3m' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            3M
                        </button>
                        <button
                            onClick={() => setTimePeriod('6m')}
                            className={`px-3 py-2 text-sm ${timePeriod === '6m' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            6M
                        </button>
                        <button
                            onClick={() => setTimePeriod('1y')}
                            className={`px-3 py-2 text-sm ${timePeriod === '1y' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'} rounded-r-md`}
                        >
                            1Y
                        </button>
                    </div>

                    {/* Top N selector */}
                    <div className="flex items-center bg-gray-100 rounded-md">
                        <button
                            onClick={() => setTopCount(10)}
                            className={`px-3 py-2 text-sm rounded-l-md ${topCount === 10 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            Top 10
                        </button>
                        <button
                            onClick={() => setTopCount(15)}
                            className={`px-3 py-2 text-sm ${topCount === 15 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            Top 15
                        </button>
                        <button
                            onClick={() => setTopCount(20)}
                            className={`px-3 py-2 text-sm rounded-r-md ${topCount === 20 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            Top 20
                        </button>
                    </div>

                    {/* Sort by selector */}
                    <select
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="count">Sort by Transactions</option>
                        <option value="value">Sort by Total Value</option>
                        <option value="avgValue">Sort by Avg. Value</option>
                    </select>

                    {/* View mode toggle */}
                    <div className="flex items-center bg-gray-100 rounded-md">
                        <button
                            onClick={() => setViewMode('bar')}
                            className={`px-3 py-2 text-sm rounded-l-md ${viewMode === 'bar' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            Bar
                        </button>
                        <button
                            onClick={() => setViewMode('pie')}
                            className={`px-3 py-2 text-sm rounded-r-md ${viewMode === 'pie' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            Pie
                        </button>
                    </div>
                </div>
            </div>

            {/* Empty state if no data */}
            {filteredData.length === 0 && (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No transactions in this time period</h3>
                    <p className="text-gray-500">Try selecting a different time range or check your data.</p>
                </div>
            )}

            {/* Main Visualization - Only show if we have data */}
            {filteredData.length > 0 && (
                <div className="mb-6">
                    <div className="h-96">
                        {viewMode === 'bar' ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={topLocalitiesData}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis
                                        dataKey="locality"
                                        type="category"
                                        width={120}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip formatter={formatTooltipValue} />
                                    <Legend />
                                    <Bar
                                        dataKey={getDataKey()}
                                        name={getSortLabel()}
                                        fill="#8884d8"
                                    >
                                        {topLocalitiesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={topLocalitiesData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={130}
                                        fill="#8884d8"
                                        dataKey={getDataKey()}
                                        nameKey="locality"
                                    >
                                        {topLocalitiesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={formatTooltipValue} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            )}

            {/* Data Table - Only show if we have data */}
            {filteredData.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rank
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Locality/Mohalla
                                </th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Transactions
                                </th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Value
                                </th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Avg. Transaction
                                </th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Details
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {topLocalitiesData.map((locality, index) => (
                                <React.Fragment key={index}>
                                    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                            {locality.locality}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                                            {locality.transactionCount}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                                            {formatValue(locality.totalValue)}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                                            {formatValue(locality.avgTransactionValue)}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                                            <button
                                                onClick={() => toggleExpand(locality.locality)}
                                                className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                                            >
                                                {expandedLocality === locality.locality ?
                                                    <ChevronUp className="w-5 h-5" /> :
                                                    <ChevronDown className="w-5 h-5" />
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedLocality === locality.locality && (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-4 text-sm text-gray-500">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-700">Transaction Details</h4>
                                                            <p>Total Area: {locality.totalArea.toFixed(2)} sq.m</p>
                                                            <p>Avg. Price/sq.m: {locality.avgPricePerSqm > 0 ? `₹${locality.avgPricePerSqm.toFixed(2)}` : 'N/A'}</p>
                                                            <p>Time Span: {locality.timeSpan > 0 ? `${locality.timeSpan} days` : 'Single day'}</p>
                                                        </div>

                                                        <div>
                                                            <h4 className="font-semibold text-gray-700">Deed Types</h4>
                                                            <ul className="list-disc pl-5">
                                                                {Object.entries(locality.deedTypes).map(([type, count], i) => (
                                                                    <li key={i}>{type}: {count}</li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div>
                                                            <h4 className="font-semibold text-gray-700">Property Types</h4>
                                                            <ul className="list-disc pl-5">
                                                                {Object.entries(locality.propertyTypes).map(([type, count], i) => (
                                                                    <li key={i}>{type}: {count}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Summary Stats - Only show if we have data */}
            {filteredData.length > 0 && topLocalitiesData.length > 0 && (
                <div className="mt-6 bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Locality Market Insights <span className="text-sm font-normal text-gray-500">({getTimePeriodLabel()})</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <h4 className="text-base font-semibold text-gray-700 mb-2">Market Concentration</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    <span>
                                        Top {topCount} localities account for{' '}
                                        {((_.sumBy(topLocalitiesData, 'transactionCount') / filteredData.length) * 100).toFixed(1)}%
                                        {' '}of all transactions
                                    </span>
                                </li>

                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    <span>
                                        Highest transaction locality ({topLocalitiesData[0]?.locality || 'N/A'}) has{' '}
                                        {topLocalitiesData[0]?.transactionCount || 0} transactions
                                    </span>
                                </li>

                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2">•</span>
                                    <span>
                                        Most valuable locality: {
                                            _.orderBy(topLocalitiesData, ['totalValue'], ['desc'])[0]?.locality || 'N/A'
                                        } with {
                                            formatValue(_.orderBy(topLocalitiesData, ['totalValue'], ['desc'])[0]?.totalValue || 0)
                                        }
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-base font-semibold text-gray-700 mb-2">Key Observations</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    <span>
                                        Highest avg. transaction value: {
                                            _.orderBy(topLocalitiesData, ['avgTransactionValue'], ['desc'])[0]?.locality || 'N/A'
                                        } ({
                                            formatValue(_.orderBy(topLocalitiesData, ['avgTransactionValue'], ['desc'])[0]?.avgTransactionValue || 0)
                                        })
                                    </span>
                                </li>

                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    <span>
                                        Largest total area transacted: {
                                            _.orderBy(topLocalitiesData, ['totalArea'], ['desc'])[0]?.locality || 'N/A'
                                        } ({
                                            _.orderBy(topLocalitiesData, ['totalArea'], ['desc'])[0]?.totalArea.toFixed(2) || 0
                                        } sq.m)
                                    </span>
                                </li>

                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2">•</span>
                                    <span>
                                        Most common property type:{' '}
                                        {(() => {
                                            // Aggregate property types across all localities
                                            const allTypes = {};
                                            topLocalitiesData.forEach(locality => {
                                                Object.entries(locality.propertyTypes).forEach(([type, count]) => {
                                                    allTypes[type] = (allTypes[type] || 0) + count;
                                                });
                                            });
                                            // Find the most common type
                                            const mostCommonType = Object.entries(allTypes).sort((a, b) => b[1] - a[1])[0];
                                            return mostCommonType ? `${mostCommonType[0]} (${mostCommonType[1]})` : 'N/A';
                                        })()}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopLocalitiesByTransactions;