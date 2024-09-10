import React from 'react';
import { XMarkIcon, UserIcon, MapPinIcon, CalendarIcon, PhoneIcon } from '@heroicons/react/24/outline';

const MoreInfo = ({
  userData,
  editableData,
  handleInputChange,
  handleSubmit,
  setEditingField,
  toggleMoreInfo,
  editingField
}) => {
  return (
    <div className="animate__animated animate__bounceInUp fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
      <div className="relative bg-bg-light p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
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
            <button onClick={() => setEditingField('email')} className="ml-4 text-primary">Edit</button>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-6 w-6 text-gray-500 mr-3" />
            <p className="text-lg text-gray-800 font-medium">
              <span className="font-semibold">Address:</span> {editableData.address || 'N/A'}
            </p>
            <button onClick={() => setEditingField('address')} className="ml-4 text-primary">Edit</button>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-6 w-6 text-gray-500 mr-3" />
            <p className="text-lg text-gray-800 font-medium">
              <span className="font-semibold">Date of Birth:</span> {editableData.date_of_birth || 'N/A'}
            </p>
            <button onClick={() => setEditingField('date_of_birth')} className="ml-4 text-primary">Edit</button>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <PhoneIcon className="h-6 w-6 text-gray-500 mr-3" />
              <p className="text-lg text-gray-800 font-medium">
                <span className="font-semibold">Emergency Contact Name:</span> {editableData.emergency_contact_name || 'N/A'}
              </p>
              <button onClick={() => setEditingField('emergency_contact_name')} className="ml-4 text-primary">Edit</button>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-6 w-6 text-gray-500 mr-3" />
              <p className="text-lg text-gray-800 font-medium">
                <span className="font-semibold">Emergency Contact Phone:</span> {editableData.emergency_contact_phone || 'N/A'}
              </p>
              <button onClick={() => setEditingField('emergency_contact_phone')} className="ml-4 text-primary">Edit</button>
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
                  className="px-6 py-3 bg-primary text-bg-light rounded-lg shadow-lg hover:bg-primary-dark"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
