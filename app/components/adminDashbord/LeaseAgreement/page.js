import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';
import EditLeaseAgreementForm from '../EditLeaseAgreementForm /page';
import LeaseAgreementPage from '../AddLeaseAgreementForm /page';
import { useLeaseAgreement } from '@/app/customeHook/useleaseAgreement';
import Modal from '../Modal';

const LeaseAgreementContent = () => {
    const [expandedLeaseAgreementId, setExpandedLeaseAgreementId] = useState(null);
    const [editLeaseAgreementId, setEditLeaseAgreementId] = useState(null);
    const [showEditLeaseAgreementForm, setShowEditLeaseAgreementForm] = useState(false);
    const [showAddLeaseAgreementForm, setShowAddLeaseAgreementForm] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // Default view mode

    const { leaseAgreements, fetchLeaseAgreements, error } = useLeaseAgreement();

    // Fetch lease agreements when component mounts
    useEffect(() => {
        fetchLeaseAgreements();
    }, [fetchLeaseAgreements]);

    // Toggle the visibility of additional lease agreement information
    const handleToggleMoreInfo = (id) => {
        setExpandedLeaseAgreementId(expandedLeaseAgreementId === id ? null : id);
    };

    const handleEditLeaseAgreement = (id) => {
        console.log(`Edit button clicked for lease agreement ID: ${id}`);
        setEditLeaseAgreementId(id);
        setShowEditLeaseAgreementForm(true);
    };
    

    const handleCloseEditForm = () => {
        setShowEditLeaseAgreementForm(false);
        setEditLeaseAgreementId(null);
    };

    // Handle add lease agreement form visibility
    const handleAddLeaseAgreement = () => {
        setShowAddLeaseAgreementForm(true);
    };

    const handleCloseAddForm = () => {
        setShowAddLeaseAgreementForm(false);
    };

    // Toggle view mode between grid and table
    const handleToggleViewMode = (mode) => {
        setViewMode(mode);
    };

    return (
        <div className="p-8 bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Lease Agreement Management</h2>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => handleToggleViewMode('grid')}
                        className={`p-3 rounded-full border-2 ${viewMode === 'grid' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                    >
                        <FontAwesomeIcon
                            icon={faTh}
                            className={`text-xl ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-600'}`}
                        />
                    </button>
                    <button
                        onClick={() => handleToggleViewMode('list')}
                        className={`p-3 rounded-full border-2 ${viewMode === 'list' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                    >
                        <FontAwesomeIcon
                            icon={faList}
                            className={`text-xl ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-600'}`}
                        />
                    </button>
                    <button
                        onClick={handleAddLeaseAgreement}
                        className="bg-gradient-to-r from-teal-400 to-teal-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-300 hover:bg-teal-500"
                    >
                        Add Lease Agreement
                    </button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leaseAgreements.map((agreement) => (
                        <div key={agreement.id} className="bg-white p-5 rounded-lg shadow-lg transition transform hover:scale-105">
                            <h3 className="text-xl font-semibold text-gray-700">{agreement.tenant}</h3>
                            <p className="text-gray-600">{agreement.property}</p>
                            <p className="text-gray-500">{agreement.lease_start_date} - {agreement.lease_end_date}</p>
                            <button
                                onClick={() => handleToggleMoreInfo(agreement.id)}
                                className="mt-3 text-teal-500 hover:text-teal-700"
                            >
                                {expandedLeaseAgreementId === agreement.id ? 'Less Info' : 'More Info'}
                            </button>
                            {expandedLeaseAgreementId === agreement.id && (
                                <div className="mt-4 border-t border-gray-200 pt-3">
                                    <p className="text-gray-700">Rent Amount: ${agreement.rent_amount}</p>
                                    <p className="text-gray-700">Security Deposit: ${agreement.security_deposit}</p>
                                    <button
                                        onClick={() => handleEditLeaseAgreement(agreement.id)}
                                        className="mt-2 bg-yellow-500 text-white py-1 px-4 rounded-lg shadow transition duration-300 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">Tenant</th>
                            <th className="py-2 px-4 border-b">Property</th>
                            <th className="py-2 px-4 border-b">Lease Dates</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaseAgreements.map((agreement) => (
                            <tr key={agreement.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{agreement.tenant}</td>
                                <td className="py-2 px-4 border-b">{agreement.property}</td>
                                <td className="py-2 px-4 border-b">{agreement.lease_start_date} - {agreement.lease_end_date}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleToggleMoreInfo(agreement.id)}
                                        className="text-teal-500 hover:text-teal-700"
                                    >
                                        {expandedLeaseAgreementId === agreement.id ? 'Less Info' : 'More Info'}
                                    </button>
                                    {expandedLeaseAgreementId === agreement.id && (
                                        <div className="mt-2">
                                            <p className="text-gray-700">Rent Amount: ${agreement.rent_amount}</p>
                                            <p className="text-gray-700">Security Deposit: ${agreement.security_deposit}</p>
                                            <button
                                                onClick={() => handleEditLeaseAgreement(agreement.id)}
                                                className="bg-yellow-500 text-white py-1 px-4 rounded-lg shadow transition duration-300 hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
{/* *------------------------------------------* */}
            {showEditLeaseAgreementForm && editLeaseAgreementId && (
                <Modal isOpen={showEditLeaseAgreementForm} onClose={handleCloseEditForm}>
                    <EditLeaseAgreementForm
                        leaseAgreementId={editLeaseAgreementId}
                        onClose={handleCloseEditForm}
                    />
                </Modal>
            )}
{/* *------------------------------------------* */}

            {showAddLeaseAgreementForm && (
                <Modal isOpen={showAddLeaseAgreementForm} onClose={handleCloseAddForm}>
                    <LeaseAgreementPage onClose={handleCloseAddForm} />
                </Modal>
            )}

        </div>
    );
};

export default LeaseAgreementContent;