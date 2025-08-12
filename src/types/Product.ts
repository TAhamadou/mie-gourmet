export type ProductType = 'Layer Cake' | 'Cheesecake' | 'Bun Cake' | 'Assortment';
export type ProductStyle = 'Mini Cake' | 'Whole Cake';

export interface Promo {
  id: string;
  name: string;
  description: string;
  discountType: 'wholesale' | 'percentage' | 'fixed';
  discountValue?: number;
  minQuantity?: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
}

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
  promoId?: string;
  selectedCakes?: {[key: string]: number}; // For assortment products
} 