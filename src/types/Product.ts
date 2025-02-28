export type ProductType = 'Cheesecake' | 'Layer Cake';

export interface Product {
  id: string;
  name: string;
  price: number;
  servings: string;
  image: string[];
  description: string;
  allergens: string;
  productType: string;
} 