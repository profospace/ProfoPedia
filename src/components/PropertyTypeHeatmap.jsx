import React, { useState, useEffect, useMemo } from 'react';

/**
 * PropertyTypeHeatmap - Displays geographical concentration of property types
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of deed data
 * @param {string} props.selectedType - Selected property type to display
 * @returns {JSX.Element} Heatmap showing concentration of property types by area
 */
const PropertyTypeHeatmap = ({ data = [], selectedType = 'all' }) => {
    const [districtData, setDistrictData] = useState([]);
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [propertyTypes, setPropertyTypes] = useState([]);

    // Process property data by district and type
    useEffect(() => {
        processDistrictData();
    }, [data, selectedType]);

    // Generate district-level statistics for property types
    const processDistrictData = () => {
        // Group data by district and property type
        const districtStats = {};
        const typeSet = new Set(['all']);

        data.forEach(deed => {
            const district = deed.district || 'Unknown';
            const propertyType = categorizePropertyType(deed);
            typeSet.add(propertyType);

            // Initialize district if needed
            if (!districtStats[district]) {
                districtStats[district] = {
                    total: 0,
                    types: {
                        'Flat': 0,
                        'House': 0,
                        'Bungalow': 0,
                        'Commercial': 0,
                        'Agricultural': 0,
                        'Plot': 0,
                        'Others': 0
                    },
                    totalValue: 0,
                    valueByType: {
                        'Flat': 0,
                        'House': 0,
                        'Bungalow': 0,
                        'Commercial': 0,
                        'Agricultural': 0,
                        'Plot': 0,
                        'Others': 0
                    }
                };
            }

            // Increment counts and accumulate values
            districtStats[district].total++;
            districtStats[district].types[propertyType]++;

            // Use the higher value of marketValue or transactionValue
            const value = Math.max(deed.marketValue || 0, deed.transactionValue || 0);
            districtStats[district].totalValue += value;
            districtStats[district].valueByType[propertyType] += value;
        });

        // Convert to array format with calculated densities
        const formattedData = Object.entries(districtStats).map(([name, stats]) => {
            // Calculate percentage of selected type in this district
            const typeCount = selectedType === 'all' ? stats.total : stats.types[selectedType];
            const typeDensity = stats.total > 0 ? (typeCount / stats.total) * 100 : 0;

            // Calculate average value of selected type
            const typeValue = selectedType === 'all' ? stats.totalValue : stats.valueByType[selectedType];
            const avgValue = typeCount > 0 ? typeValue / typeCount : 0;

            // Generate mock position (in a real app, you'd use actual coordinates)
            const position = getDistrictPosition(name);

            return {
                id: name,
                name: name,
                count: typeCount,
                total: stats.total,
                density: typeDensity,
                avgValue: avgValue,
                position: position,
                typeBreakdown: stats.types
            };
        });

        setDistrictData(formattedData);
        setPropertyTypes(Array.from(typeSet));
    };

    // Determine property type from deed data
    const categorizePropertyType = (deed) => {
        const description = deed.propertyDescription?.toLowerCase() || '';
        const landType = deed.landType?.toLowerCase() || '';

        if (description.includes('फ्लैट') || description.includes('flat') || description.includes('अपार्टमेन्ट') || description.includes('apartment')) {
            return 'Flat';
        } else if (description.includes('बंगला') || description.includes('bungalow') || description.includes('villa')) {
            return 'Bungalow';
        } else if ((description.includes('मकान') || description.includes('house')) && !description.includes('फ्लैट') && !description.includes('flat')) {
            return 'House';
        } else if (landType.includes('व्यावसायिक') || landType.includes('commercial') || description.includes('shop') || description.includes('दुकान')) {
            return 'Commercial';
        } else if (landType.includes('कृषि') || landType.includes('agricultural')) {
            return 'Agricultural';
        } else if (description.includes('प्लॉट') || description.includes('plot') || description.includes('भूखंड')) {
            return 'Plot';
        } else {
            return 'Others';
        }
    };

    // Get mock position for district (in a real app, you'd use actual coordinates)
    const getDistrictPosition = (districtName) => {
        // This is a simplified demo using pseudo-random positions based on district name
        // In a real app, you would use actual GIS coordinates

        // Generate a deterministic hash from the district name
        let hash = 0;
        for (let i = 0; i < districtName.length; i++) {
            hash = ((hash << 5) - hash) + districtName.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }

        // Use the hash to generate a position within UP state approximate bounds
        const baseLat = 26.8; // Base latitude for UP
        const baseLng = 80.9; // Base longitude for UP

        return [
            baseLng + (((hash & 0xFF) / 255) * 4 - 2), // Longitude: 78.9° to 82.9°
            baseLat + ((((hash >> 8) & 0xFF) / 255) * 4 - 2) // Latitude: 24.8° to 28.8°
        ];
    };

    // Format currency values for display
    const formatCurrency = (value) => {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(1)}Cr`;
        } else if (value >= 100000) {
            return `₹${(value / 100000).toFixed(1)}L`;
        } else if (value >= 1000) {
            return `₹${(value / 1000).toFixed(1)}K`;
        }
        return `₹${value.toFixed(0)}`;
    };

    // Get color based on density
    const getDensityColor = (density) => {
        // Color scale from light blue to dark blue based on density
        if (density === 0) return 'rgb(235, 245, 255)'; // Very light blue for zero

        const normalized = Math.min(density / 100, 1); // Ensure max of 100%
        const r = Math.floor(65 - normalized * 65);
        const g = Math.floor(105 - normalized * 105);
        const b = Math.floor(225);

        return `rgb(${r},${g},${b})`;
    };

    // Get size based on count
    const getMarkerSize = (count, max) => {
        if (count === 0) return 8; // Minimum size
        const maxSize = 40;
        const minSize = 10;

        // Logarithmic scale to prevent huge differences
        const size = minSize + (Math.log(count) / Math.log(max || 1)) * (maxSize - minSize);
        return Math.max(minSize, Math.min(maxSize, size));
    };

    // Find maximum count for scaling
    const maxCount = useMemo(() => {
        if (districtData.length === 0) return 1;
        return Math.max(...districtData.map(d => d.count));
    }, [districtData]);

    // Handle property type selection change
    const handleTypeChange = (e) => {
        const newSelectedType = e.target.value;
        // You would typically update a parent component state here
        // For now, we'll just reload the page with the selected type in the URL
        window.location.href = `?type=${newSelectedType}`;
    };

    // If no data, show placeholder
    if (districtData.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No property location data available</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Property Type Distribution by District</h3>
                <div className="flex items-center space-x-2">
                    <label htmlFor="property-type" className="text-sm font-medium text-gray-700">
                        Property Type:
                    </label>
                    <select
                        id="property-type"
                        className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={selectedType}
                        onChange={handleTypeChange}
                    >
                        <option value="all">All Types</option>
                        <option value="Flat">Flat/Apartment</option>
                        <option value="House">House</option>
                        <option value="Bungalow">Bungalow/Villa</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Agricultural">Agricultural</option>
                        <option value="Plot">Plot/Land</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
            </div>

            <div className="relative w-full h-96">
                {/* Legend */}
                <div className="absolute top-2 left-2 z-10 p-2 bg-white bg-opacity-85 rounded-md shadow-sm">
                    <div className="text-xs font-medium mb-1">
                        {selectedType === 'all' ? 'All Property Types' : `${selectedType} Density`}
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: getDensityColor(0) }}></div>
                        <div className="text-xs">Low</div>
                        <div className="w-12 h-2 bg-gradient-to-r from-blue-100 to-blue-700 rounded"></div>
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
                            minWidth: '150px'
                        }}
                    >
                        {tooltipContent}
                    </div>
                )}

                {/* Map container */}
                <div className="w-full h-full bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center">
                    {/* Simplified map visualization - in a real app, use a proper map component */}
                    <div className="relative w-full h-full">
                        {/* State outline - just a simple shape for demo */}
                        <div className="absolute inset-5 border-2 border-gray-300 rounded-lg" />

                        {/* District markers */}
                        {districtData.map((district) => {
                            const size = getMarkerSize(district.count, maxCount);

                            return (
                                <div
                                    key={district.id}
                                    className="absolute rounded-full border border-white shadow-sm cursor-pointer transition-all duration-300"
                                    style={{
                                        width: `${size}px`,
                                        height: `${size}px`,
                                        backgroundColor: getDensityColor(district.density),
                                        left: `${(district.position[0] - 76) * 100}px`,
                                        top: `${(31 - district.position[1]) * 100}px`,
                                        transform: 'translate(-50%, -50%)',
                                        opacity: district.count > 0 ? 0.9 : 0.4
                                    }}
                                    onMouseEnter={(e) => {
                                        setTooltipContent(
                                            <div>
                                                <div className="font-medium">{district.name}</div>
                                                <div className="mt-1 space-y-1">
                                                    <div>
                                                        <span className="font-medium">{selectedType === 'all' ? 'Total Properties' : selectedType}:</span> {district.count}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Density:</span> {district.density.toFixed(1)}%
                                                    </div>
                                                    {district.count > 0 && (
                                                        <div>
                                                            <span className="font-medium">Avg Value:</span> {formatCurrency(district.avgValue)}
                                                        </div>
                                                    )}
                                                    {selectedType === 'all' && (
                                                        <div className="pt-1">
                                                            <div className="font-medium">Breakdown:</div>
                                                            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-0.5">
                                                                {Object.entries(district.typeBreakdown).map(([type, count]) => (
                                                                    count > 0 ? (
                                                                        <div key={type}>
                                                                            {type}: {count}
                                                                        </div>
                                                                    ) : null
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
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
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xs uppercase text-blue-700">Districts</div>
                    <div className="text-lg font-medium">{districtData.length}</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xs uppercase text-blue-700">
                        {selectedType === 'all' ? 'Total Properties' : `${selectedType} Properties`}
                    </div>
                    <div className="text-lg font-medium">
                        {districtData.reduce((sum, district) => sum + district.count, 0)}
                    </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xs uppercase text-blue-700">
                        Avg {selectedType === 'all' ? 'Property' : selectedType} Value
                    </div>
                    <div className="text-lg font-medium">
                        {formatCurrency(
                            districtData.reduce((sum, district) => sum + district.avgValue * district.count, 0) /
                            districtData.reduce((sum, district) => sum + district.count, 0) || 0
                        )}
                    </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xs uppercase text-blue-700">Top District</div>
                    <div className="text-lg font-medium truncate">
                        {districtData.sort((a, b) => b.count - a.count)[0]?.name || 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyTypeHeatmap;