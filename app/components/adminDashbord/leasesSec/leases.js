"use client";
import { AuthContext } from "@/app/context/authContext";
import useResource from "@/app/customeHook/leases";
import { useContext, useEffect, useState } from "react";
import useResourceTenants from "@/app/customeHook/tenants";
import CreateModal from "./addLeaseForm";
import UpdateModal from "./updateLeaseForm";
import useResourceProperty from "@/app/customeHook/property";
import MoreInfo from "./moreInfo";

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
  // const decodedToken = jwtDecode(accessTokens);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModel, setDeleteModal] = useState(false);
 
  const [retrievedData, setRetrievedData] = useState({});

  const createLease = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const updateLease = () => {
    setShowUpdateModal(true);
  };
  const closeUpdateModel = () => {
    setShowUpdateModal(false);
  };



  



  const handleUpdateForm = (id) => {
    const data = retrieveLeaseData(id);
    setRetrievedData(data);
    console.log(data);
    setShowUpdateModal(true);
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
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <svg
          onClick={createLease}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 size-8 m-2 ml-auto rounded ml-auto hover:bg-green-500 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                tenant
              </th>
              <th scope="col" class="px-6 py-3">
                property
              </th>
              <th scope="col" class="px-6 py-3">
                Lease start date
              </th>
              <th scope="col" class="px-6 py-3">
                Lease end date
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchedLeasesData.map((lease, index) => {
              return (
                <tr
                  key={index}
                  class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer hover:bg-red-100"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {lease.tenant}
                  </th>
                  <td class="px-6 py-4">{lease.property}</td>

                  <td class="px-6 py-4">{lease.lease_start_date}</td>
                  <td class="px-6 py-4">{lease.lease_end_date}</td>
                  <td class="px-6 py-4">{lease.is_active ? "🟢" : "🔴"}</td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      onClick={() => {
                        handleUpdateForm(lease.id);
                      }}
                      class="mr-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      onClick={() => {
                        deleteLeaseData(lease.id);
                      }}
                      class="ml-1 font-medium text-red-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}


            
          </tbody>
        </table>
      </div>
      {showCreateModal && <CreateModal onClose={closeCreateModal} />}
            {showUpdateModal && (
              <UpdateModal
                onClose={closeUpdateModel}
                preFilledLeaseInfo={retrievedData}
                />
                
            )}
    </>
  );
}
