// import nodemailer from "nodemailer";

// interface BookingDetails {
//   bookingId: string;
//   from: string;
//   to: string;
//   date: string;
//   time: string;
//   amount: number;
// }

// const createTransporter = () => {
//   return nodemailer.createTransport({
//     host: process.env.BREVO_SMTP_HOST,
//     port: parseInt(process.env.BREVO_SMTP_PORT || "587"),
//     secure: false,
//     auth: {
//       user: process.env.BREVO_SMTP_USER,
//       pass: process.env.BREVO_SMTP_PASS,
//     },
//   });
// };

// export const sendPaymentSuccessEmail = async (
//   userEmail: string,
//   userName: string,
//   bookingDetails: BookingDetails
// ) => {
//   const transporter = createTransporter();

//   const htmlContent = `
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <style>
//       body { margin: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #f4f4f4; color: #1f1f1f; }
//       .container {  margin: 05px auto; padding: 0 10px; }
//       .card { background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5; }
//       .header { background: #edededff; color: black; text-align: center; padding: 20px 20px; }
//       .header h1 { margin: 0; font-size: 26px; }
//       .header p { margin: 8px 0 0 0; font-size: 16px; opacity: 0.9; }
//       .content { padding: 25px; line-height: 1.6; color: #1f1f1f; }
//       .route { display: flex; justify-content: center; align-items: center; gap: 10px; font-weight: 600; margin: 25px 0; }
//       .route span { background: #f9f9f9; padding: 8px 14px; border-radius: 6px; font-size: 16px; }
//       .arrow { font-size: 20px; color: #e53935; }
//       .booking-details { margin-top: 20px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; }
//       .booking-details table { width: 100%; border-collapse: collapse; }
//       .booking-details td { padding: 12px 16px; }
//       .booking-details tr:nth-child(odd) { background: #fafafa; }
//       .booking-details td:first-child { color: #6b6b6b; font-weight: 500; width: 40%; }
//       .booking-details td:last-child { color: #1f1f1f; font-weight: 600; }
//       .amount { background: #ffffffff; color: #0faa07ff; padding: 6px 14px; border-radius: 20px; display: inline-block; font-weight: bold; }
//       .cta-btn { display: block; text-align: center; margin: 25px auto; background: #dcdcdcff; color: #e12b2bff; padding: 14px 28px; text-decoration: none; border-radius: 25px; font-weight: 600; width: fit-content; }
//       .footer { background: #f9f9f9; text-align: center; padding: 20px; font-size: 13px; color: #6b6b6b; border-top: 1px solid #e5e5e5; }
//       .footer a { color: #e53935; text-decoration: none; }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <div class="card">
//         <div class="header">
//         <h1>✅ Booking Confirmed!</h1>
//       <p>Congratulations ${userName}! Your ride is confirmed.</p>
//     </div>

//         <div class="content">
//           <p>Your cab booking has been successfully confirmed. Please see your booking details below:</p>

//           <div class="booking-details">
//             <table>
//               <tr>
//                 <td>Booking ID</td>
//                 <td>#${bookingDetails.bookingId}</td>
//               </tr>
//               <tr>
//                 <td>Route</td>
//                 <td>${bookingDetails.from} → ${bookingDetails.to}</td>
//               </tr>
//               <tr>
//                 <td>Journey Date</td>
//                 <td>${bookingDetails.date}</td>
//               </tr>
//               <tr>
//                 <td>Pickup Time</td>
//                 <td>${bookingDetails.time}</td>
//               </tr>
//               <tr>
//                 <td>Passenger</td>
//                 <td>${userName}</td>
//               </tr>
//               <tr>
//                 <td>Amount Paid</td>
//                 <td><span class="amount">₹${bookingDetails.amount.toLocaleString(
//                   "en-IN"
//                 )}</span></td>
//               </tr>
//             </table>
//           </div>

//           <a href="https://planmytrip247.vercel.app/my-bookings" class="cta-btn">Track Your Booking</a>

//           <p>Our driver will contact you 30 minutes before pickup. Please keep your phone ready and have a valid ID for verification.</p>
//         </div>
//         <div class="footer">
//           <p>PlanMyTrip | Your Journey, Our Priority</p>
//           <p>📧 <a href="mailto:planmytrip360@gmail.com">planmytrip360@gmail.com</a></p>
//           <p>This is an automated message. Please do not reply.</p>
//         </div>
//       </div>
//     </div>
//   </body>
//   </html>
//   `;

//   const mailOptions = {
//     from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
//     to: userEmail,
//     subject: `BOOKING CONFIRMED - ${bookingDetails.from} to ${bookingDetails.to} | ${bookingDetails.bookingId}`,
//     html: htmlContent,
//     text: `
// Congratulations ${userName}!

// Your cab booking has been confirmed successfully.

// Booking Details:
// - Booking ID: #${bookingDetails.bookingId}
// - Route: ${bookingDetails.from} to ${bookingDetails.to}
// - Date: ${bookingDetails.date}
// - Time: ${bookingDetails.time}
// - Amount Paid: ₹${bookingDetails.amount.toLocaleString("en-IN")}

// Our driver will contact you 30 minutes before pickup.

// Thank you for choosing PlanMyTrip!

