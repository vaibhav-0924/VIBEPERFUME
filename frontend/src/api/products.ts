import axios from 'axios';
import type { ApiResponse, Product, Review } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchProducts = async (category?: string) => {
  const params = category && category !== 'All' ? { category } : {};
  const response = await api.get<ApiResponse<Product[]>>('/products', { params });
  return response.data;
};

export const fetchProductById = async (id: string) => {
  const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
  return response.data;
};

export const fetchProductReviews = async (id: string) => {
  const response = await api.get<ApiResponse<Review[]>>(`/products/${id}/reviews`);
  return response.data;
};

export const addReview = async (id: string, review: { reviewerName: string; rating: number; comment: string }) => {
  const response = await api.post<ApiResponse<Review>>(`/products/${id}/reviews`, review);
  return response.data;
};
