import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "@/db";


export default async function handler(req: NextApiRequest, res: NextApiResponse){

   if(req.method === 'PUT'){
    const {id} = req.query;

    if(!id || isNaN(+id)){
        return res.status(400).json({error: "Invalid user ID"});
    }

    try{
      const {name,email, password } = req.body;

      if (!name && !email && !password) {
        return res.status(400).json({ error: "At least one field (name, email, or password) must be provided" });
      }

      const updateData: { name?: string; email?: string; passwordHash?: string } = {};

      if(name) updateData.name = name;
      if(email) updateData.email = email;

      if(password){
        const hashPass = await bcrypt.hash(password, 10);
        updateData.passwordHash = hashPass;
      }

      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: updateData,
      });

      return res.status(200).json(updatedUser);

    }catch(err){
        console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
    }
   }else {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}