import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
dotenv.config({});
class AppConfig {
  public PORT: number | undefined;
  public MONGO_URI: string | undefined;
  public JWT_SECRET: string | undefined;
  public JWT_TOKEN_AUDIENCE: string | undefined;
  public JWT_TOKEN_ISSUER: string | undefined;
  public JWT_ACCESS_TOKEN_TTL: string | undefined;
  public JWT_REFRESH_TOKEN_TTL: string | undefined;
  public NODE_ENV: string | undefined;
  public CLOUD_NAME: string | undefined;
  public CLOUD_API_KEY: string | undefined;
  public CLOUD_API_SECRET: string | undefined;
  public HOST: string | undefined;
  public MAIL_USER: string | undefined;
  public MAIL_PASSWORD: string | undefined;
  public MAIL_SENDER: string | undefined;
  public CLIENT_URL: string | undefined;
  public CRYPTR_KEY: string | undefined;
  public GOOGLE_CLIENT_ID: string | undefined;
  public GOOGLE_CLIENT_SECRET: string | undefined;
  public VNP_TMN_CODE: string | undefined;
  public VNP_HASH_SECRET: string | undefined;
  public VNP_URL: string | undefined;
  public VNP_RETURN_URL: string | undefined;
  public VNP_IPN_URL: string | undefined;

  constructor() {
    this.PORT = parseInt(process.env.PORT!) || 9000;
    this.MONGO_URI = process.env.MONGO_URI;
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.JWT_TOKEN_AUDIENCE = process.env.JWT_TOKEN_AUDIENCE;
    this.JWT_TOKEN_ISSUER = process.env.JWT_TOKEN_ISSUER;
    this.JWT_ACCESS_TOKEN_TTL = process.env.JWT_ACCESS_TOKEN_TTL;
    this.JWT_REFRESH_TOKEN_TTL = process.env.JWT_REFRESH_TOKEN_TTL;
    this.NODE_ENV = process.env.NODE_ENV;
    this.CLOUD_NAME = process.env.CLOUD_NAME;
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
    this.HOST = process.env.HOST;
    this.MAIL_USER = process.env.MAIL_USER;
    this.MAIL_PASSWORD = process.env.MAIL_PASSWORD;
    this.MAIL_SENDER = process.env.MAIL_SENDER;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.CRYPTR_KEY = process.env.CRYPTR_KEY;
    this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    this.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    this.VNP_TMN_CODE = process.env.VNP_TMN_CODE;
    this.VNP_HASH_SECRET = process.env.VNP_HASH_SECRET;
    this.VNP_URL = process.env.VNP_URL;
    this.VNP_RETURN_URL = process.env.VNP_RETURN_URL;
    this.VNP_IPN_URL = process.env.VNP_IPN_URL;
  }
  public cloudinary() {
    cloudinary.v2.config({
      cloud_name: appConfig.CLOUD_NAME,
      api_key: appConfig.CLOUD_API_KEY,
      api_secret: appConfig.CLOUD_API_SECRET
    });
  }
  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (!value) {
        throw new Error(`Configuration ${key} undefined`);
      }
    }
  }
}

export const appConfig: AppConfig = new AppConfig();
