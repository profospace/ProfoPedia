import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Database, Play, Pause, Save, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../utils/base_url';

// Language translations
const translations = {
    english: {
        title: "Tehsil and Mohalla Dashboard",
        subtitle: "Automated Data Collection Tool",
        selectTehsil: "Select Tehsil/SRO to automate:",
        startAutomation: "Start Automation",
        pauseAutomation: "Pause Automation",
        resumeAutomation: "Resume Automation",
        savingData: "Saving Data...",
        saveCompleted: "Data Saved!",
        saveError: "Error Saving Data",
        automationStats: "Automation Statistics",
        totalMohallas: "Total Mohallas",
        processed: "Processed",
        successful: "Successful",
        failed: "Failed",
        remaining: "Remaining",
        automationLog: "Automation Log",
        apiStatus: "API Status",
        responseLength: "Response Length",
        mohalla: "Mohalla",
        code: "Code",
        viewSavedRecords: "View Saved Records",
        noTehsilSelected: "Please select a Tehsil/SRO to begin",
        automationComplete: "Automation Complete!",
        requestsFailed: "Some requests failed. Retry failed requests?",
        retryFailed: "Retry Failed",
        clearLog: "Clear Log",
        errorFetching: "Error fetching data",
        successfulFetch: "Data fetched successfully"
    },
    hindi: {
        title: "तहसील और मोहल्ला डैशबोर्ड",
        subtitle: "स्वचालित डेटा संग्रह उपकरण",
        selectTehsil: "स्वचालित करने के लिए तहसील/एसआरओ का चयन करें:",
        startAutomation: "स्वचालन शुरू करें",
        pauseAutomation: "स्वचालन रोकें",
        resumeAutomation: "स्वचालन फिर से शुरू करें",
        savingData: "डेटा सहेजा जा रहा है...",
        saveCompleted: "डेटा सहेजा गया!",
        saveError: "डेटा सहेजने में त्रुटि",
        automationStats: "स्वचालन आंकड़े",
        totalMohallas: "कुल मोहल्ले",
        processed: "संसाधित",
        successful: "सफल",
        failed: "विफल",
        remaining: "शेष",
        automationLog: "स्वचालन लॉग",
        apiStatus: "एपीआई स्थिति",
        responseLength: "प्रतिक्रिया की लंबाई",
        mohalla: "मोहल्ला",
        code: "कोड",
        viewSavedRecords: "सहेजे गए रिकॉर्ड देखें",
        noTehsilSelected: "शुरू करने के लिए कृपया एक तहसील/एसआरओ का चयन करें",
        automationComplete: "स्वचालन पूर्ण!",
        requestsFailed: "कुछ अनुरोध विफल हुए। विफल अनुरोधों को पुनः प्रयास करें?",
        retryFailed: "विफल का पुनः प्रयास करें",
        clearLog: "लॉग साफ़ करें",
        errorFetching: "डेटा प्राप्त करने में त्रुटि",
        successfulFetch: "डेटा सफलतापूर्वक प्राप्त किया गया"
    }
};

