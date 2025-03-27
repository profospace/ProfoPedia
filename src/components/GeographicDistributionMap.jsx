import React, { useState, useEffect } from 'react';
import { MapPin, Home, Filter } from 'lucide-react';
import _ from 'lodash';

const GeographicDistributionMap = ({ data }) => {
    const [locationData, setLocationData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('count');
    const [hoveredLocation, setHoveredLocation] = useState(null);

    // Group data by locality and calculate metrics
    useEffect(() => {
        if (!data || data.length === 0) return;

        const groupedByLocality = _.groupBy(data, 'locality');

        const locationStats = Object.keys(groupedByLocality).map(locality => {
            const properties = groupedByLocality[locality];
            const totalArea = _.sumBy(properties, item => item.area || 0);
            const deedTypes = _.countBy(properties, 'deedType');

            return {
                locality,
                count: properties.length,
                totalArea: totalArea,
                averageArea: totalArea / properties.length,
                deedTypes,
                // Calculate the "weight" used for the bubble size
                weight: properties.length * 20 // Bubble size based on count
            };
        });

        setLocationData(locationStats);
    }, [data]);

    // Generate colors based on selected filter
    const getColorIntensity = (item) => {
        if (!locationData.length) return 'bg-blue-100';

        let max = 0;
        let value = 0;

        switch (selectedFilter) {
            case 'count':
                max = Math.max(...locationData.map(l => l.count));
                value = item.count;
                break;
            case 'area':
                max = Math.max(...locationData.map(l => l.totalArea));
                value = item.totalArea;
                break;
            default:
                max = Math.max(...locationData.map(l => l.count));
                value = item.count;
        }

        // Calculate color intensity (100 to 900)
        const intensityValue = Math.min(Math.floor((value / max) * 9), 9);
        const intensityMap = {
            0: 'bg-blue-100',
            1: 'bg-blue-200',
            2: 'bg-blue-300',
            3: 'bg-blue-400',
            4: 'bg-blue-500',
            5: 'bg-blue-600',
            6: 'bg-blue-700',
            7: 'bg-blue-800',
            8: 'bg-blue-900',
            9: 'bg-blue-900'
        };

        return intensityMap[intensityValue];
    };

    // Function to position the bubbles on a virtual map
    // This creates a simple grid layout since we don't have actual coordinates
    const getPosition = (index, total) => {
        // Create a virtual grid for positioning
        const rows = Math.ceil(Math.sqrt(total));
        const cols = Math.ceil(total / rows);

        const row = Math.floor(index / cols);
        const col = index % cols;

        return {
            left: `${10 + (col * 80 / cols)}%`,
            top: `${10 + (row * 80 / rows)}%`
        };
    };

    return (
        <div className="w-full rounded-lg shadow-lg bg-white overflow-hidden">
            {/* Card Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold flex items-center text-gray-800">
                            <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                            Geographic Distribution Map
                        </h3>
                        <p className="text-sm text-gray-500">
                            Property distribution across localities in Mathura district
                        </p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <select
                            className="text-sm border rounded p-1 bg-white"
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                        >
                            <option value="count">Property Count</option>
                            <option value="area">Total Area</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
                <div className="relative h-96 bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
                    {/* District label */}
                    <div className="absolute top-4 left-4 text-xl font-semibold text-gray-400">
                        मथुरा जिला
                    </div>

                    {/* Map visualization */}
                    {locationData.map((item, index) => {
                        const position = getPosition(index, locationData.length);
                        const colorClass = getColorIntensity(item);

                        return (
                            <div
                                key={item.locality}
                                className={`absolute rounded-full flex items-center justify-center ${colorClass} text-white font-medium shadow-md transition-all duration-200 cursor-pointer border-2 border-white hover:border-blue-300`}
                                style={{
                                    left: position.left,
                                    top: position.top,
                                    width: `${item.weight}px`,
                                    height: `${item.weight}px`,
                                    zIndex: hoveredLocation === item.locality ? 10 : 1,
                                    transform: hoveredLocation === item.locality ? 'scale(1.1)' : 'scale(1)'
                                }}
                                onMouseEnter={() => setHoveredLocation(item.locality)}
                                onMouseLeave={() => setHoveredLocation(null)}
                            >
                                {item.count > 1 && <span className="text-xs">{item.count}</span>}
                            </div>
                        );
                    })}

                    {/* Tooltip for hovered location */}
                    {hoveredLocation && (
                        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-lg border border-gray-200 z-20 min-w-48">
                            <h3 className="font-semibold text-gray-800">{hoveredLocation}</h3>

                            {locationData.filter(item => item.locality === hoveredLocation).map(item => (
                                <div key={`details-${item.locality}`} className="mt-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Properties:</span>
                                        <span className="font-medium">{item.count}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Area:</span>
                                        <span className="font-medium">{item.totalArea.toFixed(2)} वर्ग मीटर</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Avg. Area:</span>
                                        <span className="font-medium">{item.averageArea.toFixed(2)} वर्ग मीटर</span>
                                    </div>
                                    <div className="mt-1 pt-1 border-t border-gray-100">
                                        {Object.entries(item.deedTypes).map(([type, count]) => (
                                            <div key={type} className="flex justify-between text-xs">
                                                <span>{type}:</span>
                                                <span>{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Legend */}
                    <div className="absolute bottom-3 left-3 bg-white p-2 rounded shadow-md border border-gray-200">
                        <div className="text-xs font-medium mb-1">
                            {selectedFilter === 'count' ? 'Property Count' : 'Total Area'}
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-4 h-4 bg-blue-100 rounded"></div>
                            <div className="text-xs">Low</div>
                            <div className="w-4 h-4 bg-blue-500 rounded mx-1"></div>
                            <div className="text-xs">Medium</div>
                            <div className="w-4 h-4 bg-blue-900 rounded"></div>
                            <div className="text-xs">High</div>
                        </div>
                    </div>
                </div>

                {/* Summary stats */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Total Localities</div>
                        <div className="text-xl font-semibold">{locationData.length}</div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Total Properties</div>
                        <div className="text-xl font-semibold">{_.sumBy(locationData, 'count')}</div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Total Area</div>
                        <div className="text-xl font-semibold">
                            {_.sumBy(locationData, 'totalArea').toFixed(2)} <span className="text-sm">वर्ग मीटर</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeographicDistributionMap;