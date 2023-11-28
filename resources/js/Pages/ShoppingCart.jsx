import { Link, Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ShoppingCart() {
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
        <>
            <Head title="Shopping Cart" />
            {/* Your layout structure */}
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
                                <th>Item ID</th>
                                <th>Item Name</th>
                                {/* Add more columns for details */}
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    {/* Render more item details */}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}
