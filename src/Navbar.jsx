import { NavLink } from 'react-router-dom';
import './Navbar.css'; // This path is correct relative to the new location

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/forecast">Forecast</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </nav>
  );
}

export default Navbar;