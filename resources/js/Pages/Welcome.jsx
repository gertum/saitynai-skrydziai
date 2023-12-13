import {Link, Head} from '@inertiajs/react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import Layout from "../Layouts/Layout.jsx";

export default function Welcome({auth}) {
    const [cookies] = useCookies(["access_token"]);

    const [flights, setFlights] = useState([]);
    const [loadingFlights, setLoadingFlights] = useState(false);
    const [errorFlights, setErrorFlights] = useState('');

//     const [offset, setOffset] = useState(0); // Initialize offset for pagination
//     const limit = 10; // Define the limit for the number of flights per request
//     // const scrollContainerRef = useRef(null);
//
// // Function to fetch more flights
//     const fetchMoreFlights = async () => {
//         // event.preventDefault();
//         try {
//             setLoadingFlights(true);
//             const access_token = cookies.access_token;
//             const newFlightsResponse = await axios.get(`/api/flight?offset=${offset + limit}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer ' + access_token
//                 }
//             });
//
//             // Append new flights to the existing flights list
//             setFlights(prevFlights => [...prevFlights, ...newFlightsResponse.data]);
//             setOffset(prevOffset => prevOffset + limit); // Update the offset for the next call
//         } catch (error) {
//             setErrorFlights(error.message);
//         } finally {
//             setLoadingFlights(false);
//         }
//     };
//
// // Function to handle scroll events
//     const handleScroll = () => {
//         const { scrollTop, clientHeight, scrollHeight } = document.documentElement || document.body;
//         if (scrollHeight - scrollTop === clientHeight) {
//             // User has scrolled to the bottom
//             fetchMoreFlights(); // Fetch more flights when reaching the bottom
//         }
//     };


    useEffect(() => {
        const fetchFlights = async () => {
            try {
                setLoadingFlights(true);
                const access_token = cookies.access_token;
                console.log("access_token", access_token);
                const flightsResponse = await axios.get('/api/flight',  {headers: {
                    'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + access_token
                }}
                );
                // const flightsResponse = await axios.get('/api/flights', {params: {arrival_name:'Airport'}});


                // console.log('Cart API Response:', cartResponse.data);
                setFlights(flightsResponse.data);
            } catch (error) {
                if (error.response.status === 401) {
                    location.href='/login';
                }
                setErrorFlights(error.message);
            } finally {
                setLoadingFlights(false);
            }
        };

        fetchFlights();
    }, []);
// // Add event listener to the window for scroll detection
//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

    // //TODO
    // const handleAddTicketClick = async (flightId) => {
    //     //simple add
    //
    //     try {
    //         await axios.get(`/api/cart/add/${flightId}`);
    //         console.log('Ticket added to cart'); // Optional success message
    //     } catch (error) {
    //         console.error('Error adding ticket to cart:', error);
    //         // Handle errors as needed
    //         //TODO
    //     }
    // };

    return (
        <Layout auth={auth}>
            <Head title="Welcome"/>
            <div
                className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white sm:rounded-lg">
                {/*<div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">*/}
                {/*    {auth.user ? (*/}
                {/*        <Link*/}
                {/*            href={route('dashboard')}*/}
                {/*            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"*/}
                {/*        >*/}
                {/*            Dashboard*/}
                {/*        </Link>*/}
                {/*    ) : (*/}
                {/*        <>*/}
                {/*            <Link*/}
                {/*                href={route('login')}*/}
                {/*                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"*/}
                {/*            >*/}
                {/*                Log in*/}
                {/*            </Link>*/}

                {/*            <Link*/}
                {/*                href={route('register')}*/}
                {/*                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"*/}
                {/*            >*/}
                {/*                Register*/}
                {/*            </Link>*/}
                {/*        </>*/}
                {/*    )}*/}

                {/*    <div>*/}
                {/*        <Link*/}
                {/*            href={route('cart')}*/}
                {/*            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"*/}
                {/*        >*/}
                {/*            Shopping cart*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="max-w-7xl mx-auto p-6 lg:p-8">

                    <div className="p-4 sm:p-8 bg-gray-200 mx-auto shadow sm:rounded-lg custom-margins text-center">
                        <h1 className="mb-4">Flights</h1>
                        <p className="mb-4">
                            Search by departure airport:
                            <input className="custom-margins shadow sm:rounded-lg " type="search"
                                   placeholder="Search..."/>
                            Search by arrival airport:
                            <input className="custom-margins shadow sm:rounded-lg " type="search"
                                   placeholder="Search..."/>
                            {/*<button type="button">Search!</button>*/}
                        </p>
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-200 mx-auto shadow sm:rounded-lg custom-margins">
                        {loadingFlights ? (
                            <p>Loading flights...</p>
                        ) : errorFlights ? (
                            <p>Error fetching flights: {errorFlights}</p>
                        ) : (
                            <table>
                                <thead>
                                <tr>
                                    <th>Flight ID</th>
                                    <th>Departure Airport</th>
                                    <th>Arrival Airport</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                </tr>
                                </thead>
                                <tbody>
                                {flights.map((flight, index) => (
                                    <tr key={index}>
                                        <td>{flight.id}</td>
                                        <td>{flight.departure.name}, {flight.departure.country.name}</td>
                                        <td>{flight.arrival.name}, {flight.arrival.country.name}</td>
                                        <td>
                                            {flight.real_time ? (
                                                <p>{flight.real_departure_time}</p>
                                            ) : (
                                                <p>{flight.estimated_departure_time}</p>
                                            )}
                                        </td>
                                        <td>
                                            {flight.real_time ? (
                                                <p>{flight.real_arrival_time}</p>
                                            ) : (
                                                <p>{flight.estimated_arrival_time}</p>
                                            )}
                                        </td>
                                        {/*<td>*/}
                                        {/*    <a href="#" className="text-red-500" onClick={() => handleAddTicketClick(flightId)}>*/}
                                        {/*        Add ticket to cart*/}
                                        {/*    </a>*/}
                                        {/*</td>*/}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>


            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </Layout>
    );
}
