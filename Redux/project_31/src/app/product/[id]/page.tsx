// /app/product/[id]/page.tsx
import ProductModel from '@/models/Product';
import connectDb from '@/lib/mongodb';
import React from 'react';
import { notFound } from 'next/navigation';
import ProductClient from './ProductClient';
import { Product } from '@/types/Product';

const ProductPage = async ({ params }: { params: { id: string } }) => {
  await connectDb(); // Connect to the database
  const productDoc = await ProductModel.findById(params.id).lean().exec();

  if (!productDoc) {
    return notFound(); // Return 404 if the product is not found
  }

  // Type assertion to ensure productDoc matches Product type
  const product = productDoc as Product;

  return <ProductClient product={product} />;
};

export default ProductPage;
