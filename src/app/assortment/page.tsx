// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '../../components/Header';
// import Navigation from '../../components/Navigation';
// import Footer from '../../components/Footer';
// import Cart from '../../components/Cart';
// import Image from 'next/image';
// import { products } from '@/data/products';
// import { getAssortmentProduct } from '@/data/promos';
// import { useCart } from '@/context/CartContext';

// const assortmentOptions = [
//   { id: 'assortment_4', count: 4, price: 36, name: '4 Pack' },
//   { id: 'assortment_6', count: 6, price: 51, name: '6 Pack' },
//   { id: 'assortment_12', count: 12, price: 90, name: '12 Pack' }
// ];

// export default function AssortmentPage() {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [selectedPack, setSelectedPack] = useState(assortmentOptions[0]);
//   const [selectedCakes, setSelectedCakes] = useState<{[key: string]: number}>({});
//   const [isClient, setIsClient] = useState(false);
//   const { addToCart } = useCart();
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Get available mini cakes (exclude assortment products)
//   const availableCakes = products.filter(product => 
//     product.style === 'Mini Cake' && 
//     !product.id.startsWith('assortment_') &&
//     product.promoId === 'assortment'
//   );

//   const getTotalSelected = () => {
//     return Object.values(selectedCakes).reduce((sum, count) => sum + count, 0);
//   };

//   const handleCakeQuantityChange = (cakeId: string, quantity: number) => {
//     const currentTotal = getTotalSelected();
//     const currentCakeCount = selectedCakes[cakeId] || 0;
//     const newTotal = currentTotal - currentCakeCount + quantity;

//     if (newTotal <= selectedPack.count) {
//       setSelectedCakes(prev => ({
//         ...prev,
//         [cakeId]: quantity
//       }));
//     }
//   };

//   const handleAddToCart = () => {
//     const totalSelected = getTotalSelected();
//     if (totalSelected === selectedPack.count) {
//       // Find the assortment product from promos
//       const assortmentProduct = getAssortmentProduct(selectedPack.id);
//       if (assortmentProduct) {
//         // Create a custom product with selected cakes info and quantities
//         const selectedCakesList = Object.entries(selectedCakes)
//           .filter(([, count]) => count > 0)
//           .map(([cakeId, count]) => {
//             const cake = availableCakes.find(c => c.id === cakeId);
//             return `${count}x ${cake?.name.replace(' (Mini)', '') || cakeId}`;
//           })
//           .join(', ');

//         const customAssortment = {
//           ...assortmentProduct,
//           description: `${assortmentProduct.description} Selected cakes: ${selectedCakesList}`,
//           // Store the selected cakes for checkout
//           selectedCakes: selectedCakes
//         };
        
//         addToCart(customAssortment, 1);
        
//         // Reset selection
//         setSelectedCakes({});
        
//         // Show success message
//         alert('Assortment added to cart!');
//       }
//     }
//   };

//   if (!isClient) {
//     return null;
//   }

//   const remainingSlots = selectedPack.count - getTotalSelected();

//   return (
//     <div className="min-h-screen font-['Helvetica','Arial',sans-serif]">
//       <Header 
//         setIsMenuOpen={setIsMenuOpen} 
//         setIsCartOpen={setIsCartOpen}
//         disableOpacityChange={true}
//       />
//       <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
//       <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

//       <main className="pt-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <button 
//               onClick={() => router.back()}
//               className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-4"
//             >
//               ← Back
//             </button>
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">Luxury Mini Cakes Assortment</h1>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               Choose your pack size and select your favorite mini cakes. Mix and match to create the perfect assortment!
//             </p>
//           </div>

//           {/* Pack Size Selection */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-900 mb-4">Choose Your Pack Size</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {assortmentOptions.map((option) => (
//                 <button
//                   key={option.id}
//                   onClick={() => {
//                     setSelectedPack(option);
//                     setSelectedCakes({}); // Reset selections when changing pack size
//                   }}
//                   className={`p-6 rounded-xl border-2 transition-all ${
//                     selectedPack.id === option.id
//                       ? 'border-orange-500 bg-orange-50 shadow-lg'
//                       : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
//                   }`}
//                 >
//                   <div className="text-center">
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
//                     <p className="text-3xl font-bold text-orange-600 mb-2">${option.price}</p>
//                     <p className="text-sm text-gray-600">${(option.price / option.count).toFixed(2)} per cake</p>
//                     <p className="text-xs text-gray-500 mt-2">Save ${((option.count * 10) - option.price).toFixed(2)}</p>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Cake Selection */}
//           <div className="mb-8">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-semibold text-gray-900">Select Your Cakes</h2>
//               <div className="text-lg font-medium text-gray-700">
//                 {getTotalSelected()} / {selectedPack.count} selected
//                 {remainingSlots > 0 && (
//                   <span className="text-orange-600 ml-2">({remainingSlots} remaining)</span>
//                 )}
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//               {availableCakes.map((cake) => {
//                 const quantity = selectedCakes[cake.id] || 0;
//                 const maxQuantity = Math.min(selectedPack.count, quantity + remainingSlots);
                
//                 return (
//                   <div key={cake.id} className="bg-white rounded-xl shadow-md p-4 border">
//                     <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
//                       <Image
//                         src={cake.image[0]}
//                         alt={cake.name}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <h3 className="text-sm font-semibold text-gray-900 mb-3 text-center line-clamp-2">
//                       {cake.name.replace(' (Mini)', '')}
//                     </h3>
                    
//                     <div className="flex items-center justify-center gap-2">
//                       <button
//                         onClick={() => handleCakeQuantityChange(cake.id, Math.max(0, quantity - 1))}
//                         disabled={quantity === 0}
//                         className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         -
//                       </button>
//                       <span className="w-8 text-center font-medium">{quantity}</span>
//                       <button
//                         onClick={() => handleCakeQuantityChange(cake.id, quantity + 1)}
//                         disabled={quantity >= maxQuantity || remainingSlots === 0}
//                         className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Add to Cart */}
//           <div className="text-center">
//             <button
//               onClick={handleAddToCart}
//               disabled={getTotalSelected() !== selectedPack.count}
//               className={`px-8 py-4 rounded-lg text-lg font-semibold transition-colors ${
//                 getTotalSelected() === selectedPack.count
//                   ? 'bg-orange-500 text-white hover:bg-orange-600'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               {getTotalSelected() === selectedPack.count
//                 ? `Add ${selectedPack.name} to Cart - $${selectedPack.price}`
//                 : `Select ${remainingSlots} more cake${remainingSlots !== 1 ? 's' : ''}`
//               }
//             </button>
//           </div>
//         </div>
//       </main>

//       <Footer />

//       {/* Overlay */}
//       {(isCartOpen || isMenuOpen) && (
//         <div 
//           className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
//           onClick={() => {
//             setIsCartOpen(false);
//             setIsMenuOpen(false);
//           }}
//         />
//       )}
//     </div>
//   );
// } 