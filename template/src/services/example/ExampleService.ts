import { IExampleResponse } from '../../interfaces/example/types';

/**
 * 示例服务类
 * 负责处理业务逻辑
 */
export class ExampleService {
  /**
   * 获取示例数据
   */
  public async getExample(name: string): Promise<IExampleResponse> {
    // 这里写业务逻辑
    // 实际项目中可能需要调用 Client 层获取数据

    return {
      id: '1',
      name: name || 'example',
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * 创建示例数据
   */
  public async createExample(name: string): Promise<IExampleResponse> {
    // 业务逻辑
    return {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString(),
    };
  }
}
