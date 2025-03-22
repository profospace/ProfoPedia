import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

/**
 * DeedTypeChart - Displays the distribution of deed types in a pie chart
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of deed objects
 * @returns {JSX.Element} Pie chart of deed types
 */
const DeedTypeChart = ({ data = [] }) => {
    // Ensure we have data to display
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No deed type data available</p>
            </div>
        );
    }

    // Colors for the pie chart sections
    const COLORS = [
        '#4f46e5', // indigo-600
        '#7c3aed', // violet-600
        '#2563eb', // blue-600
        '#0891b2', // cyan-600
        '#0d9488', // teal-600
        '#16a34a', // green-600
        '#ca8a04', // yellow-600
        '#ea580c', // orange-600
        '#dc2626', // red-600
        '#db2777', // pink-600
    ];

    // Group the data by deedType
    const deedTypeGroups = data.reduce((acc, deed) => {
        const deedType = deed.deedType || 'Unknown';
        if (!acc[deedType]) {
            acc[deedType] = 0;
        }
        acc[deedType]++;
        return acc;
    }, {});

    // Format the data for the pie chart
    const chartData = Object.entries(deedTypeGroups).map(([name, value]) => ({
        name,
        value
    }));

    // Calculate total count for percentage calculation
    const totalCount = chartData.reduce((sum, item) => sum + item.value, 0);

    // Custom tooltip for the pie chart
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
                    <p className="font-medium">{payload[0].name}</p>
                    <p className="text-gray-700">{`Count: ${payload[0].value}`}</p>
                    <p className="text-gray-700">{`Percentage: ${((payload[0].value / totalCount) * 100).toFixed(1)}%`}</p>
                </div>
            );
        }
        return null;
    };

    // Render legend items with custom style
    const renderLegend = (props) => {
        const { payload } = props;

        return (
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                {payload.map((entry, index) => (
                    <li key={`legend-${index}`} className="flex items-center">
                        <div
                            className="w-3 h-3 mr-1"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs text-gray-700">{entry.value}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={renderLegend} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default DeedTypeChart;