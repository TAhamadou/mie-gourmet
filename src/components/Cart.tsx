'use client';
import { useCart } from '@/context/CartContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import Checkout from './Checkout';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-700 text-lg text-center py-8 font-medium">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border-b pb-6">
                    <div className="relative w-24 h-24">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.product.name}</h3>
                      <p className="text-gray-900 font-medium mb-2">${item.product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
                        >
                          -
                        </button>
                        <span className="text-gray-900 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-600 text-sm font-medium ml-auto hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-6">
                <div className="flex justify-between text-xl mb-6">
                  <span className="font-semibold text-gray-900">Subtotal</span>
                  <span className="font-bold text-gray-900">${getCartTotal().toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  );
} 