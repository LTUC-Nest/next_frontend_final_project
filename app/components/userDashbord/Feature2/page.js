'use client';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/app/context/authContext';

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
        const response = await fetch('http://127.0.0.1:8000/api/v1/leases/overdue-payments/', {
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
    <div className="p-10 bg-gradient-to-r from-blue-50 to-white min-h-screen">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-gray-800">
        Overdue Payment Notices
      </h1>
      {overdueLeases.length > 0 ? (
        <>
          <p className="text-center text-lg text-gray-700 font-medium mb-8 max-w-2xl mx-auto">
            To maintain a good standing, please review and settle any overdue payments promptly.
            Avoid additional fees by making your payments on time.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
            {overdueLeases.map((lease, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl overflow-hidden p-8 border-t-4 border-blue-500 hover:shadow-2xl transition-shadow duration-300 relative w-full max-w-3xl mx-auto"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{lease.property}</h2>
                <p className="text-gray-600 mb-2">
                  <strong>Tenant:</strong> {lease.tenant}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Amount Due:</strong> ${lease.amount_due}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Last Paid Date:</strong>{' '}
                  {new Date(lease.last_paid_date).toLocaleDateString()}
                </p>
                <p
                  className={`mt-4 ${
                    lease.status === 'Overdue' ? 'text-red-600' : 'text-green-500'
                  } font-bold`}
                >
                  Status: {lease.status}
                </p>
                <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-full font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                  Pay Now
                </button>
                <span className="absolute top-4 right-4 text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  Urgent
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-700 text-xl mt-10">No overdue payments at the moment.</p>
      )}
    </div>
  );
};

export default OverduePaymentNotices;
