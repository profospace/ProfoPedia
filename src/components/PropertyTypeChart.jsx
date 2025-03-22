import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

/**
 * PropertyTypeChart - Displays the distribution of property types
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of property data
 * @param {string} props.district - Selected district (optional)
 * @param {string} props.chartType - 'pie' or 'bar'
 * @returns {JSX.Element} Chart showing property type distribution
 */
const PropertyTypeChart = ({ data = [], district = null, chartType = 'pie' }) => {
    const [chartData, setChartData] = useState([]);

    // Process data whenever input data or district changes
    useEffect(() => {
        processPropertyTypeData();
    }, [data, district]);

    // Extract and categorize property types from deed data
    const processPropertyTypeData = () => {
        // Filter by district if provided
        const filteredData = district
            ? data.filter(item => item.district === district)
            : data;

        // Initialize property type counters
        const propertyTypes = {
            'Flat/Apartment': 0,
            'House': 0,
            'Bungalow': 0,
            'Commercial': 0,
            'Agricultural': 0,
            'Plot': 0,
            'Others': 0
        };

        // Categorize each property
        filteredData.forEach(deed => {
            // Get property description and land type
            const description = deed.propertyDescription?.toLowerCase() || '';
            const landType = deed.landType?.toLowerCase() || '';

            // Categorize based on keywords
            if (description.includes('फ्लैट') || description.includes('flat') || description.includes('अपार्टमेन्ट') || description.includes('apartment')) {
                propertyTypes['Flat/Apartment']++;
            } else if (description.includes('बंगला') || description.includes('bungalow') || description.includes('villa')) {
                propertyTypes['Bungalow']++;
            } else if ((description.includes('मकान') || description.includes('house')) && !description.includes('फ्लैट') && !description.includes('flat')) {
                propertyTypes['House']++;
            } else if (landType.includes('व्यावसायिक') || landType.includes('commercial') || description.includes('shop') || description.includes('दुकान')) {
                propertyTypes['Commercial']++;
            } else if (landType.includes('कृषि') || landType.includes('agricultural')) {
                propertyTypes['Agricultural']++;
            } else if (description.includes('प्लॉट') || description.includes('plot') || description.includes('भूखंड')) {
                propertyTypes['Plot']++;
            } else {
                propertyTypes['Others']++;
            }
        });

        // Convert to array format for charts
        const formattedData = Object.entries(propertyTypes).map(([name, value]) => ({
            name,
            value
        })).filter(item => item.value > 0); // Remove zero values

        setChartData(formattedData);
    };

    // If no data, show placeholder
    if (chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No property type data available</p>
            </div>
        );
    }

    // Colors for the chart sections
    const COLORS = [
        '#4f46e5', // indigo-600
        '#8b5cf6', // violet-500
        '#3b82f6', // blue-500
        '#06b6d4', // cyan-500
        '#10b981', // emerald-500
        '#f59e0b', // amber-500
        '#ef4444', // red-500
    ];

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const percentage = (payload[0].value / chartData.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1);

            return (
                <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
                    <p className="font-medium">{payload[0].name}</p>
                    <p className="text-gray-700">{`Count: ${payload[0].value}`}</p>
                    <p className="text-gray-700">{`Percentage: ${percentage}%`}</p>
                </div>
            );
        }
        return null;
    };

    // Render bar chart
    if (chartType === 'bar') {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        width={100}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="value"
                        name="Count"
                        fill="#4f46e5"
                        radius={[0, 4, 4, 0]}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }

    // Render pie chart (default)
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
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    formatter={(value) => <span className="text-xs">{value}</span>}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PropertyTypeChart;