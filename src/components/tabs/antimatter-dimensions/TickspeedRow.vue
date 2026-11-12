<script>
export default {
  name: "TickspeedRow",
  data() {
    return {
      purchasedTickspeed: 0,
      freeTickspeed: 0,
      isVisible: false,
      mult: new Decimal(0),
      cost: new Decimal(0),
      isAffordable: false,
      tickspeed: new Decimal(0),
      gameSpeedMult: 1,
      galaxyCount: 0,
      isContinuumActive: false,
      continuumValue: 0,
      hasTutorial: false,
      hasRealityButton: false,
      isEC9: false,
    };
  },
  computed: {
    classObject() {
      return {
        "l-tickspeed-container": true,
        "l-tickspeed-container--hidden": !this.isVisible
      };
    },
    multiplierDisplay() {
      if (InfinityChallenge(3).isRunning) {
        return this.t("dim.tickspeedMultIC3", "Multiply all Antimatter Dimensions by {0}",
          formatX(1.05 + this.galaxyCount * 0.005, 3, 3));
      }
      const tickmult = this.mult;
      return this.t("dim.tickspeedFaster", "{0} faster / upgrade.", formatX(tickmult.reciprocal(), 2, 3));
    },
    tickspeedDisplay() {
      return this.t("dim.tickspeed", "Tickspeed: {0} / sec", format(this.tickspeed, 2, 3));
    },
    continuumString() {
      return formatFloat(this.continuumValue, 2);
    },
    upgradeCount() {
      const purchased = this.purchasedTickspeed;
      if (!this.freeTickspeed) {
        return this.t("dim.purchasedUpgrades", "{0} Purchased Upgrades",
          quantifyInt("Purchased Upgrade", purchased), formatInt(purchased));
      }
      if (purchased === 0 || this.isContinuumActive) {
        return this.t("dim.freeUpgrades", "{0} Free Upgrades", formatInt(this.freeTickspeed));
      }
      return this.t("dim.purchasedAndFree", "{0} Purchased + {1} Free",
        formatInt(purchased), formatInt(this.freeTickspeed));
    }
  },
  methods: {
    update() {
      this.hasRealityButton = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
      this.purchasedTickspeed = player.totalTickBought;
      this.freeTickspeed = FreeTickspeed.amount;
      this.isEC9 = EternityChallenge(9).isRunning;
      this.isVisible = Tickspeed.isUnlocked || this.isEC9;
      if (!this.isVisible) return;
      this.mult.copyFrom(Tickspeed.multiplier);
      this.cost.copyFrom(Tickspeed.cost);
      this.isAffordable = Tickspeed.isAvailableForPurchase && Tickspeed.isAffordable;
      this.tickspeed.copyFrom(Tickspeed.perSecond);
      this.gameSpeedMult = getGameSpeedupForDisplay();
      this.galaxyCount = player.galaxies;
      this.isContinuumActive = Laitela.continuumActive;
      if (this.isContinuumActive) this.continuumValue = Tickspeed.continuumValue;
      this.hasTutorial = Tutorial.isActive(TUTORIAL_STATE.TICKSPEED);
    },
    buttonClass() {
      return {
        "o-primary-btn": true,
        "tickspeed-btn": true,
        "o-primary-btn--disabled": !this.isAffordable && !this.isContinuumActive,
        "o-non-clickable o-continuum": this.isContinuumActive,
        "tutorial--glow": this.isAffordable && this.hasTutorial
      };
    },
  }
};
</script>

<template>
  <div :class="classObject">
    <div class="tickspeed-buttons">
      <button
        v-tooltip="upgradeCount"
        :class="buttonClass()"
        onclick="buyTickSpeed()"
      >
        <span v-if="isContinuumActive">
          {{ t("dim.tickspeedContinuum", "Tickspeed Continuum: {0}", continuumString) }}
        </span>
        <span v-else-if="isEC9">
          {{ t("dim.tickspeedUnpurchasable", "Tickspeed Unpurchasable (EC 9)") }}
        </span>
        <span v-else>
          {{ t("dim.tickspeedCost", "Tickspeed Cost: {0}", format(cost)) }}
        </span>
        <div
          v-if="hasTutorial"
          class="fas fa-circle-exclamation l-notification-icon"
        />
      </button>
      <button
        v-if="!isContinuumActive"
        class="o-primary-btn tickspeed-max-btn"
        :class="{ 'o-primary-btn--disabled': !isAffordable && !isContinuumActive }"
        onclick="buyMaxTickSpeed()"
      >
        {{ t("dim.maxAllButton", "Buy Max") }}
      </button>
    </div>
    <div
      v-if="hasRealityButton"
      class="tickspeed-labels"
    >
      {{ tickspeedDisplay }} | {{ multiplierDisplay }}
    </div>
  </div>
</template>

<style scoped>
.o-primary-btn {
  position: relative;
  vertical-align: middle;
}

.tickspeed-btn {
  position: relative;
  width: 30rem;
  height: 2.5rem;
  padding: 0.25rem;
}

.tickspeed-labels {
  color: var(--color-text);
  padding: 0.25rem;
}

.l-tickspeed-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;
}

.l-tickspeed-container--hidden {
  visibility: hidden;
}

.tickspeed-max-btn {
  margin-left: 0.5rem;
  width: 10rem;
  height: 2.5rem;
  padding: 0.25rem;
}

.o-non-clickable {
  cursor: auto;
}

.o-continuum {
  border-color: var(--color-laitela--accent);
  color: var(--color-laitela--accent);
  background: var(--color-laitela--base);
}

.o-continuum:hover {
  border-color: var(--color-laitela--accent);
  color: var(--color-laitela--base);
  background: var(--color-laitela--accent);
}
</style>
