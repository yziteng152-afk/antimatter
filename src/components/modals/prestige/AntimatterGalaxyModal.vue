<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

import { enumerate } from "@/core/i18n";

export default {
  name: "AntimatterGalaxyModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      newGalaxies: 0,
      keepAntimatter: false,
      perkANRBought: false,
      keepDimBoost: false
    };
  },
  computed: {
    topLabel() {
      if (this.bulk) {
        return this.t("pres.ag.bulkHeader", "You are about to purchase {0}",
          quantifyInt("Antimatter Galaxy", this.newGalaxies));
      }
      return this.t("pres.ag.header", "You are about to purchase an Antimatter Galaxy");
    },
    message() {
      const resetResouces = [];
      if (Pelle.isDoomed) {
        resetResouces.push(this.t("pres.ag.res.antimatter", "Antimatter"),
          this.t("pres.ag.res.dimensions", "Antimatter Dimensions"),
          this.t("pres.ag.res.tickspeed", "Tickspeed"));
      }
      if (!this.perkANRBought) {
        resetResouces.push(this.t("pres.ag.res.dimensions", "Antimatter Dimensions"),
          this.t("pres.ag.res.tickspeed", "Tickspeed"));
      }
      if (!this.keepDimBoost) resetResouces.push(this.t("pres.ag.res.dimBoosts", "Dimension Boosts"));
      if (!this.keepAntimatter && !this.perkANRBought) {
        resetResouces.push(this.t("pres.ag.res.antimatter", "Antimatter"));
      }
      const resetList = enumerate(resetResouces);
      let tickspeedFixed = "";
      if (InfinityChallenge(3).isRunning) {
        tickspeedFixed = this.t("pres.ag.infinityChallenge", "Infinity Challenge {0}", InfinityChallenge(3).id);
      } else if (Ra.isRunning) {
        tickspeedFixed = this.t("pres.ag.raReality", "{0}'s Reality", this.tr(Ra.displayName));
      }
      const tickspeedInfo = (tickspeedFixed === "")
        ? this.t("pres.ag.tickspeedBoost", "you will receive a small boost to Tickspeed Upgrades.")
        : this.t("pres.ag.tickspeedNoBoost",
          "you will not receive a boost to Tickspeed Upgrades, because you are in {0}.", tickspeedFixed);
      const message = (resetList === "")
        ? this.t("pres.ag.resetNothing", "This will reset nothing, and {0}", tickspeedInfo)
        : this.t("pres.ag.resetList", "This will reset your {0}. However, {1}", resetList, tickspeedInfo);

      if (this.bulk) {
        return this.t("pres.ag.confirmBulk", "Are you sure you want to purchase {0}? {1}",
          quantifyInt("Antimatter Galaxy", this.newGalaxies), message);
      }
      return this.t("pres.ag.confirmSingle",
        "Are you sure you want to purchase an Antimatter Galaxy? {0}", message);
    }
  },
  created() {
    this.on$(GAME_EVENT.DIMBOOST_AFTER, () =>
      (BreakInfinityUpgrade.autobuyMaxDimboosts.isBought ? undefined : this.emitClose()));
  },
  methods: {
    update() {
      if (this.bulk) {
        const req = Galaxy.requirement;
        const dim = AntimatterDimension(req.tier);
        const bulk = bulkBuyBinarySearch(dim.totalAmount, {
          costFunction: x => Galaxy.requirementAt(x).amount,
          cumulative: false,
        }, player.galaxies);
        if (bulk) {
          this.newGalaxies = Galaxy.buyableGalaxies(Math.round(dim.totalAmount.toNumber())) - player.galaxies;
        }
      }
      this.keepAntimatter = Achievement(111).isUnlocked;
      this.perkANRBought = Perk.antimatterNoReset.canBeApplied;
      this.keepDimBoost = (Achievement(143).isUnlocked && !Pelle.isDoomed) ||
        PelleUpgrade.galaxyNoResetDimboost.canBeApplied;
    },
    handleYesClick() {
      requestGalaxyReset(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="antimatterGalaxy"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>

    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
