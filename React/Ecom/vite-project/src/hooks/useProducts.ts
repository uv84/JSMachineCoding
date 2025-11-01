import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { productApi } from '../services/api';

// Query keys
export const QUERY_KEYS = {
  PRODUCTS: 'products',
  PRODUCT: 'product',
  CATEGORIES: 'categories',
  SEARCH: 'search',
} as const;

// Get products with pagination
export const useProducts = (limit: number = 30, skip: number = 0) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, limit, skip],
    queryFn: () => productApi.getProducts(limit, skip),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get infinite products (for infinite scrolling)
export const useInfiniteProducts = (limit: number = 30) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, 'infinite', limit],
    queryFn: ({ pageParam = 0 }) => productApi.getProducts(limit, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * limit;
      return totalFetched < lastPage.total ? totalFetched : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};

// Get single product
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: () => productApi.getProduct(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Search products
export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH, query],
    queryFn: () => productApi.searchProducts(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get categories
export const useCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: productApi.getCategories,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Get products by category
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, 'category', category],
    queryFn: () => productApi.getProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};