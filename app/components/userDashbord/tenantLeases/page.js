import { useContext } from 'react';
import { AuthContext } from '@/app/context/authContext'; 
import useResourcesLeases from '@/app/customeHook/useResourceLease';
 
export default function LeaseAgreements() {
  const { tokens } = useContext(AuthContext);  // Access the authentication tokens

  // Fetch lease agreement data using the custom hook
  const { resource: agreements, loading, error } = useResourcesLeases();

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter lease agreements related to the logged-in user (if userId is available in tokens)
  const filteredAgreements = agreements?.filter(agreement => agreement.tenant === tokens?.user_id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Your Lease Agreements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgreements?.map((agreement) => (
          <div key={agreement.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">
              {agreement.property}
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
            {/* <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
              View Details
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
}
