import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';
import { productApi } from '../../services/api';

// Define the state interface
interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  categories: any[]; // Changed to any[] to handle different response formats
  loading: boolean;
  error: string | null;
  totalProducts: number;
  currentPage: number;
  hasMore: boolean;
}

// Initial state
const initialState: ProductState = {
  products: [],
  currentProduct: null,
  categories: [], // Ensure it starts as an empty array
  loading: false,
  error: null,
  totalProducts: 0,
  currentPage: 0,
  hasMore: true,
};

// Async thunk for fetching products
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

// Async thunk for fetching a single product
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

// Async thunk for searching products
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query: string, { rejectWithValue }) => {
    try {
      console.log('Redux searchProducts thunk called with query:', query);
      
      if (!query || query.length < 3) {
        console.log('Query too short, returning empty results');
        return { products: [], total: 0, skip: 0, limit: 0 };
      }
      
      console.log('Making API call to search products...');
      const response = await productApi.searchProducts(query);
      console.log('API response received:', response);
      
      return response;
    } catch (error: any) {
      console.error('Search products error:', error);
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to search products');
    }
  }
);

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productApi.getCategories();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

// Async thunk for fetching products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductsByCategory(category);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products by category');
    }
  }
);

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Synchronous actions
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetProducts: (state) => {
      state.products = [];
      state.currentPage = 0;
      state.hasMore = true;
      state.totalProducts = 0;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchProducts async thunk
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const { products, total, skip, limit } = action.payload;
        
        // If skip is 0, replace products; otherwise, append for pagination
        if (skip === 0) {
          state.products = products;
        } else {
          state.products = [...state.products, ...products];
        }
        
        state.totalProducts = total;
        state.currentPage = Math.floor(skip / limit);
        state.hasMore = state.products.length < total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle fetchProductById async thunk
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentProduct = null;
      });

    // Handle searchProducts async thunk
    builder
      .addCase(searchProducts.pending, (state) => {
        console.log('Search products pending...');
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        console.log('Search products fulfilled with payload:', action.payload);
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
        state.hasMore = false; // Search results don't support pagination
      })
      .addCase(searchProducts.rejected, (state, action) => {
        console.error('Search products rejected with error:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle fetchCategories async thunk
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Categories received:', action.payload);
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle fetchProductsByCategory async thunk
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
        state.hasMore = false; // Category results don't support pagination
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { 
  clearCurrentProduct, 
  clearError, 
  resetProducts, 
  setCurrentPage 
} = productSlice.actions;

// Export reducer
export default productSlice.reducer;

// Selectors
export const selectProducts = (state: { products: ProductState }) => state.products.products;
export const selectCurrentProduct = (state: { products: ProductState }) => state.products.currentProduct;
export const selectCategories = (state: { products: ProductState }) => state.products.categories;
export const selectProductsLoading = (state: { products: ProductState }) => state.products.loading;
export const selectProductsError = (state: { products: ProductState }) => state.products.error;
export const selectHasMore = (state: { products: ProductState }) => state.products.hasMore;
export const selectTotalProducts = (state: { products: ProductState }) => state.products.totalProducts;