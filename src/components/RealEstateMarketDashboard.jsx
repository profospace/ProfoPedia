import React, { useState, useEffect } from 'react';
import { FileText, TrendingUp, Map, Calendar, Filter, RefreshCw } from 'lucide-react';
import AreaPriceTrendAnalysis from './AreaPriceTrendAnalysis';
// import MarketPredictiveAnalytics from './MarketPredictiveAnalytics';
import PropertyComparisonAnalyzer from './PropertyComparisonAnalyzer';

const RealEstateMarketDashboard = ({ data, loading = false, refresh = () => { } }) => {
    const [deeds, setDeeds] = useState([]);
    const [stats, setStats] = useState({
        totalDeeds: 0,
        avgArea: 0,
        avgPrice: 0,
        avgPricePerSqm: 0
    });

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Process the data
        processData();
    }, [data]);

    const processData = () => {
        // Calculate basic statistics
        const totalDeeds = data.length;
        let totalArea = 0;
        let totalPrice = 0;
        let validAreaCount = 0;
        let validPriceCount = 0;

        data.forEach(deed => {
            if (deed.area && deed.area > 0) {
                totalArea += deed.area;
                validAreaCount++;
            }

            if (deed.transactionValue && deed.transactionValue > 0) {
                totalPrice += deed.transactionValue;
                validPriceCount++;
            }
        });

        const avgArea = validAreaCount > 0 ? totalArea / validAreaCount : 0;
        const avgPrice = validPriceCount > 0 ? totalPrice / validPriceCount : 0;
        const avgPricePerSqm = (validAreaCount > 0 && validPriceCount > 0) ? totalPrice / totalArea : 0;

        setStats({
            totalDeeds,
            avgArea,
            avgPrice,
            avgPricePerSqm
        });

        setDeeds(data);
    };

    // Generate time period for display
    const getTimePeriod = () => {
        if (!deeds || deeds.length === 0) return 'No data';

        // Find earliest and latest registration dates
        const dates = deeds.map(deed => {
            return deed.registrationDateParsed
                ? new Date(deed.registrationDateParsed)
                : new Date(deed.registrationDate);
        }).filter(date => date instanceof Date && !isNaN(date));

        if (dates.length === 0) return 'No valid dates';

        const earliestDate = new Date(Math.min(...dates));
        const latestDate = new Date(Math.max(...dates));

        const formatDate = (date) => {
            return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        };

        return `${formatDate(earliestDate)} - ${formatDate(latestDate)}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Loading real estate market data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Dashboard Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Real Estate Market Analytics</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            <Calendar className="inline w-4 h-4 mr-1 -mt-1" />
                            {getTimePeriod()}
                        </p>
                    </div>

                    <button
                        onClick={refresh}
                        className="mt-3 sm:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh Data
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 rounded-full bg-indigo-100 text-indigo-600">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Deeds</p>
                                <h3 className="text-xl font-semibold text-gray-900">{stats.totalDeeds.toLocaleString()}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 rounded-full bg-green-100 text-green-600">
                                <Map className="w-6 h-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Avg. Property Size</p>
                                <h3 className="text-xl font-semibold text-gray-900">{stats.avgArea.toFixed(2)} sqm</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 rounded-full bg-blue-100 text-blue-600">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Avg. Property Value</p>
                                <h3 className="text-xl font-semibold text-gray-900">₹{(stats.avgPrice / 100000).toFixed(2)}L</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 rounded-full bg-purple-100 text-purple-600">
                                <Filter className="w-6 h-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Price per Sq. Meter</p>
                                <h3 className="text-xl font-semibold text-gray-900">₹{stats.avgPricePerSqm.toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Components */}
                <div className="space-y-6">
                    {/* Area Price Trend Analysis */}
                    <h1>Shjdh</h1>
                    <AreaPriceTrendAnalysis data={deeds} />

                    {/* Market Predictive Analytics */}
                    {/* <MarketPredictiveAnalytics data={deeds} /> */}

                    {/* Property Comparison Analyzer */}
                    <PropertyComparisonAnalyzer data={deeds} />
                </div>

                {/* Analytics Summary */}
                <div className="mt-8 bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Real Estate Market Summary</h2>
                    <div className="prose max-w-none text-gray-600">
                        <p>
                            This dashboard provides comprehensive insights into the real estate market trends based on {stats.totalDeeds} property deeds.
                            Key analytics include:
                        </p>
                        <ul>
                            <li>Area-wise monthly price trends to identify price appreciation or depreciation patterns</li>
                            <li>Predictive market analytics with 6-month forecasting using linear regression</li>
                            <li>Property market segmentation by land type, location, and value</li>
                            <li>Identification of market hotspots with highest growth potential</li>
                            <li>District-by-district comparison of property values and trends</li>
                        </ul>
                        <p>
                            The analytics provide property investors, developers, and market analysts with actionable insights to make data-driven decisions
                            in the real estate market.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealEstateMarketDashboard;