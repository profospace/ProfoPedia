import React, { useState, useEffect } from 'react';

const SeasonalTransactionPatterns = ({ data }) => {
    const [transactions, setTransactions] = useState([]);
    const [yearlyData, setYearlyData] = useState({});
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [peakMonth, setPeakMonth] = useState(null);
    const [loading, setLoading] = useState(true);
    const [localities, setLocalities] = useState([]);
    const [selectedLocality, setSelectedLocality] = useState('all');
    const [filteredData, setFilteredData] = useState([]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const seasons = [
        { name: 'Winter', months: [11, 0, 1], color: 'bg-blue-100' },
        { name: 'Spring', months: [2, 3, 4], color: 'bg-green-100' },
        { name: 'Summer', months: [5, 6, 7], color: 'bg-red-100' },
        { name: 'Fall', months: [8, 9, 10], color: 'bg-yellow-100' }
    ];

    // Get season for a given month
    const getSeason = (month) => {
        return seasons.find(season => season.months.includes(month));
    };

    // Parse and organize data
    useEffect(() => {
        if (!data || data.length === 0) {
            setLoading(false);
            return;
        }

        try {
            // Extract all unique localities
            const uniqueLocalities = [...new Set(data.map(item => item.locality))].sort();
            setLocalities(['all', ...uniqueLocalities]);

            // Process each transaction
            const processedData = data.map(item => {
                // Parse the registration date (format: "DD MMM YYYY")
                const dateParts = item.registrationDate.split(' ');

                // Convert month abbreviation to month number
                const monthMap = {
                    'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
                    'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
                };

                const day = parseInt(dateParts[0]);
                const month = monthMap[dateParts[1]];
                const year = parseInt(dateParts[2]);

                // Handle years with only two digits (like "20" instead of "2020")
                const fullYear = year < 100 ? 2000 + year : year;

                return {
                    id: item._id,
                    deedType: item.deedType,
                    locality: item.locality,
                    day,
                    month,
                    year: fullYear,
                    dateString: item.registrationDate
                };
            });

            setTransactions(processedData);
            setFilteredData(processedData);

            // Set default selected locality
            setSelectedLocality('all');

            setLoading(false);
        } catch (error) {
            console.error("Error processing data:", error);
            setLoading(false);
        }
    }, [data]);

    // Filter data and update stats when locality or year selection changes
    useEffect(() => {
        if (transactions.length === 0) return;

        // Filter transactions by locality
        const filtered = selectedLocality === 'all'
            ? transactions
            : transactions.filter(tx => tx.locality === selectedLocality);

        setFilteredData(filtered);

        // Extract unique years from filtered data
        const uniqueYears = [...new Set(filtered.map(tx => tx.year))].sort().reverse();
        setYears(uniqueYears);

        // Set default selected year to the most recent if available
        if (uniqueYears.length > 0) {
            setSelectedYear(uniqueYears[0]);
        } else {
            setSelectedYear(null);
        }

        // Group data by year and month
        const dataByYear = {};
        uniqueYears.forEach(year => {
            dataByYear[year] = Array(12).fill(0);
        });

        // Count transactions per month per year
        filtered.forEach(tx => {
            if (dataByYear[tx.year]) {
                dataByYear[tx.year][tx.month]++;
            }
        });

        setYearlyData(dataByYear);

        // Find peak month across all years
        let maxCount = 0;
        let peakMonthInfo = { year: null, month: null };

        uniqueYears.forEach(year => {
            dataByYear[year].forEach((count, month) => {
                if (count > maxCount) {
                    maxCount = count;
                    peakMonthInfo = { year, month };
                }
            });
        });

        setPeakMonth(peakMonthInfo);
    }, [transactions, selectedLocality]);

    // Get color intensity based on count
    const getColorIntensity = (count, max) => {
        if (max === 0) return 'bg-gray-100';
        const percentage = count / max;

        if (percentage === 0) return 'bg-gray-100';
        if (percentage < 0.2) return 'bg-blue-100';
        if (percentage < 0.4) return 'bg-blue-200';
        if (percentage < 0.6) return 'bg-blue-300';
        if (percentage < 0.8) return 'bg-blue-400';
        return 'bg-blue-500';
    };

    // Get the maximum count for the selected year
    const getMaxCount = (year) => {
        if (!yearlyData[year]) return 0;
        return Math.max(...yearlyData[year]);
    };

    // Count transactions by season for the selected year
    const countBySeasonForYear = (year) => {
        if (!yearlyData[year]) return seasons.map(s => ({ ...s, count: 0 }));

        return seasons.map(season => {
            const count = season.months.reduce((sum, month) => sum + yearlyData[year][month], 0);
            return { ...season, count };
        });
    };

    // Get total transactions for a year
    const getTotalForYear = (year) => {
        if (!yearlyData[year]) return 0;
        return yearlyData[year].reduce((sum, count) => sum + count, 0);
    };

    const handleLocalityChange = (e) => {
        setSelectedLocality(e.target.value);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading transaction data...</div>;
    }

    if (transactions.length === 0) {
        return <div className="text-center py-10">No transaction data available</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Seasonal Transaction Patterns</h2>

            {/* Locality selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Village/Locality:</label>
                <select
                    value={selectedLocality}
                    onChange={handleLocalityChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                    {localities.map(locality => (
                        <option key={locality} value={locality}>
                            {locality === 'all' ? 'All Localities' : locality}
                        </option>
                    ))}
                </select>
            </div>

            {/* Transaction count indicator */}
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <p className="text-gray-700">
                    <span className="font-medium">Total Transactions:</span> {filteredData.length}
                    {selectedLocality !== 'all' && ` in ${selectedLocality}`}
                </p>
            </div>

            {/* Year selector */}
            {years.length > 0 ? (
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Year:</label>
                    <div className="flex flex-wrap gap-2">
                        {years.map(year => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-4 py-2 rounded-md ${selectedYear === year
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-4 mb-6 bg-gray-50 rounded-md">
                    <p className="text-gray-700">No transaction data available for the selected locality</p>
                </div>
            )}

            {selectedYear && (
                <>
                    {/* Calendar heatmap */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Monthly Transaction Frequency ({selectedYear})</h3>
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12">
                            {monthNames.map((month, idx) => {
                                const count = yearlyData[selectedYear] ? yearlyData[selectedYear][idx] : 0;
                                const maxCount = getMaxCount(selectedYear);
                                const colorClass = getColorIntensity(count, maxCount);
                                const season = getSeason(idx);

                                return (
                                    <div key={idx} className="flex flex-col items-center">
                                        <div className="text-xs text-gray-600 mb-1">{month}</div>
                                        <div
                                            className={`w-full aspect-square ${colorClass} rounded-md flex items-center justify-center relative border border-gray-200`}
                                            style={{ minHeight: '2.5rem' }}
                                        >
                                            <span className={`text-sm font-medium ${count > 0 && maxCount > 2 ? 'text-white' : 'text-gray-800'}`}>
                                                {count}
                                            </span>

                                            {/* Season indicator */}
                                            <div className={`absolute bottom-0 left-0 right-0 h-1 ${season.color}`}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Seasonal breakdown */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Seasonal Distribution ({selectedYear})</h3>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {countBySeasonForYear(selectedYear).map((season, idx) => (
                                <div key={idx} className={`p-4 rounded-lg ${season.color} border border-gray-200`}>
                                    <div className="text-sm font-medium text-gray-800">{season.name}</div>
                                    <div className="mt-2 text-xl font-bold">{season.count}</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        {getTotalForYear(selectedYear) > 0
                                            ? `${Math.round((season.count / getTotalForYear(selectedYear)) * 100)}%`
                                            : '0%'
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Peak period analysis */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Peak Registration Periods</h3>

                        {peakMonth.year && peakMonth.month !== null ? (
                            <div>
                                <p className="text-gray-700">
                                    <span className="font-medium">Overall peak:</span> {monthNames[peakMonth.month]} {peakMonth.year}
                                    ({yearlyData[peakMonth.year][peakMonth.month]} transactions)
                                </p>

                                {selectedYear && (
                                    <p className="text-gray-700 mt-2">
                                        <span className="font-medium">Peak for {selectedYear}:</span>{' '}
                                        {yearlyData[selectedYear] && Math.max(...yearlyData[selectedYear]) > 0 ? (
                                            <>
                                                {monthNames[yearlyData[selectedYear].indexOf(Math.max(...yearlyData[selectedYear]))]}
                                                ({Math.max(...yearlyData[selectedYear])} transactions)
                                            </>
                                        ) : (
                                            'No transactions'
                                        )}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-700">No peak periods identified in the available data.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default SeasonalTransactionPatterns;