import React, { useState } from 'react';
import Modal from 'react-modal';

const TicketModal = ({ isOpen, handleClose, tickets }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            ariaHideApp={false} // To prevent accessibility error
        >
            <h2>Available Tickets</h2>
            {tickets.map((ticket) => (
                <div key={ticket.id}>
                    <p>Price: {ticket.price}</p>
                    {/* Display other ticket information */}
                </div>
            ))}
            <button onClick={handleClose}>Close Modal</button>
        </Modal>
    );
};

export default TicketModal;
