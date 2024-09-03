import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';
import EditPropertyForm from '../EditPropertyForm/page';
import AddPropertyForm from '../AddPropertyForm/page';
import usePropertyResource from '@/app/customeHook/userResourceProperty';

const KanbanContent = () => {
    const [expandedPropertyId, setExpandedPropertyId] = useState(null);
    const [editPropertyId, setEditPropertyId] = useState(null);
    const [showEditPropertyForm, setShowEditPropertyForm] = useState(false);
    const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // Default view mode

    const { properties, fetchProperties, deleteProperty, successMessage, errorMessage, clearMessages } = usePropertyResource();

    // Fetch properties when component mounts
    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    // Toggle the visibility of additional property information
    const handleToggleMoreInfo = (id) => {
        setExpandedPropertyId(expandedPropertyId === id ? null : id);
    };

    // Handle delete property
    const handleDeleteProperty = async (id) => {
        const confirmDeletion = window.confirm('Are you sure you want to delete this property?');
        if (!confirmDeletion) return;

        await deleteProperty(id);
        setExpandedPropertyId(null); // Optionally, close the expanded section after deleting
    };

    // Handle edit property
    const handleEditProperty = (id) => {
        setEditPropertyId(id);
        setShowEditPropertyForm(true);
    };

    const handleCloseEditForm = () => {
        setShowEditPropertyForm(false);
        setEditPropertyId(null);
    };

    // Handle add property form visibility
    const handleAddProperty = () => {
        setShowAddPropertyForm(true);
    };

    const handleCloseAddForm = () => {
        setShowAddPropertyForm(false);
    };

    // Toggle view mode between grid and table
    const handleToggleViewMode = (mode) => {
        setViewMode(mode);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Property Management</h2>
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
                        onClick={handleAddProperty}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 ease-in-out"
                    >
                        Add Property
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
                    {properties.map((property) => (
                        <div
                            key={property.id}
                            className="bg-gray-100 p-4 rounded-lg shadow-sm"
                        >
                            <h3 className="text-lg font-medium">{property.name}</h3>
                            <p className="text-sm text-gray-500">{property.city}</p>
                            <p className="text-sm text-gray-500">
                                Type: {property.property_type}
                            </p>
                            <p className="text-sm text-gray-500">
                                Available from: {property.available_from}
                            </p>
                            {expandedPropertyId === property.id && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Address: {property.address}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        State: {property.state}, {property.country}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Description: {property.description}
                                    </p>
                                    {/* Edit and Delete Buttons */}
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            onClick={() => handleEditProperty(property.id)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out"
                                        >
                                            Edit Info
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProperty(property.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={() => handleToggleMoreInfo(property.id)}
                                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
                            >
                                {expandedPropertyId === property.id ? 'Less Info' : 'More Info'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available From</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {properties.map((property) => (
                            <React.Fragment key={property.id}>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{property.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.city}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.available_from}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleToggleMoreInfo(property.id)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Read More
                                        </button>
                                    </td>
                                </tr>
                                {expandedPropertyId === property.id && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <p>Address: {property.address}</p>
                                            <p>State: {property.state}, Country: {property.country}</p>
                                            <p>Description: {property.description}</p>
                                            <div className="flex space-x-4 mt-4">
                                                <button
                                                    onClick={() => handleEditProperty(property.id)}
                                                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-150 ease-in-out"
                                                >
                                                    Edit Info
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProperty(property.id)}
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

            {showEditPropertyForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Edit Property</h2>
                        <EditPropertyForm propertyId={editPropertyId} onClose={handleCloseEditForm} fetchProperties={fetchProperties} />
                    </div>
                </div>
            )}

            {showAddPropertyForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Add Property</h2>
                        <AddPropertyForm onClose={handleCloseAddForm} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default KanbanContent;