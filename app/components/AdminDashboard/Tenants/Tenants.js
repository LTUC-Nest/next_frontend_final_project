import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';
import EditTenantForm from './EditTenantForm';
import AddTenantForm from './AddTenantForm';
import useTenantResource from '@/app/customeHook/useResourceTenant';

// Reusable Message Component
const Message = React.memo(({ message, type }) => (
    <div className={`mb-4 p-4 rounded-md ${type === 'success' ? 'bg-primary text-bg-light' : 'bg-red-100 text-red-800'}`}>
        {message}
    </div>
));

const Tenant = () => {
    const [expandedTenantId, setExpandedTenantId] = useState(null);
    const [editTenantId, setEditTenantId] = useState(null);
    const [showEditTenantForm, setShowEditTenantForm] = useState(false);
    const [showAddTenantForm, setShowAddTenantForm] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

    const { tenant, fetchTenant, deleteTenant, successMessage, errorMessage } = useTenantResource();

    useEffect(() => {
        fetchTenant();
    }, [fetchTenant]);

    const handleToggleMoreInfo = useCallback((id) => {
        setExpandedTenantId(prevId => (prevId === id ? null : id));
    }, []);

    const handleDeleteTenant = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this tenant?')) {
            await deleteTenant(id);
            setExpandedTenantId(null);
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
        <div className="p-6 bg-bg-light dark:bg-bg-dark rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-text-dark dark:text-text-light">Tenant Management</h2>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleToggleViewMode('grid')}
                        className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-primary text-bg-light' : 'bg-gray-200 dark:bg-gray-600'}`}
                    >
                        <FontAwesomeIcon icon={faTh} className="text-xl" />
                    </button>
                    <button
                        onClick={() => handleToggleViewMode('list')}
                        className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-primary text-bg-light' : 'bg-gray-200 dark:bg-gray-600'}`}
                    >
                        <FontAwesomeIcon icon={faList} className="text-xl" />
                    </button>
                    <button
                        onClick={handleAddTenant}
                        className="px-4 py-2 bg-primary text-bg-light rounded-lg hover:bg-primary-dark transition duration-150 ease-in-out"
                    >
                        Add Tenant
                    </button>
                </div>
            </div>

            {/* Success and Error Messages */}
            {successMessage && <Message message={successMessage} type="success" />}
            {errorMessage && <Message message={errorMessage} type="error" />}

            {/* Tenants List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tenant.map((tenant) => (
                        <div
                            key={tenant.id}
                            className="bg-gray-100 dark:bg-bg-dark p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                        >
                            <h3 className="text-lg font-medium text-text-dark dark:text-text-light">{tenant.username}</h3>
                            <p className="text-sm text-gray-600 dark:text-text-light">{tenant.first_name} {tenant.last_name}</p>
                            <p className="text-sm text-gray-600 dark:text-text-light">{tenant.email}</p>
                            {expandedTenantId === tenant.id && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600 dark:text-text-light">Address: {tenant.address}</p>
                                    <p className="text-sm text-gray-600 dark:text-text-light">Phone number: {tenant.phone_number}</p>
                                    <p className="text-sm text-gray-600 dark:text-text-light">Date of birth: {tenant.date_of_birth}</p>
                                    <p className="text-sm text-gray-600 dark:text-text-light">Emergency contact name: {tenant.emergency_contact_name}</p>
                                    <p className="text-sm text-gray-600 dark:text-text-light">Emergency contact phone: {tenant.emergency_contact_phone}</p>
                                    <p className="text-sm text-gray-600 dark:text-text-light">Updated at: {tenant.updated_at}</p>
                                    <p className="text-sm text-gray-600 dark:text-text-light">Profile picture: {tenant.profile_picture}</p>
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            onClick={() => handleEditTenant(tenant.id)}
                                            className="px-3 py-1 bg-yellow-500 text-bg-light rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out"
                                        >
                                            Edit Info
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTenant(tenant.id)}
                                            className="px-3 py-1 bg-red-500 text-bg-light rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={() => handleToggleMoreInfo(tenant.id)}
                                className="mt-2 px-3 py-1 bg-primary text-bg-light rounded-lg hover:bg-primary-dark transition duration-150 ease-in-out"
                            >
                                {expandedTenantId === tenant.id ? 'Less Info' : 'More Info'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <thead className="bg-gray-200 dark:bg-bg-dark-header">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-text-light uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-text-light uppercase tracking-wider">First Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-text-light uppercase tracking-wider">Last Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-text-light uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-text-light uppercase tracking-wider">Phone Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-text-light uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-text-light uppercase tracking-wider">viewMode</th>

                        </tr>
                    </thead>
                    <tbody className="bg-gray-100 dark:bg-bg-dark divide-y divide-gray-200 dark:divide-gray-600">
                        {tenant.map((tenant) => (
                            <React.Fragment key={tenant.id}>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-text-light">{tenant.username}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-text-light">{tenant.first_name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-text-light">{tenant.last_name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-text-light">{tenant.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-text-light">{tenant.phone_number}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-text-light">{tenant.address}</td>
                                    <button
                                        onClick={() => handleToggleMoreInfo(tenant.id)}
                                        className="mt-2 px-3 py-1 bg-primary text-bg-light rounded-lg hover:bg-primary-dark transition duration-150 ease-in-out"
                                    >
                                        {expandedTenantId === tenant.id ? 'Less Info' : 'More Info'}
                                    </button>
                                </tr>

                                {expandedTenantId === tenant.id && (
                                    <tr>
                                        <td colSpan="10" className="p-4 bg-gray-50 dark:bg-gray-800">
                                            <p className="text-sm text-gray-600 dark:text-text-light">Profile picture: {tenant.profile_picture}</p>
                                            <div className="flex space-x-4 mt-4">
                                                <button
                                                    onClick={() => handleEditTenant(tenant.id)}
                                                    className="px-3 py-1 bg-yellow-500 text-bg-light rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out"
                                                >
                                                    Edit Info
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTenant(tenant.id)}
                                                    className="px-3 py-1 bg-red-500 text-bg-light rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Edit Tenant Form */}
            {showEditTenantForm && <EditTenantForm tenantId={editTenantId} onClose={handleCloseEditForm} />}

            {/* Add Tenant Form */}
            {showAddTenantForm && <AddTenantForm onClose={handleCloseAddForm} />}
        </div>
    );
};

export default Tenant;
