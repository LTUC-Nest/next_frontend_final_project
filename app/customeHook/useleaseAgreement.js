import { useState, useEffect } from 'react';
import axios from 'axios';

export const useLeaseAgreement = () => {
    // State variables for lease agreement form
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

    // Fetch lease agreements
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


    // ----------------------------
    // Fetch lease agreement details for editing
    const fetchLeaseAgreementDetailsForEdit = async (leaseAgreementId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/leaseAgreement/${leaseAgreementId}`);
            const agreement = response.data;

            setEditingLeaseAgreement(agreement);
            setEditTenant(nonStaffUsers.find(user => user.id === agreement.tenant)?.username || '');
            setEditProperty(agreement.property);
            setEditLeaseStartDate(agreement.lease_start_date);
            setEditLeaseEndDate(agreement.lease_end_date);
            setEditRentAmount(agreement.rent_amount);
            setEditSecurityDeposit(agreement.security_deposit);
            setEditPaymentFrequency(agreement.payment_frequency);
            setEditLeaseTerms(agreement.lease_terms);
            setEditIsActive(agreement.is_active);
        } catch (err) {
            setError('Failed to fetch lease agreement details: ' + err.message);
        }
    };
    // -------------------------------------------

    // Handle lease agreement creation
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!tenant || !property || !leaseStartDate || !leaseEndDate) {
                throw new Error('All fields are required.');
            }

            if (!properties.some(prop => prop.id === parseInt(property))) {
                throw new Error('Invalid property ID.');
            }

            const tenantUser = nonStaffUsers.find(user => user.username === tenant);
            if (!tenantUser) {
                throw new Error('Invalid tenant username.');
            }

            const tenantId = tenantUser.id;

            const rentAmountNumber = parseFloat(rentAmount);
            const securityDepositNumber = parseFloat(securityDeposit);

            if (isNaN(rentAmountNumber) || isNaN(securityDepositNumber)) {
                throw new Error('Rent amount and security deposit must be valid numbers.');
            }

            const payload = {
                tenant: tenantId,
                property,
                lease_start_date: leaseStartDate,
                lease_end_date: leaseEndDate,
                rent_amount: rentAmountNumber,
                security_deposit: securityDepositNumber,
                payment_frequency: paymentFrequency,
                lease_terms: leaseTerms,
                is_active: isActive,
            };

            console.log('Payload:', payload);

            const response = await axios.post('http://localhost:8000/api/v1/leaseAgreement/create/', payload);

            alert('Lease Agreement created successfully!');
        } catch (error) {
            console.error('Error creating lease agreement:', error.response ? error.response.data : error.message);
            alert('Failed to create lease agreement. ' + (error.response ? error.response.data.detail : error.message));
            setError(error.message);
        }
    };
// --------------------------------------------------
    // Handle lease agreement editing
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!editTenant || !editProperty || !editLeaseStartDate || !editLeaseEndDate) {
                throw new Error('All fields are required.');
            }

            const tenantUser = nonStaffUsers.find(user => user.username === editTenant);
            if (!tenantUser) {
                throw new Error('Invalid tenant username.');
            }

            const tenantId = tenantUser.id;

            const rentAmountNumber = parseFloat(editRentAmount);
            const securityDepositNumber = parseFloat(editSecurityDeposit);

            if (isNaN(rentAmountNumber) || isNaN(securityDepositNumber)) {
                throw new Error('Rent amount and security deposit must be valid numbers.');
            }

            const payload = {
                tenant: tenantId,
                property: editProperty,
                lease_start_date: editLeaseStartDate,
                lease_end_date: editLeaseEndDate,
                rent_amount: rentAmountNumber,
                security_deposit: editSecurityDeposit,
                payment_frequency: editPaymentFrequency,
                lease_terms: editLeaseTerms,
                is_active: editIsActive,
            };

            console.log('Edit Payload:', payload);

            const response = await axios.put(`http://localhost:8000/api/v1/leaseAgreement/${editingLeaseAgreement.id}/`, payload);

            alert('Lease Agreement updated successfully!');
            // Optionally, you can refetch the lease agreements or update the local state here
        } catch (error) {
            console.error('Error updating lease agreement:', error.response ? error.response.data : error.message);
            alert('Failed to update lease agreement. ' + (error.response ? error.response.data.detail : error.message));
            setError(error.message);
        }
    };
// --------------------------------------------------

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
        handleSubmit,
        fetchLeaseAgreements,
        fetchLeaseAgreementDetailsForEdit,
        handleEditSubmit,
        leaseAgreements,
        nonStaffUsers,
        properties,
        error,
        editingLeaseAgreement,
        editTenant,
        setEditTenant,
        editProperty,
        setEditProperty,
        editLeaseStartDate,
        setEditLeaseStartDate,
        editLeaseEndDate,
        setEditLeaseEndDate,
        editRentAmount,
        setEditRentAmount,
        editSecurityDeposit,
        setEditSecurityDeposit,
        editPaymentFrequency,
        setEditPaymentFrequency,
        editLeaseTerms,
        setEditLeaseTerms,
        editIsActive,
        setEditIsActive,
    };
};
