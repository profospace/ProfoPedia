// import React, { useMemo, useState } from 'react';
// import _ from 'lodash';
// import { useNavigate } from 'react-router-dom';

// const PropertyOutliers = ({ data }) => {
//     const navigate = useNavigate();
//     const [selectedLocality, setSelectedLocality] = useState('all');

//     // Group properties by locality (mohalla)
//     const propertiesByLocality = useMemo(() => {
//         return _.groupBy(data, 'locality');
//     }, [data]);

//     // Get unique localities for dropdown
//     const localities = useMemo(() => {
//         return Object.keys(propertiesByLocality).sort();
//     }, [propertiesByLocality]);

//     // Get property year from registration date
//     const getPropertyYear = (dateString) => {
//         if (!dateString) return '';
//         const match = dateString.match(/\d{4}$/);
//         return match ? match[0] : '';
//     };

//     // Convert area to square meters based on unit type
//     const convertToSquareMeters = (area, unitType) => {
//         if (!area || area <= 0) return 0;

//         // If no unit type is specified, assume it's already in square meters
//         if (!unitType) return area;

//         // Convert from different units to square meters
//         switch (unitType.trim().toLowerCase()) {
//             case 'हैक्टेयर':
//             case 'hectare':
//             case 'हेक्टेयर':
//                 return area * 10000; // 1 hectare = 10,000 square meters
//             case 'एकड़':
//             case 'acre':
//                 return area * 4046.86; // 1 acre = 4,046.86 square meters
//             case 'वर्ग फुट':
//             case 'वर्ग फीट':
//             case 'sq ft':
//             case 'square feet':
//                 return area * 0.092903; // 1 sq ft = 0.092903 square meters
//             case 'वर्ग गज':
//             case 'sq yd':
//             case 'square yard':
//                 return area * 0.836127; // 1 sq yd = 0.836127 square meters
//             case 'वर्ग मीटर':
//             case 'sq m':
//             case 'square meter':
//             default:
//                 return area; // Already in square meters
//         }
//     };

//     // Calculate statistics for each locality including outliers
//     const localityStats = useMemo(() => {
//         const stats = {};

//         Object.keys(propertiesByLocality).forEach(locality => {
//             const properties = propertiesByLocality[locality];

//             // Step 1: Convert all property areas to square meters first
//             const propertiesWithConvertedArea = properties.map(p => {
//                 const areaInSqMeters = convertToSquareMeters(p.area, p.unitType);
//                 return {
//                     ...p,
//                     areaInSqMeters: areaInSqMeters
//                 };
//             });

//             // Step 2: Filter properties with valid transaction values
//             const propertiesWithValues = propertiesWithConvertedArea.filter(p => p.transactionValue > 0);

//             if (propertiesWithValues.length > 0) {
//                 // Step 3: Process properties with both area and transaction data
//                 const propertiesWithArea = propertiesWithValues.filter(p => p.areaInSqMeters > 0);

//                 if (propertiesWithArea.length > 0) {
//                     // If we have area data, calculate price per standardized square meter
//                     const pricesPerSqm = propertiesWithArea.map(p => ({
//                         ...p,
//                         pricePerSqm: p.transactionValue / p.areaInSqMeters
//                     }));

//                     // Calculate the average price per square meter
//                     const sum = pricesPerSqm.reduce((acc, p) => acc + p.pricePerSqm, 0);
//                     const avgPricePerSqm = sum / pricesPerSqm.length;

//                     // Find outliers (properties with price > 1.5x average price per sqm)
//                     const outliersByArea = pricesPerSqm.filter(p => p.pricePerSqm > (avgPricePerSqm * 1.5));

//                     stats[locality] = {
//                         averagePricePerSqm: avgPricePerSqm,
//                         propertyCount: properties.length,
//                         propertiesWithValues: propertiesWithValues.length,
//                         outliers: outliersByArea,
//                         hasAreaData: true,
//                         priceRange: {
//                             min: Math.min(...pricesPerSqm.map(p => p.pricePerSqm)),
//                             max: Math.max(...pricesPerSqm.map(p => p.pricePerSqm))
//                         }
//                     };
//                 } else {
//                     // If no area data is available, use absolute transaction values
//                     const transactionValues = propertiesWithValues.map(p => p.transactionValue);
//                     const avgTransactionValue = transactionValues.reduce((acc, val) => acc + val, 0) / transactionValues.length;

