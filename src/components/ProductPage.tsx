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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { addToCart } = useCart();
  const images = Array.isArray(product.image) ? product.image : [product.image];

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
      <Header setIsMenuOpen={setIsMenuOpen} setIsCartOpen={setIsCartOpen} disableOpacityChange={true} />
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square">
              <Image
                src={images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square ${
                      selectedImageIndex === index ? 'ring-2 ring-orange-500' : ''
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4 text-black">{product.name}</h1>
            
            {/* Price Display */}
            {product.style === 'Mini Cake' ? (
              <div className="mb-6">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-3">Bulk Pricing Available:</h3>
                  <div className="space-y-2 text-orange-700">
                    <div className="flex justify-between">
                      <span>1-3 cakes:</span>
                      <span className="font-medium">$10.00 each</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4-5 cakes:</span>
                      <span className="font-medium">$9.00 each</span>
                    </div>
                    <div className="flex justify-between">
                      <span>6+ cakes:</span>
                      <span className="font-medium">$8.50 each</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>12+ same type:</span>
                      <span className="font-medium">Wholesale pricing</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-2xl font-semibold mb-4 text-black">${product.price.toFixed(2)}</p>
            )}
            
            <p className="text-black mb-6">Serves {product.servings} people</p>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4 text-black">Quantity:</span>
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 border rounded-l text-black"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b text-black">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 border rounded-r text-black"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
            >
              {product.style === 'Mini Cake' 
                ? `Add to Cart - ${quantity} cake${quantity > 1 ? 's' : ''}`
                : `Add to Cart - $${(product.price * quantity).toFixed(2)}`
              }
            </button>

            {/* Product Description */}
            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-black">Description</h2>
                <p className="text-black leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-black">Allergen Information</h2>
                <p className="text-black leading-relaxed bg-orange-50 p-4 rounded-lg border border-orange-200">
                  {product.allergens}
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
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
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