'use client';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const TenantResources = () => {
    const { tokens } = useContext(AuthContext);
    const [tenant, setTenant] = useState([]);
    const [tenantData, setTenantData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchTenant = async () => {
        try {
            const response = await axios.get('https://djang-backend-final-project.onrender.com/api/v1/users/');
            setTenant(response.data);
        } catch (error) {
            console.error('Error fetching tenant:', error);
            setErrorMessage(error.response ? error.response.data : error.message);
        }
    };

    const fetchTenantById = async (tenantId) => {
        try {
            const response = await axios.get(`https://djang-backend-final-project.onrender.com/api/v1/users/${tenantId}`);
            setTenantData(response.data);
        } catch (error) {
            console.error('Error fetching tenant data:', error);
            setErrorMessage(error.response ? error.response.data : error.message);
        }
    };

    const editTenant = async (tenantId, formData) => {
        try {
            console.log('Sending data for edit:', formData);
    
            await axios.put(`https://djang-backend-final-project.onrender.com/api/v1/users/${tenantId}`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            fetchTenant(); // Refresh the tenant list
        } catch (error) {
            console.error('Error updating tenant:', error);
            setErrorMessage(error.response ? error.response.data : error.message);
        }
    };

    const deleteTenant = async (tenantId) => {
        try {
            await axios.delete(`https://djang-backend-final-project.onrender.com/api/v1/users/${tenantId}`);
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
                
            ];
            for (const field of requiredFields) {
                if (!tenantData.get(field)) { // Use tenantData.get for FormData
                    throw new Error(`Missing required field: ${field}`);
                }
            }
    
            const response = await axios.post('https://djang-backend-final-project.onrender.com/api/v1/users/create/', tenantData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            console.log('Response:', response.data);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Error adding tenant:', error);
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

export default TenantResources;