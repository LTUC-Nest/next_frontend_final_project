import React, { useState } from 'react';
import Modal from '../Modal';

const LeaseAgreementsList = ({ leaseAgreements, viewMode, handleEditLeaseAgreement, handleDeleteLeaseAgreement }) => {
    const [selectedAgreement, setSelectedAgreement] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (agreement) => {
        setSelectedAgreement(agreement);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAgreement(null);
    };

    return (
        <>
            {/* Modal for displaying lease agreement details */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedAgreement && (
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lease Agreement Details</h2>
                        <p><strong>Tenant:</strong> {selectedAgreement.tenantUsername}</p>
                        <p><strong>Property:</strong> {selectedAgreement.propertyName}</p>
                        <p><strong>Start Date:</strong> {selectedAgreement.lease_start_date}</p>
                        <p><strong>End Date:</strong> {selectedAgreement.lease_end_date}</p>
                        <p><strong>Additional Details:</strong> {selectedAgreement.lease_terms || 'N/A'}</p>
                    </div>
                )}
            </Modal>

            {/* Conditional rendering based on view mode */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {leaseAgreements.length > 0 ? (
                        leaseAgreements.map((agreement) => (
                            <div key={agreement.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{agreement.tenantUsername}</h3>
                                <p className="text-gray-600 mb-2">{agreement.propertyName}</p>
                                <p className="text-gray-500 mb-4">{agreement.lease_start_date} - {agreement.lease_end_date}</p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditLeaseAgreement(agreement.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteLeaseAgreement(agreement.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg transition"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => openModal(agreement)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg transition"
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No lease agreements available.</p>
                    )}
                </div>
            ) : (
                <div className="overflow-x-auto p-4">
                    <table className="min-w-full table-auto border-collapse border border-gray-300 text-center">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border-b text-gray-600">Tenant</th>
                                <th className="py-2 px-4 border-b text-gray-600">Property</th>
                                <th className="py-2 px-4 border-b text-gray-600">Lease Dates</th>
                                <th className="py-2 px-4 border-b text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaseAgreements.length > 0 ? (
                                leaseAgreements.map((agreement) => (
                                    <tr key={agreement.id} className="hover:bg-gray-50 transition">
                                        <td className="py-2 px-4 border-b text-gray-800">{agreement.tenantUsername}</td>
                                        <td className="py-2 px-4 border-b text-gray-800">{agreement.propertyName}</td>
                                        <td className="py-2 px-4 border-b text-gray-600">{agreement.lease_start_date} - {agreement.lease_end_date}</td>
                                        <td className="py-2 px-4 border-b">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleEditLeaseAgreement(agreement.id)}
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteLeaseAgreement(agreement.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg transition"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => openModal(agreement)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg transition"
                                                >
                                                    Read More
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-4 text-gray-500">No lease agreements available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default LeaseAgreementsList;
