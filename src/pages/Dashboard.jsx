import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FileText,
    TrendingUp,
    Users,
    DollarSign,
    RefreshCw,
    ArrowRight,
    MapPin,
    Calendar
} from 'lucide-react';
import RecentDeedsTable from '../components/RecentDeedsTable';
import DeedTypeChart from '../components/DeedTypeChart';
import TransactionTrendsChart from '../components/TransactionTrendsChart';
import axios from 'axios';
import { base_url } from '../utils/base_url';
import PropertyTypeChart from '../components/PropertyTypeChart';

function Dashboard({ stats, loading, error, refresh , deeds }) {

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-6 max-w-md bg-white rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold text-red-600 mb-2">Error Loading Data</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={refresh}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Extract data from stats
    const totalDeeds = stats?.totalDeeds || 0;
    const totalTransactionValue = stats?.financialStats?.totalTransactionValue || 0;
    const totalMarketValue = stats?.financialStats?.totalMarketValue || 0;
    const totalStampDuty = stats?.financialStats?.totalStampDuty || 0;
    const avgTransactionValue = stats?.financialStats?.avgTransactionValue || 0;
    const districtStats = stats?.districts || [];
    const deedTypes = stats?.deedTypes || [];

    return (
        <div>
            {/* Page header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <button
                    onClick={refresh}
                    className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Data
                </button>
            </div>

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
                                {totalDeeds.toLocaleString()}
                            </h3>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link
                            to="/deeds"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                        >
                            View all deeds
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
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
                                ₹{(totalTransactionValue / 10000000).toFixed(2)} Cr
                            </h3>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <span className="text-xs font-medium text-gray-500">Avg Value:</span>
                        <span className="ml-1 text-sm font-medium text-gray-700">
                            ₹{(avgTransactionValue / 100000).toFixed(2)} L
                        </span>
                    </div>
                </div>

                {/* Market Value */}
                <div className="bg-white rounded-lg shadow p-5">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Market Value</p>
                            <h3 className="text-2xl font-semibold text-gray-900">
                                ₹{(totalMarketValue / 10000000).toFixed(2)} Cr
                            </h3>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <span className="text-xs font-medium text-gray-500">Total Stamp Duty:</span>
                        <span className="ml-1 text-sm font-medium text-gray-700">
                            ₹{(totalStampDuty / 100000).toFixed(2)} L
                        </span>
                    </div>
                </div>

                {/* Total Parties */}
                <div className="bg-white rounded-lg shadow p-5">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Parties</p>
                            <h3 className="text-2xl font-semibold text-gray-900">
                                {totalDeeds * 2}+
                            </h3>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link
                            to="/parties"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                        >
                            View all parties
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Charts and tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Recent deeds */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-900">Recent Deeds</h2>
                        <Link
                            to="/deeds"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="p-1">
                        <RecentDeedsTable />
                    </div>
                </div>

                {/* Deed type distribution */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Deed Type Distribution</h2>
                    </div>
                    <div className="p-4 h-80">
                        <DeedTypeChart data={deeds} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Property Type Chart</h2>
                    </div>
                    <div className="p-4 h-80">
                        <PropertyTypeChart data={deeds} />
                    </div>
                </div>
            </div>

            {/* Transaction chart and District insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Transaction Value Chart */}
                <div className="bg-white rounded-lg shadow lg:col-span-2">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Transaction Value Trends</h2>
                    </div>
                    <div className="p-4 h-80">
                        <TransactionTrendsChart />
                    </div>
                </div>

                {/* District insights */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Top Districts</h2>
                    </div>
                    <div className="p-4">
                        <ul className="divide-y divide-gray-200">
                            {districtStats.slice(0, 5).map((district, index) => (
                                <li key={index} className="py-3">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {district._id || 'Unknown'}
                                                </p>
                                                <p className="ml-2 text-sm font-medium text-gray-500">
                                                    {district.count} deeds
                                                </p>
                                            </div>
                                            <div className="mt-1 flex items-center justify-between">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-indigo-600 h-2 rounded-full"
                                                        style={{
                                                            width: `${Math.min(100, (district.count / districtStats[0].count) * 100)}%`
                                                        }}
                                                    ></div>
                                                </div>
                                                <p className="ml-3 text-xs text-gray-500 whitespace-nowrap">
                                                    ₹{(district.totalValue / 10000000).toFixed(2)} Cr
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            <Link
                                to="/analytics"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center"
                            >
                                View detailed analytics
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;