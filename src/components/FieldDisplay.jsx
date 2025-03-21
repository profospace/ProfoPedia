import { Copy } from 'lucide-react';
import React,{useState} from 'react'

// Field Display Component for detail view
const FieldDisplay = ({ label, value, copyable = false }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="mb-2">
            <div className="flex items-center">
                <span className="font-medium text-gray-700 mr-2">{label}:</span>
                <span className="text-gray-900">{value || 'N/A'}</span>
                {copyable && value && (
                    <button
                        onClick={copyToClipboard}
                        className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        title="Copy to clipboard"
                    >
                        {copied ? 'Copied!' : <Copy size={14} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FieldDisplay