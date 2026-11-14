/* eslint-disable max-len */
// 弹窗文案（prestige 分组）。key 与组件里 t("key", "English") 对应。
export const zhModalPrestige = {
  // ---------------------------------------------------------------- 维度献祭
  "pres.sacrifice.header": "维度献祭",
  "pres.sacrifice.rewardOnly": "维度献祭会根据你在献祭时拥有的第 1 反物质维度数量，提升第 8 反物质维度的产量。",
  "pres.sacrifice.message": "维度献祭会清空你所有的第 1 至第 7 反物质维度（费用与倍率保持不变），并根据献祭的第 1 反物质维度总量提升第 8 反物质维度。你需要一段时间才能恢复产量。",
  "pres.sacrifice.multiplier": "当前倍率为 {0}，维度献祭后将提升至 {1}。",

  // ---------------------------------------------------------------- 突破无限
  "pres.breakInfinity.header": "你即将突破无限",
  "pres.breakInfinity.confirm": "突破",
  "pres.breakInfinity.intro": "突破无限后，你可以获得超过 {0} 的反物质。",
  "pres.breakInfinity.introRead": "突破无限后，你可以获得超过 {0} 的反物质，并且可以查看超过 {0} 的数字。",
  "pres.breakInfinity.scaling": "超过 {0} 反物质后，维度与加速升级的费用增长速度会加快。",
  "pres.breakInfinity.ip": "大坍缩时，你会根据超过 {0} 的反物质产量获得额外的无限点数。",
  "pres.breakInfinity.upgrades": "它还会解锁突破无限升级，并将所有普通挑战自动购买器升到满级。",

  // ---------------------------------------------------------------- 反物质星系
  "pres.ag.bulkHeader": "你即将购买 {0}",
  "pres.ag.header": "你即将购买一个反物质星系",
  "pres.ag.res.antimatter": "反物质",
  "pres.ag.res.dimensions": "反物质维度",
  "pres.ag.res.tickspeed": "加速升级",
  "pres.ag.res.dimBoosts": "维度提升",
  "pres.ag.infinityChallenge": "无限挑战 {0}",
  "pres.ag.raReality": "{0}的现实",
  "pres.ag.tickspeedBoost": "你将获得少量加速升级加成。",
  "pres.ag.tickspeedNoBoost": "因为你正处于{0}，所以不会获得加速升级加成。",
  "pres.ag.resetNothing": "本次购买不会重置任何内容，并且{0}",
  "pres.ag.resetList": "本次购买会重置你的{0}。不过，{1}",
  "pres.ag.confirmBulk": "确定要购买 {0} 吗？{1}",
  "pres.ag.confirmSingle": "确定要购买一个反物质星系吗？{0}",

  // ---------------------------------------------------------------- 维度提升
  "pres.dimboost.header": "你即将进行一次维度提升重置",
  "pres.dimboost.keep": "由于你拥有某项升级，在此情况下反物质与反物质维度不会被重置，所以实际上什么都不会重置。你仍会照常获得提升带来的倍率加成。",
  "pres.dimboost.reset": "重置你的反物质与反物质维度。确定要这样做吗？",
  "pres.dimboost.message": "这将{0}",

  // ---------------------------------------------------------------- 复制人星系
  "pres.replicantiGalaxy.header": "你即将购买 {0}",
  "pres.replicantiGalaxy.divide": "每购买一个复制人星系，就将你的复制人除以 {0}（从 {1} 变为 {2}）",
  "pres.replicantiGalaxy.reset": "将你的复制人重置为 {0}",
  "pres.replicantiGalaxy.message": "复制人星系会像反物质星系一样提升加速效果。不过，它既不会提高反物质星系的费用，也不受专门针对反物质星系的倍率影响。它会{0}。",

  // ---------------------------------------------------------------- 末日
  "pres.armageddon.headerDoom": "你即将使你的现实陷入毁灭",
  "pres.armageddon.headerReset": "你即将进行一次末日重置",
  "pres.armageddon.firstReset": "它将产出每秒 {0} 现实碎片",
  "pres.armageddon.nextReset": "它将把你的现实碎片产出从每秒 {0} 提升到每秒 {1}",
  "pres.armageddon.message": "末日会开启一个新的毁灭现实。你将获得 {0}，{1}。",
  "pres.armageddon.doomWarning": "使你的现实陷入毁灭会重置除挑战记录、天界进度以及统计标签页中「通用」与「现实」栏目之外的所有内容。你在当前现实中的进度不会为你带来任何奖励。使你的现实陷入毁灭还会清除你大部分未受保护的符文，并禁用部分游戏机制。",
  "pres.armageddon.areYouSure": "确定要这样做吗？",

  // ---------------------------------------------------------------- 天界
  "pres.celestials.header": "{0} 现实",
  "pres.celestials.message": "进行一次现实重置并进入{0}现实，其中：",
  "pres.celestials.teresaNoReward": "你还没有解锁特蕾莎现实的奖励。解锁该奖励需要购买现实研究并首次完成该现实。",
  "pres.celestials.teresaBest": "你特蕾莎现实的最高完成成绩为 {0} 反物质，这为你带来了 {1} 的符文献祭强度倍率。",
  "pres.celestials.effarigDone": "埃法里格已完成！",
  "pres.celestials.effarigLayer": "你当前处于{0}层。",
  "pres.celestials.enslavedDone": "我们……是不是……帮得还不够……",
  "pres.celestials.enslavedHelp": "我们……能帮忙……让我们……来帮忙……",
  "pres.celestials.raChunks": "在拉现实中，某些资源会根据自身数量为天界记忆产出记忆碎片：",
  "pres.celestials.laitelaIncomplete": "你还没有在该层级完成莱特拉。",
  "pres.celestials.laitelaFastest": "你在该层级的最快完成时间为 {0}。",
  "pres.celestials.confirm": "开始",
  "pres.layer.Infinity": "无限",
  "pres.layer.Eternity": "永恒",
  "pres.layer.Reality": "现实",

  // ---------------------------------------------------------------- 拉的天界宠物
  "pres.raPet.allMemories": "已重新获得所有记忆",
  "pres.raPet.memoryChunks": "获得记忆碎片，数量取决于{0}",

  // ---------------------------------------------------------------- 进入时间膨胀
  "pres.enterDilation.header": "你即将进入时间膨胀",
  "pres.enterDilation.message": "膨胀时间会开启一次新的永恒，所有维度倍率与加速倍率的指数都会降低至 {0}。如果你能在膨胀状态下完成永恒，你的超光速粒子数量会根据你最高的反物质数量以及你拥有的各种超光速粒子倍率增加。",
  "pres.enterDilation.first": "这是你第一次进行时间膨胀",
  "pres.enterDilation.maxTP": "由于特蕾莎的 {0} 级奖励，你已经达到了当前可获得的超光速粒子上限。",
  "pres.enterDilation.lastEP": "你上次完成时间膨胀时的永恒点数为 {0}。",
  "pres.enterDilation.confirm": "进入",

  // ---------------------------------------------------------------- 永恒
  "pres.eternity.header": "你即将进行永恒",
  "pres.eternity.ecHeader": "完成永恒挑战",
  "pres.eternity.message": "永恒会重置除成就、挑战记录以及统计标签页中「通用」栏目之外的所有内容。",
  "pres.eternity.messageFirst": "永恒会重置除成就、挑战记录以及统计标签页中「通用」栏目之外的所有内容。你还会获得 1 点永恒点数，并解锁多种升级。",
  "pres.eternity.gained": "永恒时你将获得 {0} 以及 {1}。",
  "pres.eternity.startIP": "你将以 {0} 开始下一次永恒。",
  "pres.eternity.ecComplete": "永恒挑战 {0} 已经全部完成。",
  "pres.eternity.ecGain": "你将获得永恒挑战 {0} 的一次完成。",
  "pres.eternity.ecCompletions": "你将获得永恒挑战 {1} 的 {0}。",

  // ---------------------------------------------------------------- 退出挑战
  "pres.exitChallenge.headerRestart": "你即将重新开始{0}",
  "pres.exitChallenge.headerExit": "你即将退出{0}",
  "pres.exitChallenge.restartBody": "确认此弹窗后，你将立即再次进入{0}。",
  "pres.exitChallenge.exitBody": "这会使你回到没有任何限制的普通{0}。",
  "pres.exitChallenge.higherLayers": "来自更高层限制的其他效果仍会继续生效。",
  "pres.exitChallenge.confirmRestart": "重新开始",
  "pres.exitChallenge.confirmExit": "退出",

  // ---------------------------------------------------------------- 退出时间膨胀
  "pres.exitDilation.header": "你即将退出时间膨胀",
  "pres.exitDilation.doomedHeader": "在毁灭状态下无法退出时间膨胀",
  "pres.exitDilation.body": "如果你现在退出时间膨胀，你将{0}。",
  "pres.exitDilation.doomedBody": "膨胀是永久性的。你将{0}，并重置你当前的永恒。",
  "pres.exitDilation.ecExit": "你还会同时退出当前的永恒挑战。",
  "pres.exitDilation.areYouSure": "确定要继续吗？",
  "pres.exitDilation.noGain": "无法获得任何东西",
  "pres.exitDilation.gain": "获得{0}",
  "pres.exitDilation.confirmOkay": "好",
  "pres.exitDilation.confirmExit": "退出",

  // ---------------------------------------------------------------- 硬重置
  "pres.hardReset.header": "硬重置",
  "pres.hardReset.request": "请确认你要硬重置此存档槽。",
  "pres.hardReset.noSecret": "删除存档不会解锁任何秘密内容。",
  "pres.hardReset.typePhrase": "输入“Shrek is love, Shrek is life”以确认。",
  "pres.hardReset.wipe": "这将清空你的存档。",
  "pres.hardReset.wipeCosmetics": "这还会移除你通过通关游戏解锁的所有符文外观！",
  "pres.hardReset.wipeSpeedrun": "你将失去进行速通的能力。若要重新开始速通，请改用「开始速通」按钮。",
  "pres.hardReset.confirmed": "短语已确认——继续将永久删除你的存档！",
  "pres.hardReset.typeCorrect": "输入正确的短语以进行硬重置。",

  // ---------------------------------------------------------------- 现实
  "pres.reality.header": "你即将进行现实",
  "pres.reality.firstReality": "现实会重置除挑战记录以及统计标签页中「通用」栏目之外的所有内容。前 {0} 行成就也会被重置，但每隔 {1} 你会自动恢复一个成就。你还会根据永恒点数获得现实机器，获得一个等级取决于你的永恒点数、复制人与膨胀时间的符文，以及 1 点可用于购买便利性升级的特权点，并解锁多种升级。",
  "pres.reality.warnNoChoice": "你目前每次现实只有单个新符文选项。你可以先取消此弹窗并购买 START 特权，以解锁从多个符文中进行选择的能力。",
  "pres.reality.warnFilter": "如果你不选择符文，系统会使用你的符文筛选器自动选择一个。",
  "pres.reality.warnSelect": "你必须选择一个符文才能继续。",
  "pres.reality.gained": "你将获得{0}",
  "pres.reality.levelStats": "你将在现实中获得一个 {0} 级符文，{1}。",
  "pres.reality.levelEqual": "与你的最好成绩相同",
  "pres.reality.levelHigher": "比你的最好成绩高 {1} 级",
  "pres.reality.levelLower": "比你的最好成绩低 {1} 级",
  "pres.reality.simulateLine1": "选择此符文后，游戏会模拟你剩余的现实，",
  "pres.reality.simulateLine2": "并根据你的符文筛选器设置自动选择另外 {0}。",
  "pres.reality.autoPurgeLine1": "自动清理当前处于启用状态；你选择的符文",
  "pres.reality.autoPurgeLine2": "在触发后可能不会出现在你的库存中。",
  "pres.reality.noSpaceMany": "你即将模拟的现实数量超过了你空闲的库存空间；这可能导致部分符文被献祭。",
  "pres.reality.noSpaceOne": "你没有任何空闲的库存空间——你选择的符文将被自动{0}！",
  "pres.reality.sacrificed": "献祭",
  "pres.reality.deleted": "删除",
  "pres.reality.shiftClick": "按住 Shift 点击现实按钮可以强制显示此弹窗（即使它已被禁用）。",
  "pres.reality.sacrificeButton": "献祭",

  // ---------------------------------------------------------------- 重置现实
  "pres.resetReality.armageddon": "末日",
  "pres.resetReality.reality": "现实",
  "pres.resetReality.header": "你即将重置你的{0}",
  "pres.resetReality.message": "这会将你重置到本次{0}的起点，且无法从当前{0}的进度中获得任何奖励。",
  "pres.resetReality.areYouSure": "确定要这样做吗？",
  "pres.resetReality.canReality": "你目前可以完整完成一次现实并获得其全部正常奖励，但如果你在此处重置，将无法获得这些奖励。要获取奖励，请使用「创造新现实」按钮。",
  "pres.resetReality.confirm": "重置",

  // ---------------------------------------------------------------- 大坍缩
  "pres.bigCrunch.header": "你即将进行无限",
  "pres.bigCrunch.message": "进行无限时，所有维度、维度提升与反物质星系都会被重置。{0}",
  "pres.bigCrunch.firstInfinityInfo": "作为回报，你会获得 1 点无限点数（IP），可以在「无限」标签页中购买多种升级。你还会获得 1 次无限，也就是统计标签页中显示的那项统计数据。",
  "pres.bigCrunch.ipGain": "你将获得 {0} 以及 {1}。",
  "pres.bigCrunch.startingResources": "你将以{0}开始下一次无限。",
  "pres.bigCrunch.animationNote": "每次手动触发无限后都会播放此动画。如果你希望关闭它，可以在设置标签页中找到相应选项。游戏中任何视觉动画效果在首次观看后都可以这样关闭。",
};
