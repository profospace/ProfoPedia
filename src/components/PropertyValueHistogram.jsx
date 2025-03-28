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
    LineChart,
    Line
} from 'recharts';
import _ from 'lodash';

const PropertyValueHistogram = ({ data }) => {
    const [chartData, setChartData] = useState([]);
    const [averageData, setAverageData] = useState([]);
    const [dateRange, setDateRange] = useState({
        min: null,
        max: null
    });
    const [selectedDateRange, setSelectedDateRange] = useState({
        start: null,
        end: null
    });
    const [selectedLocality, setSelectedLocality] = useState('all');
    const [localities, setLocalities] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState('all');
    const [selectedPropertyType, setSelectedPropertyType] = useState('all');
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    // Define duration options
    const durationOptions = [
        { value: 'all', label: 'All Time' },
        { value: '3', label: 'Last 3 Months' },
        { value: '6', label: 'Last 6 Months' },
        { value: '9', label: 'Last 9 Months' },
        { value: '12', label: 'Last 12 Months' },
        { value: '24', label: 'Last 24 Months' },
        { value: 'custom', label: 'Custom Range' }
    ];

    // Initialize localities, property types, and date ranges from data
    useEffect(() => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            setError("No data provided or invalid data format");
            setLoading(false);
            return;
        }

        try {
            // Extract all unique localities
            const allLocalities = _.uniq(data
                .filter(item => item.locality && item.locality.trim() !== '')
                .map(item => item.locality));

            setLocalities(['all', ...allLocalities]);

            // Extract all unique property types (landType)
            const allPropertyTypes = _.uniq(data
                .filter(item => item.landType && item.landType.trim() !== '')
                .map(item => item.landType));

            // If we have no landType values, create a default "Unknown" type
            if (allPropertyTypes.length === 0) {
                setPropertyTypes(['all', 'Unknown']);
            } else {
                setPropertyTypes(['all', ...allPropertyTypes]);
            }

            // Extract date range
            const dates = data
                .filter(item => item.registrationDateParsed)
                .map(item => new Date(item.registrationDateParsed));

            if (dates.length > 0) {
                const minDate = new Date(Math.min(...dates));
                const maxDate = new Date(Math.max(...dates));

                setDateRange({
                    min: minDate,
                    max: maxDate
                });

                setSelectedDateRange({
                    start: minDate,
                    end: maxDate
                });
            }

            setLoading(false);
        } catch (err) {
            console.error("Error initializing component:", err);
            setError("Error processing data: " + err.message);
            setLoading(false);
        }
    }, [data]);

    // Handle duration selection and update date range accordingly
    useEffect(() => {
        if (!dateRange.max || selectedDuration === 'custom') {
            return;
        }

        const endDate = new Date(dateRange.max);
        let startDate;

        if (selectedDuration === 'all') {
            startDate = new Date(dateRange.min);
        } else {
            // Calculate start date based on selected duration (in months)
            startDate = new Date(endDate);
            startDate.setMonth(startDate.getMonth() - parseInt(selectedDuration));

            // If calculated start date is before min date, use min date
            if (startDate < dateRange.min) {
                startDate = new Date(dateRange.min);
            }
        }

        setSelectedDateRange({
            start: startDate,
            end: endDate
        });
    }, [selectedDuration, dateRange]);

    // Filter data based on selected locality, property type, and date range
    useEffect(() => {
        if (!data || !Array.isArray(data) || data.length === 0 || !selectedDateRange.start || !selectedDateRange.end) {
            return;
        }

        try {
            // First, filter by date range
            let filtered = data.filter(item => {
                const itemDate = new Date(item.registrationDateParsed);
                return itemDate >= selectedDateRange.start && itemDate <= selectedDateRange.end;
            });

            // Then, filter by locality if not 'all'
            if (selectedLocality !== 'all') {
                filtered = filtered.filter(item => item.locality === selectedLocality);
            }

            // Finally, filter by property type if not 'all'
            if (selectedPropertyType !== 'all') {
                if (selectedPropertyType === 'Unknown') {
                    // For "Unknown" type, include items with empty or missing landType
                    filtered = filtered.filter(item => !item.landType || item.landType.trim() === '');
                } else {
                    filtered = filtered.filter(item => item.landType === selectedPropertyType);
                }
            }

            // Set the filtered data
            setFilteredData(filtered);
        } catch (err) {
            console.error("Error filtering data:", err);
            setError("Error filtering data: " + err.message);
        }
    }, [data, selectedDateRange, selectedLocality, selectedPropertyType]);

    // Process filtered data for charts
    useEffect(() => {
        if (filteredData.length === 0) {
            setChartData([]);
            setAverageData([]);
            return;
        }

        setLoading(true);

        try {
            // Calculate price per square meter for each property
            const pricePerSqmData = filteredData
                .filter(item => item.area && item.area > 0 && item.transactionValue)
                .map(item => {
                    const pricePerSqm = item.transactionValue / item.area;
                    return {
                        id: item._id,
                        date: new Date(item.registrationDateParsed),
                        pricePerSqm,
                        khasraNumber: item.khasraNumber,
                        locality: item.locality,
                        deedType: item.deedType,
                        landType: item.landType || 'Unknown',
                        transactionValue: item.transactionValue,
                        area: item.area,
                        formattedDate: new Date(item.registrationDateParsed).toLocaleDateString()
                    };
                });

            // Group by month and year
            const groupedByMonth = _.groupBy(pricePerSqmData, (item) =>
                `${item.date.getFullYear()}-${String(item.date.getMonth() + 1).padStart(2, '0')}`
            );

            // Calculate monthly statistics
            const monthlyStats = Object.keys(groupedByMonth).map(yearMonth => {
                const items = groupedByMonth[yearMonth];
                const totalValue = _.sumBy(items, 'pricePerSqm');
                const avgValue = totalValue / items.length;

                // Format the month for display
                const [year, month] = yearMonth.split('-');
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const displayMonth = `${monthNames[parseInt(month) - 1]} ${year}`;

                return {
                    yearMonth,
                    displayMonth,
                    average: avgValue,
                    min: _.minBy(items, 'pricePerSqm').pricePerSqm,
                    max: _.maxBy(items, 'pricePerSqm').pricePerSqm,
                    count: items.length,
                    sortKey: `${year}${month}` // For sorting
                };
            }).sort((a, b) => a.sortKey - b.sortKey);

            // Prepare chart data for the bar chart
            const formattedChartData = monthlyStats.map(stat => ({
                name: stat.displayMonth,
                average: Math.round(stat.average / 1000), // Convert to thousands for readability
                min: Math.round(stat.min / 1000),
                max: Math.round(stat.max / 1000),
                count: stat.count
            }));

            // Prepare trend line data
            const trendData = monthlyStats.map(stat => ({
                name: stat.displayMonth,
                value: Math.round(stat.average / 1000)
            }));

            setChartData(formattedChartData);
            setAverageData(trendData);
            setLoading(false);
        } catch (err) {
            console.error("Error processing data:", err);
            setError("Error processing data: " + err.message);
            setLoading(false);
        }
    }, [filteredData]);

    // Handle locality change
    const handleLocalityChange = (e) => {
        setSelectedLocality(e.target.value);
    };

    // Handle property type change
    const handlePropertyTypeChange = (e) => {
        setSelectedPropertyType(e.target.value);
    };

    // Handle duration change
    const handleDurationChange = (e) => {
        setSelectedDuration(e.target.value);
    };

    // Handle date range change
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setSelectedDateRange(prev => ({
            ...prev,
            [name]: value ? new Date(value) : null
        }));

        // If manually changing dates, switch to custom duration
        setSelectedDuration('custom');
    };

    // Format date for input fields
    const formatDateForInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };

    // Get property type display name
    const getPropertyTypeDisplayName = (type) => {
        if (type === 'all') return 'All Types';
        if (type === 'Unknown') return 'Unknown';

        // Return the property type as is, or a shortened version if it's too long
        return type.length > 20 ? type.substring(0, 20) + '...' : type;
    };

    if (loading && !chartData.length && !localities.length) {
        return <div className="flex justify-center items-center h-64">
            <p className="text-lg font-medium text-gray-600">Loading data...</p>
        </div>;
    }

    if (error) {
        return <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">
            <p>{error}</p>
        </div>;
    }

    // Calculate trend direction
    let trendDirection = "stagnant";
    if (averageData.length >= 2) {
        const firstValue = averageData[0].value;
        const lastValue = averageData[averageData.length - 1].value;
        const percentChange = ((lastValue - firstValue) / firstValue) * 100;

        if (percentChange > 5) {
            trendDirection = "increasing";
        } else if (percentChange < -5) {
            trendDirection = "decreasing";
        }
    }

    // Get trend color
    const getTrendColor = () => {
        switch (trendDirection) {
            case "increasing": return "text-green-600";
            case "decreasing": return "text-red-600";
            default: return "text-blue-600";
        }
    };

    // Calculate price change percentage
    const getPriceChangePercentage = () => {
        if (averageData.length < 2) return 0;

        const firstValue = averageData[0].value;
        const lastValue = averageData[averageData.length - 1].value;
        return ((lastValue - firstValue) / firstValue) * 100;
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">Property Value Histogram</h2>
                <p className="text-gray-600">
                    Price per square meter (in thousands) over time
                </p>
            </div>

            {/* Filter controls */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Locality selector */}
                <div className="w-full">
                    <label htmlFor="locality" className="block text-sm font-medium text-gray-700 mb-1">
                        Village/Mohalla:
                    </label>
                    <select
                        id="locality"
                        name="locality"
                        value={selectedLocality}
                        onChange={handleLocalityChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                        <option value="all">All Localities</option>
                        {localities.filter(loc => loc !== 'all').map((locality, index) => (
                            <option key={index} value={locality}>
                                {locality}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Property Type selector */}
                <div className="w-full">
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                        Property Type:
                    </label>
                    <select
                        id="propertyType"
                        name="propertyType"
                        value={selectedPropertyType}
                        onChange={handlePropertyTypeChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        title={selectedPropertyType !== 'all' ? selectedPropertyType : ''}
                    >
                        <option value="all">All Property Types</option>
                        {propertyTypes.filter(type => type !== 'all').map((type, index) => (
                            <option key={index} value={type} title={type}>
                                {getPropertyTypeDisplayName(type)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Duration selector */}
                <div className="w-full">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                        Time Period:
                    </label>
                    <select
                        id="duration"
                        name="duration"
                        value={selectedDuration}
                        onChange={handleDurationChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                        {durationOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Custom date range (visible only when custom duration is selected) */}
            {selectedDuration === 'custom' && (
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                        <label htmlFor="start" className="block text-sm font-medium text-gray-700 mb-1">
                            From:
                        </label>
                        <input
                            type="date"
                            id="start"
                            name="start"
                            value={formatDateForInput(selectedDateRange.start)}
                            min={formatDateForInput(dateRange.min)}
                            max={formatDateForInput(dateRange.max)}
                            onChange={handleDateChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="end" className="block text-sm font-medium text-gray-700 mb-1">
                            To:
                        </label>
                        <input
                            type="date"
                            id="end"
                            name="end"
                            value={formatDateForInput(selectedDateRange.end)}
                            min={formatDateForInput(dateRange.min)}
                            max={formatDateForInput(dateRange.max)}
                            onChange={handleDateChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
            )}

            {/* Active filters summary */}
            <div className="mb-6 bg-blue-50 p-3 rounded-md text-sm">
                <h4 className="font-medium text-blue-800 mb-1">Active Filters:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1 text-blue-700">
                    <div>
                        <span className="font-medium">Location:</span> {selectedLocality === 'all' ? 'All Localities' : selectedLocality}
                    </div>
                    <div>
                        <span className="font-medium">Property Type:</span> {selectedPropertyType === 'all' ? 'All Types' : getPropertyTypeDisplayName(selectedPropertyType)}
                        {selectedPropertyType !== 'all' && selectedPropertyType !== 'Unknown' && (
                            <span className="ml-1 cursor-help text-blue-500" title={selectedPropertyType}>
                                ⓘ
                            </span>
                        )}
                    </div>
                    <div>
                        <span className="font-medium">Period:</span> {selectedDateRange.start?.toLocaleDateString()} - {selectedDateRange.end?.toLocaleDateString()}
                    </div>
                </div>
                {averageData.length >= 2 && (
                    <div className={`mt-2 font-medium ${getTrendColor()}`}>
                        Price Trend: <span className="capitalize">{trendDirection}</span>
                        <span className="ml-2">
                            ({getPriceChangePercentage().toFixed(2)}% change)
                        </span>
                    </div>
                )}
            </div>

            {chartData.length > 0 ? (
                <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
                    <div className="w-full md:w-3/5">
                        <p className="text-sm text-gray-600 mb-2">Value Distribution by Month</p>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{ top: 10, right: 30, left: 20, bottom: 70 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis
                                        label={{
                                            value: 'Price per sqm (thousands)',
                                            angle: -90,
                                            position: 'insideLeft',
                                            style: { textAnchor: 'middle' }
                                        }}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`${value} thousand per sqm`]}
                                        labelFormatter={(label) => `Month: ${label}`}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="average"
                                        fill="#8884d8"
                                        name="Average Price/sqm"
                                    />
                                    <Bar
                                        dataKey="min"
                                        fill="#82ca9d"
                                        name="Min Price/sqm"
                                    />
                                    <Bar
                                        dataKey="max"
                                        fill="#ffc658"
                                        name="Max Price/sqm"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="w-full md:w-2/5">
                        <p className="text-sm text-gray-600 mb-2">Price Trend Over Time</p>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={averageData}
                                    margin={{ top: 10, right: 30, left: 20, bottom: 70 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis
                                        label={{
                                            value: 'Avg Price (thousands)',
                                            angle: -90,
                                            position: 'insideLeft',
                                            style: { textAnchor: 'middle' }
                                        }}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`${value} thousand per sqm`]}
                                        labelFormatter={(label) => `Month: ${label}`}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={trendDirection === "increasing" ? "#16a34a" :
                                            trendDirection === "decreasing" ? "#dc2626" : "#2563eb"}
                                        name="Average Price/sqm"
                                        strokeWidth={3}
                                        dot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
                    <p className="text-lg font-medium text-gray-600">
                        {loading ? "Loading data..." : "No data available for the selected filters"}
                    </p>
                </div>
            )}

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Data Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li><span className="font-medium">Locality:</span> {selectedLocality === 'all' ? 'All Localities' : selectedLocality}</li>
                            <li><span className="font-medium">Property Type:</span> {selectedPropertyType === 'all' ? 'All Types' : selectedPropertyType}</li>
                            <li><span className="font-medium">Properties analyzed:</span> {filteredData.filter(item => item.area && item.area > 0).length}</li>
                            <li><span className="font-medium">Time period:</span> {selectedDateRange.start?.toLocaleDateString()} to {selectedDateRange.end?.toLocaleDateString()}</li>
                        </ul>
                    </div>
                    <div>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li><span className="font-medium">Market trend:</span> <span className={`capitalize ${getTrendColor()}`}>{trendDirection}</span></li>
                            {chartData.length >= 2 && (
                                <>
                                    <li>
                                        <span className="font-medium">Price change:</span>
                                        <span className={getTrendColor()}>
                                            {getPriceChangePercentage().toFixed(2)}%
                                        </span>
                                        over the period
                                    </li>
                                    <li>
                                        <span className="font-medium">Initial price:</span> ₹{(averageData[0].value * 1000).toLocaleString()} per sqm
                                    </li>
                                    <li>
                                        <span className="font-medium">Current price:</span> ₹{(averageData[averageData.length - 1].value * 1000).toLocaleString()} per sqm
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyValueHistogram;