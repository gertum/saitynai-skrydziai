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
                className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg"
                style={{backgroundColor: "#65c9d4"}}
            >

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
