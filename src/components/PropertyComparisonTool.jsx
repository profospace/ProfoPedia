import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Plus, X, Filter, Search } from 'lucide-react';
import _ from 'lodash';

const PropertyComparisonTool = ({ data }) => {
    const [availableProperties, setAvailableProperties] = useState([]);
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Process and prepare data for comparison
        const processedData = data.map(item => {
            return {
                id: item._id,
                documentNumber: item.documentNumber,
                deedType: item.deedType,
                year: item.year,
                district: item.district,
                subRegistrar: item.subRegistrar,
                ward: item.ward,
                locality: item.locality,
                landType: item.landType,
                khasraNumber: item.khasraNumber,
                propertyDescription: item.propertyDescription,
                area: item.area || 0,
                unitType: item.unitType,
                executionDate: item.executionDate,
                registrationDate: item.registrationDate,
                firstParty: item.firstParty?.map(party => party.name).join(', ') || '',
                secondParty: item.secondParty?.map(party => party.name).join(', ') || '',
                detailUniqueId: item.detailUniqueId
            };
        });

        setAvailableProperties(processedData);
    }, [data]);

    // Filter and search functions
    const filteredProperties = availableProperties.filter(property => {
        // Apply deed type filter if not "all"
        const typeMatch = filterType === 'all' || property.deedType === filterType;

        // Apply search term
        const searchMatch = searchTerm === '' ||
            property.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.khasraNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.firstParty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.secondParty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.locality.toLowerCase().includes(searchTerm.toLowerCase());

        return typeMatch && searchMatch;
    });

    // Get unique deed types for filter dropdown
    const deedTypes = ['all', ...new Set(availableProperties.map(p => p.deedType))];

    // Add property to comparison
    const addToComparison = (property) => {
        if (selectedProperties.length < 3 && !selectedProperties.some(p => p.id === property.id)) {
            setSelectedProperties([...selectedProperties, property]);
        }
    };

    // Remove property from comparison
    const removeFromComparison = (propertyId) => {
        setSelectedProperties(selectedProperties.filter(p => p.id !== propertyId));
    };

    // Clear all comparisons
    const clearComparisons = () => {
        setSelectedProperties([]);
    };

    // Comparison categories and their labels
    const comparisonCategories = [
        {
            key: 'basic', label: 'Basic Information', fields: [
                { key: 'documentNumber', label: 'Document Number' },
                { key: 'deedType', label: 'Deed Type' },
                { key: 'year', label: 'Year' },
                { key: 'registrationDate', label: 'Registration Date' },
                { key: 'executionDate', label: 'Execution Date' }
            ]
        },
        {
            key: 'location', label: 'Location', fields: [
                { key: 'district', label: 'District' },
                { key: 'ward', label: 'Ward' },
                { key: 'locality', label: 'Locality' },
                { key: 'subRegistrar', label: 'Sub-Registrar' }
            ]
        },
        {
            key: 'property', label: 'Property Details', fields: [
                { key: 'landType', label: 'Land Type' },
                { key: 'khasraNumber', label: 'Khasra Number' },
                { key: 'area', label: 'Area' },
                { key: 'unitType', label: 'Unit Type' },
                { key: 'propertyDescription', label: 'Description' }
            ]
        },
        {
            key: 'parties', label: 'Parties', fields: [
                { key: 'firstParty', label: 'First Party' },
                { key: 'secondParty', label: 'Second Party' }
            ]
        }
    ];

    return (
        <div className="w-full rounded-lg shadow-lg bg-white overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold flex items-center text-gray-800">
                            <ArrowLeftRight className="mr-2 h-5 w-5 text-blue-600" />
                            Property Comparison Tool
                        </h3>
                        <p className="text-sm text-gray-500">
                            Compare up to 3 properties side by side
                        </p>
                    </div>

                    {selectedProperties.length > 0 && (
                        <button
                            onClick={clearComparisons}
                            className="px-2 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        >
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Comparison area */}
            <div className="p-4">
                {selectedProperties.length === 0 ? (
                    <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-6 text-center">
                        <p className="text-gray-500">
                            Select properties from the list below to start comparing
                        </p>
                    </div>
                ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
                        {/* Property headers */}
                        <div className="grid grid-cols-4 border-b border-gray-200">
                            <div className="p-3 bg-gray-100 font-medium text-gray-700">Property</div>
                            {selectedProperties.map((property, index) => (
                                <div key={property.id} className="p-3 bg-gray-100 font-medium text-gray-700 flex justify-between items-center">
                                    <span>Property {index + 1}</span>
                                    <button
                                        onClick={() => removeFromComparison(property.id)}
                                        className="text-gray-500 hover:text-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                            {/* Empty columns if less than 3 properties */}
                            {Array(3 - selectedProperties.length).fill(0).map((_, index) => (
                                <div key={`empty-${index}`} className="p-3 bg-gray-100"></div>
                            ))}
                        </div>

                        {/* Document numbers for quick reference */}
                        <div className="grid grid-cols-4 border-b border-gray-200">
                            <div className="p-3 font-medium text-gray-700 bg-blue-50">Document #</div>
                            {selectedProperties.map(property => (
                                <div key={`doc-${property.id}`} className="p-3 bg-blue-50 text-blue-800 font-medium">
                                    {property.documentNumber}
                                </div>
                            ))}
                            {/* Empty columns */}
                            {Array(3 - selectedProperties.length).fill(0).map((_, index) => (
                                <div key={`empty-doc-${index}`} className="p-3 bg-blue-50"></div>
                            ))}
                        </div>

                        {/* Comparison categories */}
                        {comparisonCategories.map(category => (
                            <React.Fragment key={category.key}>
                                {/* Category header */}
                                <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-100">
                                    <div className="p-3 font-medium text-gray-700 col-span-4">
                                        {category.label}
                                    </div>
                                </div>

                                {/* Category fields */}
                                {category.fields.map(field => (
                                    <div key={field.key} className="grid grid-cols-4 border-b border-gray-200">
                                        <div className="p-3 font-medium text-gray-700 bg-gray-50">{field.label}</div>
                                        {selectedProperties.map(property => {
                                            let fieldValue = property[field.key];

                                            // Format area with unit type
                                            if (field.key === 'area' && property.area) {
                                                fieldValue = `${property.area} ${property.unitType || ''}`;
                                            }

                                            return (
                                                <div
                                                    key={`${property.id}-${field.key}`}
                                                    className="p-3 text-gray-800 break-words"
                                                >
                                                    {fieldValue || '-'}
                                                </div>
                                            );
                                        })}

                                        {/* Empty columns */}
                                        {Array(3 - selectedProperties.length).fill(0).map((_, index) => (
                                            <div key={`empty-${field.key}-${index}`} className="p-3"></div>
                                        ))}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>

            {/* Property selection area */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="mb-4">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Select Properties to Compare</h4>

                    {/* Search and filter */}
                    <div className="flex space-x-4 mb-3">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by document #, khasra, party name..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Filter size={16} className="text-gray-500" />
                            <select
                                className="border border-gray-300 rounded py-2 px-3"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                {deedTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type === 'all' ? 'All Deed Types' : type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Property cards */}
                    <div className="grid grid-cols-3 gap-4">
                        {filteredProperties.slice(0, 6).map(property => {
                            const isSelected = selectedProperties.some(p => p.id === property.id);
                            const isDisabled = selectedProperties.length >= 3 && !isSelected;

                            return (
                                <div
                                    key={property.id}
                                    className={`border rounded-md overflow-hidden ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                        } ${isDisabled ? 'opacity-50' : 'hover:border-blue-300'}`}
                                >
                                    <div className="p-3 border-b border-gray-200 bg-white">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="font-medium text-gray-800">{property.documentNumber}</div>
                                                <div className="text-sm text-gray-500">{property.deedType} ({property.year})</div>
                                            </div>

                                            <button
                                                onClick={() => isSelected ? removeFromComparison(property.id) : addToComparison(property)}
                                                disabled={isDisabled && !isSelected}
                                                className={`p-1 rounded-full ${isSelected
                                                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    } ${isDisabled && !isSelected ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                            >
                                                {isSelected ? <X size={16} /> : <Plus size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-gray-50 text-sm">
                                        <div className="flex items-start mb-1">
                                            <span className="text-gray-500 w-20">Location:</span>
                                            <span className="text-gray-800">{property.locality}, {property.ward}</span>
                                        </div>
                                        <div className="flex items-start mb-1">
                                            <span className="text-gray-500 w-20">Area:</span>
                                            <span className="text-gray-800">{property.area} {property.unitType}</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="text-gray-500 w-20">Khasra:</span>
                                            <span className="text-gray-800">{property.khasraNumber}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Show message if no properties match filter */}
                    {filteredProperties.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-md p-4 text-center text-gray-500">
                            No properties match your search criteria
                        </div>
                    )}

                    {/* Show count if many properties */}
                    {filteredProperties.length > 6 && (
                        <div className="mt-3 text-center text-sm text-gray-500">
                            Showing 6 of {filteredProperties.length} matching properties. Refine your search to see more.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyComparisonTool;