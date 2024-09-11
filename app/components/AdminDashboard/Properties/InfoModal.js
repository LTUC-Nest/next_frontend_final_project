import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const InfoModal = ({ property, onClose, onEdit, onDelete }) => {
    if (!property) return null;

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            onDelete(property.id);
            onClose(); // Close modal after delete
        }
    };

    const handleEdit = () => {
        onEdit(property.id); // Trigger edit
        onClose(); // Close modal after editing
    };

    return (
        <div className="animate__animated animate__bounceInUp fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Property Details</h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        aria-label="Close"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Name:</strong> {property.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Property Type:</strong> {property.property_type}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Country:</strong> {property.country}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Address:</strong> {property.address}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>City:</strong> {property.city}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>State:</strong> {property.state}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Postal Code:</strong> {property.postal_code}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Available From:</strong> {property.available_from}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Description:</strong> {property.description}</p>

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
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-150 ease-in-out"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
