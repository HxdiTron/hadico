import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface LoginAttempt {
  email: string;
  password: string;
}

// In a real app, this would be stored in a database
const loginAttempts = new Map<string, { count: number; lastAttempt: Date }>();

export async function POST(request: Request) {
  try {
    const body: LoginAttempt = await request.json();

    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, error: 'Missing email or password' },
        { status: 400 }
      );
    }

    // Check for too many login attempts
    const attempts = loginAttempts.get(body.email);
    if (attempts) {
      const timeSinceLastAttempt = Date.now() - attempts.lastAttempt.getTime();
      if (attempts.count >= 5 && timeSinceLastAttempt < 15 * 60 * 1000) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Too many login attempts. Please try again in 15 minutes.' 
          },
          { status: 429 }
        );
      }
    }

    // Simulate login check (in a real app, this would check against a database)
    if (body.email === 'test@example.com' && body.password === 'password123') {
      // Reset login attempts on successful login
      loginAttempts.delete(body.email);
      
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        token: 'mock-jwt-token'
      });
    } else {
      // Record failed attempt
      const currentAttempts = attempts || { count: 0, lastAttempt: new Date() };
      loginAttempts.set(body.email, {
        count: currentAttempts.count + 1,
        lastAttempt: new Date()
      });

      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
} 