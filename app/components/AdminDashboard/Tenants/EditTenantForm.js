import React, { useState, useEffect, useCallback } from 'react';
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch tenant data for editing
    useEffect(() => {
        const fetchTenantData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/users/${tenantId}`);
                setTenantData(response.data);
                setFormData(response.data);
            } catch (error) {
                setError('Error fetching tenant data.');
            } finally {
                setLoading(false);
            }
        };

        if (tenantId) {
            fetchTenantData();
        }
    }, [tenantId]);

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
            await axios.put(`http://localhost:8000/api/v1/users/${tenantId}`, formData);
            fetchTenant();
            onClose(); // Close the form after successful update
        } catch (error) {
            setError('Error updating tenant.');
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
                    <h2 className="text-lg font-semibold text-text-dark dark:text-text-light">Edit Tenant</h2>
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
                    {['username', 'phone_number', 'address', 'emergency_contact_name', 'emergency_contact_phone'].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-text-dark dark:text-text-light capitalize">
                                {field.replace('_', ' ')}
                            </label>
                            <input
                                id={field}
                                name={field}
                                type={field === 'password' ? 'password' : 'text'}
                                value={formData[field] || ''}
                                onChange={handleChange}
                                className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                            />
                        </div>
                    ))}
                    <div>
                        <label htmlFor="updated_at" className="block text-sm font-medium text-text-dark dark:text-text-light">Updated At</label>
                        <input
                            id="updated_at"
                            name="updated_at"
                            type="date"
                            value={formData.updated_at || ''}
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

export default EditTenantForm;
