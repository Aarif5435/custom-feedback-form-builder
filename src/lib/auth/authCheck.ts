import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);


export async function isAuthenticated(token: string | undefined): Promise<boolean> {
  if (!token) {
    return false; 
  }

  try {
    await jwtVerify(token, secret);
    return true; 
  } catch (error) {
    console.error('Authentication failed:', error);
    return false;
  }
}
