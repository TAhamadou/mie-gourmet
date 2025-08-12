'use client';
import Image from "next/image";
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { Product, ProductType, ProductStyle } from '../types/Product';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface ProductGridProps {
  sortedItems: Product[];
  sortOption: string;
  setSortOption: (value: string) => void;
  sortOptions: { id: string; name: string; }[];
}

export default function ProductGrid({ sortedItems, sortOption, setSortOption, sortOptions }: ProductGridProps) {
  const [selectedType, setSelectedType] = useState<'all' | ProductType>('all');
  const [selectedStyle, setSelectedStyle] = useState<'all' | ProductStyle>('all');
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  
  const typeOptions = [
    { id: 'all', name: 'All Products' },
    { id: 'Cheesecake', name: 'Cheesecakes' },
    { id: 'Layer Cake', name: 'Layer Cakes' },
    { id: 'Bun Cake', name: 'Bun Cakes' }
  ];

  const styleOptions = [
    { id: 'all', name: 'All Sizes' },
    { id: 'Mini Cake', name: 'Mini Cakes' },
    { id: 'Whole Cake', name: 'Whole Cakes' }
  ];

  const filteredItems = sortedItems.filter(item => {
    const typeMatch = selectedType === 'all' || item.productType === selectedType;
    const styleMatch = selectedStyle === 'all' || item.style === selectedStyle;
    return typeMatch && styleMatch;
  });

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedToCart(product.id);
    
    // Clear the "added" state after 2 seconds
    setTimeout(() => {
      setAddedToCart(null);
    }, 2000);
  };

  return (
    <section>
      <div className="flex justify-end mb-6 gap-4">
        {/* Product Type Filter */}
        <div className="relative w-72">
          <Listbox value={selectedType} onChange={setSelectedType}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-orange-50 border border-orange-200 py-2 pl-3 pr-10 text-left text-gray-900 shadow-md hover:border-orange-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-opacity-50 transition-all duration-200">
                <span className="block truncate">
                  {typeOptions.find(option => option.id === selectedType)?.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-700"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-orange-50 border border-orange-200 py-1 text-base shadow-xl focus:outline-none z-[60]">
                {typeOptions.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    value={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-orange-100 text-gray-900 border-l-2 border-orange-500' : 'text-gray-700'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${
                          selected ? 'font-medium text-gray-900' : 'font-normal'
                        }`}>
                          {option.name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-500">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Product Style Filter */}
        <div className="relative w-72">
          <Listbox value={selectedStyle} onChange={setSelectedStyle}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-orange-50 border border-orange-200 py-2 pl-3 pr-10 text-left text-gray-900 shadow-md hover:border-orange-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-opacity-50 transition-all duration-200">
                <span className="block truncate">
                  {styleOptions.find(option => option.id === selectedStyle)?.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-700"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-orange-50 border border-orange-200 py-1 text-base shadow-xl focus:outline-none z-[60]">
                {styleOptions.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    value={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-orange-100 text-gray-900 border-l-2 border-orange-500' : 'text-gray-700'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${
                          selected ? 'font-medium text-gray-900' : 'font-normal'
                        }`}>
                          {option.name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-500">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Existing Sort Dropdown */}
        <div className="relative w-72">
          <Listbox value={sortOption} onChange={setSortOption}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-orange-50 border border-orange-200 py-2 pl-3 pr-10 text-left text-gray-900 shadow-md hover:border-orange-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-opacity-50 transition-all duration-200">
                <span className="block truncate">
                  {sortOptions.find(option => option.id === sortOption)?.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-700"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-orange-50 border border-orange-200 py-1 text-base shadow-xl focus:outline-none z-[60]">
                {sortOptions.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    value={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-orange-100 text-gray-900 border-l-2 border-orange-500' : 'text-gray-700'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${
                          selected ? 'font-medium text-gray-900' : 'font-normal'
                        }`}>
                          {option.name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-500">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </div>

      {/* Grid container */}
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredItems.map((product) => (
            <div key={product.id} className="group transition-transform duration-300 hover:scale-105">
              <Link 
                href={`/product/${product.id}`}
                className="block"
              >
                <div className="relative aspect-square mb-2 sm:mb-4 overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={product.image[0]}
                    alt={product.name}
                    priority={false}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 
                    className="text-sm sm:text-lg font-bold mb-2 sm:mb-4 truncate px-1" 
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between px-2 sm:px-4">
                    <div className="space-y-0.5">
                      <p className="text-sm sm:text-lg text-orange-500">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-xs sm:text-sm text-black font-medium">
                        Servings: {product.servings}
                      </p>
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`py-1 sm:py-2 px-2 sm:px-6 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
                        addedToCart === product.id
                          ? 'bg-green-500 text-white'
                          : 'bg-orange-500 text-white hover:bg-orange-600'
                      }`}
                    >
                      {addedToCart === product.id ? 'Added!' : 'Order Now'}
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 