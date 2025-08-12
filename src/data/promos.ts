import { Promo, Product } from '@/types/Product';

export const promos: Promo[] = [
  {
    id: 'assortment',
    name: 'Luxury Mini Cakes Assortment',
    description: 'Mix and match our premium mini cakes for special pricing',
    discountType: 'wholesale',
    minQuantity: 4,
    isActive: true,
  }
];

// Assortment product variants
export const assortmentProducts: Product[] = [
  {
    id: 'assortment_4',
    name: "Luxury Mini Cakes Assortment (4 Pack)",
    price: 36.00,
    servings: "4",
    image: ['/images/gallery/german_gallery.jpg'],
    description: "Mix and match 4 luxury mini cakes of your choice. Choose from our premium selection of cheesecakes and layer cakes.",
    allergens: "Varies by selection. Please check individual cake allergens.",
    productType: "Assortment",
    style: "Mini Cake",
    promoId: "assortment"
  },
  {
    id: 'assortment_6',
    name: "Luxury Mini Cakes Assortment (6 Pack)",
    price: 51.00,
    servings: "6",
    image: ['/images/gallery/german_gallery.jpg'],
    description: "Mix and match 6 luxury mini cakes of your choice. Choose from our premium selection of cheesecakes and layer cakes.",
    allergens: "Varies by selection. Please check individual cake allergens.",
    productType: "Assortment",
    style: "Mini Cake",
    promoId: "assortment"
  },
  {
    id: 'assortment_12',
    name: "Luxury Mini Cakes Assortment (12 Pack)",
    price: 90.00,
    servings: "12",
    image: ['/images/gallery/german_gallery.jpg'],
    description: "Mix and match 12 luxury mini cakes of your choice. Choose from our premium selection of cheesecakes and layer cakes.",
    allergens: "Varies by selection. Please check individual cake allergens.",
    productType: "Assortment",
    style: "Mini Cake",
    promoId: "assortment"
  }
];

// Exact pricing tiers for assortment promo
export const getAssortmentPrice = (quantity: number): { totalPrice: number; pricePerCake: number } | null => {
  switch (quantity) {
    case 4:
      return { totalPrice: 36, pricePerCake: 9.00 };
    case 6:
      return { totalPrice: 51, pricePerCake: 8.50 };
    case 12:
      return { totalPrice: 90, pricePerCake: 7.50 };
    default:
      return null; // No special pricing for other quantities
  }
};

// Calculate best pricing breakdown for any quantity
export const getAssortmentPricing = (quantity: number): { 
  discountedCakes: number; 
  regularCakes: number; 
  discountPrice: number; 
  totalPrice: number;
  savings: number;
} => {
  const regularPrice = 10.00;
  let discountedCakes = 0;
  let discountPrice = 0;
  
  // Find the largest discount tier that fits
  if (quantity >= 12) {
    const sets = Math.floor(quantity / 12);
    discountedCakes = sets * 12;
    discountPrice = 90 * sets; // $90 per set of 12
  } else if (quantity >= 6) {
    discountedCakes = 6;
    discountPrice = 51;
  } else if (quantity >= 4) {
    discountedCakes = 4;
    discountPrice = 36;
  }
  
  const regularCakes = quantity - discountedCakes;
  const regularPrice_total = regularCakes * regularPrice;
  const totalPrice = discountPrice + regularPrice_total;
  
  // Calculate savings compared to all regular pricing
  const allRegularPrice = quantity * regularPrice;
  const savings = allRegularPrice - totalPrice;
  
  return {
    discountedCakes,
    regularCakes,
    discountPrice,
    totalPrice,
    savings
  };
};

export const getPromoById = (id: string): Promo | undefined => {
  return promos.find(promo => promo.id === id);
};

export const getActivePromos = (): Promo[] => {
  return promos.filter(promo => promo.isActive);
};

export const getAssortmentProduct = (id: string): Product | undefined => {
  return assortmentProducts.find(product => product.id === id);
}; 