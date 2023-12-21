import React, { useState } from 'react';
import Modal from 'react-modal';
import {useCookies} from "react-cookie";

const AddModal = ({ isOpen, handleClose }) => {
    const [itemId, setItemId] = useState('');
    const [cookies] = useCookies(['access_token']); // Get the 'access_token' cookie

    const url = window.location.pathname;
    const handleAdd = async () => {
        if (url === '/airports') {
            try {
                // Redirect to the edit airport page passing the airportId as a parameter
                window.location.href = `/add-airport/${itemId}`;
            } catch (error) {
                console.error('Error adding airport:', error);
                // Handle error
            }
        } else if (url === '/') {
            try {
                // Redirect to the edit airport page passing the airportId as a parameter
                window.location.href = `/add-flight/${itemId}`;
            } catch (error) {
                console.error('Error adding flight', error);
                // Handle error
            }
            // Logic for handling the root route
            // For example, displaying some default content or redirecting to a different page
        } else if (url === '/tickets') {
            try {
                // Redirect to the edit airport page passing the airportId as a parameter
                window.location.href = `/add-ticket/${itemId}`;
            } catch (error) {
                console.error('Error adding ticket:', error);
                // Handle error
            }
            // Logic for handling the /tickets route
            // For example, fetching ticket data or displaying ticket-related content
        } else {
            console.error('Logic for adding this item is not implemented');
            // Handle other routes or use a default logic
        }

    }
    const handleInputChange = (e) => {
        // Capture the input value for the item ID
        setItemId(e.target.value);
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            ariaHideApp={false} // To prevent accessibility error
            className="react-modal"
        >
            {/* Content for the Add Modal */}
            <h2>Add Item</h2>

            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleAdd}>Add</button>
        </Modal>
    );
};

export default AddModal;
