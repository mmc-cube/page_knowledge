# 🚀 快速开始指南

## ⚡ 30秒快速开始

```bash
# 1. 进入项目目录
cd exam-review

# 2. 安装依赖（仅第一次需要）
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器
# http://localhost:5173
```

**Done!** 🎉 你现在可以看到首页了

---

## 📖 基本流程

1. **首页**：看到三个学科（高等数学、大学物理、有机化学）
2. **点击学科**：进入学习页面
3. **学习内容**：
   - 看到**卡片**？→ 点击翻面 → 选择记住/没记住
   - 看到**选择题**？→ 选择答案 → 点击提交 → 查看解析
4. **进度**：页面顶部显示 `当前题号 / 总数`
5. **完成**：所有内容学完后会显示 🎉

---

## 🎯 常见操作

### 开发

```bash
# 启动开发服务器（带热更新）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 添加新学科

1. **创建内容文件**
   - 在 `public/content/subjects/` 下创建 `yoursubject.json`

2. **更新 manifest**
   - 编辑 `public/content/manifest.json`，添加：
   ```json
   {
     "id": "yoursubject",
     "name": "你的学科名称",
     "path": "subjects/yoursubject.json"
   }
   ```

3. **刷新浏览器**
   - 首页会自动显示新学科

---

## 📝 JSON 格式速查表

### 知识卡片

```json
{
  "id": "unique-id",
  "type": "card",
  "front": "问题内容",
  "back": "答案内容（支持公式如 $x^2$）",
  "explain": "解析说明",
  "important": true
}
```

### 单选题

```json
{
  "id": "unique-id",
  "type": "mcq",
  "stem": "题目",
  "multi": false,
  "options": [
    { "key": "A", "text": "选项 A" },
    { "key": "B", "text": "选项 B" }
  ],
  "answer": ["A"],
  "explain": "解析",
  "important": false
}
```

### 多选题

```json
{
  "id": "unique-id",
  "type": "mcq",
  "stem": "题目",
  "multi": true,
  "options": [
    { "key": "A", "text": "选项 A" },
    { "key": "B", "text": "选项 B" },
    { "key": "C", "text": "选项 C" }
  ],
  "answer": ["A", "B"],
  "explain": "解析",
  "important": true
}
```

---

## 🔤 公式语法

```markdown
行内公式：$f(x) = x^2$

块级公式：$$\int_0^1 x^2 dx = \frac{1}{3}$$

复杂公式：$$\lim_{n\to\infty} \left(1 + \frac{1}{n}\right)^n = e$$
```

---

## 🐛 常见问题

### Q: 学科加载失败？
A: 检查文件路径是否正确，确保 JSON 格式有效

### Q: 公式显示不对？
A: 确保使用了正确的 LaTeX 语法，KaTeX 不支持所有 LaTeX 命令

### Q: 为什么我的修改没有生效？
A:
- 如果修改了代码，热更新会自动刷新（dev 模式）
- 如果修改了 JSON，需要手动刷新浏览器

### Q: 如何在 GitHub Pages 上部署？
A: 参考 README.md 的部署部分

---

## 📂 项目文件说明

```
exam-review/
├── src/                    # 源代码
├── public/
│   └── content/           # 学习内容（JSON 文件）
├── dist/                  # 构建产物（npm run build 后生成）
├── package.json           # 依赖配置
├── vite.config.js         # Vite 配置
├── README.md              # 完整文档
└── QUICK_START.md         # 本文件
```

---

## 🎨 自定义样式

编辑 `src/App.css` 中的 CSS 变量：

```css
:root {
  --primary: #3b82f6;              /* 主色（蓝色）*/
  --success: #10b981;              /* 成功色（绿色）*/
  --danger: #ef4444;               /* 危险色（红色）*/
  --gray-500: #6b7280;             /* 灰色 */
}
```

---

## 💡 开发技巧

### 使用浏览器控制台调试

打开浏览器开发者工具 (F12)，查看：
- **Console**：错误信息和验证日志
- **Network**：JSON 文件加载情况
- **Application → LocalStorage**：学习数据（如果实现）

### 快速测试多选题

在 `public/content/subjects/` 下的任何 JSON 中，将 `multi: false` 改为 `multi: true`，题目会自动变成多选

---

## 📊 项目状态

- ✅ 开发环境：就绪
- ✅ 生产构建：通过
- ✅ 示例内容：包含 3 个学科、15 条混合内容
- ✅ 文档：完整

---

## 🆘 需要帮助？

1. 查看 `README.md` 了解完整文档
2. 查看 `PROJECT_SUMMARY.md` 了解技术细节
3. 检查控制台错误信息
4. 确保 JSON 格式正确（可用 JSON 验证工具）

---

**祝你编码愉快！** 🎓