//                     // Find outliers (properties with transaction > 1.5x average transaction)
//                     const outliersByValue = propertiesWithValues.filter(p =>
//                         p.transactionValue > (avgTransactionValue * 1.5)
//                     );

//                     stats[locality] = {
//                         averageTransactionValue: avgTransactionValue,
//                         propertyCount: properties.length,
//                         propertiesWithValues: propertiesWithValues.length,
//                         outliers: outliersByValue,
//                         hasAreaData: false,
//                         transactionRange: {
//                             min: Math.min(...transactionValues),
//                             max: Math.max(...transactionValues)
//                         }
//                     };
//                 }
//             } else {
//                 stats[locality] = {
//                     propertyCount: properties.length,
//                     propertiesWithValues: 0,
//                     outliers: [],
//                     hasAreaData: false
//                 };
//             }
//         });

//         return stats;
//     }, [propertiesByLocality]);

//     // Format currency for display
//     const formatCurrency = (amount) => {
//         if (!amount && amount !== 0) return '-';
//         return `₹${amount.toLocaleString('en-IN')}`;
//     };

//     // Format date for display
//     const formatDate = (dateString) => {
//         if (!dateString) return '-';
//         return dateString;
//     };

//     // Navigate to deed details page
//     const handleNavigateToDeed = (id) => {
//         navigate(`/deeds/${id}`);
//     };

//     // Handle locality change
//     const handleLocalityChange = (e) => {
//         setSelectedLocality(e.target.value);
//     };

//     // Filter localities based on selection
//     const filteredLocalities = useMemo(() => {
//         if (selectedLocality === 'all') {
//             return localities;
//         }
//         return [selectedLocality];
//     }, [selectedLocality, localities]);

//     return (
//         <div className="max-w-6xl mx-auto p-4">
//             <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold mb-3 md:mb-0">Property Price Outliers by Locality</h1>

//                 <div className="w-full md:w-64">
//                     <div className="relative">
//                         <label htmlFor="locality-select" className="block text-sm font-medium text-gray-700 mb-1">
//                             Select Locality
//                         </label>
//                         <select
//                             id="locality-select"
//                             value={selectedLocality}
//                             onChange={handleLocalityChange}
//                             className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         >
//                             <option value="all">All Localities</option>
//                             {localities.map(locality => (
//                                 <option key={locality} value={locality}>{locality}</option>
//                             ))}
//                         </select>
//                         <div className="absolute inset-y-0 right-0 top-6 flex items-center px-2 pointer-events-none">
//                             <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {localities.length === 0 ? (
//                 <div className="text-center p-4 bg-gray-100 rounded">
//                     No property data available
//                 </div>
//             ) : (
//                 <div className="space-y-8">
//                     {filteredLocalities.map(locality => {
//                         const stats = localityStats[locality];
//                         const hasOutliers = stats?.outliers?.length > 0;

//                         return (
//                             <div key={locality} className="bg-white shadow rounded-lg overflow-hidden">
//                                 <div className="bg-blue-600 text-white p-4">
//                                     <h2 className="font-bold text-xl">{locality}</h2>
//                                     <div className="flex flex-wrap justify-between text-sm mt-2">
//                                         <span>Total Properties: {stats.propertyCount}</span>
//                                         <span>Properties with Transaction Values: {stats.propertiesWithValues || 0}</span>
//                                         {stats.hasAreaData && stats.averagePricePerSqm > 0 && (
//                                             <div className="mt-1 w-full">
//                                                 <span className="block">Avg. Price: {formatCurrency(Math.round(stats.averagePricePerSqm))}/वर्ग मीटर</span>
//                                                 <span className="text-xs">Range: {formatCurrency(Math.round(stats.priceRange?.min))}/वर्ग मीटर - {formatCurrency(Math.round(stats.priceRange?.max))}/वर्ग मीटर</span>
//                                             </div>
//                                         )}
//                                         {!stats.hasAreaData && stats.averageTransactionValue > 0 && (
//                                             <div className="mt-1 w-full">
//                                                 <span className="block">Avg. Transaction: {formatCurrency(Math.round(stats.averageTransactionValue))}</span>
//                                                 <span className="text-xs">Range: {formatCurrency(Math.round(stats.transactionRange?.min))} - {formatCurrency(Math.round(stats.transactionRange?.max))}</span>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="p-4">
//                                     <h3 className="font-semibold text-lg mb-3">Price Outliers</h3>

