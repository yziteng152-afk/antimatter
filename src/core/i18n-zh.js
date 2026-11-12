/* eslint-disable max-len */
// Chinese (Simplified) dictionary.

import { zhModals } from "./i18n-zh-modals";
import { zhModals2 } from "./i18n-zh-modals2";
import { zhStats } from "./i18n-zh-stats";
//
// Rules for this file:
//   1. Only DISPLAY text lives here. Never translate values that the game uses as identifiers,
//      comparisons, save data or CSS classes (tab names, subtab names, h2p entry names, etc.).
//   2. Every entry is looked up by key and falls back to the English literal in the component,
//      so a missing key here is harmless.
//   3. Placeholders are {0}, {1}, ... and are substituted by t().

const h2pEntries = {
  "This Modal": {
    title: "本页面",
    body: `
欢迎来到「游戏说明」！
<br>
<br>
本窗口包含游戏过程中会遇到的各项机制的详细解释与补充信息。随着你解锁新的功能与机制，这里也会开放更多页面。
如果你对某个机制感到困惑，通常能在相关条目里找到解释。
<br>
<br>
目前，打开「游戏说明」时总是从本页开始。在你完成第一次维度提升之后，打开此窗口会直接定位到与你当前所在标签页最相关的条目（如果存在的话）。
`,
  },
  "Your savefile": {
    title: "你的存档",
    body: `
在浏览器中游玩时，游戏存档保存在浏览器的本地存储里；在 Steam 上游玩时则保存在 Steam 安装目录中。
这意味着清除浏览器缓存或 Cookie、或者卸载 Steam 上的游戏，都会一并删除你的存档。
同理，在无痕/隐私窗口中游玩，下次打开浏览器时存档不会保留。存档也是与浏览器绑定的：例如你在 Chrome 上玩，就不能在 Firefox 上找到它。
网页版与 Steam 版的存档同样完全独立。
<br>
<br>
你可以通过「导出」功能在设备之间转移存档，它会把一长串看似随机的字符复制到剪贴板。这段文本就是你的存档数据，把它粘贴到导入框里即可读取。
导入时必须提供完整的存档文本，否则游戏可能无法识别。某些聊天软件在传输时可能会截断文本。
<br>
<br>
Reality 更新之后生成的合法存档字符串，以
<b>AntimatterDimensionsSavefileFormat</b> 开头，以 <b>EndOfSavefile</b> 结尾。
如果你导入的是 Reality 更新之前的老存档，它通常会以 <b>eyJ</b> 开头。
`,
  },
  "Common Abbreviations": {
    title: "常用缩写",
    body: `
为了节省空间，游戏中的许多资源会以缩写形式显示。随着你首次遇到新的资源，本条目会自动补充对应的缩写。
<br>
- <b>AM</b>：反物质<br>
- <b>AD</b>：反物质维度<br>
- <b>AG</b>：反物质星系<br>
- <b>IP</b>：无限点数<br>
- <b>NC</b>：普通挑战<br>
- <b>IC</b>：无限挑战<br>
- <b>ID</b>：无限维度<br>
- <b>RG</b>：复制人星系<br>
- <b>EP</b>：永恒点数<br>
- <b>TT</b>：时间定理<br>
- <b>TD</b>：时间维度<br>
- <b>EC</b>：永恒挑战<br>
- <b>TP</b>：超光速粒子<br>
- <b>DT</b>：膨胀时间<br>
- <b>TG</b>：超光速星系<br>
- <b>RM</b>：现实机器<br>
- <b>AP</b>：自动机点数<br>
- <b>BH</b>：黑洞<br>
- <b>iM</b>：幻想机器<br>
- <b>DM</b>：暗物质<br>
- <b>DE</b>：暗能量<br>
`,
  },
  "Antimatter Dimensions": {
    title: "反物质维度",
    body: `
反物质是贯穿整个游戏的基础资源，用来购买各种东西。第一次打开游戏时你拥有 10 反物质，可以花掉它购买第 1 反物质维度来开始游戏。
<br>
<br>
反物质维度是你的生产单位。第 1 反物质维度生产反物质，之后每一级维度生产前一级维度，从而形成稳定的增长。反物质维度一共有 8 个。
<br>
<br>
<b>维度倍率：</b>维度旁边会显示一个倍率（例如第 1 维度 ×1.00）。每个维度的基础产量都会乘以这个数值。
每购买 10 个该维度，这个倍率就会提升（通常为 ×2），同时该维度的价格也会上涨。
<br>
<br>
<b>维度累积数量：</b>下一列是你当前拥有的该维度数量，它等于你购买的数量加上被更高维度生产出来的数量。
<br>
<br>
<b>已购买数量：</b>累积数量后面括号里的数字，是距离下一次倍率提升还需要的购买进度。例如显示 (4) 时，再买 6 个就能提升倍率。
<br>
<br>
<b>维度增长率：</b>表示每个维度每秒增长的比例。100% 意味着该维度每秒翻倍，可用来判断整体增长速度。
<br>
<br>
<b>费用与「直到 10 个」：</b>费用按钮高亮时，可以购买 1 个该维度；「直到 10 个」按钮高亮时，会一直买到该维度下一次倍率提升为止。
<br>
<br>
<b>全部拉满：</b>会依次把第 1 到第 8 反物质维度买到尽可能多，最后再把加速升级买到上限。
<br>
<br>
<b>维度基础价格：</b>10、100、1.00 K、10.0 K、1.00 M、100 M、1.00 B、10.0 B
<br>
<b>每购买 10 个的价格涨幅：</b>×1.00、×2.00、×3.00、×4.00、×5.00、×6.00、×7.00、×8.00
<br>
<br>
<b>快捷键：1~8</b> 分别购买对应维度直到 10 个（按住 Shift 则只买 1 个），<b>M</b> 为全部拉满。
`,
  },
  "Tickspeed": {
    title: "加速（Tickspeed）",
    body: `
游戏的生产按「刻」（tick）进行，最初每秒 1 刻。购买加速升级可以让反物质维度生产得更快，相当于每秒内进行多刻。
<br>
<br>
<b>加速：</b>表示每秒发生多少游戏刻。不足一刻的部分也会按比例计入产量。注意实际刻长是按你在设置中选择的刷新率模拟计算的。
<br>
<br>
<b>费用：</b>购买一次加速升级所需的反物质。没有星系时，每次购买使速度变为原来的 1.1245 倍左右。
<br>
<br>
<b>拉满：</b>用当前全部反物质尽可能多地购买加速升级。
<br>
<br>
<b>快捷键：T</b> 尽可能多地购买加速升级，<b>Shift+T</b> 只买一次，<b>M</b> 为全部拉满。
`,
  },
  "Dimension Boosts": {
    title: "维度提升",
    body: `
<b>维度提升：</b>会重置你的反物质与所有反物质维度，但会解锁下一个可购买的反物质维度，并提升维度倍率。
第 1 次维度提升需要 20 个第 4 维度，第 2 次需要 20 个第 5 维度，以此类推。
8 个维度全部解锁后，之后每次提升需要比上一次多 15 个第 8 维度，不再解锁新维度，但仍会继续提升倍率。
<br>
<br>
每拥有 1 次维度提升，第 1 维度获得 ×2 倍率；维度层级每高一级，这个倍率就少作用一次，最低为 0 次。
例如拥有 3 次提升时，第 1 维度 ×8、第 2 维度 ×4、第 3 维度 ×2，其余维度不受影响。
<br>
<br>
<b>快捷键：D</b> 尝试进行一次维度提升。
`,
  },
  "Antimatter Galaxies": {
    title: "反物质星系",
    body: `
购买反物质星系会把游戏重置到只剩 4 个维度的状态，但会增强加速升级的效果：前两个星系每个提供 +2%，
之后随着星系数量增加，这个加成会越来越强。
<br>
<br>
虽然最初几次加速购买时几乎看不出差别，但该加成是乘算的，很快就会显现出来。
<br>
<br>
第 1 个反物质星系需要 80 个第 8 维度，之后每个星系都再贵 60 个第 8 维度。
<br>
<b>遥远星系缩放：</b>超过 100 个反物质星系后，每个星系带来的价格增幅会额外增加 2，使下一个星系贵 62 个、再下一个贵 64 个，以此类推。
<br>
<b>超遥星系缩放：</b>超过 115 个反物质星系后，总费用会在遥远星系缩放的基础上，每个星系再额外增加 0.2%。
<br>
<br>
<b>快捷键：G</b> 尝试购买一个反物质星系。
`,
  },
  "Dimensional Sacrifice": {
    title: "维度献祭",
    body: `
<b>第 5 次维度提升后解锁维度献祭。</b>
<br>
<br>
献祭会立刻把所有非第 8 维度的拥有数量清零（倍率与当前价格不变），作为交换，第 8 维度倍率会乘以界面显示的数值。
你需要一段时间才能恢复原本的产量，但总体收益是净增长的。
<br>
<br>
献祭倍率取决于献祭时你拥有的第 1 维度数量，部分成就与挑战可以改善这个换算。倍率会在多次献祭之间累计：
先 ×10 再 ×4，与先 ×8 再 ×5 完全相同，最终总倍率都是 ×40。
<br>
<br>
<b>快捷键：S</b> 尝试献祭。
`,
  },
  "Achievements": {
    title: "成就",
    body: `
每个成就都有解锁条件。解锁后，部分成就会提供奖励，条件与奖励的难度和收益差别很大。
<br>
<br>
除了各自的奖励之外，所有成就还会为所有反物质维度提供 ×1.03 的倍率；每完整解锁一行成就，再额外提供 ×1.25。
所有成就的总倍率显示在成就图标上方。
<br>
<br>
隐藏成就不提供任何实际收益，纯粹是为了趣味。把鼠标悬停在隐藏成就上会给出获取提示。
`,
  },
  "Infinity": {
    title: "无限",
    body: `
当反物质多到世界无法承受时（2^1024，约 1.79e308，通常称为「无限」），你会被迫进行一次「大坍缩」。
这会重置反物质、反物质维度、维度提升与反物质星系。大坍缩也被玩家称为「无限化」。
<br>
<br>
最终你可以突破 1.79e308，但在那之前更大的数字都会显示为无穷大。
<br>
<br>
每次完成无限都会获得 1 点无限点数（IP），可以在新的「无限」标签页中购买升级。这些升级必须从上到下依次购买。
同时你会获得 1 次「无限」，也就是你完成大坍缩的次数。
<br>
<br>
「所有来源的无限点数 ×2」这项升级可以重复购买，但每次价格都是上一次的 10 倍。需要先完成成就「No DLC required」才能开始购买它。
<br>
<br>
<b>快捷键：C</b> 尝试进行一次大坍缩。
`,
  },

  // 其余条目目前只有标题翻译，正文仍走英文兜底（可逐步补齐 body）。
  "Customization": {
    title: "自定义",
  },
  "Offline Progress": {
    title: "离线进度",
  },
  "Effect Stacking": {
    title: "效果叠加",
  },
  "Normal Challenges": {
    title: "普通挑战",
  },
  "Autobuyers": {
    title: "自动购买器",
  },
  "Break Infinity": {
    title: "突破无限",
  },
  "Infinity Dimensions": {
    title: "无限维度",
  },
  "Infinity Challenges": {
    title: "无限挑战",
  },
  "Replicanti": {
    title: "复制人",
  },
  "Eternity": {
    title: "永恒",
  },
  "Eternity Milestones": {
    title: "永恒里程碑",
  },
  "Time Dimensions": {
    title: "时间维度",
  },
  "Time Studies": {
    title: "时间研究",
  },
  "Eternity Challenges": {
    title: "永恒挑战",
  },
  "Time Dilation": {
    title: "时间膨胀",
  },
  "Reality": {
    title: "现实",
  },
  "Glyphs": {
    title: "符文",
  },
  "Perks": {
    title: "特权",
  },
  "Automator Overview": {
    title: "自动机概览",
  },
  "Automator Technical Details": {
    title: "自动机技术细节",
  },
  "Black Hole": {
    title: "黑洞",
  },
  "Celestials": {
    title: "天界",
  },
  "Teresa, Celestial of Reality": {
    title: "特蕾莎，现实天界",
  },
  "Effarig, Celestial of Ancient Relics": {
    title: "埃法里格，远古遗物天界",
  },
  "Advanced Glyph Mechanics": {
    title: "进阶符文机制",
  },
  "The Nameless Ones, Celestial of Time": {
    title: "无名者，时间天界",
  },
  "Tesseracts": {
    title: "四维立方",
  },
  "V, Celestial of Achievements": {
    title: "V，成就天界",
  },
  "Ra, Celestial of the Forgotten": {
    title: "拉，被遗忘者天界",
  },
  "Glyph Alchemy Resources": {
    title: "符文炼金资源",
  },
  "Glyph Alchemy Reactions": {
    title: "符文炼金反应",
  },
  "Imaginary Machines": {
    title: "幻想机器",
  },
  "Lai'tela, Celestial of Dimensions": {
    title: "莱特拉，维度天界",
  },
  "Continuum": {
    title: "连续体",
  },
  "Singularities": {
    title: "奇点",
  },
  "Pelle, Celestial of Antimatter": {
    title: "佩勒，反物质天界",
  },
  "Pelle Strikes": {
    title: "佩勒打击",
  },
  "The Galaxy Generator": {
    title: "星系生成器",
  },

};

