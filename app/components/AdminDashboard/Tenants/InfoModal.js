import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const InfoModal = ({ isOpen, onRequestClose, tenant, onEdit, onDelete }) => {
    if (!isOpen || !tenant) return null;

    const handleEdit = () => {
        onRequestClose(); // Close the modal
        onEdit(tenant.id); // Trigger the edit action
    };

    const handleDelete = () => {
        onRequestClose(); // Close the modal
        if (window.confirm('Are you sure you want to delete this tenant?')) {
            onDelete(tenant.id); // Trigger the delete action
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tenant Details</h3>
                    <button
                        onClick={onRequestClose}
                        className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        aria-label="Close"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Username:</strong> {tenant.username}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>First Name:</strong> {tenant.first_name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Last Name:</strong> {tenant.last_name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Email:</strong> {tenant.email}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Phone Number:</strong> {tenant.phone_number}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Address:</strong> {tenant.address}</p>
                </div>
                <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700 space-x-2">
                    <button
                        onClick={handleEdit}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out"
                    >
                        <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
                    >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
                    </button>
                    <button
                        onClick={onRequestClose}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-150 ease-in-out"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
