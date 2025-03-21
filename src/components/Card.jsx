import React from 'react'

// Card Component
const Card = ({ title, icon, children, className = '' }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
            {title && (
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold flex items-center text-gray-800">
                        {icon && <span className="mr-2">{icon}</span>}
                        {title}
                    </h3>
                </div>
            )}
            <div className="p-3">
                {children}
            </div>
        </div>
    );
};

export default Card