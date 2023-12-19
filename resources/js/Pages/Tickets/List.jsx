import { useEffect, useState } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import Layout from "../../Layouts/Layout.jsx";

export default function TicketList({ auth }) {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/ticket'); // Replace with your endpoint
                setTickets(response.data);
            } catch (error) {
                setError('Error fetching tickets');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return (
        <Layout auth={auth}>
            <Head title="Tickets list" />
            <div
                className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center sm:rounded-lg"
                style={{backgroundColor: "#65c9d4"}}
            >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-gray-200 shadow sm:rounded-lg ">
                        <h1>Tickets</h1>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Flight ID</th>
                                    <th>Sold</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tickets.map((ticket, index) => (
                                    <tr key={index}>
                                        <td>{ticket.id}</td>
                                        <td>{ticket.flight_id}</td>
                                        <td>{ticket.purchased ? 'true' : 'false'}</td>
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
