import React, { useState, useEffect, useCallback } from 'react';
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch property data for editing
    useEffect(() => {
        const fetchPropertyData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/properties/${propertyId}`);
                setPropertyData(response.data);
                setFormData(response.data);
            } catch (error) {
                setError('Error fetching property data.');
            } finally {
                setLoading(false);
            }
        };

        if (propertyId) {
            fetchPropertyData();
        }
    }, [propertyId]);

    // Handle form field changes
    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/v1/properties/${propertyId}`, formData);
            fetchProperties();
            onClose(); // Close the form after successful update
        } catch (error) {
            setError('Error updating property.');
        }
    };

    if (loading) {
        return <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 z-50">Loading...</div>;
    }

    if (error) {
        return <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 z-50">{error}</div>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-bg-light dark:bg-bg-dark p-6 rounded shadow-md relative w-full max-w-3xl border border-primary-dark dark:border-primary">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-text-dark dark:text-text-light">Edit Property</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-text-light dark:hover:text-text-dark">
                        X
                    </button>
                </div>
                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md dark:bg-red-800 dark:text-red-200 dark:border-red-700">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['name', 'city', 'address', 'state', 'country'].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-text-dark dark:text-text-light capitalize">
                                {field}
                            </label>
                            <input
                                id={field}
                                name={field}
                                type="text"
                                value={formData[field] || ''}
                                onChange={handleChange}
                                required
                                className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                            />
                        </div>
                    ))}
                    <div>
                        <label htmlFor="available_from" className="block text-sm font-medium text-text-dark dark:text-text-light">Available From</label>
                        <input
                            id="available_from"
                            name="available_from"
                            type="date"
                            value={formData.available_from || ''}
                            onChange={handleChange}
                            required
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
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
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-text-dark dark:text-text-light">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                        />
                    </div>
                    <div className="col-span-2 flex justify-end mt-4 space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-1 px-3 rounded text-sm hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-1 px-3 rounded text-sm hover:bg-green-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPropertyForm;
