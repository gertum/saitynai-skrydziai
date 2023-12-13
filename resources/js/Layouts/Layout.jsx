// Layout.jsx
import AuthenticatedLayout from '@/Layouts/MemberLayout.jsx';
import GuestLayout from '@/Layouts/GuestLayout';

//my auth is different now i think :/
export default function Layout({ auth, children }) {
    return auth.user ? (
        //only handles member now :)
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
    ) : (
        <GuestLayout>{children}</GuestLayout>
    );
}
