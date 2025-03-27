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
    PieChart,
    Pie,
    Cell,
    Sector,
    Treemap,
    LineChart,
    Line
} from 'recharts';

/**
 * MohallaChartWithDropDown - Displays property transaction analysis by locality (mohalla)
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of deed data
 * @param {string} props.view - Chart view type ('value', 'count', 'pricePerSqm', 'landType')
 * @param {number} props.limit - Maximum number of localities to display
 * @returns {JSX.Element} Chart showing property metrics by locality
 */
const MohallaChartWithDropDown = ({ data = [], initialView = 'value', limit = 15 }) => {
    const [view, setView] = useState(initialView);
    const [chartData, setChartData] = useState([]);
    const [activePieIndex, setActivePieIndex] = useState(0);
    const [selectedLocality, setSelectedLocality] = useState(null);
    const [overallStats, setOverallStats] = useState({
        totalLocalities: 0,
        totalTransactions: 0,
        totalValue: 0,
        totalArea: 0
    });
    const [landTypeData, setLandTypeData] = useState([]);

    // Process data when inputs change
    useEffect(() => {
        if (data.length > 0) {
            const processedData = processLocalityData(data);
            // Take top localities based on limit
            const topLocalities = processedData.slice(0, limit);
            setChartData(topLocalities);

            // Get the first locality for details
            if (topLocalities.length > 0 && !selectedLocality) {
                setSelectedLocality(topLocalities[0].name);
            }

            // Calculate overall stats
            setOverallStats({
                totalLocalities: processedData.length,
                totalTransactions: processedData.reduce((sum, item) => sum + item.count, 0),
                totalValue: processedData.reduce((sum, item) => sum + item.totalValue, 0),
                totalArea: processedData.reduce((sum, item) => sum + item.totalArea, 0)
            });

            // Process land type data
            setLandTypeData(analyzeLandTypes(data));
        }
    }, [data, limit, view]);

    /**
     * Process and group deed data by locality
     * @param {Array} deeds - Raw deed data array
     * @returns {Array} Processed locality data
     */
    const processLocalityData = (deeds) => {
        // Group data by locality
        const localityMap = new Map();

        deeds.forEach(deed => {
            if (!deed.locality) return;

            const locality = deed.locality;

            if (!localityMap.has(locality)) {
                localityMap.set(locality, {
                    name: locality,
                    count: 0,
                    totalValue: 0,
                    totalArea: 0,
                    totalStampDuty: 0,
                    deedTypes: new Set(),
                    deeds: []
                });
            }

            const data = localityMap.get(locality);
            data.count += 1;
            data.totalValue += deed.transactionValue || 0;
            data.totalArea += deed.area || 0;
            data.totalStampDuty += deed.stampDuty || 0;
            if (deed.deedType) {
                data.deedTypes.add(deed.deedType);
            }
            data.deeds.push(deed);
        });

        // Calculate metrics and convert to array
        return Array.from(localityMap.values())
            .map(locality => ({
                ...locality,
                deedTypes: Array.from(locality.deedTypes),
                deedTypeCount: locality.deedTypes.size,
                avgValue: locality.count > 0 ? locality.totalValue / locality.count : 0,
                avgArea: locality.count > 0 ? locality.totalArea / locality.count : 0,
                pricePerSqm: locality.totalArea > 0 ? locality.totalValue / locality.totalArea : 0
            }))
            .filter(locality => locality.count > 0)
            .sort((a, b) => {
                // Sort based on selected view
                if (view === 'value') return b.totalValue - a.totalValue;
                if (view === 'count') return b.count - a.count;
                if (view === 'pricePerSqm') return b.pricePerSqm - a.pricePerSqm;
                return b.totalValue - a.totalValue;
            });
    };

    /**
     * Analyze land types by locality
     * @param {Array} deeds - Raw deed data array
     * @returns {Array} Land type analysis by locality
     */
    const analyzeLandTypes = (deeds) => {
        // Group by locality and then land type
        const localityLandTypes = new Map();

        deeds.forEach(deed => {
            if (!deed.locality) return;

            const locality = deed.locality;
            const landType = deed.landType || 'Unknown';

            if (!localityLandTypes.has(locality)) {
                localityLandTypes.set(locality, new Map());
            }

            const landTypeMap = localityLandTypes.get(locality);

            if (!landTypeMap.has(landType)) {
                landTypeMap.set(landType, {
                    count: 0,
                    totalValue: 0
                });
            }

            const data = landTypeMap.get(landType);
            data.count += 1;
            data.totalValue += deed.transactionValue || 0;
        });

        // Convert to structured array
        const result = [];

        localityLandTypes.forEach((landTypeMap, locality) => {
            const landTypes = Array.from(landTypeMap.entries()).map(([type, data]) => ({
                name: type,
                count: data.count,
                value: data.totalValue
            }));

            result.push({
                locality,
                landTypes: landTypes.sort((a, b) => b.count - a.count)
            });
        });

        return result;
    };

    // Format large numbers for display
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

    // Format price per square meter
    const formatPricePerSqm = (value) => {
        if (value >= 100000) {
            return `₹${(value / 100000).toFixed(2)}L/sqm`;
        } else if (value >= 1000) {
            return `₹${(value / 1000).toFixed(1)}K/sqm`;
        }
        return `₹${value.toFixed(0)}/sqm`;
    };

    // Format property area
    const formatArea = (area) => {
        return `${area.toFixed(1)} sqm`;
    };

    // Custom tooltip for bar chart
    const CustomBarTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
                    <p className="font-medium">{data.name}</p>
                    <div className="text-sm mt-1 space-y-1">
                        <p className="text-indigo-700">Total Value: {formatValue(data.totalValue)}</p>
                        <p className="text-gray-700">Number of Deeds: {data.count}</p>
                        <p className="text-gray-700">Avg. Property Value: {formatValue(data.avgValue)}</p>
                        <p className="text-gray-700">
                            Price per sqm: {formatPricePerSqm(data.pricePerSqm)}
                        </p>
                        <p className="text-gray-700">Total Area: {formatArea(data.totalArea)}</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    // Render active pie sector
    const renderActiveShape = (props) => {
        const {
            cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
            fill, payload, percent, value
        } = props;

        const sin = Math.sin(-midAngle * Math.PI / 180);
        const cos = Math.cos(-midAngle * Math.PI / 180);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={12}>
                    {payload.name}
                </text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#666" fontSize={12}>
                    {`${formatValue(value)} (${(percent * 100).toFixed(1)}%)`}
                </text>
            </g>
        );
    };

    // Get land type data for selected locality
    const getLocalityLandTypes = () => {
        if (!selectedLocality) return [];

        const localityData = landTypeData.find(item => item.locality === selectedLocality);
        return localityData ? localityData.landTypes : [];
    };

    // Get colors for chart elements
    const COLORS = [
        '#4f46e5', '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981',
        '#84cc16', '#eab308', '#f59e0b', '#ef4444', '#ec4899'
    ];

    // View type options for dropdown
    const viewOptions = [
        { value: 'value', label: 'Transaction Value' },
        { value: 'pricePerSqm', label: 'Price per Square Meter' },
        { value: 'count', label: 'Transaction Count' },
        { value: 'landType', label: 'Land Type Distribution' }
    ];

    // Handle view change
    const handleViewChange = (e) => {
        setView(e.target.value);
    };

    // If no data, show placeholder
    if (chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No locality data available</p>
            </div>
        );
    }

    // Common chart header with view selector
    const renderChartHeader = (title) => (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
            <h3 className="text-lg font-medium">{title}</h3>

            <div className="flex items-center space-x-2">
                <label htmlFor="view-selector" className="text-sm font-medium text-gray-700">
                    View:
                </label>
                <select
                    id="view-selector"
                    className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={view}
                    onChange={handleViewChange}
                >
                    {viewOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="text-sm font-medium ml-2 text-indigo-700">
                    {chartData.length} of {overallStats.totalLocalities} localities
                </div>
            </div>
        </div>
    );

    // Render transaction value view
    if (view === 'value') {
        return (
            <div className="bg-white p-4 rounded-lg shadow">
                {renderChartHeader('Property Values by Locality (Mohalla)')}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 11 }}
                                    interval={0}
                                    angle={-45}
                                    textAnchor="end"
                                />
                                <YAxis
                                    tickFormatter={formatValue}
                                    tick={{ fontSize: 11 }}
                                />
                                <Tooltip content={<CustomBarTooltip />} />
                                <Bar
                                    dataKey="totalValue"
                                    name="Total Transaction Value"
                                    fill="#4f46e5"
                                    onClick={(data) => setSelectedLocality(data.name)}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.name === selectedLocality ? '#ef4444' : COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="h-80">
                        <div className="mb-2 text-sm font-medium text-gray-700">
                            Land Type Distribution in {selectedLocality || 'Selected Locality'}
                        </div>
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <Pie
                                    activeIndex={activePieIndex}
                                    activeShape={renderActiveShape}
                                    data={getLocalityLandTypes()}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={(_, index) => setActivePieIndex(index)}
                                >
                                    {getLocalityLandTypes().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => formatValue(value)}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg">
                        <div className="text-xs uppercase text-indigo-700">Total Value</div>
                        <div className="text-lg font-medium">{formatValue(overallStats.totalValue)}</div>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                        <div className="text-xs uppercase text-indigo-700">Total Area</div>
                        <div className="text-lg font-medium">{formatArea(overallStats.totalArea)}</div>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                        <div className="text-xs uppercase text-indigo-700">Transactions</div>
                        <div className="text-lg font-medium">{overallStats.totalTransactions}</div>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                        <div className="text-xs uppercase text-indigo-700">Avg Price/sqm</div>
                        <div className="text-lg font-medium">
                            {formatPricePerSqm(overallStats.totalArea ? overallStats.totalValue / overallStats.totalArea : 0)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Render price per square meter view
    if (view === 'pricePerSqm') {
        // Sort data by price per sqm
        const sortedData = [...chartData].sort((a, b) => b.pricePerSqm - a.pricePerSqm);

        return (
            <div className="bg-white p-4 rounded-lg shadow">
                {renderChartHeader('Price per Square Meter by Locality')}

                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={sortedData}
                            margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                            layout="vertical"
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                            <XAxis
                                type="number"
                                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={150}
                                tick={{ fontSize: 11 }}
                            />
                            <Tooltip
                                formatter={(value) => formatPricePerSqm(value)}
                                labelFormatter={(value) => `Locality: ${value}`}
                            />
                            <Legend />
                            <Bar
                                dataKey="pricePerSqm"
                                name="Price per Square Meter"
                                fill="#10b981"
                            >
                                {sortedData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Top 5 Highest Value Localities</h4>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Locality</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Price/sqm</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Avg Area</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Avg Value</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedData.slice(0, 5).map((locality, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-2 text-xs text-gray-800 max-w-[200px] break-words">{locality.name}</td>
                                        <td className="px-3 py-2 text-xs text-emerald-700 font-medium text-right">{formatPricePerSqm(locality.pricePerSqm)}</td>
                                        <td className="px-3 py-2 text-xs text-gray-800 text-right">{formatArea(locality.avgArea)}</td>
                                        <td className="px-3 py-2 text-xs text-gray-800 text-right">{formatValue(locality.avgValue)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    // Render transaction count view
    if (view === 'count') {
        // Sort data by transaction count
        const sortedData = [...chartData].sort((a, b) => b.count - a.count);

        return (
            <div className="bg-white p-4 rounded-lg shadow">
                {renderChartHeader('Transaction Volume by Locality')}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={sortedData}
                                margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 11 }}
                                    interval={0}
                                    angle={-45}
                                    textAnchor="end"
                                />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => `${value} transactions`}
                                    labelFormatter={(value) => `Locality: ${value}`}
                                />
                                <Bar
                                    dataKey="count"
                                    name="Transaction Count"
                                    fill="#3b82f6"
                                >
                                    {sortedData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sortedData.slice(0, 5)}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="count"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {sortedData.slice(0, 5).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => `${value} transactions`}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-xs uppercase text-blue-700">Top Locality</div>
                        <div className="text-lg font-medium truncate">{sortedData[0]?.name || 'N/A'}</div>
                        <div className="text-xs text-gray-600">{sortedData[0]?.count || 0} transactions</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-xs uppercase text-blue-700">Avg Transactions</div>
                        <div className="text-lg font-medium">
                            {(overallStats.totalTransactions / overallStats.totalLocalities || 0).toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-600">per locality</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-xs uppercase text-blue-700">Top 5 Share</div>
                        <div className="text-lg font-medium">
                            {((sortedData.slice(0, 5).reduce((sum, item) => sum + item.count, 0) /
                                overallStats.totalTransactions) * 100 || 0).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-600">of all transactions</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-xs uppercase text-blue-700">Active Localities</div>
                        <div className="text-lg font-medium">{overallStats.totalLocalities}</div>
                        <div className="text-xs text-gray-600">with transactions</div>
                    </div>
                </div>
            </div>
        );
    }

    // Render land type view (default fallback)
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            {renderChartHeader('Land Type Distribution by Locality')}

            <div className="h-80 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                        data={chartData}
                        dataKey="totalValue"
                        nameKey="name"
                        aspectRatio={4 / 3}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                onClick={() => setSelectedLocality(entry.name)}
                            />
                        ))}
                        <Tooltip
                            formatter={(value) => formatValue(value)}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;

                                    return (
                                        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
                                            <p className="font-medium">{data.name}</p>
                                            <div className="text-xs mt-1 space-y-1">
                                                <p>Total Value: {formatValue(data.totalValue)}</p>
                                                <p>Transactions: {data.count}</p>
                                                <p>Land Types: {data.deedTypeCount}</p>
                                                <p>Click to view details</p>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </Treemap>
                </ResponsiveContainer>
            </div>

            <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Land Type Distribution in {selectedLocality || 'No locality selected'}
                </h4>

                <div className="h-64">
                    {getLocalityLandTypes().length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={getLocalityLandTypes()}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {getLocalityLandTypes().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => formatValue(value)}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Select a locality to view land type distribution
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MohallaChartWithDropDown;