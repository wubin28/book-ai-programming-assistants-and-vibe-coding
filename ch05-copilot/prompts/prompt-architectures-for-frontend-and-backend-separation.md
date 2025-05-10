# 提示词：

你是资深的Web应用开发专家，我是Web开发新手。请你阅读后面的需求，并为我推荐3种软件架构方案。要求这3个方案都是前后端分离的模式，且都包含过去1～2年中Web开发领域最流行的技术栈，并详细对比这些方案的优缺点及其最佳应用场景。具体需求如下：

Promptyoo-0是一个简单的网页应用，通过用户回答6个简单问题来生成高质量的提示词。名称中的"-0"代表"从零开始"—当用户不知如何向AI提问时，只需在网页上回答这6个问题，系统就会通过DeepSeek API生成优质提示词，帮助获得更好的AI回答。

由于我们主要关注AI编程助手的使用体验，而非开发完整产品，这个网页应用的功能会比较简单。第一阶段只需要实现一个原型，能在本地运行并通过DeepSeek API获取优化后的提示词即可。

# GitHub Copilot: Web架构方案建议

## 方案1: React + Express + MongoDB

### 技术栈
- 前端: React 18 + TypeScript + Vite
- 后端: Express.js + TypeScript
- 数据库: MongoDB
- API文档: Swagger/OpenAPI

### 示例代码结构
````typescript
import { useState } from 'react'
import { QuestionForm } from './components/QuestionForm'
import { PromptResult } from './components/PromptResult'

function App() {
  const [prompt, setPrompt] = useState('')
  
  return (
    <div className="container">
      <QuestionForm onSubmit={setPrompt} />
      <PromptResult prompt={prompt} />
    </div>
  )
}
````

### 优点
- 技术栈成熟稳定
- 开发效率高
- 社区资源丰富
- 适合快速原型开发

### 缺点
- 状态管理相对复杂
- 初始构建配置较多

### 适用场景
- 快速验证原型
- 小型到中型应用
- 需要快速迭代的项目

## 方案2: Next.js + Prisma + PostgreSQL 

### 技术栈
- 框架: Next.js 14 (App Router)
- ORM: Prisma
- 数据库: PostgreSQL
- UI: Tailwind CSS

### 优点
- 全栈开发体验好
- 内置SSR/SSG支持
- 零配置部署
- TypeScript优先

### 缺点
- 学习曲线较陡
- 框架约束较多

### 适用场景
- 需要SEO的应用
- 追求开发体验的团队
- 长期维护的项目

## 方案3: Vue 3 + FastAPI + SQLite

### 技术栈
- 前端: Vue 3 (Composition API) + Vite
- 后端: FastAPI + Python
- 数据库: SQLite
- 状态管理: Pinia

### 优点
- Python生态适合AI开发
- 轻量级架构
- 开发体验好
- 部署简单

### 缺点
- 跨语言开发
- 扩展性受限

### 适用场景
- AI相关应用
- 个人/小团队项目
- 原型验证阶段

## 建议方案

考虑到项目需求(本地原型验证、DeepSeek API集成)，**推荐采用方案3**，原因如下：

1. Python后端更适合调用AI API
2. 架构简单，便于快速开发
3. SQLite无需额外配置
4. Vue 3生态系统成熟

建议先完成最小可行产品(MVP)，再根据需求增加功能。