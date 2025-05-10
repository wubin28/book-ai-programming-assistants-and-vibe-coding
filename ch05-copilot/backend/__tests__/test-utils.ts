import { Response } from 'express';
import { jest } from '@jest/globals';

/**
 * 创建响应对象的模拟版本
 */
export function createMockResponse() {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as Response;
}

/**
 * OpenAI API 响应类型
 */
export type OpenAICompletion = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};