import React, { useState } from 'react';
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa';

const DeedFilters = ({ filters, onFilterChange, onFilterReset, filterOptions }) => {
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    // Handle change for any filter
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    // Handle search input
    const handleSearch = (e) => {
        e.preventDefault();
        // Search is applied immediately as part of the filters state
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-3">Filters</h2>

            {/* Basic Search Form */}
            <form onSubmit={handleSearch} className="flex mb-4">
                <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleChange}
                    placeholder="Search by name, document number..."
                    className="flex-grow p-2 border rounded-l"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
                    <FaSearch />
                </button>
            </form>

            {/* Basic Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <label className="block text-sm mb-1">Deed Type</label>
                    <select
                        name="deedType"
                        value={filters.deedType}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">All Types</option>
                        {filterOptions.deedTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm mb-1">District</label>
                    <select
                        name="district"
                        value={filters.district}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">All Districts</option>
                        {filterOptions.districts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm mb-1">Year</label>
                    <select
                        name="year"
                        value={filters.year}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">All Years</option>
                        {filterOptions.years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm mb-1">Month</label>
                    <select
                        name="month"
                        value={filters.month}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">All Months</option>
                        {filterOptions.months.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="flex items-center text-blue-600"
                >
                    <FaFilter className="mr-2" />
                    {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                </button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm mb-1">Land Type</label>
                        <select
                            name="landType"
                            value={filters.landType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">All Land Types</option>
                            {filterOptions.landTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Locality</label>
                        <select
                            name="locality"
                            value={filters.locality}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">All Localities</option>
                            {filterOptions.localities.map((locality) => (
                                <option key={locality} value={locality}>
                                    {locality}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Ward</label>
                        <select
                            name="ward"
                            value={filters.ward}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">All Wards</option>
                            {filterOptions.wards.map((ward) => (
                                <option key={ward} value={ward}>
                                    {ward}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Floor</label>
                        <select
                            name="floor"
                            value={filters.floor}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">All Floors</option>
                            {filterOptions.floors.map((floor) => (
                                <option key={floor} value={floor}>
                                    {floor}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Sub-Registrar</label>
                        <select
                            name="subRegistrar"
                            value={filters.subRegistrar}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">All Sub-Registrars</option>
                            {filterOptions.subRegistrars.map((registrar) => (
                                <option key={registrar} value={registrar}>
                                    {registrar}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Transaction Value Range</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    name="minValue"
                                    value={filters.minValue}
                                    onChange={handleChange}
                                    placeholder="Min"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    name="maxValue"
                                    value={filters.maxValue}
                                    onChange={handleChange}
                                    placeholder="Max"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Market Value Range</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    name="minMarketValue"
                                    value={filters.minMarketValue}
                                    onChange={handleChange}
                                    placeholder="Min"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    name="maxMarketValue"
                                    value={filters.maxMarketValue}
                                    onChange={handleChange}
                                    placeholder="Max"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Area Range</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    name="minArea"
                                    value={filters.minArea}
                                    onChange={handleChange}
                                    placeholder="Min"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    name="maxArea"
                                    value={filters.maxArea}
                                    onChange={handleChange}
                                    placeholder="Max"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Registration Date Range</label>
                            <div className="flex space-x-2">
                                <input
                                    type="date"
                                    name="fromDate"
                                    value={filters.fromDate}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="date"
                                    name="toDate"
                                    value={filters.toDate}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Actions */}
            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    onClick={onFilterReset}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                >
                    <FaTimes className="inline mr-1" /> Reset Filters
                </button>
            </div>
        </div>
    );
};

export default DeedFilters;