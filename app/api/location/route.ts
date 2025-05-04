import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    // Use ip-api.com instead of ipapi.co as it's more reliable
    const response = await fetch('http://ip-api.com/json/');
    const data = await response.json();
    
    if (data.status === 'success') {
      return NextResponse.json({
        city: data.city || 'Sydney',
        country: data.country || 'Australia'
      });
    } else {
      // Fallback to Sydney, Australia if the API fails
      return NextResponse.json({
        city: 'Sydney',
        country: 'Australia'
      });
    }
  } catch (error) {
    console.error('Location API error:', error);
    // Fallback to Sydney, Australia if the API fails
    return NextResponse.json({
      city: 'Sydney',
      country: 'Australia'
    });
  }
} 