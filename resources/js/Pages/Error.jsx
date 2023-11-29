

export default function Welcome({error}) {


    return (
        <>
            <Head title="Error"/>
            <div
                className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 text-white">
                <p>{error}</p>
            </div>

        </>
    );
}
