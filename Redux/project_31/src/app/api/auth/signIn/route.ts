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
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    return NextResponse.json({ message: 'User signed in successfully', user: { email } });
  } catch (error) {
    return NextResponse.json({ message: 'Error signing in', error }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: 'GET method is not supported for this endpoint' }, { status: 405 });
}
