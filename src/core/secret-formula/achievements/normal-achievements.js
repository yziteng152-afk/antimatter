import { DC } from "../../constants";
import { t } from "../../i18n";

export const normalAchievements = [
  {
    id: 11,
    name: "You gotta start somewhere",
    description: "Buy a 1st Antimatter Dimension.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 12,
    name: "100 antimatter is a lot",
    description: "Buy a 2nd Antimatter Dimension.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 13,
    name: "Half life 3 CONFIRMED",
    description: "Buy a 3rd Antimatter Dimension.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 14,
    name: "L4D: Left 4 Dimensions",
    description: "Buy a 4th Antimatter Dimension.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 15,
    name: "5 Dimension Antimatter Punch",
    description: "Buy a 5th Antimatter Dimension.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 16,
    name: "We couldn't afford 9",
    get description() {
      return Enslaved.isRunning
        ? t("ach.desc.16.a", "Buy a 6th Antimatter Dimension (they never amount to anything)")
        : t("ach.desc.16.b", "Buy a 6th Antimatter Dimension.");
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 17,
    name: "Not a luck related achievement",
    description: "Buy a 7th Antimatter Dimension.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 18,
    name: "90 degrees to infinity",
    get description() {
      return Enslaved.isRunning
        ? t("ach.desc.18.a", "Buy an 8th Antimatter Dimension (don't get used to it)")
        : t("ach.desc.18.b", "Buy an 8th Antimatter Dimension.");
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 21,
    name: "To infinity!",
    description: "Go Infinite.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.21",
        `Start with {0} antimatter.`,
        formatInt(100));
    },
    effect: 100
  },
  {
    id: 22,
    name: "FAKE NEWS!",
    get description() {
      return t("ach.desc.22",
        `Encounter {0} different news messages.`,
        formatInt(50));
    },
    checkRequirement: () => NewsHandler.uniqueTickersSeen >= 50,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER
  },
  {
    id: 23,
    name: "The 9th Dimension is a lie",
    get description() {
      return t("ach.desc.23",
        `Have exactly {0} 8th Antimatter Dimensions.`,
        formatInt(99));
    },
    checkRequirement: () => AntimatterDimension(8).amount.eq(99),
    get reward() {
      return t("ach.reward.23",
        `8th Antimatter Dimensions are {0} stronger.`,
        formatPercents(0.1));
    },
    effect: 1.1
  },
  {
    id: 24,
    name: "Antimatter Apocalypse",
    get description() {
      return t("ach.desc.24",
        `Get over {0} antimatter.`,
        format(DC.E80));
    },
    checkRequirement: () => Currency.antimatter.exponent >= 80,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 25,
    name: "Boosting to the max",
    get description() {
      return t("ach.desc.25",
        `Buy {0} Dimension Boosts.`,
        formatInt(10));
    },
    checkRequirement: () => DimBoost.purchasedBoosts >= 10,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER
  },
  {
    id: 26,
    name: "You got past The Big Wall",
    description: "Buy an Antimatter Galaxy.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE
  },
  {
    id: 27,
    name: "Double Galaxy",
    get description() {
      return t("ach.desc.27",
        `Buy {0} Antimatter Galaxies.`,
        formatInt(2));
    },
    checkRequirement: () => player.galaxies >= 2,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER
  },
  {
    id: 28,
    name: "There's no point in doing that...",
    get description() {
      return t("ach.desc.28", `Buy a single 1st Antimatter Dimension when you have over {0} of them.`,
        format(DC.E150));
    },
    checkRequirement: () => AntimatterDimension(1).amount.exponent >= 150,
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() {
      return t("ach.reward.28",
        `1st Antimatter Dimensions are {0} stronger.`,
        formatPercents(0.1));
    },
    effect: 1.1
  },
  {
    id: 31,
    name: "I forgot to nerf that",
    get description() {
      return t("ach.desc.31",
        `Get any Antimatter Dimension multiplier over {0}.`,
        formatX(DC.E31));
    },
    checkRequirement: () => AntimatterDimensions.all.some(x => x.multiplier.exponent >= 31),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.31",
        `1st Antimatter Dimensions are {0} stronger.`,
        formatPercents(0.05));
    },
    effect: 1.05
  },
  {
    id: 32,
    name: "The Gods are pleased",
    get description() {
      return t("ach.desc.32",
        `Get over {0} from Dimensional Sacrifice outside of Challenge 8.`,
        formatX(600));
    },
    checkRequirement: () => !NormalChallenge(8).isOnlyActiveChallenge && Sacrifice.totalBoost.gte(600),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    get reward() {
      return t("ach.reward.32", `Dimensional Sacrifice is stronger.
      {0} ➜
      {1}`,
      Sacrifice.getSacrificeDescription({ "Achievement32": false, "Achievement57": false, "Achievement88": false }),
      Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false }));
    },
    effect: 0.1,
  },
  {
    id: 33,
    name: "That's a lot of infinites",
    get description() {
      return t("ach.desc.33",
        `Reach Infinity {0} times.`,
        formatInt(10));
    },
    checkRequirement: () => Currency.infinities.gte(10),
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER
  },
  {
    id: 34,
    name: "You didn't need it anyway",
    description: "Infinity without having any 8th Antimatter Dimensions.",
    checkRequirement: () => AntimatterDimension(8).totalAmount.eq(0),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.34",
        `Dimensions 1-7 are {0} stronger.`,
        formatPercents(0.02));
    },
    effect: 1.02
  },
  {
    id: 35,
    name: "Don't you dare sleep",
    get description() {
      return PlayerProgress.realityUnlocked()
        ? t("ach.desc.35.a", `Be offline for a period of over {0} hours (real time).`, formatInt(6))
        : t("ach.desc.35.b", `Be offline for a period of over {0} hours.`, formatInt(6));
    },
    checkRequirement: () => Date.now() - player.lastUpdate >= 21600000,
    checkEvent: GAME_EVENT.GAME_TICK_BEFORE
  },
  {
    id: 36,
    name: "Claustrophobic",
    get description() {
      // eslint-disable-next-line max-len
      return t("ach.desc.36", `Infinity with just {0} Antimatter Galaxy. (Your Antimatter Galaxies are reset on Infinity.)`,
        formatInt(1));
    },
    checkRequirement: () => player.galaxies === 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.36",
        `Multiply starting tick speed by {0}.`,
        format(1.02, 2, 2));
    },
    effect: 1 / 1.02
  },
  {
    id: 37,
    name: "That's FAST!",
    get description() {
      return t("ach.desc.37",
        `Infinity in under {0} hours.`,
        formatInt(2));
    },
    checkRequirement: () => Time.thisInfinityRealTime.totalHours <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.37",
        `Start with {0} antimatter.`,
        formatInt(5000));
    },
    effect: 5000
  },
  {
    id: 38,
    name: "I don't believe in Gods",
    get description() {
      return t("ach.desc.38", `Buy an Antimatter Galaxy without Dimensional Sacrificing.
        (Your Antimatter Galaxies are reset on Infinity.)`);
    },
    checkRequirement: () => player.requirementChecks.infinity.noSacrifice,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE
  },
  {
    id: 41,
    name: "No DLC required",
    get description() {
      return t("ach.desc.41",
        `Buy {0} Infinity Upgrades.`,
        formatInt(16));
    },
    checkRequirement: () => player.infinityUpgrades.size >= 16,
    checkEvent: [
      GAME_EVENT.INFINITY_UPGRADE_BOUGHT,
      GAME_EVENT.REALITY_RESET_AFTER,
      GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT
    ],
    get reward() {
      return t("ach.reward.41", `Unlock two new Infinity Upgrades- {0} IP multiplier and offline IP generation.`,
        formatX(2));
    },
  },
  {
    id: 42,
    name: "Super Sanic",
    get description() {
      return t("ach.desc.42", `Have antimatter per second exceed your current antimatter above {0}.`,
        format(DC.E63));
    },
    checkRequirement: () =>
      Currency.antimatter.exponent >= 63 &&
      Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 43,
    name: "How the antitables have turned..",
    description:
      "Get the 8th Antimatter Dimension multiplier to be highest, 7th Antimatter Dimension multiplier " +
      " second highest, etc.",
    checkRequirement: () => {
      const multipliers = Array.range(1, 8).map(tier => AntimatterDimension(tier).multiplier);
      for (let i = 0; i < multipliers.length - 1; i++) {
        if (multipliers[i].gte(multipliers[i + 1])) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.43", `Each Antimatter Dimension gains a boost proportional to tier
      (8th gets {0}, 7th gets {1}, etc.)`,
      formatPercents(0.08),
      formatPercents(0.07));
    }
  },
  {
    id: 44,
    name: "Over in 30 Seconds",
    get description() {
      return t("ach.desc.44", `Have antimatter per second exceed your current antimatter
      for {0} consecutive seconds.`,
      formatInt(30));
    },
    checkRequirement: () => AchievementTimers.marathon1
      .check(Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value), 30),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
  },
  {
    id: 45,
    name: "Faster than a potato",
    get description() {
      return t("ach.desc.45",
        `Get more than {0} ticks per second.`,
        format(DC.E29));
    },
    checkRequirement: () => Tickspeed.current.exponent <= -26,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.45",
        `Multiply starting tickspeed by {0}.`,
        formatX(1.02, 0, 2));
    },
    effect: 0.98
  },
  {
    id: 46,
    name: "Multidimensional",
    get description() {
      return t("ach.desc.46",
        `Reach {0} of all Antimatter Dimensions except the 8th.`,
        format(DC.E12));
    },
    checkRequirement: () => AntimatterDimension(7).amount.exponent >= 12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 47,
    name: "Daredevil",
    get description() {
      return t("ach.desc.47",
        `Complete {0} Normal Challenges.`,
        formatInt(3));
    },
    checkRequirement: () => NormalChallenges.all.countWhere(c => c.isCompleted) >= 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
  },
  {
    id: 48,
    name: "Antichallenged",
    get description() {
      return t("ach.desc.48",
        `Complete all {0} Normal Challenges.`,
        formatInt(12));
    },
    checkRequirement: () => NormalChallenges.all.countWhere(c => !c.isCompleted) === 0,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    get reward() {
      return t("ach.reward.48",
        `All Dimensions are {0} stronger.`,
        formatPercents(0.1));
    },
    effect: 1.1
  },
  {
    id: 51,
    name: "Limit Break",
    description: "Break Infinity.",
    checkRequirement: () => player.break,
    checkEvent: [GAME_EVENT.BREAK_INFINITY, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
  },
  {
    id: 52,
    name: "Age of Automation",
    description: "Max the interval for Antimatter Dimension and Tickspeed upgrade autobuyers.",
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.concat(Autobuyer.tickspeed)
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT]
  },
  {
    id: 53,
    name: "Definitely not worth it",
    description: "Max the intervals for all normal autobuyers.",
    // The upgradeable autobuyers are dimensions, tickspeed, dimension boost,
    // galaxy, and big crunch (the ones you get from normal challenges).
    // We don't count autobuyers which can be upgraded via e.g. perks as upgradeable.
    checkRequirement: () => Autobuyers.upgradeable
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT]
  },
  {
    id: 54,
    name: "That's FASTER!",
    get description() {
      return t("ach.desc.54",
        `Infinity in {0} minutes or less.`,
        formatInt(10));
    },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.54",
        `Start with {0} antimatter.`,
        format(5e5));
    },
    effect: 5e5
  },
  {
    id: 55,
    name: "Forever isn't that long",
    get description() {
      return t("ach.desc.55",
        `Infinity in {0} minute or less.`,
        formatInt(1));
    },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes <= 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.55",
        `Start with {0} antimatter.`,
        format(5e10));
    },
    effect: 5e10
  },
  {
    id: 56,
    name: "Many Deaths",
    get description() {
      return t("ach.desc.56", `Complete the 2nd Antimatter Dimension Autobuyer Challenge in {0} minutes or less.`,
        formatInt(3));
    },
    checkRequirement: () => NormalChallenge(2).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.56", `All Antimatter Dimensions are stronger in the first {0} minutes of Infinities.`,
        formatInt(3));
    },
    effect: () => Math.max(6 / (Time.thisInfinity.totalMinutes + 3), 1),
    effectCondition: () => Time.thisInfinity.totalMinutes < 3,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 57,
    name: "Gift from the Gods",
    get description() {
      return t("ach.desc.57", `Complete the 8th Antimatter Dimension Autobuyer Challenge in {0} minutes or less.`,
        formatInt(3));
    },
    checkRequirement: () => NormalChallenge(8).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.57", `Dimensional Sacrifice is stronger.
      {0} ➜
      {1}`,
      Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false }),
      Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false }));
    },
    effect: 0.1
  },
  {
    id: 58,
    name: "This is fine.",
    get description() {
      return t("ach.desc.58",
        `Complete the Tickspeed Autobuyer Challenge in {0} minutes or less.`,
        formatInt(3));
    },
    checkRequirement: () => NormalChallenge(9).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.58", `Increase the multiplier for buying {0} Antimatter Dimensions by +{1}.`,
        formatInt(10),
        formatPercents(0.01));
    },
    effect: 1.01
  },
  {
    id: 61,
    name: "Bulked Up",
    get description() {
      return t("ach.desc.61", `Get all of your Antimatter Dimension Autobuyer bulk amounts to
        {0}.`,
      formatInt(Autobuyer.antimatterDimension.bulkCap));
    },
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.every(x => x.hasMaxedBulk),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT,
      GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    reward: "Dimension Autobuyer bulks are unlimited."
  },
  {
    id: 62,
    name: "Oh, hey... You're still here?",
    get description() {
      return t("ach.desc.62",
        `Reach {0} Infinity Points per minute.`,
        format(DC.E8));
    },
    checkRequirement: () => Player.bestRunIPPM.exponent >= 8,
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER
  },
  {
    id: 63,
    name: "A new beginning",
    description: "Begin generation of Infinity Power.",
    checkRequirement: () => Currency.infinityPower.gt(1),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 64,
    name: "Zero Deaths",
    description: "Get to Infinity without Dimension Boosts or Antimatter Galaxies while in a Normal Challenge.",
    checkRequirement: () => player.galaxies === 0 && DimBoost.purchasedBoosts === 0 && NormalChallenge.isRunning,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.64",
        `Antimatter Dimensions 1-4 are {0} stronger.`,
        formatPercents(0.25));
    },
    effect: 1.25
  },
  {
    id: 65,
    name: "Not-so-challenging",
    get description() {
      return t("ach.desc.65",
        `Get the sum of all of your Normal Challenge times under {0} minutes.`,
        formatInt(3));
    },
    checkRequirement: () => Time.challengeSum.totalMinutes < 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() {
      return t("ach.reward.65", `All Antimatter Dimensions are stronger in the first {0} minutes of Infinities,
      but only in Challenges.`,
      formatInt(3));
    },
    effect: () => (Player.isInAnyChallenge ? Math.max(4 / (Time.thisInfinity.totalMinutes + 1), 1) : 1),
    effectCondition: () => Player.isInAnyChallenge && Time.thisInfinity.totalMinutes < 3,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 66,
    name: "Faster than a squared potato",
    get description() {
      return t("ach.desc.66",
        `Get more than {0} ticks per second.`,
        format(DC.E58));
    },
    checkRequirement: () => Tickspeed.current.exponent <= -55,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.66",
        `Multiply starting tickspeed by {0}.`,
        formatX(1.02, 0, 2));
    },
    effect: 0.98
  },
  {
    id: 67,
    name: "Infinitely Challenging",
    description: "Complete an Infinity Challenge.",
    checkRequirement: () => InfinityChallenges.completed.length > 0,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER]
  },
  {
    id: 68,
    name: "You did this again just for the achievement right?",
    get description() {
      return t("ach.desc.68", `Complete the 3rd Antimatter Dimension Autobuyer Challenge in {0} seconds or less.`,
        formatInt(10));
    },
    checkRequirement: () => NormalChallenge(3).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalSeconds <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.68",
        `1st Antimatter Dimensions are {0} stronger.`,
        formatPercents(0.5));
    },
    effect: 1.5
  },
  {
    id: 71,
    name: "ERROR 909: Dimension not found",
    description:
      `Get to Infinity with only a single 1st Antimatter Dimension without Dimension Boosts
      or Antimatter Galaxies, while in the 2nd Antimatter Dimension Autobuyer Challenge.`,
    checkRequirement: () =>
      NormalChallenge(2).isOnlyActiveChallenge &&
      AntimatterDimension(1).amount.eq(1) &&
      DimBoost.purchasedBoosts === 0 &&
      player.galaxies === 0,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.71",
        `1st Antimatter Dimensions are {0} times stronger.`,
        formatInt(3));
    },
    effect: 3
  },
  {
    id: 72,
    name: "Can't hold all these infinities",
    get description() {
      return t("ach.desc.72", `Get all Antimatter Dimension multipliers over {0}.`,
        formatX(Decimal.NUMBER_MAX_VALUE, 1));
    },
    checkRequirement: () => AntimatterDimensions.all.every(x => x.multiplier.gte(Decimal.NUMBER_MAX_VALUE)),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.72",
        `All Antimatter Dimensions are {0} stronger.`,
        formatPercents(0.1));
    },
    effect: 1.1
  },
  {
    id: 73,
    name: "THIS ACHIEVEMENT DOESN'T EXIST",
    get description() {
      return t("ach.desc.73",
        `Get {0} antimatter.`,
        formatPostBreak(DC.D9_9999E9999, 4));
    },
    checkRequirement: () => Currency.antimatter.gte(DC.D9_9999E9999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Antimatter Dimensions gain a multiplier based on current antimatter.",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 74,
    name: "Not a second lost",
    get description() {
      return t("ach.desc.74",
        `Get the sum of all best Normal Challenge times under {0} seconds.`,
        formatInt(5));
    },
    checkRequirement: () => Time.challengeSum.totalSeconds < 5,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() {
      return t("ach.reward.74",
        `All Antimatter Dimensions are {0} stronger, but only in challenges.`,
        formatPercents(0.4));
    },
    effect: 1.4,
    effectCondition: () => Player.isInAnyChallenge
  },
  {
    id: 75,
    name: "NEW DIMENSIONS???",
    description: "Unlock the 4th Infinity Dimension.",
    checkRequirement: () => InfinityDimension(4).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Your Achievement bonus affects Infinity Dimensions.",
    effect: () => Achievements.power
  },
  {
    id: 76,
    name: "One for each dimension",
    get description() {
      return t("ach.desc.76",
        `Play for {0} days.`,
        formatInt(8));
    },
    checkRequirement: () => Time.totalTimePlayed.totalDays >= 8,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Extremely small multiplier to Antimatter Dimensions based on time played.",
    effect: () => Math.max(Math.pow(Time.totalTimePlayed.totalDays / 2, 0.05), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 77,
    name: "1 Million is a lot",
    get description() {
      return t("ach.desc.77",
        `Reach {0} Infinity Power.`,
        format(1e6));
    },
    checkRequirement: () => Currency.infinityPower.exponent >= 6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 78,
    name: "Blink of an eye",
    get description() {
      return t("ach.desc.78",
        `Infinity in under {0}ms.`,
        formatInt(250));
    },
    checkRequirement: () => Time.thisInfinityRealTime.totalMilliseconds <= 250,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.78", `Start with {0} antimatter.`, format(5e25));
    },
    effect: 5e25
  },
  {
    id: 81,
    name: "Game Design Is My Passion",
    get description() {
      return t("ach.desc.81",
        `Beat Infinity Challenge 5 in {0} seconds or less.`,
        formatInt(15));
    },
    checkRequirement: () => InfinityChallenge(5).isRunning && Time.thisInfinityRealTime.totalSeconds <= 15,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE
  },
  {
    id: 82,
    name: "Anti-antichallenged",
    get description() {
      return t("ach.desc.82",
        `Complete all {0} Infinity Challenges.`,
        formatInt(8));
    },
    checkRequirement: () => InfinityChallenges.completed.length === 8,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER],
  },
  {
    id: 83,
    name: "YOU CAN GET 50 GALAXIES?!?!",
    get description() {
      return t("ach.desc.83",
        `Get {0} Antimatter Galaxies.`,
        formatInt(50));
    },
    checkRequirement: () => player.galaxies >= 50,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() {
      return t("ach.reward.83",
        `Tickspeed is just over {0} faster per Antimatter Galaxy.`,
        formatPercents(0.05));
    },
    effect: () => DC.D0_95.pow(player.galaxies),
    formatEffect: value => `${formatX(value.recip(), 2, 2)}`
  },
  {
    id: 84,
    name: "I got a few to spare",
    get description() {
      return t("ach.desc.84",
        `Reach {0} antimatter.`,
        formatPostBreak("1e35000"));
    },
    checkRequirement: () => Currency.antimatter.exponent >= 35000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Antimatter Dimensions are stronger the more unspent antimatter you have.",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 85,
    name: "ALL YOUR IP ARE BELONG TO US",
    get description() {
      return t("ach.desc.85",
        `Big Crunch for {0} Infinity Points.`,
        format(DC.E150));
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 150,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.85",
        `Additional {0} multiplier to Infinity Points.`,
        formatX(4));
    },
    effect: 4
  },
  {
    id: 86,
    name: "Do you even bend time bro?",
    get description() {
      return t("ach.desc.86",
        `Reach {0} faster per Tickspeed upgrade.`,
        formatX(1000));
    },
    checkRequirement: () => Tickspeed.multiplier.recip().gte(1000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.86",
        `All Galaxies are {0} stronger.`,
        formatPercents(0.01));
    },
    effect: 1.01
  },
  {
    id: 87,
    name: "2 MILLION INFINITIES",
    get description() {
      return t("ach.desc.87",
        `Infinity {0} times.`,
        format(DC.D2E6));
    },
    checkRequirement: () => Currency.infinities.gt(DC.D2E6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.87", `Infinities more than {0} seconds long
      give {1} more Infinities.`,
      formatInt(5),
      formatX(250));
    },
    effect: 250,
    effectCondition: () => Time.thisInfinity.totalSeconds > 5
  },
  {
    id: 88,
    name: "Yet another infinity reference",
    get description() {
      return t("ach.desc.88", `Get a {0} multiplier in a single Dimensional Sacrifice.`,
        formatX(Decimal.NUMBER_MAX_VALUE, 1, 0));
    },
    checkRequirement: () => Sacrifice.nextBoost.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_BEFORE,
    get reward() {
      return t("ach.reward.88", `Dimensional Sacrifice is stronger.
      {0} ➜
      {1}`,
      Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false }),
      Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": true }));
    },
    effect: 0.1
  },
  {
    id: 91,
    name: "Ludicrous Speed",
    get description() {
      return t("ach.desc.91", `Big Crunch for {0} Infinity Points in {1} seconds or less.`,
        format(DC.E200),
        formatInt(2));
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 200 && Time.thisInfinityRealTime.totalSeconds <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.91", `All Antimatter Dimensions are significantly stronger in the
      first {0} seconds of Infinities.`,
      formatInt(5));
    },
    effect: () => Math.max((5 - Time.thisInfinity.totalSeconds) * 60, 1),
    effectCondition: () => Time.thisInfinity.totalSeconds < 5,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 92,
    name: "I brake for NOBODY!",
    get description() {
      return t("ach.desc.92", `Big Crunch for {0} Infinity Points in {1} seconds or less.`,
        format(DC.E250),
        formatInt(20));
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 250 && Time.thisInfinityRealTime.totalSeconds <= 20,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.92", `All Antimatter Dimensions are significantly stronger in the
      first {0} seconds of Infinities.`,
      formatInt(60));
    },
    effect: () => Math.max((1 - Time.thisInfinity.totalMinutes) * 100, 1),
    effectCondition: () => Time.thisInfinity.totalMinutes < 1,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 93,
    name: "MAXIMUM OVERDRIVE",
    get description() {
      return t("ach.desc.93",
        `Big Crunch for {0} Infinity Points.`,
        format(DC.E300));
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 300,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return t("ach.reward.93",
        `Additional {0} multiplier to Infinity Points.`,
        formatX(4));
    },
    effect: 4
  },
  {
    id: 94,
    name: "4.3333 minutes of Infinity",
    get description() {
      return t("ach.desc.94",
        `Reach {0} Infinity Power.`,
        format(DC.E260));
    },
    checkRequirement: () => Currency.infinityPower.exponent >= 260,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Double Infinity Power gain.",
    effect: 2
  },
  {
    id: 95,
    name: "Is this safe?",
    get description() {
      return t("ach.desc.95",
        `Gain {0} Replicanti in {1} hour.`,
        format(Decimal.NUMBER_MAX_VALUE, 1, 0),
        formatInt(1));
    },
    get reward() {
      return t("ach.reward.95",
        `You keep your Replicanti and {0} Replicanti Galaxy on Infinity.`,
        formatInt(1));
    },
    checkRequirement: () =>
      (Replicanti.amount.eq(Decimal.NUMBER_MAX_VALUE) || player.replicanti.galaxies > 0) &&
      Time.thisInfinityRealTime.totalHours <= 1,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER
  },
  {
    id: 96,
    name: "Time is relative",
    description: "Go Eternal.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 97,
    name: "Like jumping on a lego",
    get description() {
      return t("ach.desc.97",
        `Get the sum of Infinity Challenge times under {0} seconds.`,
        format(6.66, 2, 2));
    },
    checkRequirement: () => Time.infinityChallengeSum.totalSeconds < 6.66,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
  },
  {
    id: 98,
    name: "0 degrees from Infinity",
    description: "Unlock the 8th Infinity Dimension.",
    checkRequirement: () => InfinityDimension(8).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 101,
    name: "8 nobody got time for that",
    description: "Eternity without buying Antimatter Dimensions 1-7.",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD8,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 102,
    name: "This mile took an eternity",
    description: "Get all Eternity milestones.",
    checkRequirement: () => EternityMilestone.all.every(m => m.isReached),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 103,
    name: "Tätä saavutusta ei ole olemassa II",
    get description() {
      return t("ach.desc.103",
        `Reach {0} Infinity Points.`,
        formatPostBreak(DC.D9_99999E999, 5, 0));
    },
    checkRequirement: () => Currency.infinityPoints.exponent >= 1000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.103", `Make the Infinity Point formula better. log(x)/{0} ➜ log(x)/{1}`,
        formatInt(308),
        formatFloat(307.8, 1));
    },
    effect: 307.8
  },
  {
    id: 104,
    name: "That wasn't an eternity",
    get description() {
      return t("ach.desc.104",
        `Eternity in under {0} seconds.`,
        formatInt(30));
    },
    checkRequirement: () => Time.thisEternity.totalSeconds <= 30,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() {
      return t("ach.reward.104",
        `Start Eternities with {0} Infinity Points.`,
        format(5e25));
    },
    effect: 5e25
  },
  {
    id: 105,
    name: "Infinite Time",
    get description() {
      return t("ach.desc.105",
        `Have {0} Tickspeed upgrades from Time Dimensions.`,
        formatInt(308));
    },
    checkRequirement: () => player.totalTickGained >= 308,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Time Dimensions gain a multiplier based on tickspeed.",
    effect: () => Tickspeed.perSecond.pow(0.000005),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 106,
    name: "The swarm",
    get description() {
      return t("ach.desc.106",
        `Get {0} Replicanti Galaxies in {1} seconds.`,
        formatInt(10),
        formatInt(15));
    },
    checkRequirement: () => Replicanti.galaxies.total >= 10 && Time.thisInfinity.totalSeconds <= 15,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER
  },
  {
    id: 107,
    name: "Do you really need a guide for this?",
    get description() {
      return t("ach.desc.107",
        `Eternity with less than {0} Infinities.`,
        formatInt(10));
    },
    checkRequirement: () => Currency.infinities.lt(10),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 108,
    name: "We COULD afford 9",
    get description() {
      return t("ach.desc.108",
        `Eternity with exactly {0} Replicanti.`,
        formatInt(9));
    },
    checkRequirement: () => Replicanti.amount.round().eq(9),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 111,
    name: "Yo dawg, I heard you liked infinities...",
    get description() {
      return t("ach.desc.111", `Have all your Infinities in your past {0} Infinities be at least
      {1} times higher Infinity Points than the previous one.`,
      formatInt(10),
      format(Decimal.NUMBER_MAX_VALUE, 1, 0));
    },
    checkRequirement: () => {
      if (player.records.recentInfinities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const infinities = player.records.recentInfinities.map(run => run[2]);
      for (let i = 0; i < infinities.length - 1; i++) {
        if (infinities[i].lt(infinities[i + 1].times(Decimal.NUMBER_MAX_VALUE))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    reward: "Your antimatter doesn't reset on Dimension Boosts or Antimatter Galaxies."
  },
  {
    id: 112,
    name: "Never again",
    get description() {
      return t("ach.desc.112",
        `Get the sum of Infinity Challenge times below {0}ms.`,
        formatInt(750));
    },
    checkRequirement: () => Time.infinityChallengeSum.totalMilliseconds < 750,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER]
  },
  {
    id: 113,
    name: "Eternities are the new infinity",
    get description() {
      return t("ach.desc.113",
        `Eternity in under {0}ms.`,
        formatInt(250));
    },
    checkRequirement: () => Time.thisEternity.totalMilliseconds <= 250,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() {
      return t("ach.reward.113",
        `Gain {0} more Eternities.`,
        formatX(2));
    },
    effect: 2,
  },
  {
    id: 114,
    name: "You're a mistake",
    description: "Fail an Eternity Challenge.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.CHALLENGE_FAILED,
    reward: "A fading sense of accomplishment.",
    effect: () => "Sense of accomplishment (fading)"
  },
  {
    id: 115,
    name: "I wish I had gotten 7 eternities",
    description: "Start an Infinity Challenge inside an Eternity Challenge.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 116,
    name: "Do I really need to infinity",
    get description() {
      return t("ach.desc.116",
        `Eternity with only {0} Infinity.`,
        formatInt(1));
    },
    checkRequirement: () => Currency.infinities.lte(1),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    reward: "Multiplier to Infinity Points based on Infinities.",
    effect: () => Decimal.pow(Currency.infinitiesTotal.value.clampMin(1), LOG10_2 / 4).powEffectOf(TimeStudy(31)),
    cap: () => Effarig.eternityCap,
    formatEffect: value => {
      // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
      const mult = formatX(value, 2, 2);
      return TimeStudy(31).canBeApplied
        ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} (After TS31: ${mult})`
        : mult;
    }
  },
  {
    id: 117,
    name: "Costco sells Dimboosts now!",
    get description() {
      return t("ach.desc.117",
        `Bulk buy {0} Dimension Boosts at once.`,
        formatInt(750));
    },
    checkRequirement: ([bulk]) => bulk >= 750,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER,
    get reward() {
      return t("ach.reward.117", `The multiplier from Dimension Boosts to Antimatter Dimensions is {0} higher.`,
        formatPercents(0.01));
    },
    effect: 1.01
  },
  {
    id: 118,
    name: "IT'S OVER 9000",
    get description() {
      return t("ach.desc.118",
        `Get a total Dimensional Sacrifice multiplier of {0}.`,
        formatPostBreak(DC.E9000));
    },
    checkRequirement: () => Sacrifice.totalBoost.exponent >= 9000,
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    reward: `Dimensional Sacrifice doesn't reset your Antimatter Dimensions
      and the Autobuyer activates every tick if turned on.`,
  },
  {
    id: 121,
    name: "Can you get infinite IP?",
    get description() {
      return t("ach.desc.121",
        `Reach {0} Infinity Points.`,
        formatPostBreak("1e30008"));
    },
    checkRequirement: () => Currency.infinityPoints.exponent >= 30008,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 122,
    name: "You're already dead.",
    description: "Eternity without buying Antimatter Dimensions 2-8.",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD1,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 123,
    name: "5 more eternities until the update",
    get description() {
      return t("ach.desc.123",
        `Complete {0} unique Eternity Challenge tiers.`,
        formatInt(50));
    },
    checkRequirement: () => EternityChallenges.completions >= 50,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER
  },
  {
    id: 124,
    name: "Long lasting relationship",
    get description() {
      return t("ach.desc.124", `Have your Infinity Power per second exceed your Infinity Power
      for {0} consecutive seconds during a single Infinity.`,
      formatInt(60));
    },
    checkRequirement: () => AchievementTimers.marathon2
      .check(
        !EternityChallenge(7).isRunning &&
        InfinityDimension(1).productionPerSecond.gt(Currency.infinityPower.value),
        60
      ),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 125,
    name: "Like feasting on a behind",
    get description() {
      return t("ach.desc.125", `Reach {0} Infinity Points without having any Infinities
      or any 1st Antimatter Dimensions in your current Eternity.`,
      format(DC.E90));
    },
    checkRequirement: () => Currency.infinityPoints.exponent >= 90 &&
      player.requirementChecks.eternity.noAD1 && Currency.infinities.eq(0),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Infinity Point multiplier based on time spent this Infinity.",
    effect() {
      const thisInfinity = Time.thisInfinity.totalSeconds * 10 + 1;
      return DC.D2.pow(Math.log(thisInfinity) * Math.min(Math.pow(thisInfinity, 0.11), 500));
    },
    cap: () => Effarig.eternityCap,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 126,
    name: "Popular music",
    get description() {
      return t("ach.desc.126",
        `Have {0} times more Replicanti Galaxies than Antimatter Galaxies.`,
        formatInt(180));
    },
    checkRequirement: () => Replicanti.galaxies.total >= 180 * player.galaxies && player.galaxies > 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.126", `Replicanti Galaxies divide your Replicanti by {0}
      instead of resetting them to {1}.`,
      format(Decimal.NUMBER_MAX_VALUE, 1, 0),
      formatInt(1));
    },
  },
  {
    id: 127,
    name: "But I wanted another prestige layer...",
    get description() {
      return t("ach.desc.127",
        `Reach {0} Eternity Points.`,
        format(Decimal.NUMBER_MAX_VALUE, 1, 0));
    },
    checkRequirement: () => Currency.eternityPoints.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 128,
    name: "What do I have to do to get rid of you",
    get description() {
      return t("ach.desc.128",
        `Reach {0} Infinity Points without any Time Studies.`,
        formatPostBreak("1e22000"));
    },
    checkRequirement: () => Currency.infinityPoints.exponent >= 22000 && player.timestudy.studies.length === 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Time Dimensions are multiplied by the number of Time Studies you have.",
    effect: () => Math.max(player.timestudy.studies.length, 1),
    formatEffect: value => `${formatX(value)}`
  },
  {
    id: 131,
    name: "No ethical consumption",
    get description() {
      return t("ach.desc.131",
        `Get {0} Banked Infinities.`,
        format(DC.D2E9));
    },
    checkRequirement: () => Currency.infinitiesBanked.gt(DC.D2E9),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    get reward() {
      return t("ach.reward.131", `You gain {0} times more Infinities and
      after Eternity you permanently keep {1} of your Infinities as Banked Infinities.`,
      formatX(2),
      formatPercents(0.05));
    },
    effects: {
      infinitiesGain: 2,
      bankedInfinitiesGain: () => Currency.infinities.value.times(0.05).floor()
    }

  },
  {
    id: 132,
    name: "Unique snowflakes",
    get description() {
      return t("ach.desc.132", `Have {0} Antimatter Galaxies without gaining any
        Replicanti Galaxies in your current Eternity.`,
      formatInt(569));
    },
    checkRequirement: () => player.galaxies >= 569 && player.requirementChecks.eternity.noRG,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "Gain a multiplier to Tachyon Particle and Dilated Time gain based on Antimatter Galaxies.",
    effect: () => 1.22 * Math.max(Math.pow(player.galaxies, 0.04), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 133,
    name: "I never liked this infinity stuff anyway",
    get description() {
      return t("ach.desc.133", `Reach {0} Infinity Points without
      buying any Infinity Dimensions or the {1} Infinity Point multiplier.`,
      formatPostBreak(DC.E200000),
      formatX(2));
    },
    checkRequirement: () =>
      Array.dimensionTiers.map(InfinityDimension).every(dim => dim.baseAmount === 0) &&
      player.IPMultPurchases === 0 &&
      Currency.infinityPoints.exponent >= 200000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "You start Eternities with all Infinity Challenges unlocked and completed."
  },
  {
    id: 134,
    name: "When will it be enough?",
    get description() {
      return t("ach.desc.134",
        `Reach {0} Replicanti.`,
        formatPostBreak(DC.E18000));
    },
    checkRequirement: () => Replicanti.amount.exponent >= 18000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.134", `You gain Replicanti {0} times faster under {1} Replicanti.`,
        formatInt(2),
        format(replicantiCap(), 1));
    }
  },
  {
    id: 135,
    name: "Faster than a potato^286078",
    get description() {
      return t("ach.desc.135",
        `Get more than {0} ticks per second.`,
        formatPostBreak("1e8296262"));
    },
    checkRequirement: () => Tickspeed.current.exponent <= -8296262,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 136,
    name: "I told you already, time is relative",
    description: "Dilate time.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 137,
    name: "Now you're thinking with dilation!",
    get description() {
      return t("ach.desc.137", `Get {0} antimatter
      in {1} minute or less while Dilated.`,
      formatPostBreak("1e260000"),
      formatInt(1));
    },
    checkRequirement: () =>
      Currency.antimatter.exponent >= 260000 &&
      Time.thisEternity.totalMinutes <= 1 &&
      player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.137",
        `Gain {0} Dilated Time and Time Theorems while Dilated.`,
        formatX(2));
    },
    effect: () => (player.dilation.active ? 2 : 1),
  },
  {
    id: 138,
    name: "This is what I have to do to get rid of you.",
    get description() {
      return t("ach.desc.138", `Reach {0} Infinity Points without any Time Studies while Dilated.`,
        formatPostBreak("1e26000"));
    },
    checkRequirement: () =>
      player.timestudy.studies.length === 0 &&
      player.dilation.active &&
      Currency.infinityPoints.exponent >= 26000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Removes the downsides from Time Study 131 and 133 in the Active and Idle Time Study paths."
  },
  {
    id: 141,
    name: "Snap back to reality",
    description: "Make a new Reality.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return t("ach.reward.141", `{0} Infinity Point gain, and increase the multiplier for buying {1}
      Antimatter Dimensions by +{2}.`,
      formatX(4),
      formatInt(10),
      format(0.1, 0, 1));
    },
    effects: {
      ipGain: 4,
      buyTenMult: 0.1
    }
  },
  {
    id: 142,
    name: "How does this work?",
    description: "Unlock the automator.",
    checkRequirement: () => Player.automatorUnlocked,
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_BOUGHT, GAME_EVENT.PERK_BOUGHT,
      GAME_EVENT.BLACK_HOLE_UNLOCKED],
    get reward() {
      return t("ach.reward.142",
        `Dimension Boosts are {0} stronger.`,
        formatPercents(0.5));
    },
    effect: 1.5,
  },
  {
    id: 143,
    name: "Yo dawg, I heard you liked reskins...",
    get description() {
      return t("ach.desc.143", `Have all your Eternities in your past {0} Eternities be at least
      {1} times higher Eternity Points than the previous one.`,
      formatInt(10),
      format(Decimal.NUMBER_MAX_VALUE, 1, 0));
    },
    checkRequirement: () => {
      if (player.records.recentEternities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const eternities = player.records.recentEternities.map(run => run[2]);
      for (let i = 0; i < eternities.length - 1; i++) {
        if (eternities[i].lt(eternities[i + 1].times(Decimal.NUMBER_MAX_VALUE))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    reward: "Galaxies no longer reset Dimension Boosts."
  },
  {
    id: 144,
    name: "Is this an Interstellar reference?",
    description: "Unlock the Black Hole.",
    checkRequirement: () => BlackHole(1).isUnlocked,
    checkEvent: GAME_EVENT.BLACK_HOLE_UNLOCKED,
  },
  {
    id: 145,
    name: "Are you sure these are the right way around?",
    description: "Have either Black Hole interval smaller than its duration.",
    checkRequirement: () => BlackHoles.list.some(bh => bh.interval < bh.duration),
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() {
      return t("ach.reward.145",
        `Black Hole intervals are {0} shorter.`,
        formatPercents(0.1));
    },
    effect: 0.9
  },
  {
    id: 146,
    name: "Perks of living",
    description: "Have all Perks bought.",
    checkRequirement: () => player.reality.perks.size === Perks.all.length,
    checkEvent: GAME_EVENT.PERK_BOUGHT,
    get reward() {
      return t("ach.reward.146",
        `+{0} Glyph rarity.`,
        formatPercents(0.01));
    },
    effect: 1
  },
  {
    id: 147,
    name: "Master of Reality",
    description: "Have all Reality upgrades bought.",
    checkRequirement: () => RealityUpgrades.allBought,
    checkEvent: GAME_EVENT.REALITY_UPGRADE_BOUGHT,
    reward: "Unlock Teresa, the Celestial of Reality."
  },
  {
    id: 148,
    name: "Royal flush",
    description: "Reality with one of each basic Glyph type.",
    checkRequirement: () => BASIC_GLYPH_TYPES
      .every(type => Glyphs.activeList.some(g => g.type === type)),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "Gained Glyph level is increased by number of distinct Glyph types equipped.",
    effect: () => (new Set(Glyphs.activeWithoutCompanion.map(g => g.type))).size,
    formatEffect: value => `+${formatInt(value)}`
  },
  {
    id: 151,
    name: "You really didn't need it anyway",
    get description() {
      return t("ach.desc.151", `Get {0} Antimatter Galaxies without
      buying 8th Antimatter Dimensions in your current Infinity.`,
      formatInt(800));
    },
    checkRequirement: () => player.galaxies >= 800 && player.requirementChecks.infinity.noAD8,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "Unlock V, the Celestial of Achievements."
  },
  {
    id: 152,
    name: "Y'all got any more of them Glyphs?",
    get description() {
      return t("ach.desc.152",
        `Have {0} Glyphs in your inventory.`,
        formatInt(100));
    },
    checkRequirement: () => Glyphs.inventoryList.length >= 100,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED
  },
  {
    id: 153,
    name: "More like \"reallydoesn'tmatter\"",
    description: "Reality without producing antimatter.",
    checkRequirement: () => player.requirementChecks.reality.noAM,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 154,
    name: "I am speed",
    get description() {
      return t("ach.desc.154",
        `Reality in under {0} seconds (game time).`,
        formatInt(5));
    },
    checkRequirement: () => Time.thisReality.totalSeconds <= 5,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return t("ach.reward.154",
        `{0} chance each Reality of {1} Realities and Perk Points.`,
        formatPercents(0.1),
        formatX(2));
    },
    effect: 0.1
  },
  {
    id: 155,
    name: "Achievement #15983",
    get description() {
      return t("ach.desc.155",
        `Play for {0} billion years.`,
        formatFloat(13.7, 1));
    },
    checkRequirement: () => Time.totalTimePlayed.totalYears > 13.7e9,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.155",
        `Black Hole durations are {0} longer.`,
        formatPercents(0.1));
    },
    effect: 1.1
  },
  {
    id: 156,
    name: "College Dropout",
    description: "Reality without buying Time Theorems.",
    checkRequirement: () => player.requirementChecks.reality.noPurchasedTT,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return t("ach.reward.156",
        `Gain {0} generated Time Theorems, and a free coupon to McDonalds™️.`,
        formatX(2.5, 0, 1));
    },
    effect: 2.5
  },
  {
    id: 157,
    name: "It's super effective!",
    get description() {
      return t("ach.desc.157",
        `Get a Glyph with {0} effects.`,
        formatInt(4));
    },
    checkRequirement: () => Glyphs.activeList.concat(Glyphs.inventoryList).map(
      glyph => getGlyphEffectsFromBitmask(glyph.effects, 0, 0)
        .filter(effect => effect.isGenerated).length
    ).max() >= 4,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED
  },
  {
    id: 158,
    name: "Bruh, are you like, inside the hole?",
    description: "Make both Black Holes permanent.",
    checkRequirement: () => BlackHole(1).isPermanent && BlackHole(2).isPermanent,
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() {
      return t("ach.reward.158",
        `Black Hole power increased by {0}.`,
        formatPercents(0.1));
    },
    effect: 1.1
  },
  {
    id: 161,
    name: "that's where you're wrong kiddo",
    get description() {
      return t("ach.desc.161",
        `Get {0} antimatter while Dilated.`,
        formatPostBreak(DC.E1E8));
    },
    checkRequirement: () => Currency.antimatter.exponent >= 100000000 && player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 162,
    name: "Reinstalled the game and rejoined the server",
    description: "Have every Time Study at once.",
    checkRequirement: () => player.timestudy.studies.length >= 58,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 163,
    name: "Actually, super easy! Barely an inconvenience!",
    get description() {
      return t("ach.desc.163", `Complete all the Eternity Challenges {0} times with less than {1}
      second (game time) in your current Reality.`,
      formatInt(5),
      formatInt(1));
    },
    checkRequirement: () => EternityChallenges.all.map(ec => ec.completions).min() >= 5 &&
      Time.thisReality.totalSeconds <= 1,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 164,
    name: "Infinity times two",
    get description() {
      return t("ach.desc.164",
        `Get {0} Infinities.`,
        format(Decimal.NUMBER_MAX_VALUE, 1));
    },
    checkRequirement: () => Currency.infinitiesTotal.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.164",
        `Gain ×{0} more Infinities.`,
        formatInt(1024));
    },
    effect: 1024
  },
  {
    id: 165,
    name: "Perfectly balanced",
    get description() {
      return t("ach.desc.165",
        `Get a level {0} Glyph with all Glyph level factors equally weighted.`,
        formatInt(5000));
    },
    checkRequirement: () => gainedGlyphLevel().actualLevel >= 5000 &&
      ["repl", "dt", "eternities"].every(
        i => player.celestials.effarig.glyphWeights[i] === player.celestials.effarig.glyphWeights.ep),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "Unlock optimal automatic Glyph level factor adjustment."
  },
  {
    id: 166,
    name: "Nicenice.",
    get description() {
      return t("ach.desc.166",
        `Get a Glyph with level exactly {0}.`,
        formatInt(6969));
    },
    checkRequirement: () => gainedGlyphLevel().actualLevel === 6969,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return t("ach.reward.166",
        `+{0} to Glyph level.`,
        formatInt(69));
    },
    effect: 69
  },
  {
    id: 167,
    name: "Mr. Layer? Sorry, you're not on the list",
    get description() {
      return t("ach.desc.167",
        `Reach {0} Reality Machines.`,
        format(Decimal.NUMBER_MAX_VALUE, 1, 0));
    },
    checkRequirement: () => Currency.realityMachines.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "Gain more Reality Machines based on your current Reality Machines.",
    effect: () => Math.clampMin(1, Currency.realityMachines.value.log2()),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 168,
    name: "Woah, we're halfway there",
    get description() {
      return t("ach.desc.168",
        `Get {0} total Ra Celestial Memory levels.`,
        formatInt(50));
    },
    checkRequirement: () => Ra.totalPetLevel >= 50,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return t("ach.reward.168",
        `Get {0} more memories.`,
        formatPercents(0.1));
    },
    effect: 1.1
  },
  {
    id: 171,
    name: "The god is delighted",
    description: "Sacrifice every sacrificable Glyph type at least once.",
    checkRequirement: () => Object.values(player.reality.glyphs.sac).every(s => s > 0),
    checkEvent: GAME_EVENT.GLYPHS_CHANGED,
    get reward() {
      return t("ach.reward.171",
        `Glyph sacrifice is {0} stronger.`,
        formatX(2));
    },
    effect: 2,
  },
  {
    id: 172,
    name: "Hitchhiker's Guide to Reality",
    get description() {
      return t("ach.desc.172", `Reality for {0} Reality Machines without having
      any Charged Infinity Upgrades, having any equipped Glyphs, or buying any Triad Studies.`,
      format(Decimal.NUMBER_MAX_VALUE, 1));
    },
    checkRequirement: () => MachineHandler.gainedRealityMachines.gte(Decimal.NUMBER_MAX_VALUE) &&
      player.celestials.ra.charged.size === 0 && Glyphs.activeWithoutCompanion.length === 0 &&
      player.requirementChecks.reality.noTriads,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 173,
    name: "Cet accomplissement n'existe pas III",
    get description() {
      return t("ach.desc.173",
        `Reach {0} Reality Machines.`,
        formatPostBreak(DC.D9_99999E999, 5, 0));
    },
    checkRequirement: () => player.reality.realityMachines.gte(DC.D9_99999E999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 174,
    name: "Don't you already have two of these?",
    description: "Get a Singularity.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE
  },
  {
    id: 175,
    name: "The First Antihistorian",
    get description() {
      return t("ach.desc.175",
        `Get {0} of all Alchemy Resources.`,
        formatInt(Ra.alchemyResourceCap));
    },
    checkRequirement: () => AlchemyResources.all.every(x => x.amount >= Ra.alchemyResourceCap),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    get reward() {
      return t("ach.reward.175", `Synergism can go above {0} and Momentum increases {1} faster.`,
        formatPercents(1),
        formatX(10));
    },
    effect: 10,
  },
  {
    id: 176,
    name: "Mom counted to 3",
    description: "Annihilate your Dark Matter Dimensions.",
  },
  {
    id: 177,
    name: "This mile took a celestial",
    description: "Complete all Singularity Milestones at least once.",
    checkRequirement: () => SingularityMilestones.all.every(x => x.completions > 0),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_AFTER,
  },
  {
    id: 178,
    name: "Destroyer of Worlds",
    get description() {
      return t("ach.desc.178",
        `Get {0} Antimatter Galaxies.`,
        formatInt(100000));
    },
    checkRequirement: () => player.galaxies >= 100000,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() {
      return t("ach.reward.178",
        `All Galaxies are {0} stronger.`,
        formatPercents(0.01));
    },
    effect: 1.01
  },
  {
    id: 181,
    displayId: 666,
    name: "Antimatter Dimensions Eternal",
    description: "Doom your Reality.",
    checkRequirement: () => Pelle.isDoomed,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
  },
  {
    id: 182,
    name: "One more time",
    description: "Permanently gain back all Antimatter Dimension autobuyers.",
    checkRequirement: () => PelleUpgrade.antimatterDimAutobuyers1.canBeApplied &&
      PelleUpgrade.antimatterDimAutobuyers2.canBeApplied,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 183,
    name: "Déjà vOoM",
    description: "Complete Infinity Challenge 5 while Doomed.",
    checkRequirement: () => Pelle.isDoomed && InfinityChallenge(5).isCompleted,
    checkEvent: GAME_EVENT.INFINITY_CHALLENGE_COMPLETED,
    // Weirdly specific reward? Yes, its V's ST bonus because we forgot to disable it
    // when balancing Pelle and only realised too late.
    get reward() {
      return t("ach.reward.183",
        `All Antimatter Dimensions are raised to {0}`,
        formatPow(1.0812403840463596, 0, 3));
    },
    effect: 1.0812403840463596
  },
  {
    id: 184,
    name: "You're out!",
    description: "Encounter the third Pelle Strike.",
    checkRequirement: () => PelleStrikes.eternity.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED
  },
  {
    id: 185,
    name: "Four score and seven years ago",
    description: "Encounter the fourth Pelle Strike.",
    checkRequirement: () => PelleStrikes.ECs.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED
  },
  {
    id: 186,
    displayId: 181,
    name: "An unhealthy obsession",
    description: `Purchase Time Study 181 while Doomed.`,
  },
  {
    id: 187,
    name: "The One with Dilated Time",
    description: "Unlock Dilation while Doomed.",
    checkRequirement: () => PelleStrikes.dilation.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED,
    // We forgot to disable a singularity milestone while balancing Pelle; now it's disabled
    // and this upgrade has the same effect as it used to.
    get reward() {
      return t("ach.reward.187", `Increase the multiplier per repeatable Dilated Time
      multiplier upgrade by {0}.`,
      formatX(1.35, 0, 2));
    },
    effect: 1.35
  },
  {
    id: 188,
    name: "The End",
    description: "Beat the game.",
    checkRequirement: () => GameEnd.endState > END_STATE_MARKERS.GAME_END && !GameEnd.removeAdditionalEnd,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
];
