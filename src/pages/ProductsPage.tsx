import { useCallback, useEffect, useMemo, useState } from 'react';
import { Package, SlidersHorizontal } from 'lucide-react';

import type { Product } from '../types/product';
import { productService } from '../services/productService';

import Loading from '../components/common/Loading';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';

import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import ProductDetailModal from '../components/products/ProductDetailModal';

const PAGE_SIZE = 12;

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError('');

        try {
            const [productResponse, categoryResponse] = await Promise.all([
                productService.getProducts(),
                productService.getCategories(),
            ]);

            if (!Array.isArray(productResponse.products)) {
                throw new Error('The API returned an invalid product list.');
            }

            if (!Array.isArray(categoryResponse)) {
                throw new Error('The API returned invalid category data.');
            }

            const validProducts = productResponse.products.filter(
                (product): product is Product =>
                    typeof product.id === 'number' &&
                    typeof product.title === 'string' &&
                    typeof product.price === 'number' &&
                    typeof product.thumbnail === 'string',
            );

            setProducts(validProducts);
            setCategories(
                categoryResponse.filter(
                    (item): item is string =>
                        typeof item === 'string' && item.trim().length > 0,
                ),
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to retrieve product data. Please try again.',
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchProducts();
    }, [fetchProducts]);

    const filteredProducts = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(normalizedSearch);

            const matchesCategory =
                category === '' || product.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [products, search, category]);

    const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;

        return filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);
    }, [filteredProducts, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category]);

    const firstItem =
        filteredProducts.length === 0
            ? 0
            : (currentPage - 1) * PAGE_SIZE + 1;

    const lastItem = Math.min(
        currentPage * PAGE_SIZE,
        filteredProducts.length,
    );

    function resetFilters() {
        setSearch('');
        setCategory('');
        setCurrentPage(1);
    }

    return (
        <div className="products-page">
            <section className="products-intro">
                <div>
                    <span className="eyebrow">PRODUCT MANAGEMENT</span>

                    <h2>Explore your products</h2>

                    <p>
                        Discover the catalog, find what you need, and explore
                        product information in one place.
                    </p>
                </div>

                <div className="products-intro-icon">
                    <Package size={34} />
                </div>
            </section>

            <section className="products-toolbar">
                <div className="products-toolbar-heading">
                    <div>
                        <h3>All products</h3>

                        <p>
                            {isLoading
                                ? 'Loading catalog...'
                                : error
                                    ? 'Catalog unavailable'
                                    : `${filteredProducts.length} products found`}
                        </p>
                    </div>

                    <div className="products-toolbar-label">
                        <SlidersHorizontal size={16} />
                        <span>Find your product</span>
                    </div>
                </div>

                <ProductFilters
                    search={search}
                    category={category}
                    categories={categories}
                    onSearchChange={setSearch}
                    onCategoryChange={setCategory}
                    onReset={resetFilters}
                />
            </section>

            {isLoading ? (
                <Loading message="Fetching products from DummyJSON..." />
            ) : error ? (
                <ErrorState message={error} onRetry={() => void fetchProducts()} />
            ) : filteredProducts.length === 0 ? (
                <EmptyState
                    title={products.length === 0 ? 'No products available' : 'No matching products'}
                    message={
                        products.length === 0
                            ? 'The catalog is currently empty.'
                            : 'Try a different search term or select another category.'
                    }
                    onReset={resetFilters}
                />
            ) : (
                <>
                    <div className="products-results-info">
                        <p>
                            Showing <strong>{firstItem}–{lastItem}</strong> of{' '}
                            <strong>{filteredProducts.length}</strong> products
                        </p>
                    </div>

                    <ProductGrid
                        products={paginatedProducts}
                        onViewDetails={setSelectedProduct}
                    />

                    {totalPages > 1 && (
                        <nav className="pagination" aria-label="Product pagination">
                            <button
                                type="button"
                                className="pagination-button"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((page) => Math.max(1, page - 1))
                                }
                            >
                                Previous
                            </button>

                            <div className="pagination-pages">
                                {Array.from({ length: totalPages }, (_, index) => index + 1)
                                    .filter(
                                        (page) =>
                                            page === 1 ||
                                            page === totalPages ||
                                            Math.abs(page - currentPage) <= 1,
                                    )
                                    .map((page, index, pages) => {
                                        const previousPage = pages[index - 1];
                                        const hasGap =
                                            previousPage !== undefined &&
                                            page - previousPage > 1;

                                        return (
                                            <span className="pagination-item" key={page}>
                                                {hasGap && <span className="pagination-ellipsis">…</span>}

                                                <button
                                                    type="button"
                                                    className={`pagination-number ${page === currentPage ? 'pagination-number-active' : ''
                                                        }`}
                                                    aria-current={page === currentPage ? 'page' : undefined}
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    {page}
                                                </button>
                                            </span>
                                        );
                                    })}
                            </div>

                            <button
                                type="button"
                                className="pagination-button"
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                                }
                            >
                                Next
                            </button>
                        </nav>
                    )}
                </>
            )}

            <ProductDetailModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
}