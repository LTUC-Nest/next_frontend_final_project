import { AuthContext } from "@/app/context/authContext";
import useResource from "@/app/customHook/Leases";
import { useContext, useState } from "react";
import useResourceTenants from "@/app/customHook/tenants";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import useResourceProperty from "@/app/customHook/property";
import InfoModal from "./InfoModal";
import DeleteModal from "./DeleteModal";
import InfoButton from "../../InfoButton";

export default function Leases() {
  const {
    fetchedLeasesData,
    deleteLeaseData,
    updatedLeaseData,
    retrieveLeaseData,
    loading,
    error,
  } = useResource();

  const { retrieveTenantsData } = useResourceTenants();
  const { retrievePropertyData } = useResourceProperty();
  const { tokens } = useContext(AuthContext);
  const accessTokens = tokens.access;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [retrievedData, setRetrievedData] = useState({});
  const [selectedLease, setSelectedLease] = useState(null);

  const createLease = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const updateLease = () => {
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleRowClick = (lease) => {
    setSelectedLease(lease);
    setShowInfoModal(true);
  };

  const handleUpdateForm = (id) => {
    const data = retrieveLeaseData(id);
    setRetrievedData(data);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (lease) => {
    setSelectedLease(lease);
    setShowDeleteModal(true);
  };

  const confirmDelete = (id) => {
    deleteLeaseData(id);
  };

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Error loading resources: {error.message}</p>;
  }

  if (!Array.isArray(fetchedLeasesData)) {
    return <p>No resources available</p>;
  }

  return (
    <>
      <div className="animate__animated animate__bounceInUp p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
        <svg
          onClick={createLease}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 m-2 p-2 ml-auto bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer transition-all duration-300 shadow-md"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Tenant</th>
              <th scope="col" className="px-6 py-3">Property</th>
              <th scope="col" className="px-6 py-3">Lease Start Date</th>
              <th scope="col" className="px-6 py-3">Lease End Date</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {fetchedLeasesData.map((lease, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer hover:bg-red-100"
                onDoubleClick={() => handleRowClick(lease)}
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {lease.tenant_name}
                </th>
                <td className="px-6 py-4">{lease.property_name}</td>
                <td className="px-6 py-4">{lease.lease_start_date}</td>
                <td className="px-6 py-4">{lease.lease_end_date}</td>
                <td className="px-6 py-4">{lease.is_active ? "🟢" : "🔴"}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleUpdateForm(lease.id)}
                    className="mr-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer transition-all duration-300 shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 2.487a2.25 2.25 0 0 1 3.182 3.182L7.878 17.835l-4.28 1.045 1.044-4.279L16.862 2.487z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleDeleteClick(lease)}
                    className="ml-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer transition-all duration-300 shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                      onClick={() => handleRowClick(lease)}
                      className="ml-2  bg-green-500 text-white rounded-full hover:bg-green-400 cursor-pointer transition-all duration-300 shadow-md "
                    >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokewidth="1.5" stroke="currentColor" className="size-6">
  <path strokelinecap="round" strokelinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
</svg>

                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showInfoModal && selectedLease && (
        <InfoModal
          lease={selectedLease}
          onClose={() => setShowInfoModal(false)}
        />
      )}
      {showCreateModal && <CreateModal onClose={closeCreateModal} />}
      {showUpdateModal && (
        <UpdateModal
          onClose={closeUpdateModal}
          preFilledLeaseInfo={retrievedData}
        />
      )}
      {showDeleteModal && selectedLease && (
        <DeleteModal
          lease={selectedLease}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
