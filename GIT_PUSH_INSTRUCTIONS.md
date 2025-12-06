# GitHub 推送说明

## 当前状态

✅ 已完成的配置：
- `vite.config.js` 已修改，base 路径设为 `/page_knowledge/`
- `.github/workflows/deploy.yml` 已创建
- 本地 Git 仓库已初始化
- 首次提交已创建
- 分支已重命名为 main

❌ 待完成：
- 代码推送到 GitHub 仓库

---

## 推送代码的方法

### 方法 1：使用命令行（推荐）

在项目根目录打开终端，运行以下命令：

```bash
cd C:\Users\Administrator\Desktop\work_space\receive\exam-review
git push -u origin main
```

首次推送时可能会提示输入 GitHub 认证信息：
- **用户名**: `mmc-cube`
- **密码**: 使用您的 GitHub 密码或个人访问令牌（Personal Access Token）

### 方法 2：使用个人访问令牌（推荐，更安全）

如果用户名/密码推送失败，可以使用个人访问令牌（PAT）：

1. 访问 GitHub 设置：https://github.com/settings/tokens
2. 点击 "Generate new token"
3. 选择 "Personal access tokens (classic)" 或 "Fine-grained tokens"
4. 给予以下权限：
   - `repo` - 完整控制私有仓库
   - `workflow` - 管理 GitHub Actions
5. 复制生成的令牌

然后使用令牌推送：

```bash
git push -u origin main
```

输入用户名：`mmc-cube`
输入密码：粘贴您的个人访问令牌

### 方法 3：使用 SSH（最安全）

如果设置了 SSH 密钥，可以修改 remote URL：

```bash
git remote set-url origin git@github.com:mmc-cube/page_knowledge.git
git push -u origin main
```

---

## 推送后的步骤

推送成功后，GitHub Actions 会自动开始部署。您可以：

1. 访问仓库：https://github.com/mmc-cube/page_knowledge
2. 点击 **Actions** 标签页
3. 等待 "Deploy to GitHub Pages" 工作流完成（约 1-2 分钟）
4. 工作流显示 ✅ 时，部署完成

您的网站将在以下地址访问：
```
https://mmc-cube.github.io/page_knowledge/
```

---

## 常见问题排查

### 问题 1：`fatal: unable to access 'https://github.com/...'`

**可能原因**：
- 网络连接问题
- 防火墙阻止
- GitHub 临时故障
- 认证失败

**解决方案**：
1. 检查网络连接：`ping github.com`
2. 尝试使用 SSH 而不是 HTTPS
3. 等待几分钟后重试
4. 检查防火墙/代理设置

### 问题 2：`Permission denied`

**可能原因**：
- 没有向仓库写入权限
- 认证凭据不正确

**解决方案**：
1. 确认您是仓库所有者或有推送权限
2. 重新输入认证信息
3. 检查是否使用了正确的 GitHub 账户

### 问题 3：推送成功但部署失败

**检查步骤**：
1. 访问 Actions 标签页查看日志
2. 查看具体的错误信息
3. 常见原因：
   - `base` 路径配置错误
   - Node.js 或 npm 安装失败
   - 依赖安装失败

---

## 手动检查 Git 状态

要随时查看 Git 状态，运行：

```bash
git status
```

应该显示：
```
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
```

这表示有 1 个本地提交未推送到 GitHub。

---

## 需要帮助？

如果推送时遇到其他问题，请：

1. 检查错误消息中的具体错误代码
2. 查看 GitHub 的状态页面：https://www.githubstatus.com/
3. 确认网络连接正常
4. 尝试稍后重试

祝推送顺利！ 🚀
