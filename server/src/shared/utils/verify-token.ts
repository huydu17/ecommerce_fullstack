import jwt from 'jsonwebtoken';
import { appConfig } from '../config/appConfig';
import { OAuth2Client } from 'google-auth-library';
export const verifyToken = (token: string) => {
  return jwt.verify(token, appConfig.JWT_SECRET!);
};

export const verifyTokenGoogle = async (token: string) => {
  const client = new OAuth2Client(appConfig.GOOGLE_CLIENT_ID!);
  const ticket = await client.verifyIdToken({ idToken: token, audience: appConfig.GOOGLE_CLIENT_ID! });
  const payload: any = ticket.getPayload();
  return payload;
};
