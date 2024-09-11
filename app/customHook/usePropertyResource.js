import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const usePropertyResource = () => {
    const { tokens } = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [propertyData, setPropertyData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProperties = async () => {
        try {
            const response = await axios.get('https://djang-backend-final-project.onrender.com/api/v1/properties/');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setErrorMessage(error.response ? error.response.data : error.message);
        }
    };

    const fetchPropertyById = async (propertyId) => {
        try {
            const response = await axios.get(`https://djang-backend-final-project.onrender.com/api/v1/properties/${propertyId}`);
            setPropertyData(response.data);
        } catch (error) {
            console.error('Error fetching property data:', error);
            setErrorMessage(error.response ? error.response.data : error.message);
        }
    };

    const editProperty = async (propertyId, formData) => {
        try {
            await axios.put(`https://djang-backend-final-project.onrender.com/api/v1/properties/${propertyId}`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            fetchProperties(); // Refresh the property list
        } catch (error) {
            console.error('Error updating property:', error);
            setErrorMessage(error.response ? error.response.data : error.message);
        }
    };

    const deleteProperty = async (propertyId) => {
        try {
            await axios.delete(`https://djang-backend-final-project.onrender.com/api/v1/properties/${propertyId}`);
            // setSuccessMessage('Property deleted successfully!');
            setErrorMessage('');
            fetchProperties(); // Refresh the property list after deletion
        } catch (error) {
            console.error('Error deleting property:', error);
            setErrorMessage(error.response ? error.response.data : error.message);
        }
    };

    const addProperty = async (propertyData) => {
        try {
            console.log('Sending request with data:', propertyData); // Debug: Log request data

            // Required fields
            const requiredFields = ['name', 'address', 'city', 'state', 'postal_code', 'country', 'property_type', 'available_from'];
            for (const field of requiredFields) {
                if (!propertyData[field]) {
                    throw new Error(`Missing required field: ${field}`);
                }
            }

            // Valid property types
            const validPropertyTypes = ['APARTMENT', 'HOUSE', 'COMMERCIAL', 'CONDO', 'TOWNHOUSE', 'OTHER'];
            if (!validPropertyTypes.includes(propertyData.property_type)) {
                throw new Error(`Invalid property type: ${propertyData.property_type}`);
            }

            // Set default owner ID if not provided
            if (!propertyData.owner) {
                propertyData.owner = 1; // Assuming owner ID 1 exists in the database
            }

            // Make POST request
            const response = await axios.post('https://djang-backend-final-project.onrender.com/api/v1/properties/create/', propertyData, {
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
        properties,
        propertyData,
        errorMessage,
        fetchProperties,
        fetchPropertyById,
        editProperty,
        deleteProperty,
        addProperty,
    };
};

export default usePropertyResource;