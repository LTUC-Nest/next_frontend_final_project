'use client';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const useTenantResource = () => {
    const { tokens } = useContext(AuthContext);
    const [tenant, setTenant] = useState([]);
    const [tenantData, setTenantData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchTenant = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users/');
            setTenant(response.data);
        } catch (error) {
            console.error('Error fetching tenant:', error);
            setErrorMessage(error.response ? error.response.data : error.message);
        }
    };

    const fetchTenantById = async (tenantId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/users/${tenantId}`);
            setTenantData(response.data);
        } catch (error) {
            console.error('Error fetching tenant data:', error);
            setErrorMessage(error.response ? error.response.data : error.message);
        }
    };

    const editTenant = async (tenantId, formData) => {
        try {
            await axios.put(`http://localhost:8000/api/v1/users/${tenantId}`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            fetchTenant(); // Refresh the property list
        } catch (error) {
            console.error('Error updating tenant:', error);
            setErrorMessage(error.response ? error.response.data : error.message);
        }
    };

    const deleteTenant = async (tenantId) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/users/${tenantId}`);
            // setSuccessMessage('Property deleted successfully!');
            setErrorMessage('');
            fetchTenant(); // Refresh the property list after deletion
        } catch (error) {
            console.error('Error deleting tenant:', error);
            setErrorMessage(error.response ? error.response.data : error.message);
        }
    };

    const addTenant = async (tenantData) => {
        try {
            console.log('Sending request with data:', tenantData); // Debug: Log request data

            // Required fields
            const requiredFields = [
                'username',
                'password',
                'first_name',
                'last_name',
                'email',
                'phone_number',
                'address',
                'date_of_birth',
                'emergency_contact_name',
                'emergency_contact_phone',
                'updated_at',
                'profile_picture'];
            for (const field of requiredFields) {
                if (!tenantData[field]) {
                    throw new Error(`Missing required field: ${field}`);
                }
            }

            // Valid property types
            // const validPropertyTypes = ['APARTMENT', 'HOUSE', 'COMMERCIAL', 'CONDO', 'TOWNHOUSE', 'OTHER'];
            // if (!validPropertyTypes.includes(propertyData.property_type)) {
            //     throw new Error(`Invalid property type: ${propertyData.property_type}`);
            // }

            // Set default owner ID if not provided
            // if (!propertyData.owner) {
            //     propertyData.owner = 1; // Assuming owner ID 1 exists in the database
            // }

            // Make POST request
            const response = await axios.post('http://localhost:8000/api/v1/users/create/', tenantData, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('Response:', response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Error adding property:', error);
            console.error('Response data:', error.response ? error.response.data : 'No response data');
            return { success: false, message: error.response ? error.response.data : error.message };
        }
    };

    return {
        tenant,
        tenantData,
        errorMessage,
        fetchTenant,
        fetchTenantById,
        editTenant,
        deleteTenant,
        addTenant,
    };
};

export default useTenantResource;