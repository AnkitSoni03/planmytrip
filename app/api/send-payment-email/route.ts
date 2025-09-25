import { sendPaymentSuccessEmail } from '@/lib/email-confirm-service';
import { NextResponse } from 'next/server';

// Define types for the request body
interface BookingDetails {
  bookingId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  amount: number;
}

interface RequestBody {
  userEmail: string;
  userName: string;
  bookingDetails: BookingDetails;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { userEmail, userName, bookingDetails } = body;

    // Validation
    if (!userEmail || !userName || !bookingDetails) {
      console.error('❌ Missing required fields:', { userEmail, userName, bookingDetails });
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      console.error('❌ Invalid email format:', userEmail);
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate booking details
    if (!bookingDetails.bookingId || !bookingDetails.from || !bookingDetails.to) {
      console.error('❌ Incomplete booking details:', bookingDetails);
      return NextResponse.json(
        { success: false, error: 'Incomplete booking details' },
        { status: 400 }
      );
    }

    console.log('📧 Sending payment confirmation email...');
    console.log('🎯 To:', userEmail);
    console.log('👤 User:', userName);
    console.log('📋 Booking:', bookingDetails.bookingId);
    
    // Send email
    const emailResult = await sendPaymentSuccessEmail(userEmail, userName, bookingDetails);
    
    console.log('✅ Email sent successfully!', emailResult.messageId);
    
    return NextResponse.json({
      success: true,
      message: 'Payment confirmation email sent successfully!',
      emailId: emailResult.messageId,
      sentTo: userEmail
    });

  } catch (error: any) {
    console.error('❌ API Error - Failed to send payment email:');
    console.error('Error details:', error);
    console.error('Stack trace:', error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send confirmation email',
        details: error.message 
      },
      { status: 500 }
    );
  }
}