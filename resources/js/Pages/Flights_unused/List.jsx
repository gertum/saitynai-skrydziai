import AuthenticatedLayout from '@/Layouts/MemberLayout.jsx';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function List({ auth }) {
    const [flights, setFlights] = useState([]);
    const [loadingFlights, setLoadingFlights] = useState(false);
    const [errorFlights, setErrorFlights] = useState('');

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                setLoadingFlights(true);
                const flightsResponse = await axios.get('/api/flights'); // Adjust the API endpoint accordingly
                setFlights(flightsResponse.data);
            } catch (error) {
                setErrorFlights(error.message);
            } finally {
                setLoadingFlights(false);
            }
        };

        fetchFlights();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Flights</h2>}
        >
            <Head title="Flights list" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        {loadingFlights ? (
                            <p>Loading flights...</p>
                        ) : errorFlights ? (
                            <p>Error fetching flights: {errorFlights}</p>
                        ) : (
                            <ul>
                                {flights.map((flight, index) => (
                                    <li key={index}>
                                        Flight id: {flight.id}, departure airport id: {flight.departure_airport_id},
                                        arrival airport id: {flight.arrival_airport_id},
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
