import React, { useEffect } from 'react';
import { useLeaseAgreement } from '@/app/customeHook/useleaseAgreement';

const EditLeaseAgreementForm = ({ leaseAgreementId }) => {
    const {
        fetchLeaseAgreementDetailsForEdit,
        handleEditSubmit,
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
        nonStaffUsers,
        properties,
        error
    } = useLeaseAgreement();

    useEffect(() => {
        if (leaseAgreementId) {
            fetchLeaseAgreementDetailsForEdit(leaseAgreementId);
        }
    }, [leaseAgreementId, fetchLeaseAgreementDetailsForEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditSubmit(e);
    };

    return (
        <div>
            <h1>Edit Lease Agreement</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="tenant">Tenant</label>
                    <select
                        id="tenant"
                        value={editTenant}
                        onChange={(e) => setEditTenant(e.target.value)}
                    >
                        <option value="">Select Tenant</option>
                        {nonStaffUsers.map(user => (
                            <option key={user.id} value={user.username}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="property">Property</label>
                    <select
                        id="property"
                        value={editProperty}
                        onChange={(e) => setEditProperty(e.target.value)}
                    >
                        <option value="">Select Property</option>
                        {properties.map(prop => (
                            <option key={prop.id} value={prop.id}>
                                {prop.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="leaseStartDate">Lease Start Date</label>
                    <input
                        type="date"
                        id="leaseStartDate"
                        value={editLeaseStartDate}
                        onChange={(e) => setEditLeaseStartDate(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="leaseEndDate">Lease End Date</label>
                    <input
                        type="date"
                        id="leaseEndDate"
                        value={editLeaseEndDate}
                        onChange={(e) => setEditLeaseEndDate(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="rentAmount">Rent Amount</label>
                    <input
                        type="number"
                        id="rentAmount"
                        value={editRentAmount}
                        onChange={(e) => setEditRentAmount(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="securityDeposit">Security Deposit</label>
                    <input
                        type="number"
                        id="securityDeposit"
                        value={editSecurityDeposit}
                        onChange={(e) => setEditSecurityDeposit(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="paymentFrequency">Payment Frequency</label>
                    <select
                        id="paymentFrequency"
                        value={editPaymentFrequency}
                        onChange={(e) => setEditPaymentFrequency(e.target.value)}
                    >
                        <option value="MONTHLY">Monthly</option>
                        <option value="QUARTERLY">Quarterly</option>
                        <option value="YEARLY">Yearly</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="leaseTerms">Lease Terms</label>
                    <textarea
                        id="leaseTerms"
                        value={editLeaseTerms}
                        onChange={(e) => setEditLeaseTerms(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="isActive">Active</label>
                    <input
                        type="checkbox"
                        id="isActive"
                        checked={editIsActive}
                        onChange={(e) => setEditIsActive(e.target.checked)}
                    />
                </div>

                <button type="submit">Update Lease Agreement</button>
            </form>
        </div>
    );
};

export default EditLeaseAgreementForm;
