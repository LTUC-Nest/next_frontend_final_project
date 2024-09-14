import React, { useContext, useState } from 'react';
import TenantResources from '@/app/customHook/TenantResources';
import { AuthContext } from '@/app/context/authContext';
import { jwtDecode } from 'jwt-decode';

const CreateModal = ({ onClose }) => {
    const { tokens } = useContext(AuthContext);
    const { addTenant, successMessage, errorMessage } = TenantResources();

    const decodedToken = jwtDecode(tokens.access);
    const adminId = decodedToken.user_id;

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
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
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
            });
            if (onClose) onClose(); // Close form or perform other actions
        }
    };

    return (
        <div className="animate__animated animate__bounceInUp fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
            <div className="bg-bg-light dark:bg-bg-dark p-6 rounded shadow-md relative z-10 w-full max-w-3xl border border-primary-dark dark:border-primary">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold mb-4 text-text-dark dark:text-text-light">Add New Tenant</h2>
                </div>
                {successMessage && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md dark:bg-green-800 dark:text-green-200 dark:border-green-700">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md dark:bg-red-800 dark:text-red-200 dark:border-red-700">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* First Name */}
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            First Name
                        </label>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Last Name
                        </label>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Phone Number
                        </label>
                        <input
                            id="phone_number"
                            name="phone_number"
                            type="text"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Address
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="date_of_birth" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Date of Birth
                        </label>
                        <input
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* Emergency Contact Name */}
                    <div>
                        <label htmlFor="emergency_contact_name" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Emergency Contact Name
                        </label>
                        <input
                            id="emergency_contact_name"
                            name="emergency_contact_name"
                            type="text"
                            value={formData.emergency_contact_name}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* Emergency Contact Phone */}
                    <div>
                        <label htmlFor="emergency_contact_phone" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Emergency Contact Phone
                        </label>
                        <input
                            id="emergency_contact_phone"
                            name="emergency_contact_phone"
                            type="text"
                            value={formData.emergency_contact_phone}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="col-span-2 flex justify-end mt-4 space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary text-white py-1 px-3 rounded text-sm hover:bg-primary-dark"
                        >
                            Add Tenant
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateModal;
