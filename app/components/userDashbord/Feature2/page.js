'use client';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/app/context/authContext';

const OverduePaymentNotices = () => {
  const [overdueLeases, setOverdueLeases] = useState([]);
  const [error, setError] = useState(null);

  // Get the tokens from AuthContext
  const { tokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchOverdueLeases = async () => {
      if (!tokens || !tokens.access) {
        setError('No token found');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/leases/overdue-payments/', {
          headers: {
            'Authorization': `Bearer ${tokens.access}` // Use the access token from context
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        setOverdueLeases(data.overdue_payments || []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOverdueLeases();
  }, [tokens]); // Dependency on tokens

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Overdue Payment Notices</h1>
      {overdueLeases.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {overdueLeases.map((lease, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
              <h2 className="text-xl font-semibold">{lease.property}</h2>
              <p>Tenant: {lease.tenant}</p>
              <p>Amount Due: ${lease.amount_due}</p>
              <p>Last Paid Date: {new Date(lease.last_paid_date).toLocaleDateString()}</p>
              <p>Status: {lease.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No overdue payments at the moment.</p>
      )}
    </div>
  );
};

export default OverduePaymentNotices;
