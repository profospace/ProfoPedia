import React, { useState, useEffect } from 'react';
import { MapPin, Camera, Check, X, Navigation } from 'lucide-react';

const MobileInspectionTool = ({ data }) => {
    // State management
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);

    // Get current GPS location
    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    setLocationError(null);
                },
                (error) => {
                    setLocationError(error.message);
                    setCurrentLocation(null);
                }
            );
        } else {
            setLocationError("Geolocation is not supported by this browser.");
        }
    };

    // Filter properties based on search query
    const filteredProperties = data.filter(property =>
        property.khasraNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.documentNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate distance between two coordinates (Haversine formula)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Open Google Maps with property location
    const openGoogleMaps = (property) => {
        // Placeholder coordinates for the property (you'd replace these with actual coordinates)
        const propertyLat = 27.4955; // Example latitude for Mathura
        const propertyLon = 77.6833; // Example longitude for Mathura
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${propertyLat},${propertyLon}`;
        window.open(mapsUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
                    <div className="flex items-center">
                        <MapPin className="h-10 w-10 text-white mr-4" />
                        <div>
                            <h1 className="text-2xl font-bold text-white">Mobile Property Inspection Tool</h1>
                            <p className="text-blue-100">GPS-enabled Property Verification</p>
                        </div>
                    </div>
                </div>

                {/* Search and Location Section */}
                <div className="p-6 bg-gray-50 border-b">
                    <div className="flex space-x-4">
                        <div className="flex-grow relative">
                            <input
                                type="text"
                                placeholder="Search by Khasra Number, Locality, or Document Number"
                                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <MapPin className="absolute left-3 top-4 text-gray-400" />
                        </div>
                        <button
                            onClick={getCurrentLocation}
                            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 flex items-center"
                        >
                            <Navigation className="mr-2" /> Get Location
                        </button>
                    </div>

                    {/* Current Location Display */}
                    {currentLocation && (
                        <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800">
                                Current Location:
                                <span className="font-medium ml-2">
                                    Lat: {currentLocation.latitude.toFixed(4)},
                                    Lon: {currentLocation.longitude.toFixed(4)}
                                </span>
                            </p>
                        </div>
                    )}
                    {locationError && (
                        <div className="mt-4 bg-red-50 p-3 rounded-lg">
                            <p className="text-sm text-red-800">{locationError}</p>
                        </div>
                    )}
                </div>

                {/* Property List */}
                <div className="divide-y divide-gray-200">
                    {filteredProperties.map((property) => (
                        <div
                            key={property._id}
                            className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => setSelectedProperty(property)}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center mb-2">
                                        <span className="text-lg font-semibold text-blue-800 mr-3">
                                            {property.khasraNumber}
                                        </span>
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                            {property.deedType}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-1">{property.locality}</p>
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <p>Area: {property.area} {property.unitType}</p>
                                        <p>Document No: {property.documentNumber}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openGoogleMaps(property);
                                    }}
                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                    <Navigation className="mr-1" /> View on Map
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Property Details Modal */}
                {selectedProperty && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
                                <h2 className="text-xl font-bold">Property Details</h2>
                                <button
                                    onClick={() => setSelectedProperty(null)}
                                    className="hover:bg-blue-700 p-2 rounded-full"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Property Information */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4 text-blue-800">Property Information</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-gray-600">Khasra Number</span>
                                                <p className="font-medium">{selectedProperty.khasraNumber}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Locality</span>
                                                <p className="font-medium">{selectedProperty.locality}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Land Type</span>
                                                <p className="font-medium">{selectedProperty.landType}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Area</span>
                                                <p className="font-medium">{selectedProperty.area} {selectedProperty.unitType}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Property Description</span>
                                                <p className="font-medium">{selectedProperty.propertyDescription}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transaction Details */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4 text-blue-800">Transaction Details</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-gray-600">Deed Type</span>
                                                <p className="font-medium">{selectedProperty.deedType}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Document Number</span>
                                                <p className="font-medium">{selectedProperty.documentNumber}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Registration Date</span>
                                                <p className="font-medium">{selectedProperty.registrationDate}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Execution Date</span>
                                                <p className="font-medium">{selectedProperty.executionDate}</p>
                                            </div>
                                        </div>

                                        {/* Parties Involved */}
                                        <div className="mt-6">
                                            <h4 className="text-md font-semibold mb-3 text-blue-800">Parties Involved</h4>
                                            <div>
                                                <span className="text-gray-600">First Party</span>
                                                {selectedProperty.firstParty.map((party, index) => (
                                                    <div key={index} className="bg-gray-50 p-2 rounded mb-2">
                                                        <p className="font-medium">{party.name}</p>
                                                        <p className="text-sm text-gray-600">{party.address}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-3">
                                                <span className="text-gray-600">Second Party</span>
                                                {selectedProperty.secondParty.map((party, index) => (
                                                    <div key={index} className="bg-gray-50 p-2 rounded mb-2">
                                                        <p className="font-medium">{party.name}</p>
                                                        <p className="text-sm text-gray-600">{party.address}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileInspectionTool;