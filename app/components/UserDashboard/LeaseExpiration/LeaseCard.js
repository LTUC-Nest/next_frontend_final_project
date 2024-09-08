import React from 'react';

const LeaseCard = ({ lease }) => {
  return (
    <div
      className={`shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 p-6
      ${lease.status === 'expired' ? 'bg-red-100 border-2 border-red-500' : 'bg-bg-light dark:bg-bg-dark border-2 border-primary-dark'}`}
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-primary-dark dark:text-text-light">
          {lease.property}
        </h2>
        {lease.status === 'expired' ? (
          <p className="text-red-600 font-bold">
            Lease expired on {lease.lease_end_date}. Please take necessary actions.
          </p>
        ) : (
          <p className="text-green-600 font-bold">
            Lease expires in {lease.days_remaining} days on {lease.lease_end_date}.
          </p>
        )}
      </div>
    </div>
  );
};

export default LeaseCard;
