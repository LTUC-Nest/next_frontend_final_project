'use client';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/app/context/authContext';

const Feature3 = () => {
  const [leases, setLeases] = useState([]);
  const [error, setError] = useState(null);
  const { tokens, refreshAccessToken } = useContext(AuthContext);

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

  if (error) {
    return <div className="text-red-500">Failed to load expiring lease data: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Lease Expiration Notifications</h1>
      {leases.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leases.map((lease, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{lease.property}</h2>
                {lease.status === 'expired' ? (
                  <p className="text-red-500">
                    Lease expired on {lease.lease_end_date}. Please take necessary actions.
                  </p>
                ) : (
                  <p className="text-green-500">
                    Lease expires in {lease.days_remaining} days on {lease.lease_end_date}.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No leases are expiring today.</p>
      )}
    </div>
  );
};

export default Feature3;