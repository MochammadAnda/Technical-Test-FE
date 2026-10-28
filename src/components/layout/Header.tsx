import { Bell, Menu, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const location = useLocation();

    const pageTitles: Record<string, string> = {
        '/dashboard': 'Overview',
        '/products': 'Products',
    };

    const title = pageTitles[location.pathname] ?? 'Dashboard';

    return (
        <header className="dashboard-header">
            <div className="header-left">
                <button
                    type="button"
                    className="mobile-menu-button"
                    onClick={onMenuClick}
                    aria-label="Open navigation"
                >
                    <Menu size={22} />
                </button>

                <div>
                    <div className="header-breadcrumb">
                        Workspace <span>/</span> {title}
                    </div>

                    <h1>{title}</h1>
                </div>
            </div>

            <div className="header-actions">
                <span className="header-status">
                    <span className="status-dot" />
                    API Connected
                </span>

                <button
                    type="button"
                    className="header-icon-button"
                    aria-label="Search products"
                    onClick={() => {
                        if (location.pathname !== '/products') {
                            window.location.href = '/products';
                        } else {
                            document.getElementById('product-search')?.focus();
                        }
                    }}
                >
                    <Search size={19} />
                </button>

                <button
                    type="button"
                    className="header-icon-button notification-button"
                    aria-label="Notifications"
                    title="No new notifications"
                >
                    <Bell size={19} />
                </button>

                <div className="header-avatar" title="Demo account">
                    AD
                </div>
            </div>
        </header>
    );
}