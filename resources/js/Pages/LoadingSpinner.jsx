import React from 'react';
import '/resources/css/LoadingSpinner.css'; // Import your CSS file

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingSpinner;
