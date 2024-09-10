import useResourceProperty from "@/app/customHook/property";
import useResourceTenants from "@/app/customHook/tenants";
import useResourcesLeases from "@/app/customHook/Leases";

import { useState, useEffect } from "react";

export default function UpdateModal({ onClose, preFilledLeaseInfo }) {
  const { fetchPropertiesData } = useResourceProperty();
  const { fetchTenantsData } = useResourceTenants();
  const { updatedLeaseData } = useResourcesLeases();

  let [tenants, setTenants] = useState([]);
  let [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties(fetchPropertiesData);
  });

  preFilledLeaseInfo.then((data) => {
    document.getElementById('tenantSelect').value = data.tenant;
    document.getElementById('propertySelect').value = data.property;
    document.getElementById('rent_amount').value = data.rent_amount;
    document.getElementById('lease_start_date').value = data.lease_start_date;
    document.getElementById('lease_end_date').value = data.lease_end_date;
    document.getElementById('last_paid_date').value = data.last_paid_date;
    document.getElementById('security_deposit').value = data.security_deposit;
    document.getElementById('lease_terms').value = data.lease_terms;
    document.getElementById('activeCheckBox').checked = data.is_active;
  });

  useEffect(() => {
    setTenants(fetchTenantsData);
  });

  if (!properties) properties = [];
  if (!tenants) tenants = [];

  const handleUpdateLease = (e) => {
    e.preventDefault();
    const leaseInfo = {
      tenant: e.target.elements.tenant.value,
      property: e.target.elements.property.value,
      lease_start_date: e.target.elements.lease_start_date.value,
      lease_end_date: e.target.elements.lease_end_date.value,
      last_paid_date: e.target.elements.last_paid_date.value,
      rent_amount: Number(e.target.elements.rent_amount.value),
      security_deposit: Number(e.target.elements.security_deposit.value),
      payment_frequency: e.target.elements.payment.value,
      lease_terms: e.target.elements.lease_terms.value,
      is_active: document.getElementById('activeCheckBox').checked,
    };

    preFilledLeaseInfo.then((data) => {
      updatedLeaseData(data.id, leaseInfo);
      document.getElementById('leaseSumbitionForm').reset();
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-bg-light dark:bg-bg-dark p-6 rounded shadow-md relative w-full max-w-4xl border border-primary-dark dark:border-primary">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-text-dark dark:text-text-light">Update Lease</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-text-light dark:hover:text-text-dark">X</button>
        </div>

        <form onSubmit={handleUpdateLease} id="leaseSumbitionForm" className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Tenant */}
          <div>
            <label htmlFor="tenantSelect" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Tenant</label>
            <select id="tenantSelect" name="tenant" className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light" required>
              <option value="">Select Tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>{tenant.username}</option>
              ))}
            </select>
          </div>

          {/* Property */}
          <div>
            <label htmlFor="propertySelect" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Property</label>
            <select id="propertySelect" name="property" className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light" required>
              <option value="">Select Property</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>{property.name}</option>
              ))}
            </select>
          </div>

          {/* Lease Start Date */}
          <div>
            <label htmlFor="lease_start_date" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Lease Start Date</label>
            <input id="lease_start_date" name="lease_start_date" type="date" className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light" required />
          </div>

          {/* Lease End Date */}
          <div>
            <label htmlFor="lease_end_date" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Lease End Date</label>
            <input id="lease_end_date" name="lease_end_date" type="date" className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light" required />
          </div>

          {/* Last_Paid_Date */}

          <div>
            <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
              Last Paid Date
            </label>
            <input
              name="last_paid_date"
              id="last_paid_date"
              type="date"
              className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
              required
            />
          </div>

          {/* Rent Amount */}
          <div>
            <label htmlFor="rent_amount" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Rent Amount</label>
            <input id="rent_amount" name="rent_amount" type="number" step="any" className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light" required />
          </div>

          {/* Security Deposit */}
          <div>
            <label htmlFor="security_deposit" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Security Deposit</label>
            <input id="security_deposit" name="security_deposit" type="number" step="any" className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light" required />
          </div>

          {/* Payment Frequency */}
          <div>
            <label htmlFor="paymentSelect" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Payment Frequency</label>
            <select id="paymentSelect" name="payment" className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light" required>
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>

          {/* Lease Terms */}
          <div className="col-span-2">
            <label htmlFor="lease_terms" className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Lease Terms</label>
            <textarea id="lease_terms" name="lease_terms" className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light" />
          </div>

          {/* Is Active */}
          <div className="col-span-2 flex items-center">
            <input id="activeCheckBox" name="is_active" type="checkbox" className="mr-2" />
            <label htmlFor="activeCheckBox" className="text-sm font-medium text-text-dark dark:text-text-light">Is Active</label>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end mt-4 space-x-2">
            <button type="button" onClick={onClose} className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600">Cancel</button>
            <button type="submit" className="bg-green-500 text-white py-1 px-3 rounded text-sm hover:bg-green-600">Update Lease</button>
          </div>
        </form>
      </div>
    </div>
  );
}
