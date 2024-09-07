import React from 'react';

function ConfirmationModal({ lease, onClose, onConfirm }) {
  return (
    <div className="fixed z-20 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
          <p className="mb-4">Are you sure you want to delete the lease for {lease.tenant_name} at {lease.property_name}?</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(lease.id);
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
