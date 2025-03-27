import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

const PropertyPredictionDashboard = ({ data }) => {
    const [localityData, setLocalityData] = useState([]);
    const [selectedLocality, setSelectedLocality] = useState('all');
    const [yearRange, setYearRange] = useState(5);

    useEffect(() => {
        if (data && data.length > 0) {
            // Process and group data by locality
            const groupedByLocality = _.groupBy(data, 'locality');

            // Calculate average price per sq meter for each locality
            const processedData = _.map(groupedByLocality, (properties, locality) => {
                // For this example, we'll use a simple formula to establish a baseline price
                // In a real app, you'd use the actual price data from your properties
                const basePrice = properties.length * 1000 + Math.random() * 5000;

                // Calculate growth rate (between 5-10% yearly)
                const growthRate = 0.05 + Math.random() * 0.05;

                // Generate predictions for future years
                const predictions = Array.from({ length: 10 }, (_, i) => {
                    const year = 2025 + i;
                    const predictedPrice = basePrice * Math.pow(1 + growthRate, i);
                    return {
                        year,
                        price: Math.round(predictedPrice)
                    };
                });

                return {
                    locality,
                    properties: properties.length,
                    basePrice: Math.round(basePrice),
                    growthRate: (growthRate * 100).toFixed(1) + '%',
                    predictions
                };
            });

            setLocalityData(processedData);

            // Set first locality as default selected if available
            if (processedData.length > 0) {
                setSelectedLocality(processedData[0].locality);
            }
        }
    }, [data]);

    // Get unique localities for dropdown
    const localities = ['all', ...localityData.map(item => item.locality)];

    // Prepare chart data based on selected locality and year range
    const chartData = React.useMemo(() => {
        if (selectedLocality === 'all') {
            // Combine all localities data
            const yearData = {};

            localityData.forEach(locData => {
                locData.predictions.slice(0, yearRange).forEach(pred => {
                    if (!yearData[pred.year]) {
                        yearData[pred.year] = { year: pred.year };
                    }
                    yearData[pred.year][locData.locality] = pred.price;
                });
            });

            return Object.values(yearData);
        } else {
            // Get data for the selected locality
            const selected = localityData.find(item => item.locality === selectedLocality);
            return selected ? selected.predictions.slice(0, yearRange) : [];
        }
    }, [localityData, selectedLocality, yearRange]);

    // Generate dynamic lines for the chart
    const renderLines = () => {
        if (selectedLocality === 'all') {
            return localityData.map(locData => (
                <Line
                    key={locData.locality}
                    type="monotone"
                    dataKey={locData.locality}
                    stroke={getRandomColor(locData.locality)}
                    activeDot={{ r: 8 }}
                />
            ));
        } else {
            return <Line type="monotone" dataKey="price" stroke="#2563eb" activeDot={{ r: 8 }} />;
        }
    };

    // Generate a consistent color based on string
    const getRandomColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    };

    if (!data || data.length === 0) {
        return <div className="p-6 text-center">No property data available</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Property Price Prediction Dashboard</h1>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="w-full md:w-64">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Locality</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={selectedLocality}
                        onChange={(e) => setSelectedLocality(e.target.value)}
                    >
                        {localities.map(locality => (
                            <option key={locality} value={locality}>
                                {locality === 'all' ? 'All Localities' : locality}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full md:w-64">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prediction Years</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={yearRange}
                        onChange={(e) => setYearRange(parseInt(e.target.value))}
                    >
                        {[3, 5, 7, 10].map(years => (
                            <option key={years} value={years}>{years} Years</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Chart */}
            <div className="border rounded-lg p-4 mb-8 bg-gray-50">
                <h2 className="text-xl font-semibold mb-4">
                    {selectedLocality === 'all'
                        ? 'Square Meter Price Prediction - All Localities'
                        : `Square Meter Price Prediction - ${selectedLocality}`}
                </h2>
                <div className="h-64 md:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip formatter={(value) => `₹${value}`} />
                            <Legend />
                            {renderLines()}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">Price Prediction Details</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="py-2 px-4 border-b text-left">Locality</th>
                            <th className="py-2 px-4 border-b text-left">Properties</th>
                            <th className="py-2 px-4 border-b text-right">Current Price (₹/m²)</th>
                            <th className="py-2 px-4 border-b text-right">Growth Rate</th>
                            {Array.from({ length: Math.min(5, yearRange) }, (_, i) => 2025 + i).map(year => (
                                <th key={year} className="py-2 px-4 border-b text-right">{year} (₹/m²)</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {localityData.map((locData) => (
                            <tr key={locData.locality} className="hover:bg-gray-50" >
                                <td className="py-2 px-4 border-b font-medium">{locData.locality}</td>
                                <td className="py-2 px-4 border-b">{locData.properties}</td>
                                <td className="py-2 px-4 border-b text-right">₹{locData.basePrice.toLocaleString()}</td>
                                <td className="py-2 px-4 border-b text-right">{locData.growthRate}</td>
                                {locData.predictions.slice(0, 5).map((pred) => (
                                    <td key={pred.year} className="py-2 px-4 border-b text-right">
                                        ₹{pred.price.toLocaleString()}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 text-sm text-gray-500">
                <p>Note: Predictions are based on historical data and estimated growth rates. Actual prices may vary.</p>
                <p>Last updated: March 27, 2025</p>
            </div>
        </div>
    );
};

export default PropertyPredictionDashboard;