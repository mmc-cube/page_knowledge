# 🔧 修复 404 错误

## 问题分析

错误信息：`Failed to load resource: main.jsx:1 - 404`

### 原因
这个 404 错误通常是由以下原因引起的：

1. **浏览器缓存** - 显示的是旧的缓存资源
2. **路径配置问题** - base 路径或资源路径不正确
3. **GitHub Pages 部署延迟** - 新文件还没有完全部署

## 解决方案

### 方法 1：清除浏览器缓存（最有效）

1. **打开浏览器开发者工具** - 按 F12
2. **打开 Network 标签页**
3. **勾选 "Disable cache"**（禁用缓存）
4. **硬刷新页面** - Ctrl+Shift+R（Windows）或 Cmd+Shift+R（Mac）

或者：

1. **打开私密/无痕窗口** - Ctrl+Shift+N（Windows）
2. **访问您的网站** - https://mmc-cube.github.io/page_knowledge/

### 方法 2：等待部署完全生效

GitHub Pages 部署可能需要 5-10 分钟才能完全生效。
- 等待 5-10 分钟后重试

### 方法 3：重新触发部署

如果以上方法都不行，可以重新推送一个提交：

```bash
git commit --allow-empty -m "trigger redeploy"
git push
```

这会触发 GitHub Actions 重新部署。

## 验证部署

### 1. 检查构建是否成功

访问 Actions 页面：
```
https://github.com/mmc-cube/page_knowledge/actions
```

确认最新的部署工作流显示 ✅ 成功。

### 2. 检查文件是否存在

在浏览器中访问资源 URL：
```
https://mmc-cube.github.io/page_knowledge/assets/index-BVuuvsWD.js
```

如果返回 200 状态码，说明文件存在。

### 3. 检查浏览器控制台

按 F12 打开开发者工具，查看具体的错误信息。

## 预期结果

成功部署后，您应该能看到：

```
✅ 首页：科目选择页面
✅ 学习页面：卡片翻转和选择题
✅ 4 个科目：高等数学、大学物理、有机化学、党员考试
```

## 常见错误排查

### 错误 1：显示 404 Not Found

**解决方案**：
1. 清除浏览器缓存
2. 使用私密窗口重试
3. 等待 5-10 分钟后重试

### 错误 2：资源加载失败（404）

**检查清单**：
- [ ] `vite.config.js` 中 `base: '/page_knowledge/'` 是否正确
- [ ] GitHub Pages 是否启用（Settings → Pages）
- [ ] GitHub Actions 部署是否成功（Actions 标签页）

### 错误 3：页面显示白屏

**可能原因**：
- React 或其他依赖加载失败
- JavaScript 执行出错

**解决方案**：
1. 打开 F12 开发者工具
2. 查看 Console 标签页的错误信息
3. 查看 Network 标签页检查资源加载

---

## 快速解决步骤（按顺序尝试）

1. ✅ **清除缓存后硬刷新** - Ctrl+Shift+R
2. ✅ **使用私密窗口** - Ctrl+Shift+N
3. ✅ **等待 5-10 分钟** - GitHub Pages 延迟
4. ✅ **触发重新部署** - `git commit --allow-empty -m "trigger" && git push`
5. ✅ **检查 Actions 日志** - 确认部署成功

---

如果以上方法都不行，请提供浏览器控制台中的具体错误信息。
