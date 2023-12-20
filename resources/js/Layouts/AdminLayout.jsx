import ApplicationLogo from '@/Components/ApplicationLogo';
import {Link} from '@inertiajs/react';
import GuestMenu from '../Components/GuestMenu.jsx'; // Import the GuestMenu component
import axios from 'axios';

const handleLogout = async () => {
    try {
        await axios.post('/api/auth/logout'); // Make a POST request to the logout endpoint
        // After successful logout, perform necessary actions (redirect, etc.)
        // For example, navigate the user to the login page
        // history.push('/login'); // Use history from React Router to redirect
    } catch (error) {
        console.error('Logout failed:', error);
        // Handle logout error (e.g., show an error message)
    }
};
export default function AdminLayout({children}) {
    return (
        // <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">

        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

            <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                <button
                    onClick={handleLogout}
                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                    Log out
                </button>
            </div>


            {/*<div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">*/}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6 sm:py-8">
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500"/>
                    </Link>
                    <GuestMenu/> {/* Include the GuestMenu here */}
                </div>
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    )
        ;
}
