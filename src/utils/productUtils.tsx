import type { Product } from '../types/product';

export function isValidProduct(product: Partial<Product> | null | undefined): product is Product {
    return (
        !!product &&
        typeof product.id === 'number' &&
        typeof product.title === 'string' &&
        typeof product.price === 'number' &&
        typeof product.thumbnail === 'string'
    );
}

export function sanitizeProducts(products: unknown): Product[] {
    if (!Array.isArray(products)) return [];
    return products.filter(isValidProduct);
}
export function sanitizeCategories(categories: unknown): string[] {
    if (!Array.isArray(categories)) return [];
    const valid = categories.filter(
        (item): item is string => typeof item === 'string' && item.trim().length > 0,
    );
    return [...new Set(valid)];
}


export function filterProducts(products: Product[], search: string, category: string): Product[] {
    const keyword = search.trim().toLowerCase();

    return products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(keyword);
        const matchesCategory = category === '' || product.category === category;
        return matchesSearch && matchesCategory;
    });
}

export interface PaginationResult<T> {
    items: T[];
    totalPages: number;
    firstItem: number;
    lastItem: number;
}

export function paginate<T>(items: T[], page: number, pageSize: number): PaginationResult<T> {
    const totalPages = Math.ceil(items.length / pageSize);
    const startIndex = (page - 1) * pageSize;

    return {
        items: items.slice(startIndex, startIndex + pageSize),
        totalPages,
        firstItem: items.length === 0 ? 0 : startIndex + 1,
        lastItem: Math.min(page * pageSize, items.length),
    };
}

export function getVisiblePages(currentPage: number, totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index + 1).filter(
        (page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1,
    );
}

export function calculateAverageRating(products: Product[]): number {
    const rated = products.filter(
        (product) => typeof product.rating === 'number' && Number.isFinite(product.rating),
    );
    if (rated.length === 0) return 0;
    return rated.reduce((total, product) => total + product.rating, 0) / rated.length;
}
