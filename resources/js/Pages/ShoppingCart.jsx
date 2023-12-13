import {Link, Head} from '@inertiajs/react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/MemberLayout.jsx';


export default function ShoppingCart({ auth }) {
        const [cartItems, setCartItems] = useState([]);
    const [loadingCart, setLoadingCart] = useState(false);
    const [errorCart, setErrorCart] = useState('');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoadingCart(true);
                const cartResponse = await axios.get('/api/cart'); // Replace with your API endpoint
                setCartItems(cartResponse.data);
            } catch (error) {
                setErrorCart(error.message);
            } finally {
                setLoadingCart(false);
            }
        };

        fetchCartItems();
    }, []);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Shopping Cart</h2>}
        >
            <Head title="Shopping Cart"/>

                         <div className="max-w-7xl mx-auto p-6 lg:p-8">
                             <div className="p-4 sm:p-8 bg-gray-200 mx-auto shadow sm:rounded-lg custom-margins text-center">
                                 <h1 className="mb-4">Shopping Cart</h1>
                                 {/* Your shopping cart UI */}
                                 {loadingCart ? (
                        <p>Loading cart...</p>
                    ) : errorCart ? (
                        <p>Error fetching cart: {errorCart}</p>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Flight ID</th>
                                <th>Departure airport</th>
                                <th>Arrival airport</th>
                                {/*time below*/}
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>Price</th>
                                {/* Add more columns for details */}
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.flight.id}</td>
                                    <td>{item.flight.departure.name}</td>
                                    <td>{item.flight.arrival.name}</td>
                                    <td>
                                        {item.flight.real_time ? (
                                            <p>{item.flight.real_departure_time}</p>
                                        ) : (
                                            <p>{item.flight.estimated_departure_time}</p>
                                        )}
                                    </td>
                                    <td>
                                        {item.flight.real_time ? (
                                            <p>{item.flight.real_arrival_time}</p>
                                        ) : (
                                            <p>{item.flight.estimated_arrival_time}</p>
                                        )}
                                    </td>
                                    <td>{item.price} €</td>
                                    <td>
                                        <a href="#" className="text-red-500">Remove ticket from cart</a>

                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>

                    )}


                </div>
                             <div><button type="button">Checkout</button></div>
            </div>
        </AuthenticatedLayout>
    );
}
