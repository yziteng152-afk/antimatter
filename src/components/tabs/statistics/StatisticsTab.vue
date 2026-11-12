<script>
import { MatterScale } from "./matter-scale";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "StatisticsTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      realTimeDoomed: TimeSpan.zero,
      totalAntimatter: new Decimal(0),
      realTimePlayed: TimeSpan.zero,
      timeSinceCreation: 0,
      uniqueNews: 0,
      totalNews: 0,
      secretAchievementCount: 0,
      infinity: {
        isUnlocked: false,
        count: new Decimal(0),
        banked: new Decimal(0),
        projectedBanked: new Decimal(0),
        bankRate: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      eternity: {
        isUnlocked: false,
        count: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      reality: {
        isUnlocked: false,
        count: 0,
        best: TimeSpan.zero,
        bestReal: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        totalTimePlayed: TimeSpan.zero,
        bestRate: new Decimal(0),
        bestRarity: 0,
      },
      matterScale: [],
      lastMatterTime: 0,
      paperclips: 0,
      fullTimePlayed: 0,
    };
  },
  computed: {
    // These are here to avoid extra spaces in-game pre-reality and to get around codefactor 120-char limits in the
    // HTML template due to the fact that adding a linebreak also adds a space
    infinityCountString() {
      const num = this.infinity.count;
      return num.gt(0)
        ? this.t("stats.infinityAmount", "{0} Infinities", this.formatDecimalAmount(num))
        : this.t("stats.noInfinities", "no Infinities");
    },
    eternityCountString() {
      const num = this.eternity.count;
      return num.gt(0)
        ? this.t("stats.eternityAmount", "{0} Eternities", this.formatDecimalAmount(num))
        : this.t("stats.noEternities", "no Eternities");
    },
    fullGameCompletions() {
      return player.records.fullGameCompletions;
    },
    startDate() {
      return Time.toDateTimeString(player.records.gameCreatedTime);
    },
    saveAge() {
      return TimeSpan.fromMilliseconds(this.timeSinceCreation);
    },
  },
  methods: {
    update() {
      const records = player.records;
      this.totalAntimatter.copyFrom(records.totalAntimatter);
      this.realTimePlayed.setFrom(records.realTimePlayed);
      this.fullTimePlayed = TimeSpan.fromMilliseconds(records.previousRunRealTime + records.realTimePlayed);
      this.uniqueNews = NewsHandler.uniqueTickersSeen;
      this.totalNews = player.news.totalSeen;
      this.secretAchievementCount = SecretAchievements.all.filter(a => a.isUnlocked).length;
      this.timeSinceCreation = Date.now() - player.records.gameCreatedTime;

      const progress = PlayerProgress.current;
      const isInfinityUnlocked = progress.isInfinityUnlocked;
      const infinity = this.infinity;
      const bestInfinity = records.bestInfinity;
      infinity.isUnlocked = isInfinityUnlocked;
      if (isInfinityUnlocked) {
        infinity.count.copyFrom(Currency.infinities);
        infinity.banked.copyFrom(Currency.infinitiesBanked);
        infinity.projectedBanked = new Decimal(0).plusEffectsOf(
          Achievement(131).effects.bankedInfinitiesGain,
          TimeStudy(191)
        );
        infinity.bankRate = infinity.projectedBanked.div(Math.clampMin(33, records.thisEternity.time)).times(60000);
        infinity.hasBest = bestInfinity.time < 999999999999;
        infinity.best.setFrom(bestInfinity.time);
        infinity.this.setFrom(records.thisInfinity.time);
        infinity.bestRate.copyFrom(bestInfinity.bestIPminEternity);
      }

      const isEternityUnlocked = progress.isEternityUnlocked;
      const eternity = this.eternity;
      const bestEternity = records.bestEternity;
      eternity.isUnlocked = isEternityUnlocked;
      if (isEternityUnlocked) {
        eternity.count.copyFrom(Currency.eternities);
        eternity.hasBest = bestEternity.time < 999999999999;
        eternity.best.setFrom(bestEternity.time);
        eternity.this.setFrom(records.thisEternity.time);
        eternity.bestRate.copyFrom(bestEternity.bestEPminReality);
      }

      const isRealityUnlocked = progress.isRealityUnlocked;
      const reality = this.reality;
      const bestReality = records.bestReality;
      reality.isUnlocked = isRealityUnlocked;

      if (isRealityUnlocked) {
        reality.count = Math.floor(Currency.realities.value);
        reality.best.setFrom(bestReality.time);
        reality.bestReal.setFrom(bestReality.realTime);
        reality.this.setFrom(records.thisReality.time);
        reality.totalTimePlayed.setFrom(records.totalTimePlayed);
        // Real time tracking is only a thing once reality is unlocked:
        infinity.thisReal.setFrom(records.thisInfinity.realTime);
        infinity.bankRate = infinity.projectedBanked.div(Math.clampMin(33, records.thisEternity.realTime)).times(60000);
        eternity.thisReal.setFrom(records.thisEternity.realTime);
        reality.thisReal.setFrom(records.thisReality.realTime);
        reality.bestRate.copyFrom(bestReality.RMmin);
        reality.bestRarity = Math.max(strengthToRarity(bestReality.glyphStrength), 0);
      }
      this.updateMatterScale();

      this.isDoomed = Pelle.isDoomed;
      this.realTimeDoomed.setFrom(player.records.realTimeDoomed);
      this.paperclips = player.news.specialTickerData.paperclips;
    },
    formatDecimalAmount(value) {
      return value.gt(1e9) ? format(value, 3) : formatInt(Math.floor(value.toNumber()));
    },
    // Only updates once per second to reduce jitter
    updateMatterScale() {
      if (Date.now() - this.lastMatterTime > 1000) {
        this.matterScale = MatterScale.estimate(Currency.antimatter.value);
        this.lastMatterTime = Date.now();
      }
    },
    realityClassObject() {
      return {
        "c-stats-tab-title": true,
        "c-stats-tab-reality": !this.isDoomed,
        "c-stats-tab-doomed": this.isDoomed,
      };
    }
  },
};
</script>

