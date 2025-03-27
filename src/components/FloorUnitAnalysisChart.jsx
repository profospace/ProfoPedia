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
    ScatterChart,
    Scatter,
    ZAxis,
    Cell
} from 'recharts';

/**
 * FloorUnitAnalysisChart - Displays price variations by floor level or unit size
 * Adjusted to work with the provided deed data structure
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of deed data
 * @param {string} props.chartType - Type of chart to display ('bar' or 'scatter')
 * @param {string} props.analysis - Analysis mode ('floor' or 'size')
 * @returns {JSX.Element} Chart showing price variations by floor or unit size
 */
const FloorUnitAnalysisChart = ({ data = [], chartType = 'bar', analysis = 'floor' }) => {
    const [chartData, setChartData] = useState([]);
    const [avgData, setAvgData] = useState({});

    // Process data when input changes
    useEffect(() => {
        if (data.length > 0) {
            processFloorUnitData();
        }
    }, [data, analysis]);

    // Enhanced regex patterns for better floor extraction
    const extractFloorFromDescription = (description) => {
        // Default: ground floor
        let floor = 0;

        // Check for Hindi floor indicators
        if (description.includes('प्रथमतल') || description.includes('प्रथम तल') || description.includes('पहला तल')) {
            floor = 1;
        } else if (description.includes('द्वितीयतल') || description.includes('द्वितीय तल') || description.includes('दूसरा तल')) {
            floor = 2;
        } else if (description.includes('तृतीयतल') || description.includes('तृतीय तल') || description.includes('तीसरा तल')) {
            floor = 3;
        } else if (description.includes('चतुर्थतल') || description.includes('चतुर्थ तल') || description.includes('चौथा तल')) {
            floor = 4;
        } else if (description.includes('पंचमतल') || description.includes('पंचम तल') || description.includes('पांचवां तल')) {
            floor = 5;
        } else if (description.includes('षष्ठतल') || description.includes('षष्ठ तल') || description.includes('छठा तल')) {
            floor = 6;
        } else if (description.includes('भूतल') || description.includes('ground floor')) {
            floor = 0;
        }

        // Check for English floor indicators
        if (description.match(/1st floor|first floor/i)) {
            floor = 1;
        } else if (description.match(/2nd floor|second floor/i)) {
            floor = 2;
        } else if (description.match(/3rd floor|third floor/i)) {
            floor = 3;
        } else if (description.match(/4th floor|fourth floor/i)) {
            floor = 4;
        } else if (description.match(/5th floor|fifth floor/i)) {
            floor = 5;
        } else if (description.match(/6th floor|sixth floor/i)) {
            floor = 6;
        } else if (description.match(/ground floor|g floor/i)) {
            floor = 0;
        }

        // Look for flat numbers (e.g., "flat 501" suggests 5th floor)
        const flatMatches = [
            description.match(/फ्लैट न[ंो][.०]* *(\d+)/),
            description.match(/flat no[.०]* *(\d+)/i),
            description.match(/फ्लैट (\d+)/),
            description.match(/flat (\d+)/i),
            description.match(/नं[.०]* *(\d+)/)
        ];

        for (const match of flatMatches) {
            if (match && match[1]) {
                const flatNumber = parseInt(match[1], 10);
                if (flatNumber > 100 && flatNumber < 1000) {
                    // Typical flat numbering: first digit is floor number
                    const extractedFloor = Math.floor(flatNumber / 100);
                    if (extractedFloor >= 0 && extractedFloor <= 20) { // Reasonable floor range
                        floor = extractedFloor;
                        break;
                    }
                }
            }
        }

        return floor;
    };

    // Extract and process floor/unit data from deeds
    const processFloorUnitData = () => {
        // Filter only flat/apartment properties
        const flatData = data.filter(deed => {
            const description = deed.propertyDescription?.toLowerCase() || '';
            return description.includes('फ्लैट') ||
                description.includes('flat') ||
                description.includes('अपार्टमेन्ट') ||
                description.includes('apartment') ||
                description.includes('2बी/2') ||  // Example from one of the documents
                /\d+[a-z]?\/\d+[a-z]?/.test(description); // Pattern for flat numbers like 109-C-3
        });

        if (analysis === 'floor') {
            processFloorData(flatData);
        } else {
            processSizeData(flatData);
        }
    };

    // Process data for floor-based analysis
    const processFloorData = (flatData) => {
        // Extract floor information
        const floorPropertyData = flatData
            .map(deed => {
                const description = deed.propertyDescription || '';
                const marketValue = deed.marketValue || 0;
                const transactionValue = deed.transactionValue || 0;
                const area = deed.area || 0;

                // Use the higher value of marketValue or transactionValue
                const value = Math.max(marketValue, transactionValue);

                // Extract floor information
                const floor = extractFloorFromDescription(description);

                // Calculate per square unit price
                const pricePerUnit = area > 0 ? value / area : 0;

                return {
                    floor,
                    value,
                    area,
                    pricePerUnit,
                    description
                };
            })
            .filter(item => item.value > 0 && item.floor >= 0);

        // Group by floor and calculate statistics
        const floorStats = {};

        floorPropertyData.forEach(item => {
            if (!floorStats[item.floor]) {
                floorStats[item.floor] = {
                    count: 0,
                    totalValue: 0,
                    totalArea: 0,
                    values: []
                };
            }

            floorStats[item.floor].count++;
            floorStats[item.floor].totalValue += item.value;
            floorStats[item.floor].totalArea += item.area;
            floorStats[item.floor].values.push({
                value: item.value,
                area: item.area,
                pricePerUnit: item.pricePerUnit,
                description: item.description
            });
        });

        // Calculate average price per floor
        let totalAvg = 0;
        let totalCount = 0;

        const floorChartData = Object.entries(floorStats)
            .map(([floor, stats]) => {
                const avgValue = stats.count > 0 ? stats.totalValue / stats.count : 0;
                const avgArea = stats.count > 0 ? stats.totalArea / stats.count : 0;
                const avgPricePerUnit = avgArea > 0 ? avgValue / avgArea : 0;

                totalAvg += avgValue * stats.count;
                totalCount += stats.count;

                return {
                    floor: getFloorLabel(parseInt(floor, 10)),
                    floorNum: parseInt(floor, 10),
                    avgValue,
                    avgPricePerUnit,
                    count: stats.count,
                    avgArea,
                    values: stats.values
                };
            })
            .sort((a, b) => a.floorNum - b.floorNum);

        const overallAvg = totalCount > 0 ? totalAvg / totalCount : 0;

        setChartData(floorChartData);
        setAvgData({ overall: overallAvg });
    };

    // Process data for size-based analysis
    const processSizeData = (flatData) => {
        // Extract size information and group into ranges
        const sizeRanges = [
            { min: 0, max: 50, label: '< 50 sq.m' },
            { min: 50, max: 75, label: '50-75 sq.m' },
            { min: 75, max: 100, label: '75-100 sq.m' },
            { min: 100, max: 150, label: '100-150 sq.m' },
            { min: 150, max: 200, label: '150-200 sq.m' },
            { min: 200, max: Infinity, label: '> 200 sq.m' }
        ];

        // Initialize stats object
        const sizeStats = {};
        sizeRanges.forEach(range => {
            sizeStats[range.label] = {
                count: 0,
                totalValue: 0,
                totalArea: 0,
                values: [],
                range
            };
        });

        // Group properties by size range
        flatData.forEach(deed => {
            const area = deed.area || 0;
            const marketValue = deed.marketValue || 0;
            const transactionValue = deed.transactionValue || 0;

            // Use the higher value of marketValue or transactionValue
            const value = Math.max(marketValue, transactionValue);

            if (area > 0 && value > 0) {
                // Find the appropriate size range
                const range = sizeRanges.find(r => area >= r.min && area < r.max);

                if (range) {
                    const pricePerUnit = value / area;

                    sizeStats[range.label].count++;
                    sizeStats[range.label].totalValue += value;
                    sizeStats[range.label].totalArea += area;
                    sizeStats[range.label].values.push({
                        value,
                        area,
                        pricePerUnit,
                        description: deed.propertyDescription || ''
                    });
                }
            }
        });

        // Calculate averages and prepare chart data
        let totalAvg = 0;
        let totalCount = 0;

        const sizeChartData = Object.entries(sizeStats)
            .map(([label, stats]) => {
                const avgValue = stats.count > 0 ? stats.totalValue / stats.count : 0;
                const avgArea = stats.count > 0 ? stats.totalArea / stats.count : 0;
                const avgPricePerUnit = avgArea > 0 ? avgValue / avgArea : 0;

                totalAvg += avgValue * stats.count;
                totalCount += stats.count;

                return {
                    sizeRange: label,
                    rangeMin: stats.range.min,
                    avgValue,
                    avgPricePerUnit,
                    count: stats.count,
                    avgArea,
                    values: stats.values
                };
            })
            .filter(item => item.count > 0)
            .sort((a, b) => a.rangeMin - b.rangeMin);

        const overallAvg = totalCount > 0 ? totalAvg / totalCount : 0;

        setChartData(sizeChartData);
        setAvgData({ overall: overallAvg });
    };

    // Convert numeric floor to label
    const getFloorLabel = (floor) => {
        if (floor === 0) return 'Ground';
        if (floor === 1) return '1st';
        if (floor === 2) return '2nd';
        if (floor === 3) return '3rd';
        return `${floor}th`;
    };

    // Format value for tooltip display
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

    // Format area for display
    const formatArea = (area) => {
        return `${area.toFixed(1)} sq.m`;
    };

    // Format price per unit for display
    const formatPricePerUnit = (price) => {
        if (price >= 100000) {
            return `₹${(price / 100000).toFixed(1)}L/sq.m`;
        } else if (price >= 1000) {
            return `₹${(price / 1000).toFixed(1)}K/sq.m`;
        }
        return `₹${price.toFixed(0)}/sq.m`;
    };

    // Custom tooltip for bar chart
    const CustomBarTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
                    <p className="font-medium">{analysis === 'floor' ? `Floor: ${label}` : `Size: ${label}`}</p>
                    <div className="mt-2 space-y-1 text-sm">
                        <div>
                            <span className="font-medium">Avg. Value: </span>
                            <span>{formatValue(data.avgValue)}</span>
                        </div>
                        <div>
                            <span className="font-medium">Avg. Price/sq.m: </span>
                            <span>{formatPricePerUnit(data.avgPricePerUnit)}</span>
                        </div>
                        <div>
                            <span className="font-medium">Properties: </span>
                            <span>{data.count}</span>
                        </div>
                        <div>
                            <span className="font-medium">Avg. Area: </span>
                            <span>{formatArea(data.avgArea)}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    // Custom tooltip for scatter chart
    const CustomScatterTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const value = payload[0].value[1]; // y-value (price)
            const area = payload[0].value[2]; // z-value (area)
            const floor = payload[0].value[0]; // x-value (floor or size range)

            // Get description if available
            const description = payload[0].payload?.description || '';
            const shortDescription = description.length > 100
                ? description.substring(0, 100) + '...'
                : description;

            return (
                <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md max-w-xs">
                    <p className="font-medium">
                        {analysis === 'floor' ? `Floor: ${getFloorLabel(floor)}` : `Size: ${area.toFixed(1)} sq.m`}
                    </p>
                    <div className="mt-2 space-y-1 text-sm">
                        <div>
                            <span className="font-medium">Property Value: </span>
                            <span>{formatValue(value)}</span>
                        </div>
                        <div>
                            <span className="font-medium">Area: </span>
                            <span>{formatArea(area)}</span>
                        </div>
                        <div>
                            <span className="font-medium">Price/sq.m: </span>
                            <span>{formatPricePerUnit(value / area)}</span>
                        </div>
                        {shortDescription && (
                            <div className="mt-1 text-xs text-gray-600">
                                {shortDescription}
                            </div>
                        )}
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
                <p className="text-gray-500">
                    {analysis === 'floor'
                        ? 'No floor-based analysis data available'
                        : 'No unit size analysis data available'}
                </p>
            </div>
        );
    }

    // Generate scatter plot data from chartData
    const scatterData = [];
    chartData.forEach(item => {
        if (analysis === 'floor') {
            item.values.forEach(v => {
                scatterData.push([item.floorNum, v.value, v.area, v.description]);
            });
        } else {
            item.values.forEach(v => {
                scatterData.push([item.rangeMin, v.value, v.area, v.description]);
            });
        }
    });

    // Render Scatter Chart
    if (chartType === 'scatter') {
        return (
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">
                    {analysis === 'floor'
                        ? 'Property Values by Floor Level'
                        : 'Property Values by Unit Size'}
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                type="number"
                                dataKey={(value) => value[0]}
                                name={analysis === 'floor' ? 'Floor' : 'Size Range'}
                                tickFormatter={(value) => analysis === 'floor' ? getFloorLabel(value) : `${value}+`}
                            />
                            <YAxis
                                type="number"
                                dataKey={(value) => value[1]}
                                name="Property Value"
                                tickFormatter={formatValue}
                            />
                            <ZAxis
                                type="number"
                                dataKey={(value) => value[2]}
                                name="Area"
                                range={[50, 400]}
                            />
                            <Tooltip content={<CustomScatterTooltip />} />
                            <Legend />
                            <Scatter
                                name={analysis === 'floor' ? 'Floor-based Pricing' : 'Size-based Pricing'}
                                data={scatterData}
                                fill="#8884d8"
                            >
                                {scatterData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill="#4f46e5"
                                        opacity={0.7}
                                    />
                                ))}
                            </Scatter>
                            {avgData.overall > 0 && (
                                <ReferenceLine
                                    y={avgData.overall}
                                    stroke="#ef4444"
                                    strokeDasharray="3 3"
                                    label={{
                                        position: 'right',
                                        value: `Avg: ${formatValue(avgData.overall)}`,
                                        fill: '#ef4444',
                                        fontSize: 12
                                    }}
                                />
                            )}
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-gray-500 text-center">
                    Bubble size represents property area. Hover for details.
                </div>
            </div>
        );
    }

    // Render Bar Chart (default)
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">
                {analysis === 'floor'
                    ? 'Average Property Values by Floor Level'
                    : 'Average Property Values by Unit Size'}
            </h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey={analysis === 'floor' ? 'floor' : 'sizeRange'}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            tickFormatter={formatValue}
                            tick={{ fontSize: 11 }}
                        />
                        <Tooltip content={<CustomBarTooltip />} />
                        <Legend />
                        <Bar
                            dataKey="avgValue"
                            name="Average Value"
                            fill="#4f46e5"
                            radius={[4, 4, 0, 0]}
                        />
                        {avgData.overall > 0 && (
                            <ReferenceLine
                                y={avgData.overall}
                                stroke="#ef4444"
                                strokeDasharray="3 3"
                                label={{
                                    position: 'right',
                                    value: `Overall Avg: ${formatValue(avgData.overall)}`,
                                    fill: '#ef4444',
                                    fontSize: 12
                                }}
                            />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-500 text-center">
                {`Based on analysis of ${chartData.reduce((sum, item) => sum + item.count, 0)} properties`}
            </div>
        </div>
    );
};

export default FloorUnitAnalysisChart;