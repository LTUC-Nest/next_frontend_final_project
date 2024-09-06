export default function MoreInfo({ onClose }) {
  return (
    <>
    <div id="modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Tenant Lease Details</h2>
            <ul class="space-y-2">
                <li><strong>Tenant:</strong> John SMK</li>
                <li><strong>Property:</strong> London St. Apartment</li>
                <li><strong>Rent Amount:</strong> $440.00</li>
                <li><strong>Security Deposit:</strong> $4000.00</li>
                <li><strong>Payment Frequency:</strong> MONTHLY</li>
                <li><strong>Lease Terms:</strong> N/A</li>
                <li><strong>Active:</strong> Yes</li>
                <li><strong>Created At:</strong> 2024-09-06 10:55:38</li>
                <li><strong>Lease Start Date:</strong> 2024-09-06</li>
                <li><strong>Lease End Date:</strong> 2024-09-27</li>
            </ul>
            <div class="flex justify-end mt-4">
                <button onClick={onClose} class="px-4 py-2 bg-gray-500 text-white rounded-md">Close</button>
            </div>
        </div>
    </div>
    </>
  );
}
