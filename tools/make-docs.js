// 生成 docs/routes.md 与 docs/endpoints.md
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const js = fs.readFileSync(path.join(root, 'src-readable', 'index.pretty.js'), 'utf8');
const jsLines = js.split(/\r?\n/);

// ---------- 路由（路由表里 path -> 组件） ----------
const routeEntries = [];
jsLines.forEach((line, idx) => {
  const pm = line.match(/path:\s*"(\/[^"\\]{0,80})"/);
  if (!pm) return;
  const window = [line, jsLines[idx + 1] || '', jsLines[idx + 2] || ''].join('\n');
  const em = window.match(/element:\s*e\.jsx\(\s*([A-Za-z_$][\w$]*)/);
  if (!em) return;
  routeEntries.push({ path: pm[1], comp: em[1], routeLine: idx + 1 });
});

const uniq = new Map();
for (const r of routeEntries) if (!uniq.has(r.path)) uniq.set(r.path, r);
const routes = [...uniq.values()].sort((a, b) => a.path.localeCompare(b.path));

// 组件定义行号：兼容 const X = / , X = / function X( / X = ( / X = {
const defLineCache = new Map();
const findDefLine = (id) => {
  const re = new RegExp(`(?:function\\s+${id}\\b)|(?:[^\\w$.]${id}\\s*=\\s*(?:async\\s*)?(?:\\(|function\\b|\\{|\\[|\\w))`);
  for (let i = 0; i < jsLines.length; i++) {
    if (re.test(jsLines[i])) return i + 1;
  }
  return 0;
};
for (const r of routes) {
  if (!defLineCache.has(r.comp)) defLineCache.set(r.comp, findDefLine(r.comp));
}
for (const r of routes) r.defLine = defLineCache.get(r.comp) || 0;

// 一级路径分组
const groups = new Map();
for (const r of routes) {
  const seg = r.path.split('/').filter(Boolean)[0] || '(root)';
  if (!groups.has(seg)) groups.set(seg, []);
  groups.get(seg).push(r);
}

const groupTitle = {
  '(root)': '首页',
  accounting: '记账',
  'add-api': 'API 配置',
  admin: '管理后台',
  'ai-chat': 'AI 聊天',
  'ai-phone-select': 'AI 角色选择',
  'ai-schedule': 'AI 日程',
  'api-list': 'API 列表',
  auth: '登录 / 注册',
  'avatar-library': '头像库',
  'background-customizer': '背景自定义',
  blackjack: '小游戏：21 点',
  'bubble-editor': '聊天气泡编辑',
  calendar: '日历',
  character: '角色详情',
  chat: '聊天（含记忆 / 天气 / 购物 / 转账等子页）',
  'cloud-account': '云账号',
  contacts: '通讯录',
  'couple-album': '情侣相册',
  'couple-anniversary': '纪念日',
  'couple-check-in': '情侣打卡',
  'couple-message-board': '情侣留言板',
  'couple-period': '经期记录',
  'couple-pet': '情侣宠物',
  'couple-space': '情侣空间',
  'couple-space-settings': '情侣空间设置',
  'create-character': '创建角色',
  'custom-prompt': '自定义提示词',
  customize: '个性化',
  'data-manager': '数据管理',
  decoration: '界面装饰（聊天 CSS / 配色 / 音乐）',
  discover: '发现',
  'edit-api': '编辑 API',
  'edit-preset': '编辑预设',
  'edit-summary-api': '编辑摘要 API',
  'edit-world-book': '编辑世界书',
  'emoji-management': '表情管理',
  envelope: '信封',
  favorites: '收藏',
  'font-customizer': '字体自定义',
  forum: '论坛 / 角色广场',
  'game-list': '小游戏列表',
  'global-memory': '全局记忆',
  'group-list': '群聊列表',
  group: '群聊详情 / 设置',
  instagram: '类 Instagram 社交模块',
  'invite-admin': '邀请管理',
  landlord: '小游戏：斗地主',
  live: '直播 / 电台',
  'location-history': '角色位置历史',
  map: '地图',
  me: '我的',
  'meme-library': '梗图库',
  'mini-programs': '小程序',
  moments: '朋友圈',
  'music-player': '音乐播放器',
  'music-search': '音乐搜索',
  poker: '小游戏：扑克',
  preset: '预设列表',
  'publish-moment': '发布动态',
  'role-swap': '角色互换',
  'screen-settings': '屏幕设置',
  'sound-customizer': '音效自定义',
  'statusbar-customize': '状态栏自定义',
  'switch-account': '切换账号',
  theatre: '剧场',
  'upload-song': '上传歌曲',
  'user-profile': '用户资料',
  'voice-settings': '语音设置',
  wallet: '钱包（卡包 / 交易 / 亲密付）',
  wechat: '类微信聊天',
  werewolf: '小游戏：狼人杀',
  'world-book': '世界书',
};

