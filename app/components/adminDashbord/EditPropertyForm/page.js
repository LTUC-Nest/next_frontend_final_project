import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPropertyForm = ({ propertyId, onClose, fetchProperties }) => {
    const [propertyData, setPropertyData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        available_from: '',
        address: '',
        state: '',
        country: '',
        property_type: '',
        description: ''
    });

    // Fetch property data for editing
    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/properties/${propertyId}`);
                setPropertyData(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching property data:', error);
            }
        };

        if (propertyId) {
            fetchPropertyData();
        }
    }, [propertyId]);

    // Handle form field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/v1/properties/${propertyId}`, formData);
            fetchProperties();
            onClose(); // Close the form after successful update
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    if (!propertyData) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <label>
                City:
                <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <label>
                Available From:
                <input
                    type="date"
                    name="available_from"
                    value={formData.available_from || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <label>
                Address:
                <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <label>
                State:
                <input
                    type="text"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <label>
                Country:
                <input
                    type="text"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
            <div>
                <label htmlFor="property_type" className="block text-sm font-medium text-gray-700">Property Type</label>
                <select
                    id="property_type"
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="APARTMENT">Apartment</option>
                    <option value="HOUSE">House</option>
                    <option value="COMMERCIAL">Commercial</option>
                    <option value="CONDO">Condo</option>
                    <option value="TOWNHOUSE">Townhouse</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>
            <label>
                Description:
                <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-lg"
                />
            </label>
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
        </form>
    );
};

export default EditPropertyForm;