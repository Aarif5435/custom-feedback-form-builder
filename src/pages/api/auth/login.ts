import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/db";

const jwtSecret = process.env.JWT_SECRET as string;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in your environment variables");
}

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const userPlans = await prisma.userPlan.findMany({
        where: {userId: user.id}
      });

      if(userPlans.length === 0){
        const basicPlan = await prisma.plan.findUnique({
          where: {name: "Basic"},
        });

        if (basicPlan) {
          await prisma.userPlan.create({
            data: {
              userId: user.id,
              planId: basicPlan.id,
            },
          });
        }
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecret,
        { expiresIn: "24h" }
      );
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400;`);
      return res.status(200).json({message: "Login successfully", token, userId: user.id });
    } catch (err) {
      console.error(err);
      res.status(501).json({ message: "internal server error" });
    }
  } else {
    res.status(405).json({message: "Method not allowed" });
  }
}
