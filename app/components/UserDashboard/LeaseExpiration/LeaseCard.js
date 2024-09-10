import React from 'react';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';
import InfoButton from '../../InfoButton';

const LeaseCard = ({ lease, onOpenModal }) => {
  return (
    <div
      className={`animate__animated animate__bounceInUp shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 p-6
      ${lease.status === 'expired' ? 'bg-red-100 border-2 border-red-500' : 'bg-bg-light dark:bg-bg-dark border-2 border-primary-dark'}`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-3 text-primary-dark border-b-2 border-primary-dark dark:border-text-light pb-2">
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
      <div>
        <InfoButton onClick={() => onOpenModal(lease)} />
      </div>
    </div>
  );
};

export default LeaseCard;
