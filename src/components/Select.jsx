import React from 'react'

// Custom Select Component
const Select = ({ id, label, value, onChange, options }) => {
    return (
        <div className="mb-4">
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Select</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select