import React, { useContext, useState } from 'react';
import useTenantResource from '@/app/customeHook/useResourceTenant';
import { AuthContext } from '@/app/context/authContext';
import {jwtDecode} from 'jwt-decode';


const AddTenantForm = ({ onClose }) => {
    const { tokens } = useContext(AuthContext);
    const { addTenant, successMessage, errorMessage } = useTenantResource();

    const decodedToken = jwtDecode(tokens.access);
    const adminId = decodedToken.user_id; // Adjust based on your token structure
    console.log(adminId);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        date_of_birth: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        profile_picture: null // Use null for file
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            if (formData[key] !== undefined) {
                formDataToSend.append(key, formData[key]);
            }
        }
        formDataToSend.append('admin_id', adminId);

        const result = await addTenant(formDataToSend);

        if (result.success) {
            setFormData({
                username: '',
                password: '',
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                address: '',
                date_of_birth: '',
                emergency_contact_name: '',
                emergency_contact_phone: '',
                profile_picture: null
            });
            if (onClose) onClose(); // Close form or perform other actions
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Add New Tenant</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    X
                </button>
            </div>
            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            id="phone_number"
                            name="phone_number"
                            type="text"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="emergency_contact_name" className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                        <input
                            id="emergency_contact_name"
                            name="emergency_contact_name"
                            type="text"
                            value={formData.emergency_contact_name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="emergency_contact_phone" className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
                        <input
                            id="emergency_contact_phone"
                            name="emergency_contact_phone"
                            type="text"
                            value={formData.emergency_contact_phone}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                        <input
                            id="profile_picture"
                            name="profile_picture"
                            type="file"
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Add Tenant
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTenantForm;
