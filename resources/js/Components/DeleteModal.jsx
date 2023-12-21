import React, { useState } from 'react';
import Modal from 'react-modal';
import { useCookies } from 'react-cookie';
const DeleteModal = ({ isOpen, handleClose }) => {

    //TODO čia baisu :)
    const currentPath = window.location.pathname;
    let url = currentPath.slice(0, -1);
    if (!url) {
        url = '/flight';
    }
    const [itemId, setItemId] = useState('');
    const [cookies] = useCookies(['access_token']); // Get the 'access_token' cookie

    const handleDelete = async () => {
        try {

            const access_token = cookies.access_token;
            console.log("access_token", access_token);

            axios.delete(`/api${url}/${itemId}`, {
                headers: {
                    "Authorization": 'Bearer ' + access_token,
                    "Content-Type": "application/json"
                }
                }
            )

                .then(response => {
                    window.location.reload();
                    console.log(`Deleted item id: ${itemId}`);
                })
                .catch(error => {
                    console.error(error);
                });
            // Make an API call to delete the item using the captured ID
            // await axios.delete(`/api/items/${itemId}`);

            // After successful deletion, you can perform necessary actions
            // For instance, you might want to update state or close the modal
            handleClose();
        } catch (error) {
            console.error('Deletion failed:', error);
            // Handle deletion error (e.g., show an error message)
        }
    };
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
            {/* Content for the Delete Modal */}
            <h2>Delete Item</h2>
                <p>Input id of item you wish to delete</p>
                <input name="item_id"
                       value={itemId}
                       onChange={handleInputChange}></input>
        <div></div>

            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
        </Modal>
    );
};

export default DeleteModal;