const AutomatedApiCaller = () => {
    const navigate = useNavigate();
    // State variables
    const [tehsils, setTehsils] = useState([]);
    const [selectedTehsil, setSelectedTehsil] = useState(null);
    const [language, setLanguage] = useState('english');
    const [automationRunning, setAutomationRunning] = useState(false);
    const [automationPaused, setAutomationPaused] = useState(false);
    const [automationLogs, setAutomationLogs] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        processed: 0,
        successful: 0,
        failed: 0,
        remaining: 0
    });
    const [saveStatus, setSaveStatus] = useState(null); // null, 'saving', 'success', 'error'

    // Refs for managing the automation process
    const mohallasRef = useRef([]);
    const currentIndexRef = useRef(0);
    const processingRef = useRef(false);
    const failedRequestsRef = useRef([]);

    // Get current language text
    const text = translations[language];

    // Toggle language function
    const toggleLanguage = () => {
        setLanguage(language === 'english' ? 'hindi' : 'english');
    };

    // Load tehsil data
    useEffect(() => {
        // Mock data for demonstration - in actual implementation, this would come from your data files or API
        const tehsilData = [
            { code: "208", name: "सदर प्रथम", nameEn: "Sadar First" },
            { code: "209", name: "सदर द्वितीय", nameEn: "Sadar Second" },
            { code: "210", name: "सदर तृतीय", nameEn: "Sadar Third" },
            { code: "211", name: "सदर चतुर्थ", nameEn: "Sadar Fourth" },
            { code: "212", name: "बिल्हौर", nameEn: "Bilhaur" },
            { code: "213", name: "घाटमपुर", nameEn: "Ghatampur" },
            { code: "370", name: "नरवल", nameEn: "Narwal" },
        ];

        setTehsils(tehsilData);
    }, []);

    // Get mohallas for a selected tehsil
    const getMohallasByTehsil = (tehsilCode) => {
        // This would be replaced with actual data loading logic
        const villageData = {
            "208": [
                {
                    "value": "900040",
                    "name": "अटहा",
                    "nameEn": "Ataha"
                },
                {
                    "value": "900041",
                    "name": "अल्‍लापुरवा",
                    "nameEn": "Allapurava"
                },
                // More mohallas...
                // For demonstration, I'm just including a few to keep the code readable
                {
                    "value": "900085",
                    "name": "अशरफाबाद",
                    "nameEn": "Asharaphabada"
                },
                {
                    "value": "900100",
                    "name": "आदर्श नगर",
                    "nameEn": "Aadrsha Nagara"
                },
                {
                    "value": "900030",
                    "name": "आनन्‍द बाग चक सं०-१०६",
                    "nameEn": "Aannda Baga Chak Sn0-106"
                }
            ],
            // More tehsils would be here in actual implementation
            "209": [
                {
                    "value": "901040",
                    "name": "सुभाष नगर",
                    "nameEn": "Subhash Nagar"
                },
                {
                    "value": "901041",
                    "name": "राम नगर",
                    "nameEn": "Ram Nagar"
                },
                {
                    "value": "901042",
                    "name": "कृष्णा नगर",
                    "nameEn": "Krishna Nagar"
                }
            ]
        };

        return villageData[tehsilCode] || [];
    };

    // Handle tehsil selection
    const handleTehsilSelect = (tehsil) => {
        setSelectedTehsil(tehsil);
        resetAutomation();

        // Get mohallas for this tehsil
        const mohallas = getMohallasByTehsil(tehsil.code);
        mohallasRef.current = mohallas;

        // Reset stats
        setStats({
            total: mohallas.length,
            processed: 0,
            successful: 0,
            failed: 0,
            remaining: mohallas.length
        });
    };

    // Reset the automation state
    const resetAutomation = () => {
        setAutomationRunning(false);
        setAutomationPaused(false);
        setAutomationLogs([]);
        currentIndexRef.current = 0;
        processingRef.current = false;
        failedRequestsRef.current = [];
    };

    // Toggle automation (start/pause/resume)
    const toggleAutomation = () => {
        if (!selectedTehsil) return;

        if (automationRunning && !automationPaused) {
            // Pause the automation
            setAutomationPaused(true);
        } else if (automationRunning && automationPaused) {
            // Resume the automation
            setAutomationPaused(false);
            processNextMohalla();
        } else {
            // Start the automation
            setAutomationRunning(true);
            setAutomationPaused(false);
            currentIndexRef.current = 0;
            failedRequestsRef.current = [];

            // Reset stats
            const mohallas = mohallasRef.current;
            setStats({
                total: mohallas.length,
                processed: 0,
                successful: 0,
                failed: 0,
                remaining: mohallas.length
            });

            processNextMohalla();
        }
    };

    // Retry failed requests
    const retryFailedRequests = () => {
        if (failedRequestsRef.current.length === 0) return;

        setAutomationRunning(true);
        setAutomationPaused(false);

        // Set up to process only the failed requests
        mohallasRef.current = [...failedRequestsRef.current];
        currentIndexRef.current = 0;
        failedRequestsRef.current = [];

        // Update stats for the retry
        setStats(prev => ({
            ...prev,
            processed: prev.processed - prev.failed,
            failed: 0,
            remaining: prev.failed
        }));

        processNextMohalla();
    };

    // Clear the logs
    const clearLogs = () => {
        setAutomationLogs([]);
    };

    // Process the next mohalla in the queue
    const processNextMohalla = async () => {
        if (processingRef.current || automationPaused) return;

        const mohallas = mohallasRef.current;
        const currentIndex = currentIndexRef.current;

        if (currentIndex >= mohallas.length) {
            // Automation complete
            setAutomationRunning(false);
            return;
        }

        processingRef.current = true;
        const mohalla = mohallas[currentIndex];

        try {
            // Add a log entry for this request
            const logEntry = {
                id: Date.now(),
                mohalla: mohalla,
                timestamp: new Date().toLocaleTimeString(),
                status: 'processing'
            };

            setAutomationLogs(logs => [logEntry, ...logs]);

            // Make the API request
            const response = await fetchPropertyData(mohalla);

            // Update the log entry with the result
            setAutomationLogs(logs =>
                logs.map(log =>
                    log.id === logEntry.id
                        ? {
                            ...log,
                            status: response.success ? 'success' : 'error',
                            responseLength: response.responseLength,
                            responseStatus: response.status,
                            errorMessage: response.errorMessage
                        }
                        : log
                )
            );

            // Update stats
            setStats(prev => ({
                ...prev,
                processed: prev.processed + 1,
                successful: response.success ? prev.successful + 1 : prev.successful,
                failed: response.success ? prev.failed : prev.failed + 1,
                remaining: prev.remaining - 1
            }));

            // If failed, add to failed requests
            if (!response.success) {
                failedRequestsRef.current.push(mohalla);
            }

            // Move to the next mohalla
            currentIndexRef.current = currentIndex + 1;
            processingRef.current = false;

            // Continue with the next mohalla after a short delay
            // This delay helps prevent overwhelming the server and gives a better visual of the process
            setTimeout(() => {
                if (!automationPaused) {
                    processNextMohalla();
                }
            }, 500);

        } catch (error) {
            console.error("Error processing mohalla:", error);

            // Update the log entry with the error
            setAutomationLogs(logs =>
                logs.map(log =>
                    log.id === logEntry.id
                        ? {
                            ...log,
                            status: 'error',
                            errorMessage: error.message
                        }
                        : log
                )
            );

            // Update stats
            setStats(prev => ({
                ...prev,
                processed: prev.processed + 1,
                failed: prev.failed + 1,
                remaining: prev.remaining - 1
            }));

            // Add to failed requests
            failedRequestsRef.current.push(mohalla);

            // Move to the next mohalla
            currentIndexRef.current = currentIndex + 1;
            processingRef.current = false;

            // Continue with the next mohalla after a short delay
            setTimeout(() => {
                if (!automationPaused) {
                    processNextMohalla();
                }
            }, 500);
        }
    };

    // Fetch property data for a single mohalla
    const fetchPropertyData = async (mohalla) => {
        try {
            // API call to fetch property data
            const response = await fetch(`${base_url}/api/property-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    districtCode: '164', // Hardcoded as per the curl example
                    sroCode: selectedTehsil.code,
                    gaonCode1: mohalla.value,
                    propertyId: '',
                    propNEWAddress: '1'
                })
            });

            const data = await response.json();

            return {
                success: response.ok,
                status: response.status,
                responseLength: JSON.stringify(data).length,
                data: data
            };
        } catch (error) {
            return {
                success: false,
                errorMessage: error.message
            };
        }
    };

    // Save the data (mock function, would be implemented with actual save logic)
    const saveData = async () => {
        if (stats.successful === 0) return;

        setSaveStatus('saving');

        try {
            // Mock API call to save data
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSaveStatus('success');

            // Reset after a short delay
            setTimeout(() => {
                setSaveStatus(null);
            }, 2000);
        } catch (error) {
            console.error("Error saving data:", error);
            setSaveStatus('error');

            // Reset after a short delay
            setTimeout(() => {
                setSaveStatus(null);
            }, 2000);
        }
    };

    // Navigate to saved records page
    const navigateToSavedRecords = () => {
        navigate('/saved-records');
    };

    // Get displayed name based on current language
    const getDisplayName = (item) => {
        return language === 'english' ? item.nameEn : item.name;
    };

    // Get status color class
    const getStatusColor = (status) => {
        switch (status) {
            case 'processing':
                return 'text-blue-500';
            case 'success':
                return 'text-green-500';
            case 'error':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            <header className="text-center mb-8 relative">
                {/* Language toggle button */}
                <button
                    onClick={toggleLanguage}
                    className="absolute right-0 top-0 px-3 py-2 bg-white rounded-full shadow-md flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                >
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">{language === 'english' ? 'हिंदी' : 'English'}</span>
                </button>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">{text.title}</h1>
                <p className="text-gray-600">{text.subtitle}</p>
            </header>

            {/* Top action buttons */}
            <div className="mb-8 flex justify-between">
                <div className="flex gap-3">
                    {/* Automation controls */}
                    <button
                        onClick={toggleAutomation}
                        disabled={!selectedTehsil}
                        className={`px-4 py-2 rounded-lg shadow flex items-center space-x-2 ${!selectedTehsil
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : automationRunning && !automationPaused
                                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                                    : automationRunning && automationPaused
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                            } transition-colors`}
                    >
                        {automationRunning && !automationPaused ? (
                            <>
                                <Pause className="h-5 w-5" />
                                <span>{text.pauseAutomation}</span>
                            </>
                        ) : automationRunning && automationPaused ? (
                            <>
                                <Play className="h-5 w-5" />
                                <span>{text.resumeAutomation}</span>
                            </>
                        ) : (
                            <>
                                <Play className="h-5 w-5" />
                                <span>{text.startAutomation}</span>
                            </>
                        )}
                    </button>

                    {/* Save button */}
                    <button
                        onClick={saveData}
                        disabled={stats.successful === 0 || saveStatus === 'saving'}
                        className={`px-4 py-2 rounded-lg shadow flex items-center space-x-2 ${stats.successful === 0 || saveStatus === 'saving'
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : saveStatus === 'success'
                                    ? 'bg-green-600 text-white'
                                    : saveStatus === 'error'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-purple-600 text-white hover:bg-purple-700'
                            } transition-colors`}
                    >
                        <Save className="h-5 w-5" />
                        <span>
                            {saveStatus === 'saving'
                                ? text.savingData
                                : saveStatus === 'success'
                                    ? text.saveCompleted
                                    : saveStatus === 'error'
                                        ? text.saveError
                                        : `${text.savingData} (${stats.successful})`}
                        </span>
                    </button>
                </div>

                {/* View Saved Records button */}
                <button
                    onClick={navigateToSavedRecords}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md flex items-center space-x-2 hover:bg-green-700 transition-colors"
                >
                    <Database className="h-5 w-5" />
                    <span>{text.viewSavedRecords}</span>
                </button>
            </div>

            {/* Tehsil selection */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">{text.selectTehsil}</h2>
                <div className="flex flex-wrap gap-3">
                    {tehsils.map((tehsil) => (
                        <button
                            key={tehsil.code}
                            onClick={() => handleTehsilSelect(tehsil)}
                            disabled={automationRunning}
                            className={`px-4 py-2 rounded-full transition-all ${automationRunning
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : selectedTehsil?.code === tehsil.code
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 shadow hover:shadow-md hover:bg-blue-50'
                                }`}
                        >
                            {getDisplayName(tehsil)} ({tehsil.code})
                        </button>
                    ))}
                </div>
            </section>

            {/* Main dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats panel */}
                <div className="bg-white rounded-xl shadow-md p-5 lg:col-span-1">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">{text.automationStats}</h2>

                    {!selectedTehsil ? (
                        <div className="text-center py-10 text-gray-500">
                            {text.noTehsilSelected}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Total mohallas */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500">{text.totalMohallas}</div>
                                    <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                                </div>

                                {/* Processed */}
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="text-sm text-blue-500">{text.processed}</div>
                                    <div className="text-2xl font-bold text-blue-600">{stats.processed}</div>
                                </div>

                                {/* Successful */}
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="text-sm text-green-500">{text.successful}</div>
                                    <div className="text-2xl font-bold text-green-600">{stats.successful}</div>
                                </div>

                                {/* Failed */}
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <div className="text-sm text-red-500">{text.failed}</div>
                                    <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                                </div>

                                {/* Remaining */}
                                <div className="bg-yellow-50 p-4 rounded-lg col-span-2">
                                    <div className="text-sm text-yellow-500">{text.remaining}</div>
                                    <div className="text-2xl font-bold text-yellow-600">{stats.remaining}</div>

                                    {/* Progress bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full"
                                            style={{ width: `${Math.round((stats.processed / stats.total) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Retry failed button */}
                            {!automationRunning && stats.failed > 0 && (
                                <div className="mt-6 flex justify-center">
                                    <button
                                        onClick={retryFailedRequests}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md flex items-center space-x-2 hover:bg-red-700 transition-colors"
                                    >
                                        <AlertTriangle className="h-5 w-5" />
                                        <span>{text.retryFailed} ({stats.failed})</span>
                                    </button>
                                </div>
                            )}

                            {/* Automation complete message */}
                            {!automationRunning && stats.processed > 0 && stats.remaining === 0 && (
                                <div className="mt-6 text-center text-green-600 font-semibold">
                                    {text.automationComplete}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Log panel */}
                <div className="bg-white rounded-xl shadow-md p-5 lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">{text.automationLog}</h2>

                        {/* Clear log button */}
                        {automationLogs.length > 0 && (
                            <button
                                onClick={clearLogs}
                                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                            >
                                {text.clearLog}
                            </button>
                        )}
                    </div>

                    <div className="overflow-auto max-h-96">
                        {automationLogs.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                {selectedTehsil
                                    ? 'No logs yet. Start automation to see logs here.'
                                    : text.noTehsilSelected}
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {text.timestamp}
                                        </th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {text.mohalla}
                                        </th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {text.apiStatus}
                                        </th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {text.responseLength}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {automationLogs.map((log) => (
                                        <tr key={log.id}>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                                {log.timestamp}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm">
                                                <div>{getDisplayName(log.mohalla)}</div>
                                                <div className="text-xs text-gray-500">{text.code}: {log.mohalla.value}</div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)} bg-opacity-10`}>
                                                    {log.status === 'processing'
                                                        ? '...'
                                                        : log.status === 'success'
                                                            ? text.successfulFetch
                                                            : text.errorFetching}
                                                </span>
                                                {log.errorMessage && (
                                                    <div className="text-xs text-red-500 mt-1">{log.errorMessage}</div>
                                                )}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                                {log.responseLength ? `${(log.responseLength / 1024).toFixed(2)} KB` : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutomatedApiCaller;