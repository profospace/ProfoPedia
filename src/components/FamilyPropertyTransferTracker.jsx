import React, { useState, useEffect } from 'react';
import { UsersRound, Home, Search, User, ArrowRightLeft, ChevronDown, ChevronUp, AlertCircle, Users, ExternalLink } from 'lucide-react';
import _ from 'lodash';

const FamilyPropertyTransferTracker = ({ data }) => {
    // State for family transfers and holdings
    const [familyTransfers, setFamilyTransfers] = useState([]);
    const [familyHoldings, setFamilyHoldings] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedTransfer, setExpandedTransfer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [familyList, setFamilyList] = useState([]);
    const [transferTypes, setTransferTypes] = useState({});
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        if (!data || data.length === 0) {
            setLoading(false);
            return;
        }

        // Process the data to identify family transfers and holdings
        processPropertyData();
    }, [data]);

    useEffect(() => {
        // When a family is selected, get their specific transfers and holdings
        if (selectedFamily) {
            const familyData = getFamilyData(selectedFamily);
            setFamilyTransfers(familyData.transfers);
            setFamilyHoldings(familyData.holdings);
        } else {
            // If no family selected, show all transfers
            setFamilyTransfers(getAllFamilyTransfers());
            setFamilyHoldings([]);
        }
    }, [selectedFamily]);

    const processPropertyData = () => {
        // Create maps to track property ownership by family name
        const lastNameMap = new Map();
        const addressMap = new Map();
        const familyTransfersMap = new Map();
        const familyIdentifierMap = new Map(); // Maps people to likely families
        const propertyTransferTypesMap = new Map(); // For tracking transfer types

        // First, normalize family names (last names)
        const extractLastName = (fullName) => {
            if (!fullName) return null;

            // Remove common titles
            const nameWithoutTitle = fullName
                .replace(/श्री|श्रीमती|कुमारी|डॉ|सुश्री/g, '')
                .trim();

            // Get the last part of the name as the surname
            const parts = nameWithoutTitle.split(' ');
            if (parts.length > 1) {
                return parts[parts.length - 1].trim();
            }
            return nameWithoutTitle;
        };

        // Extract family identifiers based on last names and addresses
        data.forEach(transaction => {
            // Process first party (sellers/transferors)
            if (transaction.firstParty && transaction.firstParty.length > 0) {
                transaction.firstParty.forEach(person => {
                    const lastName = extractLastName(person.name);
                    if (!lastName) return;

                    if (!lastNameMap.has(lastName)) {
                        lastNameMap.set(lastName, []);
                    }

                    // Add to the list of people with this last name
                    const peopleWithLastName = lastNameMap.get(lastName);
                    if (!peopleWithLastName.some(p => p.name === person.name)) {
                        peopleWithLastName.push({
                            name: person.name,
                            address: person.address
                        });
                    }

                    // Track addresses
                    if (person.address) {
                        if (!addressMap.has(person.address)) {
                            addressMap.set(person.address, []);
                        }

                        const peopleAtAddress = addressMap.get(person.address);
                        if (!peopleAtAddress.some(p => p.name === person.name)) {
                            peopleAtAddress.push({
                                name: person.name,
                                lastName
                            });
                        }
                    }

                    // Map this person to a family identifier (using last name as family identifier)
                    familyIdentifierMap.set(person.name, lastName);
                });
            }

            // Process second party (buyers/transferees)
            if (transaction.secondParty && transaction.secondParty.length > 0) {
                transaction.secondParty.forEach(person => {
                    const lastName = extractLastName(person.name);
                    if (!lastName) return;

                    if (!lastNameMap.has(lastName)) {
                        lastNameMap.set(lastName, []);
                    }

                    // Add to the list of people with this last name
                    const peopleWithLastName = lastNameMap.get(lastName);
                    if (!peopleWithLastName.some(p => p.name === person.name)) {
                        peopleWithLastName.push({
                            name: person.name,
                            address: person.address
                        });
                    }

                    // Track addresses
                    if (person.address) {
                        if (!addressMap.has(person.address)) {
                            addressMap.set(person.address, []);
                        }

                        const peopleAtAddress = addressMap.get(person.address);
                        if (!peopleAtAddress.some(p => p.name === person.name)) {
                            peopleAtAddress.push({
                                name: person.name,
                                lastName
                            });
                        }
                    }

                    // Map this person to a family identifier (using last name as family identifier)
                    familyIdentifierMap.set(person.name, lastName);
                });
            }
        });

        // Identify family transfers by looking for transactions between people with the same last name
        data.forEach(transaction => {
            let isIntergenerationalTransfer = false;
            let fromFamily = null;
            let toFamily = null;
            let transferType = null;

            // Skip if no parties involved
            if (!transaction.firstParty || !transaction.secondParty) {
                return;
            }

            // Check if this transaction is between related parties
            transaction.firstParty.forEach(seller => {
                const sellerFamily = familyIdentifierMap.get(seller.name);

                transaction.secondParty.forEach(buyer => {
                    const buyerFamily = familyIdentifierMap.get(buyer.name);

                    // If the buyer and seller have the same last name, it's likely a family transfer
                    if (sellerFamily && buyerFamily && sellerFamily === buyerFamily) {
                        isIntergenerationalTransfer = true;
                        fromFamily = sellerFamily;
                        toFamily = buyerFamily;
                    }
                });
            });

            // Also consider gift deeds as potential family transfers
            if (transaction.deedType && transaction.deedType.includes('दान')) {
                transferType = 'gift';

                // For gift deeds, check if there are family relationships
                if (!isIntergenerationalTransfer) {
                    transaction.firstParty.forEach(donor => {
                        const donorFamily = familyIdentifierMap.get(donor.name);

                        transaction.secondParty.forEach(recipient => {
                            const recipientFamily = familyIdentifierMap.get(recipient.name);

                            if (donorFamily && recipientFamily) {
                                // It's still possible to be a family transfer even with different last names
                                // (e.g., gifts to daughters who may have different last names after marriage)
                                fromFamily = donorFamily;
                                toFamily = recipientFamily;
                                isIntergenerationalTransfer = true;
                            }
                        });
                    });
                }
            } else if (isIntergenerationalTransfer) {
                transferType = 'sale';
            }

            // If this is a family transfer, track it
            if (isIntergenerationalTransfer) {
                const transferDetails = {
                    id: transaction._id,
                    fromFamily,
                    toFamily,
                    transferType: transferType || 'unknown',
                    documentNumber: transaction.documentNumber,
                    registrationDate: transaction.registrationDate,
                    executionDate: transaction.executionDate,
                    khasraNumber: transaction.khasraNumber,
                    area: transaction.area,
                    locality: transaction.locality,
                    transferors: transaction.firstParty,
                    transferees: transaction.secondParty,
                    deedType: transaction.deedType,
                    propertyDescription: transaction.propertyDescription,
                    originalTransaction: transaction
                };

                // Add to the mapping for both families
                if (fromFamily) {
                    if (!familyTransfersMap.has(fromFamily)) {
                        familyTransfersMap.set(fromFamily, []);
                    }
                    familyTransfersMap.get(fromFamily).push(transferDetails);
                }

                if (toFamily && toFamily !== fromFamily) {
                    if (!familyTransfersMap.has(toFamily)) {
                        familyTransfersMap.set(toFamily, []);
                    }
                    familyTransfersMap.get(toFamily).push(transferDetails);
                }

                // Track transfer types for filtering
                if (transferType) {
                    if (!propertyTransferTypesMap.has(transferType)) {
                        propertyTransferTypesMap.set(transferType, 0);
                    }
                    propertyTransferTypesMap.set(transferType, propertyTransferTypesMap.get(transferType) + 1);
                }
            }
        });

        // Convert Maps to arrays for state
        const familyNames = Array.from(familyTransfersMap.keys()).sort();
        const transferTypeCounts = Object.fromEntries(propertyTransferTypesMap.entries());

        setFamilyList(familyNames);
        setTransferTypes(transferTypeCounts);
        setLoading(false);
    };

    // Get all family transfer data combined
    const getAllFamilyTransfers = () => {
        const allTransfers = [];
        const transferIds = new Set(); // To prevent duplicates

        familyList.forEach(family => {
            const familyData = getFamilyData(family);

            familyData.transfers.forEach(transfer => {
                if (!transferIds.has(transfer.id)) {
                    transferIds.add(transfer.id);
                    allTransfers.push(transfer);
                }
            });
        });

        // Sort by date (latest first)
        return allTransfers.sort((a, b) => {
            const dateA = new Date(a.registrationDate);
            const dateB = new Date(b.registrationDate);
            return dateB - dateA;
        });
    };

    // Get transfer and holding data for a specific family
    const getFamilyData = (familyName) => {
        if (!familyName) return { transfers: [], holdings: [] };

        // Filter the data for this family
        const familyTransactions = data.filter(transaction => {
            if (!transaction.firstParty || !transaction.secondParty) return false;

            // Check if any party in the transaction is from this family
            const hasFirstPartyFromFamily = transaction.firstParty.some(party => {
                const lastName = party.name.split(' ').pop();
                return lastName === familyName;
            });

            const hasSecondPartyFromFamily = transaction.secondParty.some(party => {
                const lastName = party.name.split(' ').pop();
                return lastName === familyName;
            });

            return hasFirstPartyFromFamily || hasSecondPartyFromFamily;
        });

        // Determine property holdings (properties currently owned by the family)
        // This is a simplified approach; in reality, you would need a more sophisticated tracking
        const holdings = [];
        const transferredOutProperties = new Set();

        // First, mark properties that the family has sold or transferred out
        familyTransactions.forEach(transaction => {
            const hasFirstPartyFromFamily = transaction.firstParty.some(party => {
                const lastName = party.name.split(' ').pop();
                return lastName === familyName;
            });

            const hasSecondPartyFromFamily = transaction.secondParty.some(party => {
                const lastName = party.name.split(' ').pop();
                return lastName === familyName;
            });

            // If the family is selling/transferring out
            if (hasFirstPartyFromFamily && !hasSecondPartyFromFamily) {
                transferredOutProperties.add(transaction.khasraNumber);
            }
        });

        // Now identify properties still held by the family (acquired and not transferred out)
        familyTransactions.forEach(transaction => {
            const hasSecondPartyFromFamily = transaction.secondParty.some(party => {
                const lastName = party.name.split(' ').pop();
                return lastName === familyName;
            });

            // If the family acquired this property and hasn't transferred it out
            if (hasSecondPartyFromFamily && !transferredOutProperties.has(transaction.khasraNumber)) {
                holdings.push({
                    id: transaction._id,
                    khasraNumber: transaction.khasraNumber,
                    area: transaction.area,
                    locality: transaction.locality,
                    propertyDescription: transaction.propertyDescription,
                    acquisitionDate: transaction.registrationDate,
                    acquirer: transaction.secondParty.find(party => {
                        const lastName = party.name.split(' ').pop();
                        return lastName === familyName;
                    }),
                    originalTransaction: transaction
                });
            }
        });

        // Identify family transfers
        const transfers = [];
        familyTransactions.forEach(transaction => {
            // Check for intergenerational transfers (same family on both sides)
            const firstPartyFamilyMembers = transaction.firstParty.filter(party => {
                const lastName = party.name.split(' ').pop();
                return lastName === familyName;
            });

            const secondPartyFamilyMembers = transaction.secondParty.filter(party => {
                const lastName = party.name.split(' ').pop();
                return lastName === familyName;
            });

            if (firstPartyFamilyMembers.length > 0 && secondPartyFamilyMembers.length > 0) {
                transfers.push({
                    id: transaction._id,
                    fromFamily: familyName,
                    toFamily: familyName,
                    transferType: transaction.deedType.includes('दान') ? 'gift' : 'sale',
                    documentNumber: transaction.documentNumber,
                    registrationDate: transaction.registrationDate,
                    executionDate: transaction.executionDate,
                    khasraNumber: transaction.khasraNumber,
                    area: transaction.area,
                    locality: transaction.locality,
                    transferors: firstPartyFamilyMembers,
                    transferees: secondPartyFamilyMembers,
                    deedType: transaction.deedType,
                    propertyDescription: transaction.propertyDescription,
                    originalTransaction: transaction
                });
            }
        });

        return {
            transfers,
            holdings
        };
    };

    // Filter transfers based on search and transfer type
    const getFilteredTransfers = () => {
        if (!familyTransfers || familyTransfers.length === 0) return [];

        return familyTransfers.filter(transfer => {
            // Filter by type if applicable
            const typeMatch = filterType === 'all' || transfer.transferType === filterType;

            // Filter by search query
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                searchQuery === '' ||
                (transfer.fromFamily && transfer.fromFamily.toLowerCase().includes(searchLower)) ||
                (transfer.toFamily && transfer.toFamily.toLowerCase().includes(searchLower)) ||
                (transfer.locality && transfer.locality.toLowerCase().includes(searchLower)) ||
                (transfer.khasraNumber && transfer.khasraNumber.toLowerCase().includes(searchLower)) ||
                (transfer.documentNumber && transfer.documentNumber.toLowerCase().includes(searchLower)) ||
                (transfer.transferors && transfer.transferors.some(person =>
                    person.name.toLowerCase().includes(searchLower))) ||
                (transfer.transferees && transfer.transferees.some(person =>
                    person.name.toLowerCase().includes(searchLower)));

            return typeMatch && matchesSearch;
        });
    };

    // Toggle expansion for a transfer details
    const toggleTransferDetails = (transferId) => {
        if (expandedTransfer === transferId) {
            setExpandedTransfer(null);
        } else {
            setExpandedTransfer(transferId);
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '';

        // Handle the format "DD MMM YYYY"
        const parts = dateString.split(' ');
        if (parts.length === 3) {
            return dateString;
        }

        // Handle ISO format
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        } catch (e) {
            return dateString;
        }
    };

    // Format area in square meters
    const formatArea = (area) => {
        if (!area && area !== 0) return '—';
        return `${area.toLocaleString()} वर्ग मीटर`;
    };

    // Generate color for family tag
    const getFamilyColor = (familyName) => {
        // Simple hash function to generate a deterministic color
        const hash = familyName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colors = [
            'bg-blue-100 text-blue-800', 'bg-green-100 text-green-800',
            'bg-yellow-100 text-yellow-800', 'bg-red-100 text-red-800',
            'bg-indigo-100 text-indigo-800', 'bg-purple-100 text-purple-800',
            'bg-pink-100 text-pink-800', 'bg-teal-100 text-teal-800'
        ];
        return colors[hash % colors.length];
    };

    // Get color for transfer type
    const getTransferTypeColor = (type) => {
        switch (type) {
            case 'gift': return 'bg-green-100 text-green-800';
            case 'sale': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredTransfers = getFilteredTransfers();

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center">
                    <UsersRound className="h-8 w-8 text-white mr-3" />
                    <div>
                        <h2 className="text-xl font-semibold text-white">Family Property Transfer Tracker</h2>
                        <p className="text-indigo-100 text-sm mt-1">
                            Identify and track intergenerational property transfers
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
                        <p className="text-gray-600">Analyzing family property transfers...</p>
                    </div>
                ) : familyList.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No family transfers detected</h3>
                        <p className="text-gray-500">
                            We couldn't identify any clear intergenerational property transfers in the data.
                            This might be due to limited data or missing family relationships.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Controls Panel */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Select Family
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={selectedFamily || ''}
                                        onChange={(e) => setSelectedFamily(e.target.value || null)}
                                    >
                                        <option value="">All Families</option>
                                        {familyList.map((family) => (
                                            <option key={family} value={family}>{family}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Filter by Transfer Type
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                    >
                                        <option value="all">All Transfer Types</option>
                                        {Object.keys(transferTypes).map((type) => (
                                            <option key={type} value={type}>
                                                {type === 'gift' ? 'Gift Deed' : type === 'sale' ? 'Sale Deed' : type}
                                                {' '}({transferTypes[type]})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search size={16} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search by name, document #, locality..."
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                <div className="bg-white rounded-md border border-gray-200 p-3">
                                    <div className="text-xs text-gray-500">Total Families</div>
                                    <div className="text-xl font-semibold mt-1">{familyList.length}</div>
                                </div>

                                <div className="bg-white rounded-md border border-gray-200 p-3">
                                    <div className="text-xs text-gray-500">Family Transfers</div>
                                    <div className="text-xl font-semibold mt-1">{getAllFamilyTransfers().length}</div>
                                </div>

                                <div className="bg-white rounded-md border border-gray-200 p-3">
                                    <div className="text-xs text-gray-500">Gift Deeds</div>
                                    <div className="text-xl font-semibold mt-1">{transferTypes.gift || 0}</div>
                                </div>

                                <div className="bg-white rounded-md border border-gray-200 p-3">
                                    <div className="text-xs text-gray-500">Sale Deeds</div>
                                    <div className="text-xl font-semibold mt-1">{transferTypes.sale || 0}</div>
                                </div>
                            </div>
                        </div>

                        {/* Transfer List */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">
                                {selectedFamily ? `${selectedFamily} Family Transfers` : 'All Family Transfers'}
                                {searchQuery && ` • Search: "${searchQuery}"`}
                                {filterType !== 'all' && ` • Type: ${filterType}`}
                            </h3>

                            {filteredTransfers.length === 0 ? (
                                <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
                                    <p className="text-gray-500">
                                        No transfers found matching your criteria. Try adjusting your filters.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredTransfers.map((transfer) => (
                                        <div key={transfer.id} className="border rounded-lg overflow-hidden">
                                            {/* Transfer summary row */}
                                            <div className="p-4 bg-white cursor-pointer hover:bg-gray-50"
                                                onClick={() => toggleTransferDetails(transfer.id)}>
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center">
                                                            <div className={`text-xs font-medium px-2 py-1 rounded ${getTransferTypeColor(transfer.transferType)} mr-2`}>
                                                                {transfer.transferType === 'gift' ? 'Gift Deed' : 'Sale Deed'}
                                                            </div>
                                                            <span className="text-sm text-gray-500">
                                                                {formatDate(transfer.registrationDate)}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center mt-2">
                                                            <div className={`px-2 py-1 text-xs rounded ${getFamilyColor(transfer.fromFamily)} mr-2`}>
                                                                {transfer.fromFamily}
                                                            </div>
                                                            <ArrowRightLeft size={14} className="text-gray-400 mx-1" />
                                                            <div className={`px-2 py-1 text-xs rounded ${getFamilyColor(transfer.toFamily)} ml-1`}>
                                                                {transfer.toFamily}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 mt-3 md:mt-0">
                                                        <div className="text-sm">
                                                            <span className="text-gray-500">Document: </span>
                                                            <span className="font-medium">{transfer.documentNumber}</span>
                                                        </div>
                                                        <div className="text-sm mt-1">
                                                            <span className="text-gray-500">Property: </span>
                                                            <span className="font-medium">
                                                                {transfer.locality || '—'} | {transfer.khasraNumber || '—'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex mt-3 md:mt-0 items-center justify-end">
                                                        <div className="text-right mr-3">
                                                            <div className="text-sm font-medium">
                                                                {formatArea(transfer.area)}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {transfer.transferors?.length || 0} → {transfer.transferees?.length || 0} parties
                                                            </div>
                                                        </div>

                                                        {expandedTransfer === transfer.id ? (
                                                            <ChevronUp size={18} className="text-gray-400" />
                                                        ) : (
                                                            <ChevronDown size={18} className="text-gray-400" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expanded detail section */}
                                            {expandedTransfer === transfer.id && (
                                                <div className="p-4 bg-gray-50 border-t border-gray-200">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* Transfer Details */}
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Transfer Details</h4>
                                                            <div className="space-y-2 text-sm">
                                                                <div className="flex flex-col">
                                                                    <span className="text-gray-500">Property Description</span>
                                                                    <span className="font-medium">
                                                                        {transfer.propertyDescription || 'No description available'}
                                                                    </span>
                                                                </div>

                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <span className="text-gray-500">Execution Date</span>
                                                                        <div className="font-medium">{formatDate(transfer.executionDate)}</div>
                                                                    </div>

                                                                    <div>
                                                                        <span className="text-gray-500">Registration Date</span>
                                                                        <div className="font-medium">{formatDate(transfer.registrationDate)}</div>
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <span className="text-gray-500">Deed Type</span>
                                                                        <div className="font-medium">{transfer.deedType || '—'}</div>
                                                                    </div>

                                                                    <div>
                                                                        <span className="text-gray-500">Area</span>
                                                                        <div className="font-medium">{formatArea(transfer.area)}</div></div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Parties Involved */}
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Parties Involved</h4>

                                                            <div className="text-xs flex items-center bg-gray-100 p-2 rounded">
                                                                <AlertCircle size={12} className="text-amber-500 mr-1" />
                                                                <span className="text-gray-600">
                                                                    Relationships are identified based on shared surnames and addresses.
                                                                </span>
                                                            </div>

                                                            <div className="text-xs text-gray-500 mb-1 mt-3 flex items-center">
                                                                <ArrowRightLeft size={13} className="mr-1 text-red-500" />
                                                                Transferors / First Party
                                                            </div>

                                                            <div className="space-y-2">
                                                                {transfer.transferors && transfer.transferors.map((person, index) => (
                                                                    <div key={index} className="flex items-start bg-white p-2 rounded-md border border-gray-200">
                                                                        <User className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                                                                        <div className="flex-1">
                                                                            <div className="font-medium text-sm">{person.name}</div>
                                                                            <div className="text-xs text-gray-500">{person.address || 'No address'}</div>
                                                                        </div>
                                                                        <div className={`px-2 py-0.5 text-xs rounded ${getFamilyColor(transfer.fromFamily)}`}>
                                                                            {transfer.fromFamily}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {transfer.transferors?.length === 0 && (
                                                                <div className="text-sm text-gray-500 italic">No transferors listed</div>
                                                            )}

                                                            <div className="text-xs text-gray-500 mb-1 mt-3 flex items-center">
                                                                <ArrowRightLeft size={13} className="mr-1 text-green-500" />
                                                                Transferees / Second Party
                                                            </div>

                                                            <div className="space-y-2">
                                                                {transfer.transferees && transfer.transferees.map((person, index) => (
                                                                    <div key={index} className="flex items-start bg-white p-2 rounded-md border border-gray-200">
                                                                        <User className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                                                                        <div className="flex-1">
                                                                            <div className="font-medium text-sm">{person.name}</div>
                                                                            <div className="text-xs text-gray-500">{person.address || 'No address'}</div>
                                                                        </div>
                                                                        <div className={`px-2 py-0.5 text-xs rounded ${getFamilyColor(transfer.toFamily)}`}>
                                                                            {transfer.toFamily}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {transfer.transferees?.length === 0 && (
                                                                <div className="text-sm text-gray-500 italic">No transferees listed</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Family Holdings */}
                        {selectedFamily && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                                    <Home className="h-5 w-5 mr-2 text-indigo-600" />
                                    {selectedFamily} Family Property Holdings
                                </h3>

                                {familyHoldings.length > 0 ? (
                                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Property
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Location
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Area
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Acquirer
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Acquisition Date
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {familyHoldings.map((holding, index) => (
                                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="flex items-start">
                                                                    <div>
                                                                        <div className="text-sm font-medium text-gray-900">
                                                                            {holding.khasraNumber || 'Unknown'}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                                                                            {holding.propertyDescription || 'No description'}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                                {holding.locality || 'Unknown location'}
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                                {formatArea(holding.area)}
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {holding.acquirer?.name || 'Unknown'}
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {holding.acquirer?.address || 'No address'}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                                {formatDate(holding.acquisitionDate)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
                                        <Home className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500">
                                            No current property holdings found for the {selectedFamily} family.
                                        </p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            This family may have transferred all their properties.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Information and Help section */}
                        <div className="bg-indigo-50 rounded-lg p-4 mt-6">
                            <h3 className="text-md font-medium text-indigo-800 mb-2 flex items-center">
                                <InfoCircle className="h-4 w-4 mr-2" />
                                How Family Relationships Are Identified
                            </h3>
                            <p className="text-sm text-indigo-700 mb-3">
                                This tool identifies potential family relationships and intergenerational property transfers using the following methods:
                            </p>
                            <ul className="text-sm text-indigo-700 space-y-2 list-disc pl-5">
                                <li>Matching surnames (last part of names) between parties</li>
                                <li>Analyzing gift deeds which often indicate family transfers</li>
                                <li>Identifying shared addresses that suggest family connections</li>
                                <li>Tracking property transfers between people with the same family name</li>
                            </ul>
                            <div className="flex items-center mt-3 text-xs text-indigo-600 border-t border-indigo-100 pt-3">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                This analysis is based on automated pattern detection and may not capture all family relationships or transfers.
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// Helper component for InfoCircle icon (not imported from lucide-react)
const InfoCircle = ({ className, size }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    );
};

export default FamilyPropertyTransferTracker;