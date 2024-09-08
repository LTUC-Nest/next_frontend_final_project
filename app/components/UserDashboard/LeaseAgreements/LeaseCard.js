import React from 'react';
import { isBefore } from 'date-fns';

const LeaseCard = ({ agreement }) => {
  const today = new Date();
  const leaseEndDate = new Date(agreement.lease_end_date);
  const isExpired = isBefore(leaseEndDate, today);

  return (
    <div
      className={`p-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105
        ${isExpired ? 'bg-red-50 border-2 border-red-500' : 'bg-bg-light dark:bg-bg-dark border-2 border-primary-dark'}`}
    >
      <h2 className="text-xl font-semibold mb-4 text-primary-dark dark:text-text-light">
        Lease ID: {agreement.id}
      </h2>
      <p className="text-text-dark dark:text-text-light mb-2">
        Rent: <span className="font-semibold">${agreement.rent_amount}</span> / {agreement.payment_frequency.toLowerCase()}
      </p>
      <p className="text-text-dark dark:text-text-light mb-2">
        Security Deposit: <span className="font-semibold">${agreement.security_deposit || 'N/A'}</span>
      </p>
      <p className="text-text-dark dark:text-text-light mb-2">
        Lease Period: <span className="font-semibold">{agreement.lease_start_date}</span> to <span className="font-semibold">{agreement.lease_end_date || 'Ongoing'}</span>
      </p>
      <p className="text-text-dark dark:text-text-light mb-2">
        Lease Terms: <span className="font-semibold">{agreement.lease_terms || 'N/A'}</span>
      </p>
      {isExpired ? (
        <p className="text-red-600 font-bold">This lease is expired</p>
      ) : (
        <p className="text-green-600 font-bold">This lease is active</p>
      )}
    </div>
  );
};

export default LeaseCard;
