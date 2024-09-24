import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount, // Make sure amount is passed in cents (100 * total in USD)
        currency: 'usd',
      });

      res.status(200).json(paymentIntent);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ statusCode: 500, message: error.message });
      } else {
        res.status(500).json({ statusCode: 500, message: 'Unknown error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
