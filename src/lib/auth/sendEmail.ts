import nodemailer from 'nodemailer';
import prisma from "@/lib/prisma";


function generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(email: string, otp: string){
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

  const mailOptions = {
    from: '"FormFlow" <noreply@gmail.com>',
    to: email,
    subject: 'FormFlow OTP Verification Code',
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};


export async function createOtpForUser(email:string){
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  
  await prisma.oTP.create({
    data: {
      email,
      otpCode: otp,
      expiresAt
    }
  });

  await sendOtpEmail(email,otp)
}