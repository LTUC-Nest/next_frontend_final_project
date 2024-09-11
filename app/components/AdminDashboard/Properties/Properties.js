import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';
import UpdateModal from './UpdateModal';
import CreateModal from './CreateModal';
import InfoModal from './InfoModal';
import usePropertyResource from '@/app/customHook/usePropertyResource';


// Reusable Message Component
const Message = React.memo(({ message, type }) => (
    <div className={`mb-4 p-4 rounded-md ${type === 'success' ? 'bg-primary-light text-text-light' : 'bg-red-100 text-red-600'}`}>
        {message}
    </div>
));



// Main Properties Component
const Properties = () => {
    const [editPropertyId, setEditPropertyId] = useState(null);
    const [showEditPropertyForm, setShowEditPropertyForm] = useState(false);
    const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
    const [viewMode, setViewMode] = useState('list');
    const [selectedProperty, setSelectedProperty] = useState(null);
    const { properties = [], fetchProperties, deleteProperty, successMessage, errorMessage } = usePropertyResource();

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

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

    const handleDeleteProperty = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            await deleteProperty(id);
            setSelectedProperty(null);
        }
    }, [deleteProperty]);

    const handleShowMoreInfo = (property) => {
        setSelectedProperty(property);
    };


    return (
        <>
            <div className="animate__animated animate__bounceInUp p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-text-dark dark:text-text-light">Property Management</h2>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handleToggleViewMode('grid')}
                            aria-label="Grid view"
                            className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'} hover:bg-primary-dark dark:hover:bg-gray-600`}
                        >
                            <FontAwesomeIcon icon={faTh} className="text-xl text-bg-light" />
                        </button>
                        <button
                            onClick={() => handleToggleViewMode('list')}
                            aria-label="List view"
                            className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'} hover:bg-primary-dark dark:hover:bg-gray-600`}
                        >
                            <FontAwesomeIcon icon={faList} className="text-xl text-bg-light" />
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
                {/* Properties Grid */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {properties.map((property) => (
                            <div key={property.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{property.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{property.address}</p>
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleShowMoreInfo(property)}
                                            className="mt-2 px-3 py-1 bg-primary text-bg-light rounded-lg hover:bg-primary-dark transition duration-150 ease-in-out"
                                            >
                                            More Info
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Address</th>
                                    <th scope="col" className="px-6 py-3">property type</th>
                                    <th scope="col" className="px-6 py-3">available from</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map((property) => (
                                    <tr
                                        key={property.id}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{property.name}</td>
                                        <td className="px-6 py-4">{property.address}</td>
                                        <td className="px-6 py-4">{property.property_type}</td>
                                        <td className="px-6 py-4">{property.available_from}</td>
                                        <td className="px-6 py-4 flex space-x-2">
                                            <button
                                                onClick={() => handleEditProperty(property.id)}
                                                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer transition-all duration-300 shadow-md"
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
                                                onClick={() => handleDeleteProperty(property.id)}
                                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer transition-all duration-300 shadow-md"
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
                                            onClick={() => handleShowMoreInfo(property)}
                                            className=" px-3 py-2 bg-primary text-bg-light rounded-lg hover:bg-primary-dark transition duration-150 ease-in-out"
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
            </div>
            {/* Modals */}
            {showEditPropertyForm && (
                <UpdateModal
                    propertyId={editPropertyId}
                    onClose={handleCloseEditForm}
                    fetchProperties={fetchProperties}
                />
            )}
            {showAddPropertyForm && (
                <CreateModal onClose={handleCloseAddForm} fetchProperties={fetchProperties} />
            )}
            {selectedProperty && (
                <InfoModal
                    property={selectedProperty}
                    onClose={() => setSelectedProperty(null)}
                    onEdit={() => handleEditProperty(selectedProperty.id)}
                    onDelete={() => handleDeleteProperty(selectedProperty.id)}
                />
            )}
        </>
    );
};
export default Properties;