let md = '# 路由表（从打包产物中提取）\n\n';
md += `> 来源：\`src-readable/index.pretty.js\` 末尾的路由定义（约 157,5xx 行起），共 **${routes.length}** 条真实路由（\`path\` + \`element\` 成对出现）。\n`;
md += '> 另有 5 处 `path:` 字符串是菜单项 / 游戏卡片的配置（`/accounting`、`/group-list`、`/mini-programs`、`/poker`、`/blackjack`），不属于路由。\n';
md += '> `组件` 是压缩后的变量名（原始组件名已不可恢复）；`组件定义行` 是该变量的定义位置，用编辑器 `Ctrl+G` 输入行号即可跳转。\n';
md += '> 中文功能归类是按路由名推断的，仅供参考。\n\n';

md += '## 分组统计\n\n| 一级路径 | 路由数 | 推测功能 |\n| --- | --- | --- |\n';
for (const [seg, list] of [...groups.entries()].sort((a, b) => b[1].length - a[1].length)) {
  md += `| \`${seg}\` | ${list.length} | ${groupTitle[seg] || '-'} |\n`;
}

md += '\n## 路由 → 组件 对照表\n\n| 路由 | 组件 | 组件定义行 | 路由定义行 | 推测功能 |\n| --- | --- | --- | --- | --- |\n';
for (const r of routes) {
  const seg = r.path.split('/').filter(Boolean)[0] || '(root)';
  md += `| \`${r.path}\` | \`${r.comp}\` | ${r.defLine || '-'} | ${r.routeLine} | ${groupTitle[seg] || '-'} |\n`;
}

fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs', 'routes.md'), md, 'utf8');


fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs', 'routes.md'), md, 'utf8');

// ---------- 接口 ----------
const report = JSON.parse(fs.readFileSync(path.join(root, 'tools', 'assets-report.json'), 'utf8'));
const externals = report.externalUrls.filter(
  (u) => !/(w3\.org|reactjs\.org|leafletjs\.com|developer\.mozilla\.org|github\.com\/orgs)/.test(u)
);

const buckets = [
  { name: '后端 / 数据（Supabase）', re: /supabase\.co/ },
  { name: '自建 Cloudflare Worker 接口（音乐 / 其他）', re: /workers\.dev/ },
  { name: '大模型 API', re: /(openai\.com|siliconflow|minimaxi|generativelanguage|api\.example\.com)/ },
  { name: '图片生成 / 头像', re: /(pollinations|dicebear|ui-avatars|placeholder)/ },
  { name: '音乐（QQ 音乐）', re: /(y\.qq\.com|gtimg\.cn)/ },
  { name: '字体', re: /fonts\.googleapis/ },
  { name: '外部素材（音效 / 贴图 / 地图瓦片 / 图床）', re: /(mixkit|transparenttextures|unsplash|upload\.wikimedia|basemaps\.cartocdn|unpkg|grainy-gradients)/ },
];

let ep = '# 前端硬编码的外部接口与资源\n\n';
ep += '> 来源：从 `index.pretty.js` / `index.pretty.css` 中提取的所有 URL 字面量。\n';
ep += '> `${...}` 表示运行时拼接的动态部分。\n\n';
const used = new Set();
for (const b of buckets) {
  const list = externals.filter((u) => b.re.test(u) && !used.has(u));
  if (!list.length) continue;
  list.forEach((u) => used.add(u));
  ep += `## ${b.name}\n\n`;
  for (const u of list) ep += `- \`${u.replace(/\|/g, '\\|')}\`\n`;
  ep += '\n';
}
const rest = externals.filter((u) => !used.has(u));
if (rest.length) {
  ep += '## 其他\n\n';
  for (const u of rest) ep += `- \`${u.replace(/\|/g, '\\|')}\`\n`;
  ep += '\n';
}
ep += '## 本地静态资源\n\n';
for (const a of report.localAssets) {
  if (!a.startsWith('/')) continue;
  const file = path.join(root, 'site-mirror', a.replace(/^\//, ''));
  const exists = fs.existsSync(file);
  ep += `- \`${a}\`${exists ? '' : '  ← 站点上不存在（返回首页 HTML）'}\n`;
}

fs.writeFileSync(path.join(root, 'docs', 'endpoints.md'), ep, 'utf8');

console.log(`routes: ${routes.length} -> docs/routes.md`);
console.log(`endpoints: ${externals.length} -> docs/endpoints.md`);