//                                     {hasOutliers ? (
//                                         <div className="overflow-x-auto">
//                                             <table className="min-w-full divide-y divide-gray-200">
//                                                 <thead className="bg-gray-50">
//                                                     <tr>
//                                                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deed Type</th>
//                                                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
//                                                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khasra #</th>
//                                                         {stats.hasAreaData && (
//                                                             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area (वर्ग मीटर)</th>
//                                                         )}
//                                                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Value</th>
//                                                         {stats.hasAreaData && (
//                                                             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/वर्ग मीटर</th>
//                                                         )}
//                                                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Above Avg</th>
//                                                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parties</th>
//                                                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody className="bg-white divide-y divide-gray-200">
//                                                     {stats.outliers.map((property) => {
//                                                         const pricePerSqm = stats.hasAreaData ? property.pricePerSqm : 0;
//                                                         const variance = stats.hasAreaData
//                                                             ? (pricePerSqm / stats.averagePricePerSqm) - 1
//                                                             : (property.transactionValue / stats.averageTransactionValue) - 1;

//                                                         return (
//                                                             <tr
//                                                                 key={property._id}
//                                                                 className="hover:bg-red-50 cursor-pointer"
//                                                                 onClick={() => handleNavigateToDeed(property._id)}
//                                                             >
//                                                                 <td className="px-4 py-2 whitespace-nowrap">{property.deedType}</td>
//                                                                 <td className="px-4 py-2 whitespace-nowrap">{property.year || getPropertyYear(property.registrationDate)}</td>
//                                                                 <td className="px-4 py-2 whitespace-nowrap">{property.khasraNumber}</td>
//                                                                 {stats.hasAreaData && (
//                                                                     <td className="px-4 py-2 whitespace-nowrap">{property.areaInSqMeters ? property.areaInSqMeters.toFixed(2) : property.area}</td>
//                                                                 )}
//                                                                 <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(property.transactionValue)}</td>
//                                                                 {stats.hasAreaData && (
//                                                                     <td className="px-4 py-2 whitespace-nowrap font-semibold text-red-600">
//                                                                         {formatCurrency(Math.round(pricePerSqm))}
//                                                                     </td>
//                                                                 )}
//                                                                 <td className="px-4 py-2 whitespace-nowrap font-semibold text-red-600">
//                                                                     +{Math.round(variance * 100)}%
//                                                                 </td>
//                                                                 <td className="px-4 py-2">
//                                                                     {property.firstParty && property.firstParty.length > 0 ? (
//                                                                         <div className="text-xs">
//                                                                             <span className="font-medium">Seller:</span> {property.firstParty[0]?.name || "N/A"}
//                                                                         </div>
//                                                                     ) : null}
//                                                                     {property.secondParty && property.secondParty.length > 0 ? (
//                                                                         <div className="text-xs mt-1">
//                                                                             <span className="font-medium">Buyer:</span> {property.secondParty[0]?.name || "N/A"}
//                                                                         </div>
//                                                                     ) : null}
//                                                                 </td>
//                                                                 <td className="px-4 py-2 whitespace-nowrap">{formatDate(property.executionDate || property.registrationDate)}</td>
//                                                             </tr>
//                                                         );
//                                                     })}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     ) : (
//                                         <div className="text-center p-4 bg-gray-50 rounded text-gray-500">
//                                             {stats.propertiesWithValues > 0
//                                                 ? "No price outliers found in this locality"
//                                                 : "Insufficient transaction data to determine outliers"}
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="p-4 bg-gray-50 border-t">
//                                     <h3 className="font-semibold text-lg mb-3">All Properties</h3>
//                                     <div className="overflow-x-auto">
//                                         <table className="min-w-full divide-y divide-gray-200">
//                                             <thead className="bg-gray-100">
//                                                 <tr>
//                                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deed Type</th>
//                                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
//                                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khasra #</th>
//                                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
//                                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Value</th>
//                                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Land Type</th>
//                                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Party</th>
//                                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Second Party</th>
//                                                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody className="bg-white divide-y divide-gray-200">
//                                                 {propertiesByLocality[locality].map((property) => (
//                                                     <tr
//                                                         key={property._id}
//                                                         className={property.transactionValue > 0 ? "hover:bg-blue-50 cursor-pointer" : "hover:bg-gray-50 cursor-pointer"}
//                                                         onClick={() => handleNavigateToDeed(property._id)}
//                                                     >
//                                                         <td className="px-4 py-2 whitespace-nowrap">{property.deedType}</td>
//                                                         <td className="px-4 py-2 whitespace-nowrap">{property.year || getPropertyYear(property.registrationDate)}</td>
//                                                         <td className="px-4 py-2 whitespace-nowrap">{property.khasraNumber}</td>
//                                                         <td className="px-4 py-2 whitespace-normal">
//                                                             {property.area > 0 ? (
//                                                                 <>
//                                                                     <div>
//                                                                         {property.unitType ? (
//                                                                             <>
//                                                                                 {property.area} {property.unitType}
//                                                                             </>
//                                                                         ) : (
//                                                                             `${property.area} वर्ग मीटर`
//                                                                         )}
//                                                                     </div>
//                                                                     {property.unitType && property.unitType.trim().toLowerCase() !== 'वर्ग मीटर' && (
//                                                                         <div className="text-xs text-blue-600">
//                                                                             {convertToSquareMeters(property.area, property.unitType).toFixed(2)} वर्ग मीटर
//                                                                         </div>
//                                                                     )}
//                                                                 </>
//                                                             ) : '-'}
//                                                         </td>
//                                                         <td className="px-4 py-2 whitespace-nowrap font-medium">
//                                                             {property.transactionValue > 0 ? formatCurrency(property.transactionValue) : '-'}
//                                                         </td>
//                                                         <td className="px-4 py-2 whitespace-nowrap">{property.landType || '-'}</td>
//                                                         <td className="px-4 py-2">
//                                                             {property.firstParty?.map((party, i) => (
//                                                                 <div key={party._id || i} className="text-xs mb-1">
//                                                                     {party.name || '-'}
//                                                                 </div>
//                                                             ))}
//                                                         </td>
//                                                         <td className="px-4 py-2">
//                                                             {property.secondParty?.map((party, i) => (
//                                                                 <div key={party._id || i} className="text-xs mb-1">
//                                                                     {party.name || '-'}
//                                                                 </div>
//                                                             ))}
//                                                         </td>
//                                                         <td className="px-4 py-2 whitespace-nowrap">{formatDate(property.executionDate || property.registrationDate)}</td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PropertyOutliers;

