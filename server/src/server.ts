import express, { Application, Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import { appConfig } from './shared/config/appConfig';
import HTTP_STATUS from 'http-status-codes';
import { appRoute } from './shared/routes/app.route';
import { CustomError, IErrorResponse } from './shared/middlewares/globalErrorHandle';
import fileUpload from 'express-fileupload';
const PORT = appConfig.PORT;
export class AppServer {
  constructor(private app: Application) {
    this.app = app;
  }
  public start(): void {
    this.setupMiddleware(this.app);
    this.setupRoutes(this.app);
    this.globalErrorHandle(this.app);
    this.startServer(this.app);
  }
  private setupMiddleware(app: Application) {
    app.use(cookieParser());
    app.use(helmet());
    app.use(
      fileUpload({
        useTempFiles: true
      })
    );
    app.use(
      cors({
        origin: ['http://localhost:3000'],
        credentials: true,
        optionsSuccessStatus: 200
      })
    );
    app.use(compression());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  }
  private setupRoutes(app: Application) {
    appRoute(app);
  }
  private globalErrorHandle(app: Application) {
    app.all('*', (req: Request, res: Response) => {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: `The url ${req.originalUrl} not found` });
    });
    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.getMessageError());
      }
      next();
    });
  }
  private startServer(app: Application) {
    app.listen(PORT, () => {
      console.log(`Server is running with PORT ${PORT}`, '');
    });
  }
}
const app: Express = express();
export const server: AppServer = new AppServer(app);
