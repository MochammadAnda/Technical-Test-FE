import { LoaderCircle } from 'lucide-react';

interface LoadingProps {
    message?: string;
}

export default function Loading({
    message = 'Loading products...',
}: LoadingProps) {
    return (
        <div className="state-container" role="status" aria-live="polite">
            <LoaderCircle className="loading-spinner" size={34} />
            <h3>Please wait</h3>
            <p>{message}</p>
        </div>
    );
}