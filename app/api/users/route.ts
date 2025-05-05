import { NextResponse } from 'next/server';
import { storage } from '@/app/utils/storage';

export async function GET() {
  try {
    const users = await storage.getUsers();
    
    // Return only necessary user information
    const formattedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name
    }));

    return NextResponse.json({ users: formattedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
} 