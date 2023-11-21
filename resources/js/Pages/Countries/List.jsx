import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function List({ auth, countries }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Countries</h2>}
        >
            <Head title="Countries list" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        {countries.map((country, index) => (
                            <li>
                            {country.id} : {country.name}
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
