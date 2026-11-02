# 路由表（从打包产物中提取）

> 来源：`src-readable/index.pretty.js` 末尾的路由定义（约 157,5xx 行起），共 **106** 条真实路由（`path` + `element` 成对出现）。
> 另有 5 处 `path:` 字符串是菜单项 / 游戏卡片的配置（`/accounting`、`/group-list`、`/mini-programs`、`/poker`、`/blackjack`），不属于路由。
> `组件` 是压缩后的变量名（原始组件名已不可恢复）；`组件定义行` 是该变量的定义位置，用编辑器 `Ctrl+G` 输入行号即可跳转。
> 中文功能归类是按路由名推断的，仅供参考。

## 分组统计

| 一级路径 | 路由数 | 推测功能 |
| --- | --- | --- |
| `chat` | 11 | 聊天（含记忆 / 天气 / 购物 / 转账等子页） |
| `instagram` | 10 | 类 Instagram 社交模块 |
| `forum` | 8 | 论坛 / 角色广场 |
| `decoration` | 5 | 界面装饰（聊天 CSS / 配色 / 音乐） |
| `wallet` | 4 | 钱包（卡包 / 交易 / 亲密付） |
| `ai-schedule` | 2 | AI 日程 |
| `group` | 2 | 群聊详情 / 设置 |
| `live` | 2 | 直播 / 电台 |
| `(root)` | 1 | 首页 |
| `add-api` | 1 | API 配置 |
| `admin` | 1 | 管理后台 |
| `ai-chat` | 1 | AI 聊天 |
| `ai-phone-select` | 1 | AI 角色选择 |
| `api-list` | 1 | API 列表 |
| `auth` | 1 | 登录 / 注册 |
| `avatar-library` | 1 | 头像库 |
| `background-customizer` | 1 | 背景自定义 |
| `bubble-editor` | 1 | 聊天气泡编辑 |
| `calendar` | 1 | 日历 |
| `character` | 1 | 角色详情 |
| `cloud-account` | 1 | 云账号 |
| `contacts` | 1 | 通讯录 |
| `couple-album` | 1 | 情侣相册 |
| `couple-anniversary` | 1 | 纪念日 |
| `couple-check-in` | 1 | 情侣打卡 |
| `couple-message-board` | 1 | 情侣留言板 |
| `couple-period` | 1 | 经期记录 |
| `couple-pet` | 1 | 情侣宠物 |
| `couple-space` | 1 | 情侣空间 |
| `couple-space-settings` | 1 | 情侣空间设置 |
| `create-character` | 1 | 创建角色 |
| `custom-prompt` | 1 | 自定义提示词 |
| `customize` | 1 | 个性化 |
| `data-manager` | 1 | 数据管理 |
| `discover` | 1 | 发现 |
| `edit-api` | 1 | 编辑 API |
| `edit-preset` | 1 | 编辑预设 |
| `edit-summary-api` | 1 | 编辑摘要 API |
| `edit-world-book` | 1 | 编辑世界书 |
| `emoji-management` | 1 | 表情管理 |
| `envelope` | 1 | 信封 |
| `favorites` | 1 | 收藏 |
| `font-customizer` | 1 | 字体自定义 |
| `game-list` | 1 | 小游戏列表 |
| `global-memory` | 1 | 全局记忆 |
| `global-memory-old` | 1 | - |
| `invite-admin` | 1 | 邀请管理 |
| `landlord` | 1 | 小游戏：斗地主 |
| `location-history` | 1 | 角色位置历史 |
| `map` | 1 | 地图 |
| `me` | 1 | 我的 |
| `meme-library` | 1 | 梗图库 |
| `moments` | 1 | 朋友圈 |
| `music-player` | 1 | 音乐播放器 |
| `music-search` | 1 | 音乐搜索 |
| `preset` | 1 | 预设列表 |
| `publish-moment` | 1 | 发布动态 |
| `role-swap` | 1 | 角色互换 |
| `role-swap-chat` | 1 | - |
| `screen-settings` | 1 | 屏幕设置 |
| `sound-customizer` | 1 | 音效自定义 |
| `statusbar-customize` | 1 | 状态栏自定义 |
| `switch-account` | 1 | 切换账号 |
| `theatre` | 1 | 剧场 |
| `upload-song` | 1 | 上传歌曲 |
| `user-profile` | 1 | 用户资料 |
| `voice-settings` | 1 | 语音设置 |
| `wechat` | 1 | 类微信聊天 |
| `werewolf` | 1 | 小游戏：狼人杀 |
| `world-book` | 1 | 世界书 |

## 路由 → 组件 对照表

