import nodemailer from "nodemailer";

interface BookingDetails {
  bookingId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  amount: number;
  passengerName: string;
}

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: parseInt(process.env.BREVO_SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
  });
};

export const sendBookingCancellationEmail = async (
  userEmail: string,
  userName: string,
  bookingDetails: BookingDetails,
  cancellationReason?: string
) => {
  const transporter = createTransporter();

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; color: #333; line-height: 1.6; }
      .container { max-width: 600px; margin: 20px auto; background: #ffffff; }
      .header { background: #d32f2f; color: white; padding: 30px 20px; text-align: center; }
      .header h1 { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
      .header p { font-size: 14px; opacity: 0.9; }
      .logo { font-size: 20px; font-weight: bold; color: #ffffff; margin-bottom: 10px; }
      .content { padding: 30px; }
      .greeting { font-size: 16px; margin-bottom: 20px; color: #555; }
      .cancellation-badge { background: #d32f2f; color: white; padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
      .booking-card { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 25px 0; }
      .booking-title { font-size: 18px; font-weight: 600; color: #2c3e50; margin-bottom: 15px; border-bottom: 1px solid #dee2e6; padding-bottom: 10px; }
      .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f1f1; }
      .detail-label { color: #6c757d; font-weight: 500; }
      .detail-value { color: #2c3e50; font-weight: 600; text-align: right; }
      .amount-highlight { color: #d32f2f; font-size: 16px; }
      .route-display { text-align: center; margin: 20px 0; padding: 15px; background: #ffeaea; border-radius: 6px; border-left: 4px solid #d32f2f; }
      .route-arrow { margin: 0 15px; color: #d32f2f; font-weight: bold; }
      .refund-info { background: #e8f5e8; border-left: 4px solid #27ae60; padding: 15px; margin: 20px 0; border-radius: 4px; }
      .cancellation-reason { background: #fff8e1; border-left: 4px solid #ffa000; padding: 15px; margin: 20px 0; border-radius: 4px; }
      .new-booking-btn { display: block; background: #2c3e50; color: white; text-align: center; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 25px auto; width: fit-content; }
      .support-section { background: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin: 20px 0; border-radius: 4px; }
      .footer { background: #2c3e50; color: #bdc3c7; padding: 25px 20px; text-align: center; font-size: 12px; }
      .contact-info { margin: 15px 0; line-height: 1.8; }
      .disclaimer { font-size: 11px; color: #95a5a6; margin-top: 15px; border-top: 1px solid #34495e; padding-top: 15px; }
      .refund-timeline { background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 6px; border: 1px solid #e9ecef; }
      .timeline-item { display: flex; align-items: center; margin: 10px 0; }
      .timeline-dot { width: 8px; height: 8px; background: #27ae60; border-radius: 50%; margin-right: 10px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">PlanMyTrip</div>
        <h1>Booking Cancellation</h1>
        <p>Reference #${bookingDetails.bookingId}</p>
      </div>

      <div class="content">
        <p class="greeting">Dear ${userName},</p>
        
        <div class="cancellation-badge">BOOKING CANCELLED • REFUND INITIATED</div>
        
        <p>Your booking cancellation request has been processed successfully. We're sorry to see you go and hope to serve you better in the future.</p>

        <div class="booking-card">
          <div class="booking-title">Cancelled Booking Details</div>
          
          <div class="route-display">
            <strong>${bookingDetails.from}</strong>
            <span class="route-arrow">→</span>
            <strong>${bookingDetails.to}</strong>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Booking Reference :&nbsp;</span>
            <span class="detail-value">#${bookingDetails.bookingId}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Passenger Name :&nbsp;</span>
            <span class="detail-value">${bookingDetails.passengerName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Journey Date :&nbsp;</span>
            <span class="detail-value">${bookingDetails.date}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Pickup Time :&nbsp;</span>
            <span class="detail-value">${bookingDetails.time}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Refund Amount :&nbsp;</span>
            <span class="detail-value amount-highlight">₹${bookingDetails.amount.toLocaleString("en-IN")}</span>
          </div>
        </div>

        ${cancellationReason ? `
        <div class="cancellation-reason">
          <strong>Cancellation Reason:</strong>
          <p>${cancellationReason}</p>
        </div>
        ` : ''}

        <div class="refund-info">
          <strong>💰 Refund Successfully Initiated</strong>
          <p>Your refund of <strong>₹${bookingDetails.amount.toLocaleString("en-IN")}</strong> has been processed and will be credited to your original payment method.</p>
        </div>

        <div class="refund-timeline">
          <strong>Refund Timeline:</strong>
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <span>Refund initiated immediately</span>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <span>Processing by payment gateway: 1-2 business days</span>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <span>Reflect in your account: 5-7 business days</span>
          </div>
        </div>

        <div class="support-section">
          <strong>Need Assistance?</strong>
          <p>If you have any questions about your refund or need help with a new booking, our support team is here to help.</p>
        </div>

        <a href="https://planmytrip247.vercel.app/booking" class="new-booking-btn">
          Create New Booking
        </a>

        <p>We value your business and hope to welcome you back soon for your future travel needs.</p>
      </div>

      <div class="footer">
        <div class="contact-info">
          <strong>PlanMyTrip Customer Support</strong><br>
          📧 Email: <a href="mailto:planmytrip360@gmail.com" style="color: #3498db;">planmytrip360@gmail.com</a><br>
          🌐 Website: <a href="https://planmytrip247.vercel.app" style="color: #3498db;">planmytrip247.vercel.app</a>
        </div>
        <div class="disclaimer">
          This is an automated cancellation confirmation. Please do not reply to this email.<br>
          &copy; ${new Date().getFullYear()} PlanMyTrip. All rights reserved.
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: `"PlanMyTrip" <${process.env.FROM_EMAIL}>`,
    to: userEmail,
    subject: `Booking Cancellation Confirmation #${bookingDetails.bookingId} - PlanMyTrip`,
    html: htmlContent,
    text: `
BOOKING CANCELLATION CONFIRMATION

Dear ${userName},

Your booking cancellation request has been processed successfully.

CANCELLED BOOKING DETAILS:
Booking Reference: #${bookingDetails.bookingId}
Passenger Name: ${bookingDetails.passengerName}
Route: ${bookingDetails.from} to ${bookingDetails.to}
Journey Date: ${bookingDetails.date}
Pickup Time: ${bookingDetails.time}
Refund Amount: ₹${bookingDetails.amount.toLocaleString("en-IN")}

${cancellationReason ? `Cancellation Reason: ${cancellationReason}\n` : ''}

REFUND INFORMATION:
Amount of ₹${bookingDetails.amount.toLocaleString("en-IN")} has been refunded to your original payment method.

REFUND TIMELINE:
• Refund initiated immediately
• Processing by payment gateway: 1-2 business days
• Reflect in your account: 5-7 business days

We hope to serve you better in the future. For any assistance with new bookings, visit:
https://planmytrip247.vercel.app/booking

For refund-related queries, contact our support team:
Email: planmytrip360@gmail.com
Website: https://planmytrip247.vercel.app

This is an automated cancellation confirmation.

Thank you for choosing PlanMyTrip.

Sincerely,
PlanMyTrip Team
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Booking cancellation email sent successfully!");
    console.log("📧 Message ID:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("❌ Cancellation email sending failed:", error);
    throw new Error(`Cancellation email sending failed: ${error}`);
  }
};