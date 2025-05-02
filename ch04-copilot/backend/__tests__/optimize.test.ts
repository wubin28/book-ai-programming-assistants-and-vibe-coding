import { describe, jest, test, expect, beforeEach } from '@jest/globals';
import { Request, Response } from 'express';
import { ApiController, OptimizationService, ApiClientFactory } from '../src/server.js';

// 定义模拟响应类型
type MockResponse = {
  status: jest.Mock;
  json: jest.Mock;
};

// 模拟OpenAI客户端
const mockChatCompletionsCreate = jest.fn();
const mockOpenAIClient = {
  chat: {
    completions: {
      create: mockChatCompletionsCreate
    }
  }
};

// 模拟API工厂
class MockApiClientFactory extends ApiClientFactory {
  createOpenAiClient() {
    return mockOpenAIClient as any;
  }
}

describe('API Optimize Endpoint', () => {
  let apiController: ApiController;
  let req: Partial<Request>;
  let res: MockResponse;

  beforeEach(() => {
    // 重置所有模拟
    jest.clearAllMocks();
    
    // 设置请求和响应模拟
    req = {
      body: {
        template: 'Test template content'
      }
    };
    
    // 创建模拟响应对象
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    // 设置API响应模拟
    mockChatCompletionsCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: 'Optimized template content'
          }
        }
      ]
    });
    
    // 创建依赖注入链
    const apiClientFactory = new MockApiClientFactory();
    const optimizationService = new OptimizationService(apiClientFactory);
    apiController = new ApiController(optimizationService);
  });

  test('should correctly call DeepSeek API and return optimized prompt', async () => {
    // 执行请求
    await apiController.handleOptimize(req as Request, res as unknown as Response);
    
    // 验证DeepSeek API是否按预期调用
    expect(mockChatCompletionsCreate).toHaveBeenCalledTimes(1);
    expect(mockChatCompletionsCreate).toHaveBeenCalledWith({
      model: 'deepseek-chat',
      messages: [
        { 
          role: 'user',
          content: 'Test template content'
        }
      ],
    });
    
    // 验证响应是否正确
    expect(res.json).toHaveBeenCalledWith({
      optimizedPrompt: 'Optimized template content'
    });
  });

  test('should handle API errors and return appropriate error response', async () => {
    // 模拟API错误
    const errorMessage = 'API connection failed';
    mockChatCompletionsCreate.mockRejectedValue(new Error(errorMessage));
    
    // 执行请求
    await apiController.handleOptimize(req as Request, res as unknown as Response);
    
    // 验证错误处理
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Failed to optimize prompt',
      details: errorMessage
    });
  });
});