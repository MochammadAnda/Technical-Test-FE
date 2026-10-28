import { useEffect } from 'react';
import { X, Star, Package, Tag } from 'lucide-react';
import type { Product } from '../../types/product';

interface ProductDetailModalProps {
    product: Product | null;
    onClose: () => void;
}

export default function ProductDetailModal({
    product,
    onClose,
}: ProductDetailModalProps) {
    useEffect(() => {
        if (!product) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [product, onClose]);

    if (!product) return null;

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(product.price);

    const images =
        product.images && product.images.length > 0
            ? product.images
            : [product.thumbnail];

    return (
        <div
            className="modal-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                className="product-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-modal-title"
            >
                <div className="modal-header">
                    <div>
                        <span className="eyebrow">PRODUCT DETAILS</span>
                        <h2 id="product-modal-title">Product information</h2>
                    </div>

                    <button
                        type="button"
                        className="modal-close-button"
                        onClick={onClose}
                        aria-label="Close product details"
                    >
                        <X size={21} />
                    </button>
                </div>

                <div className="modal-product-content">
                    <div className="modal-product-image-wrapper">
                        <img
                            src={images[0]}
                            alt={product.title}
                            className="modal-product-image"
                            onError={(event) => {
                                event.currentTarget.src =
                                    'https://placehold.co/500x500/f3f4f8/7b8497?text=No+Image';
                            }}
                        />
                    </div>

                    <div className="modal-product-info">
                        <span className="product-category">
                            {product.category || 'Uncategorized'}
                        </span>

                        <h3>{product.title}</h3>

                        <div className="modal-rating">
                            <Star size={17} fill="currentColor" />
                            <strong>
                                {Number.isFinite(product.rating)
                                    ? product.rating.toFixed(1)
                                    : 'N/A'}
                            </strong>
                            <span>Product rating</span>
                        </div>

                        <p className="modal-product-description">
                            {product.description || 'No description available.'}
                        </p>

                        <div className="modal-price">{formattedPrice}</div>

                        <div className="modal-meta">
                            <div>
                                <Package size={17} />
                                <span>Stock: {product.stock ?? 'Unknown'}</span>
                            </div>

                            <div>
                                <Tag size={17} />
                                <span>Brand: {product.brand || 'Not specified'}</span>
                            </div>
                        </div>

                        {product.discountPercentage > 0 && (
                            <div className="modal-discount">
                                {Math.round(product.discountPercentage)}% discount
                            </div>
                        )}
                    </div>
                </div>

                {images.length > 1 && (
                    <div className="modal-gallery">
                        {images.slice(0, 5).map((image, index) => (
                            <img
                                key={`${image}-${index}`}
                                src={image}
                                alt={`${product.title} ${index + 1}`}
                                onError={(event) => {
                                    event.currentTarget.style.display = 'none';
                                }}
                            />
                        ))}
                    </div>
                )}

                <div className="modal-footer">
                    <button
                        type="button"
                        className="secondary-outline-button"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </section>
        </div>
    );
}