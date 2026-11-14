/* eslint-disable max-len */
// 右上角小提示（GameUI.notify.*）。key 与调用处 t("key", "English") 对应。
export const zhNotify = {
  // ---------------------------------------------------------------- 成就
  "notify.achievement.autoUnlocked": "已自动解锁：{0}",
  "notify.achievement.unlocked": "成就：{0}",
  "notify.achievement.secretUnlocked": "隐藏成就：{0}",

  // ---------------------------------------------------------------- 存档读取 / 保存 / 云存档
  "notify.save.loaded": "游戏已读取",
  "notify.save.imported": "游戏已导入",
  "notify.save.saved": "游戏已保存",
  "notify.save.exported": "已将当前存档导出到剪贴板",
  "notify.save.downloaded": "已成功将当前存档下载到电脑",
  "notify.save.backupsDownloaded": "已成功将存档备份下载到电脑",
  "notify.save.backupsImported": "已成功从文件导入存档备份",
  "notify.cloud.loggedIn": "已成功登录 Google 账号",
  "notify.cloud.loggedInAs": "已成功登录为 {0}",
  "notify.cloud.loginFailed": "Google 账号登录失败",
  "notify.cloud.savedAsUser": "游戏已保存到云存档（槽位 {0}），用户 {1}",
  "notify.cloud.saved": "游戏已保存到云存档（槽位 {0}）",
  "notify.cloud.noSave": "当前 Google 账号没有云存档",
  "notify.cloud.noSaveForUser": "用户 {0} 没有云存档",
  "notify.cloud.loaded": "云存档已读取",
  "notify.cloud.slotLoaded": "云存档已读取（槽位 {0}）",
  "notify.cloud.slotLoadedForUser": "已为用户 {1} 读取云存档（槽位 {0}）",

  // ---------------------------------------------------------------- 快捷键
  "notify.hotkey.timeStudyRespec": "时间研究重置：{0}",
  "notify.hotkey.glyphRespec": "符文重置：{0}",
  "notify.hotkey.active": "已开启",
  "notify.hotkey.inactive": "已停用",
  "notify.hotkey.payingRespects": "致敬",
  "notify.hotkey.continuumLocked": "连续体已启用，无法修改此自动购买器",
  "notify.hotkey.autobuyerToggled": "{0}自动购买器已{1}",
  "notify.hotkey.on": "开启",
  "notify.hotkey.off": "关闭",
  "notify.hotkey.autobuyerBuySingles": "{0}自动购买器已设为购买单个",
  "notify.hotkey.autobuyerBuyBulk": "{0}自动购买器已设为{1}",
  "notify.hotkey.bulkMax": "拉满",
  "notify.hotkey.bulkAmount": "一次购买 {0} 个",
  "notify.hotkey.autobuyersToggled": "自动购买器{0}",
  "notify.hotkey.resumed": "已恢复",
  "notify.hotkey.paused": "已暂停",
  "notify.hotkey.continuumToggled": "{0}连续体",
  "notify.hotkey.enabled": "已启用",
  "notify.hotkey.disabled": "已停用",

  // ---------------------------------------------------------------- 自动机
  "notify.automator.custom": "自动机：{0}",
  "notify.automator.imported": "已导入脚本「{0}」",
  "notify.automator.halted": "自动机已停止：检测到过多连续的空操作",
  "notify.automator.startingScript": "正在启动脚本「{0}」",
  "notify.automator.cannotStart": "无法启动脚本「{0}」（存在错误）",
  "notify.automator.scriptAtLine": "{0}脚本「{1}」，第 {2} 行",
  "notify.automator.script": "{0}脚本「{1}」",
  "notify.automator.resuming": "继续运行",
  "notify.automator.pausing": "暂停",
  "notify.automator.restarting": "重新启动",
  "notify.automator.starting": "启动",

  // ---------------------------------------------------------------- 商店 / 支付
  "notify.shop.stdsObtained": "已获得 {0} 个 STD！",
  "notify.shop.cosmeticSetPurchased": "已购买符文外观套装「{0}」！",
  "notify.shop.allCosmeticSets": "已解锁全部符文外观套装！",
  "notify.shop.syncFailed": "无法同步 STD 购买记录！",
  "notify.shop.stdsLoaded": "STD 购买记录已成功读取！",
  "notify.shop.noRespec": "你没有可用的重置机会",
  "notify.shop.respecFailed": "无法重置 STD 购买记录！",
  "notify.shop.respecSuccess": "STD 购买记录重置成功！",
  "notify.shop.noPurchasesToRespec": "没有可重置的购买记录！",
  "notify.payment.contactFailed": "无法连接支付服务器！",
  "notify.payment.purchaseSuccess": "已成功购买 {0} 个 STD，感谢你的支持！❤️",
  "notify.payment.purchaseFailed": "购买失败！",
  "notify.payment.spendFailed": "无法使用 STD 币购买此升级！",
  "notify.payment.coinsSpent": "已成功花费 {0} 个 STD 币",
  "notify.payment.upgradeFailed": "无法购买升级",
  "notify.payment.timeout": "购买处理超时！",

  // ---------------------------------------------------------------- Steam
  "notify.steam.zoomMax": "缩放级别已调到最大",
  "notify.steam.zoomMin": "缩放级别已调到最小",
  "notify.steam.sizeChanged": "界面大小已调整为 {0}%",
  "notify.steam.shopUnavailable": "商店购买不可用。",
  "notify.steam.playfabLoggedIn": "已登录 PlayFab 云存档",
  "notify.steam.playfabLoginFailed": "无法登录 PlayFab 云存档。",

  // ---------------------------------------------------------------- 升级 / 主题 / 选项
  "notify.reality.upgradeUnlocked": "已解锁现实升级：{0}",
  "notify.imaginary.upgradeUnlocked": "已解锁幻想升级：{0}",
  "notify.theme.unlocked": "已解锁 {0} 主题！",
  "notify.option.completeGameFirst": "请先完成一次游戏！",

  // ---------------------------------------------------------------- 挑战 / 符文
  "notify.challenge.icUnlocked": "已解锁无限挑战 {0}",
  "notify.challenge.noSecondDimensionPath": "你还没有选择第二条偏好维度路径。",
  "notify.challenge.noDimensionPath": "你还没有选择偏好维度路径。",
  "notify.challenge.noPacePath": "你还没有选择偏好节奏路径。",
  "notify.glyph.cosmeticSetUnlocked": "已解锁符文外观套装「{0}」！",
  "notify.glyph.cursedMax": "你不需要超过 {0} 个诅咒符文！",
  "notify.glyph.cursedCreated": "已创建诅咒符文",
  "notify.glyph.couldNotLoad": "无法从 {1} 中找到或装备 {0}。",
  "notify.glyph.setLoaded": "已成功加载 {0}。",
  "notify.glyph.filterCopied": "筛选设置已复制到剪贴板",

  // ---------------------------------------------------------------- 时间研究
  "notify.timeStudy.presetSaved": "{0}已保存到槽位 {1}",
  "notify.timeStudy.presetLoaded": "{0}已从槽位 {1} 加载",
  "notify.timeStudy.presetExported": "{0}已从槽位 {1} 导出到剪贴板",
  "notify.timeStudy.emptyTree": "无法导出空的时间研究树！",
  "notify.timeStudy.exported": "已将当前时间研究导出到剪贴板",

  // ---------------------------------------------------------------- 黑洞
  "notify.blackHole.toggled": "{0}已{1}",
  "notify.blackHole.toggledAutomatically": "{0}已自动{1}",
  "notify.blackHole.singular": "黑洞",
  "notify.blackHole.plural": "黑洞",
  "notify.blackHole.paused": "暂停",
  "notify.blackHole.inverted": "反转",
  "notify.blackHole.unpaused": "恢复运行",

  // ---------------------------------------------------------------- 天界
  "notify.celestial.enslavedNoBlackHoles": "此现实中禁止使用黑洞！（自动机已停止）",
  "notify.celestial.enslavedCrack": "你发现了无名者现实中的一道裂缝！",
  "notify.celestial.vAchievementUnlocked": "已解锁 V 成就「{0}」层级 {1}",
  "notify.celestial.vUnlocked": "已解锁 V，成就天界！",
  "notify.celestial.pelleStrike": "你遭遇了佩勒打击：{0}",
  "notify.celestial.singularityMilestone": "你达成了一个奇点里程碑！",
  "notify.celestial.singularityMilestones": "你达成了 {0} 个奇点里程碑！",
  "notify.celestial.musicGlyphInventoryFull": "你的符文背包没有空位！",
  "notify.celestial.musicGlyphCreated": "已创建音乐符文",
  "notify.celestial.musicGlyphsCreated": "已创建 {0}",
  "notify.celestial.riftLimit": "同时最多只能激活 2 个裂隙！",

  // ---------------------------------------------------------------- 速通
  "notify.speedrun.milestone": "已达成速通里程碑：{0}",
};
