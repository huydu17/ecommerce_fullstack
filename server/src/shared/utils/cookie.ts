import { Response } from 'express';
import { appConfig } from '../config/appConfig';
import { ACCESSTOKEN, REFRESHTOKEN } from 'src/features/auth/constants/token.constant';

export const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie(ACCESSTOKEN, accessToken, {
    httpOnly: true, //prevent XSS attacks, cross site scripting attacks
    secure: appConfig.NODE_ENV !== 'development',
    sameSite: 'strict', // prevent CSRF attack, cross site request forgery attack
    maxAge: 14 * 60 * 1000
  });
  res.cookie(REFRESHTOKEN, refreshToken, {
    httpOnly: true,
    secure: appConfig.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
};
