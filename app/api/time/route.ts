import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Australia/Sydney' // Set to Sydney timezone
    });
    
    return NextResponse.json({ time: timeString });
  } catch (error) {
    console.error('Time API error:', error);
    return NextResponse.json({ time: '12:00 PM' }); // Fallback time
  }
} 