| 路由 | 组件 | 组件定义行 | 路由定义行 | 推测功能 |
| --- | --- | --- | --- | --- |
| `/` | `_$` | - | 157599 | 首页 |
| `/add-api` | `T7` | 27701 | 157620 | API 配置 |
| `/admin` | `Vq` | 151071 | 157707 | 管理后台 |
| `/ai-chat` | `WV` | 143046 | 157698 | AI 聊天 |
| `/ai-phone-select` | `fV` | 136641 | 157688 | AI 角色选择 |
| `/ai-schedule` | `lq` | 145846 | 157700 | AI 日程 |
| `/ai-schedule/:characterId` | `iq` | 145485 | 157701 | AI 日程 |
| `/api-list` | `S7` | 27110 | 157619 | API 列表 |
| `/auth` | `Wq` | 150825 | 157706 | 登录 / 注册 |
| `/avatar-library` | `uq` | 146965 | 157703 | 头像库 |
| `/background-customizer` | `QU` | 101613 | 157656 | 背景自定义 |
| `/bubble-editor` | `SV` | 140303 | 157691 | 聊天气泡编辑 |
| `/calendar` | `ZV` | 144338 | 157694 | 日历 |
| `/character/:id` | `N7` | 26649 | 157618 | 角色详情 |
| `/chat/:chatId/transfer/:messageId` | `Iq` | 149889 | 157629 | 聊天（含记忆 / 天气 / 购物 / 转账等子页） |
| `/chat/:id` | `hF` | 73955 | 157623 | 聊天（含记忆 / 天气 / 购物 / 转账等子页） |
| `/chat/:id/history` | `Cq` | 149426 | 157628 | 聊天（含记忆 / 天气 / 购物 / 转账等子页） |
| `/chat/:id/memory-summary` | `PF` | 83482 | 157627 | 聊天（含记忆 / 天气 / 购物 / 转账等子页） |
| `/chat/:id/memory-viewer` | `zF` | 83779 | 157626 | 聊天（含记忆 / 天气 / 购物 / 转账等子页） |
| `/chat/:id/offline` | `MF` | 79798 | 157624 | 聊天（含记忆 / 天气 / 购物 / 转账等子页） |
| `/chat/:id/payment-request` | `qW` | 129530 | 157685 | 聊天（含记忆 / 天气 / 购物 / 转账等子页） |
| `/chat/:id/settings` | `$F` | - | 157625 | 聊天（含记忆 / 天气 / 购物 / 转账等子页） |
| `/chat/:id/shopping` | `KW` | 130282 | 157686 | 聊天（含记忆 / 天气 / 购物 / 转账等子页） |
| `/chat/:id/shopping/cart` | `JW` | 130960 | 157687 | 聊天（含记忆 / 天气 / 购物 / 转账等子页） |
| `/chat/:id/weather` | `Nq` | 148769 | 157704 | 聊天（含记忆 / 天气 / 购物 / 转账等子页） |
| `/cloud-account` | `qq` | 151460 | 157708 | 云账号 |
| `/contacts` | `e7` | 24088 | 157604 | 通讯录 |
| `/couple-album` | `HF` | 85244 | 157631 | 情侣相册 |
| `/couple-anniversary` | `WF` | 85539 | 157632 | 纪念日 |
| `/couple-check-in` | `ZF` | 88404 | 157635 | 情侣打卡 |
| `/couple-message-board` | `VF` | 85814 | 157633 | 情侣留言板 |
| `/couple-period` | `GF` | 86533 | 157636 | 经期记录 |
| `/couple-pet` | `JF` | 87124 | 157634 | 情侣宠物 |
| `/couple-space` | `FF` | 85054 | 157630 | 情侣空间 |
| `/couple-space-settings` | `XF` | 88731 | 157637 | 情侣空间设置 |
| `/create-character` | `j7` | 26221 | 157617 | 创建角色 |
| `/custom-prompt` | `Gq` | 151976 | 157709 | 自定义提示词 |
| `/customize` | `PU` | 98821 | 157652 | 个性化 |
| `/data-manager` | `qU` | 99688 | 157653 | 数据管理 |
| `/decoration` | `EU` | 95880 | 157647 | 界面装饰（聊天 CSS / 配色 / 音乐） |
| `/decoration/chat-css` | `$U` | - | 157651 | 界面装饰（聊天 CSS / 配色 / 音乐） |
| `/decoration/colors` | `LU` | 98414 | 157650 | 界面装饰（聊天 CSS / 配色 / 音乐） |
| `/decoration/global` | `AU` | 96353 | 157649 | 界面装饰（聊天 CSS / 配色 / 音乐） |
| `/decoration/music` | `MU` | 95442 | 157648 | 界面装饰（聊天 CSS / 配色 / 音乐） |
| `/discover` | `t7` | 24302 | 157605 | 发现 |
| `/edit-api/:id` | `M7` | 28115 | 157621 | 编辑 API |
| `/edit-preset/:id` | `JH` | 110910 | 157664 | 编辑预设 |
| `/edit-summary-api` | `E7` | 28566 | 157622 | 编辑摘要 API |
| `/edit-world-book/:id` | `VH` | 109776 | 157662 | 编辑世界书 |
| `/emoji-management` | `fU` | 92855 | 157643 | 表情管理 |
| `/envelope` | `Eq` | 150158 | 157705 | 信封 |
| `/favorites` | `eU` | 89531 | 157639 | 收藏 |
| `/font-customizer` | `XU` | 101203 | 157655 | 字体自定义 |
| `/forum` | `lW` | 111868 | 157665 | 论坛 / 角色广场 |
| `/forum/character/:characterId` | `uW` | 112648 | 157668 | 论坛 / 角色广场 |
| `/forum/messages` | `hW` | 113268 | 157670 | 论坛 / 角色广场 |
| `/forum/moment/:momentId` | `mW` | 112964 | 157669 | 论坛 / 角色广场 |
| `/forum/post/:id` | `cW` | 112085 | 157666 | 论坛 / 角色广场 |
| `/forum/profile` | `dW` | 112449 | 157667 | 论坛 / 角色广场 |
| `/forum/topic/:name` | `bW` | 113947 | 157672 | 论坛 / 角色广场 |
| `/forum/topics` | `vW` | 113673 | 157671 | 论坛 / 角色广场 |
| `/game-list` | `IV` | 141309 | 157693 | 小游戏列表 |
| `/global-memory` | `kV` | 138479 | 157689 | 全局记忆 |
| `/global-memory-old` | `NV` | 137723 | 157690 | - |
| `/group/:id` | `DH` | 106160 | 157611 | 群聊详情 / 设置 |
| `/group/:id/settings` | `RH` | 107966 | 157612 | 群聊详情 / 设置 |
| `/instagram` | `kW` | 114771 | 157673 | 类 Instagram 社交模块 |
| `/instagram/activity` | `MW` | 117373 | 157677 | 类 Instagram 社交模块 |
| `/instagram/create` | `EW` | 117801 | 157678 | 类 Instagram 社交模块 |
| `/instagram/dm/:npcId` | `$W` | - | 157680 | 类 Instagram 社交模块 |
| `/instagram/post/:postId` | `AW` | 118589 | 157679 | 类 Instagram 社交模块 |
| `/instagram/profile` | `uj` | 115716 | 157674 | 类 Instagram 社交模块 |
| `/instagram/search` | `IW` | 116404 | 157676 | 类 Instagram 社交模块 |
| `/instagram/settings` | `uO` | 53085 | 157681 | 类 Instagram 社交模块 |
| `/instagram/topic/:topicName` | `zW` | 120348 | 157682 | 类 Instagram 社交模块 |
| `/instagram/user/:userId` | `uj` | 115716 | 157675 | 类 Instagram 社交模块 |
| `/invite-admin` | `Tj` | 152639 | 157710 | 邀请管理 |
| `/landlord` | `OV` | 142151 | 157697 | 小游戏：斗地主 |
| `/live` | `gG` | 154476 | 157609 | 直播 / 电台 |
| `/live/:id` | `vG` | 154903 | 157610 | 直播 / 电台 |
| `/location-history/:characterId` | `WW` | 129272 | 157684 | 角色位置历史 |
| `/map` | `HW` | 128871 | 157683 | 地图 |
| `/me` | `s7` | 24569 | 157606 | 我的 |
| `/meme-library` | `dq` | 146357 | 157702 | 梗图库 |
| `/moments` | `iU` | 90719 | 157613 | 朋友圈 |
| `/music-player` | `jU` | 93438 | 157644 | 音乐播放器 |
| `/music-search` | `IU` | 94589 | 157645 | 音乐搜索 |
| `/preset` | `KH` | 110565 | 157663 | 预设列表 |
| `/publish-moment` | `lU` | 91578 | 157614 | 发布动态 |
| `/role-swap` | `QV` | 144632 | 157695 | 角色互换 |
| `/role-swap-chat/:id` | `sq` | 144796 | 157696 | - |
| `/screen-settings` | `cq` | 146025 | 157660 | 屏幕设置 |
| `/sound-customizer` | `eH` | 102152 | 157657 | 音效自定义 |
| `/statusbar-customize` | `GU` | 100750 | 157654 | 状态栏自定义 |
| `/switch-account` | `mq` | 147673 | 157616 | 切换账号 |
| `/theatre` | `CV` | 140627 | 157692 | 剧场 |
| `/upload-song` | `TU` | 95025 | 157646 | 上传歌曲 |
| `/user-profile` | `gU` | 92999 | 157615 | 用户资料 |
| `/voice-settings` | `OH` | 109000 | 157659 | 语音设置 |
| `/wallet` | `QF` | 89344 | 157638 | 钱包（卡包 / 交易 / 亲密付） |
| `/wallet/cards` | `sU` | 90064 | 157641 | 钱包（卡包 / 交易 / 亲密付） |
| `/wallet/intimate-pay/:characterId` | `nU` | 90273 | 157642 | 钱包（卡包 / 交易 / 亲密付） |
| `/wallet/transactions` | `tU` | 89913 | 157640 | 钱包（卡包 / 交易 / 亲密付） |
| `/wechat` | `Q$` | - | 157603 | 类微信聊天 |
| `/werewolf` | `YV` | 143400 | 157699 | 小游戏：狼人杀 |
| `/world-book` | `WH` | 109455 | 157661 | 世界书 |
