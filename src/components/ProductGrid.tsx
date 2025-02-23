'use client';
import Image from "next/image";
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { Product } from '../types/Product';
import Link from 'next/link';

interface ProductGridProps {
  sortedItems: Product[];
  sortOption: string;
  setSortOption: (value: string) => void;
  sortOptions: { id: string; name: string; }[];
}

export default function ProductGrid({ sortedItems, sortOption, setSortOption, sortOptions }: ProductGridProps) {
  return (
    <section>
      <div className="flex justify-end mb-6">
        <div className="relative w-72">
          <Listbox value={sortOption} onChange={setSortOption}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-black py-2 pl-3 pr-10 text-left text-white shadow-md focus:outline-none">
                <span className="block truncate">
                  {sortOptions.find(option => option.id === sortOption)?.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black py-1 text-base shadow-lg focus:outline-none z-[60]">
                {sortOptions.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    value={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-gray-900 text-white' : 'text-gray-300'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}>
                          {option.name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
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
          {sortedItems.map((product) => (
            <Link 
              href={`/product/${product.id}`} 
              key={product.id}
              className="group transition-transform duration-300 hover:scale-105"
            >
              <div className="relative aspect-square mb-2 sm:mb-4 overflow-hidden rounded-lg shadow-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
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
                    <p className="text-xs sm:text-sm text-gray-100 font-medium">
                      Serves {product.servings} people
                    </p>
                  </div>
                  <button className="bg-orange-500 text-white py-1 sm:py-2 px-2 sm:px-6 rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm font-medium">
                    Order Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 