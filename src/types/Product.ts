import { StaticImageData } from 'next/image';

export interface Product {
  id: string;
  name: string;
  price: number;
  servings: string;
  image: any;
  description: string;
  allergens: string;
} 