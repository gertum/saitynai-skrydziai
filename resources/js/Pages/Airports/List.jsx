import { useEffect, useState } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import Layout from "../../Layouts/Layout.jsx";

export default function List({auth}) {
    const [airports, setAirports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAirports = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/airport'); // Adjust the endpoint accordingly
                setAirports(response.data);
            } catch (error) {
                setError('Error fetching airports');
            } finally {
                setLoading(false);
            }
        };

        fetchAirports();
    }, []);

    return (
        <Layout auth={auth}>
            <Head title="Airports list" />
            <div
                className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg"
                style={{backgroundColor: "#65c9d4"}}
            >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-gray-200 shadow sm:rounded-lg ">
                        <h1>Airports</h1>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>IATA Code</th>
                                    <th>City</th>
                                    <th>Country ID</th>
                                </tr>
                                </thead>
                                <tbody>
                                {airports.map((airport, index) => (
                                    <tr key={index}>
                                        <td>{airport.id}</td>
                                        <td>{airport.name}</td>
                                        <td>{airport.iata_code}</td>
                                        <td>{airport.city}</td>
                                        <td>{airport.country_id}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
