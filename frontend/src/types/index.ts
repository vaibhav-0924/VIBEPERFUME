export interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  sizes: string[];
  notes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  productId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: { field: string; message: string }[];
}
