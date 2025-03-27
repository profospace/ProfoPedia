import React, { useState, useEffect } from 'react';
import { Calculator, Map, Settings, AlertTriangle, Check, Info } from 'lucide-react';
import _ from 'lodash';

const PropertyValueEstimator = ({ data }) => {
    // Form state
    const [locality, setLocality] = useState('');
    const [landType, setLandType] = useState('');
    const [area, setArea] = useState('');
    const [propertyType, setPropertyType] = useState('');

    // Results state
    const [estimatedValue, setEstimatedValue] = useState(null);
    const [confidenceLevel, setConfidenceLevel] = useState(null);
    const [similarProperties, setSimilarProperties] = useState([]);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [priceFactors, setPriceFactors] = useState(null);

    

    // Analysis state
    const [localities, setLocalities] = useState([]);
    const [landTypes, setLandTypes] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [averagePrices, setAveragePrices] = useState({});

    // Loading state
    const [isCalculating, setIsCalculating] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(true);

    // Process data on component mount
    useEffect(() => {
        if (!data || data.length === 0) {
            setIsAnalyzing(false);
            return;
        }

        analyzeMarketData();
    }, [data]);

    // Analyze the market data to extract necessary information
    const analyzeMarketData = () => {
        // Extract unique localities
        const uniqueLocalities = _.uniq(data.map(item => item.locality).filter(Boolean));
        setLocalities(uniqueLocalities);

        // Extract unique land types
        const uniqueLandTypes = _.uniq(data.map(item => item.landType).filter(Boolean));
        setLandTypes(uniqueLandTypes);

        // Determine property types based on property descriptions
        const typePatterns = {
            'residential': ['आवासीय', 'रेसिडेंशियल', 'residential'],
            'commercial': ['दुकान', 'व्यवसायिक', 'commercial', 'shop'],
            'agricultural': ['कृषि', 'खेती', 'farm', 'agricultural'],
            'mixed': ['मिक्स्ड यूज', 'mixed use']
        };

        // Extract property types from descriptions
        const extractedTypes = new Set();
        data.forEach(item => {
            const description = item.propertyDescription || '';
            let foundType = false;

            Object.entries(typePatterns).forEach(([type, keywords]) => {
                if (!foundType && keywords.some(keyword => description.toLowerCase().includes(keyword.toLowerCase()))) {
                    extractedTypes.add(type);
                    foundType = true;
                }
            });

            // Use land type as fallback
            if (!foundType && item.landType) {
                if (item.landType.toLowerCase().includes('कृषि')) {
                    extractedTypes.add('agricultural');
                } else {
                    extractedTypes.add('residential'); // Default fallback
                }
            }
        });

        setPropertyTypes(Array.from(extractedTypes));

        // Calculate average prices per sqm by locality and property type
        const priceData = {};

        data.forEach(item => {
            if (!item.locality || !item.area || item.area <= 0 || !item.transactionValue || item.transactionValue <= 0) {
                return; // Skip incomplete data
            }

            const itemLocality = item.locality;

            // Determine property type from description
            let itemPropertyType = 'residential'; // Default
            Object.entries(typePatterns).forEach(([type, keywords]) => {
                if (item.propertyDescription && keywords.some(keyword =>
                    item.propertyDescription.toLowerCase().includes(keyword.toLowerCase()))) {
                    itemPropertyType = type;
                }
            });

            if (!priceData[itemLocality]) {
                priceData[itemLocality] = {};
            }

            if (!priceData[itemLocality][itemPropertyType]) {
                priceData[itemLocality][itemPropertyType] = [];
            }

            // Calculate price per sqm
            const pricePerSqm = item.transactionValue / item.area;
            priceData[itemLocality][itemPropertyType].push(pricePerSqm);
        });

        // Calculate averages
        const avgPrices = {};
        Object.entries(priceData).forEach(([loc, typeData]) => {
            avgPrices[loc] = {};
            Object.entries(typeData).forEach(([type, prices]) => {
                // Filter out outliers (simple method - within 2 standard deviations)
                if (prices.length > 3) {
                    const mean = _.mean(prices);
                    const stdDev = Math.sqrt(_.sumBy(prices, p => Math.pow(p - mean, 2)) / prices.length);
                    const validPrices = prices.filter(p => Math.abs(p - mean) <= 2 * stdDev);
                    avgPrices[loc][type] = _.mean(validPrices);
                } else {
                    avgPrices[loc][type] = _.mean(prices);
                }
            });
        });

        setAveragePrices(avgPrices);
        setIsAnalyzing(false);
    };

    // Calculate the estimated property value
    const calculatePropertyValue = () => {
        if (!locality || !landType || !area || !propertyType) {
            return; // Don't calculate if any required field is missing
        }

        setIsCalculating(true);

        // Convert area to a number
        const areaValue = parseFloat(area);
        if (isNaN(areaValue) || areaValue <= 0) {
            setIsCalculating(false);
            return;
        }

        // Get base price per sqm for the locality and property type
        let basePrice = 0;
        let confidence = 'low';
        let matchingProperties = [];

        // Find similar properties for comparison
        matchingProperties = data.filter(item => {
            // Basic matching criteria
            const localityMatch = item.locality === locality;

            // Property type matching using description
            let propertyTypeMatch = false;
            if (propertyType === 'residential' && item.propertyDescription &&
                (item.propertyDescription.includes('आवासीय') || item.propertyDescription.includes('residential'))) {
                propertyTypeMatch = true;
            } else if (propertyType === 'commercial' && item.propertyDescription &&
                (item.propertyDescription.includes('दुकान') || item.propertyDescription.includes('commercial'))) {
                propertyTypeMatch = true;
            } else if (propertyType === 'agricultural' && item.landType === 'कृषि') {
                propertyTypeMatch = true;
            } else if (propertyType === 'mixed' && item.propertyDescription &&
                item.propertyDescription.includes('mixed')) {
                propertyTypeMatch = true;
            }

            // Area similarity (within 30% range)
            let areaMatch = false;
            if (item.area && item.area > 0) {
                const areaRatio = areaValue / item.area;
                areaMatch = areaRatio >= 0.7 && areaRatio <= 1.3;
            }

            return localityMatch && (propertyTypeMatch || areaMatch);
        });

        // Calculate based on the number of matching properties
        if (matchingProperties.length >= 5) {
            // Good number of similar properties - use their average
            const validProperties = matchingProperties.filter(p => p.transactionValue > 0 && p.area > 0);
            const pricesPerSqm = validProperties.map(p => p.transactionValue / p.area);

            // Filter out outliers
            const mean = _.mean(pricesPerSqm);
            const stdDev = Math.sqrt(_.sumBy(pricesPerSqm, p => Math.pow(p - mean, 2)) / pricesPerSqm.length);
            const validPrices = pricesPerSqm.filter(p => Math.abs(p - mean) <= 2 * stdDev);

            basePrice = _.mean(validPrices);
            confidence = 'high';
        } else if (matchingProperties.length >= 2) {
            // Few similar properties - use their average but with medium confidence
            const validProperties = matchingProperties.filter(p => p.transactionValue > 0 && p.area > 0);
            const pricesPerSqm = validProperties.map(p => p.transactionValue / p.area);
            basePrice = _.mean(pricesPerSqm);
            confidence = 'medium';
        } else {
            // Use the pre-calculated averages with low confidence
            if (averagePrices[locality] && averagePrices[locality][propertyType]) {
                basePrice = averagePrices[locality][propertyType];
                confidence = 'low';
            } else {
                // Fallback to general area average
                const allLocalityAverages = [];
                Object.values(averagePrices).forEach(typeData => {
                    Object.values(typeData).forEach(average => {
                        allLocalityAverages.push(average);
                    });
                });

                if (allLocalityAverages.length > 0) {
                    basePrice = _.mean(allLocalityAverages);
                    confidence = 'very low';
                } else {
                    basePrice = 10000; // Default fallback value
                    confidence = 'extremely low';
                }
            }
        }

        // Calculate the estimated value
        const estimatedVal = Math.round(basePrice * areaValue);

        // Get top 3 similar properties for display
        const top3Similar = matchingProperties
            .filter(p => p.transactionValue > 0 && p.area > 0)
            .sort((a, b) => {
                // Sort by similarity in area
                const aDiff = Math.abs(a.area - areaValue);
                const bDiff = Math.abs(b.area - areaValue);
                return aDiff - bDiff;
            })
            .slice(0, 3);

        // Calculate price factors
        const factors = {
            basePrice: basePrice,
            locality: 1.0, // Default multiplier
            propertyTypeMultiplier: 1.0,
            areaMultiplier: 1.0,
            confidence: confidence
        };

        // Adjust for property type
        if (propertyType === 'commercial') {
            factors.propertyTypeMultiplier = 1.2; // Commercial properties often more valuable
        } else if (propertyType === 'agricultural') {
            factors.propertyTypeMultiplier = 0.8; // Agricultural typically less valuable
        }

        // Adjust for area (economies of scale)
        if (areaValue > 200) {
            factors.areaMultiplier = 0.95; // Slight discount for larger properties
        } else if (areaValue < 50) {
            factors.areaMultiplier = 1.05; // Premium for smaller properties
        }

        // Set state
        setEstimatedValue(estimatedVal);
        setConfidenceLevel(confidence);
        setSimilarProperties(top3Similar);
        setPriceFactors(factors);
        setIsCalculating(false);
    };

    // Format currency value
    const formatCurrency = (value) => {
        if (!value && value !== 0) return '—';

        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(2)} Cr`;
        } else if (value >= 100000) {
            return `₹${(value / 100000).toFixed(2)} Lakh`;
        } else {
            return `₹${value.toLocaleString()}`;
        }
    };

    // Format area value
    const formatArea = (value) => {
        if (!value) return '—';
        return `${value.toLocaleString()} वर्ग मीटर`;
    };

    // Get confidence indicator color
    const getConfidenceColor = (level) => {
        switch (level) {
            case 'high': return 'bg-green-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-orange-500';
            case 'very low': return 'bg-red-400';
            case 'extremely low': return 'bg-red-600';
            default: return 'bg-gray-400';
        }
    };

    return (
        <div className="w-full rounded-lg bg-white shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                <div className="flex items-center">
                    <Calculator className="h-8 w-8 text-white mr-3" />
                    <div>
                        <h2 className="text-xl font-semibold text-white">Property Value Estimator</h2>
                        <p className="text-blue-100 text-sm mt-1">
                            Estimate market value based on comparable properties
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-600">Analyzing market data...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Input Form */}
                        <div className="md:col-span-1 bg-gray-50 p-5 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Property Details</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Locality/Mohalla
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={locality}
                                        onChange={(e) => setLocality(e.target.value)}
                                    >
                                        <option value="">Select Locality</option>
                                        {localities.map((loc, index) => (
                                            <option key={index} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Land Type
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={landType}
                                        onChange={(e) => setLandType(e.target.value)}
                                    >
                                        <option value="">Select Land Type</option>
                                        {landTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Property Type
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={propertyType}
                                        onChange={(e) => setPropertyType(e.target.value)}
                                    >
                                        <option value="">Select Property Type</option>
                                        <option value="residential">Residential (आवासीय)</option>
                                        <option value="commercial">Commercial (व्यवसायिक)</option>
                                        <option value="agricultural">Agricultural (कृषि)</option>
                                        <option value="mixed">Mixed Use (मिक्स्ड यूज)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Area (वर्ग मीटर)
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                        placeholder="Enter area in square meters"
                                        min="0"
                                    />
                                </div>

                                <button
                                    onClick={calculatePropertyValue}
                                    disabled={!locality || !landType || !area || !propertyType || isCalculating}
                                    className={`w-full py-2 px-4 rounded-md font-medium text-white ${!locality || !landType || !area || !propertyType || isCalculating
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                        } transition duration-200`}
                                >
                                    {isCalculating ? (
                                        <span className="flex items-center justify-center">
                                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                                            Calculating...
                                        </span>
                                    ) : 'Estimate Value'}
                                </button>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="md:col-span-2">
                            {estimatedValue !== null ? (
                                <>
                                    {/* Value Estimate Card */}
                                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800">Estimated Value</h3>
                                            <div className="flex items-center mt-2 sm:mt-0">
                                                <div className={`h-3 w-3 rounded-full ${getConfidenceColor(confidenceLevel)} mr-2`}></div>
                                                <span className="text-sm text-gray-600 capitalize">{confidenceLevel} confidence</span>
                                            </div>
                                        </div>

                                        <div className="text-3xl font-bold text-blue-700 mb-2">
                                            {formatCurrency(estimatedValue)}
                                        </div>

                                        <div className="text-sm text-gray-600 mb-4">
                                            Based on {similarProperties.length} similar properties in {locality}
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div className="bg-blue-50 p-3 rounded-md">
                                                <div className="text-xs text-gray-500 mb-1">Property Area</div>
                                                <div className="font-semibold">{formatArea(parseFloat(area))}</div>
                                            </div>

                                            <div className="bg-blue-50 p-3 rounded-md">
                                                <div className="text-xs text-gray-500 mb-1">Avg. Price/sqm</div>
                                                <div className="font-semibold">{formatCurrency(priceFactors?.basePrice)}</div>
                                            </div>

                                            <div className="bg-blue-50 p-3 rounded-md">
                                                <div className="text-xs text-gray-500 mb-1">Property Type</div>
                                                <div className="font-semibold capitalize">{propertyType}</div>
                                            </div>
                                        </div>

                                        {/* Advanced details toggle */}
                                        <div className="mt-5 pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => setShowAdvanced(!showAdvanced)}
                                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                            >
                                                <Settings size={14} className="mr-1" />
                                                {showAdvanced ? 'Hide' : 'Show'} calculation details
                                            </button>
                                        </div>

                                        {/* Advanced calculation details */}
                                        {showAdvanced && priceFactors && (
                                            <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm">
                                                <h4 className="font-medium text-gray-700 mb-2">How we calculated this estimate:</h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span>Base price per sqm:</span>
                                                        <span className="font-medium">{formatCurrency(priceFactors.basePrice)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Property type adjustment:</span>
                                                        <span className="font-medium">× {priceFactors.propertyTypeMultiplier.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Area size adjustment:</span>
                                                        <span className="font-medium">× {priceFactors.areaMultiplier.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                                                        <span>Total calculation:</span>
                                                        <span>
                                                            {formatCurrency(priceFactors.basePrice)} × {area} × {priceFactors.propertyTypeMultiplier.toFixed(2)} × {priceFactors.areaMultiplier.toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-3 text-xs text-gray-500 flex items-start">
                                                    <Info size={12} className="mr-1 mt-0.5 flex-shrink-0" />
                                                    <span>
                                                        This is an estimate based on available data. Actual market values may vary.
                                                        Consult with a professional valuer for an official property valuation.
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Similar Properties */}
                                    {similarProperties.length > 0 && (
                                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparable Properties</h3>

                                            <div className="space-y-4">
                                                {similarProperties.map((property, index) => (
                                                    <div key={index} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="font-medium text-gray-800">Property in {property.locality}</h4>
                                                                <p className="text-sm text-gray-600 mt-1">{property.propertyDescription || 'No description'}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="font-medium text-blue-700">{formatCurrency(property.transactionValue)}</div>
                                                                <div className="text-xs text-gray-500">Registered in {property.year}</div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                                                            <div>
                                                                <span className="text-gray-500">Area:</span>{' '}
                                                                <span className="font-medium">{formatArea(property.area)}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-gray-500">Price/sqm:</span>{' '}
                                                                <span className="font-medium">
                                                                    {formatCurrency(property.transactionValue / property.area)}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="text-gray-500">Doc #:</span>{' '}
                                                                <span className="font-medium">{property.documentNumber}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Disclaimer */}
                                            <div className="mt-4 text-xs text-gray-500 flex items-start p-3 bg-yellow-50 rounded-md">
                                                <AlertTriangle size={14} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <p>
                                                    Past transactions may not reflect current market conditions. This estimate
                                                    is for informational purposes only and should not be used as the sole basis
                                                    for financial decisions.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                                    <Map className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">Enter property details</h3>
                                    <p className="text-gray-500 max-w-md mx-auto">
                                        Fill in the property details on the left to get an estimated market value based on
                                        similar properties in the area.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyValueEstimator;