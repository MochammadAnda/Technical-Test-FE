import type { Product } from '../../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
    onViewDetails: (product: Product) => void;
}

export default function ProductGrid({
    products,
    onViewDetails,
}: ProductGridProps) {
    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={onViewDetails}
                />
            ))}
        </div>
    );
}