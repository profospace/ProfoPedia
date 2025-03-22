import React, { useState } from 'react';
import {
    Save,
    User,
    Bell,
    Shield,
    Database,
    Check,
    X
} from 'lucide-react';

/**
 * Settings - Admin settings page for the application
 */
function Settings() {
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    // Profile settings state
    const [profileSettings, setProfileSettings] = useState({
        name: 'Admin User',
        email: 'admin@deedregistry.gov.in',
        department: 'Registry Office',
        designation: 'Registry Officer',
        phone: '+91 9876543210'
    });

    // Notification settings state
    const [notificationSettings, setNotificationSettings] = useState({
        emailAlerts: true,
        dailySummary: true,
        securityAlerts: true,
        systemUpdates: false,
        newDeeds: true
    });

    // Security settings state
    const [securitySettings, setSecuritySettings] = useState({
        twoFactorAuth: true,
        sessionTimeout: '30',
        ipRestriction: false,
        auditLog: true
    });

    // Data settings state
    const [dataSettings, setDataSettings] = useState({
        autoBackup: true,
        backupFrequency: 'daily',
        dataRetention: '90',
        dataCaching: true
    });

    // Handle settings save
    const handleSaveSettings = () => {
        setLoading(true);

        // Simulate API call to save settings
        setTimeout(() => {
            setLoading(false);
            setShowSavedMessage(true);

            // Hide saved message after 3 seconds
            setTimeout(() => {
                setShowSavedMessage(false);
            }, 3000);
        }, 800);
    };

    // Handle profile data change
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle notification toggle change
    const handleNotificationToggle = (setting) => {
        setNotificationSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    // Handle security setting change
    const handleSecurityChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSecuritySettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle data setting change
    const handleDataChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDataSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div>
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
                    <p className="text-sm text-gray-500">Manage your account and application preferences</p>
                </div>

                <div className="flex items-center mt-4 md:mt-0">
                    <button
                        onClick={handleSaveSettings}
                        disabled={loading}
                        className={`flex items-center px-4 py-2 rounded-md text-white text-sm ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Settings
                            </>
                        )}
                    </button>

                    {showSavedMessage && (
                        <div className="ml-4 px-3 py-2 bg-green-100 text-green-700 rounded-md flex items-center text-sm">
                            <Check className="w-4 h-4 mr-2" />
                            Settings saved successfully
                        </div>
                    )}
                </div>
            </div>

            {/* Settings tabs and content */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-4" aria-label="Settings tabs">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'profile'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                Profile
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'notifications'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center">
                                <Bell className="w-4 h-4 mr-2" />
                                Notifications
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'security'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center">
                                <Shield className="w-4 h-4 mr-2" />
                                Security
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('data')}
                            className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'data'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center">
                                <Database className="w-4 h-4 mr-2" />
                                Data Management
                            </div>
                        </button>
                    </nav>
                </div>

                {/* Tab contents */}
                <div className="p-6">
                    {/* Profile Settings */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                            <p className="text-sm text-gray-500">Update your account details and personal information</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={profileSettings.name}
                                        onChange={handleProfileChange}
                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={profileSettings.email}
                                        onChange={handleProfileChange}
                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        id="department"
                                        name="department"
                                        value={profileSettings.department}
                                        onChange={handleProfileChange}
                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                                        Designation
                                    </label>
                                    <input
                                        type="text"
                                        id="designation"
                                        name="designation"
                                        value={profileSettings.designation}
                                        onChange={handleProfileChange}
                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={profileSettings.phone}
                                        onChange={handleProfileChange}
                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-md font-medium text-gray-900 mb-2">Change Password</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            id="currentPassword"
                                            name="currentPassword"
                                            placeholder="••••••••"
                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            placeholder="••••••••"
                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder="••••••••"
                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
                            <p className="text-sm text-gray-500">Configure how and when you receive notifications</p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Email Alerts</h3>
                                        <p className="text-xs text-gray-500 mt-1">Receive email notifications for important updates</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleNotificationToggle('emailAlerts')}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${notificationSettings.emailAlerts ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span className="sr-only">Enable email alerts</span>
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notificationSettings.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Daily Summary</h3>
                                        <p className="text-xs text-gray-500 mt-1">Receive a daily digest of all activities</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleNotificationToggle('dailySummary')}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${notificationSettings.dailySummary ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span className="sr-only">Enable daily summary</span>
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notificationSettings.dailySummary ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Security Alerts</h3>
                                        <p className="text-xs text-gray-500 mt-1">Get notified about security-related events</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleNotificationToggle('securityAlerts')}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${notificationSettings.securityAlerts ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span className="sr-only">Enable security alerts</span>
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notificationSettings.securityAlerts ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">System Updates</h3>
                                        <p className="text-xs text-gray-500 mt-1">Receive notifications about system updates</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleNotificationToggle('systemUpdates')}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${notificationSettings.systemUpdates ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span className="sr-only">Enable system updates</span>
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notificationSettings.systemUpdates ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">New Deed Notifications</h3>
                                        <p className="text-xs text-gray-500 mt-1">Get alerted when new deeds are added to the system</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleNotificationToggle('newDeeds')}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${notificationSettings.newDeeds ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span className="sr-only">Enable new deed notifications</span>
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notificationSettings.newDeeds ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
                            <p className="text-sm text-gray-500">Manage your account security preferences</p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                                        <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleSecurityChange({
                                                target: {
                                                    name: 'twoFactorAuth',
                                                    type: 'checkbox',
                                                    checked: !securitySettings.twoFactorAuth
                                                }
                                            })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${securitySettings.twoFactorAuth ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span className="sr-only">Enable two-factor authentication</span>
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Session Timeout</h3>
                                        <p className="text-xs text-gray-500 mt-1">Automatically log out after a period of inactivity</p>
                                    </div>
                                    <div className="flex items-center">
                                        <select
                                            name="sessionTimeout"
                                            value={securitySettings.sessionTimeout}
                                            onChange={handleSecurityChange}
                                            className="block w-32 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="15">15 minutes</option>
                                            <option value="30">30 minutes</option>
                                            <option value="60">1 hour</option>
                                            <option value="120">2 hours</option>
                                            <option value="0">Never</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">IP Restriction</h3>
                                        <p className="text-xs text-gray-500 mt-1">Limit access to specific IP addresses</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleSecurityChange({
                                                target: {
                                                    name: 'ipRestriction',
                                                    type: 'checkbox',
                                                    checked: !securitySettings.ipRestriction
                                                }
                                            })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${securitySettings.ipRestriction ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span className="sr-only">Enable IP restriction</span>
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${securitySettings.ipRestriction ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Audit Logging</h3>
                                        <p className="text-xs text-gray-500 mt-1">Track all user actions in the system</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleSecurityChange({
                                                target: {
                                                    name: 'auditLog',
                                                    type: 'checkbox',
                                                    checked: !securitySettings.auditLog
                                                }
                                            })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${securitySettings.auditLog ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span className="sr-only">Enable audit logging</span>
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${securitySettings.auditLog ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-md font-medium text-gray-900 mb-2">Login History</h3>
                                <div className="bg-gray-50 rounded-md overflow-hidden">
                                    <div className="divide-y divide-gray-200">
                                        <div className="px-4 py-3 flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Today, 9:41 AM</p>
                                                <p className="text-xs text-gray-500">IP: 103.45.67.89 • Chrome on Windows</p>
                                            </div>
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                Current
                                            </span>
                                        </div>

                                        <div className="px-4 py-3 flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Yesterday, 5:17 PM</p>
                                                <p className="text-xs text-gray-500">IP: 103.45.67.89 • Chrome on Windows</p>
                                            </div>
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                                Successful
                                            </span>
                                        </div>

                                        <div className="px-4 py-3 flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">March 21, 2025, 1:24 PM</p>
                                                <p className="text-xs text-gray-500">IP: 103.45.67.89 • Chrome on Windows</p>
                                            </div>
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                                Successful
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Data Management Settings */}
                    {activeTab === 'data' && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-medium text-gray-900">Data Management</h2>
                            <p className="text-sm text-gray-500">Configure database and data handling settings</p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Automatic Backup</h3>
                                        <p className="text-xs text-gray-500 mt-1">Create regular backups of your deed registry data</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleDataChange({
                                                target: {
                                                    name: 'autoBackup',
                                                    type: 'checkbox',
                                                    checked: !dataSettings.autoBackup
                                                }
                                            })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${dataSettings.autoBackup ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span className="sr-only">Enable automatic backup</span>
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${dataSettings.autoBackup ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Backup Frequency</h3>
                                        <p className="text-xs text-gray-500 mt-1">How often should backups be created</p>
                                    </div>
                                    <div className="flex items-center">
                                        <select
                                            name="backupFrequency"
                                            value={dataSettings.backupFrequency}
                                            onChange={handleDataChange}
                                            className="block w-32 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            disabled={!dataSettings.autoBackup}
                                        >
                                            <option value="hourly">Hourly</option>
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Data Retention Period</h3>
                                        <p className="text-xs text-gray-500 mt-1">How long to keep backup data (in days)</p>
                                    </div>
                                    <div className="flex items-center">
                                        <select
                                            name="dataRetention"
                                            value={dataSettings.dataRetention}
                                            onChange={handleDataChange}
                                            className="block w-32 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="30">30 days</option>
                                            <option value="60">60 days</option>
                                            <option value="90">90 days</option>
                                            <option value="180">180 days</option>
                                            <option value="365">1 year</option>
                                            <option value="730">2 years</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Data Caching</h3>
                                        <p className="text-xs text-gray-500 mt-1">Cache frequently accessed data for faster performance</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleDataChange({
                                                target: {
                                                    name: 'dataCaching',
                                                    type: 'checkbox',
                                                    checked: !dataSettings.dataCaching
                                                }
                                            })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${dataSettings.dataCaching ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span className="sr-only">Enable data caching</span>
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${dataSettings.dataCaching ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-md font-medium text-gray-900 mb-2">Database Maintenance</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-md">
                                        <h4 className="text-sm font-medium text-gray-900">Database Size</h4>
                                        <div className="mt-2 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Total Documents</span>
                                                <span className="font-medium">24,563</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Storage Used</span>
                                                <span className="font-medium">2.7 GB</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Indexes Size</span>
                                                <span className="font-medium">512 MB</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-md">
                                        <h4 className="text-sm font-medium text-gray-900">Maintenance Actions</h4>
                                        <div className="mt-2 space-y-2">
                                            <button className="w-full text-left px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                                Run Database Optimization
                                            </button>
                                            <button className="w-full text-left px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                                Rebuild Indexes
                                            </button>
                                            <button className="w-full text-left px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                                Create Manual Backup
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                                    <h4 className="text-sm font-medium text-gray-900">Latest Backups</h4>
                                    <div className="mt-2 space-y-1">
                                        <div className="flex justify-between items-center text-sm py-2 border-b border-gray-200">
                                            <div>
                                                <span className="font-medium">Full Backup</span>
                                                <span className="ml-2 text-xs text-gray-500">March 22, 2025, 2:00 AM</span>
                                            </div>
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                Successful
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm py-2 border-b border-gray-200">
                                            <div>
                                                <span className="font-medium">Full Backup</span>
                                                <span className="ml-2 text-xs text-gray-500">March 21, 2025, 2:00 AM</span>
                                            </div>
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                Successful
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm py-2 border-b border-gray-200">
                                            <div>
                                                <span className="font-medium">Full Backup</span>
                                                <span className="ml-2 text-xs text-gray-500">March 20, 2025, 2:00 AM</span>
                                            </div>
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                Successful
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Settings;