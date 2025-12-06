import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Credits from './Credits';
import './Layout.css';

function Layout() {
    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <Outlet />
                <div className="mobile-credits-container">
                    <Credits />
                </div>
            </div>
        </div>
    );
}

export default Layout;
