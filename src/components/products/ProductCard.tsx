import { Eye, Star } from 'lucide-react';
import type { Product } from '../../types/product';

interface ProductCardProps {
    product: Product;
    onViewDetails: (product: Product) => void;
}

export default function ProductCard({
    product,
    onViewDetails,
}: ProductCardProps) {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(product.price);

    const discount =
        Number.isFinite(product.discountPercentage) &&
            product.discountPercentage > 0
            ? Math.round(product.discountPercentage)
            : 0;

    return (
        <article className="product-card">
            <button
                type="button"
                className="product-image-button"
                onClick={() => onViewDetails(product)}
                aria-label={`View details for ${product.title}`}
            >
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                    loading="lazy"
                    onError={(event) => {
                        event.currentTarget.src =
                            'https://placehold.co/400x300/f3f4f8/7b8497?text=No+Image';
                    }}
                />

                {discount > 0 && (
                    <span className="product-discount">-{discount}%</span>
                )}

                <span className="product-quick-view">
                    <Eye size={16} />
                    Quick view
                </span>
            </button>

            <div className="product-card-body">
                <div className="product-category">
                    {product.category || 'Uncategorized'}
                </div>

                <h3 className="product-title" title={product.title}>
                    {product.title}
                </h3>

                <div className="product-rating">
                    <Star size={15} fill="currentColor" />
                    <span>
                        {Number.isFinite(product.rating)
                            ? product.rating.toFixed(1)
                            : 'N/A'}
                    </span>
                    <span className="rating-separator">·</span>
                    <span>{product.stock ?? 0} in stock</span>
                </div>

                <div className="product-card-footer">
                    <strong className="product-price">{formattedPrice}</strong>

                    <button
                        type="button"
                        className="product-view-button"
                        onClick={() => onViewDetails(product)}
                    >
                        Details
                    </button>
                </div>
            </div>
        </article>
    );
}