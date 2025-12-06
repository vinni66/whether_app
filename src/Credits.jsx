import React from 'react';
import './Sidebar.css'; // Re-use existing styles or add new ones

const Credits = ({ className = '' }) => {
    return (
        <div className={`credits-section ${className}`}>
            <span className="credits-text">Designed & Developed by</span>
            <span className="credits-sub">Vinaya S B & Vinayak M Baratakke</span>
        </div>
    );
};

export default Credits;
