import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Home, TrendingUp, Users } from 'lucide-react';
import _ from 'lodash';

// Hypothetical income data (since real income data isn't available)
// In a real application, this would come from actual income data sources
const INCOME_DATA = {
    // Using average household income estimates for demonstration purposes
    "मथुरा": 650000, // 6.5 lakhs per year
    // Add more districts as needed with estimated income values
    "Average": 550000 // 5.5 lakhs per year (fallback value)
};

// Interest rate for mortgage calculations (hypothetical)
const MORTGAGE_RATE = 8.5; // 8.5% annual interest rate
const LOAN_TERM_YEARS = 20; // 20-year loan term
const DOWN_PAYMENT_PERCENT = 20; // 20% down payment

const AffordabilityIndexAnalysis = ({ data }) => {
    const [affordabilityData, setAffordabilityData] = useState([]);
    const [districtAffordability, setDistrictAffordability] = useState([]);
    const [propertyTypeAffordability, setPropertyTypeAffordability] = useState([]);
    const [affordabilityTrend, setAffordabilityTrend] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!data || data.length === 0) {
            setLoading(false);
            return;
        }

        // Process the data
        calculateAffordabilityMetrics();
    }, [data]);

    // Calculate monthly mortgage payment
    const calculateMonthlyPayment = (loanAmount) => {
        const monthlyRate = MORTGAGE_RATE / 100 / 12;
        const totalPayments = LOAN_TERM_YEARS * 12;

        // Avoid division by zero
        if (monthlyRate === 0) return loanAmount / totalPayments;

        // Standard mortgage payment formula
        return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
            (Math.pow(1 + monthlyRate, totalPayments) - 1);
    };

    // Calculate affordability index
    // Higher index = more affordable (ratio of income to required income)
    const calculateAffordabilityIndex = (propertyPrice, income) => {
        // Calculate loan amount after down payment
        const loanAmount = propertyPrice * (1 - DOWN_PAYMENT_PERCENT / 100);

        // Calculate monthly payment
        const monthlyPayment = calculateMonthlyPayment(loanAmount);

        // Maximum recommended payment (30% of monthly income)
        const maxMonthlyPayment = income / 12 * 0.3;

        // Affordability index: ratio of max affordable payment to required payment
        // Above 1 = affordable, below 1 = unaffordable
        return maxMonthlyPayment / monthlyPayment;
    };

    const calculateAffordabilityMetrics = () => {
        // Parse dates
        const processedData = data.map(deed => {
            const registrationDate = deed.registrationDateParsed
                ? new Date(deed.registrationDateParsed)
                : new Date(deed.registrationDate);

            return {
                ...deed,
                parsedDate: registrationDate,
                month: registrationDate.getMonth() + 1,
                year: registrationDate.getFullYear(),
                quarter: Math.floor(registrationDate.getMonth() / 3) + 1,
                // Calculate price per square meter
                pricePerSqm: deed.transactionValue && deed.area ? deed.transactionValue / deed.area : 0
            };
        });

        // Calculate affordability metrics for various property sizes
        // Values are in square meters
        const propertySizes = [50, 100, 150, 200, 250];

        // Average price per square meter
        const avgPricePerSqm = calculateAveragePrice(processedData);

        // Calculate affordability for different property sizes
        const affordabilityBySize = propertySizes.map(size => {
            const propertyPrice = avgPricePerSqm * size;
            // Use average income for overall affordability
            const affordabilityIndex = calculateAffordabilityIndex(propertyPrice, INCOME_DATA.Average);

            return {
                propertySize: size,
                propertyPrice,
                monthlyPayment: calculateMonthlyPayment(propertyPrice * (1 - DOWN_PAYMENT_PERCENT / 100)),
                affordabilityIndex,
                isAffordable: affordabilityIndex >= 1
            };
        });

        setAffordabilityData(affordabilityBySize);

        // Calculate district-wise affordability
        calculateDistrictAffordability(processedData);

        // Calculate property type affordability
        calculatePropertyTypeAffordability(processedData);

        // Calculate affordability trends over time
        calculateAffordabilityTrend(processedData);

        setLoading(false);
    };

    const calculateAveragePrice = (processedData) => {
        const validPriceData = processedData.filter(deed =>
            deed.transactionValue && deed.transactionValue > 0 &&
            deed.area && deed.area > 0
        );

        if (validPriceData.length === 0) return 0;

        const totalValue = _.sumBy(validPriceData, 'transactionValue');
        const totalArea = _.sumBy(validPriceData, 'area');

        return totalValue / totalArea;
    };

    const calculateDistrictAffordability = (processedData) => {
        // Group by district
        const groupedByDistrict = _.groupBy(processedData, 'district');

        const districtData = [];

        Object.entries(groupedByDistrict).forEach(([district, deeds]) => {
            if (!district || district === 'undefined') return;

            // Calculate average price per sqm for this district
            const avgPricePerSqm = calculateAveragePrice(deeds);

            // Use district income or fallback to average
            const districtIncome = INCOME_DATA[district] || INCOME_DATA.Average;

            // Calculate affordability for a standard 100 sqm property
            const standardPropertyPrice = avgPricePerSqm * 100;
            const affordabilityIndex = calculateAffordabilityIndex(standardPropertyPrice, districtIncome);

            districtData.push({
                district,
                avgPricePerSqm,
                standardPropertyPrice,
                affordabilityIndex,
                isAffordable: affordabilityIndex >= 1,
                mortgageToIncomeRatio: (calculateMonthlyPayment(standardPropertyPrice * (1 - DOWN_PAYMENT_PERCENT / 100)) * 12) / districtIncome
            });
        });

        // Sort by affordability index
        const sortedDistricts = _.orderBy(districtData, ['affordabilityIndex'], ['desc']);
        setDistrictAffordability(sortedDistricts);
    };

    const calculatePropertyTypeAffordability = (processedData) => {
        // Extract property types from property description
        const propertyTypeMap = {
            'दुकान': 'Commercial Shop',
            'आवासीय': 'Residential',
            'प्लाट': 'Plot',
            'कृषि': 'Agricultural',
            'मकान': 'House'
        };

        // Group deeds by property type
        const typeDeedGroups = {};

        processedData.forEach(deed => {
            let propertyType = 'Other';

            // Try to determine property type from description or landType
            if (deed.propertyDescription) {
                Object.entries(propertyTypeMap).forEach(([keyword, type]) => {
                    if (deed.propertyDescription.includes(keyword)) {
                        propertyType = type;
                    }
                });
            }

            // Check land type as fallback
            if (propertyType === 'Other' && deed.landType) {
                if (deed.landType === 'कृषि') {
                    propertyType = 'Agricultural';
                }
            }

            // Group by type
            if (!typeDeedGroups[propertyType]) {
                typeDeedGroups[propertyType] = [];
            }

            typeDeedGroups[propertyType].push(deed);
        });

        // Calculate affordability for each property type
        const typeAffordabilityData = [];

        Object.entries(typeDeedGroups).forEach(([type, deeds]) => {
            // Calculate average price per sqm for this property type
            const avgPricePerSqm = calculateAveragePrice(deeds);

            // Calculate median property size
            const validSizeDeeds = deeds.filter(deed => deed.area && deed.area > 0);
            const sortedSizes = _.sortBy(validSizeDeeds, 'area');
            const medianSize = sortedSizes.length > 0
                ? sortedSizes[Math.floor(sortedSizes.length / 2)].area
                : 100; // Default to 100 sqm if no valid sizes

            // Calculate affordability for this property type
            const typicalPropertyPrice = avgPricePerSqm * medianSize;
            const affordabilityIndex = calculateAffordabilityIndex(typicalPropertyPrice, INCOME_DATA.Average);

            typeAffordabilityData.push({
                type,
                avgPricePerSqm,
                medianSize,
                typicalPropertyPrice,
                affordabilityIndex,
                isAffordable: affordabilityIndex >= 1,
                mortgageToIncomeRatio: (calculateMonthlyPayment(typicalPropertyPrice * (1 - DOWN_PAYMENT_PERCENT / 100)) * 12) / INCOME_DATA.Average
            });
        });

        // Sort by affordability index
        const sortedTypes = _.orderBy(typeAffordabilityData, ['affordabilityIndex'], ['desc']);
        setPropertyTypeAffordability(sortedTypes);
    };

    const calculateAffordabilityTrend = (processedData) => {
        // Group by year
        const groupedByYear = _.groupBy(processedData, 'year');

        const trendData = [];

        Object.entries(groupedByYear).forEach(([year, deeds]) => {
            // Calculate average price per sqm for this year
            const avgPricePerSqm = calculateAveragePrice(deeds);

            // Calculate affordability for a standard 100 sqm property
            const standardPropertyPrice = avgPricePerSqm * 100;
            const affordabilityIndex = calculateAffordabilityIndex(standardPropertyPrice, INCOME_DATA.Average);

            trendData.push({
                year: parseInt(year),
                avgPricePerSqm,
                standardPropertyPrice,
                affordabilityIndex,
                isAffordable: affordabilityIndex >= 1
            });
        });

        // Sort by year
        const sortedTrend = _.sortBy(trendData, 'year');
        setAffordabilityTrend(sortedTrend);
    };

    const getAffordabilityColor = (index) => {
        if (index >= 1.5) return '#4CAF50'; // Very Affordable
        if (index >= 1.0) return '#8BC34A'; // Affordable
        if (index >= 0.8) return '#FFC107'; // Moderately Unaffordable
        if (index >= 0.6) return '#FF9800'; // Seriously Unaffordable
        return '#F44336'; // Severely Unaffordable
    };

    const getAffordabilityLabel = (index) => {
        if (index >= 1.5) return 'Very Affordable';
        if (index >= 1.0) return 'Affordable';
        if (index >= 0.8) return 'Moderately Unaffordable';
        if (index >= 0.6) return 'Seriously Unaffordable';
        return 'Severely Unaffordable';
    };

    const COLORS = ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'].reverse();

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600">Calculating affordability metrics...</span>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Real Estate Affordability Analysis</h2>
                <p className="text-sm text-gray-600">
                    Based on estimated average household income of ₹{(INCOME_DATA.Average / 100000).toFixed(1)}L per year,
                    {DOWN_PAYMENT_PERCENT}% down payment, and {MORTGAGE_RATE}% mortgage rate over {LOAN_TERM_YEARS} years.
                </p>
            </div>

            {/* Affordability Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                            <Home className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-xs text-gray-500">Average Price per sqm</p>
                            <p className="text-lg font-semibold">
                                ₹{affordabilityData.length > 0 ? (affordabilityData[0].propertyPrice / affordabilityData[0].propertySize).toFixed(0) : 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 rounded-full bg-green-100 text-green-600">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-xs text-gray-500">Monthly Payment (100sqm)</p>
                            <p className="text-lg font-semibold">
                                ₹{affordabilityData.length > 1 ? Math.round(affordabilityData[1].monthlyPayment).toLocaleString() : 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                            <Users className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-xs text-gray-500">Income Needed (100sqm)</p>
                            <p className="text-lg font-semibold">
                                ₹{affordabilityData.length > 1 ?
                                    ((affordabilityData[1].monthlyPayment / 0.3) * 12 / 100000).toFixed(1) + 'L' :
                                    0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-xs text-gray-500">Affordability Index (100sqm)</p>
                            <p className="text-lg font-semibold">
                                {affordabilityData.length > 1 ? affordabilityData[1].affordabilityIndex.toFixed(2) : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Affordability by Property Size */}
                <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Affordability by Property Size</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={affordabilityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="propertySize" label={{ value: 'Property Size (sqm)', position: 'insideBottom', offset: -5 }} />
                                <YAxis
                                    yAxisId="left"
                                    orientation="left"
                                    label={{ value: 'Affordability Index', angle: -90, position: 'insideLeft' }}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    label={{ value: 'Property Price (₹L)', angle: 90, position: 'insideRight' }}
                                />
                                <Tooltip
                                    formatter={(value, name) => {
                                        if (name === 'Affordability Index') return [value.toFixed(2), name];
                                        if (name === 'Property Price') return [`₹${(value / 100000).toFixed(1)}L`, name];
                                        return [value, name];
                                    }}
                                />
                                <Legend />
                                <Bar
                                    yAxisId="left"
                                    dataKey="affordabilityIndex"
                                    name="Affordability Index"
                                    fill="#8884d8"
                                    barSize={30}
                                >
                                    {affordabilityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={getAffordabilityColor(entry.affordabilityIndex)} />
                                    ))}
                                </Bar>
                                <Bar yAxisId="right" dataKey="propertyPrice" name="Property Price" fill="#82ca9d" barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-xs text-gray-500 flex items-center justify-center">
                        <div className="flex items-center flex-wrap justify-center gap-3">
                            <span>Affordability Scale:</span>
                            {[0.5, 0.7, 0.9, 1.1, 1.5].map((index, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: getAffordabilityColor(index) }}></div>
                                    <span>{getAffordabilityLabel(index)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Affordability by Property Type */}
                <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Affordability by Property Type</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                innerRadius="20%"
                                outerRadius="80%"
                                data={propertyTypeAffordability}
                                startAngle={180}
                                endAngle={0}
                            >
                                <RadialBar
                                    minAngle={15}
                                    background
                                    clockWise={true}
                                    dataKey="affordabilityIndex"
                                    angleAxisId={0}
                                    label={{ position: 'insideStart', fill: '#fff', fontWeight: 'bold' }}
                                >
                                    {propertyTypeAffordability.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={getAffordabilityColor(entry.affordabilityIndex)}
                                        />
                                    ))}
                                </RadialBar>
                                <Legend
                                    iconSize={10}
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    content={(props) => {
                                        const { payload } = props;
                                        return (
                                            <ul className="text-xs">
                                                {payload.map((entry, index) => (
                                                    <li key={`item-${index}`} className="flex items-center mb-2">
                                                        <div
                                                            className="w-3 h-3 mr-2"
                                                            style={{ backgroundColor: entry.color }}
                                                        ></div>
                                                        <span>{propertyTypeAffordability[index]?.type || ''}: </span>
                                                        <span className="ml-1 font-semibold">
                                                            {propertyTypeAffordability[index]?.affordabilityIndex.toFixed(2) || ''}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    }}
                                />
                                <Tooltip
                                    formatter={(value, name, props) => {
                                        const typeData = propertyTypeAffordability[props.payload.index];
                                        return [
                                            <div>
                                                <div>Affordability: {value?.toFixed(2)}</div>
                                                <div>Typical Price: ₹{(typeData?.typicalPropertyPrice / 100000).toFixed(1)}L</div>
                                                <div>Median Size: {typeData?.medianSize?.toFixed(0)} sqm</div>
                                            </div>,
                                            typeData.type
                                        ];
                                    }}
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Affordability Trend */}
                <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Affordability Trend</h3>
                    {affordabilityTrend.length > 1 ? (
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={affordabilityTrend}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis
                                        yAxisId="left"
                                        label={{ value: 'Affordability Index', angle: -90, position: 'insideLeft' }}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        label={{ value: 'Price per sqm (₹)', angle: 90, position: 'insideRight' }}
                                    />
                                    <Tooltip
                                        formatter={(value, name) => {
                                            if (name === 'Affordability Index') return [value.toFixed(2), name];
                                            if (name === 'Avg Price per sqm') return [`₹${value.toFixed(0)}`, name];
                                            return [value, name];
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="affordabilityIndex"
                                        name="Affordability Index"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                        dot={{ r: 5 }}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="avgPricePerSqm"
                                        name="Avg Price per sqm"
                                        stroke="#82ca9d"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
                            <p className="text-gray-500 italic">Insufficient historical data for trend analysis</p>
                        </div>
                    )}
                </div>

                {/* District Affordability */}
                <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">District Affordability</h3>
                    {districtAffordability.length > 0 ? (
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={districtAffordability}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis
                                        type="category"
                                        dataKey="district"
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip
                                        formatter={(value, name) => {
                                            if (name === 'Affordability Index') return [value.toFixed(2), name];
                                            if (name === 'Mortgage to Income Ratio') return [`${(value * 100).toFixed(0)}%`, name];
                                            return [value, name];
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="affordabilityIndex"
                                        name="Affordability Index"
                                        fill="#8884d8"
                                    >
                                        {districtAffordability.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getAffordabilityColor(entry.affordabilityIndex)} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="mortgageToIncomeRatio" name="Mortgage to Income Ratio" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
                            <p className="text-gray-500 italic">No district data available</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Insights */}
            <div className="mt-6 bg-blue-50 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Affordability Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <h4 className="text-base font-semibold text-gray-700 mb-2">Key Findings</h4>
                        <ul className="space-y-2 text-sm">
                            {affordabilityData.length > 0 && (
                                <>
                                    <li className="flex items-start">
                                        <span className={`mr-2 ${affordabilityData[1]?.isAffordable ? 'text-green-500' : 'text-red-500'}`}>
                                            {affordabilityData[1]?.isAffordable ? '✓' : '✗'}
                                        </span>
                                        <span>
                                            A standard 100 sqm property requires
                                            {affordabilityData.length > 1 ?
                                                ` ₹${((affordabilityData[1].monthlyPayment / 0.3) * 12 / 100000).toFixed(1)}L` :
                                                ''} annual income
                                            ({affordabilityData.length > 1 && affordabilityData[1].isAffordable ?
                                                'affordable' :
                                                'unaffordable'} for average household)
                                        </span>
                                    </li>

                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        <span>
                                            Maximum affordable property size: {
                                                affordabilityData.find(item => item.affordabilityIndex < 1) ?
                                                    affordabilityData.find(item => item.affordabilityIndex < 1).propertySize - 50 :
                                                    'Over 250'
                                            } sqm
                                        </span>
                                    </li>
                                </>
                            )}

                            {propertyTypeAffordability.length > 0 && (
                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2">•</span>
                                    <span>
                                        Most affordable property type: {
                                            propertyTypeAffordability.sort((a, b) => b.affordabilityIndex - a.affordabilityIndex)[0].type
                                        } (index: {
                                            propertyTypeAffordability.sort((a, b) => b.affordabilityIndex - a.affordabilityIndex)[0].affordabilityIndex.toFixed(2)
                                        })
                                    </span>
                                </li>
                            )}

                            {affordabilityTrend.length > 1 && (
                                <li className="flex items-start">
                                    <span className={`mr-2 ${affordabilityTrend[affordabilityTrend.length - 1].affordabilityIndex >
                                            affordabilityTrend[affordabilityTrend.length - 2].affordabilityIndex ?
                                            'text-green-500' : 'text-red-500'
                                        }`}>
                                        {affordabilityTrend[affordabilityTrend.length - 1].affordabilityIndex >
                                            affordabilityTrend[affordabilityTrend.length - 2].affordabilityIndex ?
                                            '▲' : '▼'
                                        }
                                    </span>
                                    <span>
                                        Affordability is {
                                            affordabilityTrend[affordabilityTrend.length - 1].affordabilityIndex >
                                                affordabilityTrend[affordabilityTrend.length - 2].affordabilityIndex ?
                                                'improving' : 'declining'
                                        } year over year
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base font-semibold text-gray-700 mb-2">Recommendations</h4>
                        <ul className="space-y-2 text-sm">
                            {affordabilityData.filter(item => item.isAffordable).length > 0 && (
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>
                                        Consider properties under {
                                            Math.max(...affordabilityData.filter(item => item.isAffordable).map(item => item.propertySize))
                                        } sqm for affordable mortgage payments
                                    </span>
                                </li>
                            )}

                            {districtAffordability.filter(d => d.isAffordable).length > 0 && (
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>
                                        Most affordable districts: {
                                            districtAffordability
                                                .filter(d => d.isAffordable)
                                                .slice(0, 2)
                                                .map(d => d.district)
                                                .join(', ')
                                        }
                                    </span>
                                </li>
                            )}

                            {propertyTypeAffordability.length > 0 && (
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    <span>
                                        {propertyTypeAffordability[0].affordabilityIndex < 1 ?
                                            `Consider smaller properties or explore financing options with longer terms to improve affordability` :
                                            `Typical properties are affordable with standard financing terms`
                                        }
                                    </span>
                                </li>
                            )}

                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>
                                    Aim to keep monthly mortgage payments below 30% of monthly income
                                    (₹{(INCOME_DATA.Average / 12 * 0.3).toFixed(0)} for average income)
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AffordabilityIndexAnalysis;