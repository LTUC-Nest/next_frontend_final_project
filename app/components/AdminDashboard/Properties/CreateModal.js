import React, { useContext, useState } from 'react';
import usePropertyResource from '@/app/customeHook/userResourceProperty';
import { AuthContext } from '@/app/context/authContext';
import { jwtDecode } from 'jwt-decode';

const CreateModal = ({ onClose }) => {
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-bg-light dark:bg-bg-dark p-6 rounded shadow-md relative w-full max-w-3xl border border-primary-dark dark:border-primary">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-text-dark dark:text-text-light">Add New Property</h2>
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
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
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

                    {/* City */}
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            City
                        </label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* State */}
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            State
                        </label>
                        <input
                            id="state"
                            name="state"
                            type="text"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* Postal Code */}
                    <div>
                        <label htmlFor="postal_code" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Postal Code
                        </label>
                        <input
                            id="postal_code"
                            name="postal_code"
                            type="text"
                            value={formData.postal_code}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Country
                        </label>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>

                    {/* Property Type */}
                    <div>
                        <label htmlFor="property_type" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Property Type
                        </label>
                        <select
                            id="property_type"
                            name="property_type"
                            value={formData.property_type}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        >
                            <option value="APARTMENT">Apartment</option>
                            <option value="HOUSE">House</option>
                            <option value="COMMERCIAL">Commercial</option>
                            <option value="CONDO">Condo</option>
                            <option value="TOWNHOUSE">Townhouse</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    {/* Available From */}
                    <div>
                        <label htmlFor="available_from" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                            Available From
                        </label>
                        <input
                            id="available_from"
                            name="available_from"
                            type="date"
                            value={formData.available_from}
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
                            className="bg-green-500 text-white py-1 px-3 rounded text-sm hover:bg-green-600"
                        >
                            Add Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateModal;
