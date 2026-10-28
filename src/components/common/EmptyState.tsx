import { PackageSearch } from 'lucide-react';

interface EmptyStateProps {
    title?: string;
    message?: string;
    onReset?: () => void;
}

export default function EmptyState({
    title = 'No products found',
    message = 'Try changing your search or category filter.',
    onReset,
}: EmptyStateProps) {
    return (
        <div className="state-container">
            <div className="state-icon">
                <PackageSearch size={30} />
            </div>

            <h3>{title}</h3>
            <p>{message}</p>

            {onReset && (
                <button
                    type="button"
                    className="secondary-outline-button"
                    onClick={onReset}
                >
                    Clear filters
                </button>
            )}
        </div>
    );
}