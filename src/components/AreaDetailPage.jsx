import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building, MapPin, Users, Calendar, TrendingUp, Home, Briefcase } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AreaDetailPage = ({ data, areaName, onBack }) => {
    const [areaData, setAreaData] = useState([]);
    const [priceData, setPriceData] = useState([]);
    const [transactionTypeData, setTransactionTypeData] = useState([]);
    const [propertyTypeData, setPropertyTypeData] = useState([]);
    const [buyerSellerData, setBuyerSellerData] = useState([]);
    const [timeFrame, setTimeFrame] = useState('monthly');

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    useEffect(() => {
        if (!data || data.length === 0 || !areaName) return;

        // Filter data for the selected area
        const filteredData = data.filter(deed => deed.locality === areaName);
        setAreaData(filteredData);

        processTimeSeriesData(filteredData);
        processTransactionTypes(filteredData);
        processPropertyTypes(filteredData);
        processBuyerSellerData(filteredData);
    }, [data, areaName, timeFrame]);

    const processTimeSeriesData = (filteredData) => {
        // Parse dates and group by time period
        const dateProcessed = filteredData.map(deed => {
            const registrationDate = deed.registrationDateParsed
                ? new Date(deed.registrationDateParsed)
                : new Date(deed.registrationDate);

            return {
                ...deed,
                month: registrationDate.getMonth() + 1,
                year: registrationDate.getFullYear(),
                monthYear: `${registrationDate.getMonth() + 1}/${registrationDate.getFullYear()}`,
                quarter: `Q${Math.floor(registrationDate.getMonth() / 3) + 1}/${registrationDate.getFullYear()}`,
                pricePerSqm: deed.transactionValue && deed.area ? deed.transactionValue / deed.area : 0
            };
        });

        // Group by time period
        const groupKey = timeFrame === 'monthly' ? 'monthYear' : 'quarter';
        const groupedData = {};

        dateProcessed.forEach(deed => {
            const key = deed[groupKey];
            if (!key) return;

            if (!groupedData[key]) {
                groupedData[key] = {
                    period: key,
                    count: 0,
                    totalValue: 0,
                    totalArea: 0
                };
            }

            groupedData[key].count += 1;
            groupedData[key].totalValue += deed.transactionValue || 0;
            groupedData[key].totalArea += deed.area || 0;
        });

        // Convert to array and calculate averages
        const chartData = Object.values(groupedData).map(item => ({
            ...item,
            avgValue: item.totalValue / item.count || 0,
            avgPricePerSqm: item.totalValue / item.totalArea || 0
        }));

        // Sort by time period
        chartData.sort((a, b) => {
            if (timeFrame === 'monthly') {
                const [aMonth, aYear] = a.period.split('/').map(Number);
                const [bMonth, bYear] = b.period.split('/').map(Number);
                return aYear === bYear ? aMonth - bMonth : aYear - bYear;
            } else {
                const [aQ, aYear] = a.period.split('/');
                const [bQ, bYear] = b.period.split('/');
                return aYear === bYear ? aQ.localeCompare(bQ) : aYear - bYear;
            }
        });

        setPriceData(chartData);
    };

    const processTransactionTypes = (filteredData) => {
        // Group data by deed type
        const typeGroups = {};

        filteredData.forEach(deed => {
            const type = deed.deedType || 'Unknown';

            if (!typeGroups[type]) {
                typeGroups[type] = {
                    name: type,
                    count: 0,
                    value: 0
                };
            }

            typeGroups[type].count += 1;
            typeGroups[type].value += deed.transactionValue || 0;
        });

        // Convert to array
        const types = Object.values(typeGroups);

        // Sort by count
        types.sort((a, b) => b.count - a.count);

        setTransactionTypeData(types);
    };

    const processPropertyTypes = (filteredData) => {
        // Group data by land type
        const typeGroups = {};

        filteredData.forEach(deed => {
            const type = deed.landType || 'Unknown';

            if (!typeGroups[type]) {
                typeGroups[type] = {
                    name: type,
                    count: 0,
                    value: 0,
                    area: 0
                };
            }

            typeGroups[type].count += 1;
            typeGroups[type].value += deed.transactionValue || 0;
            typeGroups[type].area += deed.area || 0;
        });

        // Convert to array
        const types = Object.values(typeGroups);

        // Sort by count
        types.sort((a, b) => b.count - a.count);

        setPropertyTypeData(types);
    };

    const processBuyerSellerData = (filteredData) => {
        // Extract buyer (second party) and seller (first party) counts
        const buyers = new Set();
        const sellers = new Set();

        filteredData.forEach(deed => {
            if (deed.firstParty && deed.firstParty.length > 0) {
                deed.firstParty.forEach(party => {
                    if (party.name) sellers.add(party.name);
                });
            }

            if (deed.secondParty && deed.secondParty.length > 0) {
                deed.secondParty.forEach(party => {
                    if (party.name) buyers.add(party.name);
                });
            }
        });

        setBuyerSellerData([
            { name: 'Buyers', value: buyers.size },
            { name: 'Sellers', value: sellers.size }
        ]);
    };

    const calculateGrowth = () => {
        if (priceData.length < 2) return { lastPeriod: 0, overall: 0 };

        const lastIndex = priceData.length - 1;
        const lastValue = priceData[lastIndex].avgValue;
        const previousValue = priceData[lastIndex - 1].avgValue;
        const firstValue = priceData[0].avgValue;

        const lastPeriodGrowth = previousValue ? ((lastValue - previousValue) / previousValue) * 100 : 0;
        const overallGrowth = firstValue ? ((lastValue - firstValue) / firstValue) * 100 : 0;

        return {
            lastPeriod: lastPeriodGrowth.toFixed(2),
            overall: overallGrowth.toFixed(2)
        };
    };

    const growth = calculateGrowth();

    // Calculate area stats
    const totalTransactions = areaData.length;
    const totalValue = areaData.reduce((sum, deed) => sum + (deed.transactionValue || 0), 0);
    const avgPropertySize = areaData.reduce((sum, deed) => sum + (deed.area || 0), 0) / totalTransactions || 0;

    // Format value for display
    const formatCurrency = (value) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(2)} Lac`;
        if (value >= 1000) return `₹${(value / 1000).toFixed(2)}K`;
        return `₹${value.toFixed(2)}`;
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            {/* Header with back button */}
            <div className="flex items-center mb-6">
                <button
                    onClick={onBack}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                        <MapPin className="w-6 h-6 mr-2 text-indigo-600" />
                        {areaName}
                    </h1>
                    <p className="text-sm text-gray-500">Detailed market analytics</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Total Transactions</p>
                            <p className="text-xl font-bold text-gray-800">{totalTransactions}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-full text-green-600">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Total Value</p>
                            <p className="text-xl font-bold text-gray-800">{formatCurrency(totalValue)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                            <Home className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Avg. Property Size</p>
                            <p className="text-xl font-bold text-gray-800">{avgPropertySize.toFixed(2)} sq.m</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Price Growth</p>
                            <p className={`text-xl font-bold ${Number(growth.overall) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {Number(growth.overall) >= 0 ? '+' : ''}{growth.overall}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AreaDetailPage;