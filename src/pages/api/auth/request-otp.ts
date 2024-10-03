import { NextApiRequest, NextApiResponse } from "next";
import { createOtpForUser } from '@/lib/auth/sendEmail';
import prisma from "@/db";



export default async function handler(req:NextApiRequest, res: NextApiResponse){

    if(req.method === 'POST'){
        const {email} = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user) {
            return res.status(401).json({ok: false, message: "Invalid credentials" });
          }
        if(!email){
            return res.status(400).json({ok: false, message: 'Email is required'});
        }
        try{
            await createOtpForUser(email);
            return res.status(200).json({ok: true, message: 'OTP sent successfully'})

        }catch(err){
            console.error(err);
            res.status(500).json({ok: false,message: 'Error sending OTP'});
        }
    }else{
        return res.status(405).json({ok: false, message: 'Method not allowed' });
    }
}