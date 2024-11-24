import { prisma } from "@/prisma";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // Always this
    pass: process.env.SENDGRID_API_KEY, // Your SendGrid API key
  },
});

export async function verificationEmail(to: string) {
  try {
    const expire = new Date(new Date().getTime() + 3600 * 1000);
    const token = uuidv4();
    await prisma.emailVerification.create({
      data: {
        email: to,
        token,
        expire,
      },
    });

    const mailOptions = {
      from: "illuricharles6@gmail.com", // Verified sender email
      to, // Recipient email
      subject: "Email Verification",
      text: "Hello from blog application",
      html: `
      <p><strong> Hi, </strong></p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
