import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 指向您的设置文件
    setupFiles: ['./setupTests.js'],
    // 其他 Vitest 配置...
  }
});