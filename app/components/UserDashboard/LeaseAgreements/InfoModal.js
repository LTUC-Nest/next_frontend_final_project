import React from 'react';
import { FaTimes, FaDollarSign, FaRegHandshake, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

const InfoModal = ({ isOpen, onClose, agreement }) => {
  if (!isOpen) return null;

  // Format dates for better display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70" 
      role="dialog" 
      aria-labelledby="modal-title" 
      aria-modal="true"
    >
      <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          aria-label="Close modal"
        >
          <FaTimes className="text-2xl" />
        </button>
        <h2 id="modal-title" className="text-2xl font-semibold mb-4">Lease Details</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex items-center">
            <FaFileAlt className="text-xl mr-2 text-indigo-600" />
            <span className="text-xl font-semibold">Lease ID:</span>
            <span className="ml-2 text-2xl font-bold bg-white text-indigo-600 px-3 py-1 rounded-lg">
              {agreement.id}
            </span>
          </div>
          <div className="flex items-center">
            <FaDollarSign className="text-lg text-gray-600 dark:text-gray-300 mr-2" />
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Rent:</span> <span className="font-semibold">${agreement.rent_amount}</span> / {agreement.payment_frequency.toLowerCase()}
            </p>
          </div>
          <div className="flex items-center">
            <FaRegHandshake className="text-lg text-gray-600 dark:text-gray-300 mr-2" />
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Security Deposit:</span> <span className="font-semibold">${agreement.security_deposit || 'N/A'}</span>
            </p>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-lg text-gray-600 dark:text-gray-300 mr-2" />
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Lease Period:</span>
              <div className="ml-2">
                <span className="text-gray-900 dark:text-gray-100 font-semibold">{formatDate(agreement.lease_start_date)}</span>
                <span className="mx-2 text-gray-500 dark:text-gray-400">to</span>
                <span className="text-gray-900 dark:text-gray-100 font-semibold">{formatDate(agreement.lease_end_date || 'Ongoing')}</span>
              </div>
            </p>
          </div>
          <div className="flex items-center">
            <FaFileAlt className="text-lg text-gray-600 dark:text-gray-300 mr-2" />
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Lease Terms:</span> <span className="font-semibold">{agreement.lease_terms || 'N/A'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
