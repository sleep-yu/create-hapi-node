// 添加这个类型声明
declare module 'module-alias' {
  function addAliases(aliases: Record<string, string>): void;
}

import moduleAlias from 'module-alias';

// 配置路径别名
// @ts-ignore
moduleAlias.addAliases({
  '@routes': __dirname + '/routes',
  '@services': __dirname + '/services',
  '@clients': __dirname + '/clients',
  '@interfaces': __dirname + '/interfaces',
  '@enum': __dirname + '/enum',
  '@utils': __dirname + '/utils',
  '@validates': __dirname + '/validates',
});

import { App } from './app';

const PORT = Number(process.env.PORT) || 5000;

(async function run() {
  try {
    const app = new App(PORT);
    await app.start();
    console.log(`服务已启动，端口: ${PORT}`);

    const gracefulShutdown = async () => {
      try {
        await app.stop();
      } finally {
        process.exit(0);
      }
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

    process.on('unhandledRejection', (err) => {
      console.error('[unhandledRejection] 未处理Promise异常', err);
    });
  } catch (err) {
    console.error('启动应用失败！', err);
    process.exit(1);
  }
})();
