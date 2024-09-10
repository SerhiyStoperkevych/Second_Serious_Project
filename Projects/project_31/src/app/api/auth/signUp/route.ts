import { NextResponse } from 'next/server';
import connectDb from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  await connectDb();
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    return NextResponse.json({ message: 'User signed up successfully', user: { email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error signing up', error }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: 'GET method is not supported for this endpoint' }, { status: 405 });
}
