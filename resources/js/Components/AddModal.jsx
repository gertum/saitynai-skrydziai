import React, { useState } from 'react';
import Modal from 'react-modal';

const AddModal = ({ isOpen, handleClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            ariaHideApp={false} // To prevent accessibility error
            className="react-modal"
        >
            {/* Content for the Add Modal */}
            <h2>Add Item</h2>
            {/* Add form or input fields */}
            <button onClick={handleClose}>Close Modal</button>
        </Modal>
    );
};

export default AddModal;
