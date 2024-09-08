import { useContext } from 'react';
import { AuthContext } from '@/app/context/authContext'; 
import useSWR from 'swr';

const Url = 'http://127.0.0.1:8000/api/v1/leaseAgreement/';

export default function useResource() {
  const { tokens } = useContext(AuthContext); // Access authentication tokens

  // Use SWR to fetch data, re-fetching when tokens change
  const { data, error, mutate } = useSWR(tokens ? Url : null, fetchResource);

  // Fetch resource with the correct configuration
  async function fetchResource(url) {
    if (!tokens) {
      console.error('No tokens available');
      return null;
    }

    try {
      console.log('Fetching resource with token:', tokens.access); // Log token for debugging

      const res = await fetch(url, config());

      if (!res.ok) {
        if (res.status === 401) {
          console.error('Unauthorized: Invalid or expired token');
        }
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }

      return res.json();
    } catch (err) {
      console.error('Fetch resource error:', err);
      return null; // Return null if an error occurs
    }
  }

  // Helper function to create the fetch configuration
  function config() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access}`,  // Use the access token
      },
    };
  }

  return {
    resource: data, // Lease agreements data
    loading: !data && !error, // Show loading if data isn't available and there's no error
    error, // Handle errors in fetching
  };
}
