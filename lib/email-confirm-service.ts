import nodemailer from "nodemailer";

interface BookingDetails {
  bookingId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  amount: number;
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

export const sendPaymentSuccessEmail = async (
  userEmail: string,
  userName: string,
  bookingDetails: BookingDetails
) => {
  const transporter = createTransporter();

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { margin: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #f4f4f4; color: #1f1f1f; }
      .container {  margin: 05px auto; padding: 0 10px; }
      .card { background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5; }
      .header { background: #edededff; color: black; text-align: center; padding: 20px 20px; }
      .header h1 { margin: 0; font-size: 26px; }
      .header p { margin: 8px 0 0 0; font-size: 16px; opacity: 0.9; }
      .content { padding: 25px; line-height: 1.6; color: #1f1f1f; }
      .route { display: flex; justify-content: center; align-items: center; gap: 10px; font-weight: 600; margin: 25px 0; }
      .route span { background: #f9f9f9; padding: 8px 14px; border-radius: 6px; font-size: 16px; }
      .arrow { font-size: 20px; color: #e53935; }
      .booking-details { margin-top: 20px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; }
      .booking-details table { width: 100%; border-collapse: collapse; }
      .booking-details td { padding: 12px 16px; }
      .booking-details tr:nth-child(odd) { background: #fafafa; }
      .booking-details td:first-child { color: #6b6b6b; font-weight: 500; width: 40%; }
      .booking-details td:last-child { color: #1f1f1f; font-weight: 600; }
      .amount { background: #ffffffff; color: #0faa07ff; padding: 6px 14px; border-radius: 20px; display: inline-block; font-weight: bold; }
      .cta-btn { display: block; text-align: center; margin: 25px auto; background: #dcdcdcff; color: #e12b2bff; padding: 14px 28px; text-decoration: none; border-radius: 25px; font-weight: 600; width: fit-content; }
      .footer { background: #f9f9f9; text-align: center; padding: 20px; font-size: 13px; color: #6b6b6b; border-top: 1px solid #e5e5e5; }
      .footer a { color: #e53935; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="header">
        <h1>✅ Booking Confirmed!</h1>
      <p>Congratulations ${userName}! Your ride is confirmed.</p>
    </div>

        <div class="content">
          <p>Your cab booking has been successfully confirmed. Please see your booking details below:</p>

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
                <td>${userName}</td>
              </tr>
              <tr>
                <td>Amount Paid</td>
                <td><span class="amount">₹${bookingDetails.amount.toLocaleString(
                  "en-IN"
                )}</span></td>
              </tr>
            </table>
          </div>

          <a href="https://planmytrip247.vercel.app/my-bookings" class="cta-btn">Track Your Booking</a>

          <p>Our driver will contact you 30 minutes before pickup. Please keep your phone ready and have a valid ID for verification.</p>
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
    subject: `BOOKING CONFIRMED - ${bookingDetails.from} to ${bookingDetails.to} | ${bookingDetails.bookingId}`,
    html: htmlContent,
    text: `
Congratulations ${userName}!

Your cab booking has been confirmed successfully.

Booking Details:
- Booking ID: #${bookingDetails.bookingId}
- Route: ${bookingDetails.from} to ${bookingDetails.to}
- Date: ${bookingDetails.date}
- Time: ${bookingDetails.time}
- Amount Paid: ₹${bookingDetails.amount.toLocaleString("en-IN")}

Our driver will contact you 30 minutes before pickup.

Thank you for choosing PlanMyTrip!

Need help? Contact us at support@planmytrip247.com
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Payment confirmation email sent successfully!");
    console.log("📧 Message ID:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error(`Email sending failed: ${error}`);
  }
};
