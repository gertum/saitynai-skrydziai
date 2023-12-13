// Layout.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Layout({ auth, children }) {
    return auth.user ? (
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
    ) : (
        <GuestLayout>{children}</GuestLayout>
    );
}
