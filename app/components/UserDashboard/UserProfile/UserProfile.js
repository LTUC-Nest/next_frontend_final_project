import React, { useState, useEffect } from 'react';
import { useUserData } from '@/app/customHook/useUserData';
import MoreInfo from './MoreInfo';
import InfoButton from '../../InfoButton';

const UserProfile = () => {
  const { userData, loading, error, username, updateUserData } = useUserData();
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editableData, setEditableData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    date_of_birth: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
  });

  useEffect(() => {
    if (userData) {
      setEditableData({
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        email: userData.email || '',
        phone: userData.phone_number || '',
        address: userData.address || '',
        date_of_birth: userData.date_of_birth || '',
        emergency_contact_name: userData.emergency_contact_name || '',
        emergency_contact_phone: userData.emergency_contact_phone || '',
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserData(editableData);
      alert('User data updated successfully!');
      setEditingField(null);
      setShowMoreInfo(false);
    } catch (err) {
      console.error('Failed to update user data:', err);
      alert('Failed to update user data.');
    }
  };

  if (loading) {
    return <div className="text-center text-primary-dark">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-primary-dark">Error loading data: {error.message}</div>;
  }

  return (
    <div className="animate__animated animate__bounceInUp bg-bg-light dark:bg-bg-dark rounded-3xl shadow-xl p-10 space-y-8">
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-primary-dark mb-4 font-serif">
            Hello, {username || 'User'}!
          </h1>
          <p className="text-lg text-text-dark font-light">
            Welcome back to your dashboard. Explore your info, communicate with your supervisor, and manage your leases seamlessly.
          </p>
        </div>
      </div>

      <div className="bg-primary-dark p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-bg-light mb-4 font-mono">Your Info</h2>
        <p className="text-lg text-bg-light font-medium">
          <span className="font-semibold">Name:</span> {userData?.first_name} {userData?.last_name}
        </p>
        <p className="text-lg text-bg-light font-medium">
          <span className="font-semibold">Email:</span> {userData?.email}
        </p>
        <p className="text-lg text-bg-light font-medium">
          <span className="font-semibold">Phone:</span> {userData?.phone_number}
        </p>
        <div className="text-center mt-6">
          <InfoButton onClick={() => setShowMoreInfo(true)} />
        </div>
      </div>

      {showMoreInfo && (
        <MoreInfo
          userData={userData}
          editableData={editableData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setEditingField={setEditingField}
          toggleMoreInfo={() => setShowMoreInfo(false)}
          editingField={editingField}
        />
      )}
    </div>
  );
};

export default UserProfile;
