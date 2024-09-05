import { useState, useEffect } from 'react';
import axios from 'axios';

export const useLeaseAgreement = () => {
    // State variables for the form
    const [tenant, setTenant] = useState('');
    const [property, setProperty] = useState('');
    const [leaseStartDate, setLeaseStartDate] = useState('');
    const [leaseEndDate, setLeaseEndDate] = useState('');
    const [rentAmount, setRentAmount] = useState('');
    const [securityDeposit, setSecurityDeposit] = useState('');
    const [paymentFrequency, setPaymentFrequency] = useState('MONTHLY');
    const [leaseTerms, setLeaseTerms] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [error, setError] = useState(null);

    // State variables for managing lists and edit form
    const [nonStaffUsers, setNonStaffUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [leaseAgreements, setLeaseAgreements] = useState([]);
    const [editingLeaseAgreement, setEditingLeaseAgreement] = useState(null);

    // State variables for editing form
    const [editTenant, setEditTenant] = useState('');
    const [editProperty, setEditProperty] = useState('');
    const [editLeaseStartDate, setEditLeaseStartDate] = useState('');
    const [editLeaseEndDate, setEditLeaseEndDate] = useState('');
    const [editRentAmount, setEditRentAmount] = useState('');
    const [editSecurityDeposit, setEditSecurityDeposit] = useState('');
    const [editPaymentFrequency, setEditPaymentFrequency] = useState('MONTHLY');
    const [editLeaseTerms, setEditLeaseTerms] = useState('');
    const [editIsActive, setEditIsActive] = useState(true);

    // Fetch non-staff users and properties
    useEffect(() => {
        const fetchNonStaffUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/leaseAgreement/non-staff-users/');
                setNonStaffUsers(response.data);
            } catch (err) {
                setError('Failed to fetch non-staff users. ' + err.message);
            }
        };

        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/properties/');
                setProperties(response.data);
            } catch (err) {
                setError('Failed to fetch properties. ' + err.message);
            }
        };

        fetchNonStaffUsers();
        fetchProperties();
    }, []);

    // Fetch lease agreements and map tenant and property names
    const fetchLeaseAgreements = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/leaseAgreement/');
            const agreements = response.data.map(agreement => {
                const tenant = nonStaffUsers.find(user => user.id === agreement.tenant);
                const property = properties.find(prop => prop.id === agreement.property);

                return {
                    ...agreement,
                    tenantUsername: tenant ? tenant.username : 'Unknown Tenant',
                    propertyName: property ? property.name : 'Unknown Property',
                };
            });
            setLeaseAgreements(agreements);
        } catch (err) {
            setError('Failed to fetch lease agreements: ' + err.message);
        }
    };

    // Fetch lease agreement details for editing
    const fetchLeaseAgreementDetailsForEdit = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/leaseAgreement/${id}`);
            const agreement = response.data;

            setEditingLeaseAgreement(agreement);
            setEditTenant(nonStaffUsers.find(user => user.id === agreement.tenant)?.username || '');
            setEditProperty(agreement.property);
            setEditLeaseStartDate(agreement.lease_start_date);
            setEditLeaseEndDate(agreement.lease_end_date);
            setEditRentAmount(parseFloat(agreement.rent_amount) || '');
            setEditSecurityDeposit(parseFloat(agreement.security_deposit) || '');
            setEditPaymentFrequency(agreement.payment_frequency);
            setEditLeaseTerms(agreement.lease_terms);
            setEditIsActive(agreement.is_active);
        } catch (err) {
            setError('Failed to fetch lease agreement details: ' + err.message);
        }
    };

    // Common function for handling form submissions
    const handleFormSubmit = async (payload, endpoint, successMessage) => {
        try {
            if (!payload.tenant || !payload.property || !payload.lease_start_date || !payload.lease_end_date) {
                throw new Error('All fields are required.');
            }

            const tenantUser = nonStaffUsers.find(user => user.username === payload.tenant);
            if (!tenantUser) {
                throw new Error('Invalid tenant username.');
            }

            const tenantId = tenantUser.id;

            const rentAmountNumber = parseFloat(payload.rent_amount);
            const securityDepositNumber = parseFloat(payload.security_deposit);

            if (isNaN(rentAmountNumber) || isNaN(securityDepositNumber)) {
                throw new Error('Rent amount and security deposit must be valid numbers.');
            }

            payload.tenant = tenantId;
            payload.rent_amount = rentAmountNumber;
            payload.security_deposit = securityDepositNumber;

            console.log('Payload:', payload);

            const response = await axios.post(endpoint, payload);
            console.log('Response:', response.data);

            alert(successMessage);
            fetchLeaseAgreements(); // Refetch to update the list
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            alert('Failed to process request. ' + (error.response ? error.response.data.detail : error.message));
            setError(error.message);
        }
    };

    // Handle lease agreement creation
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            tenant,
            property,
            lease_start_date: leaseStartDate,
            lease_end_date: leaseEndDate,
            rent_amount: rentAmount,
            security_deposit: securityDeposit,
            payment_frequency: paymentFrequency,
            lease_terms: leaseTerms,
            is_active: isActive,
        };
        await handleFormSubmit(payload, 'http://localhost:8000/api/v1/leaseAgreement/create/', 'Lease Agreement created successfully!');
    };

    // Handle lease agreement editing
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            tenant: editTenant,
            property: editProperty,
            lease_start_date: editLeaseStartDate,
            lease_end_date: editLeaseEndDate,
            rent_amount: editRentAmount,
            security_deposit: editSecurityDeposit,
            payment_frequency: editPaymentFrequency,
            lease_terms: editLeaseTerms,
            is_active: editIsActive,
        };
        await handleFormSubmit(payload, `http://localhost:8000/api/v1/leaseAgreement/${editingLeaseAgreement.id}/`, 'Lease Agreement updated successfully!');
    };

    // Handle lease agreement deletion
    const handleDeleteLeaseAgreement = async (id) => {
        try {
            if (!id) {
                throw new Error('Lease Agreement ID is undefined.');
            }
    
            const confirmDelete = window.confirm('Are you sure you want to delete this lease agreement?');
            if (!confirmDelete) return;
    
            await axios.delete(`http://localhost:8000/api/v1/leaseAgreement/${id}/`);
            fetchLeaseAgreements(); // Refresh the list after deletion
            alert('Lease Agreement deleted successfully!');
        } catch (error) {
            console.error('Error deleting lease agreement:', error.response ? error.response.data : error.message);
            alert('Failed to delete lease agreement. ' + (error.response ? error.response.data.detail : error.message));
            setError(error.message);
        }
    };

    return {
        tenant,
        setTenant,
        property,
        setProperty,
        leaseStartDate,
        setLeaseStartDate,
        leaseEndDate,
        setLeaseEndDate,
        rentAmount,
        setRentAmount,
        securityDeposit,
        setSecurityDeposit,
        paymentFrequency,
        setPaymentFrequency,
        leaseTerms,
        setLeaseTerms,
        isActive,
        setIsActive,
        error,
        setError,
        nonStaffUsers,
        properties,
        leaseAgreements,
        editingLeaseAgreement,
        setEditingLeaseAgreement,
        handleSubmit,
        handleEditSubmit,
        handleDeleteLeaseAgreement,
        fetchLeaseAgreements,
        fetchLeaseAgreementDetailsForEdit,
    };
};
