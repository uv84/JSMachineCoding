# Redux Toolkit createAsyncThunk Examples

This document demonstrates how to use `createAsyncThunk` from Redux Toolkit for handling async operations in React applications.

## What is createAsyncThunk?

`createAsyncThunk` is a function from Redux Toolkit that generates Redux action creators for async operations. It automatically dispatches three actions:
- `pending`: When the async operation starts
- `fulfilled`: When the async operation succeeds
- `rejected`: When the async operation fails

## Basic Syntax

```typescript
export const asyncThunkName = createAsyncThunk(
  'sliceName/asyncThunkName',
  async (args, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await apiCall(args);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

## Complete Example: Product Management

### 1. Define the State Interface

```typescript
interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  totalProducts: number;
  hasMore: boolean;
}
```

### 2. Create Async Thunks

```typescript
// Fetch products with pagination
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

// Fetch single product
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await productApi.getProduct(productId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

// Search products
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query: string, { rejectWithValue }) => {
    try {
      if (!query || query.length < 3) {
        return { products: [], total: 0, skip: 0, limit: 0 };
      }
      const response = await productApi.searchProducts(query);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search products');
    }
  }
);
```

### 3. Handle in Slice with extraReducers

```typescript
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Synchronous actions
    clearError: (state) => {
      state.error = null;
    },
    resetProducts: (state) => {
      state.products = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchProducts
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const { products, total, skip, limit } = action.payload;
        
        // Append for pagination or replace for new search
        if (skip === 0) {
          state.products = products;
        } else {
          state.products = [...state.products, ...products];
        }
        
        state.totalProducts = total;
        state.hasMore = state.products.length < total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle fetchProductById
    builder
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      });

    // Handle searchProducts
    builder
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.hasMore = false; // Search results don't support pagination
      });
  },
});
```

### 4. Use in Components

```typescript
const ProductsComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Select data from store
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchProducts({ limit: 20, skip: 0 }));
  }, [dispatch]);

  // Handle search
  const handleSearch = (query: string) => {
    dispatch(searchProducts(query));
  };

  // Handle load more
  const handleLoadMore = () => {
    const skip = products.length;
    dispatch(fetchProducts({ limit: 20, skip }));
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};
```

## Advanced Features

### 1. Conditional Dispatching

```typescript
// Only fetch if not already loaded
export const fetchProductsIfNeeded = createAsyncThunk(
  'products/fetchProductsIfNeeded',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    if (state.products.products.length === 0) {
      return dispatch(fetchProducts({}));
    }
  }
);
```

### 2. Optimistic Updates

```typescript
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updates }: { id: number; updates: Partial<Product> }, { rejectWithValue }) => {
    try {
      const response = await productApi.updateProduct(id, updates);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// In extraReducers
.addCase(updateProduct.pending, (state, action) => {
  // Optimistically update the UI
  const { id, updates } = action.meta.arg;
  const index = state.products.findIndex(p => p.id === id);
  if (index !== -1) {
    state.products[index] = { ...state.products[index], ...updates };
  }
})
.addCase(updateProduct.rejected, (state, action) => {
  // Revert optimistic update on failure
  // Re-fetch or restore previous state
});
```

### 3. AbortController Support

```typescript
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params, { signal, rejectWithValue }) => {
    try {
      const response = await fetch('/api/products', { signal });
      return await response.json();
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return rejectWithValue('Request was cancelled');
      }
      return rejectWithValue(error.message);
    }
  }
);
```

## Benefits of createAsyncThunk

1. **Automatic Action Types**: Generates pending/fulfilled/rejected actions
2. **Built-in Loading States**: Easy to track async operation status
3. **Error Handling**: Consistent error state management
4. **Type Safety**: Full TypeScript support
5. **Predictable State**: Follows Redux patterns
6. **DevTools Integration**: Works with Redux DevTools
7. **Cancellation**: Built-in support for request cancellation

## When to Use createAsyncThunk vs React Query

### Use createAsyncThunk when:
- ✅ You need centralized state management
- ✅ Complex application state that multiple components depend on
- ✅ You want predictable state updates
- ✅ You need time-travel debugging
- ✅ State transformations are complex

### Use React Query when:
- ✅ Primarily dealing with server state
- ✅ Need automatic caching and background updates
- ✅ Want less boilerplate code
- ✅ Need built-in retry and refetch logic
- ✅ Optimistic updates are important

## Best Practices

1. **Keep async thunks simple**: Don't put business logic in thunks
2. **Use proper error handling**: Always handle rejections
3. **Type your payloads**: Use TypeScript for better DX
4. **Create selectors**: Use selectors for accessing state
5. **Handle loading states**: Provide good UX during async operations
6. **Avoid over-fetching**: Only fetch data when needed
7. **Use proper naming**: Make action types descriptive

This demonstrates the power and flexibility of Redux Toolkit's createAsyncThunk for managing async operations in React applications!