import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import Cors from 'cors';


  export default async function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');
      
      res.status(200).json({ message: 'Logged out successfully' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
