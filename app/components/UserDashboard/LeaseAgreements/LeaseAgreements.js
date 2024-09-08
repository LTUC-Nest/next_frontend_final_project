'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/context/authContext';
import { jwtDecode } from 'jwt-decode';
import LeaseCard from './LeaseCard';

const LeaseAgreements = () => {
  const { tokens } = useContext(AuthContext);
  const [agreements, setAgreements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Decode the token and extract the user_id
  const decodedTokens = jwtDecode(tokens.access);
  const tokenUserId = decodedTokens.user_id;

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

  if (loading) return <div className="text-center text-primary">Loading...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error.message}</div>;

  const leaseAgreementsArray = Array.isArray(agreements) ? agreements : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-text-light">Your Lease Agreements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaseAgreementsArray.length > 0 ? (
          leaseAgreementsArray.map((agreement) => (
            <LeaseCard key={agreement.id} agreement={agreement} />
          ))
        ) : (
          <p className="text-text-dark dark:text-text-light">No lease agreements found.</p>
        )}
      </div>
    </div>
  );
};

export default LeaseAgreements;
