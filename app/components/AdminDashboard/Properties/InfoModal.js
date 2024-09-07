// InfoModal.jsx
import React from 'react';

const InfoModal = ({ property, onClose }) => {
    if (!property) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-bg-light dark:bg-bg-dark p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4 text-text-dark dark:text-text-light">Property Details</h2>
                <div className="mb-4">
                    <p><strong>Name:</strong> {property.name}</p>
                    <p><strong>City:</strong> {property.city}</p>
                    <p><strong>Available From:</strong> {property.available_from}</p>
                    <p><strong>Type:</strong> {property.property_type}</p>
                    <p><strong>Address:</strong> {property.address}</p>
                    <p><strong>State:</strong> {property.state}</p>
                    <p><strong>Country:</strong> {property.country}</p>
                    <p><strong>Description:</strong> {property.description}</p>
                </div>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-primary text-bg-light rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark transition duration-150 ease-in-out"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default InfoModal;
