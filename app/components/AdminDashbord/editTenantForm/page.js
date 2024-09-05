import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTenantForm = ({ tenantId, onClose, fetchTenant }) => {
    const [tenantData, setTenantData] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        phone_number: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        updated_at: '',
    });

    // Fetch tenant data for editing
    useEffect(() => {
        const fetchTenantData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/users/${tenantId}`);
                setTenantData(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching tenant data:', error);
            }
        };

        if (tenantId) {
            fetchTenantData();
        }
    }, [tenantId]);

    // Handle form field changes
    const handleChange = (event) => {
        const { username, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [username]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/v1/users/${tenantId}`, formData);
            fetchTenant();
            onClose(); // Close the form after successful update
        } catch (error) {
            console.error('Error updating tenant:', error);
        }
    };

    if (!tenantData) {
        return <div>Loading...
        </div>;
        
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
                Username
                <input
                    type="text"
                    name="username"
                    value={formData.username || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <label className="block text-sm font-medium text-gray-700">
                Password
                <input
                    type="password"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <label className="block text-sm font-medium text-gray-700">
                Phone Number
                <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <label className="block text-sm font-medium text-gray-700">
                Address
                <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <label className="block text-sm font-medium text-gray-700">
                Emergency Contact Name
                <input
                    type="text"
                    name="emergency_contact_name"
                    value={formData.emergency_contact_name || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <label className="block text-sm font-medium text-gray-700">
                Emergency Contact Phone
                <input
                    type="text"
                    name="emergency_contact_phone"
                    value={formData.emergency_contact_phone || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <label className="block text-sm font-medium text-gray-700">
                Updated At
                <input
                    type="date"
                    name="updated_at"
                    value={formData.updated_at || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <div className="flex justify-end space-x-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-150 ease-in-out"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditTenantForm;
