import React from 'react';
import './index.css'; 

function Alert({ message, type = 'info' }) {
    return (
        <div className={`alert alert-${type}`}>
            {message}
        </div>
    );
}

export default Alert;
