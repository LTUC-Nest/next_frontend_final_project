import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/context/authContext';
import { jwtDecode } from 'jwt-decode';
import LeaseCard from './LeaseCard';
import InfoModal from './InfoModal';

const LeaseAgreements = () => {
  const { tokens } = useContext(AuthContext);
  const [agreements, setAgreements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState(null);

  // Decode the token and extract the user_id
  const decodedTokens = jwtDecode(tokens.access);
  const tokenUserId = decodedTokens.user_id;

  useEffect(() => {
    const fetchLeases = async () => {
      if (!tokens || !tokens.access) return;

      try {
        const response = await fetch('https://djang-backend-final-project.onrender.com/api/v1/leaseAgreement/', {
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

  const openModal = (agreement) => {
    setSelectedAgreement(agreement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAgreement(null);
  };

  if (loading) return <div className="text-center text-primary">Loading...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error.message}</div>;

  const leaseAgreementsArray = Array.isArray(agreements) ? agreements : [];

  return (
    <div className="animate__animated animate__bounceInUp relative">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6 text-primary dark:text-text-light">Your Lease Agreements</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaseAgreementsArray.length > 0 ? (
            leaseAgreementsArray.map((agreement) => (
              <LeaseCard key={agreement.id} agreement={agreement} onOpenModal={openModal} />
            ))
          ) : (
            <p className="text-text-dark dark:text-text-light">No lease agreements found.</p>
          )}
        </div>
      </div>

      {/* Render the InfoModal component */}
      {selectedAgreement && (
        <InfoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          agreement={selectedAgreement}
        />
      )}
    </div>
  );
};

export default LeaseAgreements;
