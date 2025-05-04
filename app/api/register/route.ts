import { NextResponse } from 'next/server';
import { storage } from '@/app/utils/storage';

export const runtime = 'edge';

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  unitNumber: string;
}

export async function POST(request: Request) {
  try {
    const body: RegisterRequest = await request.json();

    // Validate input
    if (!body.email || !body.password || !body.name || !body.unitNumber) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await storage.findUserByEmail(body.email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: body.email,
      password: body.password,
      name: body.name,
      unitNumber: body.unitNumber
    };

    // Add user to storage
    await storage.addUser(newUser);

    // Return success with user data (excluding password)
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        unitNumber: newUser.unitNumber
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to register' },
      { status: 500 }
    );
  }
} 