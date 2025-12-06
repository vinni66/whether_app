import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CloudSun, Map, Settings, Sun, Moon, Thermometer } from 'lucide-react';
import { ThemeContext } from './ThemeContext';
import { UnitContext } from './UnitContext';
import Credits from './Credits';
import './Sidebar.css';

function Sidebar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { units, toggleUnits } = useContext(UnitContext);
    return (
        <nav className="sidebar glass-panel">
            <div className="logo-area">
                <CloudSun size={32} className="logo-icon" />
                <span className="logo-text">Weather</span>
            </div>

            <div className="nav-links">
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={24} />
                    <span className="nav-label">Dashboard</span>
                </NavLink>
                <NavLink to="/forecast" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <CloudSun size={24} />
                    <span className="nav-label">Forecast</span>
                </NavLink>
                {/* Placeholder for map */}
                <div className="nav-item disabled">
                    <Map size={24} />
                    <span className="nav-label">Map</span>
                </div>
                <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Settings size={24} />
                    <span className="nav-label">Settings</span>
                </NavLink>
            </div>

            <div className="sidebar-footer">
                <button
                    className="toggle-btn"
                    onClick={toggleTheme}
                    title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                >
                    {theme === 'light' ? (
                        <Sun size={20} className="icon-sun" color="#f59e0b" fill="#f59e0b" />
                    ) : (
                        <Moon size={20} className="icon-moon" color="#60a5fa" fill="#60a5fa" />
                    )}
                </button>

                <button
                    className="toggle-btn"
                    onClick={toggleUnits}
                    title="Toggle Units (°C/°F)"
                >
                    <Thermometer size={18} style={{ marginRight: '4px' }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                        {units === 'metric' ? '°C' : '°F'}
                    </span>
                </button>
            </div>

            <Credits />
        </nav>
    );
}

export default Sidebar;
