'use client';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/app/context/authContext';
import LeaseCard from './LeaseCard';

const OverduePaymentNotices = () => {
  const [overdueLeases, setOverdueLeases] = useState([]);
  const [error, setError] = useState(null);

  const { tokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchOverdueLeases = async () => {
      if (!tokens || !tokens.access) {
        setError('No token found');
        return;
      }

      try {
        const response = await fetch('https://djang-backend-final-project.onrender.com/api/v1/leases/overdue-payments/', {
          headers: {
            'Authorization': `Bearer ${tokens.access}`,
          },
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
  }, [tokens]);

  if (error)
    return <p className="text-red-600 text-center font-semibold">{`Error: ${error}`}</p>;

  return (
    <div className="animate__animated animate__bounceInUp relative">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-text-light">
        Overdue Payment Notices
      </h1>
      {overdueLeases.length > 0 ? (
        <>
          <p className="text-lg text-text-dark dark:text-text-light font-medium mb-8  mx-auto">
            To maintain a good standing, please review and settle any overdue payments promptly.
            Avoid additional fees by making your payments on time.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
            {overdueLeases.map((lease, index) => (
              <LeaseCard key={index} lease={lease} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-text-dark dark:text-text-light text-xl mt-10">
          No overdue payments at the moment.
        </p>
      )}
    </div>
  );
};

export default OverduePaymentNotices;
