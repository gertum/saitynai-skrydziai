import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function TestMe() {
    const [cookies] = useCookies(['access_token']); // Get the 'access_token' cookie

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const access_token = cookies.access_token;
    console.log("access_token", access_token);

    // const axiosInstance = axios.create({
    //
    //     baseURL: 'https://api.example.com',
    //     timeout: 5000, // request timeout in milliseconds
    //     headers: {
    //         'Authorization': 'Bearer ' + access_token,
    //         'Content-Type': 'application/json'
    //         // other default headers...
    //     },
    // });

    // export default axiosInstance;

    useEffect(() => {
        const access_token = cookies.access_token;
        console.log("access_token", access_token);

        axios.post('/api/auth/me', {}, {
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }
        })
        // axiosInstance.get('/api/auth/me')
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
            <div
                className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg"
                style={{backgroundColor: "#56B3F5"}}>
                AAAAAAAAAAAAAAAAAAA
            </div>
    );
    }

    return user ? (
        <div
            className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg"
            style={{backgroundColor: "#56B3F5"}}>
            BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
        </div>
    ) : (
        <div
            className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg"
            style={{backgroundColor: "#56B3F5"}}>
            CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCc
        </div>
    );
}
