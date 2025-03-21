import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, X } from 'lucide-react';

const TehsilSelector = ({
    districtCode,
    onSelectTehsil,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tehsils, setTehsils] = useState([]);
    const [selectedTehsil, setSelectedTehsil] = useState(null);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    // Load tehsils when component mounts or district changes
    useEffect(() => {
        if (districtCode) {
            setLoading(true);

            // This function would fetch tehsil data from your API
            // For now, using the static data from your code
            const fetchTehsils = () => {
                // In production, replace with actual API call
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
                setLoading(false);
            };

            fetchTehsils();
        } else {
            setTehsils([]);
        }
    }, [districtCode]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (tehsil) => {
        setSelectedTehsil(tehsil);
        setIsOpen(false);
        onSelectTehsil && onSelectTehsil({
            tehsilCode: tehsil.code,
            tehsilNameEn: tehsil.nameEn,
            tehsilNameHi: tehsil.name
        });
    };

    const handleClear = () => {
        setSelectedTehsil(null);
        onSelectTehsil && onSelectTehsil(null);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Label */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Tehsil/Area
            </label>

            {/* Selector */}
            <div className="relative">
                <button
                    type="button"
                    className="w-full flex items-center justify-between border rounded-md p-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={!districtCode}
                >
                    {selectedTehsil ? (
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col items-start">
                                <span className="font-medium">{selectedTehsil.nameEn}</span>
                                <span className="text-xs text-gray-500">{selectedTehsil.name}</span>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClear();
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <span className="text-gray-500">
                                {!districtCode
                                    ? "Select a district first"
                                    : loading
                                        ? "Loading tehsils..."
                                        : "Select tehsil/area"}
                            </span>
                            <ChevronDown size={18} className="text-gray-400" />
                        </>
                    )}
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                        {loading ? (
                            <div className="p-3 text-center text-gray-500">Loading tehsils...</div>
                        ) : tehsils.length > 0 ? (
                            <ul className="py-1">
                                {tehsils.map((tehsil) => (
                                    <li
                                        key={tehsil.code}
                                        onClick={() => handleSelect(tehsil)}
                                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex flex-col"
                                    >
                                        <span className="text-sm font-medium">{tehsil.nameEn}</span>
                                        <span className="text-xs text-gray-500">{tehsil.name} - {tehsil.code}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-3 text-center text-gray-500">
                                No tehsils available for this district
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TehsilSelector;