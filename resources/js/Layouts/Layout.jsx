// import MemberLayout from '@/Layouts/MemberLayout.jsx';
// import GuestLayout from '@/Layouts/GuestLayout';
// import AdminLayout from '@/Layouts/AdminLayout';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
//
// export default function Layout({ children }) {
//     const [cookies] = useCookies(['access_token']); // Get the 'access_token' cookie
//
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const access_token = cookies.access_token;
//         console.log("access_token", access_token);
//
//         axios.get('/api/auth/me', {
//             headers: {
//                 'Authorization': 'Bearer ' + access_token,
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then((response) => {
//                 setUser(response.data);
//                 const isAdmin = hasRole(user, 'admin');
//             })
//             .catch(() => {
//                 setUser(null);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }, []);
//
//
//     useEffect(() => {
//         console.log("User state has changed:", user);
//         // Do something else with the updated user state here
//     }, [user]);
//
//     if (loading) {
//         return <p>Loading...</p>;
//     }
//
//     const isAdmin = user && user.roles && user.roles.includes('admin');
//
//     if (isAdmin) {
//         return (
//             <AdminLayout>
//                 <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg" style={{ backgroundColor: "#66D4BA" }}>
//                     {children}
//                 </div>
//             </AdminLayout>
//         );
//     }
//
//     console.log(user);
//     return user ? (
//         <MemberLayout>
//             <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg" style={{ backgroundColor: "#66A6D4" }}>
//                 {children}
//             </div>
//         </MemberLayout>
//     ) : (
//         <GuestLayout>
//             <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg" style={{ backgroundColor: "#65c9d4" }}>
//                 {children}
//             </div>
//         </GuestLayout>
//     );
// }


import MemberLayout from '@/Layouts/MemberLayout.jsx';
import GuestLayout from '@/Layouts/GuestLayout';
import AdminLayout from '@/Layouts/AdminLayout';

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
                setUser(response.data);
                // const isAdmin = hasRole(user, 'admin');
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

    // if (!$user->hasRole(UserRoleSeeder::ROLE_ADMIN)) {
    //     throw new UnauthorizedException(401, 'Admin role needed');
    // }
    //
    // const isAdmin = user && user.roles && user.roles.includes('admin');

    // if (isAdmin) {
    //     return (
    //         <div
    //             className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg"
    //             style={{backgroundColor: "#66D4BA"}}>
    //             AAAAAAAAAAAAAAAAAAA
    //         </div>
    // );
    // }

    return user ? (
        <MemberLayout>
        <div
            className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg"
            style={{backgroundColor: "#66A6D4"}}>
            { children }
        </div>
        </MemberLayout>
    ) : (
        <GuestLayout>
        <div
            className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg"
            style={{backgroundColor: "#65c9d4"}}>
            { children }
        </div>
        </GuestLayout>
    );
}
