<script>
import { enumerate } from "@/core/i18n";

export default {
  name: "ModernAntimatterGalaxyRow",
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
      return AntimatterDimension(this.requirement.tier).shortDisplayName;
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
    galaxyLabelText() {
      return this.t("dim.galaxyLabel", "{0} ({1}):", this.typeName, this.sumText);
    },
    requiresText() {
      const tier = this.requirement.tier;
      return this.t("dim.requires", "Requires: {0} {1} Antimatter D",
        formatInt(this.requirement.amount), this.dimName, tier);
    },
    classObject() {
      return {
        "o-primary-btn o-primary-btn--new o-primary-btn--dimension-reset": true,
        "tutorial--glow": this.canBeBought && this.hasTutorial,
        "o-primary-btn--disabled": !this.canBeBought,
        "o-pelle-disabled-pointer": this.creditsClosed
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
      if (this.isDoomed) {
        this.scalingText = {
          distant: this.formatGalaxies(this.distantStart),
          remote: this.formatGalaxies(Galaxy.remoteStart),
        };
      }
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
  <div class="reset-container galaxy">
    <h4>{{ galaxyLabelText }}</h4>
    <span>{{ requiresText }}</span>
    <span v-if="hasIncreasedScaling">{{ costScalingText }}</span>
    <button
      :class="classObject"
      @click.exact="buyGalaxy(true)"
      @click.shift.exact="buyGalaxy(false)"
    >
      {{ buttonText }}
      <div
        v-if="hasTutorial"
        class="fas fa-circle-exclamation l-notification-icon"
      />
    </button>
  </div>
</template>
