const DEMO_EMAIL = 'admin@productly.demo';
const DEMO_PASSWORD = 'Productly123!';
const AUTH_KEY = 'productly_authenticated';

export interface LoginCredentials {
    email: string;
    password: string;
}

export const authService = {
    login(credentials: LoginCredentials): boolean {
        const email = credentials.email.trim().toLowerCase();

        if (
            email !== DEMO_EMAIL ||
            credentials.password !== DEMO_PASSWORD
        ) {
            throw new Error('Email atau password yang Anda masukkan salah.');
        }

        sessionStorage.setItem(AUTH_KEY, 'true');

        return true;
    },

    isAuthenticated(): boolean {
        return sessionStorage.getItem(AUTH_KEY) === 'true';
    },

    logout(): void {
        sessionStorage.removeItem(AUTH_KEY);
    },
};