import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { fileURLToPath } from "url";
import type { ClientOptions } from "openai";

dotenv.config();

// 封装API客户端创建，便于依赖注入和测试
export class ApiClientFactory {
  createOpenAiClient() {
    // 使用类型断言解决构造函数问题
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error("DEEPSEEK_API_KEY environment variable is not defined");
    }

    return new (OpenAI as any)({
      baseURL: "https://api.deepseek.com",
      apiKey,
    });
  }
}

// 抽象服务类，包含业务逻辑
export class OptimizationService {
  private openai: ReturnType<ApiClientFactory["createOpenAiClient"]>;

  constructor(apiClientFactory: ApiClientFactory) {
    this.openai = apiClientFactory.createOpenAiClient();
  }

  async optimizePrompt(template: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "user",
          content: template,
        },
      ],
    });

    return completion.choices[0].message.content || "";
  }
}

// 路由处理类
export class ApiController {
  private optimizationService: OptimizationService;

  constructor(optimizationService: OptimizationService) {
    this.optimizationService = optimizationService;
  }

  async handleOptimize(req: Request, res: Response): Promise<void> {
    try {
      const { template } = req.body;
      console.log("Received template:", template);

      console.log("Calling DeepSeek API...");
      const optimizedPrompt =
        await this.optimizationService.optimizePrompt(template);

      console.log("DeepSeek API Response:", optimizedPrompt);

      res.json({
        optimizedPrompt,
      });
    } catch (error) {
      console.error("Error in /api/optimize:", error);
      res.status(500).json({
        error: "Failed to optimize prompt",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

// 创建应用实例，使用依赖注入方式
export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // 创建依赖实例
  const apiClientFactory = new ApiClientFactory();
  const optimizationService = new OptimizationService(apiClientFactory);
  const apiController = new ApiController(optimizationService);

  // 绑定路由
  app.post("/api/optimize", (req, res) =>
    apiController.handleOptimize(req, res),
  );

  return app;
}

// 只有在直接运行此文件时才启动服务器
// 注意: 在测试环境中，这个条件不会为真
// 确保在 Jest 环境中不会启动服务器
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;
  const app = createApp();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export const config = {
  type: "module",
};
