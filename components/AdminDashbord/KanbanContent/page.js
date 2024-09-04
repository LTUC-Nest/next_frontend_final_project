import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';
import EditPropertyForm from '../EditPropertyForm/page';
import AddPropertyForm from '../AddPropertyForm/page';
import usePropertyResource from '@/app/customeHook/userResourceProperty';

// Reusable Message Component
const Message = React.memo(({ message, type }) => (
    <div className={`mb-4 p-3 rounded-md ${type === 'success' ? 'bg-primary-dark text-bg-light' : 'bg-red-100 text-red-600'}`}>
        {message}
    </div>
));

// Reusable Property Actions Component
const PropertyActions = React.memo(({ property, onEdit, onDelete }) => (
    <div className="flex space-x-3 mt-4">
        <button
            onClick={() => onEdit(property.id)}
            className="px-4 py-2 bg-primary text-bg-light rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark transition duration-150 ease-in-out"
        >
            Edit Info
        </button>
        <button
            onClick={() => onDelete(property.id)}
            className="px-4 py-2 bg-red-500 text-bg-light rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-150 ease-in-out"
        >
            Delete
        </button>
    </div>
));

// Main KanbanContent Component
const KanbanContent = () => {
    const [expandedPropertyId, setExpandedPropertyId] = useState(null);
    const [editPropertyId, setEditPropertyId] = useState(null);
    const [showEditPropertyForm, setShowEditPropertyForm] = useState(false);
    const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // Default view mode

    const { properties, fetchProperties, deleteProperty, successMessage, errorMessage } = usePropertyResource();

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    const handleToggleMoreInfo = useCallback((id) => {
        setExpandedPropertyId(prevId => (prevId === id ? null : id));
    }, []);

    const handleDeleteProperty = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            await deleteProperty(id);
            setExpandedPropertyId(null); // Optionally, close the expanded section after deleting
        }
    }, [deleteProperty]);

    const handleEditProperty = useCallback((id) => {
        setEditPropertyId(id);
        setShowEditPropertyForm(true);
    }, []);

    const handleCloseEditForm = () => {
        setShowEditPropertyForm(false);
        setEditPropertyId(null);
    };

    const handleAddProperty = () => {
        setShowAddPropertyForm(true);
    };

    const handleCloseAddForm = () => {
        setShowAddPropertyForm(false);
    };

    const handleToggleViewMode = useCallback((mode) => {
        setViewMode(mode);
    }, []);

    return (
        <div className="p-6 bg-bg-light dark:bg-bg-dark rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-dark dark:text-text-light">Property Management</h2>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => handleToggleViewMode('grid')}
                        aria-label="Grid view"
                        className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-primary' : 'bg-gray-100 dark:bg-gray-700'} hover:bg-primary-dark dark:hover:bg-gray-600`}
                    >
                        <FontAwesomeIcon icon={faTh} className="text-xl text-bg-dark dark:text-bg-light" />
                    </button>
                    <button
                        onClick={() => handleToggleViewMode('list')}
                        aria-label="List view"
                        className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-primary' : 'bg-gray-100 dark:bg-gray-700'} hover:bg-primary-dark dark:hover:bg-gray-600`}
                    >
                        <FontAwesomeIcon icon={faList} className="text-xl text-bg-dark dark:text-bg-light" />
                    </button>
                    <button
                        onClick={handleAddProperty}
                        className="px-4 py-2 bg-primary text-bg-light rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark transition duration-150 ease-in-out"
                    >
                        Add Property
                    </button>
                </div>
            </div>

            {/* Success and Error Messages */}
            {successMessage && <Message message={successMessage} type="success" />}
            {errorMessage && <Message message={errorMessage} type="error" />}

            {/* Properties List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <div key={property.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-text-dark dark:text-text-light">{property.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{property.city}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Type: {property.property_type}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Available from: {property.available_from}</p>
                            {expandedPropertyId === property.id && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Address: {property.address}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">State: {property.state}, {property.country}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Description: {property.description}</p>
                                    <PropertyActions 
                                        property={property} 
                                        onEdit={handleEditProperty} 
                                        onDelete={handleDeleteProperty} 
                                    />
                                </div>
                            )}
                            <button
                                onClick={() => handleToggleMoreInfo(property.id)}
                                className="mt-3 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-bg-light rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
                            >
                                {expandedPropertyId === property.id ? 'Less Info' : 'More Info'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">City</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Available From</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Property Type</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {properties.map((property) => (
                            <React.Fragment key={property.id}>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{property.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{property.city}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{property.available_from}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{property.property_type}</td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        <button
                                            onClick={() => handleToggleMoreInfo(property.id)}
                                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                                        >
                                            Read More
                                        </button>
                                    </td>
                                </tr>
                                {expandedPropertyId === property.id && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            <p>Address: {property.address}</p>
                                            <p>State: {property.state}, Country: {property.country}</p>
                                            <p>Description: {property.description}</p>
                                            <PropertyActions 
                                                property={property} 
                                                onEdit={handleEditProperty} 
                                                onDelete={handleDeleteProperty} 
                                            />
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
                    <div className="bg-bg-light dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-xl font-semibold mb-4 text-text-dark dark:text-text-light">Edit Property</h2>
                        <EditPropertyForm propertyId={editPropertyId} onClose={handleCloseEditForm} fetchProperties={fetchProperties} />
                    </div>
                </div>
            )}

            {showAddPropertyForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-bg-light dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-xl font-semibold mb-4 text-text-dark dark:text-text-light">Add Property</h2>
                        <AddPropertyForm onClose={handleCloseAddForm} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default KanbanContent;
