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
    X
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
        <div className=''>
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
                className={`fixed min-h-screen inset-y-0 left-0 z-40 w-64 overflow-y-auto bg-white border-r border-gray-200 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
                    }`}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
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

                {/* Navigation */}
                <nav className="px-3 py-4">
                    <div className="space-y-1">
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
                            to="/analytics"
                            className={({ isActive }) =>
                                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                        >
                            <BarChart2 className="mr-3 h-5 w-5" />
                            <span>Analytics</span>
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

                        <NavLink
                            to="/parties"
                            className={({ isActive }) =>
                                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                        >
                            <Users className="mr-3 h-5 w-5" />
                            <span>Parties</span>
                        </NavLink>

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

                {/* Sidebar footer */}
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
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