import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';
import EditTenantForm from './EditTenantForm';
import AddTenantForm from './AddTenantForm';
import useTenantResource from '@/app/customeHook/useResourceTenant';
import InfoModal from './InfoModal';

// Reusable Message Component
const Message = React.memo(({ message, type }) => (
    <div className={`mb-4 p-4 rounded-md ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {message}
    </div>
));

const Tenant = () => {
    const [editTenantId, setEditTenantId] = useState(null);
    const [showEditTenantForm, setShowEditTenantForm] = useState(false);
    const [showAddTenantForm, setShowAddTenantForm] = useState(false);
    const [viewMode, setViewMode] = useState('list');
    const [selectedTenant, setSelectedTenant] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { tenant = [], fetchTenant, deleteTenant, successMessage, errorMessage } = useTenantResource();

    useEffect(() => {
        fetchTenant();
    }, [fetchTenant]);

    const handleToggleMoreInfo = useCallback((tenant) => {
        setSelectedTenant(tenant);
        setIsModalOpen(true);
    }, []);

    const handleDeleteTenant = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this tenant?')) {
            await deleteTenant(id);
            setSelectedTenant(null);
        }
    }, [deleteTenant]);

    const handleEditTenant = useCallback((id) => {
        setEditTenantId(id);
        setShowEditTenantForm(true);
    }, []);

    const handleCloseEditForm = () => {
        setShowEditTenantForm(false);
        setEditTenantId(null);
    };

    const handleAddTenant = () => {
        setShowAddTenantForm(true);
    };

    const handleCloseAddForm = () => {
        setShowAddTenantForm(false);
    };

    const handleToggleViewMode = useCallback((mode) => {
        setViewMode(mode);
    }, []);

    return (
        <>
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tenant Management</h2>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handleToggleViewMode('grid')}
                            aria-label="Grid view"
                            className={`p-3 rounded-full ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'} hover:bg-primary-dark transition-colors duration-300`}
                        >
                            <FontAwesomeIcon icon={faTh} className="text-xl" />
                        </button>
                        <button
                            onClick={() => handleToggleViewMode('list')}
                            aria-label="List view"
                            className={`p-3 rounded-full ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'} hover:bg-primary-dark transition-colors duration-300`}
                        >
                            <FontAwesomeIcon icon={faList} className="text-xl" />
                        </button>
                        <button
                            onClick={handleAddTenant}
                            className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark transition duration-200 ease-in-out text-lg"
                        >
                            Add Tenant
                        </button>
                    </div>
                </div>

                {/* Success and Error Messages */}
                {successMessage && <Message message={successMessage} type="success" />}
                {errorMessage && <Message message={errorMessage} type="error" />}

                {/* Tenants Grid */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tenant.map((tenant) => (
                            <div
                                key={tenant.id}
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl"
                            >
                                {/* Optional image placeholder */}
                                {/* <img src={tenant.image || 'default-image.jpg'} alt={`${tenant.username}'s profile`} className="w-full h-32 object-cover rounded-t-lg mb-2" /> */}
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{tenant.username}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{tenant.first_name} {tenant.last_name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{tenant.email}</p>
                                <div className="mt-2 flex space-x-4">
                                    <button
                                        onClick={() => handleToggleMoreInfo(tenant)}
                                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 text-sm"
                                    >
                                        More Info
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">Username</th>
                                    <th className="px-6 py-3">First Name</th>
                                    <th className="px-6 py-3">Last Name</th>
                                    <th className="px-6 py-3">Address</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tenant.map((tenant) => (
                                    <tr key={tenant.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{tenant.username}</td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{tenant.first_name}</td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{tenant.last_name}</td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{tenant.address}</td>
                                        <td className="px-6 py-4 flex space-x-2">
                                            <button
                                                onClick={() => handleEditTenant(tenant.id)}
                                                className="mr-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer transition-all duration-300 shadow-md"
                                                aria-label={`Edit ${tenant.username}`}
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
                                                onClick={() => handleDeleteTenant(tenant.id)}
                                                className="ml-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer transition-all duration-300 shadow-md"
                                                aria-label={`Delete ${tenant.username}`}
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
                                                onClick={() => handleToggleMoreInfo(tenant)}
                                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 text-sm"
                                            >
                                                More Info
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Edit Tenant Form */}
                {showEditTenantForm && <EditTenantForm tenantId={editTenantId} onClose={handleCloseEditForm} />}

                {/* Add Tenant Form */}
                {showAddTenantForm && <AddTenantForm onClose={handleCloseAddForm} />}

                {/* More Info Modal */}
                <InfoModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    tenant={selectedTenant}
                    onEdit={handleEditTenant}
                    onDelete={handleDeleteTenant}
                />
            </div>
        </>
    );
};

export default Tenant;
