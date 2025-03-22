import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    ChevronLeft,
    Download,
    Printer,
    Edit,
    Trash2,
    MapPin,
    Calendar,
    FileText,
    DollarSign,
    User,
    Users,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';
import { base_url } from '../utils/base_url';

function DeedDetails() {
    const { id } = useParams();
    console.log("id" , id)
    const navigate = useNavigate();
    const [deed, setDeed] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        fetchDeed();
    }, [id]);

    const fetchDeed = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${base_url}/deeds/${id}`);
            setDeed(response.data.data);
            setError(null);
        } catch (err) {
            setError('Failed to load deed details. Please try again.');
            console.error('Error fetching deed:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/deeds/${id}`);
            navigate('/deeds', { state: { message: 'Deed deleted successfully' } });
        } catch (err) {
            setError('Failed to delete deed. Please try again.');
            console.error('Error deleting deed:', err);
        }
        setDeleteModalOpen(false);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';

        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return dateString; // Return original string if parsing fails
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Loading deed details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="p-2 rounded-full bg-red-100">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-medium text-red-900">Error</h3>
                </div>
                <p className="text-gray-600 mb-4">{error}</p>
                <div className="flex justify-end">
                    <Link
                        to="/deeds"
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 mr-2"
                    >
                        Back to Deeds
                    </Link>
                    <button
                        onClick={fetchDeed}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!deed) {
        return (
            <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="p-2 rounded-full bg-yellow-100">
                        <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-medium text-yellow-900">Deed Not Found</h3>
                </div>
                <p className="text-gray-600 mb-4">The requested deed could not be found. It may have been deleted or the ID is incorrect.</p>
                <div className="flex justify-end">
                    <Link
                        to="/deeds"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Back to Deeds
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Page header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="flex items-center mb-4 lg:mb-0">
                    <Link
                        to="/deeds"
                        className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        <span>Back to Deeds</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {deed.deedType} - {deed.documentNumber}
                    </h1>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => window.print()}
                        className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                    >
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                    </button>

                    <button
                        className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </button>

                    <button
                        className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </button>

                    <button
                        onClick={() => setDeleteModalOpen(true)}
                        className="flex items-center px-3 py-2 bg-red-50 border border-red-300 text-red-700 rounded-md hover:bg-red-100 transition-colors text-sm"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </button>
                </div>
            </div>

            {/* Deed details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Document info */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-indigo-50">
                            <div className="flex items-center">
                                <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                                <h2 className="text-lg font-medium text-gray-900">Document Information</h2>
                            </div>
                        </div>

                        <div className="p-6">
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Document Type</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{deed.deedType}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Document Number</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{deed.documentNumber}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Year</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{deed.year}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Volume Number</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{deed.volumeNumber || 'N/A'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Execution Date</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formatDate(deed.executionDateParsed || deed.executionDate)}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Registration Date</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formatDate(deed.registrationDateParsed || deed.registrationDate)}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Property details */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-green-50">
                            <div className="flex items-center">
                                <MapPin className="h-5 w-5 text-green-600 mr-2" />
                                <h2 className="text-lg font-medium text-gray-900">Property Details</h2>
                            </div>
                        </div>

                        <div className="p-6">
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">District</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{deed.district || 'N/A'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Sub-Registrar</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{deed.subRegistrar || 'N/A'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Ward/Area</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{deed.ward || 'N/A'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Locality</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{deed.locality || 'N/A'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Land Type</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{deed.landType || 'N/A'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Area</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {deed.area ? `${deed.area} ${deed.unitType || ''}` : 'N/A'}
                                    </dd>
                                </div>
                                <div className="md:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Property Description</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{deed.propertyDescription || 'N/A'}</dd>
                                </div>
                                {deed.khasraNumber && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Khasra/Plot Number</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{deed.khasraNumber}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>

                    {/* Financial details */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-yellow-50">
                            <div className="flex items-center">
                                <DollarSign className="h-5 w-5 text-yellow-600 mr-2" />
                                <h2 className="text-lg font-medium text-gray-900">Financial Details</h2>
                            </div>
                        </div>

                        <div className="p-6">
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Market Value</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(deed.marketValue)}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Transaction Value</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(deed.transactionValue)}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Stamp Duty</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(deed.stampDuty)}</dd>
                                </div>
                                {deed.ownershipShare > 0 && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Ownership Share</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{deed.ownershipShare}</dd>
                                    </div>
                                )}
                                {deed.soldShare > 0 && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Sold Share</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{deed.soldShare}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* First party */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
                            <div className="flex items-center">
                                <User className="h-5 w-5 text-blue-600 mr-2" />
                                <h2 className="text-lg font-medium text-gray-900">First Party</h2>
                            </div>
                        </div>

                        <div className="p-6">
                            {deed.firstParty && deed.firstParty.length > 0 ? (
                                <div className="space-y-4">
                                    {deed.firstParty.map((party, index) => (
                                        <div key={index} className={index > 0 ? "pt-4 border-t border-gray-200" : ""}>
                                            <h4 className="text-sm font-medium text-gray-900">{party.name}</h4>
                                            {party.parentName && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <span className="font-medium">Parent/Spouse:</span> {party.parentName}
                                                </p>
                                            )}
                                            {party.address && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <span className="font-medium">Address:</span> {party.address}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No first party information available</p>
                            )}
                        </div>
                    </div>

                    {/* Second party */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-purple-50">
                            <div className="flex items-center">
                                <User className="h-5 w-5 text-purple-600 mr-2" />
                                <h2 className="text-lg font-medium text-gray-900">Second Party</h2>
                            </div>
                        </div>

                        <div className="p-6">
                            {deed.secondParty && deed.secondParty.length > 0 ? (
                                <div className="space-y-4">
                                    {deed.secondParty.map((party, index) => (
                                        <div key={index} className={index > 0 ? "pt-4 border-t border-gray-200" : ""}>
                                            <h4 className="text-sm font-medium text-gray-900">{party.name}</h4>
                                            {party.parentName && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <span className="font-medium">Parent/Spouse:</span> {party.parentName}
                                                </p>
                                            )}
                                            {party.address && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <span className="font-medium">Address:</span> {party.address}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No second party information available</p>
                            )}
                        </div>
                    </div>

                    {/* Witnesses */}
                    {deed.witnesses && deed.witnesses.length > 0 && (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-center">
                                    <Users className="h-5 w-5 text-gray-600 mr-2" />
                                    <h2 className="text-lg font-medium text-gray-900">Witnesses</h2>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    {deed.witnesses.map((witness, index) => (
                                        <div key={index} className={index > 0 ? "pt-4 border-t border-gray-200" : ""}>
                                            <h4 className="text-sm font-medium text-gray-900">{witness.name}</h4>
                                            {witness.parentName && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <span className="font-medium">Parent/Spouse:</span> {witness.parentName}
                                                </p>
                                            )}
                                            {witness.address && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <span className="font-medium">Address:</span> {witness.address}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete confirmation modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <AlertTriangle className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Deed</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this deed? This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setDeleteModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeedDetails;