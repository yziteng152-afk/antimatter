/* eslint-disable max-len */
// 弹窗文案（glyph 分组）。key 与组件里 t("key", "English") 对应。
export const zhModalGlyph = {
  // ---------------------------------------------------------------- 通用
  "glyph.common.delete": "删除",
  "glyph.common.cancel": "取消",
  "glyph.common.import": "导入",
  "glyph.common.save": "保存",
  "glyph.common.refine": "精炼",
  "glyph.common.sacrifice": "献祭",
  "glyph.common.deleteVerb": "删除",
  "glyph.common.changedPosition": "所选符文的位置已改变或发生了其他变化！",

  // ---------------------------------------------------------------- 删除伙伴符文（DeleteCompanionGlyphModal）
  "glyph.deleteCompanion.confirm": "你确定要处理掉你的伙伴符文吗？",
  "glyph.deleteCompanion.noCake": "你不会得到任何蛋糕。",
  "glyph.deleteCompanion.permanent": "这是永久性的！你不会再获得另一个伙伴符文！",
  "glyph.deleteCompanion.quick": "你删除自己忠实的伙伴符文的速度比有记录以来的任何其他测试对象都快。恭喜。",
  "glyph.deleteCompanion.invalid": "无效的消息索引",
  "glyph.deleteCompanion.thankYou": "谢谢你",

  // ---------------------------------------------------------------- 删除符文（DeleteGlyphModal）
  "glyph.deleteGlyph.header": "你即将删除一个符文",
  "glyph.deleteGlyph.body": "删除符文会将该符文从你的物品栏中移除！",
  "glyph.deleteGlyph.warning": "在解锁符文献祭之前，删除符文没有任何好处！",

  // ---------------------------------------------------------------- 清除所有被拒绝的符文（PurgeAllRejectedGlyphsModal）
  "glyph.purgeRejected.topLabel": "你即将{0}所有被拒绝的符文",
  "glyph.purgeRejected.negativeWarning": " 请注意，你的部分效果筛选分数为负数，这可能会导致你失去一些通常想保留的符文。",
  "glyph.purgeRejected.message": "你确定要{0}所有被拒绝的符文吗？这将移除所有会被你当前符文筛选设置拒绝的符文。{1}",
  "glyph.purgeRejected.extraNone": "这不会移除任何符文。",
  "glyph.purgeRejected.extraAll": "这将移除你所有的符文。",
  "glyph.purgeRejected.extraSome": "此过程将移除 {0}/{1} 个符文。",

  // ---------------------------------------------------------------- 清除所有未保护的符文（PurgeAllUnprotectedGlyphsModal）
  "glyph.purgeUnprotected.topLabel": "你即将{0}所有未保护的符文",
  "glyph.purgeUnprotected.message": "你确定要{0}物品栏中所有未保护的符文吗？",
  "glyph.purgeUnprotected.extraNone": "这不会{0}任何符文。",
  "glyph.purgeUnprotected.extraAll": "这将{0}你所有的符文。",
  "glyph.purgeUnprotected.extraSome": "这将{0}你的 {1}/{2} 个符文。",

  // ---------------------------------------------------------------- 符文清除（PurgeGlyphModal）
  "glyph.purge.intro": "这可能会删除你物品栏中那些还算不错、你之后可能想使用的符文。清除会根据你的清除模式来清除符文。你确定要这样做吗？",
  "glyph.purge.extraNone": "这不会清除任何符文。",
  "glyph.purge.extraAll": "这将清除你所有的符文。",
  "glyph.purge.extraSome": "{0}将删除你的 {1}/{2} 个符文。",
  "glyph.purge.harshPurging": "强硬清除",
  "glyph.purge.purging": "清除",
  "glyph.purge.harshPurge": "强硬清除",
  "glyph.purge.purge": "清除",
  "glyph.purge.harshExplanation": "强硬清除会删除严格劣于你物品栏中任何其他符文的符文。例如，如果一个符文与另一个符文具有完全相同的所有效果，但所有效果的数值都更差，那么它将被删除。",
  "glyph.purge.explanation": "清除会删除严格劣于其他符文的符文，同时保留足够多的符文以装备一套完整的效果组合。它的行为类似强硬清除，只是普通清除只有在找到五个更好的符文（而不是只有一个）时才会删除某个符文。",
  "glyph.purge.header": "你即将{0}你的符文",

  // ---------------------------------------------------------------- 符文精炼（RefineGlyphModal）
  "glyph.refine.header": "你即将精炼一个符文",
  "glyph.refine.bodyUnlocked": "精炼符文会将符文从你的物品栏中移除，作为回报，你的{0}炼金资源将从 {1} 提升至 {2}。此符文最多可将你的{0}资源提升至 {3}。",
  "glyph.refine.bodyLocked": "你尚未解锁此符文的资源，因此无法获得任何{0}炼金资源。你仍然可以精炼它，但不会产生任何效果。请考虑改为献祭该符文。",

  // ---------------------------------------------------------------- 符文献祭（SacrificeGlyphModal）
  "glyph.sacrifice.header": "你即将献祭一个符文",
  "glyph.sacrifice.message": "你真的想献祭这个符文吗？你献祭的 {0} 符文的总力量将从 {1} 提升至 {2}。",

  // ---------------------------------------------------------------- 删除符文套（GlyphSetSaveDeleteModal）
  "glyph.setSaveDelete.header": "删除此符文套",
  "glyph.setSaveDelete.confirm": "请确认你希望删除此符文套：",
  "glyph.setSaveDelete.note": "这不会影响你的实际符文，只会影响已保存的预设。",

  // ---------------------------------------------------------------- 符文展示面板（GlyphShowcasePanelModal）
  "glyph.showcase.projectedLevel": "预计符文等级：{0}",

  // ---------------------------------------------------------------- 替换符文（ReplaceGlyphModal）
  "glyph.replace.header": "你即将替换一个符文",
  "glyph.replace.body": "替换符文将重新开始这次{0}。",
  "glyph.replace.armageddon": "末日",
  "glyph.replace.reality": "现实",

  // ---------------------------------------------------------------- 撤销符文（UndoGlyphModal）
  "glyph.undo.message": "符文撤销只能在现实中进行！",
  "glyph.undo.header": "你即将撤销装备一个符文",
  "glyph.undo.body": "最后装备的符文将被移除。现实将被重置，但部分内容会恢复到装备该符文时的状态：",
  "glyph.undo.antimatter": "- 反物质、无限点数与永恒点数",
  "glyph.undo.dilation": "- 膨胀升级、超光速粒子与膨胀时间",
  "glyph.undo.theorems": "- 时间定理与永恒挑战完成次数",
  "glyph.undo.unlocks": "- 时间维度与现实的解锁",
  "glyph.undo.time": "- 当前无限/永恒/现实中的时间",
  "glyph.undo.storedTime": "- 储存的游戏时间",
  "glyph.undo.note": "请注意，如果你令某些内容的特殊要求失效（例如在不产生反物质的情况下完成一次现实的成就），那么即使撤销，它们也会保持失效。在这些情况下，你需要在不使用撤销的情况下于单次现实中完成这些条件。",

  // ---------------------------------------------------------------- 创建现实符文（RealityGlyphCreationModal）
  "glyph.reality.header": "现实符文创建",
  "glyph.reality.body": "创建一个等级为 {0} 的现实符文。稀有度将始终为 {1}，等级取决于你当前的现实资源数量（这些资源会被全部消耗）。其他所有炼金资源都不受影响。现实符文拥有独特的效果，其中一些只有更高等级的符文才能获得。现实符文也可以被献祭，以提升所有记忆碎块的获取量。与埃法里格符文一样，你无法同时装备多个现实符文。",
  "glyph.reality.availableEffects": "可用效果：",
  "glyph.reality.doomed": "在毁灭状态下无法创建现实符文",
  "glyph.reality.create": "创建现实符文！",
  "glyph.reality.levelTooLow": "现实符文等级必须高于 {0}",
  "glyph.reality.noSpace": "物品栏没有可用空间；请献祭一些符文以腾出空间。",
  "glyph.reality.requiresLevel": "（需要符文等级 {0}）",

  // ---------------------------------------------------------------- 研究字符串导入/预设（StudyStringModal）
  "glyph.studyString.titleDeletingPreset": "正在删除研究预设“{0}”",
  "glyph.studyString.titleInput": "输入你的研究树",
  "glyph.studyString.titleEditingPreset": "正在编辑研究预设“{0}”",
  "glyph.studyString.invalidIds": "你的导入字符串包含无效的研究 ID：{0} <br><br>",
  "glyph.studyString.presetContains": "研究预设包含：",
  "glyph.studyString.statusNoStudies": "使用<b>无研究</b>加载后的状态：",
  "glyph.studyString.statusCurrentTree": "使用<b>当前研究树</b>加载后的状态：",
  "glyph.studyString.invalidTree": "不是有效的研究树",
  "glyph.studyString.formatTooltip": "这会格式化研究预设文本，例如将 'a,b,c|d' 改为 'a, b, c | d'。",
  "glyph.studyString.formatButton": "格式化预设文本",
  "glyph.studyString.eternityTooltip": "你当前无法进行永恒，因此这只会执行普通加载。",
  "glyph.studyString.alsoRespec": "同时洗点研究树并进行永恒",
  "glyph.studyString.treeEdited": "研究树 {0} 已成功编辑。",
  "glyph.studyString.presetNamed": "研究预设“{0}”",
  "glyph.studyString.presetUnnamed": "研究预设",
  "glyph.studyString.presetDeleted": "{0}已从槽位 {1} 删除",
  "glyph.studyString.intoEmptyTree": "到空的研究树中",
  "glyph.studyString.withCurrentTree": "到当前研究树中",
  "glyph.studyString.noNewStudies": "导入此内容{0}将不会购买任何新的时间研究。",
  "glyph.studyString.purchaseHeader": "导入{0}将购买以下内容：",
  "glyph.studyString.cost": "（花费：{0}）",
  "glyph.studyString.ttUnit": "时间定理",
  "glyph.studyString.stUnit": "空间定理",
  "glyph.studyString.previewUnavailable": "预览不可用",

  // ---------------------------------------------------------------- 研究树信息（StudyTreeInfo）
  "glyph.treeInfo.dimensionSplit": "维度分裂：{0}",
  "glyph.treeInfo.paceSplit": "节奏分裂：{0}",
  "glyph.treeInfo.eternityChallenge": "永恒挑战：{0}",
  "glyph.treeInfo.willStart": "（将开始）",

  // ---------------------------------------------------------------- 外观套装选择（CosmeticSetChoiceModal）
  "glyph.cosmetic.header": "选择符文外观套装",
  "glyph.cosmetic.noneSelected": "未选择",
  "glyph.cosmetic.availableSets": "▼ 可用套装 ▼",
  "glyph.cosmetic.symbolCount": "{0} 个符号",
  "glyph.cosmetic.symbolCountOne": "1 个符号",
  "glyph.cosmetic.colorSchemeCount": "{0} 种配色方案",
  "glyph.cosmetic.colorSchemeCountOne": "1 种配色方案",
  "glyph.cosmetic.contentsAnd": "和 ",
  "glyph.cosmetic.contains": "“{0}”套装包含以下 {1}：",

  // ---------------------------------------------------------------- 符文外观自定义（GlyphCustomization）
  "glyph.custom.title": "自定义符文外观",
  "glyph.custom.enabled": "已启用",
  "glyph.custom.disabled": "已禁用",
  "glyph.custom.resetToDefault": "将外观重置为默认：",
  "glyph.custom.allTypes": "所有类型",
  "glyph.custom.thisType": "此类型",
  "glyph.custom.resetNote": "这不会重置任何单独修改过的符文。",
  "glyph.custom.glyphType": "符文类型：",
  "glyph.custom.contrastNote": "注意：某些选项在某些主题与某些符文类型下可能会导致颜色对比度极差或难以阅读。",
  "glyph.custom.noOptions": "你目前没有任何可用于更改符文的默认外观的选项。要解锁一些选项，请访问商店标签页或通关游戏。",
  "glyph.custom.specialTypesAvailable": "启用此设置后，你可以将单个符文更改为你已解锁的特殊外观类型。",
  "glyph.custom.nothingHappens": "目前启用或禁用此选项不会产生任何效果。",
  "glyph.custom.resetIndividual": "重置所有单个符文外观",

  // ---------------------------------------------------------------- 单类型外观选项（GlyphCustomizationSingleType）
  "glyph.custom.appearanceOptions": "{0}符文的外观选项",
  "glyph.custom.companionSymbol": "伙伴符文无法修改其符号。",

  // ---------------------------------------------------------------- 外观选项滑动窗口（GlyphCustomizationSlidingWindow）
  "glyph.custom.noSymbolOptions": "你没有可用于更改符文符号的自定义选项。",
  "glyph.custom.noColorOptions": "你没有可用于更改符文颜色的自定义选项。",

  // ---------------------------------------------------------------- 符文显示选项（GlyphDisplayOptionsModal）
  "glyph.display.header": "符文显示选项",
  "glyph.display.newGlyph": "新符文标识：",
  "glyph.display.unequippedGlyph": "未装备符文标识：",
  "glyph.display.effectDots": "始终显示符文效果点：",
  "glyph.display.fancyBorders": "精美符文边框：",
  "glyph.display.bgColor": "符文背景颜色：{0}",
  "glyph.display.bgAuto": "自动",
  "glyph.display.bgLight": "浅色",
  "glyph.display.bgDark": "深色",
  "glyph.display.alwaysShowInfo": "始终显示符文信息：",
  "glyph.display.highContrastRarity": "高对比度稀有度颜色：",
  "glyph.display.swapColors": "交换边框与符号颜色：",
  "glyph.display.additionalInfo": "▼ 额外符文信息：▼",
  "glyph.display.info.0": "无",
  "glyph.display.info.1": "等级",
  "glyph.display.info.2": "稀有度",
  "glyph.display.info.3": "献祭价值",
  "glyph.display.info.4": "符文筛选分数",
  "glyph.display.info.5": "当前精炼价值",
  "glyph.display.info.6": "最大精炼价值",

  // ---------------------------------------------------------------- 单个符文外观（SingleGlyphAppearanceModal）
  "glyph.singleAppearance.header": "修改单个符文外观",
  "glyph.singleAppearance.reset": "重置此符文的外观",
  "glyph.singleAppearance.fixedCosmetic": "此符文的外观类型无法更改！",
  "glyph.singleAppearance.applySpecial": "应用特殊外观类型：",
};
