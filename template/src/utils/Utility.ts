import { ErrorCode } from '../enum/ErrorCode';

/**
 * 通用响应格式
 */
export interface Response<T = any> {
  code: string;
  message: string;
  data?: T;
}

/**
 * 成功响应
 */
export function success<T>(data?: T, message: string = 'success'): Response<T> {
  return {
    code: ErrorCode.SUCCESS,
    message,
    data,
  };
}

/**
 * 错误响应
 */
export function error(message: string = 'error', code: string = ErrorCode.ERROR): Response {
  return {
    code,
    message,
  };
}

/**
 * 获取 Swagger 响应配置
 */
export function getResponses(responses: any[]): any {
  const result: any = {};

  responses.forEach((item) => {
    result[item.errorCode] = {
      description: item.errorCode,
      schema: item.joi,
    };
  });

  return result;
}
