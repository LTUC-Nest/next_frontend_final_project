import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const LeaseAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Decode JWT to get logged-in user's ID
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded = jwt_decode(token);
      setUserId(decoded.user_id);
    }

    // Fetch all lease agreements
    const fetchLeaseAgreements = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/leaseAgreement/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch lease agreements');
        }

        const data = await response.json();
        setAgreements(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLeaseAgreements();
  }, []);

  // Filter lease agreements related to the logged-in user
  const filteredAgreements = agreements.filter(agreement => agreement.tenant === userId);

  return (
    <div className="container mx-auto p-4">
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgreements.map((agreement) => (
            <div key={agreement.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2">
                {agreement.property.name}
              </h2>
              <p className="text-gray-600 mb-2">
                Rent: ${agreement.rent_amount} / {agreement.payment_frequency.toLowerCase()}
              </p>
              <p className="text-gray-600 mb-2">
                Security Deposit: ${agreement.security_deposit || 'N/A'}
              </p>
              <p className="text-gray-600">
                Lease Period: {agreement.lease_start_date} to {agreement.lease_end_date || 'Ongoing'}
              </p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaseAgreements;
