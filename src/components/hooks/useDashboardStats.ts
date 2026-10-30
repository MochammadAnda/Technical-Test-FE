import { useMemo } from 'react';

import { calculateAverageRating } from '../../utils/productUtils';
import { useProducts } from './useProducts';

export interface DashboardStats {
    totalProducts: number;
    totalCategories: number;
    averageRating: number;
}

/** Statistik ringkasan untuk dashboard, dihitung dari data yang sudah divalidasi. */
export function useDashboardStats() {
    const { products, categories, total, isLoading, error, retry } = useProducts();

    const stats = useMemo<DashboardStats | null>(() => {
        if (isLoading || error) return null;
        return {
            totalProducts: total,
            totalCategories: categories.length,
            averageRating: calculateAverageRating(products),
        };
    }, [products, categories, total, isLoading, error]);

    return { stats, isLoading, error, retry };
}
