import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Simulate sending email (in a real app, this would use an email service)
    const mockEmailSent = {
      to: 'management@hadi&co.au',
      from: body.email,
      subject: `New Contact Form Submission: ${body.subject}`,
      body: `
        Name: ${body.name}
        Email: ${body.email}
        Phone: ${body.phone}
        Subject: ${body.subject}
        Message: ${body.message}
      `
    };

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: mockEmailSent
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
} 