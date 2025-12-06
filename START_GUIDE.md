# 🚀 期末复习站 - 快速启动指南

## 📋 项目概况

**项目名称**：期末复习站
**项目路径**：`C:\Users\Administrator\Desktop\work_space\receive\exam-review`
**技术栈**：React 18 + Vite + React Router
**当前学科**：4 门（高等数学、大学物理、有机化学、党章复习）

---

## ⚡ 快速启动（3 步）

### 方式 1️⃣：在电脑浏览器上运行

#### 步骤 1：打开命令行

```bash
# Windows：按 Win + R，输入 cmd 回车
# 或直接在项目文件夹右键选择"在此处打开 PowerShell"
```

#### 步骤 2：进入项目目录

```bash
cd C:\Users\Administrator\Desktop\work_space\receive\exam-review
```

#### 步骤 3：启动开发服务器

```bash
npm run dev
```

#### 步骤 4：打开浏览器

```
访问：http://localhost:5173
```

**预期结果**：
- ✅ 看到首页，显示 4 个学科卡片
- ✅ 可以点击学科进入学习
- ✅ 卡片可翻面，按钮可点击

---

### 方式 2️⃣：在手机上运行（同一 WiFi 网络）

#### 前置条件
- 电脑和手机连接同一个 WiFi
- 知道电脑的 IP 地址（如：`192.168.0.100`）

#### 步骤 1：启动开发服务器（允许局域网访问）

```bash
cd C:\Users\Administrator\Desktop\work_space\receive\exam-review
npm run dev -- --host 0.0.0.0
```

#### 步骤 2：查看输出获取 IP 地址

输出会显示类似：
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.0.100:5173/
```

复制 `Network` 后面的地址。

#### 步骤 3：在手机浏览器访问

```
在手机浏览器地址栏输入：http://192.168.0.100:5173
（将 192.168.0.100 替换为您的 IP 地址）
```

**预期结果**：
- ✅ 手机上看到优化后的移动端界面
- ✅ 学科列表紧凑显示
- ✅ 所有功能正常工作

---

### 方式 3️⃣：生产环境（打包后运行）

#### 步骤 1：构建项目

```bash
cd C:\Users\Administrator\Desktop\work_space\receive\exam-review
npm run build
```

这会生成优化后的生产版本在 `dist/` 目录。

#### 步骤 2：预览生产版本

```bash
npm run preview
```

#### 步骤 3：访问预览

```
http://localhost:4173
```

**优势**：
- ✅ 代码已压缩和优化
- ✅ 加载速度更快
- ✅ 最接近真实部署效果

---

## 🎯 常用命令

| 命令 | 说明 | 场景 |
|------|------|------|
| `npm install` | 安装依赖（仅首次需要） | 刚克隆项目 |
| `npm run dev` | 启动开发服务器 | 开发和调试 |
| `npm run dev -- --host 0.0.0.0` | 允许局域网访问 | 手机测试 |
| `npm run build` | 生产环境构建 | 部署前准备 |
| `npm run preview` | 预览生产版本 | 检查生产效果 |

---

## 📱 测试用学科

### 现有学科（4 门）

1. **高等数学** (math)
   - 6 个题目（混合卡片和选择题）
   - 内容：微积分、线性代数等

2. **大学物理** (physics)
   - 4 个题目
   - 内容：力学、电磁学等

3. **有机化学** (chemistry)
   - 5 个题目
   - 内容：有机化合物、反应机制等

4. **党章复习** (demo) - ⭐ 新增
   - 11 个题目（7 卡片 + 4 选择题）
   - 内容：四个自信、四个意识、党的纪律等

---

## 🔧 常见问题解决

### Q1：启动时提示"node 不是内部命令"

**原因**：未安装 Node.js

**解决**：
```bash
# 检查 Node.js 版本
node --version

# 如果命令不存在，需要安装 Node.js
# 下载地址：https://nodejs.org/
# 推荐 LTS 版本（16 或更高）
```

### Q2：启动后浏览器显示"Cannot find module"

**原因**：依赖未安装

**解决**：
```bash
# 重新安装依赖
npm install

# 然后启动
npm run dev
```

### Q3：手机无法访问（输入 IP 地址无反应）

**可能原因**：
1. WiFi 不是同一个网络
2. 防火墙阻止
3. IP 地址不正确

**排查步骤**：
```bash
# 1. 确认 IP 地址
ipconfig

# 查找 IPv4 Address，如 192.168.0.100

# 2. 确保命令启动时用了 --host 0.0.0.0
npm run dev -- --host 0.0.0.0

# 3. 在手机上 ping 一下电脑
# 在手机浏览器输入：http://192.168.0.100:5173
```

### Q4：加载很慢或卡顿

**原因**：可能是 KaTeX 字体加载或网络问题

**解决**：
```bash
# 清除浏览器缓存
# 1. 按 F12 打开开发者工具
# 2. Network 选项卡右键选 "Disable cache"
# 3. 刷新页面
```

### Q5：学科没有显示或无法进入

**排查**：
```bash
# 1. 检查 manifest.json 是否有学科配置
cat public/content/manifest.json

