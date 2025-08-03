'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/Product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  clearCart: () => void;
  getMiniCakePrice: (product: Product, quantity: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Calculate price for mini cakes based on quantity
  const getMiniCakePrice = (product: Product, quantity: number): number => {
    // Only apply bulk pricing to mini cakes
    if (product.style !== 'Mini Cake') {
      return product.price;
    }

    // Bulk pricing tiers for mini cakes
    if (quantity >= 12) {
      // Wholesale pricing - need to determine wholesale price based on cake type
      // For now, using $8.50 as wholesale price, but this could be customized per product
      return 8.50;
    } else if (quantity >= 6) {
      return 8.50;
    } else if (quantity >= 4) {
      return 9.00;
    } else {
      return 10.00;
    }
  };

  const addToCart = (product: Product, quantity: number) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...currentItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      let itemPrice;
      
      if (item.product.style === 'Mini Cake') {
        // Apply bulk pricing for mini cakes
        itemPrice = getMiniCakePrice(item.product, item.quantity);
      } else {
        // Regular pricing for whole cakes
        itemPrice = item.product.price;
      }
      
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getItemCount,
      clearCart,
      getMiniCakePrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 