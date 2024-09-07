import React from 'react';

function DeleteModal({ lease, onClose, onConfirm }) {
  return (
    <div className="fixed z-20 inset-0 overflow-y-auto flex items-center justify-center bg-bg-dark bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70">
      <div className="bg-bg-light p-6 rounded-lg shadow-lg w-96 max-w-lg mx-4 dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-text-dark dark:text-gray-200">Confirm Deletion</h3>
        <p className="mb-4 text-text-dark dark:text-gray-300">
          Are you sure you want to delete the lease for <strong>{lease.tenant_name}</strong> at <strong>{lease.property_name}</strong>?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-primary text-bg-light rounded hover:bg-primary-dark transition-all duration-300 dark:bg-primary-dark dark:text-bg-light dark:hover:bg-primary"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(lease.id);
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-bg-light rounded hover:bg-red-600 transition-all duration-300 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
