# GitHub Pages 部署指南

本指南将帮助您将 "期末复习站" 部署到 GitHub Pages。

## 前置条件

1. **GitHub 账户** - 已注册的 GitHub 账户
2. **Git 已安装** - 本地配置好 Git
3. **项目已初始化** - 项目文件夹已是 Git 仓库（或将创建新的）

## 方法一：使用 GitHub Actions 自动部署（推荐）

### 步骤 1：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com/new) 创建新仓库
2. 仓库名称：`exam-review`（或您喜欢的名称）
3. 选择 **Public**（GitHub Pages 需要公开仓库，除非使用 Pro）
4. 不选择 "Initialize this repository with README"（我们已有文件）

### 步骤 2：修改 vite.config.js

根据您的仓库名称修改 `base` 路径：

**如果仓库名为 `exam-review`：**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/exam-review/',  // 改为您的仓库名称
})
```

**如果使用 GitHub Pages 用户站点（仓库名为 `username.github.io`）：**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/',  // 用户站点直接使用根路径
})
```

### 步骤 3：初始化本地仓库并推送代码

在项目根目录（`exam-review` 文件夹）打开终端，执行以下命令：

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加 remote（将 YOUR_USERNAME 替换为您的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/exam-review.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: exam review application"

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 步骤 4：创建 GitHub Actions 工作流

在项目根目录创建文件夹和工作流文件：

1. 创建文件夹：`.github/workflows/`
2. 在该文件夹内创建文件：`deploy.yml`

**`.github/workflows/deploy.yml` 内容：**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 步骤 5：配置 GitHub Pages 设置

1. 访问您的仓库：`https://github.com/YOUR_USERNAME/exam-review`
2. 点击 **Settings** → **Pages**
3. 在 "Source" 部分：
   - 选择 **Deploy from a branch**（如果已有）
   - 或选择 **GitHub Actions**
4. 保存设置

### 步骤 6：验证部署

1. 等待 GitHub Actions 工作流完成（在 **Actions** 标签页查看）
2. 工作流成功后，您的网站将在以下地址访问：
   - **项目仓库**：`https://YOUR_USERNAME.github.io/exam-review/`
   - **用户站点**：`https://YOUR_USERNAME.github.io/`（如果仓库名为 `username.github.io`）

---

## 方法二：手动部署（不使用 Actions）

### 步骤 1-2：同上（创建仓库和修改 vite.config.js）

### 步骤 3：本地构建并部署

```bash
# 在项目根目录
npm run build

# 将 dist 文件夹内容推送到 gh-pages 分支（需要安装 gh-pages 工具）
npm install --save-dev gh-pages

# 在 package.json 中添加脚本：
# "deploy": "gh-pages -d dist"

# 然后运行
npm run deploy
```

### 步骤 4：配置 GitHub Pages

1. 访问仓库 Settings → Pages
2. 选择 **gh-pages** 分支
3. 保存

---

## 常见问题排查

### 问题 1：404 错误 - 页面找不到

**原因**：`base` 路径配置错误

**解决方案**：
- 检查 `vite.config.js` 中的 `base` 是否与仓库名称一致
- 仓库名为 `exam-review` 时，应该是 `base: '/exam-review/'`

### 问题 2：资源 404（CSS、JS 加载失败）

**原因**：同上，base 路径错误导致资源路径不对

**解决方案**：
```javascript
// 确保 base 以 / 开头和结尾
base: '/exam-review/'  // 正确
// base: 'exam-review'  // 错误
// base: '/exam-review' // 错误
```

### 问题 3：GitHub Pages 未启用

**原因**：Settings 中未配置 Pages 设置

**解决方案**：
1. 访问 Settings → Pages
2. 确保选择了部署源（Actions 或 gh-pages 分支）

### 问题 4：路由不工作（React Router）

**原因**：GitHub Pages 不支持客户端路由，只能使用 Hash 路由

**当前解决方案**：
- 项目使用了 React Router，可能需要配置 Hash 模式
- 修改 `src/App.jsx` 中的 Router：

```jsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      {/* 您的路由 */}
    </Router>
  )
}
```

---

## 部署后维护

### 更新内容

每当您修改代码时：

```bash
# 提交更改
git add .
git commit -m "Update: description of changes"

# 推送到 GitHub
git push origin main

# GitHub Actions 将自动构建和部署
```

### 查看部署状态

1. 访问仓库的 **Actions** 标签页
2. 查看最新的 "Deploy to GitHub Pages" 工作流
3. 成功时显示 ✅，失败时显示 ❌

### 回滚版本

如果部署出问题，可以回滚到之前的提交：

```bash
# 查看提交历史
git log --oneline

# 回滚到某个提交（将 COMMIT_HASH 替换为实际的提交哈希）
git revert COMMIT_HASH
git push origin main
```

---

## 完整命令速查表

| 操作 | 命令 |
|------|------|
| 初始化仓库 | `git init` |
| 添加 remote | `git remote add origin https://github.com/YOUR_USERNAME/exam-review.git` |
| 查看 remote | `git remote -v` |
| 添加所有文件 | `git add .` |
| 提交 | `git commit -m "message"` |
| 推送 | `git push -u origin main` |
| 本地构建 | `npm run build` |
| 查看构建结果 | `ls dist/` |

---

## 最终检查清单

在推送代码前，请确保：

- [ ] `vite.config.js` 中的 `base` 路径正确
- [ ] 项目可以本地构建成功：`npm run build`
- [ ] `dist/` 文件夹已生成
- [ ] `.github/workflows/deploy.yml` 文件已创建
- [ ] GitHub 仓库已创建并设为 Public
- [ ] GitHub Pages 在 Settings 中已启用

---

## 需要帮助？

如果遇到问题，请：

1. 检查 GitHub Actions 的错误日志（仓库 → Actions → 失败的工作流）
2. 验证 `base` 路径配置
3. 确保所有文件都已推送到 GitHub
4. 查看浏览器的开发者工具（F12）查看具体的加载失败信息

祝部署顺利！🚀
