import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    Eye,
    EyeOff,
    Leaf,
    LockKeyhole,
    Mail,
} from 'lucide-react';
import { authService } from '../services/authService';

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (authService.isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');

        if (!email.trim() || !password) {
            setError('Email dan password wajib diisi.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError('Masukkan alamat email yang valid.');
            return;
        }

        setIsLoading(true);

        try {
            authService.login({ email, password });
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Terjadi kesalahan. Silakan coba kembali.',
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="login-page">
            <section className="login-brand-panel">
                <div className="brand-logo">
                    <span className="brand-icon">
                        <Leaf size={25} />
                    </span>
                    <span>productly</span>
                </div>

                <div className="brand-content">
                    <span className="eyebrow">PRODUCT MANAGEMENT, SIMPLIFIED</span>

                    <h1>
                        Everything you need.
                        <br />
                        One beautiful
                        <br />
                        workspace.
                    </h1>

                    <p>
                        Discover, organize, and explore your product catalog
                        through one simple, intuitive dashboard.
                    </p>

                    <div className="brand-statistics">
                        <div>
                            <strong>Smart</strong>
                            <span>Product discovery</span>
                        </div>
                        <div>
                            <strong>Simple</strong>
                            <span>Catalog management</span>
                        </div>
                        <div>
                            <strong>Fast</strong>
                            <span>Real-time API data</span>
                        </div>
                    </div>
                </div>

                <div className="brand-footer">
                    © 2026 Productly. Built for better product experiences.
                </div>
            </section>

            <section className="login-form-panel">
                <div className="login-form-container">
                    <div className="mobile-brand">
                        <span className="brand-icon">
                            <Leaf size={23} />
                        </span>
                        <span>productly</span>
                    </div>

                    <div className="login-heading">
                        <span className="eyebrow">WELCOME BACK</span>
                        <h2>Sign in to Productly</h2>
                        <p>Enter your credentials to access your workspace.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-field">
                            <label htmlFor="email">Email address</label>

                            <div className="input-wrapper">
                                <Mail size={19} aria-hidden="true" />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="admin@productly.demo"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    autoComplete="username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <div className="label-row">
                                <label htmlFor="password">Password</label>
                                <span className="field-hint">Demo account</span>
                            </div>

                            <div className="input-wrapper">
                                <LockKeyhole size={19} aria-hidden="true" />

                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword((current) => !current)}
                                    aria-label={
                                        showPassword ? 'Hide password' : 'Show password'
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="error-message" role="alert">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-submit"
                            disabled={isLoading}
                        >
                            <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
                            {!isLoading && <ArrowRight size={19} />}
                        </button>
                    </form>

                    <div className="demo-account">
                        <div className="demo-account-header">
                            <span className="demo-dot" />
                            <strong>Demo credentials</strong>
                        </div>

                        <p>
                            Email: <code>admin@productly.demo</code>
                        </p>
                        <p>
                            Password: <code>Productly123!</code>
                        </p>

                        <button
                            type="button"
                            className="demo-fill-button"
                            onClick={() => {
                                setEmail('admin@productly.demo');
                                setPassword('Productly123!');
                                setError('');
                            }}
                        >
                            Use demo account
                        </button>
                    </div>

                    <p className="login-disclaimer">
                        This application uses simulated authentication for demonstration.
                    </p>
                </div>
            </section>
        </main>
    );
}