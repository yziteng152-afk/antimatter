<script>
import GameSpeedDisplay from "@/components/GameSpeedDisplay";

export default {
  name: "HeaderTickspeedInfo",
  components: {
    GameSpeedDisplay
  },
  data() {
    return {
      mult: new Decimal(0),
      tickspeed: new Decimal(0),
      galaxyCount: 0,
      purchasedTickspeed: 0,
      freeTickspeed: 0,
    };
  },
  computed: {
    tickspeedDisplay() {
      return this.t("header.totalTickspeed", "Total Tickspeed: {0} / sec", format(this.tickspeed, 2, 3));
    },
    perUpgrade() {
      if (InfinityChallenge(3).isRunning) {
        return this.t("header.tickspeedGiveIC3", "Tickspeed upgrades give {0} to all ADs",
          formatX(1.05 + this.galaxyCount * 0.005, 3, 3));
      }
      return this.t("header.adsFaster", "ADs produce {0} faster per Tickspeed upgrade",
        formatX(this.mult.reciprocal(), 2, 3));
    },
  },
  methods: {
    update() {
      this.mult.copyFrom(Tickspeed.multiplier);
      this.tickspeed.copyFrom(Tickspeed.perSecond);
      this.galaxyCount = player.galaxies;
      this.purchasedTickspeed = player.totalTickBought;
      this.freeTickspeed = FreeTickspeed.amount;
    },
  },
};
</script>

<template>
  <div>
    <br>
    {{ perUpgrade }}
    <br>
    {{ tickspeedDisplay }}
    <br>
    <GameSpeedDisplay />
  </div>
</template>

<style scoped>

</style>
