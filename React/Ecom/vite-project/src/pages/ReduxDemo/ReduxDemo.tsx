import React, { useState } from 'react';
import { ProductsSimple } from '../../components/product/ProductsSimple';
import { ProductList } from '../../components/product/ProductList';
import { useProducts } from '../../hooks/useProducts';
import './ReduxDemo.css';

export const ReduxDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'react-query' | 'redux-thunk'>('redux-thunk');
  
  // React Query hook for comparison
  const { data, isLoading, error } = useProducts(20, 0);

  return (
    <div className="redux-demo">
      <div className="demo-header">
        <h1>Data Fetching Comparison</h1>
        <p>Compare React Query vs Redux Toolkit with createAsyncThunk</p>
        
        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === 'redux-thunk' ? 'active' : ''}`}
            onClick={() => setActiveTab('redux-thunk')}
          >
            Redux Toolkit (createAsyncThunk)
          </button>
          <button
            className={`tab-btn ${activeTab === 'react-query' ? 'active' : ''}`}
            onClick={() => setActiveTab('react-query')}
          >
            React Query
          </button>
        </div>
      </div>

      <div className="demo-content">
        {activeTab === 'redux-thunk' && (
          <div className="tab-content">
            <div className="explanation">
              <h3>Redux Toolkit with createAsyncThunk</h3>
              <ul>
                <li>✅ Centralized state management</li>
                <li>✅ Predictable state updates</li>
                <li>✅ Great for complex app state</li>
                <li>✅ Built-in loading/error handling</li>
                <li>✅ Time travel debugging with Redux DevTools</li>
                <li>❌ More boilerplate code</li>
                <li>❌ Manual cache management</li>
                <li>❌ No automatic background refetching</li>
              </ul>
            </div>
            <ProductsSimple />
          </div>
        )}

        {activeTab === 'react-query' && (
          <div className="tab-content">
            <div className="explanation">
              <h3>React Query (TanStack Query)</h3>
              <ul>
                <li>✅ Automatic caching and background updates</li>
                <li>✅ Less boilerplate code</li>
                <li>✅ Built-in retry and refetch logic</li>
                <li>✅ Optimistic updates</li>
                <li>✅ Automatic garbage collection</li>
                <li>❌ Limited to server state only</li>
                <li>❌ Less control over global state</li>
                <li>❌ Learning curve for advanced features</li>
              </ul>
            </div>
            <div className="react-query-demo">
              <h3>Products with React Query</h3>
              <ProductList 
                products={data?.products || []} 
                loading={isLoading}
                error={error?.message || null}
              />
            </div>
          </div>
        )}
      </div>

      <div className="code-examples">
        <h3>Code Examples</h3>
        
        {activeTab === 'redux-thunk' && (
          <div className="code-section">
            <h4>createAsyncThunk Example:</h4>
            <pre className="code-block">
{`// Define async thunk
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: { limit?: number; skip?: number } = {}, { rejectWithValue }) => {
    try {
      const { limit = 30, skip = 0 } = params;
      const response = await productApi.getProducts(limit, skip);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Handle in slice extraReducers
extraReducers: (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
}

// Use in component
const dispatch = useAppDispatch();
const products = useAppSelector(selectProducts);
const loading = useAppSelector(selectProductsLoading);

useEffect(() => {
  dispatch(fetchProducts({ limit: 20, skip: 0 }));
}, [dispatch]);`}
            </pre>
          </div>
        )}

        {activeTab === 'react-query' && (
          <div className="code-section">
            <h4>React Query Example:</h4>
            <pre className="code-block">
{`// Define query hook
export const useProducts = (limit: number = 30, skip: number = 0) => {
  return useQuery({
    queryKey: ['products', limit, skip],
    queryFn: () => productApi.getProducts(limit, skip),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Use in component
const { data, isLoading, error } = useProducts(20, 0);

// That's it! React Query handles:
// - Caching
// - Background refetching
// - Loading states
// - Error handling
// - Deduplication
// - Automatic garbage collection`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};