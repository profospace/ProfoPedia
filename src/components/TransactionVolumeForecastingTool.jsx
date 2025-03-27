import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, AlertCircle, ArrowRight, Filter, BarChart2, Clock } from 'lucide-react';
import _ from 'lodash';

const TransactionVolumeForecastingTool = ({ data }) => {
    // State for historical data
    const [historicalData, setHistoricalData] = useState([]);
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for forecast controls
    const [forecastPeriod, setForecastPeriod] = useState(6); // months to forecast
    const [viewMode, setViewMode] = useState('monthly'); // monthly, quarterly, yearly
    const [viewType, setViewType] = useState('line'); // line, bar
    const [confidenceInterval, setConfidenceInterval] = useState(true); // show/hide confidence intervals
    const [forecastMetric, setForecastMetric] = useState('volume'); // volume, value, avgValue

    // State for trend detection and seasonality
    const [trend, setTrend] = useState(null);
    const [seasonalPattern, setSeasonalPattern] = useState(null);
    const [growthRate, setGrowthRate] = useState(null);

    useEffect(() => {
        if (!data || data.length === 0) {
            setLoading(false);
            return;
        }

        // Process the historical data
        processHistoricalData();
    }, [data, viewMode, forecastMetric]);

    useEffect(() => {
        if (historicalData.length > 0) {
            // Generate forecast based on historical data
            generateForecast();
        }
    }, [historicalData, forecastPeriod]);

    // Process the historical transaction data
    const processHistoricalData = () => {
        // Parse dates from transactions
        const transactions = data.map(item => {
            let date;

            if (item.registrationDateParsed) {
                date = new Date(item.registrationDateParsed);
            } else {
                // Parse from string format "DD MMM YYYY"
                const parts = item.registrationDate?.split(' ');
                if (parts && parts.length === 3) {
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
                    return null; // Skip if date can't be parsed
                }
            }

            return {
                ...item,
                parsedDate: date
            };
        }).filter(Boolean); // Remove null values

        // Get time range
        let groupedData;
        let timeFormat;

        if (viewMode === 'monthly') {
            // Group by month
            groupedData = _.groupBy(transactions, item => {
                const date = item.parsedDate;
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            });

            timeFormat = date => {
                const [year, month] = date.split('-');
                return `${new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`;
            };
        } else if (viewMode === 'quarterly') {
            // Group by quarter
            groupedData = _.groupBy(transactions, item => {
                const date = item.parsedDate;
                const quarter = Math.floor(date.getMonth() / 3) + 1;
                return `${date.getFullYear()}-Q${quarter}`;
            });

            timeFormat = date => date; // Keep as is
        } else {
            // Group by year
            groupedData = _.groupBy(transactions, item => {
                return item.parsedDate.getFullYear().toString();
            });

            timeFormat = date => date; // Keep as is
        }

        // Create time series data
        const timeSeriesData = Object.entries(groupedData).map(([timePeriod, items]) => {
            // Calculate metrics for this period
            const transactionCount = items.length;
            const totalValue = _.sumBy(items, 'transactionValue') || 0;
            const avgValue = transactionCount > 0 ? totalValue / transactionCount : 0;

            return {
                timePeriod,
                formattedTime: timeFormat(timePeriod),
                transactionCount,
                totalValue,
                avgValue,
                rawData: items
            };
        });

        // Sort by time period
        const sortedData = _.sortBy(timeSeriesData, 'timePeriod');

        // Calculate trends and seasonality
        if (sortedData.length > 2) {
            // Simple trend calculation based on first and last period
            const firstPeriod = sortedData[0];
            const lastPeriod = sortedData[sortedData.length - 1];

            let metricName, firstValue, lastValue;

            switch (forecastMetric) {
                case 'volume':
                    metricName = 'transaction volume';
                    firstValue = firstPeriod.transactionCount;
                    lastValue = lastPeriod.transactionCount;
                    break;
                case 'value':
                    metricName = 'transaction value';
                    firstValue = firstPeriod.totalValue;
                    lastValue = lastPeriod.totalValue;
                    break;
                case 'avgValue':
                    metricName = 'average transaction value';
                    firstValue = firstPeriod.avgValue;
                    lastValue = lastPeriod.avgValue;
                    break;
            }

            // Only calculate if we have valid values
            if (firstValue > 0 && lastValue > 0) {
                // Calculate compound annual growth rate
                const periodsElapsed = sortedData.length - 1;
                const growthRate = Math.pow(lastValue / firstValue, 1 / periodsElapsed) - 1;

                // Determine trend direction
                let trendDirection;
                if (growthRate > 0.05) trendDirection = 'strongly increasing';
                else if (growthRate > 0) trendDirection = 'slightly increasing';
                else if (growthRate > -0.05) trendDirection = 'stable';
                else trendDirection = 'decreasing';

                setTrend(trendDirection);
                setGrowthRate(growthRate);
            }

            // Detect seasonality (basic approach)
            if (viewMode === 'monthly' && sortedData.length >= 12) {
                const monthlyPattern = {};

                // Group by month across years
                sortedData.forEach(item => {
                    const month = parseInt(item.timePeriod.split('-')[1]);
                    if (!monthlyPattern[month]) {
                        monthlyPattern[month] = [];
                    }

                    let value;
                    switch (forecastMetric) {
                        case 'volume':
                            value = item.transactionCount;
                            break;
                        case 'value':
                            value = item.totalValue;
                            break;
                        case 'avgValue':
                            value = item.avgValue;
                            break;
                    }

                    monthlyPattern[month].push(value);
                });

                // Calculate average for each month
                const monthlyAverages = {};
                Object.entries(monthlyPattern).forEach(([month, values]) => {
                    if (values.length > 0) {
                        monthlyAverages[month] = _.mean(values);
                    }
                });

                // Find peak months
                if (Object.keys(monthlyAverages).length > 0) {
                    const sortedMonths = Object.entries(monthlyAverages)
                        .sort((a, b) => b[1] - a[1])
                        .map(([month]) => month);

                    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

                    setSeasonalPattern({
                        peak: monthNames[parseInt(sortedMonths[0]) - 1],
                        secondary: monthNames[parseInt(sortedMonths[1]) - 1],
                        low: monthNames[parseInt(sortedMonths[sortedMonths.length - 1]) - 1]
                    });
                }
            }
        }

        setHistoricalData(sortedData);
        setLoading(false);
    };

    // Generate forecast data based on historical trends
    const generateForecast = () => {
        if (historicalData.length < 2) {
            return; // Need at least 2 periods to forecast
        }

        // Get the last few periods for trend calculation
        const recentPeriodsCount = Math.min(historicalData.length, 6);
        const recentPeriods = historicalData.slice(-recentPeriodsCount);

        // Calculate the average change per period
        const changes = [];

        for (let i = 1; i < recentPeriods.length; i++) {
            let currentValue, previousValue;

            switch (forecastMetric) {
                case 'volume':
                    currentValue = recentPeriods[i].transactionCount;
                    previousValue = recentPeriods[i - 1].transactionCount;
                    break;
                case 'value':
                    currentValue = recentPeriods[i].totalValue;
                    previousValue = recentPeriods[i - 1].totalValue;
                    break;
                case 'avgValue':
                    currentValue = recentPeriods[i].avgValue;
                    previousValue = recentPeriods[i - 1].avgValue;
                    break;
            }

            // Only include valid changes
            if (previousValue > 0) {
                const change = currentValue / previousValue;
                changes.push(change);
            }
        }

        // Calculate average growth rate
        const avgGrowthRate = changes.length > 0 ? _.mean(changes) : 1.0;

        // Calculate volatility (standard deviation)
        const volatility = changes.length > 0
            ? Math.sqrt(_.sumBy(changes, c => Math.pow(c - avgGrowthRate, 2)) / changes.length)
            : 0.1; // Default volatility if not enough data

        // Generate forecast periods
        const lastPeriod = historicalData[historicalData.length - 1];
        const forecastPeriods = [];

        // Get the last time period to start from
        let lastTime = lastPeriod.timePeriod;

        // Get the base value for forecasting
        let baseValue;
        switch (forecastMetric) {
            case 'volume':
                baseValue = lastPeriod.transactionCount;
                break;
            case 'value':
                baseValue = lastPeriod.totalValue;
                break;
            case 'avgValue':
                baseValue = lastPeriod.avgValue;
                break;
        }

        // Generate future periods
        for (let i = 1; i <= forecastPeriod; i++) {
            // Calculate next time period
            let nextTime;

            if (viewMode === 'monthly') {
                const [year, month] = lastTime.split('-');
                let nextMonth = parseInt(month) + i;
                let nextYear = parseInt(year);

                while (nextMonth > 12) {
                    nextMonth -= 12;
                    nextYear += 1;
                }

                nextTime = `${nextYear}-${String(nextMonth).padStart(2, '0')}`;
            } else if (viewMode === 'quarterly') {
                const [year, quarter] = lastTime.split('-Q');
                let nextQuarter = parseInt(quarter) + i;
                let nextYear = parseInt(year);

                while (nextQuarter > 4) {
                    nextQuarter -= 4;
                    nextYear += 1;
                }

                nextTime = `${nextYear}-Q${nextQuarter}`;
            } else {
                // Yearly
                const nextYear = parseInt(lastTime) + i;
                nextTime = nextYear.toString();
            }

            // Apply simple growth model with seasonal adjustments
            let seasonalFactor = 1.0;

            // Apply seasonality for monthly forecasts
            if (viewMode === 'monthly' && seasonalPattern) {
                const month = parseInt(nextTime.split('-')[1]);

                // Boost peak months, reduce low months
                if (month === new Date(`${seasonalPattern.peak} 1, 2000`).getMonth() + 1) {
                    seasonalFactor = 1.15; // 15% boost for peak month
                } else if (month === new Date(`${seasonalPattern.secondary} 1, 2000`).getMonth() + 1) {
                    seasonalFactor = 1.1; // 10% boost for secondary peak
                } else if (month === new Date(`${seasonalPattern.low} 1, 2000`).getMonth() + 1) {
                    seasonalFactor = 0.85; // 15% reduction for low month
                }
            }

            // Calculate forecasted value
            const forecastedValue = baseValue * Math.pow(avgGrowthRate, i) * seasonalFactor;

            // Calculate confidence intervals (simple approach using volatility)
            const confidenceFactor = 1.96; // ~95% confidence interval
            const marginOfError = forecastedValue * volatility * confidenceFactor * Math.sqrt(i);

            const upperBound = forecastedValue + marginOfError;
            const lowerBound = Math.max(0, forecastedValue - marginOfError);

            // Format time for display
            let formattedTime;

            if (viewMode === 'monthly') {
                const [year, month] = nextTime.split('-');
                formattedTime = `${new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`;
            } else {
                formattedTime = nextTime;
            }

            // Add to forecast periods
            forecastPeriods.push({
                timePeriod: nextTime,
                formattedTime,
                forecast: true,
                forecastedValue,
                upperBound,
                lowerBound
            });
        }

        setForecastData(forecastPeriods);
    };

    // Get the appropriate value for charting based on the selected metric
    const getMetricValue = (item) => {
        if (item.forecast) {
            return item.forecastedValue;
        }

        switch (forecastMetric) {
            case 'volume':
                return item.transactionCount;
            case 'value':
                return item.totalValue;
            case 'avgValue':
                return item.avgValue;
            default:
                return item.transactionCount;
        }
    };

    // Format tooltip values
    const formatTooltipValue = (value, name) => {
        if (name === 'Forecast Upper' || name === 'Forecast Lower') {
            return [formatValue(value), name];
        }

        if (forecastMetric === 'value' || forecastMetric === 'avgValue') {
            return [formatValue(value), name];
        }

        return [value, name];
    };

    // Format values for display
    const formatValue = (value) => {
        if (!value && value !== 0) return '—';

        if (forecastMetric === 'value' || forecastMetric === 'avgValue') {
            if (value >= 10000000) {
                return `₹${(value / 10000000).toFixed(2)} Cr`;
            } else if (value >= 100000) {
                return `₹${(value / 100000).toFixed(2)} Lakh`;
            } else {
                return `₹${value.toLocaleString()}`;
            }
        }

        return value.toLocaleString();
    };

    // Get the label for the selected metric
    const getMetricLabel = () => {
        switch (forecastMetric) {
            case 'volume':
                return 'Transaction Volume';
            case 'value':
                return 'Total Transaction Value';
            case 'avgValue':
                return 'Average Transaction Value';
            default:
                return 'Transaction Volume';
        }
    };

    // Get the color for trend indicators
    const getTrendColor = () => {
        if (!trend) return 'text-gray-500';

        if (trend.includes('increasing')) return 'text-green-500';
        if (trend === 'stable') return 'text-blue-500';
        return 'text-red-500';
    };

    // Format growth rate as percentage
    const formatGrowthRate = () => {
        if (growthRate === null) return '—';
        return `${(growthRate * 100).toFixed(1)}%`;
    };

    // Combined data for charting
    const combinedData = [...historicalData, ...forecastData];

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-white mr-3" />
                    <div>
                        <h2 className="text-xl font-semibold text-white">Transaction Volume Forecaster</h2>
                        <p className="text-indigo-100 text-sm mt-1">
                            Predict future transaction trends based on historical patterns
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
                        <p className="text-gray-600">Analyzing transaction patterns...</p>
                    </div>
                ) : historicalData.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No transaction data available</h3>
                        <p className="text-gray-500">
                            We need historical transaction data to generate forecasts. Please ensure your data contains valid dates.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Controls Row */}
                        <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
                            <div className="flex flex-wrap gap-3">
                                {/* View Mode */}
                                <div className="flex items-center bg-gray-100 rounded-md">
                                    <button
                                        onClick={() => setViewMode('monthly')}
                                        className={`px-3 py-2 text-sm ${viewMode === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'} rounded-l-md`}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        onClick={() => setViewMode('quarterly')}
                                        className={`px-3 py-2 text-sm ${viewMode === 'quarterly' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        Quarterly
                                    </button>
                                    <button
                                        onClick={() => setViewMode('yearly')}
                                        className={`px-3 py-2 text-sm ${viewMode === 'yearly' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'} rounded-r-md`}
                                    >
                                        Yearly
                                    </button>
                                </div>

                                {/* Metric Selector */}
                                <select
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={forecastMetric}
                                    onChange={(e) => setForecastMetric(e.target.value)}
                                >
                                    <option value="volume">Transaction Volume</option>
                                    <option value="value">Transaction Value</option>
                                    <option value="avgValue">Avg. Transaction Value</option>
                                </select>

                                {/* Chart Type */}
                                <div className="flex items-center bg-gray-100 rounded-md">
                                    <button
                                        onClick={() => setViewType('line')}
                                        className={`px-3 py-2 text-sm ${viewType === 'line' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'} rounded-l-md`}
                                    >
                                        Line
                                    </button>
                                    <button
                                        onClick={() => setViewType('bar')}
                                        className={`px-3 py-2 text-sm ${viewType === 'bar' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'} rounded-r-md`}
                                    >
                                        Bar
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Confidence Interval Toggle */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="confidence-toggle"
                                        checked={confidenceInterval}
                                        onChange={() => setConfidenceInterval(!confidenceInterval)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="confidence-toggle" className="ml-2 text-sm text-gray-700">
                                        Show Confidence Interval
                                    </label>
                                </div>

                                {/* Forecast Period Selector */}
                                <select
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={forecastPeriod}
                                    onChange={(e) => setForecastPeriod(parseInt(e.target.value))}
                                >
                                    <option value="3">Forecast 3 Periods</option>
                                    <option value="6">Forecast 6 Periods</option>
                                    <option value="12">Forecast 12 Periods</option>
                                </select>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">
                                {getMetricLabel()} Forecast
                            </h3>

                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    {viewType === 'line' ? (
                                        <LineChart
                                            data={combinedData}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="formattedTime"
                                                tick={{ fontSize: 12 }}
                                                angle={-45}
                                                textAnchor="end"
                                                height={60}
                                            />
                                            <YAxis />
                                            <Tooltip formatter={formatTooltipValue} />
                                            <Legend />

                                            {/* Historical Data Line */}
                                            <Line
                                                type="monotone"
                                                dataKey={item => !item.forecast ? getMetricValue(item) : null}
                                                stroke="#6366f1"
                                                strokeWidth={2}
                                                name="Historical"
                                                dot={{ r: 4 }}
                                                activeDot={{ r: 6 }}
                                            />

                                            {/* Forecast Line */}
                                            <Line
                                                type="monotone"
                                                dataKey={item => item.forecast ? item.forecastedValue : null}
                                                stroke="#8b5cf6"
                                                strokeWidth={2}
                                                strokeDasharray="5 5"
                                                name="Forecast"
                                                dot={{ r: 4 }}
                                            />

                                            {/* Confidence Intervals */}
                                            {confidenceInterval && (
                                                <>
                                                    <Line
                                                        type="monotone"
                                                        dataKey={item => item.forecast ? item.upperBound : null}
                                                        stroke="#c4b5fd"
                                                        strokeWidth={1}
                                                        strokeDasharray="3 3"
                                                        name="Forecast Upper"
                                                        dot={false}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey={item => item.forecast ? item.lowerBound : null}
                                                        stroke="#c4b5fd"
                                                        strokeWidth={1}
                                                        strokeDasharray="3 3"
                                                        name="Forecast Lower"
                                                        dot={false}
                                                    />
                                                </>
                                            )}
                                        </LineChart>
                                    ) : (
                                        <BarChart
                                            data={combinedData}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="formattedTime"
                                                tick={{ fontSize: 12 }}
                                                angle={-45}
                                                textAnchor="end"
                                                height={60}
                                            />
                                            <YAxis />
                                            <Tooltip formatter={formatTooltipValue} />
                                            <Legend />

                                            {/* Historical Data Bar */}
                                            <Bar
                                                dataKey={item => !item.forecast ? getMetricValue(item) : null}
                                                fill="#6366f1"
                                                name="Historical"
                                            />

                                            {/* Forecast Bar */}
                                            <Bar
                                                dataKey={item => item.forecast ? item.forecastedValue : null}
                                                fill="#8b5cf6"
                                                name="Forecast"
                                            />

                                            {/* Confidence Intervals - only for line chart */}
                                        </BarChart>
                                    )}
                                </ResponsiveContainer>
                            </div>

                            {/* Chart Legend/Info */}
                            <div className="mt-3 text-sm text-gray-500 flex items-start">
                                <AlertCircle size={16} className="mr-2 mt-0.5 text-amber-500 flex-shrink-0" />
                                <p>
                                    Forecast based on {historicalData.length} historical data points.
                                    The shaded area {confidenceInterval ? 'represents' : 'can represent'} the 95% confidence interval.
                                    Actual results may vary.
                                </p>
                            </div>
                        </div>

                        {/* Insights and Stats */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Market Trends */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                                    <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
                                    Market Trends Analysis
                                </h3>

                                <div className="space-y-6">
                                    {/* General Trend */}
                                    <div>
                                        <h4 className="text-base font-medium text-gray-700 mb-2">Overall Trend</h4>
                                        <div className="flex items-center text-lg">
                                            <span className={`font-semibold capitalize ${getTrendColor()}`}>
                                                {trend || 'Insufficient data'}
                                            </span>

                                            {growthRate !== null && (
                                                <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">
                                                    {growthRate > 0 ? '+' : ''}{formatGrowthRate()} per period
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {trend && `${getMetricLabel()} is ${trend} over the analyzed time frame.`}
                                        </p>
                                    </div>

                                    {/* Seasonality */}
                                    {seasonalPattern && (
                                        <div>
                                            <h4 className="text-base font-medium text-gray-700 mb-2">Seasonal Patterns</h4>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="bg-green-50 p-3 rounded-md">
                                                    <div className="text-xs text-gray-500 mb-1">Peak Month</div>
                                                    <div className="font-semibold text-green-700">{seasonalPattern.peak}</div>
                                                </div>

                                                <div className="bg-blue-50 p-3 rounded-md">
                                                    <div className="text-xs text-gray-500 mb-1">Secondary Peak</div>
                                                    <div className="font-semibold text-blue-700">{seasonalPattern.secondary}</div>
                                                </div>

                                                <div className="bg-red-50 p-3 rounded-md">
                                                    <div className="text-xs text-gray-500 mb-1">Low Activity</div>
                                                    <div className="font-semibold text-red-700">{seasonalPattern.low}</div>
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-500 mt-3">
                                                Seasonal patterns suggest planning transactions in {seasonalPattern.peak} or {seasonalPattern.secondary} may be advantageous.
                                            </p>
                                        </div>
                                    )}

                                    {/* Forecast Summary */}
                                    <div>
                                        <h4 className="text-base font-medium text-gray-700 mb-2">Forecast Summary</h4>
                                        <div className="bg-indigo-50 p-4 rounded-md">
                                            {forecastData.length > 0 ? (
                                                <>
                                                    <div className="mb-3">
                                                        <span className="text-sm text-gray-600">
                                                            {getMetricLabel()} forecast for the next {forecastPeriod} {viewMode === 'yearly' ? 'years' : viewMode === 'quarterly' ? 'quarters' : 'months'}:
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center mb-3">
                                                        <ArrowRight className="h-4 w-4 text-indigo-500 mr-2" />
                                                        <div>
                                                            <span className="font-medium">
                                                                From {formatValue(getMetricValue(historicalData[historicalData.length - 1]))} to{' '}
                                                                {formatValue(forecastData[forecastData.length - 1].forecastedValue)}
                                                            </span>
                                                            <span className="text-sm text-gray-500 ml-2">
                                                                ({forecastData[forecastData.length - 1].formattedTime})
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="text-sm text-gray-600">
                                                        {(() => {
                                                            const lastHistorical = getMetricValue(historicalData[historicalData.length - 1]);
                                                            const lastForecast = forecastData[forecastData.length - 1].forecastedValue;
                                                            const percentChange = ((lastForecast - lastHistorical) / lastHistorical) * 100;

                                                            if (Math.abs(percentChange) < 5) {
                                                                return "The forecast suggests stable market conditions with minimal change.";
                                                            } else if (percentChange > 20) {
                                                                return "The forecast indicates strong growth potential in the coming periods.";
                                                            } else if (percentChange > 0) {
                                                                return "The forecast shows modest growth in the upcoming periods.";
                                                            } else {
                                                                return "The forecast suggests a potential decline in market activity.";
                                                            }
                                                        })()}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-sm text-gray-600">
                                                    Unable to generate forecast. Please check your data and selections.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Metrics and Recommendations */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                                    <BarChart2 className="h-5 w-5 mr-2 text-indigo-600" />
                                    Key Metrics & Recommendations
                                </h3>

                                <div className="space-y-6">
                                    {/* Historical Metrics */}
                                    <div>
                                        <h4 className="text-base font-medium text-gray-700 mb-3">Historical Performance</h4>

                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-gray-50 p-3 rounded-md">
                                                <div className="text-xs text-gray-500 mb-1">Peak {getMetricLabel()}</div>
                                                <div className="font-semibold">
                                                    {formatValue(Math.max(...historicalData.map(getMetricValue)))}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {historicalData.find(item => getMetricValue(item) === Math.max(...historicalData.map(getMetricValue)))?.formattedTime}
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 p-3 rounded-md">
                                                <div className="text-xs text-gray-500 mb-1">Average {getMetricLabel()}</div>
                                                <div className="font-semibold">
                                                    {formatValue(_.mean(historicalData.map(getMetricValue)))}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {historicalData.length} data points
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-sm text-gray-600">
                                            {(() => {
                                                const first = getMetricValue(historicalData[0]);
                                                const last = getMetricValue(historicalData[historicalData.length - 1]);
                                                const changePct = ((last - first) / first) * 100;

                                                if (changePct > 15) {
                                                    return `Strong positive trend with ${changePct.toFixed(1)}% growth over the analyzed period.`;
                                                } else if (changePct > 0) {
                                                    return `Modest growth of ${changePct.toFixed(1)}% over the analyzed period.`;
                                                } else if (changePct > -15) {
                                                    return `Slight decline of ${Math.abs(changePct).toFixed(1)}% over the analyzed period.`;
                                                } else {
                                                    return `Significant decline of ${Math.abs(changePct).toFixed(1)}% over the analyzed period.`;
                                                }
                                            })()}
                                        </div>
                                    </div>

                                    {/* Recommendations */}
                                    <div>
                                        <h4 className="text-base font-medium text-gray-700 mb-3">Strategic Recommendations</h4>

                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mt-0.5 mr-2 flex-shrink-0">
                                                    1
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {trend && trend.includes('increasing')
                                                        ? "Prepare for increased transaction volumes by ensuring adequate staffing and resources."
                                                        : trend === 'stable'
                                                            ? "Maintain current operational capacity as the market shows stability."
                                                            : "Consider strategies to stimulate market activity during the forecasted downturn."}
                                                </div>
                                            </li>

                                            {seasonalPattern && (
                                                <li className="flex items-start">
                                                    <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mt-0.5 mr-2 flex-shrink-0">
                                                        2
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        Plan for peak activity during {seasonalPattern.peak} and {seasonalPattern.secondary},
                                                        and consider promotional activities during {seasonalPattern.low} to balance yearly workload.
                                                    </div>
                                                </li>
                                            )}

                                            <li className="flex items-start">
                                                <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mt-0.5 mr-2 flex-shrink-0">
                                                    {seasonalPattern ? '3' : '2'}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {forecastData.length > 0 && forecastData[forecastData.length - 1].forecastedValue > getMetricValue(historicalData[historicalData.length - 1])
                                                        ? "Invest in process optimization and technology to handle the projected growth efficiently."
                                                        : "Focus on customer retention and service quality during the expected market slowdown."}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Forecast Reliability */}
                                    <div>
                                        <h4 className="text-base font-medium text-gray-700 mb-3">Forecast Reliability</h4>

                                        <div className="flex items-center mb-3">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-indigo-600 h-2.5 rounded-full"
                                                    style={{ width: `${Math.min(100, historicalData.length * 10)}%` }}
                                                ></div>
                                            </div>
                                            <span className="ml-2 text-sm text-gray-600">
                                                {historicalData.length < 4 ? 'Low' : historicalData.length < 8 ? 'Medium' : 'High'}
                                            </span>
                                        </div>

                                        <div className="text-sm text-gray-500 flex items-start">
                                            <Clock size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                                            <p>
                                                This forecast is based on {historicalData.length} historical {viewMode} data points.
                                                {historicalData.length < 6 ? ' More historical data would improve forecast accuracy.' :
                                                    ' The model accounts for historical trends and seasonality patterns.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-4 rounded-md">
                            <p>
                                <strong>Disclaimer:</strong> This forecast is based on historical data analysis and statistical modeling.
                                It should be used as a guidance tool only. External factors such as regulatory changes, economic shifts,
                                or market disruptions may significantly impact actual outcomes. We recommend using this forecast as one
                                of multiple inputs in your decision-making process.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TransactionVolumeForecastingTool;