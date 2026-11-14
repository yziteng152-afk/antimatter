<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "PelleEffectsModal",
  components: {
    PrimaryButton,
    ModalWrapper,
  },
  computed: {
    nerfs() {
      return [
        // Numerical nerfs and disabled boosts
        this.t("misc.pelle.nerf.noUpgradeUnlock",
          "Anything unlocked through a Pelle upgrade cannot be unlocked normally"),
        this.t("misc.pelle.nerf.preDoomedMult", "All pre-Doomed IP and EP multipliers are disabled"),
        this.t("misc.pelle.nerf.ipGen", "IP generation based on fastest infinity speed is disabled"),
        this.t("misc.pelle.nerf.replicantiMult", "All pre-Doomed Replicanti speed multipliers are disabled"),
        this.t("misc.pelle.nerf.replicantiSlow",
          "Replicanti slows down more drastically above {0}", format(Number.MAX_VALUE, 2)),
        this.t("misc.pelle.nerf.ecHarder", "Most Eternity Challenges are harder"),
        this.t("misc.pelle.nerf.galaxy",
          "All Galaxies are only {0} as effective", formatPercents(0.5)),
        this.t("misc.pelle.nerf.adMult",
          "Antimatter Dimension multiplier is divided by {0}", formatInt(10)),
        this.t("misc.pelle.nerf.achievement",
          "Achievement multiplier and many achievement rewards are disabled"),
        this.t("misc.pelle.nerf.infEter",
          "All Infinity and Eternity multipliers and generation are disabled"),
        this.t("misc.pelle.nerf.blackHole", "Black Holes are disabled"),
        this.t("misc.pelle.nerf.temporalTranscendence",
          "Reality Upgrade \"Temporal Transcendence\" is disabled"),

        // Initial QoL and automation
        this.t("misc.pelle.nerf.startingResources",
          "All rewards which increase your starting resources except Achievement 21 are disabled"),
        this.t("misc.pelle.nerf.preventReset",
          "All rewards which prevent resources from being reset are disabled"),
        this.t("misc.pelle.nerf.perkCost",
          "Perk rewards which reduce unlock costs have been disabled, excluding the ECR group"),
        this.t("misc.pelle.nerf.autoChallenges", "Automatic Infinity and Eternity Challenges are disabled"),
        this.t("misc.pelle.nerf.autobuyers",
          "All Dimension and pre-Infinity Autobuyers are disabled until reacquired through Pelle"),
        this.t("misc.pelle.nerf.ttAutobuyer", "The Time Theorem Autobuyer is disabled"),
        this.t("misc.pelle.nerf.automation", "All Automation related to Time Dilation or later is disabled"),

        // Time studies + Dilation
        this.t("misc.pelle.nerf.tdUpgrade",
          "Eternity Upgrade to Time Dimensions based on days played is based on this Armageddon time"),
        this.t("misc.pelle.nerf.dilatedTimeMult",
          "All pre-Doomed Dilated Time multipliers are disabled except the {0} buyable", formatX(2)),
        this.t("misc.pelle.nerf.tachyonMult", "All Tachyon Particle multipliers are disabled"),
        this.t("misc.pelle.nerf.ttGen",
          "All pre-Doomed Time Theorem generation effects are disabled except the Dilation upgrade"),

        // Glyphs
        this.t("misc.pelle.nerf.glyphEquip", "Glyph equipping is disabled until reacquired"),
        this.t("misc.pelle.nerf.glyphLevel",
          "Glyph levels are lowered and rarity is set to {0}", formatPercents(0)),
        this.t("misc.pelle.nerf.glyphEffects",
          "Effects from Glyph Sacrifice, Alteration, and Alchemy are all disabled"),

        // Celestial features
        this.t("misc.pelle.nerf.otherCelestials", "You cannot enter any other Celestial Realities"),
        this.t("misc.pelle.nerf.musicGlyph", "Music Glyphs cannot be bought"),
        this.t("misc.pelle.nerf.effarig", "All rewards from Effarig are disabled"),
        this.t("misc.pelle.nerf.storing", "All features related to storing time are disabled"),
        this.t("misc.pelle.nerf.v", "All rewards from V are disabled"),
        this.t("misc.pelle.nerf.raTeresa",
          "The Teresa Level {0} effect from Ra is disabled", formatInt(1)),
        this.t("misc.pelle.nerf.charge", "Infinity Upgrades cannot be charged"),
        this.t("misc.pelle.nerf.triad", "Triad Studies and Space Theorems are disabled"),
        this.t("misc.pelle.nerf.imaginary",
          "Imaginary Upgrades are disabled excluding those relating to DMD's and Celestial unlocks"),
        this.t("misc.pelle.nerf.continuum", "Continuum and Singularity rewards are disabled")
      ];
    }
  }
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      {{ t("misc.pelle.header", "List of disabled and nerfed effects in Doomed") }}
    </template>
    <div class="pelle-effects-container">
      <p
        v-for="(nerf, idx) in nerfs"
        :key="idx"
      >
        {{ nerf }}
      </p>
    </div>
    <PrimaryButton
      class="o-primary-btn--width-medium c-modal-message__okay-btn c-modal__confirm-btn"
      @click="emitClose"
    >
      {{ t("misc.pelle.okay", "Okay") }}
    </PrimaryButton>
  </ModalWrapper>
</template>

<style scoped>
.pelle-effects-container {
  overflow-y: scroll;
  height: 40rem;
}

p {
  margin-bottom: 1rem;
}
</style>
