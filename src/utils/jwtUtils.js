import jwt from 'jsonwebtoken';
import { env } from 'process';

const secretKey = env.JWT_SECRET_KEY || '';

export const generateToken = (payload) =>
  jwt.sign(payload, secretKey, { expiresIn: '30m' });

export const verifyToken = (token) => {
  try {
    return jwt.verify(token.trim(), secretKey);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      console.error('JWT error:', err.message);
    } else {
      console.error('Unknown error occurred while verifying JWT:', err.message);
    }
    return null;
  }
};
