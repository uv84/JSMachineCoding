import axios from 'axios';
import type { Product, ProductsResponse } from '../types/product';

const API_BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const productApi = {
  // Get all products with pagination
  getProducts: async (limit: number = 30, skip: number = 0): Promise<ProductsResponse> => {
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return response.data;
  },

  // Get single product by ID
  getProduct: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async (query: string): Promise<ProductsResponse> => {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<ProductsResponse> => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  // Get all categories
  getCategories: async (): Promise<any[]> => {
    const response = await api.get('/products/categories');
    return response.data;
  },
};