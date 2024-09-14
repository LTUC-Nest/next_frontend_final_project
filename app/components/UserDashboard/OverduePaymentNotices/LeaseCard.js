import React from 'react';

const LeaseCard = ({ lease }) => {
  return (
    <div
      className={`animate__animated animate__bounceInUp bg-white dark:bg-bg-dark shadow-lg rounded-lg overflow-hidden p-6 border-2 ${
        lease.status === 'Overdue' ? 'border-red-500' : 'border-primary-dark'
      } hover:shadow-xl transition-shadow duration-300 relative`}
    >
      <h2 className="text-xl font-semibold text-primary-dark dark:text-text-light mb-4">
        {lease.property}
      </h2>
      <p className="text-text-dark dark:text-text-light mb-2">
        <strong>Tenant:</strong> {lease.tenant}
      </p>
      <p className="text-text-dark dark:text-text-light mb-2">
        <strong>Amount Due:</strong> ${lease.amount_due}
      </p>
      <p className="text-text-dark dark:text-text-light mb-2">
        <strong>Last Paid Date:</strong>{' '}
        {new Date(lease.last_paid_date).toLocaleDateString()}
      </p>
      <p
        className={`mt-4 ${
          lease.status === 'Overdue' ? 'text-red-600' : 'text-green-600'
        } font-bold`}
      >
        Status: {lease.status}
      </p>
      <button className="mt-6 w-full bg-gradient-to-r from-primary to-primary-dark text-white py-2 px-4 rounded-full font-semibold shadow-md hover:from-primary-dark hover:to-primary transition-all duration-300 ease-in-out transform hover:scale-105">
        Pay Now
      </button>
      {lease.status === 'Overdue' && (
        <span className="absolute top-4 right-4 text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
          Urgent
        </span>
      )}
    </div>
  );
};

export default LeaseCard;
