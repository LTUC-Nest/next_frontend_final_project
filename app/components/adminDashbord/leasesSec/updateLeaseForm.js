import useResourceProperty from "@/app/customeHook/property";
import useResourceTenants from "@/app/customeHook/tenants";
import useResourcesLeases from "@/app/customeHook/leases";

import { useState, useEffect } from "react";
 

export default function UpdateModal({ onClose,preFilledLeaseInfo }) {
  // get the data to fill-out the dropdown menue of tenants, and properties 
  const { fetchPropertiesData } = useResourceProperty();
  const { fetchTenantsData } = useResourceTenants();
  // use the createLeaseData resource from the custom hook for POST the Data
  const {updatedLeaseData} = useResourcesLeases()

  let [tenants, setTenants] = useState([]);
  let [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties(fetchPropertiesData);
  });
  preFilledLeaseInfo.then((data) => {

    // document.getElementById('lease_id').value = data.id;
    document.getElementById('tenantSelect').value = data.tenant;
    document.getElementById('propertySelect').value = data.property;
    document.getElementById('rent_amount').value = data.rent_amount;
    document.getElementById('lease_start_date').value = data.lease_start_date;
    document.getElementById('lease_end_date').value = data.lease_end_date; 
    document.getElementById('rent_amount').value = data.rent_amount; 
    document.getElementById('security_deposit').value = data.security_deposit; 
    document.getElementById('lease_terms').value = data.lease_terms; 
    document.getElementById('activeCheckBox').checked = data.is_active; 
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
    const propertySelectedValue = propertySelect.value

    const paymentSelect = e.target.elements.paymentSelect
    const paymentSelectedvalue = paymentSelect.value
    
    const checkbox = document.getElementById('activeCheckBox')
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
      is_active: checkboxValue, // true //
    };

    preFilledLeaseInfo.then((data) => {
      updatedLeaseData(data.id,leaseInfo)
      const form = document.getElementById('leaseSumbitionForm')
      form.reset()
      onClose()
    })

  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-black opacity-50 fixed inset-0"></div>
        <div className="bg-white p-6 rounded shadow-lg relative z-10 w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-6">Update Lease</h2>

          <form
            onSubmit={handleCreatingLeases}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
            id='leaseSumbitionForm'
          >
            {/* Tenant */}
            <div>
              <label for='tenantSelect'  className="block text-sm font-medium text-gray-700 mb-2">
                Tenant
              </label>
              <select
                id='tenantSelect'
                type="text"
                name="tenant"
                placeholder="Enter tenant name"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
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
              <label for='propertySelect'  className="block text-sm font-medium text-gray-700 mb-2">
                Property
              </label>
              <select
                id = 'propertySelect'
                name="property"
                type="text"
                placeholder="Enter property name"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              >
                <option value=''>Select Property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Lease Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lease Start Date
              </label>
              <input
                type="date"
                value={preFilledLeaseInfo.lease_start_date}
                name='lease_start_date'
                id='lease_start_date'
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Lease End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lease End Date
              </label>
              <input
                name="lease_end_date"
                id="lease_end_date"
                type="date"
                value={preFilledLeaseInfo.lease_end_date}
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Rent Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rent Amount
              </label>
              <input
                type="number"
                step='any'
                name="rent_amount"
                id="rent_amount"
                placeholder="Enter rent amount"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Security Deposit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Security Deposit
              </label>
              <input
                name = 'security_deposite'
                id = 'security_deposit'
                type="number"
                step='any'
                placeholder="Enter security deposit"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Payment Frequency */}
            <div>
              <label for='paymentSelect' className="block text-sm font-medium text-gray-700 mb-2">
                Payment Frequency
              </label>
              <select id='paymentSelect'  name='payment' className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500" required>

                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
              </select>
            </div>

            {/* Lease Terms */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lease Terms
              </label>
              <textarea
                name="lease_terms"
                id="lease_terms"
                placeholder="Enter lease terms"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Is Active */}
            <div className="col-span-2 flex items-center">
              <input id='activeCheckBox' name="is_active" type="checkbox" className="mr-2"/>
              <label className="text-sm font-medium text-gray-700">
                Is Active
              </label>
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-end mt-6">
              <button
                onClick={onClose}
                className="bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Update Lease
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
