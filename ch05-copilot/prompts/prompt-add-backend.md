# 提示词

你作为nodejs专家，请用2025年nodejs最流行的技术和最佳实践，在github-copilot-bolt/backend目录下创建一个nodejs后端应用，允许github-copilot-bolt/frontend目录下的React前端应用调用该后端，并通过后端向DeepSeek官方API发送请求。调用DeepSeek API的nodejs示例代码见后文。同时，请修改前端代码实现以下功能：当用户点击"Optimize Prompt"按钮时，前端将App.tsx文件第19行的template变量内容通过nodejs后端发送给DeepSeek。发送前，清空UI右侧最下方"Optimized Prompt"下的所有内容。收到DeepSeek回复后，将回复内容显示在"Optimized Prompt"下方。如果DeepSeek长时间未响应，则在"Optimized Prompt"下方显示"DeepSeek没有响应"。另外请将DeepSeek API key（值为sk-bxxx）保存在github-copilot-bolt/backend/.env文件里。下面是调用DeepSeek API的nodejs示例代码：
```jsx
// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: '<DeepSeek API Key>'
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}

main();
```
