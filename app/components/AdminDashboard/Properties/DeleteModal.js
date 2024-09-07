// DeleteModal.jsx
import React from 'react';

const DeleteModal = ({ property, onClose, onConfirm }) => {
    if (!property) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-bg-light dark:bg-bg-dark p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4 text-text-dark dark:text-text-light">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you want to delete the property "{property.name}"?</p>
                <div className="flex space-x-4">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-bg-light rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-bg-light rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
