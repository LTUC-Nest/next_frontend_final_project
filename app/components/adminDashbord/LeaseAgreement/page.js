import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';
import EditLeaseAgreementForm from '../EditLeaseAgreementForm /page';
import LeaseAgreementPage from '../AddLeaseAgreementForm /page';
import { useLeaseAgreement } from '@/app/customeHook/useleaseAgreement';
import Modal from '../Modal';
import LeaseAgreementsList from '../LeaseAgreementsList/page';
import axios from 'axios';

const LeaseAgreementContent = () => {
    const [editLeaseAgreementId, setEditLeaseAgreementId] = useState(null);
    const [showEditLeaseAgreementForm, setShowEditLeaseAgreementForm] = useState(false);
    const [showAddLeaseAgreementForm, setShowAddLeaseAgreementForm] = useState(false);
    const [viewMode, setViewMode] = useState('list'); // Default view mode
    const [error, setError] = useState(null);

    const { leaseAgreements, fetchLeaseAgreements, deleteLeaseAgreement } = useLeaseAgreement();

    useEffect(() => {
        fetchLeaseAgreements();
    }, [fetchLeaseAgreements]);

    const handleEditLeaseAgreement = (id) => {
        if (id) {
            setEditLeaseAgreementId(id);
            setShowEditLeaseAgreementForm(true);
        } else {
            console.error('No lease agreement ID found');
        }
    };

    const handleCloseEditForm = () => {
        setShowEditLeaseAgreementForm(false);
        setEditLeaseAgreementId(null);
    };

    const handleAddLeaseAgreement = () => {
        setShowAddLeaseAgreementForm(true);
    };

    const handleCloseAddForm = () => {
        setShowAddLeaseAgreementForm(false);
    };

    const handleToggleViewMode = (mode) => {
        setViewMode(mode);
    };

    const handleDeleteLeaseAgreement = async (id) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this lease agreement?');
            if (!confirmDelete) return;

            await axios.delete(`http://localhost:8000/api/v1/leaseAgreement/${id}`);
            fetchLeaseAgreements(); // Refresh the list after deletion
            alert('Lease Agreement deleted successfully!');
        } catch (error) {
            console.error('Error deleting lease agreement:', error.response ? error.response.data : error.message);
            alert('Failed to delete lease agreement. ' + (error.response ? error.response.data.detail : error.message));
            setError(error.message);
        }
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

            <LeaseAgreementsList
                leaseAgreements={leaseAgreements}
                viewMode={viewMode}
                handleEditLeaseAgreement={handleEditLeaseAgreement}
                handleDeleteLeaseAgreement={handleDeleteLeaseAgreement}
            />

            <Modal isOpen={showEditLeaseAgreementForm} onClose={handleCloseEditForm}>
                {editLeaseAgreementId && (
                    <EditLeaseAgreementForm id={editLeaseAgreementId} onClose={handleCloseEditForm} />
                )}
            </Modal>

            <Modal isOpen={showAddLeaseAgreementForm} onClose={handleCloseAddForm}>
                <LeaseAgreementPage onClose={handleCloseAddForm} />
            </Modal>

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default LeaseAgreementContent;