# 2. 检查学科 JSON 文件是否存在
ls public/content/subjects/

# 3. 浏览器控制台查看错误信息
# F12 打开开发者工具，看 Console 选项卡
```

---

## 📂 项目结构

```
exam-review/
├── src/
│   ├── components/          # React 组件
│   │   ├── CardItem.jsx    # 知识卡片
│   │   ├── MCQItem.jsx     # 选择题
│   │   └── ...
│   ├── pages/              # 页面
│   │   ├── HomePage.jsx    # 首页
│   │   └── StudyPage.jsx   # 学习页
│   ├── styles/             # CSS 文件
│   ├── utils/              # 工具函数
│   └── App.jsx, main.jsx
├── public/
│   └── content/            # 学科内容
│       ├── manifest.json   # 学科配置
│       └── subjects/       # 学科数据
│           ├── math.json
│           ├── physics.json
│           ├── chemistry.json
│           └── demo.json
├── dist/                   # 生产构建输出
├── package.json            # 项目配置
└── vite.config.js         # Vite 配置
```

---

## 💾 添加新学科步骤

如果要添加新学科，只需 3 步：

### 步骤 1：准备 JSON 文件

在 `public/content/subjects/` 创建新文件，例如 `newsubject.json`

**文件格式**：
```json
{
  "subjectId": "newsubject",
  "subjectName": "新学科名称",
  "items": [
    {
      "id": "item-001",
      "type": "card",
      "front": "问题",
      "back": "答案",
      "important": false
    },
    {
      "id": "item-002",
      "type": "mcq",
      "stem": "选择题问题",
      "options": [
        { "key": "A", "text": "选项 A" },
        { "key": "B", "text": "选项 B" }
      ],
      "answer": ["A"],
      "explain": "解析"
    }
  ]
}
```

### 步骤 2：更新 manifest.json

编辑 `public/content/manifest.json`，添加：
```json
{
  "id": "newsubject",
  "name": "新学科名称",
  "path": "subjects/newsubject.json"
}
```

### 步骤 3：刷新应用

- 浏览器自动重新加载
- 新学科立即出现在首页

---

## 🎨 界面说明

### 首页 (HomePage)
- 显示所有可用学科
- 点击学科卡片进入学习
- 移动端显示紧凑列表，桌面端显示卡片网格

### 学习页 (StudyPage)
- 显示当前题目
- 顶部：学科名称 + 进度（如 3/11）
- 中间：题目内容（卡片可翻面）
- 底部：操作按钮
  - 卡片：[❌ 没记住] [✅ 记住了]
  - 选择题：[提交] 按钮

### 特性
- ✅ 自动混合卡片和选择题
- ✅ 响应式设计（手机/平板/电脑）
- ✅ 深色模式支持
- ✅ 公式渲染（KaTeX）
- ✅ 流畅的动画和过渡

---

## 📊 性能指标

| 指标 | 值 |
|------|-----|
| 首屏加载时间 | < 2 秒 |
| 卡片翻面延迟 | 600ms（动画时间） |
| 页面响应时间 | < 100ms |
| 包大小（gzip） | ~154KB |
| 模块数 | 56 |

---

## 🌐 网络访问

### 本地访问
```
http://localhost:5173  ✅ 仅电脑能访问
```

### 局域网访问
```
http://192.168.0.100:5173  ✅ 同 WiFi 的设备可访问
```

### 生产预览
```
http://localhost:4173  ✅ 生产版本预览
```

---

## 🔐 安全提醒

- ⚠️ 开发服务器仅用于开发和测试，不安全
- ⚠️ 不要在互联网上暴露开发服务器
- ⚠️ 生产环境请使用 `npm run build` 生成的文件
- ⚠️ 部署到服务器前删除 node_modules 和 dist

---

## 📞 快速参考

### 启动开发服务器（电脑）
```bash
npm run dev
# 打开 http://localhost:5173
```

### 启动开发服务器（手机）
```bash
npm run dev -- --host 0.0.0.0
# 在手机上打开 http://你的IP:5173
```

### 生产构建
```bash
npm run build
npm run preview
# 打开 http://localhost:4173
```

### 重新安装依赖
```bash
npm install
```

### 构建检查
```bash
npm run build
# 查看 dist/ 目录的输出文件
```

---

## ✅ 启动检查清单

在启动前，确保您已：

- [ ] 安装了 Node.js 16+ (`node --version`)
- [ ] 在项目目录中 (`cd exam-review`)
- [ ] 已安装依赖 (`npm install`)
- [ ] 没有其他应用占用 5173 端口
- [ ] 如需手机访问，电脑和手机在同一 WiFi

---

## 🎉 就绪！

现在您可以开始使用了！

```bash
npm run dev
```

祝您学习愉快！ 🚀
