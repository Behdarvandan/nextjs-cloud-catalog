export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  specs: Record<string, string>;
}

export interface FilterParams {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
}
