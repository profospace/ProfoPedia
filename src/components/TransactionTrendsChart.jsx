import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Bar,
    ComposedChart
} from 'recharts';

/**
 * TransactionTrendsChart - Displays monthly transaction trends
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of monthly data objects
 * @param {boolean} props.showValue - Whether to show transaction value line (default: true)
 * @param {boolean} props.showVolume - Whether to show transaction volume bars (default: false)
 * @returns {JSX.Element} Line chart of transaction trends
 */
const TransactionTrendsChart = ({
    data = [],
    showValue = true,
    showVolume = false
}) => {
    // Ensure we have data to display
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No transaction data available</p>
            </div>
        );
    }

    // Format the data for the chart
    const chartData = data.slice(0, 11).map(item => ({
        // month: item.regDate?.slice(' ')[3] || 'Unknown',
        month: item.regdate?.slice(' ')[3] + item.regdate?.slice(' ')[4] + item.regdate?.slice(' ')[5] + item.regdate?.slice(' ')[6] + item.regdate?.slice(' ')[9] + item.regdate?.slice(' ')[10] || 'Unknown',
        count: item.count || 0,
        transactionValue: item.transactionValue || 0,
        marketValue: item.marketValue || 0
    })).sort((a, b) => {
        // Sort by month (assuming format is MMM YYYY)
        const months = {
            'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
            'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
        };

        const [aMonth, aYear] = a.month.split(' ');
        const [bMonth, bYear] = b.month.split(' ');

        if (aYear !== bYear) {
            return parseInt(aYear) - parseInt(bYear);
        }

        return months[aMonth] - months[bMonth];
    });

    // Format large numbers for display
    const formatValue = (value) => {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(1)}Cr`;
        } else if (value >= 100000) {
            return `₹${(value / 100000).toFixed(1)}L`;
        } else if (value >= 1000) {
            return `₹${(value / 1000).toFixed(1)}K`;
        }
        return `₹${value}`;
    };

    // Determine whether to use ComposedChart (for combined line and bar) or LineChart
    const ChartComponent = showVolume ? ComposedChart : LineChart;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ChartComponent
                data={chartData}
                margin={{
                    top: 5,
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

                {showValue && (
                    <YAxis
                        yAxisId="left"
                        orientation="left"
                        tickFormatter={formatValue}
                        tick={{ fontSize: 11 }}
                    />
                )}

                {showVolume && (
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickFormatter={(value) => `${value}`}
                        tick={{ fontSize: 11 }}
                    />
                )}

                <Tooltip
                    formatter={(value, name) => {
                        if (name === 'transactionValue' || name === 'marketValue') {
                            return [formatValue(value), name === 'transactionValue' ? 'Transaction Value' : 'Market Value'];
                        }
                        return [value, name === 'count' ? 'Number of Deeds' : name];
                    }}
                    labelFormatter={(label) => `Month: ${label}`}
                />

                <Legend
                    formatter={(value) => {
                        switch (value) {
                            case 'transactionValue': return 'Transaction Value';
                            case 'marketValue': return 'Market Value';
                            case 'count': return 'Number of Deeds';
                            default: return value;
                        }
                    }}
                />

                {showValue && (
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="transactionValue"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                )}

                {showValue && (
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="marketValue"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        style={{ opacity: 0.7 }}
                    />
                )}

                {showVolume && (
                    <Bar
                        yAxisId="right"
                        dataKey="count"
                        fill="#84cc16"
                        barSize={20}
                        opacity={0.7}
                    />
                )}
            </ChartComponent>
        </ResponsiveContainer>
    );
};

export default TransactionTrendsChart;