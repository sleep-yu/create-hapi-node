import { Server } from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import { ExampleRoute } from '@routes/example/ExampleRoute';
import { ExampleService } from '@services/example/ExampleService';

export class App {
  public server: Server;
  private port: number;

  constructor(port: number) {
    this.port = port;
    this.server = new Server({
      port: this.port,
      host: 'localhost',
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });
  }

  public async start(): Promise<void> {
    // 注册插件
    await this.server.register(Inert);

    // 注册服务
    this.registerServices();

    // 注册路由
    this.registerRoutes();

    await this.server.start();
  }

  public async stop(): Promise<void> {
    await this.server.stop();
  }

  private registerServices(): void {
    // 注册所有服务到 app.decorators，方便在路由中通过 req.getService() 获取
    this.server.decorate('request', 'getService', (ServiceClass: any) => {
      // 简单的服务实例管理，实际项目中可以用单例模式或依赖注入
      return new ServiceClass();
    });
  }

  private registerRoutes(): void {
    // 注册示例路由
    this.server.route(ExampleRoute);
  }
}
