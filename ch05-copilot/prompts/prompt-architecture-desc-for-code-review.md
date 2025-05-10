# 提示词

@workspace /explain 请读取 #codebase，基于此 React 项目的前后端代码，参考 C4 模型的 Context、Containers 和 Components 三层格式（要求这三层图之间展现逐层放大的特点，例如 Containers 层中的 Backend 部分可以放大到 Components 层），用自然语言描述该项目的软件架构，以便我使用 Mermaid 脚本绘制相应的架构图。另外，请在 Components 层中为各个组件标注其对应的源文件名，以便我能快速定位到具体代码。

# Claude 3.7 Sonnet Thinking阅读源代码后生成的软件架构的描述

```
# C4 Model Architecture Description for Promptyoo Project

## Context Level Diagram

**System**: Promptyoo - An AI prompt optimization application using the RABPOC framework

**Users**:
- End Users - People who want to optimize prompts for AI interactions using the RABPOC framework (Role, Audience, Boundary, Purpose, Output, Concern)

**External Systems**:
- DeepSeek AI API - External AI service that processes and enhances prompts

**Key Relationships**:
- End Users interact with Promptyoo to create optimized prompts
- Promptyoo communicates with DeepSeek AI API to process and enhance prompts

## Container Level Diagram

**Frontend Container**:
- React Single Page Application
- Technologies: React, TypeScript, Tailwind CSS
- Responsibility: Provides user interface for entering RABPOC parameters and displaying optimized prompts
- Communicates with the Backend API via HTTP requests

**Backend Container**:
- Express.js API Server
- Technologies: Express.js, TypeScript, Node.js
- Responsibility: Processes optimization requests and communicates with DeepSeek AI API
- Exposes RESTful API endpoint at /api/optimize

**External Systems**:
- DeepSeek AI API
- Provides AI capabilities for prompt optimization using the deepseek-chat model

**Key Interactions**:
- Frontend sends prompt data to Backend via HTTP POST requests
- Backend processes requests and calls DeepSeek AI API
- Backend returns optimized prompts to Frontend for display
- Frontend presents results to users

## Component Level Diagram

### Frontend Components:
- **App Component** (`/frontend/src/App.tsx`):
  - Main application component
  - Manages the overall UI layout with sidebar and main content
  - Contains state management for RABPOC form data
  - Handles API calls to the backend

- **RABPOC Form Fields** (`/frontend/src/App.tsx`):
  - Six input fields for the RABPOC framework parameters
  - Captures user input for Role, Audience, Boundary, Purpose, Output, and Concern
  - Updates form state as users type

- **Optimize Button** (`/frontend/src/App.tsx`):
  - Triggers the prompt optimization process
  - Sends form data to the backend
  - Updates the UI with optimized results

- **Prompt Display Section** (`/frontend/src/App.tsx`):
  - Displays the optimized prompt returned from the API
  - Shows default message or error states as needed

### Backend Components:
- **API Controller** (`/backend/src/server.ts`):
  - Handles HTTP request/response processing
  - Receives prompt templates from the frontend
  - Returns optimized prompts or error responses
  - Manages error handling and logging

- **Optimization Service** (`/backend/src/server.ts`):
  - Contains business logic for prompt optimization
  - Formats requests to the DeepSeek AI API
  - Processes AI responses to extract optimized prompts

- **API Client Factory** (`/backend/src/server.ts`):
  - Creates and configures API clients for external services
  - Manages authentication and connection details for DeepSeek AI
  - Enables dependency injection for better testability

**Key Interactions**:
- Frontend App sends template data to Backend API Controller via HTTP POST
- API Controller delegates to Optimization Service for processing
- Optimization Service uses API Client Factory to communicate with DeepSeek AI
- Response flows back through the same components to the Frontend
- App Component updates the Prompt Display Section with results

This architecture demonstrates a clean separation of concerns with clear responsibilities at each level, following modern web application patterns.
```