import React, { useContext, useState } from 'react';
import usePropertyResource from '@/app/customeHook/userResourceProperty';
import { AuthContext } from '@/app/context/authContext';
import { jwtDecode } from "jwt-decode";

const AddPropertyForm = ({ onClose }) => {
    const { addProperty, successMessage, errorMessage } = usePropertyResource();
    const { tokens } = useContext(AuthContext);

    const decodedToken = jwtDecode(tokens.access);
    const adminId = decodedToken.user_id;

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        property_type: 'APARTMENT',
        available_from: '',
        owner: adminId
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addProperty(formData);

        if (result.success) {
            setFormData({
                name: '',
                address: '',
                city: '',
                state: '',
                postal_code: '',
                country: '',
                property_type: 'APARTMENT',
                available_from: '',
                owner: adminId,
            });
            if (onClose) onClose(); // Close form or perform other actions
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-bg-light dark:bg-bg-dark rounded-lg shadow-lg max-w-lg w-full max-h-screen overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-text-dark dark:text-text-light">Add New Property</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-text-light dark:hover:text-text-dark">
                        X
                    </button>
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text-dark dark:text-text-light">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-bg-dark dark:border-gray-600 dark:text-text-light"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-text-dark dark:text-text-light">Address</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-bg-dark dark:border-gray-600 dark:text-text-light"
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-text-dark dark:text-text-light">City</label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-bg-dark dark:border-gray-600 dark:text-text-light"
                        />
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-text-dark dark:text-text-light">State</label>
                        <input
                            id="state"
                            name="state"
                            type="text"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-bg-dark dark:border-gray-600 dark:text-text-light"
                        />
                    </div>
                    <div>
                        <label htmlFor="postal_code" className="block text-sm font-medium text-text-dark dark:text-text-light">Postal Code</label>
                        <input
                            id="postal_code"
                            name="postal_code"
                            type="text"
                            value={formData.postal_code}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-bg-dark dark:border-gray-600 dark:text-text-light"
                        />
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-text-dark dark:text-text-light">Country</label>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-bg-dark dark:border-gray-600 dark:text-text-light"
                        />
                    </div>
                    <div>
                        <label htmlFor="property_type" className="block text-sm font-medium text-text-dark dark:text-text-light">Property Type</label>
                        <select
                            id="property_type"
                            name="property_type"
                            value={formData.property_type}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-bg-dark dark:border-gray-600 dark:text-text-light"
                        >
                            <option value="APARTMENT">Apartment</option>
                            <option value="HOUSE">House</option>
                            <option value="COMMERCIAL">Commercial</option>
                            <option value="CONDO">Condo</option>
                            <option value="TOWNHOUSE">Townhouse</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="available_from" className="block text-sm font-medium text-text-dark dark:text-text-light">Available From</label>
                        <input
                            id="available_from"
                            name="available_from"
                            type="date"
                            value={formData.available_from}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-bg-dark dark:border-gray-600 dark:text-text-light"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Add Property
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
        </div>
    );
};

export default AddPropertyForm;
