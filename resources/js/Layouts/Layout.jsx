

import MemberLayout from '@/Layouts/MemberLayout.jsx';
import GuestLayout from '@/Layouts/GuestLayout';
import AdminLayout from '@/Layouts/AdminLayout';
import { CSSTransition } from 'react-transition-group';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Layout({ children }) {
    const [cookies] = useCookies(['access_token']); // Get the 'access_token' cookie

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const access_token = cookies.access_token;
    console.log("access_token", access_token);

    useEffect(() => {
        const access_token = cookies.access_token;
        console.log("access_token", access_token);

        axios.get('/api/auth/me', {
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                const userData = response.data;
                setUser(userData);

                // Check if the user has admin role directly from the 'me' endpoint response
                const isAdmin = userData.isAdmin; // Assuming 'isAdmin' is a property indicating admin role

                // Update isAdmin state
                setIsAdmin(isAdmin);

                // Other tasks based on user data if needed
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

// Define isAdmin outside the useEffect hook
    const [isAdmin, setIsAdmin] = useState(false); // Assuming initial value is false


    useEffect(() => {
        console.log("User state has changed:", user);
        // Do something else with the updated user state here
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }

    // if (!$user->hasRole(UserRoleSeeder::ROLE_ADMIN)) {
    //     throw new UnauthorizedException(401, 'Admin role needed');
    // }
    //
    // const isAdmin = user && user.roles && user.roles.includes('admin');

    if (isAdmin) {
        return (

            <AdminLayout>

                        {children}
            </AdminLayout>
    );
    }

    return user ? (
        <MemberLayout>

            { children }
        </MemberLayout>
    ) : (
        <GuestLayout>

            { children }
        </GuestLayout>
    );
}
