# 提示词 - 发送请求

请根据以下C4 model架构描述，生成c4 model风格的Mermaid脚本以可视化架构图。要求：
1. 仅绘制components层级的图
2. 图中需包含end user
3. 仅展示从end user向前端发送请求到deepseek api接收请求的流程（无需展示优化后提示词的返回流程）
4. 在每个component中标注其所在的文件名

以下是详细描述：（见[prompt-architecture-desc.md](prompt-architecture-desc.md)，略）

# 大模型生成的Mermaid脚本 - 发送请求

```mermaid
C4Component
    title Component Diagram for Promptyoo

    Person(endUser, "End User", "A person wanting to optimize AI prompts using RABPOC framework")
    
    Boundary(frontendContainer, "Frontend Container (App.tsx)", "React SPA") {
        Component(appComponent, "App Component", "React, TypeScript", "Main application component with layout and state management")
        Component(rabpocFormFields, "RABPOC Form Fields", "React, TypeScript", "Input fields for Role, Audience, Boundary, Purpose, Output, Concern")
        Component(optimizeButton, "Optimize Button", "React, TypeScript", "Triggers prompt optimization and sends data to backend")
        Component(promptDisplay, "Prompt Display Section", "React, TypeScript", "Displays optimized prompts")
    }
    
    Boundary(backendContainer, "Backend Container (server.ts)", "Express.js API Server") {
        Component(apiController, "API Controller", "Express.js, TypeScript", "Handles HTTP requests/responses and error management")
        Component(optimizationService, "Optimization Service", "TypeScript", "Contains business logic for prompt optimization")
        Component(apiClientFactory, "API Client Factory", "TypeScript", "Manages external API connections and authentication")
    }
    
    System_Ext(deepseekAPI, "DeepSeek AI API", "External AI service for prompt enhancement")
    
    Rel(endUser, appComponent, "Enters RABPOC parameters")
    Rel(appComponent, rabpocFormFields, "Contains")
    Rel(appComponent, optimizeButton, "Contains")
    Rel(rabpocFormFields, optimizeButton, "Provides form data")
    Rel(optimizeButton, apiController, "Sends form data via HTTP POST", "JSON/HTTPS")
    Rel(apiController, optimizationService, "Delegates processing")
    Rel(optimizationService, apiClientFactory, "Uses")
    Rel(apiClientFactory, deepseekAPI, "Sends optimization request", "HTTPS")
```

# 提示词 - 返回响应

请根据以下C4 model架构描述，生成c4 model风格的Mermaid脚本以可视化架构图。要求：
1. 仅绘制components层级的图
2. 图中需包含end user
3. 仅展示从deepseek api向后端返回结果，直到end user接收优化后的提示词的流程（无需展示提示词优化的发送流程）
4. 在每个component中标注其所在的文件名

以下是详细描述：（见[prompt-architecture-desc.md](prompt-architecture-desc.md)，略）

# 大模型生成的Mermaid脚本 - 返回响应

```mermaid
C4Component
title Promptyoo Components Diagram - Response Flow

Person(endUser, "End User", "Wants to optimize prompts using RABPOC framework")

System_Ext(deepseekAPI, "DeepSeek AI API", "External AI Service that processes and enhances prompts")

System_Boundary(backend, "Backend (server.ts)") {
    Component(apiClient, "API Client Factory", "Creates API clients for external services", "Manages DeepSeek authentication and connections")
    Component(optimizationService, "Optimization Service", "Business Logic", "Formats requests and processes AI responses")
    Component(apiController, "API Controller", "Express.js Handler", "Handles HTTP requests/responses")
}

System_Boundary(frontend, "Frontend (App.tsx)") {
    Component(appComponent, "App Component", "React Component", "Main application component with state management")
    Component(promptDisplay, "Prompt Display Section", "React Component", "Shows optimized prompt results")
}

Rel(deepseekAPI, apiClient, "Returns optimized prompt", "HTTP Response")
Rel(apiClient, optimizationService, "Provides API response", "JSON")
Rel(optimizationService, apiController, "Returns processed prompt", "JSON")
Rel(apiController, appComponent, "Sends optimized prompt", "HTTP Response")
Rel(appComponent, promptDisplay, "Updates with optimized prompt", "React State")
Rel(promptDisplay, endUser, "Displays optimized prompt", "UI")
```
