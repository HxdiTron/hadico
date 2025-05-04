import { NextResponse } from 'next/server';
import { storage } from '@/app/utils/storage';

export const runtime = 'edge';

interface LoginRequest {
  email: string;
  password: string;
}

// Track login attempts for rate limiting
const loginAttempts = new Map<string, { count: number; timestamp: number }>();

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();

    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, error: 'Missing User ID or password' },
        { status: 400 }
      );
    }

    // Check for rate limiting
    const attempts = loginAttempts.get(body.email);
    if (attempts && attempts.count >= 5) {
      const timeSinceLastAttempt = Date.now() - attempts.timestamp;
      if (timeSinceLastAttempt < 15 * 60 * 1000) {
        return NextResponse.json(
          { success: false, error: 'Too many login attempts. Please try again later.' },
          { status: 429 }
        );
      }
      loginAttempts.delete(body.email);
    }

    // Find user
    const user = await storage.findUserByEmail(body.email);
    
    if (!user || user.password !== body.password) {
      // For development/testing purposes, allow admin login
      const adminUser = process.env.NEXT_PUBLIC_ADMIN_USER || 'admin';
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'password123';
      
      if (body.email === adminUser && body.password === adminPassword) {
        return NextResponse.json({
          success: true,
          user: {
            id: '1',
            email: adminUser,
            name: 'Administrator',
            unitNumber: 'Admin'
          }
        });
      }

      // Update login attempts
      const currentAttempts = loginAttempts.get(body.email) || { count: 0, timestamp: Date.now() };
      loginAttempts.set(body.email, {
        count: currentAttempts.count + 1,
        timestamp: currentAttempts.timestamp
      });

      return NextResponse.json(
        { success: false, error: 'Invalid User ID or password' },
        { status: 401 }
      );
    }

    // Reset login attempts on successful login
    loginAttempts.delete(body.email);

    // Return success with user data (excluding password)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        unitNumber: user.unitNumber
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to login' },
      { status: 500 }
    );
  }
} 