# 豆汁（www.douzhi.me）前端镜像 · 个人研究用

把 `https://www.douzhi.me/` 这个站点能公开下载到的前端产物，完整镜像到本地，并做了可读化处理，方便自己阅读和学习它的实现方式。

---

## 一、先说结论（很重要）

| 你想拿到的 | 实际情况 |
| --- | --- |
| 原始项目源码（`.tsx` / `.jsx`、目录结构、Git 历史） | ❌ **拿不到**。站点是 Vite 打包后的单文件产物，**没有部署 sourcemap**（`/assets/*.js.map`、`/robots.txt`、`/sitemap.xml` 请求全部返回首页 HTML，说明是 SPA 的 catch-all 回退），GitHub 上也没有对应仓库。 |
| 前端打包产物（JS / CSS / 图片 / 图标） | ✅ **已全部镜像**，就是浏览器实际执行的代码。 |
| 可读的代码 | ✅ 已用 Prettier 格式化：**157,734 行**，变量名仍是压缩后的（`hF`、`QF`…），但结构、逻辑、文案、接口全部可读可搜。 |
| 后端 / 数据库逻辑 | ❌ 不在前端。只能从请求里看到它调用了 Supabase 和自建 Cloudflare Worker。 |
| 用户数据 | ❌ 完全没有，也不应该去拿。 |

> 一句话：**这是"反编译式还原"，不是"泄漏源码"**。得到的是任何人都能从浏览器 Network 面板下载到的公开静态文件。

---

## 二、目录结构

```
d:\a豆汁机\
├─ 豆汁链接.txt                  # 原始链接
├─ README.md                     # 本文件
├─ package.json                  # 脚本入口（serve / docs / find …）
├─ server.js                     # 本地静态服务器（含 SPA 回退、中文路径支持）
│
├─ site-mirror\                  # ① 1:1 镜像，可直接跑起来
│  ├─ index.html
│  ├─ manifest.json
│  ├─ favicon.png  favicon-16x16.png  apple-touch-icon.png  icon-192.png  icon-512.png
│  ├─ assets\
│  │  ├─ index-WFSmNqA8.js       # 主 bundle，3.84 MB（压缩后）
│  │  ├─ index-D5frml_S.css      # 样式，296 KB（Tailwind 产物）
│  │  └─ photo-placeholder-B_NHJ1Xw.webp
│  └─ moods\                     # 6 个心情图标
│     └─ 开心.png  心动.png  无语尴尬.png  平静.png  伤心.png  生气.png
│
├─ src-readable\                 # ② 可读版（格式化后的产物）
│  ├─ index.pretty.js            # 6.3 MB / 157,734 行
│  └─ index.pretty.css           # 337 KB / 13,748 行
│
├─ docs\
│  ├─ routes.md                  # 106 条路由 → 组件变量名 → 定义行号 对照表
│  └─ endpoints.md               # 所有硬编码的外部接口 / CDN / 素材地址
│
└─ tools\
   ├─ find.js                    # 在 15 万行里检索（带行号+上下文）
   ├─ extract-assets.js          # 从产物里提取资源清单
   ├─ summary.js                 # 提取路由 / Supabase 配置速览
   ├─ make-docs.js               # 生成 docs/ 下两个文档
   ├─ diff-routes.js             # 校验文档路由与产物是否一致
   ├─ render-check.ps1           # 无头 Edge 渲染自检（起服务 → 抓 DOM → 提取可见文本）
   └─ assets-report.json         # 提取结果原始数据
```

---

## 三、怎么跑起来

### 最省事：双击

| 双击 | 作用 |
| --- | --- |
| `启动镜像.bat` | 起服务并**自动打开浏览器**到 http://localhost:5173/ ；关闭那个标题为 `douzhi-mirror` 的窗口即停止 |
| `停止镜像.bat` | 按端口 5173 找到进程并结束（用于后台残留的服务） |

> 两个 bat 内部只用 ASCII 提示文字（避免 cmd 代码页导致的乱码 / 解析错位），中文只出现在文件名上，双击或命令行都能正常跑。

### 或者命令行

```powershell
cd d:\a豆汁机
npm run serve
# 打开 http://localhost:5173/
```

