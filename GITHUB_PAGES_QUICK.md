# GitHub Pages 快速部署（5分钟）

## 💨 超快速部署流程

### 1️⃣ 创建 GitHub 仓库
- 访问 https://github.com/new
- 名称：`exam-review`
- 选择 **Public**
- 创建仓库

### 2️⃣ 修改 vite.config.js

打开 `vite.config.js`，将第 7 行改为：

```javascript
base: '/exam-review/',  // 改为您的仓库名
```

### 3️⃣ 创建工作流文件

创建路径：`.github/workflows/deploy.yml`

复制以下内容：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm install
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - uses: actions/deploy-pages@v4
```

### 4️⃣ 推送代码

在项目文件夹打开终端：

```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/exam-review.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

⚠️ **将 `YOUR_USERNAME` 改为您的 GitHub 用户名**

### 5️⃣ 启用 GitHub Pages

1. 打开仓库 Settings
2. 左侧菜单 → **Pages**
3. 选择 **Deploy from a branch** 或 **GitHub Actions**
4. 保存

### ✅ 完成！

等待 Actions 完成，访问：
```
https://YOUR_USERNAME.github.io/exam-review/
```

---

## 🔧 如果出现 404 错误

**检查 1**：`base` 路径是否正确
```javascript
// 仓库名为 exam-review 时：
base: '/exam-review/'  // ✅ 正确
base: 'exam-review'    // ❌ 错误
```

**检查 2**：GitHub Pages 是否已启用
- Settings → Pages → 选择部署源

**检查 3**：Actions 是否成功
- Actions 标签页 → 查看 Deploy to GitHub Pages → ✅ 绿色

---

## 📝 更新网站

修改文件后：

```bash
git add .
git commit -m "Update: your changes"
git push
```

GitHub Actions 会自动重新部署！

---

## 🎯 关键命令

| 功能 | 命令 |
|------|------|
| 首次推送 | `git push -u origin main` |
| 后续推送 | `git push` |
| 查看历史 | `git log --oneline` |
| 本地构建 | `npm run build` |

---

## ❓ 遇到问题？

1. **仓库找不到** → 检查 GitHub 用户名是否正确
2. **Pages 显示 404** → 检查 vite.config.js 的 base 路径
3. **Actions 失败** → 点击 Actions 标签查看错误日志
4. **资源加载失败** → 确认 base 路径以 `/` 开头和结尾

祝部署顺利！ 🚀
