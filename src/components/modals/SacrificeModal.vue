<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "SacrificeModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      currentMultiplier: new Decimal(),
      nextMultiplier: new Decimal(),
    };
  },
  computed: {
    message() {
      if (Achievement(118).isUnlocked && !Pelle.isDoomed) {
        return this.t("pres.sacrifice.rewardOnly",
          `Dimensional Sacrifice will give you a boost to the 8th Antimatter Dimension based on the amount of
          1st Antimatter Dimensions you had at the time of Sacrificing.`);
      }
      return this.t("pres.sacrifice.message",
        `Dimensional Sacrifice will remove all of your 1st through 7th Antimatter Dimensions
        (with the cost and multiplier unchanged), for a boost to the 8th Antimatter Dimension based on the total
        amount of 1st Antimatter Dimensions sacrificed. It will take time to regain production.`);
    },
    multiplierText() {
      return this.t("pres.sacrifice.multiplier", `Multiplier is currently {0} and will increase to
        {1} on Dimensional Sacrifice.`,
      formatX(this.currentMultiplier, 2, 2), formatX(this.nextMultiplier, 2, 2));
    },
  },
  methods: {
    update() {
      this.currentMultiplier.copyFrom(Sacrifice.totalBoost);
      this.nextMultiplier.copyFrom(Sacrifice.nextBoost.times(Sacrifice.totalBoost));
    },
    handleYesClick() {
      sacrificeReset();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="sacrifice"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ t("pres.sacrifice.header", "Dimensional Sacrifice") }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <br>
    <div class="c-modal-message__text">
      {{ multiplierText }}
      <br>
    </div>
  </ModalWrapperChoice>
</template>
