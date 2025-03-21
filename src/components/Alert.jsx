import React from 'react'
import { AlertCircle} from 'lucide-react';
// Alert Component
const Alert = ({ type, title, message }) => {
    const types = {
        error: "bg-red-50 border-red-400 text-red-700",
        warning: "bg-yellow-50 border-yellow-400 text-yellow-700",
        success: "bg-green-50 border-green-400 text-green-700",
        info: "bg-blue-50 border-blue-400 text-blue-700"
    };

    return (
        <div className={`p-4 border-l-4 ${types[type]} rounded-md mb-4`}>
            <div className="flex items-center">
                {type === 'error' && <AlertCircle className="h-5 w-5 mr-2" />}
                <h3 className="text-sm font-medium">{title}</h3>
            </div>
            {message && <p className="mt-1 text-sm">{message}</p>}
        </div>
    );
};

export default Alert