import { useCallback, useEffect, useState } from 'react';

import { productService } from '../../services/productService';
import type { Product } from '../../types/product';
import { sanitizeCategories, sanitizeProducts } from '../../utils/productUtils';

interface UseProductsResult {
    products: Product[];
    categories: string[];
    total: number;
    isLoading: boolean;
    error: string;
    retry: () => void;
}

export function useProducts(): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const load = useCallback(async () => {
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

            setProducts(sanitizeProducts(productResponse.products));
            setCategories(sanitizeCategories(categoryResponse));
            setTotal(typeof productResponse.total === 'number' ? productResponse.total : productResponse.products.length);
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
        void load();
    }, [load]);

    const retry = useCallback(() => {
        void load();
    }, [load]);

    return { products, categories, total, isLoading, error, retry };
}
