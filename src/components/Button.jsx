import React from 'react'

// Custom Button Component
const Button = ({ children, variant = 'primary', disabled = false, onClick, type = 'button', className = '' }) => {
    const baseStyle = "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
        outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
        icon: "p-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 rounded-full"
    };

    const disabledStyle = "opacity-50 cursor-not-allowed";

    return (
        <button
            type={type}
            className={`${baseStyle} ${variantStyles[variant]} ${disabled ? disabledStyle : ''} ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button