import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';

const VillageSelector = ({
    districtCode,
    tehsilCode,
    onSelectVillage,
    placeholder = "Search village by name...",
    className = ""
}) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [villages, setVillages] = useState([]);
    const [filteredVillages, setFilteredVillages] = useState([]);
    const [selectedVillage, setSelectedVillage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tehsils, setTehsils] = useState([]);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    // Load tehsils when component mounts
    useEffect(() => {
        // This simulates the tehsil loading from your code
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

    // Load villages when tehsilCode changes
    useEffect(() => {
        if (tehsilCode) {
            setLoading(true);

            // This simulates the API call to get villages by tehsil code
            const fetchVillages = () => {
                // For production, replace this with actual API call
                const getVillagesByTehsil = (tehsilCode) => {
                    // This function would normally fetch from API, but for demo
                    // we're using the static data from your code
                    const villageData = {
                        "208": [
                            { value: "900040", name: "अटहा", nameEn: "Ataha" },
                            { value: "900041", name: "अल्‍लापुरवा", nameEn: "Allapurava" },
                            // ...more villages would be here
                        ],
                        "209": [
                            { value: "900934", name: "अचाक पुरवा", nameEn: "AChak Purava" },
                            { value: "900959", name: "अजीमुल्ला नगर बिठूर कला", nameEn: "Ajeemulla Nagara Bithoora Kala" },
                            // ...more villages would be here
                        ],
                        // ...more tehsils would be here
                    };

                    return villageData[tehsilCode] || [];
                };

                const villageList = getVillagesByTehsil(tehsilCode);
                setVillages(villageList);
                setFilteredVillages(villageList);
                setLoading(false);
            };

            fetchVillages();
        } else {
            setVillages([]);
            setFilteredVillages([]);
        }
    }, [tehsilCode]);

    // Filter villages when query changes
    useEffect(() => {
        if (query.length >= 2) {
            const filtered = villages.filter(village =>
                village.nameEn.toLowerCase().includes(query.toLowerCase()) ||
                village.name.includes(query)
            );
            setFilteredVillages(filtered);
        } else {
            setFilteredVillages(villages.slice(0, 50)); // Limit initial display
        }
    }, [query, villages]);

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

    const handleSelect = (village) => {
        setSelectedVillage(village);
        setQuery('');
        setIsOpen(false);
        onSelectVillage && onSelectVillage({
            gaonCode1: village.value,
            villageNameEn: village.nameEn,
            villageNameHi: village.name,
            tehsilCode
        });
    };

    const handleClear = () => {
        setSelectedVillage(null);
        setQuery('');
        onSelectVillage && onSelectVillage(null);
        inputRef.current?.focus();
    };

    const getTehsilName = (code) => {
        const tehsil = tehsils.find(t => t.code === code);
        return tehsil ? tehsil.nameEn : code;
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Label */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Village/Location
            </label>

            {/* Input field */}
            <div className="relative">
                {selectedVillage ? (
                    <div className="flex items-center justify-between p-2 border rounded-md bg-white">
                        <div className="flex flex-col">
                            <span className="font-medium">{selectedVillage.nameEn}</span>
                            <span className="text-xs text-gray-500">
                                {selectedVillage.name} - {getTehsilName(tehsilCode)}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div
                        className="relative flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                        onClick={() => setIsOpen(true)}
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <Search size={18} className="text-gray-400" />
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="w-full py-2 pl-10 pr-10 border-0 focus:ring-0 rounded-md"
                            placeholder={placeholder}
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setIsOpen(true);
                            }}
                            onFocus={() => setIsOpen(true)}
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDown size={18} className="text-gray-400" />
                        </span>
                    </div>
                )}
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                    {loading ? (
                        <div className="p-3 text-center text-gray-500">Loading villages...</div>
                    ) : filteredVillages.length > 0 ? (
                        <ul className="py-1">
                            {filteredVillages.map((village) => (
                                <li
                                    key={village.value}
                                    onClick={() => handleSelect(village)}
                                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex flex-col"
                                >
                                    <span className="text-sm font-medium">{village.nameEn}</span>
                                    <span className="text-xs text-gray-500">{village.name} - {village.value}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-3 text-center text-gray-500">
                            {query.length < 2 ? "Type at least 2 characters to search" : "No villages found"}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VillageSelector;