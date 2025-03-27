import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

// Main Property Price Analyzer Component
const PropertyPriceAnalyzer = ({ propertyData }) => {
    const navigate = useNavigate();

    // Data validation - Check if we have valid property data with unit types
    const [noValidData, setNoValidData] = useState(false);

    useEffect(() => {
        // Check if we have any data with valid unit types
        const hasValidData = propertyData.some(item => item.unitType && item.unitType.trim() !== '');
        setNoValidData(!hasValidData);
    }, [propertyData]);
    // States for user selections
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedLocality, setSelectedLocality] = useState('');

    // Extract unique years and localities from valid data (with unitType) for dropdowns
    const validData = useMemo(() => {
        return propertyData.filter(item => item.unitType && item.unitType.trim() !== '');
    }, [propertyData]);

    const years = useMemo(() => {
        return [...new Set(validData.map(item => item.year))].sort();
    }, [validData]);

    const localities = useMemo(() => {
        return [...new Set(validData.map(item => item.locality))];
    }, [validData]);

    // Set default selections when data is loaded
    useEffect(() => {
        if (years.length > 0 && !selectedYear) {
            setSelectedYear(years[0]);
        }
        if (localities.length > 0 && !selectedLocality) {
            setSelectedLocality(localities[0]);
        }
    }, [years, localities, selectedYear, selectedLocality]);

    // State for unit selection (square meter or square foot)
    const [displayUnitType, setDisplayUnitType] = useState('sqm');

    // Process data for the chart
    const chartData = useMemo(() => {
        if (!selectedYear || !selectedLocality) return [];

        // Filter data by selected year and locality, and ensure unitType is defined
        const filteredData = propertyData.filter(
            item => item.year === selectedYear &&
                item.locality === selectedLocality &&
                item.unitType &&
                item.unitType.trim() !== ''
        );

        // Group by month and calculate average prices
        const groupedByMonth = _.groupBy(filteredData, (item) => {
            // Extract month from executionDate (format: "DD MMM YYYY")
            const dateParts = item.executionDate.split(' ');
            return dateParts[1]; // Month part (e.g., "DEC")
        });

        // Convert to array for chart with month mapping
        const monthsOrder = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        // Conversion factor for sqm to sqft
        const sqmToSqftFactor = 10.764;

        return monthsOrder.map(month => {
            const monthData = groupedByMonth[month] || [];

            // Calculate price per area metrics
            let pricePerSqm = 0;
            let pricePerSqft = 0;

            if (monthData.length > 0) {
                // Calculate for each property and then average
                const pricesPerArea = monthData.map(item => {
                    // Skip items with no unitType, area, or transaction value
                    if (!item.unitType || item.unitType.trim() === '') {
                        return null;
                    }

                    if (item.transactionValue && item.transactionValue > 0 && item.area && item.area > 0) {
                        return item.transactionValue / item.area;
                    }
                    return null;
                }).filter(price => price !== null);

                if (pricesPerArea.length > 0) {
                    pricePerSqm = _.mean(pricesPerArea);
                    pricePerSqft = pricePerSqm / sqmToSqftFactor;
                }
            }

            // Display price according to selected unit
            const pricePerUnit = displayUnitType === 'sqm' ? pricePerSqm : pricePerSqft;

            // Calculate average transaction value if available, otherwise use area
            const avgValue = monthData.length > 0
                ? _.meanBy(monthData, 'transactionValue') || _.meanBy(monthData, 'area')
                : 0;

            return {
                month,
                count: monthData.length,
                averageValue: avgValue,
                pricePerSqm,
                pricePerSqft,
                pricePerUnit,
                totalArea: _.sumBy(monthData, 'area') || 0,
            };
        });
    }, [propertyData, selectedYear, selectedLocality]);


    // Helper function to convert all area units to square meters
    const convertToSquareMeters = (area, unitType) => {
        if (!area || area <= 0 || !unitType) return null;

        // Convert based on unit type
        unitType = unitType.trim().toLowerCase();

        // Hectare to square meters (1 hectare = 10,000 sq meters)
        if (unitType.includes('हैक्टेयर') || unitType.includes('hectare') || unitType.includes('हेक्टेयर')) {
            return area * 10000;
        }

        // Acre to square meters (1 acre = 4046.86 sq meters)
        if (unitType.includes('एकड़') || unitType.includes('acre')) {
            return area * 4046.86;
        }

        // Bigha to square meters (varies by region, approx 1 bigha = 1618.7 sq meters in UP)
        if (unitType.includes('बीघा') || unitType.includes('bigha')) {
            return area * 1618.7; // UP standard
        }

        // Square feet to square meters (1 sq ft = 0.092903 sq meters)
        if (unitType.includes('वर्ग फिट') || unitType.includes('sq ft') || unitType.includes('sqft') || unitType.includes('square feet')) {
            return area * 0.092903;
        }

        // Square yards to square meters (1 sq yard = 0.836127 sq meters)
        if (unitType.includes('वर्ग गज') || unitType.includes('sq yard') || unitType.includes('square yard')) {
            return area * 0.836127;
        }

        // Already in square meters
        if (unitType.includes('वर्ग मीटर') || unitType.includes('sq m') || unitType.includes('sqm') || unitType.includes('square meter')) {
            return area;
        }

        // If unit type not recognized, return null
        return null;
    };  // Log all deed areas when year changes, with unit conversions
    useEffect(() => {
        if (selectedYear) {
            // Filter deeds for the selected year
            const yearDeeds = propertyData.filter(deed => deed.year === selectedYear);

            console.log(`====== Areas for deeds in year ${selectedYear} ======`);
            console.log(`Total deeds found for ${selectedYear}: ${yearDeeds.length}`);

            // Log area values for all deeds in the selected year, with conversions
            yearDeeds.forEach((deed, index) => {
                const originalArea = deed.area || 'N/A';
                const originalUnit = deed.unitType || 'No unit';
                const convertedArea = deed.area ? convertToSquareMeters(deed.area, deed.unitType) : null;

                console.log(
                    `Deed ${index + 1} (${deed._id}): ` +
                    `Original = ${originalArea} ${originalUnit}, ` +
                    `Converted = ${convertedArea ? convertedArea.toFixed(2) + ' sq m' : 'N/A'}`
                );
            });

            // Log summary statistics with converted values
            const validDeeds = yearDeeds.filter(deed => {
                const convertedArea = convertToSquareMeters(deed.area, deed.unitType);
                return convertedArea && convertedArea > 0;
            });

            const convertedAreas = validDeeds.map(deed => convertToSquareMeters(deed.area, deed.unitType));

            console.log(`Valid area values after conversion: ${convertedAreas.length} out of ${yearDeeds.length} deeds`);

            if (convertedAreas.length > 0) {
                const totalArea = convertedAreas.reduce((sum, area) => sum + area, 0);
                const avgArea = totalArea / convertedAreas.length;
                const minArea = Math.min(...convertedAreas);
                const maxArea = Math.max(...convertedAreas);

                console.log(`Total area (sq m): ${totalArea.toFixed(2)}`);
                console.log(`Average area (sq m): ${avgArea.toFixed(2)}`);
                console.log(`Min area (sq m): ${minArea.toFixed(2)}`);
                console.log(`Max area (sq m): ${maxArea.toFixed(2)}`);
            }

            console.log('=======================================');
        }
    }, [selectedYear, propertyData]);  // Handle click on a month's bar to navigate to deeds
    const handleBarClick = (data) => {
        // Check if we have deeds with IDs to navigate to
        if (data && data.deedIds && data.deedIds.length > 0) {
            // If there's only one deed, navigate directly to it
            if (data.deedIds.length === 1) {
                navigate(`/deeds/${data.deedIds[0]}`);
            } else {
                // Create a comma-separated list of IDs for the query parameter
                const idsParam = data.deedIds.join(',');
                navigate(`/deeds?ids=${idsParam}&month=${data.month}&year=${selectedYear}&locality=${encodeURIComponent(selectedLocality)}`);
            }
        }
    }; 

    // Analyze price trends
    const priceAnalysis = useMemo(() => {
        if (chartData.length === 0) return { trend: 'No data', message: 'No data available for analysis' };

        // Filter out months with no data
        const monthsWithData = chartData.filter(item => item.count > 0);
        if (monthsWithData.length <= 1) {
            return { trend: 'Insufficient data', message: 'Need data from multiple months for trend analysis' };
        }

        // Check if prices are trending up, down, or peaked
        const values = monthsWithData.map(item => item.pricePerUnit);
        const lastThreeMonths = monthsWithData.slice(-3);

        // Calculate trend direction
        const firstValue = values[0];
        const lastValue = values[values.length - 1];

        // Avoid division by zero
        const percentChange = firstValue > 0
            ? ((lastValue - firstValue) / firstValue) * 100
            : 0;

        // Check for peak (if prices went up and then down)
        const maxValue = Math.max(...values);
        const maxIndex = values.indexOf(maxValue);
        const isPeak = maxIndex > 0 && maxIndex < values.length - 1;

        // Calculate moving average to smooth out fluctuations
        const movingAvg = [];
        const window = 3; // 3-month moving average

        for (let i = 0; i < values.length; i++) {
            if (i < window - 1) {
                movingAvg.push(values[i]);
            } else {
                const sum = values.slice(i - window + 1, i + 1).reduce((a, b) => a + b, 0);
                movingAvg.push(sum / window);
            }
        }

        // Determine overall trend
        let trend, message;

        if (isPeak) {
            trend = 'Peak';
            message = `Prices peaked at ${maxValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${displayUnitType === 'sqm' ? '₹/sqm' : '₹/sqft'} and have since decreased by ${((maxValue - lastValue) / maxValue * 100).toFixed(2)}%`;
        } else if (percentChange > 5) {
            trend = 'Upward';
            message = `Prices are trending upward with a ${percentChange.toFixed(2)}% increase over the period`;
        } else if (percentChange < -5) {
            trend = 'Downward';
            message = `Prices are trending downward with a ${Math.abs(percentChange).toFixed(2)}% decrease over the period`;
        } else {
            trend = 'Stable';
            message = `Prices are relatively stable with only a ${percentChange.toFixed(2)}% change over the period`;
        }

        // Add transaction volume analysis
        const totalTransactions = _.sumBy(monthsWithData, 'count');
        const avgMonthlyTransactions = totalTransactions / monthsWithData.length;
        const recentTransactions = _.sumBy(lastThreeMonths, 'count');
        const recentAvgTransactions = recentTransactions / lastThreeMonths.length;

        const transactionTrend = recentAvgTransactions > avgMonthlyTransactions
            ? 'increasing'
            : recentAvgTransactions < avgMonthlyTransactions
                ? 'decreasing'
                : 'stable';

        message += `. Transaction volume is ${transactionTrend}.`;

        return { trend, message };
    }, [chartData, displayUnitType]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Property Price Analyzer</h2>

            {noValidData && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Warning</p>
                    <p>No property records found. Please check your data.</p>
                </div>
            )}

            {/* Selection Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" style={{ opacity: noValidData ? '0.5' : '1', pointerEvents: noValidData ? 'none' : 'auto' }}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Year</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Locality/Village</label>
                    <select
                        value={selectedLocality}
                        onChange={(e) => setSelectedLocality(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {localities.map(locality => (
                            <option key={locality} value={locality}>{locality}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit Type</label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="displayUnitType"
                                value="sqm"
                                checked={displayUnitType === 'sqm'}
                                onChange={() => setDisplayUnitType('sqm')}
                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <span className="ml-2">Price per sqm</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="displayUnitType"
                                value="sqft"
                                checked={displayUnitType === 'sqft'}
                                onChange={() => setDisplayUnitType('sqft')}
                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <span className="ml-2">Price per sqft</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Analysis Banner */}
            {!noValidData && (
                <div className={`mb-6 p-4 rounded-md ${priceAnalysis.trend === 'Upward' ? 'bg-green-100 text-green-800' :
                        priceAnalysis.trend === 'Downward' ? 'bg-red-100 text-red-800' :
                            priceAnalysis.trend === 'Peak' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                    }`}>
                    <div className="font-bold mb-1">Trend: {priceAnalysis.trend}</div>
                    <div>{priceAnalysis.message}</div>
                </div>
            )}

            {/* Chart */}
            {!noValidData && (
                <div className="h-80 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis
                                yAxisId="left"
                                orientation="left"
                                stroke="#8884d8"
                                label={{
                                    value: displayUnitType === 'sqm' ? 'Price per sq m' : 'Price per sq ft',
                                    angle: -90,
                                    position: 'insideLeft'
                                }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke="#82ca9d"
                                label={{
                                    value: 'Transaction Count',
                                    angle: 90,
                                    position: 'insideRight'
                                }}
                            />
                            <Tooltip
                                formatter={(value, name) => {
                                    if (name === 'Price per Unit') {
                                        return [`${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${displayUnitType === 'sqm' ? '₹/sq m' : '₹/sq ft'}`, name];
                                    }
                                    return [value, name];
                                }}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white p-3 border border-gray-300 rounded shadow-md">
                                                <p className="font-bold text-gray-800">{`Month: ${label}`}</p>
                                                {payload.map((entry, index) => (
                                                    <p key={`item-${index}`} style={{ color: entry.color }}>
                                                        {`${entry.name}: ${entry.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                                                        {entry.name.includes('Price') ? (displayUnitType === 'sqm' ? ' ₹/sq m' : ' ₹/sq ft') : ''}
                                                    </p>
                                                ))}
                                                <p className="text-gray-600 mt-1">{`Total Deeds: ${data.count}`}</p>
                                                {data.deedIds && data.deedIds.length > 0 && (
                                                    <p className="text-blue-600 mt-1 text-xs cursor-pointer">
                                                        Click to view {data.deedIds.length === 1 ? 'deed' : 'deeds'}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Legend />
                            <Bar
                                yAxisId="left"
                                dataKey="pricePerUnit"
                                name={`Price per ${displayUnitType === 'sqm' ? 'sq m' : 'sq ft'}`}
                                fill="#8884d8"
                                onClick={handleBarClick}
                                cursor="pointer"
                            />
                            <Bar
                                yAxisId="right"
                                dataKey="count"
                                name="Number of Transactions"
                                fill="#82ca9d"
                                onClick={handleBarClick}
                                cursor="pointer"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Statistics Summary */}
            {!noValidData && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-indigo-100 p-4 rounded-md">
                        <div className="text-sm font-medium text-indigo-800">Total Transactions</div>
                        <div className="text-2xl font-bold">{_.sumBy(chartData, 'count')}</div>
                    </div>

                    <div className="bg-green-100 p-4 rounded-md">
                        <div className="text-sm font-medium text-green-800">Avg. Price ({displayUnitType === 'sqm' ? 'per sq m' : 'per sq ft'})</div>
                        <div className="text-2xl font-bold">
                            {chartData.length > 0 && _.sumBy(chartData, 'count') > 0
                                ? (_.sumBy(chartData.filter(d => d.count > 0), d => d.pricePerUnit * d.count) /
                                    _.sumBy(chartData.filter(d => d.count > 0), 'count')).toLocaleString(undefined, { maximumFractionDigits: 2 })
                                : 'N/A'}
                        </div>
                    </div>

                    <div className="bg-yellow-100 p-4 rounded-md">
                        <div className="text-sm font-medium text-yellow-800">Highest Monthly Price</div>
                        <div className="text-2xl font-bold">
                            {chartData.length > 0 && _.sumBy(chartData, 'count') > 0
                                ? _.maxBy(chartData.filter(d => d.count > 0), 'pricePerUnit')?.pricePerUnit.toLocaleString(undefined, { maximumFractionDigits: 2 })
                                : 'N/A'}
                            {chartData.length > 0 && _.sumBy(chartData, 'count') > 0 &&
                                ` (${_.maxBy(chartData.filter(d => d.count > 0), 'pricePerUnit')?.month})`}
                        </div>
                    </div>

                    <div className="bg-purple-100 p-4 rounded-md">
                        <div className="text-sm font-medium text-purple-800">Total Area</div>
                        <div className="text-2xl font-bold">
                            {_.sumBy(chartData, 'totalArea').toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            {displayUnitType === 'sqm' ? ' sq m' : ' sq ft'}
                        </div>
                    </div>
                </div>
            )}

            {/* Monthly Breakdown Table */}
            {!noValidData && (
                <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Monthly Price Breakdown</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area ({displayUnitType === 'sqm' ? 'sq m' : 'sq ft'})</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price per sq m (₹)</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price per sq ft (₹)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {chartData.map((data, idx) => (
                                    <tr
                                        key={data.month}
                                        className={
                                            data.count === 0
                                                ? 'bg-gray-50 text-gray-400'
                                                : (data.deedIds && data.deedIds.length > 0
                                                    ? 'hover:bg-indigo-50 cursor-pointer'
                                                    : '')
                                        }
                                        onClick={() => data.deedIds && data.deedIds.length > 0 && handleBarClick(data)}>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.month}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {data.deedIds && data.deedIds.length > 0 ? (
                                                <span className="text-indigo-600 hover:underline">
                                                    {data.count}
                                                </span>
                                            ) : (
                                                data.count
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {data.totalArea > 0
                                                ? (displayUnitType === 'sqm'
                                                    ? data.totalArea.toLocaleString(undefined, { maximumFractionDigits: 2 })
                                                    : data.totalAreaSqft.toLocaleString(undefined, { maximumFractionDigits: 2 }))
                                                : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {data.count > 0
                                                ? data.pricePerSqm.toLocaleString(undefined, { maximumFractionDigits: 2 })
                                                : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {data.count > 0
                                                ? data.pricePerSqft.toLocaleString(undefined, { maximumFractionDigits: 2 })
                                                : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyPriceAnalyzer;