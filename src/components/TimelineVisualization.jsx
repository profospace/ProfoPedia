import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, ArrowUpDown, Filter } from 'lucide-react';
import _ from 'lodash';

const TimelineVisualization = ({ data }) => {
    const [timelineData, setTimelineData] = useState([]);
    const [viewMode, setViewMode] = useState('month'); // 'month', 'quarter', 'year'
    const [chartType, setChartType] = useState('bar'); // 'bar', 'line'
    const [selectedMetric, setSelectedMetric] = useState('count'); // 'count', 'area'

    useEffect(() => {
        if (!data || data.length === 0) return;

        generateTimelineData(data);
    }, [data, viewMode]);

    const generateTimelineData = (sourceData) => {
        // Parse dates from the registration date field
        const parsedData = sourceData.map(item => {
            let date;
            if (item.registrationDateParsed) {
                date = new Date(item.registrationDateParsed);
            } else {
                // Try to parse from the string format "DD MMM YYYY"
                const parts = item.registrationDate.split(' ');
                if (parts.length === 3) {
                    const monthMap = {
                        'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
                        'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
                    };

                    date = new Date(
                        parseInt(parts[2]), // Year
                        monthMap[parts[1]], // Month
                        parseInt(parts[0])  // Day
                    );
                } else {
                    // Fallback to current date if parsing fails
                    date = new Date();
                }
            }

            return {
                ...item,
                date: date
            };
        });

        // Group data based on the view mode
        let groupedData;
        let timeKey;

        if (viewMode === 'month') {
            groupedData = _.groupBy(parsedData, item => {
                return `${item.date.getFullYear()}-${String(item.date.getMonth() + 1).padStart(2, '0')}`;
            });
            timeKey = 'Month';
        } else if (viewMode === 'quarter') {
            groupedData = _.groupBy(parsedData, item => {
                const quarter = Math.floor(item.date.getMonth() / 3) + 1;
                return `${item.date.getFullYear()}-Q${quarter}`;
            });
            timeKey = 'Quarter';
        } else {
            // Year view
            groupedData = _.groupBy(parsedData, item => {
                return item.date.getFullYear().toString();
            });
            timeKey = 'Year';
        }

        // Create chart data
        const chartData = Object.keys(groupedData).map(key => {
            const items = groupedData[key];
            const totalArea = _.sumBy(items, item => item.area || 0);
            const deedTypeCounts = _.countBy(items, 'deedType');

            return {
                timePeriod: key,
                count: items.length,
                totalArea: totalArea,
                averageArea: items.length > 0 ? totalArea / items.length : 0,
                deedTypes: deedTypeCounts
            };
        });

        // Sort by time period
        const sortedData = _.sortBy(chartData, 'timePeriod');

        setTimelineData(sortedData);
    };

    // Custom tooltip component for the chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className="p-3 bg-white border border-gray-200 shadow-md rounded-md">
                    <p className="font-medium text-gray-800">{data.timePeriod}</p>
                    <p className="text-sm text-gray-600">
                        Transactions: <span className="font-medium">{data.count}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Total Area: <span className="font-medium">{data.totalArea.toFixed(2)} वर्ग मीटर</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Avg. Area: <span className="font-medium">{data.averageArea.toFixed(2)} वर्ग मीटर</span>
                    </p>

                    {/* Show deed type breakdown if available */}
                    {data.deedTypes && Object.keys(data.deedTypes).length > 0 && (
                        <div className="mt-1 pt-1 border-t border-gray-100">
                            <p className="text-xs font-medium text-gray-600">Transaction Types:</p>
                            {Object.entries(data.deedTypes).map(([type, count]) => (
                                <div key={type} className="flex justify-between text-xs">
                                    <span>{type}:</span>
                                    <span>{count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return null;
    };

    // Format the X-axis labels based on view mode
    const formatXAxis = (value) => {
        if (viewMode === 'month') {
            // For month view, show MMM YYYY
            const [year, month] = value.split('-');
            const date = new Date(parseInt(year), parseInt(month) - 1, 1);
            return `${date.toLocaleString('default', { month: 'short' })} ${year}`;
        } else if (viewMode === 'quarter') {
            // For quarter view, show Q# YYYY
            return value;
        } else {
            // For year view, just show the year
            return value;
        }
    };

    return (
        <div className="w-full rounded-lg shadow-lg bg-white overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold flex items-center text-gray-800">
                            <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                            Property Transaction Timeline
                        </h3>
                        <p className="text-sm text-gray-500">
                            Visualizing property transactions over time
                        </p>
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* Time period selector */}
                        <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">View:</span>
                            <select
                                className="text-sm border rounded p-1 bg-white"
                                value={viewMode}
                                onChange={(e) => setViewMode(e.target.value)}
                            >
                                <option value="month">Monthly</option>
                                <option value="quarter">Quarterly</option>
                                <option value="year">Yearly</option>
                            </select>
                        </div>

                        {/* Chart type selector */}
                        <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">Chart:</span>
                            <select
                                className="text-sm border rounded p-1 bg-white"
                                value={chartType}
                                onChange={(e) => setChartType(e.target.value)}
                            >
                                <option value="bar">Bar Chart</option>
                                <option value="line">Line Chart</option>
                            </select>
                        </div>

                        {/* Metric selector */}
                        <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">Metric:</span>
                            <select
                                className="text-sm border rounded p-1 bg-white"
                                value={selectedMetric}
                                onChange={(e) => setSelectedMetric(e.target.value)}
                            >
                                <option value="count">Transaction Count</option>
                                <option value="area">Total Area</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="p-4">
                <div className="bg-gray-50 rounded-md border border-gray-200 p-4" style={{ height: '400px' }}>
                    {timelineData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            {chartType === 'bar' ? (
                                <BarChart
                                    data={timelineData}
                                    margin={{ top: 10, right: 30, left: 30, bottom: 40 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                    <XAxis
                                        dataKey="timePeriod"
                                        angle={-45}
                                        textAnchor="end"
                                        height={70}
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={formatXAxis}
                                    />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar
                                        dataKey={selectedMetric === 'count' ? 'count' : 'totalArea'}
                                        name={selectedMetric === 'count' ? 'Transaction Count' : 'Total Area (वर्ग मीटर)'}
                                        fill="#3b82f6"
                                        barSize={selectedMetric === 'count' ? 30 : 20}
                                    />
                                </BarChart>
                            ) : (
                                <LineChart
                                    data={timelineData}
                                    margin={{ top: 10, right: 30, left: 30, bottom: 40 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                    <XAxis
                                        dataKey="timePeriod"
                                        angle={-45}
                                        textAnchor="end"
                                        height={70}
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={formatXAxis}
                                    />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey={selectedMetric === 'count' ? 'count' : 'totalArea'}
                                        name={selectedMetric === 'count' ? 'Transaction Count' : 'Total Area (वर्ग मीटर)'}
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            )}
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            No timeline data available
                        </div>
                    )}
                </div>

                {/* Stats cards */}
                {timelineData.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-3 rounded-md">
                            <div className="text-xs text-gray-500">Time Periods</div>
                            <div className="text-xl font-semibold">{timelineData.length}</div>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-md">
                            <div className="text-xs text-gray-500">Total Transactions</div>
                            <div className="text-xl font-semibold">{_.sumBy(timelineData, 'count')}</div>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-md">
                            <div className="text-xs text-gray-500">Avg. Transactions per Period</div>
                            <div className="text-xl font-semibold">
                                {(_.sumBy(timelineData, 'count') / timelineData.length).toFixed(1)}
                            </div>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-md">
                            <div className="text-xs text-gray-500">Most Active Period</div>
                            <div className="text-xl font-semibold">
                                {formatXAxis(_.maxBy(timelineData, 'count')?.timePeriod || '')}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimelineVisualization;