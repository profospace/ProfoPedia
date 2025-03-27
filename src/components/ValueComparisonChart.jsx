import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
    Line,
    ComposedChart
} from 'recharts';

/**
 * ValueComparisonChart - Compares market value vs transaction value by month
 * Adjusted to work with the provided deed data structure
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of deed data
 * @param {string} props.view - Chart view mode ('total' or 'average')
 * @returns {JSX.Element} Chart comparing values
 */
const ValueComparisonChart = ({ data = [], view = 'total' }) => {
    const [chartData, setChartData] = useState([]);
    const [avgRatio, setAvgRatio] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);

    useEffect(() => {
        if (data.length > 0) {
            const processedData = processValueComparisonData(data);
            setChartData(processedData);

            // Calculate overall average ratio for reference line
            let totalRatio = 0;
            let validMonths = 0;

            processedData.forEach(month => {
                if (month.marketValue > 0 && month.transactionValue > 0) {
                    totalRatio += (month.transactionValue / month.marketValue) * 100;
                    validMonths++;
                }
            });

            setAvgRatio(validMonths > 0 ? totalRatio / validMonths : 0);
            setTotalTransactions(processedData.reduce((sum, month) => sum + month.count, 0));
        }
    }, [data, view]);

    /**
     * Process and group deed data by month
     * @param {Array} deeds - Raw deed data array
     * @returns {Array} Processed monthly data
     */
    const processValueComparisonData = (deeds) => {
        // Filter deeds with registration dates and at least one value
        const validDeeds = deeds.filter(deed =>
            deed.registrationDateParsed &&
            (deed.marketValue > 0 || deed.transactionValue > 0)
        );

        // Group by month
        const monthlyData = new Map();

        validDeeds.forEach(deed => {
            const date = new Date(deed.registrationDateParsed);
            const monthKey = `${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;

            if (!monthlyData.has(monthKey)) {
                monthlyData.set(monthKey, {
                    month: monthKey,
                    marketValue: 0,
                    transactionValue: 0,
                    count: 0,
                    deeds: []
                });
            }

            const monthData = monthlyData.get(monthKey);
            monthData.marketValue += deed.marketValue || 0;
            monthData.transactionValue += deed.transactionValue || 0;
            monthData.count += 1;
            monthData.deeds.push(deed);
        });

        // Convert to array and calculate averages
        const result = Array.from(monthlyData.values()).map(month => ({
            ...month,
            avgMarketValue: month.count > 0 ? month.marketValue / month.count : 0,
            avgTransactionValue: month.count > 0 ? month.transactionValue / month.count : 0,
            ratio: month.marketValue > 0 ? (month.transactionValue / month.marketValue * 100).toFixed(1) : 0
        }));

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

    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const marketValue = view === 'total' ? data.marketValue : data.avgMarketValue;
            const transactionValue = view === 'total' ? data.transactionValue : data.avgTransactionValue;
            const ratio = (transactionValue / marketValue * 100).toFixed(1);

            return (
                <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
                    <p className="font-medium">{label}</p>
                    <div className="text-sm mt-1">
                        <p className="text-blue-700">
                            {view === 'total' ? 'Total Market Value: ' : 'Avg Market Value: '}
                            {formatValue(marketValue)}
                        </p>
                        <p className="text-indigo-700">
                            {view === 'total' ? 'Total Transaction Value: ' : 'Avg Transaction Value: '}
                            {formatValue(transactionValue)}
                        </p>
                        <p className="text-gray-700 mt-1">
                            Ratio: {ratio}% of market value
                        </p>
                        <p className="text-gray-600 mt-1">
                            Transactions: {data.count}
                        </p>
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
                <p className="text-gray-500">No comparison data available</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                    {view === 'total'
                        ? 'Market vs Transaction Value by Month'
                        : 'Average Property Values by Month'}
                </h3>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12 }}
                            tickMargin={10}
                        />
                        <YAxis
                            tickFormatter={formatValue}
                            tick={{ fontSize: 11 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar
                            dataKey={view === 'total' ? "marketValue" : "avgMarketValue"}
                            name={view === 'total' ? "Market Value" : "Avg Market Value"}
                            fill="#3b82f6"
                        />
                        <Bar
                            dataKey={view === 'total' ? "transactionValue" : "avgTransactionValue"}
                            name={view === 'total' ? "Transaction Value" : "Avg Transaction Value"}
                            fill="#4f46e5"
                        />
                        <Line
                            type="monotone"
                            dataKey="ratio"
                            name="Value Ratio (%)"
                            stroke="#ef4444"
                            strokeWidth={2}
                            yAxisId={1}
                            dot={{ r: 4 }}
                        />
                        <YAxis
                            yAxisId={1}
                            orientation="right"
                            domain={[0, 200]}
                            tickFormatter={(value) => `${value}%`}
                            tick={{ fontSize: 11 }}
                        />
                        {avgRatio > 0 && (
                            <ReferenceLine
                                y={avgRatio}
                                yAxisId={1}
                                stroke="#ef4444"
                                strokeDasharray="3 3"
                                label={{
                                    value: `Avg Ratio: ${avgRatio.toFixed(1)}%`,
                                    position: 'right',
                                    fill: '#ef4444',
                                    fontSize: 12
                                }}
                            />
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 text-sm text-gray-500 text-center">
                {`Based on ${totalTransactions} transactions across ${chartData.length} months`}
            </div>
        </div>
    );
};

export default ValueComparisonChart;