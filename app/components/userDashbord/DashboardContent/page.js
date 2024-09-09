import React, { useState, useEffect } from 'react';
import { useUserData } from '@/app/customeHook/useUserData';
import { XMarkIcon, UserIcon, MapPinIcon, CalendarIcon, PhoneIcon } from '@heroicons/react/24/outline';

const DashboardContent = () => {
  const { userData, loading, error, username, updateUserData, staffData } = useUserData(); // Assume `staffData` is provided by the hook
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
    console.log('staffData:', staffData);
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

  const toggleMoreInfo = () => setShowMoreInfo(!showMoreInfo);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 space-y-8">
        {/* User Photo and Welcoming Message */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-4 font-serif">
              Hello, {username || 'User'}!
            </h1>
            <p className="text-lg text-gray-700 font-light">
              Welcome back to your dashboard. Explore your info, communicate with your supervisor, and manage your leases seamlessly.
            </p>
          </div>
        </div>

        {/* Supervisor Info */}
        {/* <div className="bg-blue-50 p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-3 font-mono">Owner Info</h2>
          <p className="text-lg text-gray-700 font-medium">
            <span className="font-semibold">Name:</span> {staffData?.username || 'N/A'}
          </p>
          <p className="text-lg text-gray-700 font-medium">
            <span className="font-semibold">Phone:</span> {staffData?.phone_number || 'N/A'}
          </p>
          <div className="text-center">
            <button
              className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
              onClick={() => window.location.href = '/messages'}
            >
              Go to Messages
            </button>
          </div>
        </div> */}

        {/* User Info and Update Button */}
        <div className="bg-blue-50 p-8 rounded-2xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4 font-mono">Your Info</h2>
          <p className="text-lg text-gray-800 font-medium">
            <span className="font-semibold">Name:</span> {userData?.first_name} {userData?.last_name}
          </p>
          <p className="text-lg text-gray-800 font-medium">
            <span className="font-semibold">Email:</span> {userData?.email}
          </p>
          <p className="text-lg text-gray-800 font-medium">
            <span className="font-semibold">Phone:</span> {userData?.phone_number}
          </p>
          <div className="text-center mt-6">
            <button
              onClick={toggleMoreInfo}
              className="px-6 py-3 bg-blue-600 text-white text-lg rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              {showMoreInfo ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>

        {/* Hidden Information Popup */}
        {showMoreInfo && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
              <button
                onClick={toggleMoreInfo}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-110"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserIcon className="h-6 w-6 text-gray-500 mr-3" />
                  <p className="text-lg text-gray-800 font-medium">
                    <span className="font-semibold">Username:</span> {userData?.username || 'N/A'}
                  </p>
                </div>
                <div className="flex items-center">
                  <UserIcon className="h-6 w-6 text-gray-500 mr-3" />
                  <p className="text-lg text-gray-800 font-medium">
                    <span className="font-semibold">Email:</span> {userData?.email || 'N/A'}
                  </p>
                  <button onClick={() => setEditingField('email')} className="ml-4 text-blue-500">Edit</button>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-6 w-6 text-gray-500 mr-3" />
                  <p className="text-lg text-gray-800 font-medium">
                    <span className="font-semibold">Address:</span> {editableData.address || 'N/A'}
                  </p>
                  <button onClick={() => setEditingField('address')} className="ml-4 text-blue-500">Edit</button>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-6 w-6 text-gray-500 mr-3" />
                  <p className="text-lg text-gray-800 font-medium">
                    <span className="font-semibold">Date of Birth:</span> {editableData.date_of_birth || 'N/A'}
                  </p>
                  <button onClick={() => setEditingField('date_of_birth')} className="ml-4 text-blue-500">Edit</button>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <PhoneIcon className="h-6 w-6 text-gray-500 mr-3" />
                    <p className="text-lg text-gray-800 font-medium">
                      <span className="font-semibold">Emergency Contact Name:</span> {editableData.emergency_contact_name || 'N/A'}
                    </p>
                    <button onClick={() => setEditingField('emergency_contact_name')} className="ml-4 text-blue-500">Edit</button>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="h-6 w-6 text-gray-500 mr-3" />
                    <p className="text-lg text-gray-800 font-medium">
                      <span className="font-semibold">Emergency Contact Phone:</span> {editableData.emergency_contact_phone || 'N/A'}
                    </p>
                    <button onClick={() => setEditingField('emergency_contact_phone')} className="ml-4 text-blue-500">Edit</button>
                  </div>
                </div>
                {editingField && (
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="flex flex-col">
                      <label htmlFor={editingField} className="font-semibold text-gray-700">{editingField.replace('_', ' ').toUpperCase()}</label>
                      <input
                        id={editingField}
                        name={editingField}
                        value={editableData[editingField] || ''}
                        onChange={handleInputChange}
                        className="mt-2 px-4 py-2 border rounded-md"
                        type={editingField.includes('date') ? 'date' : 'text'}
                      />
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
