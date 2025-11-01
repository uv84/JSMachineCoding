import React from 'react';
import { ProductCard } from '../ProductCard';
import type { Product } from '../../../types/product';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
}

export const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  loading = false, 
  error = null 
}) => {
  if (loading) {
    return (
      <div className="product-list-loading">
        <div className="loading-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="product-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-line skeleton-title"></div>
                <div className="skeleton-line skeleton-description"></div>
                <div className="skeleton-line skeleton-price"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-error">
        <h3>Error loading products</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <h3>No products found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};