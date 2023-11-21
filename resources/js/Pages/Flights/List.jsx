import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function List({ auth, flights}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Flights</h2>}
        >
            <Head title="Flights list" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        {flights.map((flight, index) => (
                            <li>
                                Flight id: {flight.id}, departure airport id: {flight.departure_airport_id},
                                arrival airport id: {flight.arrival_airport_id},
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
