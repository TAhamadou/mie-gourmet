import { notFound } from 'next/navigation';
import ProductPage from '@/components/ProductPage';
import { products } from '@/data/products';

// This function tells Next.js which product IDs to pre-render
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetails({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
} 