import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { 
  fetchProducts, 
  clearError,
  resetProducts,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectHasMore,
  searchProducts
} from '../../../store/slices/productSlice';
import { ProductCard } from '../ProductCard';
import '../ProductsWithRedux/ProductsWithRedux.css';

export const ProductsSimple: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Select data from Redux store using selectors
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const hasMore = useAppSelector(selectHasMore);

  // Local state for UI
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change with debouncing
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Auto-search when query is cleared
    if (value.trim().length === 0) {
      console.log('Input cleared, resetting to all products');
      dispatch(resetProducts());
      dispatch(fetchProducts({ limit: 20, skip: 0 }));
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    // Dispatch async thunk to fetch products
    dispatch(fetchProducts({ limit: 20, skip: 0 }));
  }, [dispatch]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== HANDLE SEARCH FUNCTION CALLED ===');
    
    const trimmedQuery = searchQuery.trim();
    console.log('Search triggered with query:', trimmedQuery);
    console.log('Query length:', trimmedQuery.length);
    
    if (trimmedQuery.length >= 3) {
      // Clear previous results and search
      dispatch(resetProducts());
      // Dispatch and handle the promise
      const searchPromise = dispatch(searchProducts(trimmedQuery));
      console.log('Search promise created:', searchPromise);
      
      searchPromise
        .then((resultAction) => {
          console.log('Search dispatch completed, result action:', resultAction);
          
          // Check if the action was fulfilled or rejected
          if (searchProducts.fulfilled.match(resultAction)) {
            console.log('Search fulfilled with payload:', resultAction.payload);
          } else if (searchProducts.rejected.match(resultAction)) {
            console.error('Search rejected with error:', resultAction.payload);
          }
        })
        .catch((error) => {
          console.error('Search dispatch error:', error);
        });
        
    } else if (trimmedQuery.length === 0) {
      // If search is empty, fetch regular products
      console.log('Clearing search, fetching all products');
      dispatch(resetProducts());
      dispatch(fetchProducts({ limit: 20, skip: 0 }))
        .then((resultAction) => {
          console.log('Fetch products result:', resultAction);
        })
        .catch((error) => {
          console.error('Fetch products error:', error);
        });
    } else {
      // Show message for too short query
      console.log('Search query too short:', trimmedQuery.length);
      alert('Please enter at least 3 characters to search');
    }
    
    console.log('=== HANDLE SEARCH FUNCTION END ===');
  };

  // Handle load more products (pagination)
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const skip = products.length;
      dispatch(fetchProducts({ limit: 20, skip }));
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    dispatch(resetProducts());
    dispatch(fetchProducts({ limit: 20, skip: 0 }));
  };

  // Handle clear error
  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="products-with-redux">
      <div className="products-header">
        <h2>Products with Redux Async Thunks (Simplified)</h2>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search products (min 3 characters)..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="search-input"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          {searchQuery && (
            <button 
              type="button" 
              onClick={handleClearSearch}
              disabled={loading}
              className="clear-search-btn"
            >
              Clear
            </button>
          )}
        </form>
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
              </div>
            ))}
          </div>

          {/* Load More Button - only show for regular product listing, not search results */}
          {hasMore && !searchQuery.trim() && (
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
          
          {/* Search Results Info */}
          {searchQuery.trim() && (
            <div className="search-results-info">
              <p>Search results for: "{searchQuery}" ({products.length} products found)</p>
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

      {/* Debug Info */}
      <div className="debug-info">
        <h4>Redux State Debug:</h4>
        <p>Products Count: {products.length}</p>
        <p>Loading: {loading.toString()}</p>
        <p>Has More: {hasMore.toString()}</p>
        <p>Search Query: "{searchQuery}"</p>
        <p>Error: {error || 'None'}</p>
      </div>
    </div>
  );
};