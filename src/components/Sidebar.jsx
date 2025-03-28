import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Home,
    FileText,
    BarChart2,
    Upload,
    Users,
    Settings,
    Menu,
    X,
    Home as Property,
    TrendingUp,
    PieChart,
    Calendar,
    Users as Family,
    Map,
    Activity,
    DollarSign,
    ArrowUpDown,
    Clock,
    Target,
    Layers,
    Building,
    BarChart,
    Thermometer
} from 'lucide-react';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef(null);
    const sidebar = useRef(null);

    // Close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // Close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <div>
            {/* Mobile sidebar backdrop */}
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                aria-hidden="true"
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <div
                ref={sidebar}
                className={`fixed h-screen inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform transition-transform duration-200 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 h-16">
                    <div className="flex items-center">
                        <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.5 7.5h-15v9h15v-9zM8.25 14.25h-1.5v-3h1.5v3zM12 14.25h-1.5v-3H12v3zM15.75 14.25h-1.5v-3h1.5v3z" />
                            <path d="M21 4.5h-3V3a1.5 1.5 0 00-1.5-1.5h-9A1.5 1.5 0 006 3v1.5H3a1.5 1.5 0 00-1.5 1.5v15A1.5 1.5 0 003 21h18a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5zM7.5 3h9v1.5h-9V3zm13.5 16.5H3V6h18v13.5z" />
                        </svg>
                        <span className="ml-2 text-lg font-semibold text-gray-800">Deed Registry</span>
                    </div>
                    {/* Close button */}
                    <button
                        ref={trigger}
                        className="text-gray-500 hover:text-gray-600 lg:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation - This is the scrollable area */}
                <div className="overflow-y-auto h-[calc(100vh-6rem)]">
                    <nav className="px-3 py-4">
                        <div className="space-y-0.5">
                            {/* Main menu items */}
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Home className="mr-3 h-5 w-5" />
                                <span>Dashboard</span>
                            </NavLink>

                            <NavLink
                                to="/deeds"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <FileText className="mr-3 h-5 w-5" />
                                <span>All Deeds</span>
                            </NavLink>

                            <NavLink
                                to="/last-transaction-finder"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Upload className="mr-3 h-5 w-5" />
                                <span>Last Transaction Finder</span>
                            </NavLink>

                            <NavLink
                                to="/upload"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Upload className="mr-3 h-5 w-5" />
                                <span>Upload Deeds</span>
                            </NavLink>

                            {/* Property Analysis Section */}
                            <div className="pt-3 pb-1">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                                    Property Analysis
                                </h3>
                            </div>

                            <NavLink
                                to="/property-insights"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Property className="mr-3 h-5 w-5" />
                                <span>Property Insights</span>
                            </NavLink>

                            <NavLink
                                to="/property-outliers"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Thermometer className="mr-3 h-5 w-5" />
                                <span>Property Outliers</span>
                            </NavLink>

                            <NavLink
                                to="/price-analyzer"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <DollarSign className="mr-3 h-5 w-5" />
                                <span>Price Analyzer</span>
                            </NavLink>

                            <NavLink
                                to="/value-estimator"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Target className="mr-3 h-5 w-5" />
                                <span>Value Estimator</span>
                            </NavLink>

                            <NavLink
                                to="/property-comparison"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <ArrowUpDown className="mr-3 h-5 w-5" />
                                <span>Property Comparison</span>
                            </NavLink>

                            <NavLink
                                to="/property-prediction"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <TrendingUp className="mr-3 h-5 w-5" />
                                <span>Price Prediction</span>
                            </NavLink>

                            {/* Market Analysis Section */}
                            <div className="pt-3 pb-1">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                                    Market Analysis
                                </h3>
                            </div>

                            <NavLink
                                to="/market-dashboard"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <BarChart className="mr-3 h-5 w-5" />
                                <span>Market Dashboard</span>
                            </NavLink>

                            <NavLink
                                to="/affordability-index"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Activity className="mr-3 h-5 w-5" />
                                <span>Affordability Index</span>
                            </NavLink>

                            <NavLink
                                to="/seasonal-patterns"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Calendar className="mr-3 h-5 w-5" />
                                <span>Seasonal Patterns</span>
                            </NavLink>

                            <NavLink
                                to="/transaction-forecast"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <PieChart className="mr-3 h-5 w-5" />
                                <span>Transaction Forecast</span>
                            </NavLink>

                            {/* Geographic & Timeline Section */}
                            <div className="pt-3 pb-1">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                                    Location & History
                                </h3>
                            </div>

                            <NavLink
                                to="/geographic-map"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Map className="mr-3 h-5 w-5" />
                                <span>Geographic Map</span>
                            </NavLink>

                            <NavLink
                                to="/top-localities"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Building className="mr-3 h-5 w-5" />
                                <span>Top Localities</span>
                            </NavLink>

                            <NavLink
                                to="/timeline"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Clock className="mr-3 h-5 w-5" />
                                <span>Timeline Visualization</span>
                            </NavLink>

                            <NavLink
                                to="/family-transfers"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Family className="mr-3 h-5 w-5" />
                                <span>Family Transfers</span>
                            </NavLink>

                            <NavLink
                                to="/mohalla-charts"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Layers className="mr-3 h-5 w-5" />
                                <span>Mohalla Analysis</span>
                            </NavLink>

                            {/* Settings */}
                            <div className="pt-3 pb-1">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                                    System
                                </h3>
                            </div>

                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Settings className="mr-3 h-5 w-5" />
                                <span>Settings</span>
                            </NavLink>
                        </div>
                    </nav>
                </div>

                {/* Sidebar footer */}
                <div className="w-full p-4 border-t border-gray-200 mt-auto">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                A
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">Admin User</p>
                            <p className="text-xs font-medium text-gray-500">View Profile</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;