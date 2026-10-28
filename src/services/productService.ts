import api from './api';
import type {
    Product,
    ProductCategory,
    ProductResponse,
} from '../types/product';

export const productService = {
    async getProducts(): Promise<ProductResponse> {
        const response = await api.get<ProductResponse>('/products?limit=100');

        return response.data;
    },

    async getCategories(): Promise<ProductCategory[]> {
        const response = await api.get<ProductCategory[]>(
            '/products/category-list',
        );

        return response.data;
    },

    async searchProducts(query: string): Promise<ProductResponse> {
        const response = await api.get<ProductResponse>('/products/search', {
            params: {
                q: query,
                limit: 100,
            },
        });

        return response.data;
    },

    async getProductsByCategory(
        category: string,
    ): Promise<ProductResponse> {
        const response = await api.get<ProductResponse>(
            `/products/category/${encodeURIComponent(category)}`,
            {
                params: {
                    limit: 100,
                },
            },
        );

        return response.data;
    },

    async getProductById(id: number): Promise<Product> {
        const response = await api.get<Product>(`/products/${id}`);

        return response.data;
    },
};