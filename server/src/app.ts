import { appConfig } from './config/appConfig';
import connectDb from './config/connectDb';
import { server } from './server';
class Application {
  public run(): void {
    this.loadConfig();
    connectDb();
    server.start();
  }
  private loadConfig() {
    appConfig.validateConfig();
  }
}
const app: Application = new Application();
app.run();
