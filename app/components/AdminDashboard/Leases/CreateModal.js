import useResourceProperty from "@/app/customeHook/property";
import useResourceTenants from "@/app/customeHook/tenants";
import useResourcesLeases from "@/app/customeHook/Leases";

import { useState, useEffect } from "react";

export default function CreateModal({ onClose }) {
  // get the data to fill-out the dropdown menu of tenants, and properties
  const { fetchPropertiesData } = useResourceProperty();
  const { fetchTenantsData } = useResourceTenants();
  const { createdLeaseData } = useResourcesLeases();

  let [tenants, setTenants] = useState([]);
  let [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties(fetchPropertiesData);
  });

  useEffect(() => {
    setTenants(fetchTenantsData);
  });

  if (!properties) {
    properties = [];
  }
  if (!tenants) {
    tenants = [];
  }

  const handleCreatingLeases = (e) => {
    e.preventDefault();
    const tenantSelect = e.target.elements.tenant;
    const tenantSelectedValue = tenantSelect.value;

    const propertySelect = e.target.elements.property;
    const propertySelectedValue = propertySelect.value;

    const paymentSelect = e.target.elements.paymentSelect;
    const paymentSelectedvalue = paymentSelect.value;

    const checkbox = document.getElementById("activeCheckBox");
    const checkboxValue = checkbox.checked ? true : false;

    const leaseInfo = {
      tenant: tenantSelectedValue,
      property: propertySelectedValue,
      lease_start_date: e.target.elements.lease_start_date.value,
      lease_end_date: e.target.elements.lease_end_date.value,
      rent_amount: Number(e.target.elements.rent_amount.value),
      security_deposit: Number(e.target.elements.security_deposite.value),
      payment_frequency: paymentSelectedvalue,
      lease_terms: e.target.elements.lease_terms.value,
      is_active: checkboxValue,
    };

    console.log("--------", leaseInfo);
    createdLeaseData(leaseInfo);
    const form = document.getElementById("leaseSumbitionForm");
    form.reset();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-bg-dark opacity-80 fixed inset-0"></div>
        <div className="bg-bg-light dark:bg-bg-dark p-6 rounded shadow-md relative z-10 w-full max-w-3xl border border-primary-dark dark:border-primary">
          <h2 className="text-lg font-semibold mb-4 text-text-dark dark:text-text-light">
            Create Lease
          </h2>

          <form
            onSubmit={handleCreatingLeases}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
            id="leaseSumbitionForm"
          >
            {/* Tenant */}
            <div>
              <label
                htmlFor="tenantSelect"
                className="block text-sm font-medium text-text-dark dark:text-text-light mb-1"
              >
                Tenant
              </label>
              <select
                id="tenantSelect"
                name="tenant"
                className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                required
              >
                <option value="">Select Tenant</option>
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.username}
                  </option>
                ))}
              </select>
            </div>

            {/* Property */}
            <div>
              <label
                htmlFor="propertySelect"
                className="block text-sm font-medium text-text-dark dark:text-text-light mb-1"
              >
                Property
              </label>
              <select
                id="propertySelect"
                name="property"
                className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
                required
              >
                <option value="">Select Property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Lease Start Date */}
            <div>
              <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                Lease Start Date
              </label>
              <input
                type="date"
                name="lease_start_date"
                className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
              />
            </div>

            {/* Lease End Date */}
            <div>
              <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                Lease End Date
              </label>
              <input
                type="date"
                name="lease_end_date"
                className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
              />
            </div>

            {/* Rent Amount */}
            <div>
              <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                Rent Amount
              </label>
              <input
                type="number"
                step="any"
                name="rent_amount"
                placeholder="Enter rent amount"
                className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
              />
            </div>

            {/* Security Deposit */}
            <div>
              <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                Security Deposit
              </label>
              <input
                type="number"
                step="any"
                name="security_deposite"
                placeholder="Enter security deposit"
                className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
              />
            </div>

            {/* Payment Frequency */}
            <div>
              <label
                htmlFor="paymentSelect"
                className="block text-sm font-medium text-text-dark dark:text-text-light mb-1"
              >
                Payment Frequency
              </label>
              <select
                id="paymentSelect"
                name="payment"
                className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
              >
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
              </select>
            </div>

            {/* Lease Terms */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">
                Lease Terms
              </label>
              <textarea
                name="lease_terms"
                placeholder="Enter lease terms"
                className="w-full p-1 border rounded text-sm focus:outline-none focus:border-primary dark:bg-bg-dark dark:border-gray-700 dark:text-text-light"
              />
            </div>

            {/* Is Active */}
            <div className="col-span-2 flex items-center">
              <input id="activeCheckBox" name="is_active" type="checkbox" className="mr-1" />
              <label className="text-sm font-medium text-text-dark dark:text-text-light">
                Is Active
              </label>
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-end mt-4">
              <button
                onClick={onClose}
                className="bg-red-500 text-white py-1 px-3 rounded text-sm mr-2 hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-1 px-3 rounded text-sm hover:bg-green-600"
              >
                Create Lease
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
