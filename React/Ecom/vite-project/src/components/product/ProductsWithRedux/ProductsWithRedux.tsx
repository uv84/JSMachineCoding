import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { 
  fetchProducts, 
  fetchProductById,
  searchProducts,
  fetchCategories,
  fetchProductsByCategory,
  clearError,
  resetProducts,
  selectProducts,
  selectCurrentProduct,
  selectCategories,
  selectProductsLoading,
  selectProductsError,
  selectHasMore
} from '../../../store/slices/productSlice';
import { ProductCard } from '../ProductCard';
import './ProductsWithRedux.css';

export const ProductsWithRedux: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Select data from Redux store using selectors
  const products = useAppSelector(selectProducts);
  const currentProduct = useAppSelector(selectCurrentProduct);
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const hasMore = useAppSelector(selectHasMore);

  // Local state for UI
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  // Fetch initial data on component mount
  useEffect(() => {
    // Dispatch async thunk to fetch products
    dispatch(fetchProducts({ limit: 20, skip: 0 }));
    
    // Dispatch async thunk to fetch categories
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Clear previous results and search
      dispatch(resetProducts());
      dispatch(searchProducts(searchQuery));
    } else {
      // If search is empty, fetch regular products
      dispatch(resetProducts());
      dispatch(fetchProducts({ limit: 20, skip: 0 }));
    }
  };

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when filtering by category
    
    if (category) {
      dispatch(resetProducts());
      dispatch(fetchProductsByCategory(category));
    } else {
      dispatch(resetProducts());
      dispatch(fetchProducts({ limit: 20, skip: 0 }));
    }
  };

  // Handle load more products (pagination)
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const skip = products.length;
      dispatch(fetchProducts({ limit: 20, skip }));
    }
  };

  // Handle view product details
  const handleViewProduct = (productId: number) => {
    setSelectedProductId(productId);
    dispatch(fetchProductById(productId));
  };

  // Handle clear error
  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="products-with-redux">
      <div className="products-header">
        <h2>Products with Redux Async Thunks</h2>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Category Filter */}
        <div className="category-filter">
          <label htmlFor="category">Filter by Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            disabled={loading}
          >
            <option value="">All Categories</option>
            {Array.isArray(categories) && categories.map((category, index) => {
              // Debug log to see the actual data structure
              console.log('Category item:', category, 'Type:', typeof category);
              
              // Handle both string and object categories safely
              let categoryValue = '';
              let categoryLabel = '';
              
              try {
                if (typeof category === 'string') {
                  categoryValue = category;
                  categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
                } else if (category && typeof category === 'object') {
                  categoryValue = category.name || category.slug || String(category);
                  categoryLabel = category.name || category.slug || String(category);
                } else {
                  categoryValue = String(category);
                  categoryLabel = String(category);
                }
              } catch (err) {
                console.error('Error processing category:', category, err);
                categoryValue = String(category);
                categoryLabel = String(category);
              }
                
              return (
                <option key={`category-${index}`} value={categoryValue}>
                  {categoryLabel}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-banner">
          <span>Error: {error}</span>
          <button onClick={handleClearError}>Dismiss</button>
        </div>
      )}

      {/* Loading State */}
      {loading && products.length === 0 && (
        <div className="loading-state">
          <p>Loading products...</p>
          <div className="spinner"></div>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 && (
        <div className="products-section">
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-wrapper">
                <ProductCard product={product} />
                <button
                  className="view-details-btn"
                  onClick={() => handleViewProduct(product.id)}
                  disabled={loading}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && !searchQuery && !selectedCategory && (
            <div className="load-more-section">
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More Products'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Products Found */}
      {!loading && products.length === 0 && !error && (
        <div className="no-products">
          <p>No products found.</p>
        </div>
      )}

      {/* Product Details Modal */}
      {currentProduct && selectedProductId && (
        <div className="product-modal-overlay">
          <div className="product-modal">
            <div className="modal-header">
              <h3>Product Details</h3>
              <button
                className="close-btn"
                onClick={() => {
                  setSelectedProductId(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <img src={currentProduct.thumbnail} alt={currentProduct.title} />
              <div className="product-info">
                <h4>{currentProduct.title}</h4>
                <p className="brand">Brand: {currentProduct.brand}</p>
                <p className="category">Category: {currentProduct.category}</p>
                <p className="price">${currentProduct.price}</p>
                <p className="rating">Rating: {currentProduct.rating}/5</p>
                <p className="stock">Stock: {currentProduct.stock}</p>
                <p className="description">{currentProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Debug Info */}
      <div className="debug-info">
        <h4>Redux State Debug:</h4>
        <p>Products Count: {products.length}</p>
        <p>Loading: {loading.toString()}</p>
        <p>Has More: {hasMore.toString()}</p>
        <p>Categories Count: {categories.length}</p>
        <p>Current Product: {currentProduct ? currentProduct.title : 'None'}</p>
        <p>Error: {error || 'None'}</p>
      </div>
    </div>
  );
};