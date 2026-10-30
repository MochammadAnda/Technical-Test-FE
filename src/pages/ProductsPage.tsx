import { Package, SlidersHorizontal } from 'lucide-react';

import { useProductCatalog } from '../components/hooks/useProductCatalog';

import Loading from '../components/common/Loading';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';

import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import ProductDetailModal from '../components/products/ProductDetailModal';

const PAGE_SIZE = 12;

export default function ProductsPage() {
    const {
        products,
        categories,
        filteredProducts,
        paginatedProducts,
        isLoading,
        error,
        retry,
        search,
        category,
        changeSearch,
        changeCategory,
        resetFilters,
        currentPage,
        totalPages,
        firstItem,
        lastItem,
        goToPage,
        selectedProduct,
        selectProduct,
        clearSelectedProduct,
    } = useProductCatalog(PAGE_SIZE);

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
                    onSearchChange={changeSearch}
                    onCategoryChange={changeCategory}
                    onReset={resetFilters}
                />
            </section>

            {isLoading ? (
                <Loading message="Fetching products from DummyJSON..." />
            ) : error ? (
                <ErrorState message={error} onRetry={retry} />
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
                        onViewDetails={selectProduct}
                    />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                    />
                </>
            )}

            <ProductDetailModal
                product={selectedProduct}
                onClose={clearSelectedProduct}
            />
        </div>
    );
}
