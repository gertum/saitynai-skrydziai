import AuthenticatedLayout from '@/Layouts/MemberLayout.jsx';
import GuestLayout from '@/Layouts/GuestLayout';
import AdminLayout from '@/Layouts/AdminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Layout({ children }) {
    const [cookies] = useCookies(['access_token']); // Get the 'access_token' cookie

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const access_token = cookies.access_token;
        console.log("access_token", access_token);

        axios.post('/api/auth/me', {
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    // useEffect(() => {
    //     const fetchFlights = async () => {
    //         try {
    //             setLoadingFlights(true);
    //             const access_token = cookies.access_token;
    //             console.log("access_token", access_token);
    //             const flightsResponse = await axios.get('/api/flight',  {headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': 'Bearer ' + access_token
    //                 }}
    //             );
    //             // const flightsResponse = await axios.get('/api/flights', {params: {arrival_name:'Airport'}});
    //
    //
    //             // console.log('Cart API Response:', cartResponse.data);
    //             setFlights(flightsResponse.data);
    //         } catch (error) {
    //             if (error.response.status === 401) {
    //                 location.href='/login';
    //             }
    //             setErrorFlights(error.message);
    //         } finally {
    //             setLoadingFlights(false);
    //         }
    //     };
    //
    //     fetchFlights();
    // }, []);

    useEffect(() => {
        console.log("User state has changed:", user);
        // Do something else with the updated user state here
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const isAdmin = user && user.roles && user.roles.includes('admin');

    if (isAdmin) {
        return (
            <AdminLayout>
                <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg" style={{ backgroundColor: "#56B3F5" }}>
                    {children}
                </div>
            </AdminLayout>
        );
    }

    return user ? (
        <AuthenticatedLayout>
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg" style={{ backgroundColor: "#56B3F5" }}>
                {children}
            </div>
        </AuthenticatedLayout>
    ) : (
        <GuestLayout>
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg" style={{ backgroundColor: "#65c9d4" }}>
                {children}
            </div>
        </GuestLayout>
    );
}
