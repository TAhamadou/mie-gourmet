import { Product } from '@/types/Product';
import germanImage from '../../public/images/german/german_main.jpg';
import strawberryImage from '../../public/images/strawberry/strawberry_main.jpg';
import sweetPotatoImage from '../../public/images/sweet_potato/sweet_potato_main.jpg';
// import pineappleUpsideImage from '../../public/images/pineapple_upside/pineapple_cheese_main.jpg';
import pineappleDreamImage from '../../public/images/pineapple_dream/pineapple_dream_main.jpg';

export const products: Product[] = [
  {
    id: 'german',
    name: "German Sweet Chocolate Delight",
    price: 75.00,
    servings: "8-10",
    image: germanImage,
    description: "A rich and classic favorite, this decadent chocolate cake features layers of moist, sweet chocolate cake filled with a luscious coconut-pecan frosting made with caramelized sugar, butter, toasted pecans, and shredded coconut. Each bite is a perfect balance of deep chocolate flavor and a nutty, creamy filling. Finished with a smooth chocolate glaze and a final touch of coconut-pecan frosting, this timeless dessert is perfect for any occasion.",
    allergens: "Contains coconut, dairy, eggs, wheat, and pecans. Manufactured in a bakery that processes wheat and other nuts."
  },
  {
    id: 'strawberry',
    name: "Strawberry Shortcake",
    price: 70.00,
    servings: "8-10",
    image: strawberryImage,
    description: "Layers of soft, fluffy vanilla cake are filled with fresh sliced strawberries in a handmade strawberry compote and silky whipped cream, creating a light yet satisfying dessert. Topped with even more strawberries and a cloud of whipped cream, this classic treat is bursting with fresh, juicy flavor in every bite. Perfect for any occasion, it's a timeless favorite that never disappoints.",
    allergens: "Contains dairy, eggs, and wheat. Manufactured in a bakery that processes wheat and other nuts."
  },
  {
    id: 'sweet_potato',
    name: "So'Sweet Potato Cheesecake",
    price: 60.00,
    servings: "8-10",
    image: sweetPotatoImage,
    description: "This creamy desert is a perfect blend of rich cheesecake and sweet potato pie. Made with velvety sweet potato puree, warm spices, lemon zest, shredded coconut and a buttery graham cracker crust, it delivers a smooth, indulgent texture with just the right touch of sweetness. Topped with a light whipped cream and a sprinkle of graham cracker crumbs, this dessert is a comforting twist on a classic favorite.",
    allergens: "Contains coconut, dairy, eggs, and wheat. Manufactured in a bakery that processes wheat and other nuts."
  },
  // {
  //   id: 'pineapple_upside',
  //   name: "The Pineapple UpsideDown Cheesecake",
  //   price: 50.00,
  //   servings: "8-10",
  //   image: pineappleUpsideImage,
  // },
  {
    id: 'pineapple_dream',
    name: "Pineapple Dream Cake",
    price: 70.00,
    servings: "8-10",
    image: pineappleDreamImage,
    description: "A tropical delight, this four-layer cake is filled with smooth whipped cream, crushed pineapple and rich coconut pudding all blended with toasted coconut for the perfect balance of flavor and texture. Each moist, golden cake layer is stacked high and finished with a whipped cream frosting, a sprinkle of toasted coconut, and a crown coconut pudding for a sweet, satisfying finish. Perfect for any occasion, this cake brings a refreshing burst of flavor in every bite.",
    allergens: "Contains coconut, dairy, eggs and wheat. Manufactured in a bakery that processes wheat and other nuts."
  }
]; 