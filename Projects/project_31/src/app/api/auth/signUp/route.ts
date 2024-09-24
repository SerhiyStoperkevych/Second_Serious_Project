import { NextResponse } from 'next/server';
import connectDb from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  await connectDb();

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    return NextResponse.json({ message: 'User signed up successfully', user: { email } }, { status: 201 });
  } catch (error) {
    console.error('Error signing up:', (error as Error).message);
    return NextResponse.json({ message: 'Error signing up', error: (error as Error).message }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: 'GET method is not supported for this endpoint' }, { status: 405 });
}
