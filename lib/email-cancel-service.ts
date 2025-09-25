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
    <style>
      body { margin: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #f4f4f4; color: #1f1f1f; }

      .card { background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5; }
      .header { background: #fff0f0; color: #d32f2f; text-align: center; padding: 20px 20px; }
      .header h1 { margin: 0; font-size: 20px; }
      .header p { margin: 8px 0 0 0; font-size: 16px; opacity: 0.9; }
      .content { padding: 25px; line-height: 1.6; color: #1f1f1f; }
      .booking-details { margin-top: 20px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; }
      .booking-details table { width: 100%; border-collapse: collapse; }
      .booking-details td { padding: 12px 16px; }
      .booking-details tr:nth-child(odd) { background: #fafafa; }
      .booking-details td:first-child { color: #6b6b6b; font-weight: 500; width: 40%; }
      .booking-details td:last-child { color: #1f1f1f; font-weight: 600; }
      .amount {color: #d32f2f; display: inline-block; font-weight: bold; }
      .refund-info { background: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 4px; }
      .cta-btn { display: block; text-align: center; margin: 25px auto; background: #d32f2f; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 25px; font-weight: 600; width: fit-content; }
      .footer { background: #f9f9f9; text-align: center; padding: 20px; font-size: 13px; color: #6b6b6b; border-top: 1px solid #e5e5e5; }
      .footer a { color: #e53935; text-decoration: none; }
      .cancellation-reason { background: #fff8e1; border-left: 4px solid #ffa000; padding: 15px; margin: 15px 0; border-radius: 4px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="header">
          <h1>❌ Booking Cancelled</h1>
          <p>Your booking has been successfully cancelled</p>
        </div>

        <div class="content">
          <p>Dear ${userName},</p>
          <p>Your cab booking has been cancelled as per your request. Below are the details of the cancelled booking:</p>

          <div class="booking-details">
            <table>
              <tr>
                <td>Booking ID</td>
                <td>#${bookingDetails.bookingId}</td>
              </tr>
              <tr>
                <td>Route</td>
                <td>${bookingDetails.from} → ${bookingDetails.to}</td>
              </tr>
              <tr>
                <td>Journey Date</td>
                <td>${bookingDetails.date}</td>
              </tr>
              <tr>
                <td>Pickup Time</td>
                <td>${bookingDetails.time}</td>
              </tr>
              <tr>
                <td>Passenger</td>
                <td>${bookingDetails.passengerName}</td>
              </tr>
              <tr>
                <td>Amount Refunded</td>
                <td><span class="amount">₹${bookingDetails.amount.toLocaleString("en-IN")}</span></td>
              </tr>
            </table>
          </div>

          ${cancellationReason ? `
          <div class="cancellation-reason">
            <strong>Cancellation Reason:</strong>
            <p>${cancellationReason}</p>
          </div>
          ` : ''}

          <div class="refund-info">
            <strong>💰 Refund Information:</strong>
            <p>The refund amount of ₹${bookingDetails.amount.toLocaleString("en-IN")} will be processed to your original payment method within 5-7 business days.</p>
          </div>

          <a href="https://planmytrip247.vercel.app/booking" class="cta-btn">Book New Ride</a>

          <p>If you have any questions about your refund or need assistance, please contact our support team.</p>
          
          <p>We hope to serve you better in the future!</p>
        </div>
        <div class="footer">
          <p>PlanMyTrip | Your Journey, Our Priority</p>
          <p>📧 <a href="mailto:planmytrip360@gmail.com">planmytrip360@gmail.com</a></p>
          <p>This is an automated message. Please do not reply.</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: userEmail,
    subject: `BOOKING CANCELLED - ${bookingDetails.from} to ${bookingDetails.to} | ${bookingDetails.bookingId}`,
    html: htmlContent,
    text: `
Booking Cancellation Confirmation

Dear ${userName},

Your cab booking has been cancelled successfully.

Cancelled Booking Details:
- Booking ID: #${bookingDetails.bookingId}
- Route: ${bookingDetails.from} to ${bookingDetails.to}
- Date: ${bookingDetails.date}
- Time: ${bookingDetails.time}
- Passenger: ${bookingDetails.passengerName}
- Amount Refunded: ₹${bookingDetails.amount.toLocaleString("en-IN")}

${cancellationReason ? `Cancellation Reason: ${cancellationReason}\n` : ''}

Refund Information:
The amount of ₹${bookingDetails.amount.toLocaleString("en-IN")} will be refunded to your original payment method within 5-7 business days.

We hope to see you again soon!

Need help? Contact us at planmytrip360@gmail.com

Thank you,
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