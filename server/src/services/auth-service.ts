import type { ExpressContextFunctionArgument } from '@apollo/server/express4';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: string | null;
  username: string | null;
  email: string | null;
}

export const authMiddleware = async ({ req }: ExpressContextFunctionArgument) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  let user = null;

  if (token) {
    try {
      const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
      user = data as JwtPayload;
    } catch {
      console.log('Invalid token');
    }
  }

  return { user };
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY;

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      path: ['UNAUTHENTICATED'],
    });
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}
