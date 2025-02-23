'use client';
import { notFound } from 'next/navigation';
import ProductPage from '@/components/ProductPage';
import { products } from '@/data/products';

export default function ProductDetails({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
} 