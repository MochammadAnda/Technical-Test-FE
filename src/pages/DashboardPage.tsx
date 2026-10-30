import {
    ArrowRight,
    ArrowUpRight,
    Package,
    ShoppingBag,
    Star,
    Layers3,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { useDashboardStats } from '../components/hooks/useDashboardStats';

import Loading from '../components/common/Loading';
import ErrorState from '../components/common/ErrorState';

export default function DashboardPage() {
    const { stats, isLoading, error, retry } = useDashboardStats();

    const statCards = [
        {
            title: 'Total Products',
            value: stats?.totalProducts.toLocaleString('en-US') ?? '—',
            description: 'Products in the API catalog',
            icon: Package,
        },
        {
            title: 'Categories',
            value: stats?.totalCategories.toLocaleString('en-US') ?? '—',
            description: 'Available product categories',
            icon: Layers3,
        },
        {
            title: 'Average Rating',
            value: stats ? stats.averageRating.toFixed(1) : '—',
            description: 'Average rating of loaded products',
            icon: Star,
        },
        {
            title: 'Catalog Status',
            value: error ? 'Offline' : isLoading ? 'Loading' : 'Ready',
            description: error ? 'API request failed' : 'Product catalog overview',
            icon: ShoppingBag,
        },
    ];

    return (
        <div className="page-container">
            <section className="welcome-section">
                <div>
                    <span className="eyebrow">YOUR WORKSPACE</span>

                    <h2>Good to see you again!</h2>

                    <p>
                        Discover products, explore categories, and keep everything
                        organized in one place.
                    </p>

                    <Link to="/products" className="primary-button">
                        Explore Products
                        <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="welcome-illustration">
                    <div className="illustration-circle">
                        <ShoppingBag size={58} strokeWidth={1.3} />
                    </div>

                    <span className="illustration-decoration decoration-one">✦</span>
                    <span className="illustration-decoration decoration-two">✧</span>
                </div>
            </section>

            {isLoading ? (
                <Loading message="Loading dashboard statistics..." />
            ) : error ? (
                <ErrorState
                    message={error}
                    onRetry={retry}
                />
            ) : (
                <section className="section-block">
                    <div className="section-heading">
                        <div>
                            <h3>Catalog overview</h3>
                            <p>A quick look at your product workspace.</p>
                        </div>

                        <Link to="/products" className="text-link">
                            View catalog
                            <ArrowUpRight size={17} />
                        </Link>
                    </div>

                    <div className="stats-grid">
                        {statCards.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <article className="stat-card" key={stat.title}>
                                    <div className="stat-card-top">
                                        <span className="stat-icon">
                                            <Icon size={21} />
                                        </span>
                                    </div>

                                    <p className="stat-title">{stat.title}</p>
                                    <h3 className="stat-value">{stat.value}</h3>
                                    <p className="stat-description">{stat.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </section>
            )}

            <section className="getting-started-card">
                <div className="getting-started-icon">
                    <Package size={25} />
                </div>

                <div className="getting-started-content">
                    <h3>Your product catalog awaits</h3>

                    <p>
                        Browse products, search by name, filter categories, and
                        explore detailed product information.
                    </p>
                </div>

                <Link to="/products" className="secondary-button">
                    Browse catalog
                    <ArrowRight size={17} />
                </Link>
            </section>
        </div>
    );
}