export interface Product {
  brand?: any;
  features?: any;
  stockUnits?: number;
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  email: string;
  type?: {
    id: string;
  };
  quantity: number;
}