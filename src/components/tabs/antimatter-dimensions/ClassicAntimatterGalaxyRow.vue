<script>
import PrimaryButton from "@/components/PrimaryButton";

import { enumerate } from "@/core/i18n";

export default {
  name: "ClassicAntimatterGalaxyRow",
  components: {
    PrimaryButton
  },
  data() {
    return {
      type: GALAXY_TYPE.NORMAL,
      galaxies: {
        normal: 0,
        replicanti: 0,
        dilation: 0
      },
      requirement: {
        tier: 1,
        amount: 0
      },
      canBeBought: false,
      distantStart: 0,
      remoteStart: 0,
      lockText: null,
      canBulkBuy: false,
      creditsClosed: false,
      scalingText: {
        distant: null,
        remote: null,
      },
      hasTutorial: false,
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    dimName() {
      return AntimatterDimension(this.requirement.tier).displayName;
    },
    buttonText() {
      if (this.lockText !== null) return this.lockText;
      const reset = [];
      if (!Achievement(111).isUnlocked) reset.push(this.t("dim.galaxyResetDims", "Dimensions"));
      if (!Achievement(143).isUnlocked) reset.push(this.t("dim.galaxyResetBoosts", "Dimension Boosts"));
      return reset.length === 0
        ? this.t("dim.galaxyPower", "Increase the power of Tickspeed upgrades")
        : this.t("dim.galaxyReset", "Reset your {0} to increase the power of Tickspeed upgrades",
          enumerate(reset));
    },
    sumText() {
      const parts = [Math.max(this.galaxies.normal, 0)];
      if (this.galaxies.replicanti > 0) parts.push(this.galaxies.replicanti);
      if (this.galaxies.dilation > 0) parts.push(this.galaxies.dilation);
      const sum = parts.map(this.formatGalaxies).join(" + ");
      if (parts.length >= 2) {
        return `${sum} = ${this.formatGalaxies(parts.sum())}`;
      }
      return sum;
    },
    typeName() {
      switch (this.type) {
        case GALAXY_TYPE.NORMAL: return this.t("dim.galaxyNormal", "Antimatter Galaxies");
        case GALAXY_TYPE.DISTANT: return this.t("dim.galaxyDistant", "Distant Antimatter Galaxies");
        case GALAXY_TYPE.REMOTE: return this.t("dim.galaxyRemote", "Remote Antimatter Galaxies");
      }
      return undefined;
    },
    hasIncreasedScaling() {
      return this.type !== GALAXY_TYPE.NORMAL;
    },
    costScalingText() {
      switch (this.type) {
        case GALAXY_TYPE.DISTANT:
          return this.t("dim.galaxyScaling", "Each Galaxy is more expensive past {0}",
            quantifyInt("Galaxy", this.distantStart), formatInt(this.distantStart));
        case GALAXY_TYPE.REMOTE: {
          const scalings = [
            { type: "distant", function: "quadratic", amount: this.distantStart },
            { type: "remote", function: "exponential", amount: this.remoteStart }
          ];
          return this.t("dim.galaxyScalingRemote", "Increased Galaxy cost scaling: {0}",
            scalings.sort((a, b) => a.amount - b.amount)
              .map(scaling => (scaling.function === "quadratic"
                ? this.t("dim.scalingQuadratic",
                  "quadratic scaling past {0} (distant)", this.formatGalaxies(scaling.amount))
                : this.t("dim.scalingExponential",
                  "exponential scaling past {0} (remote)", this.formatGalaxies(scaling.amount))))
              .join(this.t("common.listSeparator", ", ")));
        }
      }
      return undefined;
    },
    galaxyText() {
      const tier = this.requirement.tier;
      const label = this.t("dim.galaxyLabel", "{0} ({1}):", this.typeName, this.sumText);
      const requires = this.t("dim.requires", "requires {0} {1} Dimensions",
        formatInt(this.requirement.amount), this.dimName, tier);
      return `${label} ${requires}`;
    },
    classObject() {
      return {
        "o-primary-btn--galaxy l-dim-row__prestige-button": true,
        "tutorial--glow": this.canBeBought && this.hasTutorial,
        "o-pelle-disabled-pointer": this.creditsClosed,
      };
    }
  },
  methods: {
    update() {
      this.type = Galaxy.type;
      this.galaxies.normal = player.galaxies + GalaxyGenerator.galaxies;
      this.galaxies.replicanti = Replicanti.galaxies.total;
      this.galaxies.dilation = player.dilation.totalTachyonGalaxies;
      const requirement = Galaxy.requirement;
      this.requirement.amount = requirement.amount;
      this.requirement.tier = requirement.tier;
      this.canBeBought = requirement.isSatisfied && Galaxy.canBeBought;
      this.distantStart = EternityChallenge(5).isRunning ? 0 : Galaxy.costScalingStart;
      this.remoteStart = Galaxy.remoteStart;
      this.lockText = Galaxy.lockText;
      this.canBulkBuy = EternityMilestone.autobuyMaxGalaxies.isReached;
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.hasTutorial = Tutorial.isActive(TUTORIAL_STATE.GALAXY);
    },
    buyGalaxy(bulk) {
      if (!this.canBeBought) return;
      manualRequestGalaxyReset(this.canBulkBuy && bulk);
    },
    formatGalaxies(num) {
      return num > 1e8 ? format(num, 2) : formatInt(num);
    },
  }
};
</script>

<template>
  <div class="c-dimension-row c-antimatter-dim-row c-antimatter-prestige-row">
    <div
      class="l-dim-row__prestige-text c-dim-row__label c-dim-row__label--amount l-text-wrapper"
    >
      {{ galaxyText }}
      <div class="l-scaling-text-wrapper">
        {{ hasIncreasedScaling ? costScalingText : "" }}
      </div>
    </div>
    <PrimaryButton
      :enabled="canBeBought"
      :class="classObject"
      @click.exact="buyGalaxy(true)"
      @click.shift.exact="buyGalaxy(false)"
    >
      {{ buttonText }}
      <div
        v-if="hasTutorial"
        class="fas fa-circle-exclamation l-notification-icon"
      />
    </PrimaryButton>
  </div>
</template>

<style scoped>
.l-text-wrapper {
  height: 6rem;
}

.l-scaling-text-wrapper {
  height: 2rem;
}

.o-primary-btn--galaxy {
  width: 22rem;
  height: 5.5rem;
  position: relative;
  font-size: 0.9rem;
}
</style>
