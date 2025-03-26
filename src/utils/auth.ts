import { sign } from 'jsonwebtoken';

export const generateToken = (userId: number, email: string) => {
  const token = sign(
    // 1st param --> object with data that will be encrypted in the token.
    {
      userId,
      email,
    },
    process.env.JWT_SECRET, // 2nd param --> secret key.
    // 3rd param --> expiration time.
    {
      expiresIn: '5m',
      algorithm: 'HS256',
    }
  );

  return token;
};
