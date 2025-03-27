import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

const PropertyInsightsDashboard = ({ data }) => {
    const [transactionsByLocality, setTransactionsByLocality] = useState([]);
    const [transactionsByType, setTransactionsByType] = useState([]);
    const [yearlyTrends, setYearlyTrends] = useState([]);
    const [selectedLocality, setSelectedLocality] = useState('all');
    const [insights, setInsights] = useState([]);
    const [topLocalities, setTopLocalities] = useState([]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

    useEffect(() => {
        if (data && data.length > 0) {
            analyzeData();
        }
    }, [data]);

    useEffect(() => {
        generateInsights();
    }, [transactionsByLocality, transactionsByType, yearlyTrends]);

    const analyzeData = () => {
        // Group by locality/village/mohalla
        const groupedByLocality = _.groupBy(data, 'locality');
        const localityData = _.map(groupedByLocality, (transactions, locality) => ({
            name: locality,
            count: transactions.length,
            area: _.sumBy(transactions, 'area'),
            value: transactions.length // for pie chart
        }));

        // Sort by transaction count
        const sortedLocalityData = _.orderBy(localityData, ['count'], ['desc']);
        setTransactionsByLocality(sortedLocalityData);
        setTopLocalities(sortedLocalityData.slice(0, 5));

        // Group by deed type
        const groupedByType = _.groupBy(data, 'deedType');
        const typeData = _.map(groupedByType, (transactions, type) => ({
            name: type,
            count: transactions.length,
            area: _.sumBy(transactions, 'area'),
            value: transactions.length // for pie chart
        }));
        setTransactionsByType(typeData);

        // Group by year
        const groupedByYear = _.groupBy(data, 'year');
        const yearData = _.map(groupedByYear, (transactions, year) => {
            // Count transaction types within this year
            const typesInYear = _.countBy(transactions, 'deedType');

            return {
                year,
                total: transactions.length,
                ...typesInYear
            };
        });

        // Sort by year
        const sortedYearData = _.orderBy(yearData, ['year'], ['asc']);
        setYearlyTrends(sortedYearData);
    };

    const generateInsights = () => {
        if (transactionsByLocality.length === 0) return;

        const newInsights = [];

        // Locality with most transactions
        if (transactionsByLocality.length > 0) {
            const topLocality = transactionsByLocality[0];
            newInsights.push({
                type: 'highlight',
                text: `${topLocality.name} has the highest transaction activity with ${topLocality.count} transactions.`
            });
        }

        // Transaction type distribution
        if (transactionsByType.length > 0) {
            const topType = _.maxBy(transactionsByType, 'count');
            newInsights.push({
                type: 'highlight',
                text: `Most common transaction type is "${topType.name}" with ${topType.count} transactions (${Math.round(topType.count * 100 / _.sumBy(transactionsByType, 'count'))}% of total).`
            });
        }

        // Year over year growth
        if (yearlyTrends.length >= 2) {
            const lastYear = yearlyTrends[yearlyTrends.length - 1];
            const prevYear = yearlyTrends[yearlyTrends.length - 2];
            const growth = ((lastYear.total - prevYear.total) / prevYear.total) * 100;

            if (!isNaN(growth)) {
                newInsights.push({
                    type: growth >= 0 ? 'positive' : 'negative',
                    text: `Transaction volume ${growth >= 0 ? 'increased' : 'decreased'} by ${Math.abs(growth).toFixed(1)}% from ${prevYear.year} to ${lastYear.year}.`
                });
            }
        }

        // Analyze land type preferences
        const landTypes = _.countBy(data, 'landType');
        const dominantLandType = _.maxBy(Object.entries(landTypes), ([, count]) => count);

        if (dominantLandType) {
            newInsights.push({
                type: 'info',
                text: `${dominantLandType[0]} is the most transacted land type (${dominantLandType[1]} transactions).`
            });
        }

        // Average property size
        const avgArea = _.meanBy(data, 'area');
        if (!isNaN(avgArea)) {
            newInsights.push({
                type: 'info',
                text: `Average property size is ${avgArea.toFixed(2)} square meters.`
            });
        }

        setInsights(newInsights);
    };

    // Filter data based on selected locality
    const getFilteredData = (dataArray) => {
        if (selectedLocality === 'all') return dataArray;

        // Filter yearly trends
        if (dataArray === yearlyTrends) {
            // We need to rebuild this from the original data
            const filteredByLocality = data.filter(item => item.locality === selectedLocality);
            const groupedByYear = _.groupBy(filteredByLocality, 'year');

            return _.map(groupedByYear, (transactions, year) => {
                const typesInYear = _.countBy(transactions, 'deedType');
                return {
                    year,
                    total: transactions.length,
                    ...typesInYear
                };
            });
        }

        return dataArray;
    };

    const renderInsightIcon = (type) => {
        switch (type) {
            case 'positive':
                return <div className="w-8 h-8 bg-green-100 rounded-full flex justify-center items-center text-green-600">↑</div>;
            case 'negative':
                return <div className="w-8 h-8 bg-red-100 rounded-full flex justify-center items-center text-red-600">↓</div>;
            case 'highlight':
                return <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center text-blue-600">★</div>;
            default:
                return <div className="w-8 h-8 bg-gray-100 rounded-full flex justify-center items-center text-gray-600">i</div>;
        }
    };

    if (!data || data.length === 0) {
        return <div className="p-6 text-center">No transaction data available</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Village/Mohalla Transaction Insights</h1>

            {/* Locality Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Locality</label>
                <select
                    className="border border-gray-300 rounded-md p-2 w-full md:w-64"
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                >
                    <option value="all">All Localities</option>
                    {transactionsByLocality.map(item => (
                        <option key={item.name} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>

            {/* Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {insights.map((insight, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-start gap-3">
                        {renderInsightIcon(insight.type)}
                        <p>{insight.text}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Transaction Volume by Locality */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4">Top Localities by Transaction Volume</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={topLocalities}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={60} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" name="Transactions" fill="#0088FE" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Transaction Types Distribution */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4">Transaction Types Distribution</h2>
                    <div className="h-64 flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={transactionsByType}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {transactionsByType.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value} transactions`, name]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Yearly Trends */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8">
                <h2 className="text-lg font-semibold mb-4">
                    {selectedLocality === 'all'
                        ? 'Yearly Transaction Trends'
                        : `Yearly Transaction Trends - ${selectedLocality}`}
                </h2>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={getFilteredData(yearlyTrends)}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" name="Total Transactions" fill="#8884d8" />
                            {transactionsByType.map((type, index) => (
                                <Bar
                                    key={type.name}
                                    dataKey={type.name}
                                    name={type.name}
                                    fill={COLORS[index % COLORS.length]}
                                    stackId="a"
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="overflow-x-auto">
                <h2 className="text-lg font-semibold mb-4">Transaction Details by Locality</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="py-2 px-4 border-b text-left">Locality/Mohalla</th>
                            <th className="py-2 px-4 border-b text-right">Transactions</th>
                            <th className="py-2 px-4 border-b text-right">Total Area (sq.m)</th>
                            <th className="py-2 px-4 border-b text-right">Avg Area (sq.m)</th>
                            <th className="py-2 px-4 border-b text-right">% of Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionsByLocality.map((locality) => {
                            const totalTransactions = _.sumBy(transactionsByLocality, 'count');
                            const percentage = (locality.count / totalTransactions * 100).toFixed(1);
                            const avgArea = locality.area / locality.count;

                            return (
                                <tr key={locality.name} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b font-medium">{locality.name}</td>
                                    <td className="py-2 px-4 border-b text-right">{locality.count}</td>
                                    <td className="py-2 px-4 border-b text-right">{locality.area.toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b text-right">{avgArea.toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b text-right">{percentage}%</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 text-sm text-gray-500">
                <p>Note: Analysis is based on the available transaction records. Data updated as of March 27, 2025.</p>
            </div>
        </div>
    );
};

export default PropertyInsightsDashboard;