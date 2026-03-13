# 心语森林 - 情侣互动聊天卡牌

一个基于React和DeepSeek API的情侣互动聊天卡牌应用，帮助情侣通过深度对话和互动挑战增进感情。
<img width="1912" height="948" alt="image" src="https://github.com/user-attachments/assets/ad0ba298-7296-4308-aeee-c3ef0b63996a" />


## 功能特点

- **心语时刻**：深度对话卡牌，促进情侣间的情感交流
- **森林挑战**：互动游戏卡牌，增加情侣间的默契和乐趣
- **森林寄语**：温馨祝福卡牌，传递爱的信息
- **AI灵感生成**：基于DeepSeek API生成个性化卡牌内容
- **响应式设计**：适配手机和电脑屏幕尺寸
- **精美动画**：流畅的卡牌翻转动画效果

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- DeepSeek API
- Vite

## 安装步骤

1. 克隆项目到本地
   ```bash
   git clone <repository-url>
   cd 心语森林-aistudio
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 配置环境变量
   - 复制 `.env.example` 文件为 `.env`
   - 在 `.env` 文件中填写你的 DeepSeek API Key
   ```
   DEEPSEEK_API_KEY=your_deepseek_api_key
   ```

4. 启动开发服务器
   ```bash
   npm run dev
   ```

5. 构建生产版本
   ```bash
   npm run build
   ```

## 使用指南

1. **浏览卡牌**：使用左右箭头按钮浏览现有卡牌
2. **重新洗牌**：点击"重新洗牌"按钮随机排列卡牌
3. **灵感生成**：在输入框中输入话题，点击"灵感生成"按钮生成新卡牌
4. **翻转卡牌**：点击卡牌查看正面内容

## 项目结构

```
心语森林-aistudio/
├── src/
│   ├── components/       # 组件目录
│   │   ├── Card.tsx      # 卡牌组件
│   │   └── Deck.tsx      # 卡牌 deck 组件
│   ├── services/         # 服务目录
│   │   └── deepseekService.ts  # DeepSeek API 服务
│   ├── types.ts          # 类型定义
│   ├── constants.ts      # 常量定义
│   └── App.tsx           # 应用入口
├── source/               # 资源目录
│   ├── 卡牌背景全图.png   # 页面背景图
│   └── 各种动物卡牌.png   # 动物卡牌图像
├── .env.example          # 环境变量示例
├── vite.config.ts        # Vite 配置
├── package.json          # 项目配置
└── README.md             # 项目说明
```

## API 说明

本项目使用 DeepSeek API 生成卡牌内容，API 调用格式遵循 OpenAI 兼容格式。详细文档请参考 [DeepSeek API 文档](https://api-docs.deepseek.com/zh-cn/)。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 许可证

MIT License