`server.js` 做了两件事：把 `site-mirror\` 当站点根目录、找不到文件时回退 `index.html`（和 Vercel 的行为一致）。

**注意**：能打开、能看界面（实测首页直接渲染，含微信 / 情侣空间 / 世界书 / 音乐 / 日历 / 小剧场 / 行程 / 游戏入口），但**数据在后端 Supabase**，本地镜像里没有任何账号数据，所以列表是空的、登录只影响云端同步。
另外前端请求仍然指向原站的线上接口，**请不要在里面做任何写操作**（发消息、打卡、支付等），避免污染别人的线上数据。

只想看界面、不想连后端的话，可以直接打开 `site-mirror\index.html` 的静态结构（但没有 JS 路由支持，建议还是用 `npm run serve`）。

### 已验证的可用性（都实际跑过）

| 检查项 | 结果 |
| --- | --- |
| 首页 `/` | 200 · 1,569 B · `text/html` |
| 主 bundle | 200 · 4,025,813 B · `application/javascript` |
| 样式 | 200 · 303,349 B · `text/css` |
| 中文路径 `/moods/开心.png` | 200 · 10,634 B · `image/png` |
| SPA 深链 `/chat/abc/settings` | 200 · 回退 1,569 B HTML |
| 美化后 JS 语法 | `node --check` 通过（exit 0） |
| 无头 Edge 实际渲染 | DOM 19,860 B，首页正常出图出字 |

渲染出来的首页可见文本（实测）：

```
16:06  11月2日星期一  微信  情侣空间  世界书  音乐  星期一  4:06 PM  Edit
今天要做的事情...  暂无播放  --:--  系统设置  美化  写点什么...  日历  小剧场  行程  游戏
```

复现：`powershell -ExecutionPolicy Bypass -File tools\render-check.ps1`

---

## 四、这个站的技术栈（从产物中确认，不是猜的）

| 项目 | 版本 / 证据 |
| --- | --- |
| React | `18.3.1`（`react-dom.production.min.js` 内部版本号） |
| 路由 | React Router v6（`remix-run/router` 标记 + 106 条 `path`/`element` 定义） |
| 构建 | Vite（产物路径 `/assets/index-[hash].js`；代码里有 `vite:preloadError` 事件，第 9,191 行） |
| 样式 | Tailwind CSS（CSS 里有 5,110 处 `--tw-` 变量） |
| 后端 | Supabase JS SDK `2.87.1`（Auth + Postgres + Realtime） |
| 地图 | Leaflet `1.9.4` + CartoDB 底图 |
| 图标 | lucide-react |
| 状态 | 自建 hooks/context + `localStorage`（1,024 处）+ `indexedDB`（44 处，用于离线数据） |
| 部署 | Vercel（响应头 `Server: Vercel`） |

功能面很宽：AI 角色扮演聊天（含记忆、世界书、语音）、类微信 / 类 Instagram 社交、朋友圈、情侣空间（相册/纪念日/打卡/经期/宠物）、钱包（卡包/亲密付/交易）、记账、音乐播放与搜索、地图与位置历史、论坛、直播、若干小游戏（21 点、斗地主、狼人杀、扑克）。

---

## 五、怎么读这份代码

格式化后是一个 15 万行的单文件，顺序大致是：工具函数 → 各种 hooks/context → 页面组件 → 路由表 → 入口渲染。

**1）按路由找页面**（最有效）

打开 `docs/routes.md`，比如想看聊天页：

| 路由 | 组件 | 组件定义行 | 路由定义行 |
| --- | --- | --- | --- |
| `/chat/:id` | `hF` | 73955 | 157623 |
| `/moments` | `iU` | 90719 | 157613 |
| `/wallet` | `QF` | 89344 | 157638 |
| `/forum` | `lW` | 111868 | 157665 |

在 VS Code 里 `Ctrl+G` 输入行号即可跳到该组件的定义处。

**2）命令行检索**

```powershell
# 基本搜索（带行号）
node tools\find.js "chat/completions"

# 前后各 3 行上下文
node tools\find.js "chat/completions" 3

# 正则搜索
node tools\find.js "localStorage\.(get|set)Item" 0 --regex

# 换文件搜索 / 提高命中上限
node tools\find.js ":root" 1 --file=src-readable/index.pretty.css --max=100
```

**3）几个已验证的入口点**

| 想找 | 搜这个 | 位置 |
| --- | --- | --- |
| 路由总表 | 行号 157,54x 起 | 末尾 |
| AI 请求（OpenAI 兼容协议） | `chat/completions` | 27,441 / 35,124 / 35,160 |
| Supabase 客户端初始化 | `createClient` | 4 处 |
| 心情图标映射 | `/moods/` | 6 个 id：`happy / love / awkward / calm / sad / angry` |
| 音乐接口（自建 Worker） | `zhizhi-api` | `docs/endpoints.md` |

**4）注意**：变量名是压缩的（`e`、`t`、`s`…），React 元素用的是 `e.jsx(...)` 这种 JSX 编译后的形式。读的时候先看字符串常量（文案、路由、接口地址），再顺着函数名/调用关系往下追，效率最高。

---

## 六、局限与声明

1. **没有 sourcemap**：无法还原原始文件名、组件名、类型定义，也无法还原成可编译的工程。能做的只有格式化 + 人工阅读。
2. **后端不可见**：数据库表结构、RLS 策略、Worker 源码、Prompt 模板中的服务端部分都不在包里。（前端里硬编码的 API Key 是 Supabase 的公开 anon key，本来就是给浏览器用的，不含 service_role 权限。）
3. **资源清单可能不全**：`docs/endpoints.md` 里的资源是从 bundle 静态提取的；运行时拼接的 URL（如 `/moods/${id}.png`）已按实际用到的 6 个 id 补齐，若站点以后新增心情图标需要再抓。
4. **两个 404 资源**：`/default-avatar.png`、`/favicon.ico` 在站上本来就返回首页 HTML（不存在），镜像里已剔除，`docs/endpoints.md` 会标注。
5. **版权**：代码、文案、图片、音效的版权属于站点作者。「自用」= 自己本地看、学习；**不要公开转载、分发、商用，也不要拿去套壳运营**。如果你要基于它做东西，最好联系作者授权。
6. **不要攻击/爬取用户数据**：镜像不含任何用户内容，也不建议去逆向它的线上后端接口。

---

## 七、可用命令

| 命令 | 作用 |
| --- | --- |
| `npm run serve` | 本地起服务 http://localhost:5173/ |
| `npm run docs` | 重新生成 `docs/routes.md`、`docs/endpoints.md` |
| `npm run summary` | 打印路由 / Supabase 配置速览 |
| `npm run extract-assets` | 重新扫描产物，更新 `tools/assets-report.json` |
| `npm run beautify` | 用 Prettier 重新格式化 `src-readable/`（需要 npx） |
| `npm run verify` | 无头 Edge 渲染自检（自动起服务 → 抓 DOM → 打印可见文本） |
| `node tools\find.js "关键词" [上下文行数]` | 检索代码 |

---

*生成时间：2026-11-02 · 目标站点：https://www.douzhi.me/ · 仅供个人学习研究*
