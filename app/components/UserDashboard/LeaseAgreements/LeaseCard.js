import React from 'react';
import { isBefore } from 'date-fns';
import { FaDollarSign, FaRegHandshake, FaCalendarAlt, FaFileAlt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const LeaseCard = ({ agreement }) => {
  const today = new Date();
  const leaseEndDate = new Date(agreement.lease_end_date);
  const isLeaseExpired = isBefore(leaseEndDate, today);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div
      className={`animate__animated animate__bounceInUp p-6 rounded-lg border shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105
        ${isLeaseExpired ? 'bg-red-20 border-red-700 text-red-700 dark:bg-gray-900 dark:border-red-600 dark:text-red-300' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'}`}
    >
      <div className="mb-4">
        <div className="bg-bg-dark text-white p-3 rounded-lg flex items-center">
          <FaFileAlt className="text-xl mr-2" />
          <span className="text-xl font-semibold">Lease ID:</span>
          <span className="ml-2 text-2xl font-bold bg-white text-indigo-600 px-3 py-1 rounded-lg">
            1011{agreement.id}
          </span>
        </div>
      </div>
      <div className={`mt-4 p-2 rounded-lg text-white font-bold text-lg ${isLeaseExpired ? 'bg-red-600 dark:bg-red-700' : 'bg-green-600 dark:bg-green-700'}`}>
        {isLeaseExpired ? (
          <div className="flex items-center justify-center">
            <FaExclamationTriangle className="text-2xl" />
            <span className="ml-2">Expired</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <FaCheckCircle className="text-2xl" />
            <span className="ml-2">Active</span>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="space-y-4">
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

export default LeaseCard;
