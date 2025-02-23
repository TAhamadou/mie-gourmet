import { useState } from 'react';
import { Product } from '../types/Product';

export function useSort(items: Product[]) {
  const [sortOption, setSortOption] = useState('featured');

  const sortedItems = [...items].sort((a, b) => {
    switch (sortOption) {
      case 'name':
        return a.name.localeCompare(b.name);
      
      case 'price-asc':
        return a.price - b.price;
      
      case 'price-desc':
        return b.price - a.price;
      
      case 'featured':
      default:
        // For featured, maintain original order
        return items.indexOf(a) - items.indexOf(b);
    }
  });

  return { sortedItems, sortOption, setSortOption };
} 