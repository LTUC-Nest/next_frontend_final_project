import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';
import EditTenantForm from '../editTenantForm/page';
import AddTenantForm from '../addTenantForm/page';
import useTenantResource from '@/app/customeHook/useResourceTenant';

const TenantContent = () => {
    const [expandedTenantId, setExpandedTenantId] = useState(null);
    const [editTenantId, setEditTenantId] = useState(null);
    const [showEditTenantForm, setShowEditTenantForm] = useState(false);
    const [showAddTenantForm, setShowAddTenantForm] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // Default view mode

    const { tenant, fetchTenant, deleteTenant, successMessage, errorMessage, clearMessages } = useTenantResource();

    // Fetch properties when component mounts
    useEffect(() => {
        fetchTenant();
    }, [fetchTenant]);

    // Toggle the visibility of additional property information
    const handleToggleMoreInfo = (id) => {
        setExpandedTenantId(expandedTenantId === id ? null : id);
    };

    // Handle delete property
    const handleDeleteTenant = async (id) => {
        const confirmDeletion = window.confirm('Are you sure you want to delete this tenant?');
        if (!confirmDeletion) return;

        await deleteTenant(id);
        setExpandedTenantId(null); // Optionally, close the expanded section after deleting
    };

    // Handle edit property
    const handleEditTenant = (id) => {
        setEditTenantId(id);
        setShowEditTenantForm(true);
    };

    const handleCloseEditForm = () => {
        setShowEditTenantForm(false);
        setEditTenantId(null);
    };

    // Handle add property form visibility
    const handleAddTenant = () => {
        setShowAddTenantForm(true);
    };

    const handleCloseAddForm = () => {
        setShowAddTenantForm(false);
    };

    // Toggle view mode between grid and table
    const handleToggleViewMode = (mode) => {
        setViewMode(mode);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Tenant Management</h2>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleToggleViewMode('grid')}
                        className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : ''} rounded-full`}
                    >
                        <FontAwesomeIcon
                            icon={faTh}
                            className="text-xl"
                        />
                    </button>
                    <button
                        onClick={() => handleToggleViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : ''} rounded-full`}
                    >
                        <FontAwesomeIcon
                            icon={faList}
                            className="text-xl"
                        />
                    </button>
                    <button
                        onClick={handleAddTenant}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 ease-in-out"
                    >
                        Add Tenant
                    </button>
                </div>
            </div>

            {/* Success and Error Messages */}
            {successMessage && (
                <div className="text-green-500 mb-4">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="text-red-500 mb-4">
                    {errorMessage}
                </div>
            )}

            {/* Properties List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tenant.map((tenant) => (
                        <div
                            key={tenant.id}
                            className="bg-gray-100 p-4 rounded-lg shadow-sm"
                        >
                            <h3 className="text-lg font-medium">{tenant.username}</h3>
                            <p className="text-sm text-gray-500">{tenant.first_name}</p>
                            <p className="text-sm text-gray-500">
                                 {tenant.last_name}
                            </p>
                            <p className="text-sm text-gray-500">
                                 {tenant.email}
                            </p>
                            {expandedTenantId === tenant.id && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Address: {tenant.address}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        phone number: {tenant.phone_number}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        date of birth: {tenant.date_of_birth}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                    emergency contact name: {tenant.emergency_contact_name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                    emergency contact phone: {tenant.emergency_contact_phone}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        updated at: {tenant.updated_at}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        profile picture: {tenant.profile_picture}
                                    </p>
                                    {/* Edit and Delete Buttons */}
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            onClick={() => handleEditTenant(tenant.id)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out"
                                        >
                                            Edit Info
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTenant(tenant.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={() => handleToggleMoreInfo(tenant.id)}
                                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
                            >
                                {expandedTenantId === tenant.id ? 'Less Info' : 'More Info'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">first name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">last name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">phone number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">date of birth</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">phone number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">emergency contact name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">emergency contact phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">updated at</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tenant.map((tenant) => (
                            <React.Fragment key={tenant.id}>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tenant.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.first_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.last_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleToggleMoreInfo(tenant.id)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Read More
                                        </button>
                                    </td>
                                </tr>
                                {expandedTenantId === tenant.id && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <p>Address: {tenant.address}</p>
                                            <p>phone number: {tenant.phone_number}, date of birth: {tenant.date_of_birth}</p>
                                            <p>emergency contact name: {tenant.emergency_contact_name}, emergency contact phone: {tenant.emergency_contact_phone}</p>
                                            <p>updated at: {tenant.updated_at}, profile picture: {tenant.profile_picture}</p>
                                            <div className="flex space-x-4 mt-4">
                                                <button
                                                    onClick={() => handleEditTenant(tenant.id)}
                                                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out"
                                                >
                                                    Edit Info
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTenant(tenant.id)}
                                                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
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

            {showEditTenantForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Edit Tenant</h2>
                        <EditTenantForm tenantId={editTenantId} onClose={handleCloseEditForm} fetchTenant={fetchTenant} />
                    </div>
                </div>
            )}

            {showAddTenantForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Add Tenant</h2>
                        <AddTenantForm onClose={handleCloseAddForm} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TenantContent;