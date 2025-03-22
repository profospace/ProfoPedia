import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

/**
 * StampDutyChart - Displays stamp duty collection over time
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of monthly data objects
 * @returns {JSX.Element} Area chart of stamp duty collection
 */
const StampDutyChart = ({ data = [] }) => {
    // Ensure we have data to display
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No stamp duty data available</p>
            </div>
        );
    }

    // Format the data for the chart
    const chartData = data.map(item => ({
        month: item.month || 'Unknown',
        stampDuty: item.stampDuty || 0,
        count: item.count || 0,
        // Calculate average stamp duty per deed
        avgStampDuty: item.count ? (item.stampDuty / item.count).toFixed(0) : 0
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

    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
                    <p className="font-medium">{label}</p>
                    <div className="text-sm mt-1">
                        <p className="text-yellow-700">Total Stamp Duty: {formatValue(payload[0].value)}</p>
                        <p className="text-gray-700">Number of Deeds: {payload[1]?.payload.count}</p>
                        <p className="text-gray-700 mt-1">
                            Avg. Stamp Duty per Deed: {formatValue(payload[1]?.payload.avgStampDuty)}
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
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
                    tickFormatter={formatValue}
                    tick={{ fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="stampDuty"
                    name="Stamp Duty Collection"
                    stroke="#eab308"
                    fill="#fef08a"
                    fillOpacity={0.6}
                    activeDot={{ r: 6 }}
                />
                <Area
                    type="monotone"
                    dataKey="avgStampDuty"
                    name="Avg. Stamp Duty per Deed"
                    stroke="#ea580c"
                    fill="#fed7aa"
                    fillOpacity={0.4}
                    activeDot={{ r: 6 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default StampDutyChart;