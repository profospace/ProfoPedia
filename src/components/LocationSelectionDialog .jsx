import React from 'react';
import { X } from 'lucide-react';

const LocationSelectionDialog = ({
    isOpen,
    onClose,
    locations,
    partyName,
    onSelectLocation,
    districtOptions = [] // For displaying district names
}) => {
    if (!isOpen) return null;

    // Find district name by code
    const getDistrictName = (code) => {
        const district = districtOptions.find(d => d.value === code);
        return district ? district.label : code;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Select Location
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">
                    <p className="mb-4 text-gray-600">
                        <span className="font-medium">{partyName}</span> appears in multiple locations.
                        Please select which location you're interested in:
                    </p>

                    <div className="max-h-64 overflow-y-auto">
                        <ul className="divide-y divide-gray-200">
                            {locations.map((location, index) => (
                                <li key={index} className="py-2">
                                    <button
                                        onClick={() => onSelectLocation(location)}
                                        className="w-full text-left px-3 py-2 rounded hover:bg-blue-50 transition"
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-medium">Location {index + 1}</span>
                                            <span className="text-sm text-gray-600">
                                                District: {getDistrictName(location.districtCode || '')}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                SRO Code: {location.sroCode || 'N/A'}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                Gaon Code: {location.gaonCode1 || 'N/A'}
                                            </span>
                                            <span className="text-sm text-blue-600 mt-1">
                                                {location.recordCount || location.count || 0} records found
                                            </span>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t p-4 bg-gray-50 flex justify-end rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocationSelectionDialog;