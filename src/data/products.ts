import { Product } from '@/types/Product';
import MieLogo from '../../public/images/logo/Mie-Logo.png';

// Type declarations for webpack's require.context
interface ImageModule {
  default?: { src: string };
  src?: string;
}

declare const require: {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys: () => string[];
    (id: string): ImageModule;
  };
};

// Dynamic image loading function
const getImagesForProduct = (productId: string): string[] => {
  try {
    // Use require.context to dynamically import all images from a product folder
    const context = require.context('../../public/images/products', true, /\.(jpg|jpeg|png|webp)$/i);
    const images: string[] = [];
    
    // Get all keys (file paths) from the context
    const keys = context.keys();
    
    // Filter keys for the specific product folder and sort them
    const productKeys = keys
      .filter((key: string) => key.includes(`/${productId}/`))
      .sort(); // Sort to ensure consistent ordering
    
    // Import each image and get its src
    productKeys.forEach((key: string) => {
      try {
        const imageModule = context(key);
        const src = imageModule.default?.src || imageModule.src || imageModule;
        if (src && typeof src === 'string') {
          images.push(src);
        }
      } catch (error) {
        console.warn(`Failed to load image: ${key}`, error);
      }
    });
    
    // Return images or fallback to MieLogo
    return images.length > 0 ? images : [MieLogo.src];
  } catch (error) {
    console.warn(`Failed to load images for product ${productId}:`, error);
    return [MieLogo.src];
  }
};

// Product image mapping - now completely dynamic
const productImages = {
  german: getImagesForProduct('german'),
  strawberry: getImagesForProduct('strawberry'),
  sweet_potato: getImagesForProduct('sweet_potato'),
  pineapple_dream: getImagesForProduct('pineapple_dream'),
  sweet_potato_mini: getImagesForProduct('sweet_potato_mini'),
  pineapple_upside_down_mini: getImagesForProduct('pineapple_upside_down_mini'),
  biscoff_cheesecake_mini: getImagesForProduct('biscoff_cheesecake_mini'),
  german_sweet_chocolate_mini: getImagesForProduct('german_sweet_chocolate_mini'),
  cherry_bliss_cheesecake_mini: getImagesForProduct('cherry_bliss_cheesecake_mini'),
  strawberry_cheesecake_mini: getImagesForProduct('strawberry_cheesecake_mini'),
  strawberry_shortcake_mini: getImagesForProduct('strawberry_shortcake_mini'),
  cinnamon_honey_bun_mini: getImagesForProduct('cinnamon_honey_bun_mini'),
  chocolate_ganache_mini: getImagesForProduct('chocolate_ganache_mini'),
};

export const products: Product[] = [
  {
    id: 'german',
    name: "German Sweet Chocolate Delight",
    price: 75.00,
    servings: "16-20",
    image: productImages.german,
    description: "A rich and classic favorite, this decadent chocolate cake features layers of moist, sweet chocolate cake filled with a luscious coconut-pecan frosting made with caramelized sugar, butter, toasted pecans, and shredded coconut. Each bite is a perfect balance of deep chocolate flavor and a nutty, creamy filling. Finished with a smooth chocolate glaze and a final touch of coconut-pecan frosting, this timeless dessert is perfect for any occasion.",
    allergens: "Contains coconut, dairy, eggs, wheat, and pecans. Manufactured in a bakery that processes wheat and other nuts.",
    productType: "Layer Cake",
    style: "Whole Cake"
  },
  {
    id: 'strawberry',
    name: "Strawberry Shortcake",
    price: 70.00,
    servings: "16-20",
    image: productImages.strawberry,
    description: "Layers of soft, fluffy vanilla cake are filled with fresh sliced strawberries in a handmade strawberry compote and silky whipped cream, creating a light yet satisfying dessert. Topped with even more strawberries and a cloud of whipped cream, this classic treat is bursting with fresh, juicy flavor in every bite. Perfect for any occasion, it's a timeless favorite that never disappoints.",
    allergens: "Contains dairy, eggs, and wheat. Manufactured in a bakery that processes wheat and other nuts.",
    productType: "Layer Cake",
    style: "Whole Cake"
  },
  {
    id: 'sweet_potato',
    name: "So'Sweet Potato Cheesecake",
    price: 65.00,
    servings: "16-20",
    image: productImages.sweet_potato,
    description: "This creamy desert is a perfect blend of rich cheesecake and sweet potato pie. Made with velvety sweet potato puree, warm spices, lemon zest, shredded coconut and a buttery graham cracker crust, it delivers a smooth, indulgent texture with just the right touch of sweetness. Topped with a light whipped cream and a sprinkle of graham cracker crumbs, this dessert is a comforting twist on a classic favorite.",
    allergens: "Contains coconut, dairy, eggs, and wheat. Manufactured in a bakery that processes wheat and other nuts.",
    productType: "Cheesecake",
    style: "Whole Cake"
  },
  {
    id: 'pineapple_dream',
    name: "Pineapple Dream Cake",
    price: 70.00,
    servings: "16-20",
    image: productImages.pineapple_dream,
    description: "A tropical delight, this four-layer cake is filled with smooth whipped cream, crushed pineapple and rich coconut pudding all blended with toasted coconut for the perfect balance of flavor and texture. Each moist, golden cake layer is stacked high and finished with a whipped cream frosting, a sprinkle of toasted coconut, and a crown coconut pudding for a sweet, satisfying finish. Perfect for any occasion, this cake brings a refreshing burst of flavor in every bite.",
    allergens: "Contains coconut, dairy, eggs and wheat. Manufactured in a bakery that processes wheat and other nuts.",
    productType: "Layer Cake",
    style: "Whole Cake"
  },
  {
    id: 'sweet_potato_mini',
    name: "Sweet Potato (Mini)",
    price: 10.00,
    servings: "1",
    image: productImages.sweet_potato_mini,
    description: "",
    allergens: "",
    productType: "Cheesecake",
    style: "Mini Cake"
  },
  {
    id: 'pineapple_upside_down_mini',
    name: "Pineapple Upside Down Cheesecake (Mini)",
    price: 10.00,
    servings: "1",
    image: productImages.pineapple_upside_down_mini,
    description: "",
    allergens: "",
    productType: "Cheesecake",
    style: "Mini Cake"
  },
  {
    id: 'biscoff_cheesecake_mini',
    name: "Biscoff Cheesecake (Mini)",
    price: 10.00,
    servings: "1",
    image: productImages.biscoff_cheesecake_mini,
    description: "",
    allergens: "",
    productType: "Cheesecake",
    style: "Mini Cake"
  },
  {
    id: 'german_sweet_chocolate_mini',
    name: "German Sweet Chocolate (Mini)",
    price: 10.00,
    servings: "1",
    image: productImages.german_sweet_chocolate_mini,
    description: "",
    allergens: "",
    productType: "Layer Cake",
    style: "Mini Cake"
  },
  {
    id: 'cherry_bliss_cheesecake_mini',
    name: "Cherry Bliss Cheesecake (Mini)",
    price: 10.00,
    servings: "1",
    image: productImages.cherry_bliss_cheesecake_mini,
    description: "",
    allergens: "",
    productType: "Cheesecake",
    style: "Mini Cake"
  },
  {
    id: 'strawberry_cheesecake_mini',
    name: "Strawberry Cheesecake (Mini)",
    price: 10.00,
    servings: "1",
    image: productImages.strawberry_cheesecake_mini,
    description: "",
    allergens: "",
    productType: "Cheesecake",
    style: "Mini Cake"
  },
  {
    id: 'strawberry_shortcake_mini',
    name: "Strawberry Shortcake (Mini)",
    price: 10.00,
    servings: "1",
    image: productImages.strawberry_shortcake_mini,
    description: "",
    allergens: "",
    productType: "Layer Cake",
    style: "Mini Cake"
  },
  {
    id: 'cinnamon_honey_bun_mini',
    name: "Cinnamon Honey Bun (Mini)",
    price: 10.00,
    servings: "1",
    image: productImages.cinnamon_honey_bun_mini,
    description: "",
    allergens: "",
    productType: "Bun Cake",
    style: "Mini Cake"
  },
  {
    id: 'chocolate_ganache_mini',
    name: "Chocolate Ganache (Mini)",
    price: 10.00,
    servings: "1",
    image: productImages.chocolate_ganache_mini,
    description: "",
    allergens: "",
    productType: "Bun Cake",
    style: "Mini Cake"
  }
]; 