import React from 'react';
import { FaTimes } from 'react-icons/fa';
import 'animate.css';

const InfoModal = ({ isOpen, onClose, lease }) => {
  if (!isOpen) return null;

  return (
    <div className="animate__animated animate__bounceInUp fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90">
      <div className="relative bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes className="text-xl text-gray-600" />
        </button>
        <h2 className="text-3xl font-semibold mb-6 text-center">Lease Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800 dark:text-gray-200">Property:</span>
            <p className="text-gray-600 dark:text-gray-400">{lease.property}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800 dark:text-gray-200">Lease End Date:</span>
            <p className="text-gray-600 dark:text-gray-400">{lease.lease_end_date}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800 dark:text-gray-200">Days Remaining:</span>
            <p className="text-gray-600 dark:text-gray-400">{lease.days_remaining}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800 dark:text-gray-200">Status:</span>
            <p className={`font-bold ${lease.status === 'expired' ? 'text-red-600' : 'text-green-600'}`}>
              {lease.status === 'expired' ? 'Expired' : 'Active'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
