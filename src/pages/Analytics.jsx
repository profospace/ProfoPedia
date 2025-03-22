import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    RefreshCw,
    ArrowDown,
    Calendar,
    DollarSign,
    FileText,
    MapPin,
    Download,
    Eye
} from 'lucide-react';
import DeedTypeChart from '../components/DeedTypeChart';
import TransactionTrendsChart from '../components/TransactionTrendsChart';
import DistrictMapChart from '../components/DistrictMapChart';
import ValueComparisonChart from '../components/ValueComparisonChart';
import StampDutyChart from '../components/StampDutyChart';

function Analytics() {
    const [activeTab, setActiveTab] = useState('overview');
    const [timeRange, setTimeRange] = useState('1y');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchAnalyticsData();
    }, [timeRange]);

    const fetchAnalyticsData = async () => {
        try {
            setLoading(true);

            // Add time range to request if needed
            const params = {};
            if (timeRange !== 'all') {
                const today = new Date();
                let fromDate = new Date();

                switch (timeRange) {
                    case '1m':
                        fromDate.setMonth(today.getMonth() - 1);
                        break;
                    case '3m':
                        fromDate.setMonth(today.getMonth() - 3);
                        break;
                    case '6m':
                        fromDate.setMonth(today.getMonth() - 6);
                        break;
                    case '1y':
                        fromDate.setFullYear(today.getFullYear() - 1);
                        break;
                    default:
                        break;
                }

                params.fromDate = fromDate.toISOString().split('T')[0];
                params.toDate = today.toISOString().split('T')[0];
            }

            const response = await axios.get('/stats', { params });
            setStats(response.data.data);
            setError(null);
        } catch (err) {
            setError('Failed to load analytics data. Please try again.');
            console.error('Error fetching analytics:', err);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to format currency values
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    // Helper function to format large numbers with K, M, B
    const formatNumber = (num) => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Loading analytics data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center justify-between">
                <p>{error}</p>
                <button
                    onClick={fetchAnalyticsData}
                    className="bg-white px-3 py-1 rounded-md border border-red-300 text-sm font-medium"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">Analytics & Insights</h1>

                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    {/* Time range selector */}
                    <div className="inline-flex shadow-sm rounded-md">
                        <button
                            onClick={() => setTimeRange('1m')}
                            className={`px-4 py-2 text-sm font-medium rounded-l-md ${timeRange === '1m'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                } border border-gray-300`}
                        >
                            1M
                        </button>
                        <button
                            onClick={() => setTimeRange('3m')}
                            className={`px-4 py-2 text-sm font-medium ${timeRange === '3m'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                } border-t border-b border-gray-300`}
                        >
                            3M
                        </button>
                        <button
                            onClick={() => setTimeRange('6m')}
                            className={`px-4 py-2 text-sm font-medium ${timeRange === '6m'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                } border-t border-b border-gray-300`}
                        >
                            6M
                        </button>
                        <button
                            onClick={() => setTimeRange('1y')}
                            className={`px-4 py-2 text-sm font-medium ${timeRange === '1y'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                } border-t border-b border-gray-300`}
                        >
                            1Y
                        </button>
                        <button
                            onClick={() => setTimeRange('all')}
                            className={`px-4 py-2 text-sm font-medium rounded-r-md ${timeRange === 'all'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                } border border-gray-300`}
                        >
                            All
                        </button>
                    </div>

                    <button
                        onClick={fetchAnalyticsData}
                        className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </button>

                    <button
                        className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <nav className="flex space-x-8" aria-label="Analytics tabs">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'overview'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('transactions')}
                        className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'transactions'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Transactions
                    </button>
                    <button
                        onClick={() => setActiveTab('geographic')}
                        className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'geographic'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Geographic
                    </button>
                    <button
                        onClick={() => setActiveTab('documents')}
                        className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'documents'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Documents
                    </button>
                </nav>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div>
                    {/* Stats cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {/* Total Deeds */}
                        <div className="bg-white rounded-lg shadow p-5">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Total Deeds</p>
                                    <h3 className="text-2xl font-semibold text-gray-900">
                                        {stats?.totalDeeds ? formatNumber(stats.totalDeeds) : 0}
                                    </h3>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="text-green-500 flex items-center">
                                    <ArrowDown className="w-4 h-4 transform rotate-180 mr-1" />
                                    {/* This would be a comparison with previous period */}
                                    4.75%
                                </span>
                                <span className="text-gray-500 ml-2">vs previous period</span>
                            </div>
                        </div>

                        {/* Transaction Value */}
                        <div className="bg-white rounded-lg shadow p-5">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-green-100 text-green-600">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Transaction Value</p>
                                    <h3 className="text-2xl font-semibold text-gray-900">
                                        {stats?.financialStats?.totalTransactionValue
                                            ? formatCurrency(stats.financialStats.totalTransactionValue)
                                            : '₹0'}
                                    </h3>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="text-green-500 flex items-center">
                                    <ArrowDown className="w-4 h-4 transform rotate-180 mr-1" />
                                    8.2%
                                </span>
                                <span className="text-gray-500 ml-2">vs previous period</span>
                            </div>
                        </div>

                        {/* Market Value */}
                        <div className="bg-white rounded-lg shadow p-5">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Market Value</p>
                                    <h3 className="text-2xl font-semibold text-gray-900">
                                        {stats?.financialStats?.totalMarketValue
                                            ? formatCurrency(stats.financialStats.totalMarketValue)
                                            : '₹0'}
                                    </h3>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="text-green-500 flex items-center">
                                    <ArrowDown className="w-4 h-4 transform rotate-180 mr-1" />
                                    6.8%
                                </span>
                                <span className="text-gray-500 ml-2">vs previous period</span>
                            </div>
                        </div>

                        {/* Stamp Duty */}
                        <div className="bg-white rounded-lg shadow p-5">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Stamp Duty</p>
                                    <h3 className="text-2xl font-semibold text-gray-900">
                                        {stats?.financialStats?.totalStampDuty
                                            ? formatCurrency(stats.financialStats.totalStampDuty)
                                            : '₹0'}
                                    </h3>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="text-green-500 flex items-center">
                                    <ArrowDown className="w-4 h-4 transform rotate-180 mr-1" />
                                    5.1%
                                </span>
                                <span className="text-gray-500 ml-2">vs previous period</span>
                            </div>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow p-5">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Trends</h3>
                            <div className="h-80">
                                <TransactionTrendsChart data={stats?.monthlyTrends || []} />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-5">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Deed Type Distribution</h3>
                            <div className="h-80">
                                <DeedTypeChart data={stats?.deedTypes || []} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow p-5 lg:col-span-2">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Market vs Transaction Values</h3>
                            <div className="h-80">
                                <ValueComparisonChart data={stats?.monthlyTrends || []} />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-5">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Districts</h3>
                            <div className="space-y-4">
                                {stats?.districts?.slice(0, 5).map((district, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">{district._id || 'Unknown'}</p>
                                                <p className="ml-2 text-xs font-medium text-gray-500">{district.count} deeds</p>
                                            </div>
                                            <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-indigo-600 h-2 rounded-full"
                                                    style={{
                                                        width: `${Math.min(100, (district.count / (stats.districts[0]?.count || 1)) * 100)}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white rounded-lg shadow p-5">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Value Trends</h3>
                        <div className="h-96">
                            <TransactionTrendsChart data={stats?.monthlyTrends || []} showVolume={true} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow p-5">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Market vs Transaction Value</h3>
                            <div className="h-80">
                                <ValueComparisonChart data={stats?.monthlyTrends || []} />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-5">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Stamp Duty Collection</h3>
                            <div className="h-80">
                                <StampDutyChart data={stats?.monthlyTrends || []} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">High Value Transactions</h3>
                        </div>
                        <div className="p-5">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Document #
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                District
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Property Type
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Value
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {/* Sample high-value transactions - in reality, this would come from API */}
                                        {[1, 2, 3, 4, 5].map((item) => (
                                            <tr key={item} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    DEED-{Math.floor(1000 + Math.random() * 9000)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {['Kanpur', 'Lucknow', 'Varanasi', 'Agra', 'Noida'][Math.floor(Math.random() * 5)]}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {['Residential', 'Commercial', 'Agricultural', 'Industrial'][Math.floor(Math.random() * 4)]}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatCurrency(Math.floor(1000000 + Math.random() * 9000000))}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900">
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Geographic Tab */}
            {activeTab === 'geographic' && (
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white rounded-lg shadow p-5">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">District Distribution Map</h3>
                        <div className="h-96">
                            <DistrictMapChart data={stats?.districts || []} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Districts by Transaction Value</h3>
                            </div>
                            <div className="p-5">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                District
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Deeds
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total Value
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {stats?.districts?.slice(0, 10).map((district, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {district._id || 'Unknown'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {district.count}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                                    {formatCurrency(district.totalValue)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-5">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Localities</h3>
                            <div className="space-y-4">
                                {/* This would come from API in a real implementation */}
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                    <div key={item} className="flex items-center">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {['Arya Nagar', 'Civil Lines', 'Swaroop Nagar', 'Kidwai Nagar', 'Kakadeo', 'Govind Nagar', 'Kalyanpur', 'Shastri Nagar'][item - 1]}
                                                </p>
                                                <p className="ml-2 text-xs font-medium text-gray-500">
                                                    {Math.floor(10 + Math.random() * 90)} deeds
                                                </p>
                                            </div>
                                            <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-indigo-600 h-2 rounded-full"
                                                    style={{
                                                        width: `${Math.min(100, Math.random() * 100)}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
                <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow p-5">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Deed Type Distribution</h3>
                            <div className="h-80">
                                <DeedTypeChart data={stats?.deedTypes || []} />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-5">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Registration Volume</h3>
                            <div className="h-80">
                                <TransactionTrendsChart data={stats?.monthlyTrends || []} showValue={false} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Deed Types Analysis</h3>
                        </div>
                        <div className="p-5">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Deed Type
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Count
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                % of Total
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Average Value
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total Value
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {stats?.deedTypes?.map((type, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {type._id || 'Unknown'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {type.count}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {((type.count / stats.totalDeeds) * 100).toFixed(1)}%
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                                    {formatCurrency(type.totalValue / type.count)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                                    {formatCurrency(type.totalValue)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-5">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Timeline</h3>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                        Average Time between Execution and Registration
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-indigo-600">
                                        2.3 days
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                                <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
                            </div>
                            <p className="text-sm text-gray-600">
                                Most deeds (87%) are registered within 3 days of execution. The statutory limit is 4 months.
                            </p>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-indigo-50 rounded-lg p-4">
                                    <p className="text-xs font-medium text-indigo-600 uppercase">Same Day</p>
                                    <p className="mt-2 text-3xl font-bold text-indigo-900">65%</p>
                                    <p className="mt-1 text-sm text-indigo-700">of all registrations</p>
                                </div>
                                <div className="bg-indigo-50 rounded-lg p-4">
                                    <p className="text-xs font-medium text-indigo-600 uppercase">Within 3 Days</p>
                                    <p className="mt-2 text-3xl font-bold text-indigo-900">22%</p>
                                    <p className="mt-1 text-sm text-indigo-700">of all registrations</p>
                                </div>
                                <div className="bg-indigo-50 rounded-lg p-4">
                                    <p className="text-xs font-medium text-indigo-600 uppercase">More than 3 Days</p>
                                    <p className="mt-2 text-3xl font-bold text-indigo-900">13%</p>
                                    <p className="mt-1 text-sm text-indigo-700">of all registrations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Analytics;