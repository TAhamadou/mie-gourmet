// 'use client';
// import { useState, useEffect } from 'react';
// import Header from '../../components/Header';
// import Navigation from '../../components/Navigation';
// import ProductGrid from '../../components/ProductGrid';
// import Footer from '../../components/Footer';
// import Cart from '../../components/Cart';
// import { products } from '@/data/products';
// import { useSort } from '../../hooks/useSort';

// const sortOptions = [
//   { id: 'featured', name: 'Featured' },
//   { id: 'name', name: 'Name' },
//   { id: 'price-asc', name: 'Price: Low to High' },
//   { id: 'price-desc', name: 'Price: High to Low' },
// ];

// export default function Shop() {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const { sortedItems, sortOption, setSortOption } = useSort(products);

//   if (!isClient) {
//     return null;
//   }

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
          
//           <ProductGrid 
//             sortedItems={sortedItems}
//             sortOption={sortOption}
//             setSortOption={setSortOption}
//             sortOptions={sortOptions}
//           />
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