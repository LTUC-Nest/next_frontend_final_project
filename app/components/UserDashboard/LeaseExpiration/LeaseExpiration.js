import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/app/context/authContext';
import LeaseCard from './LeaseCard';
import InfoModal from './InfoModal';

const LeaseExpiration = () => {
  const [leases, setLeases] = useState([]);
  const [error, setError] = useState(null);
  const { tokens, refreshAccessToken } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLease, setSelectedLease] = useState(null);

  useEffect(() => {
    const fetchExpiringLeases = async () => {
      let accessToken = tokens?.access;

      if (!accessToken) {
        setError('No token found');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/leases/expiring-leases/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });

        if (response.status === 401) {
          // Token might be expired, attempt to refresh it
          accessToken = await refreshAccessToken();
          if (accessToken) {
            // Retry fetching with the new token
            const retryResponse = await fetch('http://127.0.0.1:8000/api/v1/leases/expiring-leases/', {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              }
            });
            if (!retryResponse.ok) {
              throw new Error(`Failed to fetch: ${retryResponse.status} ${await retryResponse.text()}`);
            }
            const retryData = await retryResponse.json();
            setLeases(retryData.leases);
          } else {
            setError('Token refresh failed. Please log in again.');
          }
        } else if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${await response.text()}`);
        } else {
          const data = await response.json();
          setLeases(data.leases);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchExpiringLeases();
  }, [tokens, refreshAccessToken]);

  const openModal = (lease) => {
    setSelectedLease(lease);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLease(null);
  };

  if (error) {
    return <div className="text-red-600">Failed to load expiring lease data: {error}</div>;
  }

  return (
    <div className="animate__animated animate__bounceInUp">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary dark:text-text-light mb-20">
        Lease Expiration Notifications
      </h1>
      {leases.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leases.map((lease, index) => (
            <LeaseCard key={index} lease={lease} onOpenModal={openModal} />
          ))}
        </div>
      ) : (
        <p className="text-text-dark dark:text-text-light text-center">
          No leases are expiring today.
        </p>
      )}

      {/* Render the InfoModal component */}
      {selectedLease && (
        <InfoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          lease={selectedLease}
        />
      )}
    </div>
  );
};

export default LeaseExpiration;
