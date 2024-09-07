import {
    UserIcon,
    HomeIcon,
    CurrencyDollarIcon,
    CalendarIcon,
    DocumentTextIcon,
    ClockIcon,
    CheckCircleIcon, // for online status
    XCircleIcon     // for offline status
  } from '@heroicons/react/24/outline';
  
  export default function InfoModal({ lease, onClose }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-bg-dark opacity-80 fixed inset-0"></div>
        <div className="bg-bg-light dark:bg-bg-dark p-6 rounded shadow-md relative z-10 w-full max-w-3xl border border-primary-dark dark:border-primary">
          <h2 className="text-lg font-semibold mb-4 text-text-dark dark:text-text-light text-center">
            Lease Information
          </h2>
  
          {/* Tenant */}
          <div className="flex items-center mb-2">
            <UserIcon className="h-5 w-5 text-text-dark dark:text-text-light mr-2" />
            <p className="text-text-dark dark:text-text-light">
              <strong>Tenant:</strong> {lease.tenant_name}
            </p>
          </div>
  
          {/* Property */}
          <div className="flex items-center mb-2">
            <HomeIcon className="h-5 w-5 text-text-dark dark:text-text-light mr-2" />
            <p className="text-text-dark dark:text-text-light">
              <strong>Property:</strong> {lease.property_name}
            </p>
          </div>
  
          {/* Rent Amount */}
          <div className="flex items-center mb-2">
            <CurrencyDollarIcon className="h-5 w-5 text-text-dark dark:text-text-light mr-2" />
            <p className="text-text-dark dark:text-text-light">
              <strong>Rent Amount:</strong> ${lease.rent_amount}
            </p>
          </div>
  
          {/* Lease Start Date */}
          <div className="flex items-center mb-2">
            <CalendarIcon className="h-5 w-5 text-text-dark dark:text-text-light mr-2" />
            <p className="text-text-dark dark:text-text-light">
              <strong>Lease Start Date:</strong> {lease.lease_start_date}
            </p>
          </div>
  
          {/* Lease End Date */}
          <div className="flex items-center mb-2">
            <CalendarIcon className="h-5 w-5 text-text-dark dark:text-text-light mr-2" />
            <p className="text-text-dark dark:text-text-light">
              <strong>Lease End Date:</strong> {lease.lease_end_date}
            </p>
          </div>
  
          {/* Security Deposit */}
          <div className="flex items-center mb-2">
            <CurrencyDollarIcon className="h-5 w-5 text-text-dark dark:text-text-light mr-2" />
            <p className="text-text-dark dark:text-text-light">
              <strong>Security Deposit:</strong> ${lease.security_deposit}
            </p>
          </div>
  
          {/* Payment Frequency */}
          <div className="flex items-center mb-2">
            <ClockIcon className="h-5 w-5 text-text-dark dark:text-text-light mr-2" />
            <p className="text-text-dark dark:text-text-light">
              <strong>Payment Frequency:</strong> {lease.payment_frequency}
            </p>
          </div>
  
          {/* Lease Terms */}
          <div className="flex items-center mb-2">
            <DocumentTextIcon className="h-5 w-5 text-text-dark dark:text-text-light mr-2" />
            <p className="text-text-dark dark:text-text-light">
              <strong>Lease Terms:</strong> {lease.lease_terms}
            </p>
          </div>
  
          {/* Created At */}
          <div className="flex items-center mb-2">
            <ClockIcon className="h-5 w-5 text-text-dark dark:text-text-light mr-2" />
            <p className="text-text-dark dark:text-text-light">
              <strong>Created At:</strong> {lease.created_at}
            </p>
          </div>
  
          {/* Status */}
          <div className="flex items-center mb-2">
            <p className="text-text-dark dark:text-text-light">
              <strong>Status:</strong> {lease.is_active ? (
                <>
                  <CheckCircleIcon className="inline w-5 h-5 text-green-500 mr-1" />
                  <span className="text-green-500">Active</span>
                </>
              ) : (
                <>
                  <XCircleIcon className="inline w-5 h-5 text-red-500 mr-1" />
                  <span className="text-red-500">Inactive</span>
                </>
              )}
            </p>
          </div>
  
          {/* Close Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="bg-red-500 text-white py-1 px-3 rounded text-sm mr-2 hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  