import ProductModel from '@/models/Product';
import connectDb from '@/lib/mongodb';
import React from 'react';
import { notFound } from 'next/navigation';
import ProductClient from './ProductClient';
import { Product } from '@/types/Product';

interface ProductPageProps {
  params: { id: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  await connectDb();
  const product = await ProductModel.findById(params.id);

  if (!product) {
    return notFound();
  }

  return <ProductClient product={product as unknown as Product} />;
};

export default ProductPage;
