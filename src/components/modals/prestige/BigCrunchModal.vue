<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

import { enumerate } from "@/core/i18n";

export default {
  name: "BigCrunchModal",
  components: {
    ResetModal
  },
  data() {
    return {
      gainedInfinities: new Decimal(),
      gainedInfinityPoints: new Decimal(),
      startingBoosts: 0,
      startingAM: 10,
      willStartWithGalaxy: false
    };
  },
  computed: {
    isFirstInfinity() {
      return !PlayerProgress.infinityUnlocked();
    },
    message() {
      const info = this.isFirstInfinity ? this.firstInfinityInfo : ``;
      return this.t("pres.bigCrunch.message",
        `Upon Infinity, all Dimensions, Dimension Boosts, and Antimatter Galaxies are reset. {0}`, info);
    },
    firstInfinityInfo() {
      return this.t("pres.bigCrunch.firstInfinityInfo",
        `In return, you gain an Infinity Point (IP). This allows you to buy multiple upgrades that you can
        find in the Infinity tab. You will also gain one Infinity, which is the stat shown in the Statistics tab.`);
    },
    ipGainInfo() {
      return this.t("pres.bigCrunch.ipGain", `You will gain {0}
        and {1}.`,
      quantify("Infinity", this.gainedInfinities, 2, 0), quantify("Infinity Point", this.gainedInfinityPoints, 2, 0));
    },
    startingResources() {
      const gainedResources = [];
      if (this.startingAM.gte(10)) gainedResources.push(`${quantify("Antimatter", this.startingAM, 2, 1)}`);
      if (this.startingBoosts > 0) gainedResources.push(`${quantify("Dimension Boost", this.startingBoosts)}`);
      if (this.willStartWithGalaxy) gainedResources.push(`${quantify("Galaxy", 1)}`);

      return this.t("pres.bigCrunch.startingResources", "You will start your next Infinity with {0}.",
        enumerate(gainedResources));
    }
  },
  methods: {
    update() {
      this.gainedInfinities = gainedInfinities().round();
      this.gainedInfinityPoints = gainedInfinityPoints().round();
      this.startingBoosts = DimBoost.startingDimensionBoosts;
      this.startingAM = Currency.antimatter.startingValue;
      this.willStartWithGalaxy = InfinityUpgrade.skipResetGalaxy.isBought;
    },
    handleYesClick() {
      bigCrunchResetRequest();
      EventHub.ui.offAll(this);
      if (this.isFirstInfinity) {
        setTimeout(() => Modal.message.show(this.t("pres.bigCrunch.animationNote",
          `This animation will occur after every manually-triggered Infinity. If
          you would like to disable it, there is a setting to do so in the Options tab. This can be done for any
          visual animation effect in the game after seeing it for the first time.`), {}, 3), 2000);
      }
    }
  },
};
</script>

<template>
  <ResetModal
    :header="t('pres.bigCrunch.header', 'You are about to Infinity')"
    :message="message"
    :gained-resources="ipGainInfo"
    :starting-resources="startingResources"
    :confirm-fn="handleYesClick"
    :alternate-condition="isFirstInfinity"
    :alternate-text="message"
    :confirm-option="isFirstInfinity ? undefined : 'bigCrunch'"
  />
</template>
