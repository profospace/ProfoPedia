import React from 'react'

// Custom Input Component
const Input = ({ id, label, value, onChange, placeholder, type = 'text' }) => {
    return (
        <div className="mb-4">
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
};

export default Input