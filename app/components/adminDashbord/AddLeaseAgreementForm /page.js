import Head from 'next/head';
import { useLeaseAgreement } from '@/app/customeHook/useleaseAgreement';

const LeaseAgreementPage = ({ onClose }) => {
    const {
        tenant,
        setTenant,
        property,
        setProperty,
        leaseStartDate,
        setLeaseStartDate,
        leaseEndDate,
        setLeaseEndDate,
        rentAmount,
        setRentAmount,
        securityDeposit,
        setSecurityDeposit,
        paymentFrequency,
        setPaymentFrequency,
        leaseTerms,
        setLeaseTerms,
        isActive,
        setIsActive,
        handleSubmit,
        nonStaffUsers,
        properties,
        error,
    } = useLeaseAgreement();

    if (error) return <div className="text-red-500">Failed to load data.</div>;
    if (!nonStaffUsers || !properties) return <div className="text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex items-center justify-center p-6">
            <Head>
                <title>Lease Agreement Form</title>
                <meta name="description" content="Create a new lease agreement" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full border border-gray-200">
                <h1 className="text-3xl font-extrabold mb-6 text-blue-800">Create Lease Agreement</h1>
                <form onSubmit={(e) => handleSubmit(e, onClose)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-lg font-semibold text-gray-700 mb-2">
                                Tenant
                                <select
                                    value={tenant}
                                    onChange={(e) => setTenant(e.target.value)}
                                    required
                                    className="mt-1 border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="" disabled>Select a tenant</option>
                                    {nonStaffUsers.map((user) => (
                                        <option key={user.id} value={user.username}>{user.username}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-lg font-semibold text-gray-700 mb-2">
                                Property
                                <select
                                    value={property}
                                    onChange={(e) => setProperty(e.target.value)}
                                    required
                                    className="mt-1 border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="" disabled>Select a property</option>
                                    {properties.map((prop) => (
                                        <option key={prop.id} value={prop.id}>{prop.name}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-lg font-semibold text-gray-700 mb-2">
                                Lease Start Date
                                <input
                                    type="date"
                                    value={leaseStartDate}
                                    onChange={(e) => setLeaseStartDate(e.target.value)}
                                    required
                                    className="mt-1 border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-lg font-semibold text-gray-700 mb-2">
                                Lease End Date
                                <input
                                    type="date"
                                    value={leaseEndDate}
                                    onChange={(e) => setLeaseEndDate(e.target.value)}
                                    className="mt-1 border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-lg font-semibold text-gray-700 mb-2">
                                Rent Amount
                                <input
                                    type="number"
                                    step="0.01"
                                    value={rentAmount}
                                    onChange={(e) => setRentAmount(e.target.value)}
                                    required
                                    className="mt-1 border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-lg font-semibold text-gray-700 mb-2">
                                Security Deposit
                                <input
                                    type="number"
                                    step="0.01"
                                    value={securityDeposit}
                                    onChange={(e) => setSecurityDeposit(e.target.value)}
                                    className="mt-1 border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-lg font-semibold text-gray-700 mb-2">
                                Payment Frequency
                                <select
                                    value={paymentFrequency}
                                    onChange={(e) => setPaymentFrequency(e.target.value)}
                                    required
                                    className="mt-1 border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="MONTHLY">Monthly</option>
                                    <option value="YEARLY">Yearly</option>
                                </select>
                            </label>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-lg font-semibold text-gray-700 mb-2">
                                Lease Terms
                                <textarea
                                    value={leaseTerms}
                                    onChange={(e) => setLeaseTerms(e.target.value)}
                                    className="mt-1 border border-gray-300 rounded-lg p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                        </div>

                        <div className="flex items-center mb-6">
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-gray-700 text-lg">Active</span>
                        </div>

                        <button
                            type="submit"
                            
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Create Lease Agreement
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default LeaseAgreementPage;
