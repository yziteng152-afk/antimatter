<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "DimensionBoostModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    topLabel() {
      return this.t("pres.dimboost.header", "You are about to do a Dimension Boost Reset");
    },
    message() {
      const keepDimensions = Perk.antimatterNoReset.canBeApplied || Achievement(111).canBeApplied ||
        PelleUpgrade.dimBoostResetsNothing.isBought
        ? this.t("pres.dimboost.keep",
          `not actually reset anything due to an upgrade you have which prevents Antimatter and Antimatter Dimensions
          from being reset in this situation. You will still gain the multiplier from the Boost, as usual.`)
        : this.t("pres.dimboost.reset",
          "reset your Antimatter and Antimatter Dimensions. Are you sure you want to do this?");

      return this.t("pres.dimboost.message", "This will {0}", keepDimensions);
    },
  },
  methods: {
    handleYesClick() {
      requestDimensionBoost(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="dimensionBoost"
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
