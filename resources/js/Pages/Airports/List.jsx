import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function List({ auth, airports}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Airports list" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        {airports.map((airport, index) => (
                            <li>
                                {airport.id}: {airport.name}, {airport.iata_code}, {airport.city} in country id'd as {airport.country_id}
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