import React, { useMemo, useState, useEffect } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const PropertyOutliers = ({ data }) => {
    const navigate = useNavigate();
    const [selectedLocality, setSelectedLocality] = useState('all');

    // Group properties by locality (mohalla)
    const propertiesByLocality = useMemo(() => {
        return _.groupBy(data, 'locality');
    }, [data]);

    // Get unique localities for dropdown
    const localities = useMemo(() => {
        return Object.keys(propertiesByLocality).sort();
    }, [propertiesByLocality]);

    // Get property year from registration date
    const getPropertyYear = (dateString) => {
        if (!dateString) return '';
        const match = dateString.match(/\d{4}$/);
        return match ? match[0] : '';
    };

    // Convert area to square meters based on unit type
    const convertToSquareMeters = (area, unitType) => {
        if (!area || area <= 0) return 0;

        // If no unit type is specified, assume it's already in square meters
        if (!unitType) return area;

        // Convert from different units to square meters
        switch (unitType.trim().toLowerCase()) {
            case 'हैक्टेयर':
            case 'hectare':
            case 'हेक्टेयर':
                return area * 10000; // 1 hectare = 10,000 square meters
            case 'एकड़':
            case 'acre':
                return area * 4046.86; // 1 acre = 4,046.86 square meters
            case 'वर्ग फुट':
            case 'वर्ग फीट':
            case 'sq ft':
            case 'square feet':
                return area * 0.092903; // 1 sq ft = 0.092903 square meters
            case 'वर्ग गज':
            case 'sq yd':
            case 'square yard':
                return area * 0.836127; // 1 sq yd = 0.836127 square meters
            case 'वर्ग मीटर':
            case 'sq m':
            case 'square meter':
            default:
                return area; // Already in square meters
        }
    };

    // Calculate statistics for each locality including outliers
    const localityStats = useMemo(() => {
        const stats = {};

        Object.keys(propertiesByLocality).forEach(locality => {
            const properties = propertiesByLocality[locality];

            // Step 1: Convert all property areas to square meters first
            const propertiesWithConvertedArea = properties.map(p => {
                const areaInSqMeters = convertToSquareMeters(p.area, p.unitType);
                return {
                    ...p,
                    areaInSqMeters: areaInSqMeters
                };
            });

            // Step 2: Filter properties with valid transaction values
            const propertiesWithValues = propertiesWithConvertedArea.filter(p => p.transactionValue > 0);

            if (propertiesWithValues.length > 0) {
                // Step 3: Process properties with both area and transaction data
                const propertiesWithArea = propertiesWithValues.filter(p => p.areaInSqMeters > 0);

                if (propertiesWithArea.length > 0) {
                    // If we have area data, calculate price per standardized square meter
                    const pricesPerSqm = propertiesWithArea.map(p => ({
                        ...p,
                        pricePerSqm: p.transactionValue / p.areaInSqMeters
                    }));

                    // Calculate the average price per square meter
                    const sum = pricesPerSqm.reduce((acc, p) => acc + p.pricePerSqm, 0);
                    const avgPricePerSqm = sum / pricesPerSqm.length;

                    // Find outliers (properties with price > 1.5x average price per sqm)
                    const outliersByArea = pricesPerSqm.filter(p => p.pricePerSqm > (avgPricePerSqm * 1.5));

                    stats[locality] = {
                        averagePricePerSqm: avgPricePerSqm,
                        propertyCount: properties.length,
                        propertiesWithValues: propertiesWithValues.length,
                        outliers: outliersByArea,
                        hasAreaData: true,
                        priceRange: {
                            min: Math.min(...pricesPerSqm.map(p => p.pricePerSqm)),
                            max: Math.max(...pricesPerSqm.map(p => p.pricePerSqm))
                        }
                    };
                } else {
                    // If no area data is available, use absolute transaction values
                    const transactionValues = propertiesWithValues.map(p => p.transactionValue);
                    const avgTransactionValue = transactionValues.reduce((acc, val) => acc + val, 0) / transactionValues.length;

                    // Find outliers (properties with transaction > 1.5x average transaction)
                    const outliersByValue = propertiesWithValues.filter(p =>
                        p.transactionValue > (avgTransactionValue * 1.5)
                    );

                    stats[locality] = {
                        averageTransactionValue: avgTransactionValue,
                        propertyCount: properties.length,
                        propertiesWithValues: propertiesWithValues.length,
                        outliers: outliersByValue,
                        hasAreaData: false,
                        transactionRange: {
                            min: Math.min(...transactionValues),
                            max: Math.max(...transactionValues)
                        }
                    };
                }
            } else {
                stats[locality] = {
                    propertyCount: properties.length,
                    propertiesWithValues: 0,
                    outliers: [],
                    hasAreaData: false
                };
            }
        });

        return stats;
    }, [propertiesByLocality]);

    // Format currency for display
    const formatCurrency = (amount) => {
        if (!amount && amount !== 0) return '-';
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return dateString;
    };

    // Navigate to deed details page
    const handleNavigateToDeed = (id) => {
        navigate(`/deeds/${id}`);
    };

    // Handle locality change
    const handleLocalityChange = (e) => {
        setSelectedLocality(e.target.value);
    };

    // Filter localities based on selection
    const filteredLocalities = useMemo(() => {
        if (selectedLocality === 'all') {
            return localities;
        }
        return [selectedLocality];
    }, [selectedLocality, localities]);

    // Calculate impact of removing outliers
    useEffect(() => {
        // This is just to ensure the outlier impact calculation gets triggered
        // The actual calculation happens in the rendering part
        if (Object.keys(localityStats).length > 0) {
            Object.keys(localityStats).forEach(locality => {
                const stats = localityStats[locality];
                if (stats.outliers && stats.outliers.length > 0) {
                    // Calculation is done in the render phase
                }
            });
        }
    }, [localityStats, propertiesByLocality]);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold mb-3 md:mb-0">Property Price Outliers by Locality</h1>

                <div className="w-full md:w-64">
                    <div className="relative">
                        <label htmlFor="locality-select" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Locality
                        </label>
                        <select
                            id="locality-select"
                            value={selectedLocality}
                            onChange={handleLocalityChange}
                            className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Localities</option>
                            {localities.map(locality => (
                                <option key={locality} value={locality}>{locality}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 top-6 flex items-center px-2 pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {selectedLocality === 'all' && (
                <div className="p-4 bg-white shadow rounded-lg overflow-hidden mb-8">
                    <h2 className="text-xl font-bold mb-4">Outlier Summary Across All Localities</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        This section highlights properties that significantly increase the average price in their respective localities.
                        Properties with prices more than 50% above average may represent data anomalies or special cases.
                    </p>

                    {Object.keys(localityStats).some(locality => localityStats[locality].outliers && localityStats[locality].outliers.length > 0) ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locality</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deed Type</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Value</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/वर्ग मीटर</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Above Avg</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact on Avg</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {Object.keys(localityStats).flatMap(locality => {
                                        const stats = localityStats[locality];
                                        if (!stats.outliers || stats.outliers.length === 0) return [];

                                        // Sort outliers by variance (highest first)
                                        return stats.outliers
                                            .map(property => {
                                                const pricePerSqm = stats.hasAreaData ? property.pricePerSqm : 0;
                                                const variance = stats.hasAreaData
                                                    ? (pricePerSqm / stats.averagePricePerSqm) - 1
                                                    : (property.transactionValue / stats.averageTransactionValue) - 1;

                                                // Calculate impact on average
                                                let impact = 0;
                                                if (stats.hasAreaData && stats.outliers.length < stats.propertiesWithValues) {
                                                    const nonOutlierProperties = propertiesByLocality[locality]
                                                        .filter(p => {
                                                            // First convert area to square meters
                                                            const areaInSqMeters = convertToSquareMeters(p.area, p.unitType);
                                                            // Then check if it's a valid property and not an outlier
                                                            return p.transactionValue > 0 &&
                                                                areaInSqMeters > 0 &&
                                                                !stats.outliers.find(o => o._id === p._id);
                                                        });

                                                    if (nonOutlierProperties.length > 0) {
                                                        const nonOutlierPrices = nonOutlierProperties.map(p =>
                                                            p.transactionValue / convertToSquareMeters(p.area, p.unitType)
                                                        );
                                                        const nonOutlierAvg = nonOutlierPrices.reduce((acc, price) => acc + price, 0) / nonOutlierPrices.length;
                                                        impact = ((stats.averagePricePerSqm - nonOutlierAvg) / nonOutlierAvg) * 100;
                                                    }
                                                }

                                                return {
                                                    ...property,
                                                    locality,
                                                    variance,
                                                    impact
                                                };
                                            })
                                            .sort((a, b) => b.variance - a.variance)
                                            .map(property => (
                                                <tr
                                                    key={property._id}
                                                    className="hover:bg-red-50 cursor-pointer"
                                                    onClick={() => handleNavigateToDeed(property._id)}
                                                >
                                                    <td className="px-4 py-2 font-medium">{property.locality}</td>
                                                    <td className="px-4 py-2">{property.deedType}</td>
                                                    <td className="px-4 py-2">{formatCurrency(property.transactionValue)}</td>
                                                    <td className="px-4 py-2">
                                                        {property.area > 0 ? (
                                                            <>
                                                                {property.unitType ? `${property.area} ${property.unitType}` : `${property.area}`}
                                                                {property.areaInSqMeters && (
                                                                    <span className="text-xs text-blue-600 block">
                                                                        {property.areaInSqMeters.toFixed(2)} वर्ग मीटर
                                                                    </span>
                                                                )}
                                                            </>
                                                        ) : '-'}
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold text-red-600">
                                                        {property.pricePerSqm ? formatCurrency(Math.round(property.pricePerSqm)) : '-'}
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold text-red-600">
                                                        +{Math.round(property.variance * 100)}%
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {property.impact ? (
                                                            <span className={`${Math.abs(property.impact) > 15 ? 'font-semibold text-red-600' : 'text-orange-500'}`}>
                                                                +{Math.round(property.impact)}% on avg
                                                            </span>
                                                        ) : '-'}
                                                    </td>
                                                    <td className="px-4 py-2">{property.year || getPropertyYear(property.registrationDate)}</td>
                                                </tr>
                                            ));
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center p-4 bg-gray-50 rounded text-gray-500">
                            No outliers found across any localities
                        </div>
                    )}
                </div>
            )}

            {localities.length === 0 ? (
                <div className="text-center p-4 bg-gray-100 rounded">
                    No property data available
                </div>
            ) : (
                <div className="space-y-8">
                    {filteredLocalities.map(locality => {
                        const stats = localityStats[locality];
                        const hasOutliers = stats?.outliers?.length > 0;

                        return (
                            <div key={locality} className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="bg-blue-600 text-white p-4">
                                    <h2 className="font-bold text-xl">{locality}</h2>
                                    <div className="flex flex-wrap justify-between text-sm mt-2">
                                        <span>Total Properties: {stats.propertyCount}</span>
                                        <span>Properties with Transaction Values: {stats.propertiesWithValues || 0}</span>
                                        {stats.hasAreaData && stats.averagePricePerSqm > 0 && (
                                            <div className="mt-1 w-full">
                                                <span className="block">Avg. Price: {formatCurrency(Math.round(stats.averagePricePerSqm))}/वर्ग मीटर</span>
                                                <span className="text-xs">Range: {formatCurrency(Math.round(stats.priceRange?.min))}/वर्ग मीटर - {formatCurrency(Math.round(stats.priceRange?.max))}/वर्ग मीटर</span>
                                            </div>
                                        )}
                                        {!stats.hasAreaData && stats.averageTransactionValue > 0 && (
                                            <div className="mt-1 w-full">
                                                <span className="block">Avg. Transaction: {formatCurrency(Math.round(stats.averageTransactionValue))}</span>
                                                <span className="text-xs">Range: {formatCurrency(Math.round(stats.transactionRange?.min))} - {formatCurrency(Math.round(stats.transactionRange?.max))}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-3">Price Outliers</h3>

                                    {hasOutliers ? (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deed Type</th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khasra #</th>
                                                        {stats.hasAreaData && (
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area (वर्ग मीटर)</th>
                                                        )}
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Value</th>
                                                        {stats.hasAreaData && (
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/वर्ग मीटर</th>
                                                        )}
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Above Avg</th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parties</th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {stats.outliers.map((property) => {
                                                        const pricePerSqm = stats.hasAreaData ? property.pricePerSqm : 0;
                                                        const variance = stats.hasAreaData
                                                            ? (pricePerSqm / stats.averagePricePerSqm) - 1
                                                            : (property.transactionValue / stats.averageTransactionValue) - 1;

                                                        return (
                                                            <tr
                                                                key={property._id}
                                                                className="hover:bg-red-50 cursor-pointer"
                                                                onClick={() => handleNavigateToDeed(property._id)}
                                                            >
                                                                <td className="px-4 py-2 whitespace-nowrap">{property.deedType}</td>
                                                                <td className="px-4 py-2 whitespace-nowrap">{property.year || getPropertyYear(property.registrationDate)}</td>
                                                                <td className="px-4 py-2 whitespace-nowrap">{property.khasraNumber}</td>
                                                                {stats.hasAreaData && (
                                                                    <td className="px-4 py-2 whitespace-nowrap">{property.areaInSqMeters ? property.areaInSqMeters.toFixed(2) : property.area}</td>
                                                                )}
                                                                <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(property.transactionValue)}</td>
                                                                {stats.hasAreaData && (
                                                                    <td className="px-4 py-2 whitespace-nowrap font-semibold text-red-600">
                                                                        {formatCurrency(Math.round(pricePerSqm))}
                                                                    </td>
                                                                )}
                                                                <td className="px-4 py-2 whitespace-nowrap font-semibold text-red-600">
                                                                    +{Math.round(variance * 100)}%
                                                                </td>
                                                                <td className="px-4 py-2">
                                                                    {property.firstParty && property.firstParty.length > 0 ? (
                                                                        <div className="text-xs">
                                                                            <span className="font-medium">Seller:</span> {property.firstParty[0]?.name || "N/A"}
                                                                        </div>
                                                                    ) : null}
                                                                    {property.secondParty && property.secondParty.length > 0 ? (
                                                                        <div className="text-xs mt-1">
                                                                            <span className="font-medium">Buyer:</span> {property.secondParty[0]?.name || "N/A"}
                                                                        </div>
                                                                    ) : null}
                                                                </td>
                                                                <td className="px-4 py-2 whitespace-nowrap">{formatDate(property.executionDate || property.registrationDate)}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center p-4 bg-gray-50 rounded text-gray-500">
                                            {stats.propertiesWithValues > 0
                                                ? "No price outliers found in this locality"
                                                : "Insufficient transaction data to determine outliers"}
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 bg-gray-50 border-t">
                                    <h3 className="font-semibold text-lg mb-3">All Properties</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deed Type</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khasra #</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Value</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Land Type</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Party</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Second Party</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {propertiesByLocality[locality].map((property) => (
                                                    <tr
                                                        key={property._id}
                                                        className={property.transactionValue > 0 ? "hover:bg-blue-50 cursor-pointer" : "hover:bg-gray-50 cursor-pointer"}
                                                        onClick={() => handleNavigateToDeed(property._id)}
                                                    >
                                                        <td className="px-4 py-2 whitespace-nowrap">{property.deedType}</td>
                                                        <td className="px-4 py-2 whitespace-nowrap">{property.year || getPropertyYear(property.registrationDate)}</td>
                                                        <td className="px-4 py-2 whitespace-nowrap">{property.khasraNumber}</td>
                                                        <td className="px-4 py-2 whitespace-normal">
                                                            {property.area > 0 ? (
                                                                <>
                                                                    <div>
                                                                        {property.unitType ? (
                                                                            <>
                                                                                {property.area} {property.unitType}
                                                                            </>
                                                                        ) : (
                                                                            `${property.area} वर्ग मीटर`
                                                                        )}
                                                                    </div>
                                                                    {property.unitType && property.unitType.trim().toLowerCase() !== 'वर्ग मीटर' && (
                                                                        <div className="text-xs text-blue-600">
                                                                            {convertToSquareMeters(property.area, property.unitType).toFixed(2)} वर्ग मीटर
                                                                        </div>
                                                                    )}
                                                                </>
                                                            ) : '-'}
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap font-medium">
                                                            {property.transactionValue > 0 ? formatCurrency(property.transactionValue) : '-'}
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">{property.landType || '-'}</td>
                                                        <td className="px-4 py-2">
                                                            {property.firstParty?.map((party, i) => (
                                                                <div key={party._id || i} className="text-xs mb-1">
                                                                    {party.name || '-'}
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            {property.secondParty?.map((party, i) => (
                                                                <div key={party._id || i} className="text-xs mb-1">
                                                                    {party.name || '-'}
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">{formatDate(property.executionDate || property.registrationDate)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PropertyOutliers;