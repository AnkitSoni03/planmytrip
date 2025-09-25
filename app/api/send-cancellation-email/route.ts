import { sendBookingCancellationEmail } from '@/lib/email-cancel-service';
import { NextResponse } from 'next/server';

// Define types for the request body
interface BookingDetails {
  bookingId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  amount: number;
  passengerName: string;
}

interface RequestBody {
  userEmail: string;
  userName: string;
  bookingDetails: BookingDetails;
  cancellationReason?: string;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { userEmail, userName, bookingDetails, cancellationReason } = body;

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

    console.log('📧 Sending booking cancellation email...');
    console.log('🎯 To:', userEmail);
    console.log('👤 User:', userName);
    console.log('📋 Booking:', bookingDetails.bookingId);
    if (cancellationReason) {
      console.log('📝 Reason:', cancellationReason);
    }
    
    // Send cancellation email
    const emailResult = await sendBookingCancellationEmail(
      userEmail, 
      userName, 
      bookingDetails, 
      cancellationReason
    );
    
    console.log('✅ Cancellation email sent successfully!', emailResult.messageId);
    
    return NextResponse.json({
      success: true,
      message: 'Booking cancellation email sent successfully!',
      emailId: emailResult.messageId,
      sentTo: userEmail
    });

  } catch (error: any) {
    console.error('❌ API Error - Failed to send cancellation email:');
    console.error('Error details:', error);
    console.error('Stack trace:', error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send cancellation email',
        details: error.message 
      },
      { status: 500 }
    );
  }
}