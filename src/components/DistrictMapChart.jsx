import React, { useState, useMemo } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from 'react-simple-maps';

// This is a simplified India map for demo purposes
// In a real application, you would use a detailed GeoJSON file for UP districts
const INDIA_TOPO_JSON = {
    type: "Topology",
    arcs: [/* Simplified for the example */],
    objects: {
        india: {
            type: "GeometryCollection",
            geometries: [
                /* This would contain actual district geometries */
                /* For demo purposes, we'll mock this functionality */
            ]
        }
    }
};

/**
 * DistrictMapChart - Displays district distribution on a map
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of district data objects with _id, count, and totalValue
 * @returns {JSX.Element} Map of districts color-coded by deed count or value
 */
const DistrictMapChart = ({ data = [] }) => {
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [viewMetric, setViewMetric] = useState('count'); // 'count' or 'value'

    // Generate mock district data for visualization
    // In a real application, you would match real district data with GeoJSON features
    const mockDistricts = useMemo(() => {
        const districts = [
            "Agra", "Aligarh", "Prayagraj", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya",
            "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki",
            "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli",
            "Chitrakoot", "Deoria", "Etah", "Etawah", "Ayodhya", "Farrukhabad", "Fatehpur",
            "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur",
            "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj",
            "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri",
            "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut",
            "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Raebareli",
            "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli",
            "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
        ];

        // Create a map for quick lookup of actual data
        const districtMap = {};
        data.forEach(item => {
            districtMap[item._id] = item;
        });

        // For each district, either use real data or generate mock data
        return districts.map(name => {
            const actualData = districtMap[name];
            return {
                id: name,
                name: name,
                count: actualData ? actualData.count : Math.floor(Math.random() * 100) + 1,
                totalValue: actualData ? actualData.totalValue : Math.floor(Math.random() * 1000000000) + 10000000,
                // Add a position for the district (in a real app, you'd get this from GeoJSON)
                position: [
                    80 + (Math.random() * 4 - 2), // Approx longitude for UP
                    27 + (Math.random() * 4 - 2)  // Approx latitude for UP
                ]
            };
        });
    }, [data]);

    // Get the max values for scaling colors
    const maxCount = Math.max(...mockDistricts.map(d => d.count));
    const maxValue = Math.max(...mockDistricts.map(d => d.totalValue));

    // Color scale function
    const getColor = (value, max) => {
        const normalized = Math.min(value / max, 1);
        // Color scale from light blue to dark blue
        const r = Math.floor(240 - normalized * 140);
        const g = Math.floor(249 - normalized * 139);
        const b = 255;
        return `rgb(${r},${g},${b})`;
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
        return `₹${value}`;
    };

    return (
        <div className="relative">
            {/* View toggle buttons */}
            <div className="absolute top-0 right-0 z-10 flex space-x-2">
                <button
                    onClick={() => setViewMetric('count')}
                    className={`px-2 py-1 text-xs rounded-md ${viewMetric === 'count'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300'
                        }`}
                >
                    Count
                </button>
                <button
                    onClick={() => setViewMetric('value')}
                    className={`px-2 py-1 text-xs rounded-md ${viewMetric === 'value'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300'
                        }`}
                >
                    Value
                </button>
            </div>

            {/* Map legend */}
            <div className="absolute bottom-0 left-0 z-10 p-2 bg-white bg-opacity-80 rounded-md">
                <div className="text-xs font-medium mb-1">
                    {viewMetric === 'count' ? 'Deed Count' : 'Transaction Value'}
                </div>
                <div className="flex items-center space-x-1">
                    <div className="w-4 h-4" style={{ backgroundColor: getColor(0, 1) }}></div>
                    <div className="text-xs">Low</div>
                    <div className="w-12 h-2 bg-gradient-to-r from-blue-100 to-blue-800"></div>
                    <div className="text-xs">High</div>
                </div>
            </div>

            {/* Tooltip */}
            {tooltipContent && (
                <div
                    className="absolute z-20 bg-white p-2 rounded-md shadow-md text-xs pointer-events-none"
                    style={{
                        left: tooltipPosition.x + 10,
                        top: tooltipPosition.y + 10,
                        minWidth: '120px'
                    }}
                >
                    {tooltipContent}
                </div>
            )}

            {/* This is where a real map would be rendered */}
            {/* For this demo, we'll use a simple visualization of district data */}
            <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full bg-blue-50 rounded-lg overflow-hidden">
                    {/* Simplified map visualization */}
                    {mockDistricts.map((district) => {
                        const value = viewMetric === 'count' ? district.count : district.totalValue;
                        const max = viewMetric === 'count' ? maxCount : maxValue;
                        const size = 10 + (value / max) * 30;

                        return (
                            <div
                                key={district.id}
                                className="absolute rounded-full cursor-pointer border border-white"
                                style={{
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    backgroundColor: getColor(value, max),
                                    left: `${(district.position[0] - 76) * 100}px`,
                                    top: `${(31 - district.position[1]) * 100}px`,
                                    transform: 'translate(-50%, -50%)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    setTooltipContent(
                                        <div>
                                            <strong>{district.name}</strong>
                                            <div className="mt-1">
                                                <div>Deeds: {district.count}</div>
                                                <div>Value: {formatValue(district.totalValue)}</div>
                                            </div>
                                        </div>
                                    );
                                    setTooltipPosition({ x: e.clientX, y: e.clientY });
                                }}
                                onMouseMove={(e) => {
                                    setTooltipPosition({ x: e.clientX, y: e.clientY });
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent('');
                                }}
                            />
                        );
                    })}

                    {/* Map center point marker */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
                            Uttar Pradesh
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DistrictMapChart;