import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function closeSidebar() {
        setIsSidebarOpen(false);
    }

    return (
        <div className="dashboard-layout">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
            />

            <div className="dashboard-main">
                <Header
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="dashboard-content">
                    <Outlet />
                </main>

                <footer className="dashboard-footer">
                    <span>© 2026 Productly</span>
                    <span>Built with React & TypeScript</span>
                </footer>
            </div>
        </div>
    );
}