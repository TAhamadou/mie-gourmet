'use client';
import Image from 'next/image';
import { Product } from '../types/Product';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Cart from './Cart';

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen font-['Helvetica','Arial',sans-serif]">
      <Header setIsMenuOpen={setIsMenuOpen} setIsCartOpen={setIsCartOpen} />
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-6">Serves {product.servings} people</p>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4">Quantity:</span>
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 border rounded-l"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 border rounded-r"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>

            {/* Product Description */}
            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Allergen Information</h2>
                <p className="text-gray-600 leading-relaxed bg-orange-50 p-4 rounded-lg border border-orange-200">
                  ⚠️ {product.allergens}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Overlay */}
      {(isCartOpen || isMenuOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setIsCartOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
} 