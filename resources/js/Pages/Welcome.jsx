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

    // useEffect(() => {
    //     const appendColumnToRows = () => {
    //         const rows = document.querySelectorAll('.list tbody tr'); // Target specific table rows within the "list" class
    //
    //         rows.forEach((row) => {
    //             const newCell = document.createElement('td');
    //             newCell.textContent = 'New Column Data'; // Replace with your desired content
    //
    //             row.appendChild(newCell);
    //         });
    //     };
    //
    //     appendColumnToRows();
    // }, []);
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
                            <table className="list">
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
        </Layout>
    );
}
