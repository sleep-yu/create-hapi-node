import { RouteOptions } from '@hapi/hapi';
import Joi from 'joi';
import { ErrorCode } from '../../enum/ErrorCode';
import { ExampleService } from '../../services/example/ExampleService';
import { getResponses } from '../../utils/Utility';
import { IExampleQuery } from '../../interfaces/example/types';

/**
 * 查询参数校验
 */
const querySchema = Joi.object({
  name: Joi.string().required().description('名称'),
});

/**
 * 响应数据校验
 */
const responseSchema = Joi.object({
  id: Joi.string().required().description('ID'),
  name: Joi.string().required().description('名称'),
  createdAt: Joi.string().required().description('创建时间'),
});

/**
 * Swagger 响应配置
 */
const responses = getResponses([
  {
    errorCode: ErrorCode.SUCCESS,
    joi: responseSchema,
  },
]);

/**
 * 示例路由
 * 路由层负责：定义路由、参数校验、调用服务层
 */
export const ExampleRoute = {
  method: 'GET' as const,
  path: '/example',
  options: {
    id: 'getExample',
    tags: ['api', 'example'],
    description: '获取示例数据',
    notes: '示例接口说明',
    validate: {
      query: querySchema,
    },
    response: {
      schema: responseSchema,
    },
    plugins: {
      'hapi-swagger': {
        responses,
      },
    },
  },
  async handler(request: any) {
    const query = request.query as IExampleQuery;

    // 获取服务实例
    const exampleService = new ExampleService();

    // 调用服务层
    return exampleService.getExample(query.name);
  },
};
