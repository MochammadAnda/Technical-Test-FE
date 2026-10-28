import { Search, X } from 'lucide-react';

interface ProductFiltersProps {
    search: string;
    category: string;
    categories: string[];
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onReset: () => void;
}

export default function ProductFilters({
    search,
    category,
    categories,
    onSearchChange,
    onCategoryChange,
    onReset,
}: ProductFiltersProps) {
    const hasFilters = search.trim() !== '' || category !== '';

    return (
        <div className="product-filters">
            <div className="product-search">
                <Search size={19} />

                <input
                    id="product-search"
                    type="search"
                    placeholder="Search products by name..."
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    aria-label="Search products"
                />

                {search && (
                    <button
                        type="button"
                        className="search-clear-button"
                        onClick={() => onSearchChange('')}
                        aria-label="Clear search"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <div className="product-category-select">
                <label htmlFor="category-filter">Category</label>

                <select
                    id="category-filter"
                    value={category}
                    onChange={(event) => onCategoryChange(event.target.value)}
                >
                    <option value="">All categories</option>

                    {categories.map((item) => (
                        <option key={item} value={item}>
                            {item
                                .split('-')
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')}
                        </option>
                    ))}
                </select>
            </div>

            {hasFilters && (
                <button
                    type="button"
                    className="clear-filters-button"
                    onClick={onReset}
                >
                    Clear filters
                </button>
            )}
        </div>
    );
}