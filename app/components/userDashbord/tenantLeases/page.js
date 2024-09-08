import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/context/authContext';
import { format, isBefore } from 'date-fns'; // For date comparison
import { jwtDecode} from 'jwt-decode'; 

export default function LeaseAgreements() {
  const { tokens } = useContext(AuthContext);  
  const [agreements, setAgreements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Decode the token and extract the user_id
  const decodedTokens = jwtDecode(tokens.access);
  const tokenUserId = decodedTokens.user_id;
  console.log("tokenId", tokenUserId);

  useEffect(() => {
    const fetchLeases = async () => {
      if (!tokens || !tokens.access) return;

      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/leaseAgreement/', {
          headers: {
            'Authorization': `Bearer ${tokens.access}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Filter agreements based on user_id
        const filteredAgreements = data.filter(agreement => agreement.tenant === tokenUserId);
        setAgreements(filteredAgreements);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeases();
  }, [tokens, tokenUserId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Ensure `agreements` is an array before calling map
  const leaseAgreementsArray = Array.isArray(agreements) ? agreements : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Your Lease Agreements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaseAgreementsArray.length > 0 ? (
          leaseAgreementsArray.map((agreement) => {
            // Check if lease is expired
            const today = new Date();
            const leaseEndDate = new Date(agreement.lease_end_date);
            const isExpired = isBefore(leaseEndDate, today);

            return (
              <div
                key={agreement.id}
                className={`bg-white shadow-md rounded-lg p-6 ${
                  isExpired ? 'border-2 border-red-500' : ''
                }`}
              >
                <p className="text-gray-600 mb-2">
                  Rent: ${agreement.rent_amount} / {agreement.payment_frequency.toLowerCase()}
                </p>
                <p className="text-gray-600 mb-2">
                  Security Deposit: ${agreement.security_deposit || 'N/A'}
                </p>
                <p className="text-gray-600 mb-2">
                  Lease Period: {agreement.lease_start_date} to {agreement.lease_end_date || 'Ongoing'}
                </p>
                <p className="text-gray-600 mb-2">
                  Lease Terms: {agreement.lease_terms || 'N/A'}
                </p>
                {isExpired ? (
                  <p className="text-red-600 font-bold">This lease is expired</p>
                ) : (
                  <p className="text-green-600 font-bold">This lease is active</p>
                )}
              </div>
            );
          })
        ) : (
          <p>No lease agreements found.</p>
        )}
      </div>
    </div>
  );
}
