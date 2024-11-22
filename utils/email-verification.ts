import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // Always this
    pass: process.env.SENDGRID_API_KEY, // Your SendGrid API key
  },
});

export async function verificationEmail() {
  const mailOptions = {
    from: "illuricharles6@gmail.com", // Verified sender email
    to: "ben1335794c@gmail.com", // Recipient email
    subject: "Test Email from SendGrid SMTP",
    text: "Hello from SendGrid SMTP!",
    html: "<strong>Hello from SendGrid SMTP!</strong>",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
