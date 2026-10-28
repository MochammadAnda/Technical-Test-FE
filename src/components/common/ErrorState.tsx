import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
    message?: string;
    onRetry: () => void;
}

export default function ErrorState({
    message = 'Something went wrong while loading the data.',
    onRetry,
}: ErrorStateProps) {
    return (
        <div className="state-container" role="alert">
            <div className="state-icon state-icon-error">
                <AlertCircle size={28} />
            </div>

            <h3>Unable to load data</h3>
            <p>{message}</p>

            <button
                type="button"
                className="primary-button state-retry-button"
                onClick={onRetry}
            >
                <RefreshCw size={16} />
                Try again
            </button>
        </div>
    );
}