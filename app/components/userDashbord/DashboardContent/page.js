import { useUserData } from "@/app/customeHook/useUserData";

function DashboardContent() {
    const apiEndPoint = 'http://127.0.0.1:8000/api/v1/users';
    const { userData, profileImage, updateResource, retrieveResource, error, loading } = useUserData(apiEndPoint);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div className="bg-white w-full px-4 pt-16 pb-16" id="faq">
            <h2 className="text-4xl font-bold text-center">Welcome Back, {userData?.first_name}!</h2>

            <div className="flex h-screen items-center justify-center bg-gray-900 p-5">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-10 md:px-10">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold text-white">
                            <span className="text-green-500">Hi,</span> {userData?.first_name}
                        </h1>
                        <p className="mb-6 text-white">
                            Welcome to your dashboard! Here you can manage your leases and update your personal information.
                        </p>
                        <div className="flex justify-center space-x-5">
                            <button
                                className="flex w-full items-center justify-center gap-1 rounded-2xl bg-rose-500 p-5 py-3 font-semibold text-white hover:bg-rose-700"
                                onClick={() => window.location.href = '/leases'}
                            >
                                Go to My Leases
                            </button>
                            <button
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white p-5 py-3 font-semibold"
                                onClick={() => window.location.href = '/update-info'}
                            >
                                Update My Info
                            </button>
                        </div>
                    </div>
                    <div>
                        <img src={profileImage} alt="Profile Picture" className="md:size-96 size-72 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardContent;
