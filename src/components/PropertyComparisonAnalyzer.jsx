import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar } from 'recharts';
import { Filter, Map, Calendar, BarChart2 } from 'lucide-react';
import _ from 'lodash';

const PropertyComparisonAnalyzer = ({ data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [filterYear, setFilterYear] = useState('all');
    const [filterDistrict, setFilterDistrict] = useState('all');
    const [filterLandType, setFilterLandType] = useState('all');
    const [viewMode, setViewMode] = useState('scatter'); // scatter, radar, district
    const [segmentData, setSegmentData] = useState([]);
    const [districtComparison, setDistrictComparison] = useState([]);
    const [yearList, setYearList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [landTypeList, setLandTypeList] = useState([]);

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Extract filter options
        const years = [...new Set(data.map(deed => {
            const regDate = deed.registrationDateParsed
                ? new Date(deed.registrationDateParsed)
                : new Date(deed.registrationDate);
            return regDate.getFullYear();
        }))].sort();

        const districts = [...new Set(data.map(deed => deed.district))].filter(Boolean);
        const landTypes = [...new Set(data.map(deed => deed.landType))].filter(Boolean);

        setYearList(years);
        setDistrictList(districts);
        setLandTypeList(landTypes);

        // Apply filters and process data
        processData();
    }, [data, filterYear, filterDistrict, filterLandType, viewMode]);

    const processData = () => {
        if (!data || data.length === 0) return;

        // Apply filters
        let processedData = [...data];

        if (filterYear !== 'all') {
            const year = parseInt(filterYear);
            processedData = processedData.filter(deed => {
                const regDate = deed.registrationDateParsed
                    ? new Date(deed.registrationDateParsed)
                    : new Date(deed.registrationDate);
                return regDate.getFullYear() === year;
            });
        }

        if (filterDistrict !== 'all') {
            processedData = processedData.filter(deed => deed.district === filterDistrict);
        }

        if (filterLandType !== 'all') {
            processedData = processedData.filter(deed => deed.landType === filterLandType);
        }

        // Format data for scatter plot
        const scatterData = processedData.map(deed => {
            // Calculate price per square meter
            const pricePerSqm = deed.transactionValue && deed.area
                ? deed.transactionValue / deed.area
                : 0;

            return {
                id: deed._id,
                area: deed.area || 0,
                price: deed.transactionValue || 0,
                pricePerSqm,
                district: deed.district || 'Unknown',
                locality: deed.locality || 'Unknown',
                landType: deed.landType || 'Unknown',
                propertyDescription: deed.propertyDescription || '',
                deedType: deed.deedType || 'Unknown',
                registrationDate: deed.registrationDate || 'Unknown'
            };
        });

        setFilteredData(scatterData);

        // Prepare market segmentation data (by land type and district)
        prepareSegmentData(processedData);

        // Prepare district comparison
        prepareDistrictComparison(processedData);
    };

    const prepareSegmentData = (processedData) => {
        // Group by land type
        const groupedByLandType = _.groupBy(processedData, 'landType');

        const radarData = [];

        Object.entries(groupedByLandType).forEach(([landType, deeds]) => {
            if (!landType || landType === 'undefined') return;

            // Calculate metrics
            const count = deeds.length;
            const totalValue = _.sumBy(deeds, 'transactionValue') || 0;
            const totalArea = _.sumBy(deeds, 'area') || 0;
            const avgValue = count > 0 ? totalValue / count : 0;
            const avgArea = count > 0 ? totalArea / count : 0;
            const avgPricePerSqm = totalArea > 0 ? totalValue / totalArea : 0;

            // Create a more readable land type label
            let landTypeLabel = landType;
            if (landType === 'कृषि') landTypeLabel = 'Agricultural';

            radarData.push({
                landType: landTypeLabel,
                transactions: count,
                avgValue: avgValue / 10000, // Scale down for better radar visualization
                avgArea,
                avgPricePerSqm: avgPricePerSqm / 100 // Scale down for better radar visualization
            });
        });

        setSegmentData(radarData);
    };

    const prepareDistrictComparison = (processedData) => {
        // Group by district
        const groupedByDistrict = _.groupBy(processedData, 'district');

        const districtData = [];

        Object.entries(groupedByDistrict).forEach(([district, deeds]) => {
            if (!district || district === 'undefined') return;

            // Calculate metrics
            const count = deeds.length;
            const totalValue = _.sumBy(deeds, 'transactionValue') || 0;
            const totalArea = _.sumBy(deeds, 'area') || 0;
            const avgValue = count > 0 ? totalValue / count : 0;
            const avgPricePerSqm = totalArea > 0 ? totalValue / totalArea : 0;

            districtData.push({
                district,
                transactions: count,
                totalValue,
                avgValue,
                avgPricePerSqm
            });
        });

        // Sort by average price per sqm
        const sortedDistricts = _.orderBy(districtData, ['avgPricePerSqm'], ['desc']);
        setDistrictComparison(sortedDistricts);
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-4 border rounded shadow-md">
                    <p className="font-semibold">{data.locality || 'Unknown Location'}</p>
                    <p className="text-sm text-gray-600">District: {data.district}</p>
                    <p className="text-sm text-gray-600">Land Type: {data.landType}</p>
                    <div className="mt-2">
                        <p className="text-sm">Area: {data.area.toFixed(2)} sq.m</p>
                        <p className="text-sm">Price: ₹{(data.price / 100000).toFixed(2)} Lakhs</p>
                        <p className="text-sm">Price/sq.m: ₹{data.pricePerSqm.toFixed(2)}</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Property Comparison & Market Segmentation</h2>

                <div className="flex flex-wrap gap-2">
                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-gray-100 rounded-md">
                        <button
                            onClick={() => setViewMode('scatter')}
                            className={`px-3 py-2 text-sm rounded-l-md ${viewMode === 'scatter' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            Scatter
                        </button>
                        <button
                            onClick={() => setViewMode('radar')}
                            className={`px-3 py-2 text-sm ${viewMode === 'radar' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            Segments
                        </button>
                        <button
                            onClick={() => setViewMode('district')}
                            className={`px-3 py-2 text-sm rounded-r-md ${viewMode === 'district' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            Districts
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Filters:</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    <select
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={filterYear}
                        onChange={(e) => setFilterYear(e.target.value)}
                    >
                        <option value="all">All Years</option>
                        {yearList.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>

                    <select
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={filterDistrict}
                        onChange={(e) => setFilterDistrict(e.target.value)}
                    >
                        <option value="all">All Districts</option>
                        {districtList.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>

                    <select
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={filterLandType}
                        onChange={(e) => setFilterLandType(e.target.value)}
                    >
                        <option value="all">All Land Types</option>
                        {landTypeList.map(landType => (
                            <option key={landType} value={landType}>{landType}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Main Visualization */}
            <div className="mb-6">
                {viewMode === 'scatter' && (
                    <div className="h-96">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Property Price vs Area</h3>
                        {filteredData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart
                                    margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
                                >
                                    <CartesianGrid />
                                    <XAxis
                                        type="number"
                                        dataKey="area"
                                        name="Area"
                                        unit=" sq.m"
                                        label={{ value: 'Area (sq.m)', position: 'insideBottom', offset: -10 }}
                                    />
                                    <YAxis
                                        type="number"
                                        dataKey="price"
                                        name="Price"
                                        unit=" ₹"
                                        label={{ value: 'Price (₹)', angle: -90, position: 'insideLeft' }}
                                    />
                                    <ZAxis
                                        type="number"
                                        dataKey="pricePerSqm"
                                        range={[60, 400]}
                                        name="Price per sq.m"
                                        unit=" ₹/sq.m"
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Scatter
                                        name="Properties"
                                        data={filteredData}
                                        fill="#8884d8"
                                        shape="circle"
                                    />
                                </ScatterChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No data available with current filters</p>
                            </div>
                        )}
                    </div>
                )}

                {viewMode === 'radar' && (
                    <div className="h-96">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Market Segment Comparison</h3>
                        {segmentData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={segmentData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="landType" />
                                    <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
                                    <Radar
                                        name="Avg. Value (₹10K)"
                                        dataKey="avgValue"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.6}
                                    />
                                    <Radar
                                        name="Avg. Area (sq.m)"
                                        dataKey="avgArea"
                                        stroke="#82ca9d"
                                        fill="#82ca9d"
                                        fillOpacity={0.6}
                                    />
                                    <Radar
                                        name="Price/sq.m (₹100)"
                                        dataKey="avgPricePerSqm"
                                        stroke="#ffc658"
                                        fill="#ffc658"
                                        fillOpacity={0.6}
                                    />
                                    <Legend />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No segment data available with current filters</p>
                            </div>
                        )}
                    </div>
                )}

                {viewMode === 'district' && (
                    <div className="h-96">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">District Price Comparison</h3>
                        {districtComparison.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={districtComparison}
                                    layout="vertical"
                                    margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis
                                        type="category"
                                        dataKey="district"
                                        width={80}
                                    />
                                    <Tooltip
                                        formatter={(value, name) => {
                                            if (name === 'Avg. Price/sq.m') return [`₹${value.toFixed(2)}`, name];
                                            if (name === 'Avg. Property Value') return [`₹${(value / 100000).toFixed(2)} Lakhs`, name];
                                            return [value, name];
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="avgPricePerSqm"
                                        name="Avg. Price/sq.m"
                                        fill="#8884d8"
                                    />
                                    <Bar
                                        dataKey="avgValue"
                                        name="Avg. Property Value"
                                        fill="#82ca9d"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No district comparison data available with current filters</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Insights and Analysis */}
            <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Market Analysis Insights</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-base font-semibold text-gray-700 mb-2">Value Trends</h4>
                        <ul className="space-y-2 text-sm">
                            {filteredData.length > 0 && (
                                <>
                                    <li className="flex items-start">
                                        <span className="text-indigo-500 mr-2">•</span>
                                        <span>
                                            Average price per square meter:
                                            ₹{(filteredData.reduce((sum, item) => sum + item.pricePerSqm, 0) / filteredData.length).toFixed(2)}
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-indigo-500 mr-2">•</span>
                                        <span>
                                            Price range: ₹{Math.min(...filteredData.map(item => item.pricePerSqm)).toFixed(2)} -
                                            ₹{Math.max(...filteredData.map(item => item.pricePerSqm)).toFixed(2)} per sq.m
                                        </span>
                                    </li>
                                </>
                            )}
                            {segmentData.length > 0 && (
                                <li className="flex items-start">
                                    <span className="text-indigo-500 mr-2">•</span>
                                    <span>
                                        Most valuable land type: {segmentData.sort((a, b) => b.avgPricePerSqm - a.avgPricePerSqm)[0].landType}
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-base font-semibold text-gray-700 mb-2">Market Recommendations</h4>
                        <ul className="space-y-2 text-sm">
                            {districtComparison.length > 0 && (
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">▲</span>
                                    <span>
                                        Top area: {districtComparison[0].district} with highest average price per sq.m
                                    </span>
                                </li>
                            )}
                            {districtComparison.length > 0 && (
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    <span>
                                        Highest value district: {districtComparison[0].district}
                                        (₹{districtComparison[0].avgPricePerSqm.toFixed(2)} per sq.m)
                                    </span>
                                </li>
                            )}
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                <span>
                                    Consider {viewMode === 'scatter' ? 'segment and district' :
                                        viewMode === 'radar' ? 'property size and district' :
                                            'property size and segment'} analysis for more detailed insights.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyComparisonAnalyzer;