import connectDb from './shared/config/connectDb';
import { appConfig } from './shared/config/appConfig';
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
