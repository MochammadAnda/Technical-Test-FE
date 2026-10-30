import { useMemo, useState } from 'react';

import type { Product } from '../../types/product';
import { filterProducts, paginate } from '../../utils/productUtils';
import { useProducts } from './useProducts';

/**
 * State & logika untuk halaman katalog: pencarian, filter kategori, dan pagination.
 * Halaman cukup memanggil hook ini lalu merender hasilnya.
 */
export function useProductCatalog(pageSize: number) {
    const { products, categories, isLoading, error, retry } = useProducts();

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = useMemo(
        () => filterProducts(products, search, category),
        [products, search, category],
    );

    const { items, totalPages, firstItem, lastItem } = useMemo(
        () => paginate(filteredProducts, currentPage, pageSize),
        [filteredProducts, currentPage, pageSize],
    );

    // Setiap filter berubah, kembali ke halaman pertama.
    const changeSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const changeCategory = (value: string) => {
        setCategory(value);
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setSearch('');
        setCategory('');
        setCurrentPage(1);
    };

    return {
        // data
        products,
        categories,
        filteredProducts,
        paginatedProducts: items,
        // status
        isLoading,
        error,
        retry,
        // filter
        search,
        category,
        changeSearch,
        changeCategory,
        resetFilters,
        // pagination
        currentPage,
        totalPages,
        firstItem,
        lastItem,
        goToPage: setCurrentPage,
        // modal
        selectedProduct,
        selectProduct: setSelectedProduct,
        clearSelectedProduct: () => setSelectedProduct(null),
    };
}
