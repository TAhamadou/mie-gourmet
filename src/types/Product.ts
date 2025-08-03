export type ProductType = 'Layer Cake' | 'Cheesecake' | 'Bun Cake';
export type ProductStyle = 'Mini Cake' | 'Whole Cake';

export interface Product {
  id: string;
  name: string;
  price: number;
  servings: string;
  image: string[];
  description: string;
  allergens: string;
  productType: ProductType;
  style: ProductStyle;
} 