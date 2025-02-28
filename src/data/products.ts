import { Product } from '@/types/Product';
import germanImage from '../../public/images/german/german_main.jpg';
import strawberryImage from '../../public/images/strawberry/strawberry_main.jpg';
import strawberrySlice1 from '../../public/images/strawberry/strawberry_slice (1).jpg';
import strawberrySlice2 from '../../public/images/strawberry/strawberry_slice (2).jpg';
import sweetPotatoImage from '../../public/images/sweet_potato/sweet_potato_main.jpg';
import pineappleDreamImage from '../../public/images/pineapple_dream/pineapple_dream_main.jpg';
import pineappleDreamSlice1 from '../../public/images/pineapple_dream/pineapple_dream_slice (1).jpg';
import pineappleDreamSlice2 from '../../public/images/pineapple_dream/pineapple_dream_slice (2).jpg';
// import MieSeal from '../../public/images/logo/Mie-Seal.svg';


export const products: Product[] = [
  {
    id: 'german',
    name: "German Sweet Chocolate Delight",
    price: 75.00,
    servings: "16-20",
    image: [germanImage.src],
    description: "A rich and classic favorite, this decadent chocolate cake features layers of moist, sweet chocolate cake filled with a luscious coconut-pecan frosting made with caramelized sugar, butter, toasted pecans, and shredded coconut. Each bite is a perfect balance of deep chocolate flavor and a nutty, creamy filling. Finished with a smooth chocolate glaze and a final touch of coconut-pecan frosting, this timeless dessert is perfect for any occasion.",
    allergens: "Contains coconut, dairy, eggs, wheat, and pecans. Manufactured in a bakery that processes wheat and other nuts.",
    productType: "Layer Cake"
  },
  {
    id: 'strawberry',
    name: "Strawberry Shortcake",
    price: 70.00,
    servings: "16-20",
    image: [strawberryImage.src, strawberrySlice1.src, strawberrySlice2.src],
    description: "Layers of soft, fluffy vanilla cake are filled with fresh sliced strawberries in a handmade strawberry compote and silky whipped cream, creating a light yet satisfying dessert. Topped with even more strawberries and a cloud of whipped cream, this classic treat is bursting with fresh, juicy flavor in every bite. Perfect for any occasion, it's a timeless favorite that never disappoints.",
    allergens: "Contains dairy, eggs, and wheat. Manufactured in a bakery that processes wheat and other nuts.",
    productType: "Layer Cake"
  },
  {
    id: 'sweet_potato',
    name: "So'Sweet Potato Cheesecake",
    price: 65.00,
    servings: "8-10",
    image: [sweetPotatoImage.src],
    description: "This creamy desert is a perfect blend of rich cheesecake and sweet potato pie. Made with velvety sweet potato puree, warm spices, lemon zest, shredded coconut and a buttery graham cracker crust, it delivers a smooth, indulgent texture with just the right touch of sweetness. Topped with a light whipped cream and a sprinkle of graham cracker crumbs, this dessert is a comforting twist on a classic favorite.",
    allergens: "Contains coconut, dairy, eggs, and wheat. Manufactured in a bakery that processes wheat and other nuts.",
    productType: "Cheesecake"
  },
  {
    id: 'pineapple_dream',
    name: "Pineapple Dream Cake",
    price: 70.00,
    servings: "16-20",
    image: [pineappleDreamImage.src, pineappleDreamSlice1.src, pineappleDreamSlice2.src],
    description: "A tropical delight, this four-layer cake is filled with smooth whipped cream, crushed pineapple and rich coconut pudding all blended with toasted coconut for the perfect balance of flavor and texture. Each moist, golden cake layer is stacked high and finished with a whipped cream frosting, a sprinkle of toasted coconut, and a crown coconut pudding for a sweet, satisfying finish. Perfect for any occasion, this cake brings a refreshing burst of flavor in every bite.",
    allergens: "Contains coconut, dairy, eggs and wheat. Manufactured in a bakery that processes wheat and other nuts.",
    productType: "Layer Cake"
  },
  // {
  //   id: 'pineapple-upside',
  //   name: "Pineapple Upside Down Cheesecake",
  //   price: 65.00,
  //   servings: "16-20",
  //   image: [MieSeal],
  //   description: "A tropical twist on two classics. Our creamy cheesecake is topped with caramelized pineapple rings and maraschino cherries, all nestled on a buttery graham cracker crust. The perfect blend of tangy and sweet, this unique dessert brings the taste of paradise to your table.",
  //   allergens: "Contains coconut, dairy, eggs and wheat. Manufactured in a bakery that processes wheat and other nuts.",
  //   productType: "Cheesecake"
  // },
  // {
  //   id: 'black-forest-cake',
  //   name: 'Black Forest Cake',
  //   price: 70,
  //   servings: '16-20',
  //   image: [MieSeal],
  //   description: 'Rich. Decadent. Unforgettable. Indulge in layers of moist chocolate cake, luscious cherry filling, and velvety whipped cream topped with dark chocolate shavings and fresh cherries. This isn\'t your average dessert. It\'s a Black Forest Cake made from scratch with the finest ingredients and crafted to perfection. Perfect for celebrations, special occasions, or when you just need something extraordinary. Order Yours Today!',
  //   allergens: 'Contains dairy, eggs, and wheat. Manufactured in a bakery that processes wheat and other nuts.',
  //   productType: "Layer Cake"
  // },
  // {
  //   id: 'carrot-cake',
  //   name: 'Carrot Cake',
  //   price: 70,
  //   servings: '16-20',
  //   image: [MieSeal],
  //   description: 'The Classic, Elevated. Our signature Carrot Cake is a slice of comfort spiced to perfection, packed with fresh carrots, and layered with silky cream cheese frosting. Every bite is moist, rich, and balanced with a hint of cinnamon and a touch of love. Homemade. Fresh. Irresistible. Treat yourself. Place Your Order Now!',
  //   allergens: 'Contains dairy, eggs, wheat and tree nuts. Manufactured in a bakery that processes wheat and other nuts.',
  //   productType: "Layer Cake"
  // },
  // {
  //   id: 'cherry-bliss-cheesecake',
  //   name: 'Cherry Bliss Cheesecake',
  //   price: 60,
  //   servings: '16-20',
  //   image: [MieSeal],
  //   description: 'Rich. Luscious. Irresistible. Velvety smooth cheesecake crowned with a cascade of juicy, sweet cherries dripping with flavor over a buttery crust. It\'s dessert, elevated. One forkful, and you\'re hooked.',
  //   allergens: 'Contains coconut, dairy, eggs and wheat. Manufactured in a bakery that processes wheat and other nuts.',
  //   productType: "Cheesecake"
  // },
  // {
  //   id: 'blueberry-cheesecake',
  //   name: 'Blueberry Cheesecake',
  //   price: 60,
  //   servings: '16-20',
  //   image: [MieSeal],
  //   description: 'Berry Rush in Every Bite. Velvety cheesecake, swirled with juicy blueberries and kissed with a golden crust. Fresh, fruity, and dangerously smooth. This is what dessert was meant to be.',
  //   allergens: 'Contains coconut, dairy, eggs and wheat. Manufactured in a bakery that processes wheat and other nuts.',
  //   productType: "Cheesecake"
  // },
  // {
  //   id: 'strawberry-cheesecake',
  //   name: 'Strawberry Cheesecake',
  //   price: 60,
  //   servings: '16-20',
  //   image: [MieSeal],
  //   description: 'Fresh. Fruity. Flawless. A layer of ripe strawberries resting on creamy cheesecake, wrapped in a delicate graham crust. It\'s the taste of summer all year long.',
  //   allergens: 'Contains coconut, dairy, eggs and wheat. Manufactured in a bakery that processes wheat and other nuts.',
  //   productType: "Cheesecake"
  // },
  // {
  //   id: 'new-york-cheesecake',
  //   name: 'New York Cheesecake',
  //   price: 55,
  //   servings: '16-20',
  //   image: [MieSeal],
  //   description: 'Thick. Creamy. Iconic. A rich, velvety cheesecake with that perfect golden top and a buttery graham crust that melts in your mouth.',
  //   allergens: 'Contains coconut, dairy, eggs and wheat. Manufactured in a bakery that processes wheat and other nuts.',
  //   productType: "Cheesecake"
  // }
]; 