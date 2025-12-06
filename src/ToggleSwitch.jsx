import React from 'react';
import './ToggleSwitch.css';

function ToggleSwitch({ isOn, onToggle, label }) {
    return (
        <div className="toggle-switch-container" onClick={onToggle}>
            <div className={`toggle-switch-track ${isOn ? 'on' : ''}`}>
                <div className="toggle-switch-knob" />
            </div>
            {label && <span className="toggle-label">{label}</span>}
        </div>
    );
}

export default ToggleSwitch;