const base = {
  // ---------------------------------------------------------------- common
  "common.on": "开",
  "common.listSeparator": "，",
  "common.off": "关",

  // ---------------------------------------------------------------- tabs
  "tab.dimensions": "维度",
  "tab.options": "设置",
  "tab.statistics": "统计",
  "tab.achievements": "成就",
  "tab.automation": "自动化",
  "tab.challenges": "挑战",
  "tab.infinity": "无限",
  "tab.eternity": "永恒",
  "tab.reality": "现实",
  "tab.celestials": "天界",
  "tab.shop": "商店",

  // ---------------------------------------------------------------- subtabs
  "subtab.dimensions.antimatter": "反物质维度",
  "subtab.dimensions.infinity": "无限维度",
  "subtab.dimensions.time": "时间维度",
  "subtab.options.saving": "存档",
  "subtab.options.visual": "视觉",
  "subtab.options.gameplay": "玩法",
  "subtab.statistics.statistics": "统计",
  "subtab.statistics.challenges": "挑战记录",
  "subtab.statistics.prestige runs": "历史声望",
  "subtab.statistics.multipliers": "倍率明细",
  "subtab.statistics.glyph sets": "符文套记录",
  "subtab.statistics.speedrun milestones": "速通里程碑",
  "subtab.statistics.speedrun records": "速通记录",
  "subtab.achievements.normal": "成就",
  "subtab.achievements.secret": "隐藏成就",
  "subtab.automation.autobuyers": "自动购买器",
  "subtab.automation.automator": "自动机",
  "subtab.challenges.normal": "普通挑战",
  "subtab.challenges.infinity": "无限挑战",
  "subtab.challenges.eternity": "永恒挑战",
  "subtab.infinity.upgrades": "无限升级",
  "subtab.infinity.break": "突破无限",
  "subtab.infinity.replicanti": "复制人",
  "subtab.eternity.studies": "时间研究",
  "subtab.eternity.upgrades": "永恒升级",
  "subtab.eternity.milestones": "永恒里程碑",
  "subtab.eternity.dilation": "时间膨胀",
  "subtab.reality.glyphs": "符文",
  "subtab.reality.upgrades": "现实升级",
  "subtab.reality.imag_upgrades": "幻想升级",
  "subtab.reality.perks": "特权",
  "subtab.reality.hole": "黑洞",
  "subtab.reality.alchemy": "符文炼金",
  "subtab.celestials.celestial-navigation": "天界导航",
  "subtab.celestials.teresa": "特蕾莎",
  "subtab.celestials.effarig": "埃法里格",
  "subtab.celestials.enslaved": "无名者",
  "subtab.celestials.v": "V",
  "subtab.celestials.ra": "拉",
  "subtab.celestials.laitela": "莱特拉",
  "subtab.celestials.pelle": "佩勒",
  "subtab.shop.shop": "商店",

  // ---------------------------------------------------------------- dimension boost / galaxy / sacrifice state text
  "dimboost.unlockDimension": "解锁第 {0} 维度",
  "dimboost.unlockSacrifice": "解锁献祭",
  "dimboost.giveMult": "{0} 倍率",
  "dimboost.toFirst": "第 1 反物质维度",
  "dimboost.toRange": "第 1~{0} 反物质维度",
  "dimboost.toAll": "所有反物质维度",
  "dimboost.multEffect": "为{1}提供{0}",
  "dimboost.andJoin": "{0}，并{1}",
  "dimboost.useless": "维度提升目前没有作用",
  "dimboost.resetTo": "重置你的维度以{0}",
  "sacrifice.nc10": "第 8 维度已禁用",
  "sacrifice.ec3": "永恒挑战 3",
  "sacrifice.requiresBoosts": "需要 {0} 次维度提升",
  "sacrifice.no8th": "没有第 8 反物质维度",
  "sacrifice.multiplier": "{0} 倍率",
  "sacrifice.goalReached": "已达成挑战目标",
  "sacrifice.needCrunch": "需要大坍缩",
  "lock.ra": "已锁定（拉的现实）",
  "lock.ic1": "已锁定（无限挑战 1）",
  "lock.ic7": "已锁定（无限挑战 7）",
  "lock.ec6": "已锁定（永恒挑战 6）",
  "lock.nc8": "已锁定（第 8 反物质维度自动购买器挑战）",

  // ---------------------------------------------------------------- dimensions tab
  "dim.amName": "第 {0} 反物质维度",
  "dim.sacrificeTooltip": "使第 8 反物质维度提升 {0}",
  "dim.sacrificeAutomatedTooltip": "献祭自动购买器已启用且已解锁成就 118，因此献祭已完全自动化",
  "dim.sacrifice": "维度献祭（{0}）",
  "dim.sacrificeDisabled": "维度献祭已禁用（{0}）",
  "dim.sacrificeAutomated": "维度献祭已自动化（成就 118）",
  "dim.maxAll": "全部拉满 (M)",
  "dim.buy10Mult": "购买 10 个维度的倍率：{0}",
  "dim.sacrificeMult": " | 维度献祭倍率：{0}",
  "dim.buyUntil10": "直到 10 个",
  "dim.buyOne": "购买 1 个",
  "dim.buyN": "购买 {0}",
  "dim.maxAllButton": "拉满",
  "dim.until10": "直到 {0} 个",
  "dim.until10WithCost": "直到 {0} 个，费用",
  "dim.cost": "费用：",
  "dim.capped": "已封顶",
  "dim.shattered": "被无名者击碎",
  "dim.continuum": "连续体：{0}",
  "dim.continuumButton": "连续体",
  "dim.continuumPrefix": "连续体：",
  "dim.boughtTimes": "已购买 {1} 次",
  "dim.namelessPrevents": "无名者阻止你购买超过 {0} 个第 8 反物质维度",
  "dim.continuumProduces": "连续体生产你的所有反物质维度",
  "dim.costUnit": "{0} 号 AD",
  "dim.locked": "未解锁",
  "dim.boostLabel": "维度提升（{0}）：",
  "dim.requires": "需要 {0} 个第 {2} 维度",
  "dim.boostReset": "执行一次维度提升重置",
  "dim.boostLose": "，但失去一个维度提升",
  "dim.boostNoGain": "，但没有收益",
  "dim.galaxyLabel": "{0}（{1}）：",
  "dim.galaxyNormal": "反物质星系",
  "dim.galaxyDistant": "遥远反物质星系",
  "dim.galaxyRemote": "超遥反物质星系",
  "dim.galaxyPower": "提升加速升级的强度",
  "dim.galaxyReset": "重置你的{0}，以提升加速升级的强度",
  "dim.galaxyResetDims": "维度",
  "dim.galaxyResetBoosts": "维度提升",
  "dim.galaxyScaling": "超过 {1} 个星系后，每个星系的费用更高",
  "dim.galaxyScalingRemote": "星系费用增长加快：{0}",
  "dim.scalingQuadratic": "超过 {0} 个星系后按二次方增长（远程）",
  "dim.scalingExponential": "超过 {0} 个星系后按指数增长（超遥）",
  "dim.tickspeedMultIC3": "所有反物质维度乘以 {0}",
  "dim.tickspeedFaster": "每次升级加速 {0}。",
  "dim.tickspeed": "加速：{0} / 秒",
  "dim.tickspeedContinuum": "加速连续体：{0}",
  "dim.tickspeedUnpurchasable": "加速不可购买（EC 9）",
  "dim.tickspeedCost": "加速费用：{0}",
  "dim.freeUpgrades": "{0} 次免费升级",
  "dim.purchasedAndFree": "已购买 {0} + 免费 {1}",
  "dim.purchasedUpgrades": "已购买 {1} 次升级",

  // ------------------------------------------------ dimensions progress bar tooltips
  "dim.pctInfinity": "距离无限",
  "dim.pctChallenge": "距离挑战目标",
  "dim.pctNextChallenge": "距离下一次挑战完成",
  "dim.pctChallengeDone": "此挑战已全部完成！",
  "dim.pctEC": "距离永恒挑战目标",
  "dim.pctTP": "距离在膨胀中获得更多 TP",
  "dim.pctEternityInDilation": "距离膨胀中的永恒",
  "dim.pctDestabilized": "距离现实失稳",
  "dim.pctTesseract": "距离下一个四维立方",
  "dim.pctGalaxyGenerator": "距离星系生成器",
  "dim.pctStrike": "距离第 {1} 次打击",
  "dim.pctReality": "距离现实",
  "dim.pctEternity": "距离永恒",
  "dim.pctUnlockDimensionType": "距离解锁新型维度",
  "dim.pctUnlockInfinityDimension": "距离解锁无限维度",

  // ---------------------------------------------------------------- options: saving
  "opt.exportSave": "导出存档",
  "opt.importSave": "导入存档",
  "opt.resetGame": "重置游戏",
  "opt.saveGame": "保存游戏",
  "opt.chooseSave": "选择存档",
  "opt.exportFile": "导出存档为文件",
  "opt.importFile": "从文件导入存档",
  "opt.backupMenu": "打开自动备份菜单",
  "opt.startSpeedrun": "开始速通",
  "opt.changeSeed": "更改符文随机种子",
  "opt.displayTimeSinceSave": "显示距上次保存的时间：",
  "opt.autosaveInterval": "自动保存间隔：{0} 秒",
  "opt.saveFileName": "存档文件名：",
  "opt.saveFileNamePlaceholder": "自定义存档名",
  "opt.saveFileNameTooltip": "设置自定义名称（最多 16 个字母、数字、空格或连字符）",
  "opt.seedLocked": "你已无法再修改种子：本轮已至少生成过一个符文，符文随机数已经用过了。",

  // ---------------------------------------------------------------- options: visual
  "opt.uiMode": "界面：{0}",
  "opt.uiModern": "现代",
  "opt.uiClassic": "经典",
  "opt.theme": "主题：{0}",
  "opt.notation": "记数法：{0}",
  "opt.sidebar": "侧边栏（现代界面）：{0}",
  "opt.latestResource": "最新资源",
  "opt.language": "语言：{0}",
  "opt.newsOptions": "打开新闻选项",
  "opt.notationOptions": "打开指数记数法选项",
  "opt.animationOptions": "打开动画选项",
  "opt.infoDisplayOptions": "打开信息显示选项",
  "opt.awayProgressOptions": "打开离线进度选项",
  "opt.hiddenTabs": "修改可见标签页",
  "opt.headerTextColored": "声望增益相对百分比着色：",
  "opt.updateRate": "刷新率：{0} 毫秒",

  // ---------------------------------------------------------------- options: gameplay
  "opt.confirmationOptions": "打开确认选项",
  "opt.hotkeys": "快捷键：",
  "opt.enabled": "开",
  "opt.disabled": "关",
  "opt.switchTabs": "在特定事件时切换标签页（例如进入挑战）：",
  "opt.offlineProgress": "离线进度：",
  "opt.offlineTicks": "离线刻数：{0}",
  "opt.hibernation": "将休眠时间按离线处理：",
  "opt.automatorLog": "自动机日志上限：{0}",

  "dim.antimatterShort": "反物质",
  "dim.infinityShort": "无限",
  "dim.timeShort": "时间",
  "ach.dimMult": "{0}维度：{1}",
  "ach.tpMult": "超光速粒子：{0}",
  "ach.bhMult": "黑洞强度：{0}",
  "ach.ttMult": "时间定理产出：{0}",

  // ---------------------------------------------------------------- offline progress
  "offline.label": "离线进度模拟",
  "offline.info": "游戏正在以较低的精度运行，以便快速计算你离开期间获得的资源。技术细节见「游戏说明」中的「离线进度」条目。如果你等不及想尽快回到游戏，可以点击「加速」按钮，用一半的刻数模拟剩余时间（最少保留 {0} 刻）。「跳过」按钮则会用 {1} 刻结算全部剩余离线时间。",
  "offline.ticks": "刻",
  "offline.speedUp": "加速",
  "offline.skip": "跳过",
  "offline.remaining": "剩余：{0}",
  "away.header": "你离开了 {0}，期间：",
  "away.nothingHappened": "你离开了 {0}……什么也没发生。",
  "away.clickToHide": "提示：点击某一项，以后就不再显示它。",
  "away.bhPrefix": "你的",
  "away.bhActivated": "已激活",
  "away.times": "{1} 次",
  "away.exponent": "指数",
  "away.increasedFrom": "从",
  "away.to": "增加到",
  "away.antimatter": "反物质",
  "away.dimensionBoosts": "维度提升",
  "away.antimatterGalaxies": "反物质星系",
  "away.infinities": "无限次数",
  "away.infinityPoints": "无限点数",
  "away.replicanti": "复制人",
  "away.replicantiGalaxies": "复制人星系",
  "away.eternities": "永恒次数",
  "away.eternityPoints": "永恒点数",
  "away.tachyonParticles": "超光速粒子",
  "away.dilatedTime": "膨胀时间",
  "away.timeTheorems": "时间定理",
  "away.tachyonGalaxies": "超光速星系",
  "away.achievementAmount": "成就数量",
  "away.realities": "现实次数",
  "away.realityMachines": "现实机器",
  "away.blackHole": "黑洞",
  "away.firstBlackHole": "第一个黑洞",
  "away.secondBlackHole": "第二个黑洞",
  "away.relicShards": "遗物碎片",
  "away.celestialMemories": "天界记忆",
  "away.teresaMemories": "特蕾莎记忆",
  "away.effarigMemories": "埃法里格记忆",
  "away.enslavedMemories": "无名者的回忆",
  "away.vMemories": "V 的记忆",
  "away.imaginaryMachines": "幻想机器",
  "away.darkMatter": "暗物质",
  "away.darkEnergy": "暗能量",
  "away.singularities": "奇点",
  "away.realityShards": "现实碎片",

  // ---------------------------------------------------------------- achievements tab chrome
  "ach.hideCompleted": "隐藏已完成的行：",
  "ach.autoLabel": "自动成就：",
  "ach.disabled": "所有成就倍率已被禁用",
  "ach.provideMult": "成就为以下内容提供倍率",
  "ach.starRewardPart1": "带有",
  "ach.starRewardPart2": "图标的成就还会额外提供奖励。",

  // ---------------------------------------------------------------- challenges / achievements
  "challenge.reward": "奖励：",
  "challenge.goal": "目标：{0} 反物质",
  "challenge.goalSpan": "目标区间：{0} IP - {1} IP",
  "challenge.completedTimes": "已完成 {1} 次",
  "achievement.reward": "奖励：",

  // ---------------------------------------------------------------- time units
  "time.years": "{0} 年",
  "time.days": "{0} 天",
  "time.hours": "{0} 小时",
  "time.minutes": "{0} 分钟",
  "time.seconds": "{0} 秒",
  "time.year": "{0} 年",
  "time.day": "{0} 天",
  "time.hour": "{0} 小时",
  "time.minute": "{0} 分钟",
  "time.second": "{0} 秒",
  "time.zeroSeconds": "0 秒",
  "time.lessThanSecond": "< {0} 秒",
  "time.greaterThanYear": "> {0} 年",

  // ---------------------------------------------------------------- header / sidebar / timer
  "header.youHave": "你有",
  "header.antimatterUnit": "反物质。",
  "header.getting": "你每秒获得 {0} 反物质。",
  "header.totalTickspeed": "总加速：{0} / 秒",
  "header.tickspeedGiveIC3": "加速升级为所有反物质维度提供 {0}",
  "header.adsFaster": "每次加速升级使反物质维度生产快 {0}",
  "save.nothingToSave": "已经没有可保存的内容了。",
  "save.timeSinceSave": "距离上次保存：{0}",

  "sidebar.1": "团块",
  "sidebar.2": "反物质",
  "sidebar.3": "无限点数",
  "sidebar.4": "复制人",
  "sidebar.5": "永恒点数",
  "sidebar.6": "总时间定理",
  "sidebar.7": "超光速粒子",
  "sidebar.8": "膨胀时间",
  "sidebar.9": "现实机器",
  "sidebar.10": "遗物碎片",
  "sidebar.11": "幻想机器",
  "sidebar.12": "全部机器",
  "sidebar.13": "暗物质",
  "sidebar.14": "暗能量",
  "sidebar.15": "奇点",
  "sidebar.16": "现实碎片",

  // ---------------------------------------------------------------- options: saving (cloud / misc)
  "opt.optModalTooltip": "当游戏检测到你可能不想覆盖云存档的情况时，如果此选项开启，会弹窗提示你更多信息。",
  "opt.overwriteTooltipModal": "弹窗显示期间此设置不起作用。",
  "opt.overwriteTooltipAlways": "你的本地存档将始终覆盖云存档。",
  "opt.overwriteTooltipConflict": "存档冲突时，本地存档将无法写入云端。",
  "opt.cloudSave": "云存档",
  "opt.cloudLoad": "云读取",
  "opt.cloudDisconnect": "断开 Google 账号并关闭云存档",
  "opt.cloudLogin": "使用 Google 登录以启用云存档",
  "opt.hideGoogleName": "隐藏 Google 账号名：",
  "opt.forceLocalSave": "云同步前强制本地保存：",
  "opt.autoCloud": "自动云存档/云读取：",
  "opt.showConflictModal": "可能出现存档冲突时弹窗：",
  "opt.forceCloudSaving": "冲突时仍强制云存档：",
  "opt.loginTooltip": "这会把你的 Google 账号与反物质维度存档关联起来",
  "opt.hideNameTooltip": "出于隐私考虑，在界面上隐藏你的 Google 账号名。保存/读取不受影响。",
  "opt.loggedInHidden": "已登录 Google（名称已隐藏）",
  "opt.loggedInAs": "已登录为 {0}",
  "opt.notLoggedIn": "未登录",
  "opt.cloudAutoSaveOn": "云存档将每 10 分钟自动进行一次。",
  "opt.cloudAutoSaveOff": "此存档已关闭云存档。",

  // ---------------------------------------------------------------- options: hotkeys hint
  "opt.hotkeysLinkPrefix": "按",
  "opt.hotkeysLinkSuffix": "打开快捷键列表。",

  // ---------------------------------------------------------------- how to play
  "h2p.title": "游戏说明",
  "h2p.searchPlaceholder": "输入以搜索…",
  "h2p.clickForInfo": "点击查看说明",
};

const h2pFlat = {};
for (const [name, entry] of Object.entries(h2pEntries)) {
  h2pFlat[`h2p.${name}.title`] = entry.title;
  h2pFlat[`h2p.${name}.body`] = entry.body;
}

export const zh = { ...base, ...zhStats, ...zhModals, ...zhModals2, ...h2pFlat };

export const h2pZh = h2pEntries;
