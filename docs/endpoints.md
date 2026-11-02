# 前端硬编码的外部接口与资源

> 来源：从 `index.pretty.js` / `index.pretty.css` 中提取的所有 URL 字面量。
> `${...}` 表示运行时拼接的动态部分。

## 后端 / 数据（Supabase）

- `https://noqdevkhrchrnwgqlpxq.supabase.co`

## 自建 Cloudflare Worker 接口（音乐 / 其他）

- `https://douzhi.2373922440.workers.dev`
- `https://zhizhi-api.2373922440jhj.workers.dev/api/music/search`
- `https://zhizhi-api.2373922440jhj.workers.dev/api/music/url`
- `https://zhizhi-api.2373922440jhj.workers.dev/song/lyric`

## 大模型 API

- `https://api.example.com/v1`
- `https://api.minimaxi.com/v1`
- `https://api.openai.com/v1`
- `https://api.siliconflow.cn/v1`
- `https://generativelanguage.googleapis.com/v1beta`
- `https://platform.minimaxi.com`

## 图片生成 / 头像

- `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random(`
- `https://api.dicebear.com/7.x/avataaars/svg?seed=${Q}`
- `https://api.dicebear.com/7.x/avataaars/svg?seed=${me.id}`
- `https://api.dicebear.com/7.x/avataaars/svg?seed=god`
- `https://api.dicebear.com/7.x/avataaars/svg?seed=lady`
- `https://api.dicebear.com/7.x/avataaars/svg?seed=user`
- `https://api.dicebear.com/7.x/avataaars/svg?seed=wang`
- `https://image.pollinations.ai/prompt/${encodeURIComponent(S`
- `https://image.pollinations.ai/prompt/${encodeURIComponent(q.imagePrompt.trim(`
- `https://image.pollinations.ai/prompt/{英文关键词}`
- `https://ui-avatars.com/api/?name=${$e\|\|`
- `https://ui-avatars.com/api/?name=${F}&background=random&color=fff&size=100`
- `https://ui-avatars.com/api/?name=${M}&background=d95959&color=fff&size=100`
- `https://ui-avatars.com/api/?name=${re.name}&background=random&color=fff`
- `https://ui-avatars.com/api/?name=${we}&background=random&color=fff`
- `https://via.placeholder.com/60`
- `https://via.placeholder.com/80`

## 音乐（QQ 音乐）

- `https://c.y.qq.com/soso/fcgi-bin/client_search_cp`
- `https://y.gtimg.cn/music/photo_new/T002R300x300M000${d.albummid}.jpg`

## 字体

- `https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500&display=swap`
- `https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap`

## 外部素材（音效 / 贴图 / 地图瓦片 / 图床）

- `https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3`
- `https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3`
- `https://assets.mixkit.co/active_storage/sfx/2356/2356-preview.mp3`
- `https://assets.mixkit.co/active_storage/sfx/2357/2357-preview.mp3`
- `https://assets.mixkit.co/active_storage/sfx/2577/2577-preview.mp3`
- `https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3`
- `https://grainy-gradients.vercel.app/noise.svg`
- `https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=600&q=80`
- `https://images.unsplash.com/photo-1621574539436-4b82935d27df?q=80&w=2670&auto=format&fit=crop`
- `https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png`
- `https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png`
- `https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png`
- `https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Moments_icon.svg/1024px-Moments_icon.svg.png`
- `https://www.transparenttextures.com/patterns/cardboard-flat.png`
- `https://www.transparenttextures.com/patterns/cream-paper.png`
- `https://www.transparenttextures.com/patterns/stardust.png`
- `https://www.transparenttextures.com/patterns/wood-pattern.png`
- `https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png`

## 其他

- `http://localhost:9999`
- `https://example.com/1.jpg`
- `https://example.com/angry.jpg`
- `https://example.com/happy.jpg`
- `https://example.com/sad.jpg`
- `https://ws.stream.qqmusic.qq.com/C400${typeof`
- `https://zhihu.com/question/xxx\|\|\|昨晚23:11\|\|\|职场老司机分享了5个谈薪技巧，最重要的是先做好业绩对比表用数据说话`

## 本地静态资源

- `/apple-touch-icon.png`
- `/assets/photo-placeholder-B_NHJ1Xw.webp`
- `/default-avatar.png`  ← 站点上不存在（返回首页 HTML）
- `/favicon-16x16.png`
- `/favicon.ico`  ← 站点上不存在（返回首页 HTML）
- `/favicon.png`
- `/icon-192.png`
- `/icon-512.png`
- `/manifest.json`
- `/moods/伤心.png`
- `/moods/平静.png`
- `/moods/开心.png`
- `/moods/心动.png`
- `/moods/无语尴尬.png`
- `/moods/生气.png`
