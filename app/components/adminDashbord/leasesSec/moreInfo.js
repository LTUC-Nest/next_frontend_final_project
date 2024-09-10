import {
  UserIcon,
  HomeIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon, // for online status
  XCircleIcon, // for offline status
} from "@heroicons/react/24/outline";

export default function InfoModal({ lease, onClose }) {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-center mb-4">
          Lease Information
        </h2>

        {/* Tenant */}
        <div className="flex items-center mb-2">
          <UserIcon className="h-5 w-5 text-gray-700 mr-2" />
          <p className="text-gray-700">
            <strong>Tenant:</strong> {lease.tenant_name}
          </p>
        </div>

        {/* Property */}
        <div className="flex items-center mb-2">
          <HomeIcon className="h-5 w-5 text-gray-700 mr-2" />
          <p className="text-gray-700">
            <strong>Property:</strong> {lease.property_name}
          </p>
        </div>

        {/* Rent Amount */}
        <div className="flex items-center mb-2">
          <CurrencyDollarIcon className="h-5 w-5 text-gray-700 mr-2" />
          <p className="text-gray-700">
            <strong>Rent Amount:</strong> ${lease.rent_amount}
          </p>
        </div>

        {/* Lease Start Date */}
        <div className="flex items-center mb-2">
          <CalendarIcon className="h-5 w-5 text-gray-700 mr-2" />
          <p className="text-gray-700">
            <strong>Lease Start Date:</strong> {lease.lease_start_date}
          </p>
        </div>

        {/* Lease End Date */}
        <div className="flex items-center mb-2">
          <CalendarIcon className="h-5 w-5 text-gray-700 mr-2" />
          <p className="text-gray-700">
            <strong>Lease End Date:</strong> {lease.lease_end_date}
          </p>
        </div>

        {/* Last Paid Date */}
        <div className="flex items-center mb-2">
          <CalendarIcon className="h-5 w-5 text-gray-700 mr-2" />
          <p className="text-gray-700">
            <strong>Last Paid Date:</strong> {lease.last_paid_date}
          </p>
        </div>

        {/* Security Deposit */}
        <div className="flex items-center mb-2">
          <CurrencyDollarIcon className="h-5 w-5 text-gray-700 mr-2" />
          <p className="text-gray-700">
            <strong>Security Deposit:</strong> ${lease.security_deposit}
          </p>
        </div>

        {/* Payment Frequency */}
        <div className="flex items-center mb-2">
          <ClockIcon className="h-5 w-5 text-gray-700 mr-2" />
          <p className="text-gray-700">
            <strong>Payment Frequency:</strong> {lease.payment_frequency}
          </p>
        </div>

        {/* Lease Terms */}
        <div className="flex items-center mb-2">
          <DocumentTextIcon className="h-5 w-5 text-gray-700 mr-2" />
          <p className="text-gray-700">
            <strong>Lease Terms:</strong> {lease.lease_terms}
          </p>
        </div>

        {/* Created At */}
        <div className="flex items-center mb-2">
          <ClockIcon className="h-5 w-5 text-gray-700 mr-2" />
          <p className="text-gray-700">
            <strong>Created At:</strong> {lease.created_at}
          </p>
        </div>

        {/* Status */}
        <p>
          <strong>Status:</strong>{" "}
          {lease.is_active ? (
            <CheckCircleIcon className="inline w-5 h-5 text-green-500" />
          ) : (
            <XCircleIcon className="inline w-5 h-5 text-red-500" />
          )}
          {lease.is_active ? " Active" : " Inactive"}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
