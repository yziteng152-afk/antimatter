/* eslint-disable max-len */
// 挑战文本中文对照。key 必须与英文原文逐字符一致（含大小写、标点、结尾句号）。
//
// 数据来源：src/core/secret-formula/challenges/ 下的普通、无限与永恒挑战配置。
// 收录规则：
//   - 只收录静态字符串；description() {}、箭头函数与 getter 一律跳过。
//   - 含 ${...} 的模板字符串跳过；不含插值的模板字符串按其运行时实际内容收录，
//     因此下面少数 key 保留了原文的换行（\n）与缩进。
//   - 无限挑战与永恒挑战的 reward 是对象，其内部的静态 description 作为奖励文本收录。
//   - 挑战描述原文首字母为小写，界面显示时会由 DescriptionDisplay 自动大写，故 key 保持原样。
export const zhChallenges = {
  // ---------------------------------------------------------------- 普通挑战：名称
  "1st Antimatter Dimension Autobuyer": "第 1 反物质维度自动购买器",
  "2nd Antimatter Dimension Autobuyer": "第 2 反物质维度自动购买器",
  "3rd Antimatter Dimension": "第 3 反物质维度",
  "4th Antimatter Dimension Autobuyer": "第 4 反物质维度自动购买器",
  "5th Antimatter Dimension Autobuyer": "第 5 反物质维度自动购买器",
  "6th Antimatter Dimension Autobuyer": "第 6 反物质维度自动购买器",
  "7th Antimatter Dimension Autobuyer": "第 7 反物质维度自动购买器",
  "8th Antimatter Dimension Autobuyer": "第 8 反物质维度自动购买器",
  "Tickspeed Autobuyer": "加速自动购买器",
  "Automated Dimension Boosts": "自动化维度提升",
  "Automated Antimatter Galaxies": "自动化反物质星系",
  "Automated Big Crunches": "自动化大坍缩",

  // ---------------------------------------------------------------- 普通挑战：奖励
  "Upgradeable 1st Antimatter Dimension Autobuyer": "可升级的第 1 反物质维度自动购买器",
  "Upgradeable 2nd Antimatter Dimension Autobuyer": "可升级的第 2 反物质维度自动购买器",
  "Upgradeable 3rd Antimatter Dimension Autobuyer": "可升级的第 3 反物质维度自动购买器",
  "Upgradeable 4th Antimatter Dimension Autobuyer": "可升级的第 4 反物质维度自动购买器",
  "Upgradeable 5th Antimatter Dimension Autobuyer": "可升级的第 5 反物质维度自动购买器",
  "Upgradeable 6th Antimatter Dimension Autobuyer": "可升级的第 6 反物质维度自动购买器",
  "Upgradeable 7th Antimatter Dimension Autobuyer": "可升级的第 7 反物质维度自动购买器",
  "Upgradeable 8th Antimatter Dimension Autobuyer": "可升级的第 8 反物质维度自动购买器",
  "Upgradeable Tickspeed Autobuyer": "可升级的加速自动购买器",
  "Dimension Boosts Autobuyer": "维度提升自动购买器",
  "Antimatter Galaxies Autobuyer": "反物质星系自动购买器",
  "Big Crunches Autobuyer": "大坍缩自动购买器",

  // ---------------------------------------------------------------- 普通挑战：描述
  "the 1st Antimatter Dimension is heavily weakened, but gets an uncapped exponentially increasing multiplier.\n        This multiplier resets after Dimension Boosts and Antimatter Galaxies.":
    "第 1 反物质维度被大幅削弱，但会获得一个无上限、按指数增长的倍率。此倍率在维度提升与反物质星系后重置。",
  "buying an Antimatter Dimension automatically erases all lower tier Antimatter Dimensions, like a sacrifice without the boost.":
    "购买一个反物质维度会自动清除所有更低阶的反物质维度，如同一次没有加成的献祭。",
  "Dimension Boosts provide no multiplier and Antimatter Galaxies cannot be bought. Dimensional\n      Sacrifice resets antimatter and all Antimatter Dimensions, but also gives a significantly stronger multiplier.":
    "维度提升不再提供倍率，且无法购买反物质星系。维度献祭会重置反物质和所有反物质维度，但也会提供显著更强的倍率。",

  // ---------------------------------------------------------------- 无限挑战：描述
  "all Normal Challenge restrictions are active at once, with the exception of the\n      Tickspeed (C9) and Big Crunch (C12) Challenges.":
    "所有普通挑战的限制会同时生效，但加速（C9）与大坍缩（C12）挑战除外。",
  "buying Antimatter Dimensions 1-4 causes all cheaper AD costs to increase.\n      Buying Antimatter Dimensions 5-8 causes all more expensive AD costs to increase.":
    "购买第 1-4 反物质维度会使所有更便宜的反物质维度费用上涨。购买第 5-8 反物质维度会使所有更昂贵的反物质维度费用上涨。",

  // ---------------------------------------------------------------- 无限挑战：奖励描述
  "Antimatter Dimension multiplier based on Antimatter Galaxies and Tickspeed purchases":
    "根据反物质星系与加速购买次数获得反物质维度倍率",
  "Infinity Dimension multiplier based on tickspeed": "根据加速获得无限维度倍率",
  "You get a multiplier to AD 2-7 based on 1st and 8th AD multipliers.":
    "根据第 1 与第 8 反物质维度的倍率，获得第 2-7 反物质维度的倍率。",

  // ---------------------------------------------------------------- 永恒挑战：描述
  "Time Dimensions are disabled.": "时间维度被禁用。",
  "Infinity Dimensions are disabled.": "无限维度被禁用。",
  "Antimatter Dimensions 5-8 don't produce anything. Dimensional Sacrifice is disabled.":
    "第 5-8 反物质维度不产出任何东西。维度献祭被禁用。",
  "all Infinity multipliers and generators are disabled. The goal must be reached within a certain\n      number of Infinities or else you will fail the Challenge.":
    "所有无限倍率与无限生成器都被禁用。你必须在指定的无限次数内达成目标，否则挑战失败。",
  "1st Time Dimensions produce 8th Infinity Dimensions and 1st Infinity Dimensions produce 7th Antimatter Dimensions. Tickspeed also directly applies to Infinity and Time Dimensions.":
    "第 1 时间维度生产第 8 无限维度，第 1 无限维度生产第 7 反物质维度。加速也会直接作用于无限维度与时间维度。",

  // ---------------------------------------------------------------- 永恒挑战：奖励描述
  "Time Dimension multiplier based on time spent this Eternity":
    "根据本次永恒中花费的时间获得时间维度倍率",
  "1st Infinity Dimension multiplier based on Infinity Power":
    "根据无限之力获得第 1 无限维度倍率",
  "Infinity Dimension multiplier based on unspent IP": "根据未花费的 IP 获得无限维度倍率",
  "Distant Galaxy cost scaling starts later": "遥远星系费用缩放推迟开始",
  "Further reduce Antimatter Dimension cost multiplier growth":
    "进一步降低反物质维度费用倍率的增长",
  "1st Time Dimension produces 8th Infinity Dimensions": "第 1 时间维度生产第 8 无限维度",
  "Infinity Power strengthens Replicanti Galaxies": "无限之力强化复制人星系",
  "Infinity Dimension multiplier based on Time Shards": "根据时间碎片获得无限维度倍率",
  "Time Dimension multiplier based on Infinities": "根据无限次数获得时间维度倍率",
  "Further reduce Tickspeed cost multiplier growth": "进一步降低加速费用倍率的增长",
  "Infinity Dimension cost multipliers are reduced": "无限维度费用倍率降低",
};
