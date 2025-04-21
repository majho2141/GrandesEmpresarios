import api from './axios';
import { PRODUCT_ENDPOINTS } from '@/constants/endpoints';

export interface ProductCategory {
  id: number;
  name: string;
  description: string;
}

export interface Enterprise {
  id: number;
  name: string;
  NIT: string;
  email: string;
  phone_number: string;
  currency: string;
  description: string;
  address: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  stock: number;
  production_cost: number;
  public_price: number;
  thumbnail: string;
  bar_code: string;
  minimal_safe_stock: number;
  discount: number;
  enterprise_id: number;
  category_id: number;
  enterprise: Enterprise;
  category: ProductCategory;
}

export interface ProductFiltersType {
  search?: string;
  category_id?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    const { data } = await api.get<Product[]>(PRODUCT_ENDPOINTS.LIST);
    return data;
  },

  async getProductById(id: string): Promise<Product> {
    const { data } = await api.get<Product>(PRODUCT_ENDPOINTS.DETAIL(id));
    return data;
  },

  async getProductCategories(): Promise<ProductCategory[]> {
    const { data } = await api.get<ProductCategory[]>(PRODUCT_ENDPOINTS.CATEGORIES);
    return data;
  },

  async filterProducts(filters: ProductFiltersType): Promise<Product[]> {
    const { data } = await api.get<Product[]>(PRODUCT_ENDPOINTS.FILTER, {
      params: filters
    });
    return data;
  }
}; 