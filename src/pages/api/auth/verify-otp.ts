import { verifyOtp } from "@/lib/auth/verifyOtp";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/db";

const jwtSecret = process.env.JWT_SECRET as string;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in your environment variables");
}

export default async function handler(req:NextApiRequest, res: NextApiResponse){

    if(req.method === 'POST'){
        const {email, otp} = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
          });
    
          if (!user) {
            return res.status(401).json({message: "Invalid credentials" });
          }
        

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
          }
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            jwtSecret,
            { expiresIn: "24h" }
          );
       try {
      const result = await verifyOtp(email, otp);
      if(result.ok){
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600;`);
        return res.status(200).json({ message: result.message, token, userId: user.id});
      }else{
        return res.status(401).json({message: result.message || 'OTP not verified'});
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: error });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}