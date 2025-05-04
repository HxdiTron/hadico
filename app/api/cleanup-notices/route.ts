import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    // Simulate cleaning up notices older than 30 days
    const mockNotices = [
      { id: 1, title: 'Old Notice', date: '2024-01-01' },
      { id: 2, title: 'Recent Notice', date: '2024-03-15' }
    ];

    const cleanedNotices = mockNotices.filter(notice => {
      const noticeDate = new Date(notice.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return noticeDate > thirtyDaysAgo;
    });

    return NextResponse.json({
      success: true,
      message: 'Notices cleaned up successfully',
      removedCount: mockNotices.length - cleanedNotices.length,
      remainingNotices: cleanedNotices.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to clean up notices' },
      { status: 500 }
    );
  }
} 