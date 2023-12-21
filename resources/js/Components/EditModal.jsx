import React, { useState } from 'react';
import Modal from 'react-modal';
import {useCookies} from "react-cookie";

const EditModal = ({ isOpen, handleClose }) => {

    const [itemId, setItemId] = useState('');
    const [cookies] = useCookies(['access_token']); // Get the 'access_token' cookie

    const url = window.location.pathname;
    const handleEdit = async () => {
        if (url === '/airports') {
            try {
                // Redirect to the edit airport page passing the airportId as a parameter
                window.location.href = `/edit-airport/${itemId}`;
            } catch (error) {
                console.error('Error editing airport:', error);
                // Handle error
            }
        } else if (url === '/') {
            try {
                // Redirect to the edit airport page passing the airportId as a parameter
                window.location.href = `/edit-flight/${itemId}`;
            } catch (error) {
                console.error('Error editing flight:', error);
                // Handle error
            }
        } else if (url === '/tickets') {
            try {
                // Redirect to the edit airport page passing the airportId as a parameter
                window.location.href = `/edit-ticket/${itemId}`;
            } catch (error) {
                console.error('Error editing ticket:', error);
                // Handle error
            }
        } else {
            console.error('Logic for editing this item is not implemented');
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
            <h2>Edit Item</h2>
            <p>Input id of item you wish to edit</p>
            <input name="item_id"
                   value={itemId}
                   onChange={handleInputChange}></input>
            <div></div>

            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleEdit}>Edit</button>
        </Modal>
    );
};

export default EditModal;
