import ApplicationLogo from '@/Components/ApplicationLogo';
import {Link} from '@inertiajs/react';
import GuestMenu from '../Components/GuestMenu.jsx'; // Import the GuestMenu component
import axios from 'axios';
import { useCookies } from 'react-cookie';
import AddModal from '../Components/AddModal.jsx';
import EditModal from '../Components/EditModal.jsx';
import DeleteModal from '../Components/DeleteModal.jsx';

import {useEffect, useState} from "react";



export default function AdminLayout({children}) {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };





    const url = window.location.pathname;

    // const handleAdd = async () => {
    //     try {
    //
    //
    //     } catch (error) {
    //         console.error('Add failed:', error);
    //     }
    // };


    const [cookies] = useCookies(['access_token']); // Get the 'access_token' cookie

    const handleLogout = async () => {
        try {
            const access_token = cookies.access_token;
            console.log("access_token", access_token);

            axios.post('/api/auth/logout', {}, {
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/json'
                }
            })
                // axiosInstance.get('/api/auth/me')
                .then((response) => {
                    window.location.reload();
                })
                .catch(() => {
                    // setUser(null);
                })
                .finally(() => {
                    // setLoading(false);
                });
            // Make a POST request to the logout endpoint
            // After successful logout, perform necessary actions (redirect, etc.)
            // For example, navigate the user to the login page
            // history.push('/login'); // Use history from React Router to redirect
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle logout error (e.g., show an error message)
        }
    };

    // useEffect(() => {
    //     const appendColumnToRows = () => {
    //         const rows = document.querySelectorAll('.list tbody tr');
    //
    //         rows.forEach((row) => {
    //             const newCell = document.createElement('td');
    //             newCell.textContent = 'New Column Data';
    //
    //             row.appendChild(newCell);
    //         });
    //     };
    //
    //     if (tableRendered) {
    //         appendColumnToRows();
    //     }
    // }, [tableRendered]);

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


                <div
                    className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg"
                    style={{backgroundColor: "#66D4BA"}}>
                    <div className="max-w-7xl mx-auto p-6 lg:p-8">
                        <div className="p-4 sm:p-8 bg-gray-200 mx-auto shadow sm:rounded-lg custom-margins text-center">
                            <button className="adminButton" onClick={handleAddModal}>Add</button>
                            <button className="adminButton" onClick={handleEditModal}>Edit</button>
                            <button className="adminButton" onClick={handleDeleteModal}>Delete</button>

                            {/* Modals */}
                            <AddModal isOpen={isAddModalOpen} handleClose={handleCloseAddModal}/>
                            <EditModal isOpen={isEditModalOpen} handleClose={handleCloseEditModal}/>
                            <DeleteModal isOpen={isDeleteModalOpen} handleClose={handleCloseDeleteModal}/>
                        </div>

                        {/*<div className="w-full max-w-4xl mx-auto bg-white shadow-md sm:rounded-lg">*/}
                        {children}
                    </div>
                </div>
            </div>


        </div>
    );

}
