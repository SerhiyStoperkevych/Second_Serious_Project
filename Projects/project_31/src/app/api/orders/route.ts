import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import connectDb from '@/lib/mongodb';
import OrderModel from '@/models/Order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderRequestBody {
  userId: string;
  cartItems: CartItem[];
  totalAmount: number;
}

export async function POST(req: Request) {
  try {
    const { userId, cartItems, totalAmount }: OrderRequestBody = await req.json();

    if (!userId || !cartItems || !totalAmount) {
      return new Response(JSON.stringify({ message: 'Invalid request data' }), { status: 400 });
    }

    // 1. Connect to the database
    await connectDb();

    // 2. Create an order in the database
    const order = await OrderModel.create({
      userId,
      cartItems,
      totalAmount,
      createdAt: new Date(),
    });

    // 3. Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Convert to cents
      currency: 'usd',
      description: `Order #${order._id}`,
    });

    // 4. Respond with the payment intent
    return new Response(JSON.stringify({ paymentIntent }), { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ statusCode: 500, message: error.message }), { status: 500 });
    } else {
      return new Response(JSON.stringify({ statusCode: 500, message: 'Unknown error occurred' }), { status: 500 });
    }
  }
}
