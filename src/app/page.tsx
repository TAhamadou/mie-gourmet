'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HeroCarousel from '../components/HeroCarousel';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { products } from '@/data/products';


// Import gallery images
import gallery1 from '../../public/images/gallery/german_gallery.jpg';
import gallery3 from '../../public/images/gallery/sweet_potato_gallery.jpg';
import gallery4 from '../../public/images/gallery/strawberry_gallery.jpg';
import gallery5 from '../../public/images/gallery/pineapple_delight_gallery.jpg';
import gallery6 from '../../public/images/products/pineapple_dream/pineapple_dream_slice (1).jpg';
import gallery7 from '../../public/images/products/strawberry/strawberry_slice (2).jpg';

// Import the useSort hook
import { useSort } from '../hooks/useSort';

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'name', name: 'Name' },
  { id: 'price-asc', name: 'Price: Low to High' },
  { id: 'price-desc', name: 'Price: High to Low' },
];

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const galleryImages = [
    { src: gallery1, alt: "German Chocolate Cake Gallery" },
    { src: gallery3, alt: "Sweet Potato Cheesecake Gallery" },
    { src: gallery4, alt: "Strawberry Angel Cake Gallery" },
    {
      src: gallery5,
      alt: "Pineapple Delight Cake topped with coconut and pineapple pieces",
      className: "object-cover w-full h-full"
    },
    {
      src: gallery6,
      alt: "Pineapple Delight Cake Slice",
      className: "object-cover w-full h-full"
    },
    {
      src: gallery7,
      alt: "Strawberry Shortcake Slice",
      className: "object-cover w-full h-full"
    },
  ];

  const { sortedItems, sortOption, setSortOption } = useSort(products);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen font-['Helvetica','Arial',sans-serif]">
      <Header setIsMenuOpen={setIsMenuOpen} setIsCartOpen={setIsCartOpen} />
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main>
        <section className="relative mb-4">
          <HeroCarousel images={galleryImages} />
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16">
          <ProductGrid 
            sortedItems={sortedItems}
            sortOption={sortOption}
            setSortOption={setSortOption}
            sortOptions={sortOptions}
          />
        </div>
      </main>

      <Footer />

      {/* Overlay */}
      {(isCartOpen || isMenuOpen) && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
          onClick={() => {
            setIsCartOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}