<template>
  <div class="c-stats-tab">
    <div>
      <PrimaryButton onclick="Modal.catchup.show(0)">
        {{ t("stats.viewContentSummary", "View Content Summary") }}
      </PrimaryButton>
      <div class="c-stats-tab-title c-stats-tab-general">
        {{ t("stats.general", "General") }}
      </div>
      <div class="c-stats-tab-general">
        <div>
          {{
            t("stats.totalAntimatter",
              "You have made a total of {0} antimatter.",
              format(totalAntimatter, 2, 1))
          }}
        </div>
        <div>
          {{ t("stats.realTimePlayed", "You have played for {0}. (real time)", realTimePlayed) }}
        </div>
        <div v-if="reality.isUnlocked">
          {{
            t("stats.gameTimePlayed",
              "Your existence has spanned {0} of time. (game time)",
              reality.totalTimePlayed)
          }}
        </div>
        <div>
          {{ t("stats.saveCreated", "Your save was created on {0} ({1} ago)", startDate, saveAge) }}
        </div>
        <br>
        <div>
          {{ t("stats.newsSeen", "You have seen {0} news messages in total.", formatInt(totalNews)) }}
        </div>
        <div>
          {{ t("stats.uniqueNewsSeen", "You have seen {0} unique news messages.", formatInt(uniqueNews)) }}
        </div>
        <div>
          {{
            t("stats.secretAchievements",
              "You have unlocked {0} Secret Achievements.",
              formatInt(secretAchievementCount))
          }}
        </div>
        <div v-if="paperclips">
          {{ t("stats.paperclips", "You have {0} useless paperclips.", formatInt(paperclips)) }}
        </div>
        <div v-if="fullGameCompletions">
          <br>
          <b>
            {{
              t("stats.fullGameCompletions",
                "You have completed the entire game {0} times.",
                formatInt(fullGameCompletions))
            }}
            <br>
            {{
              t("stats.fullTimePlayed",
                "You have played for {0} across all playthroughs.",
                fullTimePlayed)
            }}
          </b>
        </div>
      </div>
      <div>
        <br>
        <div class="c-matter-scale-container c-stats-tab-general">
          <div
            v-for="(line, i) in matterScale"
            :key="i"
          >
            {{ line }}
          </div>
          <br v-if="matterScale.length < 2">
          <br v-if="matterScale.length < 3">
        </div>
      </div>
      <br>
    </div>
    <div
      v-if="infinity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-infinity">
        {{ t("stats.infinity", "Infinity") }}
      </div>
      <div v-if="eternity.isUnlocked">
        {{ t("stats.youHaveThisEternity", "You have {0} this Eternity.", infinityCountString) }}
      </div>
      <div v-else>
        {{ t("stats.youHave", "You have {0}.", infinityCountString) }}
      </div>
      <div v-if="infinity.banked.gt(0)">
        {{
          t("stats.bankedInfinities",
            "You have {0} Banked Infinities.",
            formatDecimalAmount(infinity.banked.floor()))
        }}
      </div>
      <div v-if="infinity.hasBest">
        {{ t("stats.fastestInfinity", "Your fastest Infinity was {0}.", infinity.best.toStringShort()) }}
      </div>
      <div v-else-if="eternity.isUnlocked">
        {{ t("stats.noFastestInfinityThisEternity", "You have no fastest Infinity this Eternity.") }}
      </div>
      <div v-else>
        {{ t("stats.noFastestInfinity", "You have no fastest Infinity.") }}
      </div>
      <div v-if="reality.isUnlocked">
        {{
          t("stats.spentThisInfinityRealTime",
            "You have spent {0} in this Infinity. ({1} real time)",
            infinity.this.toStringShort(),
            infinity.thisReal.toStringShort())
        }}
      </div>
      <div v-else>
        {{
          t("stats.spentThisInfinity",
            "You have spent {0} in this Infinity.",
            infinity.this.toStringShort())
        }}
      </div>
      <div v-if="eternity.count.gt(0)">
        {{
          t("stats.bestIPminThisEternity",
            "Your best Infinity Points per minute this Eternity is {0}.",
            format(infinity.bestRate, 2, 2))
        }}
      </div>
      <div v-else>
        {{
          t("stats.bestIPmin",
            "Your best Infinity Points per minute is {0}.",
            format(infinity.bestRate, 2, 2))
        }}
      </div>
      <br>
    </div>
    <div
      v-if="eternity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-eternity">
        {{ t("stats.eternity", "Eternity") }}
      </div>
      <div v-if="reality.isUnlocked">
        {{ t("stats.youHaveThisReality", "You have {0} this Reality.", eternityCountString) }}
      </div>
      <div v-else>
        {{ t("stats.youHave", "You have {0}.", eternityCountString) }}
      </div>
      <div v-if="infinity.projectedBanked.gt(0)">
        {{
          t("stats.willGainBanked",
            "You will gain {0} Banked Infinities on Eternity ({1} per minute).",
            formatDecimalAmount(infinity.projectedBanked.floor()),
            formatDecimalAmount(infinity.bankRate))
        }}
      </div>
      <div v-else-if="infinity.banked.gt(0)">
        {{ t("stats.noBankedOnEternity", "You will gain no Banked Infinities on Eternity.") }}
      </div>
      <div v-if="eternity.hasBest">
        {{ t("stats.fastestEternity", "Your fastest Eternity was {0}.", eternity.best.toStringShort()) }}
      </div>
      <div v-else-if="reality.isUnlocked">
        {{ t("stats.noFastestEternityThisReality", "You have no fastest Eternity this Reality.") }}
      </div>
      <div v-else>
        {{ t("stats.noFastestEternity", "You have no fastest Eternity.") }}
      </div>
      <div v-if="reality.isUnlocked">
        {{
          t("stats.spentThisEternityRealTime",
            "You have spent {0} in this Eternity. ({1} real time)",
            eternity.this.toStringShort(),
            eternity.thisReal.toStringShort())
        }}
      </div>
      <div v-else>
        {{
          t("stats.spentThisEternity",
            "You have spent {0} in this Eternity.",
            eternity.this.toStringShort())
        }}
      </div>
      <div v-if="reality.isUnlocked">
        {{
          t("stats.bestEPminThisReality",
            "Your best Eternity Points per minute this Reality is {0}.",
            format(eternity.bestRate, 2, 2))
        }}
      </div>
      <div v-else>
        {{
          t("stats.bestEPmin",
            "Your best Eternity Points per minute is {0}.",
            format(eternity.bestRate, 2, 2))
        }}
      </div>
      <br>
    </div>
    <div
      v-if="reality.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div :class="realityClassObject()">
        {{ isDoomed ? t("stats.doomedReality", "Doomed Reality") : t("stats.reality", "Reality") }}
      </div>
      <div>
        {{ t("stats.youHave", "You have {0}.", t("stats.realityAmount", "{0} Realities", formatInt(reality.count))) }}
      </div>
      <div>
        {{
          t("stats.fastestRealityGameTime",
            "Your fastest game-time Reality was {0}.",
            reality.best.toStringShort())
        }}
      </div>
      <div>
        {{
          t("stats.fastestRealityRealTime",
            "Your fastest real-time Reality was {0}.",
            reality.bestReal.toStringShort())
        }}
      </div>
      <div :class="{ 'c-stats-tab-doomed' : isDoomed }">
        {{
          t("stats.spentInRealm",
            "You have spent {0} in this {1}. ({2} real time)",
            reality.this.toStringShort(),
            isDoomed ? t("stats.armageddon", "Armageddon") : t("stats.reality", "Reality"),
            reality.thisReal.toStringShort())
        }}
      </div>
      <div
        v-if="isDoomed"
        class="c-stats-tab-doomed"
      >
        {{
          t("stats.doomedFor", "You have been Doomed for {0}, real time.", realTimeDoomed.toStringShort())
        }}
      </div>
      <div>
        {{
          t("stats.bestRMmin", "Your best Reality Machines per minute is {0}.", format(reality.bestRate, 2, 2))
        }}
      </div>
      <div>
        {{ t("stats.bestGlyphRarity", "Your best Glyph rarity is {0}.", formatRarity(reality.bestRarity)) }}
      </div>
      <br>
    </div>
  </div>
</template>

<style scoped>
.c-matter-scale-container {
  height: 5rem;
}

.c-stats-tab-general {
  color: var(--color-text);
}

.c-stats-tab-title {
  font-size: 2rem;
  font-weight: bold;
}

.c-stats-tab-subheader {
  height: 15rem;
}

.c-stats-tab-infinity {
  color: var(--color-infinity);
}

.c-stats-tab-eternity {
  color: var(--color-eternity);
}

.c-stats-tab-reality {
  color: var(--color-reality);
}

.c-stats-tab-doomed {
  color: var(--color-pelle--base);
}
</style>