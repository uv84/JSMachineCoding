import React from 'react';
import type { Product } from '../../../types/product';
import { formatPrice, calculateDiscountedPrice, truncateText } from '../../../utils/helpers';
import { useAppDispatch } from '../../../hooks/redux';
import { addToCart } from '../../../store/slices/cartSlice';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.thumbnail} alt={product.title} />
        {product.discountPercentage > 0 && (
          <div className="discount-badge">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{truncateText(product.title, 50)}</h3>
        <p className="product-description">{truncateText(product.description, 80)}</p>
        
        <div className="product-meta">
          <div className="product-brand">{product.brand}</div>
          <div className="product-category">{product.category}</div>
        </div>
        
        <div className="product-rating">
          <span className="stars">★ {product.rating.toFixed(1)}</span>
          <span className="stock">Stock: {product.stock}</span>
        </div>
        
        <div className="product-pricing">
          {product.discountPercentage > 0 ? (
            <>
              <span className="discounted-price">{formatPrice(discountedPrice)}</span>
              <span className="original-price">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="price">{formatPrice(product.price)}</span>
          )}
        </div>
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};