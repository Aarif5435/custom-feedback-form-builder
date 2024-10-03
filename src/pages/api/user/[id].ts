import prisma from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        userPlans: {
          include: {
            plan: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User Not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: "internal Server Error" });
  }
}
