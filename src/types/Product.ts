import { StaticImageData } from 'next/image';

export type ProductType = 'Cheesecake' | 'Layer Cake';

export interface Product {
  id: string;
  name: string;
  price: number;
  servings: string;
  image: StaticImageData | string;  // Allow string for SVG paths
  description: string;
  allergens: string;
  productType: ProductType;
} 