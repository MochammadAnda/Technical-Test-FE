import {
    LayoutDashboard,
    Package,
    LogOut,
    Leaf,
    X,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const navigate = useNavigate();

    function handleLogout() {
        authService.logout();
        navigate('/login', { replace: true });
    }

    const navItems = [
        {
            label: 'Overview',
            path: '/dashboard',
            icon: LayoutDashboard,
            end: true,
        },
        {
            label: 'Products',
            path: '/products',
            icon: Package,
            end: false,
        },
    ];

    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    className="sidebar-overlay"
                    aria-label="Close navigation"
                    onClick={onClose}
                />
            )}

            <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-brand">
                    <span className="brand-icon">
                        <Leaf size={24} />
                    </span>

                    <span className="sidebar-brand-name">productly</span>

                    <button
                        type="button"
                        className="sidebar-close"
                        onClick={onClose}
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="sidebar-section-label">WORKSPACE</div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                                }
                            >
                                <Icon size={19} />
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="sidebar-bottom">
                    <div className="sidebar-help-card">
                        <span className="help-icon">
                            <Leaf size={20} />
                        </span>

                        <strong>Productly Workspace</strong>

                        <p>Your product catalog, all in one place.</p>
                    </div>

                    <button
                        type="button"
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        <LogOut size={19} />
                        <span>Sign out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}