// Need help? Contact us at support@planmytrip247.com
//     `,
//   };

//   try {
//     const result = await transporter.sendMail(mailOptions);
//     console.log("✅ Payment confirmation email sent successfully!");
//     console.log("📧 Message ID:", result.messageId);
//     return { success: true, messageId: result.messageId };
//   } catch (error) {
//     console.error("❌ Email sending failed:", error);
//     throw new Error(`Email sending failed: ${error}`);
//   }
// };


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
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; color: #333; line-height: 1.6; }
      .container { max-width: 600px; margin: 20px auto; background: #ffffff; }
      .header { background: #2c3e50; color: white; padding: 30px 20px; text-align: center; }
      .header h1 { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
      .header p { font-size: 14px; opacity: 0.9; }
      .logo { font-size: 20px; font-weight: bold; color: #ffffff; margin-bottom: 10px; }
      .content { padding: 30px; }
      .greeting { font-size: 16px; margin-bottom: 20px; color: #555; }
      .confirmation-badge { background: #27ae60; color: white; padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
      .booking-card { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 25px 0; }
      .booking-title { font-size: 18px; font-weight: 600; color: #2c3e50; margin-bottom: 15px; border-bottom: 1px solid #dee2e6; padding-bottom: 10px; }
      .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f1f1; }
      .detail-label { color: #6c757d; font-weight: 500; }
      .detail-value { color: #2c3e50; font-weight: 600; text-align: right; }
      .amount-highlight { color: #27ae60; font-size: 16px; }
      .route-display { text-align: center; margin: 20px 0; padding: 15px; background: #e8f4fd; border-radius: 6px; }
      .route-arrow { margin: 0 15px; color: #3498db; font-weight: bold; }
      .instructions { background: #fff8e1; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; font-size: 14px; }
      .tracking-btn { display: block; background: #3498db; color: white; text-align: center; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 25px auto; width: fit-content; }
      .footer { background: #2c3e50; color: #bdc3c7; padding: 25px 20px; text-align: center; font-size: 12px; }
      .contact-info { margin: 15px 0; line-height: 1.8; }
      .disclaimer { font-size: 11px; color: #95a5a6; margin-top: 15px; border-top: 1px solid #34495e; padding-top: 15px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">PlanMyTrip</div>
        <h1>Booking Confirmation</h1>
        <p>Reference #${bookingDetails.bookingId}</p>
      </div>

      <div class="content">
        <p class="greeting">Dear ${userName},</p>
        
        <div class="confirmation-badge">PAYMENT SUCCESSFUL • BOOKING CONFIRMED</div>
        
        <p>Thank you for choosing PlanMyTrip. Your booking has been confirmed and payment has been processed successfully.</p>

        <div class="booking-card">
          <div class="booking-title">Booking Details</div>
          
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
            <span class="detail-value">${userName}</span>
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
            <span class="detail-label">Amount Paid :&nbsp;</span>
            <span class="detail-value amount-highlight">₹${bookingDetails.amount.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div class="instructions">
          <strong>Important Instructions:</strong><br>
          • Our driver will contact you 30 minutes before the scheduled pickup time<br>
          • Please keep your phone accessible and have a valid ID ready for verification<br>
          • Be ready at the pickup location 10 minutes before the scheduled time
        </div>

        <a href="https://planmytrip247.vercel.app/my-bookings" class="tracking-btn">
          Track Your Booking Status
        </a>

        <p>For any queries or modifications to your booking, please contact our customer support team.</p>
      </div>

      <div class="footer">
        <div class="contact-info">
          <strong>PlanMyTrip Customer Support</strong><br>
          📧 Email: <a href="mailto:planmytrip360@gmail.com" style="color: #3498db;">planmytrip360@gmail.com</a><br>
          🌐 Website: <a href="https://planmytrip247.vercel.app" style="color: #3498db;">planmytrip247.vercel.app</a>
        </div>
        <div class="disclaimer">
          This is an automated confirmation message. Please do not reply to this email.<br>
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
    subject: `Booking Confirmation #${bookingDetails.bookingId} - ${bookingDetails.from} to ${bookingDetails.to}`,
    html: htmlContent,
    text: `
BOOKING CONFIRMATION

Dear ${userName},

Your booking has been confirmed and payment has been processed successfully.

BOOKING DETAILS:
Booking Reference: #${bookingDetails.bookingId}
Passenger Name: ${userName}
Route: ${bookingDetails.from} to ${bookingDetails.to}
Journey Date: ${bookingDetails.date}
Pickup Time: ${bookingDetails.time}
Amount Paid: ₹${bookingDetails.amount.toLocaleString("en-IN")}

IMPORTANT INSTRUCTIONS:
• Our driver will contact you 30 minutes before the scheduled pickup time
• Please keep your phone accessible and have a valid ID ready for verification
• Be ready at the pickup location 10 minutes before the scheduled time

Track your booking: https://planmytrip247.vercel.app/my-bookings

For any queries, contact our customer support:
Email: planmytrip360@gmail.com
Website: https://planmytrip247.vercel.app

This is an automated confirmation message. Please do not reply.

Thank you for choosing PlanMyTrip.

Best regards,
PlanMyTrip Team
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