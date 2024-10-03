import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import prisma from '@/db';

export default async function signup(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
       try{
        const {name, email, password} = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {email}
        });

        if(existingUser){
            res.status(409).json({error: 'User already exists'});
        };

        const passwordHash = await bcrypt.hash(password, 10);

        // creating
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
            }
        });

        return res.status(201).json({ message: "User created successfully", user: { id: user.id, name: user.name, email: user.email }})
       }catch(err){
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
       }
    }else{
        res.status(405).json({ error: "Method not allowed"});
    }
}