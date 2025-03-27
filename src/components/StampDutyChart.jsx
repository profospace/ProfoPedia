import React, { useState, useEffect } from 'react';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ComposedChart,
    Line,
    ReferenceLine,
} from 'recharts';

/**
 * StampDutyChart - Displays stamp duty collection over time
 * Adjusted to work with the provided deed data structure
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of deed data
 * @param {string} props.view - View mode ('collection' or 'percentage')
 * @returns {JSX.Element} Chart showing stamp duty metrics
 */
const StampDutyChart = ({ data = [], view = 'collection' }) => {
    const [chartData, setChartData] = useState([]);
    const [totalStats, setTotalStats] = useState({
        totalStampDuty: 0,
        avgStampDuty: 0,
        totalTransactions: 0,
        avgPercentage: 0
    });
    const [deedTypes, setDeedTypes] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            const processedData = processStampDutyData(data);
            setChartData(processedData);

            // Calculate overall statistics
            const stats = computeStampDutyStats(data);
            setTotalStats(stats);

            // Analyze by deed type
            const typeAnalysis = analyzeStampDutyByDeedType(data);
            setDeedTypes(typeAnalysis.slice(0, 5)); // Top 5 deed types
        }
    }, [data, view]);

    /**
     * Process and group stamp duty data by month
     * @param {Array} deeds - Raw deed data array
     * @returns {Array} Processed monthly data
     */
    const processStampDutyData = (deeds) => {
        // Filter deeds with registration dates and stamp duty values
        const validDeeds = deeds.filter(deed =>
            deed.registrationDateParsed &&
            deed.stampDuty > 0
        );

        // Group by month
        const monthlyData = new Map();

        validDeeds.forEach(deed => {
            const date = new Date(deed.registrationDateParsed);
            const monthKey = `${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;

            if (!monthlyData.has(monthKey)) {
                monthlyData.set(monthKey, {
                    month: monthKey,
                    stampDuty: 0,
                    count: 0,
                    deeds: []
                });
            }

            const monthData = monthlyData.get(monthKey);
            monthData.stampDuty += deed.stampDuty || 0;
            monthData.count += 1;
            monthData.deeds.push(deed);
        });

        // Calculate monthly averages and additional metrics
        const result = Array.from(monthlyData.values()).map(month => {
            // Calculate average stamp duty per deed
            const avgStampDuty = month.count > 0 ? month.stampDuty / month.count : 0;

            // Calculate average stamp duty as percentage of transaction value
            let totalTransactionValue = 0;
            let totalMarketValue = 0;
            month.deeds.forEach(deed => {
                totalTransactionValue += deed.transactionValue || 0;
                totalMarketValue += deed.marketValue || 0;
            });

            const stampDutyPercentage = totalTransactionValue > 0
                ? (month.stampDuty / totalTransactionValue) * 100
                : 0;

            const marketValuePercentage = totalMarketValue > 0
                ? (month.stampDuty / totalMarketValue) * 100
                : 0;

            return {
                ...month,
                avgStampDuty,
                stampDutyPercentage: parseFloat(stampDutyPercentage.toFixed(2)),
                marketValuePercentage: parseFloat(marketValuePercentage.toFixed(2)),
                totalTransactionValue,
                totalMarketValue
            };
        });

        // Sort by date
        return result.sort((a, b) => {
            const [aMonth, aYear] = a.month.split(' ');
            const [bMonth, bYear] = b.month.split(' ');

            if (aYear !== bYear) {
                return parseInt(aYear) - parseInt(bYear);
            }

            const months = {
                'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
                'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
            };

            return months[aMonth] - months[bMonth];
        });
    };

    /**
     * Calculate overall stamp duty statistics
     * @param {Array} deeds - Raw deed data array
     * @returns {Object} Overall statistics
     */
    const computeStampDutyStats = (deeds) => {
        const validDeeds = deeds.filter(deed => deed.stampDuty > 0);

        const totalStampDuty = validDeeds.reduce((sum, deed) => sum + (deed.stampDuty || 0), 0);
        const totalTransactionValue = validDeeds.reduce((sum, deed) => sum + (deed.transactionValue || 0), 0);
        const totalMarketValue = validDeeds.reduce((sum, deed) => sum + (deed.marketValue || 0), 0);

        const avgStampDuty = validDeeds.length > 0 ? totalStampDuty / validDeeds.length : 0;
        const dutyPercentage = totalTransactionValue > 0 ? (totalStampDuty / totalTransactionValue) * 100 : 0;
        const marketPercentage = totalMarketValue > 0 ? (totalStampDuty / totalMarketValue) * 100 : 0;

        return {
            totalStampDuty,
            avgStampDuty,
            totalTransactions: validDeeds.length,
            avgPercentage: parseFloat(dutyPercentage.toFixed(2)),
            avgMarketPercentage: parseFloat(marketPercentage.toFixed(2))
        };
    };

    /**
     * Analyze stamp duty by deed type
     * @param {Array} deeds - Raw deed data array
     * @returns {Array} Deed type analysis
     */
    const analyzeStampDutyByDeedType = (deeds) => {
        const deedTypeMap = new Map();

        deeds.forEach(deed => {
            if (!deed.deedType || deed.stampDuty <= 0) return;

            if (!deedTypeMap.has(deed.deedType)) {
                deedTypeMap.set(deed.deedType, {
                    type: deed.deedType,
                    totalStampDuty: 0,
                    count: 0,
                    transactionValue: 0
                });
            }

            const typeData = deedTypeMap.get(deed.deedType);
            typeData.totalStampDuty += deed.stampDuty || 0;
            typeData.count += 1;
            typeData.transactionValue += deed.transactionValue || 0;
        });

        return Array.from(deedTypeMap.values())
            .map(type => ({
                ...type,
                avgStampDuty: type.count > 0 ? type.totalStampDuty / type.count : 0,
                percentage: type.transactionValue > 0
                    ? (type.totalStampDuty / type.transactionValue) * 100
                    : 0
            }))
            .sort((a, b) => b.totalStampDuty - a.totalStampDuty);
    };

    // Format large numbers for display
    const formatValue = (value) => {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(1)}Cr`;
        } else if (value >= 100000) {
            return `₹${(value / 100000).toFixed(1)}L`;
        } else if (value >= 1000) {
            return `₹${(value / 1000).toFixed(1)}K`;
        }
        return `₹${value.toFixed(0)}`;
    };

    // Format percentage for display
    const formatPercentage = (value) => {
        return `${value.toFixed(2)}%`;
    };

    // Custom tooltip for collection view
    const CollectionTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
                    <p className="font-medium">{label}</p>
                    <div className="text-sm mt-1">
                        <p className="text-yellow-700">Total Stamp Duty: {formatValue(data.stampDuty)}</p>
                        <p className="text-orange-700">Avg. per Deed: {formatValue(data.avgStampDuty)}</p>
                        <p className="text-gray-700">Number of Deeds: {data.count}</p>
                        <p className="text-gray-700 mt-1">
                            Duty % of Transaction: {formatPercentage(data.stampDutyPercentage)}
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    // Custom tooltip for percentage view
    const PercentageTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
                    <p className="font-medium">{label}</p>
                    <div className="text-sm mt-1">
                        <p className="text-purple-700">Duty % of Transaction: {formatPercentage(data.stampDutyPercentage)}</p>
                        <p className="text-blue-700">Duty % of Market Value: {formatPercentage(data.marketValuePercentage)}</p>
                        <p className="text-gray-700">Total Stamp Duty: {formatValue(data.stampDuty)}</p>
                        <p className="text-gray-700">Number of Deeds: {data.count}</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    // If no data, show placeholder
    if (chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No stamp duty data available</p>
            </div>
        );
    }

    // Render collection view
    if (view === 'collection') {
        return (
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Stamp Duty Collection by Month</h3>
                    <div className="text-sm font-medium text-yellow-700">
                        Total: {formatValue(totalStats.totalStampDuty)}
                    </div>
                </div>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 12 }}
                                tickMargin={10}
                            />
                            <YAxis
                                yAxisId="left"
                                tickFormatter={formatValue}
                                tick={{ fontSize: 11 }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                tickFormatter={formatValue}
                                tick={{ fontSize: 11 }}
                            />
                            <Tooltip content={<CollectionTooltip />} />
                            <Legend />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="stampDuty"
                                name="Total Stamp Duty"
                                stroke="#eab308"
                                fill="#fef08a"
                                fillOpacity={0.6}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="avgStampDuty"
                                name="Avg. Stamp Duty per Deed"
                                stroke="#ea580c"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Top Deed Types by Stamp Duty</h4>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Deed Type</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Count</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Total Duty</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Avg. per Deed</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {deedTypes.map((type, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-2 text-xs text-gray-800 max-w-[200px] break-words">{type.type}</td>
                                        <td className="px-3 py-2 text-xs text-gray-800 text-right">{type.count}</td>
                                        <td className="px-3 py-2 text-xs text-gray-800 text-right">{formatValue(type.totalStampDuty)}</td>
                                        <td className="px-3 py-2 text-xs text-gray-800 text-right">{formatValue(type.avgStampDuty)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-4 text-sm text-gray-500 text-center">
                    {`Based on ${totalStats.totalTransactions} transactions with an average duty of ${formatValue(totalStats.avgStampDuty)} per deed`}
                </div>
            </div>
        );
    }

    // Render percentage view
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Stamp Duty as Percentage of Value</h3>
                <div className="text-sm font-medium text-purple-700">
                    Avg: {formatPercentage(totalStats.avgPercentage)}
                </div>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12 }}
                            tickMargin={10}
                        />
                        <YAxis
                            domain={[0, 'dataMax + 5']}
                            tickFormatter={value => `${value}%`}
                            tick={{ fontSize: 11 }}
                        />
                        <Tooltip content={<PercentageTooltip />} />
                        <Legend />
                        <Bar
                            dataKey="stampDutyPercentage"
                            name="% of Transaction Value"
                            fill="#9333ea"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="marketValuePercentage"
                            name="% of Market Value"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                        />
                        <ReferenceLine
                            y={totalStats.avgPercentage}
                            stroke="#9333ea"
                            strokeDasharray="3 3"
                            label={{
                                value: `Avg: ${formatPercentage(totalStats.avgPercentage)}`,
                                position: 'right',
                                fill: '#9333ea',
                                fontSize: 12
                            }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-700 mb-1">Stamp Duty Statistics</h4>
                    <div className="text-xs text-gray-700 space-y-1">
                        <p>Total Collection: {formatValue(totalStats.totalStampDuty)}</p>
                        <p>Average per Deed: {formatValue(totalStats.avgStampDuty)}</p>
                        <p>Total Transactions: {totalStats.totalTransactions}</p>
                    </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-700 mb-1">Duty Percentages</h4>
                    <div className="text-xs text-gray-700 space-y-1">
                        <p>Avg % of Transaction Value: {formatPercentage(totalStats.avgPercentage)}</p>
                        <p>Avg % of Market Value: {formatPercentage(totalStats.avgMarketPercentage)}</p>
                        <p>Months Analyzed: {chartData.length}</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-500 text-center">
                {`Analysis shows how stamp duty rates compare to property values over time`}
            </div>
        </div>
    );
};

export default StampDutyChart;