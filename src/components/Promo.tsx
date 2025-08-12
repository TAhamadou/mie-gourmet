'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Product, Promo as PromoType } from '@/types/Product';

interface PromoProps {
  promo: PromoType;
  products: Product[];
  isVisible?: boolean;
}

export default function Promo({ promo, products, isVisible = true }: PromoProps) {
  if (!isVisible || !promo.isActive) {
    return null;
  }

  const promoProducts = products.filter(product => product.promoId === promo.id);

  const getPricingTiers = () => {
    return [
      { quantity: 4, price: 36, label: '4 Mini Cakes' },
      { quantity: 6, price: 51, label: '6 Mini Cakes' },
      { quantity: 12, price: 90, label: '12 Mini Cakes' }
    ];
  };

  return (
    <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            LUXURY MINI CAKES
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {promo.description}
          </p>
        </div>

        {/* Integrated Content Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Pricing Tiers Section */}
          <div className="px-8 pt-12 pb-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Special Assortment Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {getPricingTiers().map((tier) => (
                <Link key={tier.quantity} href="/assortment" className="block">
                  <div className="text-center group">
                    <div className="bg-orange-100 rounded-xl p-6 hover:bg-orange-200 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-orange-300 group-hover:shadow-lg">
                      <div className="flex items-center justify-center mb-4">
                        <div className="bg-orange-500 rounded-lg p-3 group-hover:bg-orange-600 transition-colors">
                          <span className="text-white font-bold text-lg">
                            {tier.quantity}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {tier.label}
                      </h4>
                      <p className="text-3xl font-bold text-orange-600 mb-2">
                        ${tier.price}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        ${(tier.price / tier.quantity).toFixed(2)} per cake
                      </p>
                      <p className="text-xs text-orange-600 font-medium">
                        Click to customize →
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                href="/shop"
                className="inline-block w-full sm:w-auto bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Buy Individual Cakes
              </Link>
              <Link
                href="/assortment"
                className="inline-block w-full sm:w-auto bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Create Your Assortment
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center px-8">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-6 py-2 text-sm font-medium text-gray-500 rounded-full border border-gray-200">
                Mix & match any combination
              </span>
            </div>
          </div>

          {/* Products Grid Section */}
          <div className="px-8 pt-8 pb-12">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Available in Our Assortments
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {promoProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="group h-full">
                  <Link href={`/product/${product.id}`} className="block h-full">
                    <div className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 p-4 border-2 border-gray-200 h-full flex flex-col">
                      <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="text-center flex-1 flex flex-col justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                          {product.name.replace(' (Mini)', '')}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {product.productType === 'Cheesecake' ? 'Creamy cheesecake' : 'Moist cake layered'} with premium ingredients
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
} 