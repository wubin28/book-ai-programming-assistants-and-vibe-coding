# 提示词

@workspace /explain 请从整体上分析 frontend 目录下的前端代码 #codebase  。首先全面介绍所使用的技术栈、各自的版本号及其用途。然后详细列出前端的完整目录结构，并解释每个关键文件的作用，这样在未来需要添加功能或修复问题时，我能快速定位到相关文件。重点说明需要手动修改的文件，而对于工具自动生成和维护的文件只需简要说明。最后，列出在开发维护过程中最常需要修改的文件，作为重点关注对象。其中的代码具体实现细节可以先不讨论。

# github copilot: Workspace: 让我为您分析这个前端项目：

### 技术栈分析

**核心框架与库**：
- React v18.3.1 - 核心前端框架
- React DOM v18.3.1 - React 的 DOM 绑定
- TypeScript v5.5.3 - 类型系统支持
- Vite v5.4.2 - 构建工具和开发服务器
- Lucide React v0.344.0 - 图标库

**开发工具与样式**：
- TailwindCSS v3.4.1 - CSS 框架
- ESLint v9.9.1 - 代码质量检查
- PostCSS v8.4.35 - CSS 处理器
- Autoprefixer v10.4.18 - CSS 兼容性处理

### 目录结构及文件说明

```markdown
frontend/
├── src/                    # 源代码目录
│   ├── main.tsx           # 应用程序入口点
│   ├── App.tsx            # 根组件
│   ├── index.css          # 全局样式
│   └── vite-env.d.ts      # Vite 类型声明
├── public/                 # 静态资源目录
├── .bolt/                 # Bolt 相关配置
│   ├── config.json        # Bolt 配置文件
│   └── prompt             # Bolt 提示文件
├── 配置文件
    ├── package.json       # 项目依赖和脚本
    ├── vite.config.ts     # Vite 配置
    ├── tsconfig.json      # TypeScript 配置（根）
    ├── tsconfig.app.json  # 应用 TypeScript 配置
    ├── tsconfig.node.json # Node 环境 TypeScript 配置
    ├── tailwind.config.js # Tailwind 配置
    ├── postcss.config.js  # PostCSS 配置
    └── eslint.config.js   # ESLint 配置
```

### 需要手动修改的关键文件

1. **源代码文件**：
   - App.tsx - 应用程序主组件
   - main.tsx - 应用程序入口
   - index.css - 全局样式定义

2. **配置文件**：
   - vite.config.ts - Vite 构建配置
   - tailwind.config.js - Tailwind 样式配置
   - package.json - 依赖管理和脚本配置

### 自动生成/维护的文件

- package-lock.json - npm 依赖锁定文件
- vite-env.d.ts - Vite 类型声明
- `tsconfig*.json` - TypeScript 配置文件（通常只需少量修改）

### 最常需要修改的文件

1. **开发最频繁**：
   - App.tsx - 主要业务逻辑
   - index.css - 样式调整
   - 新建的组件文件（在 `src/components/` 下，目前未创建）

2. **偶尔需要修改**：
   - package.json - 添加新依赖
   - vite.config.ts - 调整构建配置
   - tailwind.config.js - 自定义主题配置

### 开发建议

1. 建议创建以下目录结构：
   ```markdown
   src/
   ├── components/     # 可复用组件
   ├── pages/         # 页面组件
   ├── hooks/         # 自定义 React hooks
   ├── utils/         # 工具函数
   └── types/         # TypeScript 类型定义
   ```

2. 考虑到项目使用了 TailwindCSS，建议在 src 下创建 `styles/` 目录来管理自定义样式。