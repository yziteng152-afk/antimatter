<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ReplicantiGalaxyModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      replicanti: new Decimal(),
      divideReplicanti: false,
      canBeBought: 0,
    };
  },
  computed: {
    topLabel() {
      return this.t("pres.replicantiGalaxy.header", "You are about to purchase {0}",
        quantifyInt("Replicanti Galaxy", this.canBeBought));
    },
    message() {
      const reductionString = this.divideReplicanti
        ? this.t("pres.replicantiGalaxy.divide",
          `divide your Replicanti by {0} for each Replicanti Galaxy purchased
          ({1} to {2})`,
          format(Number.MAX_VALUE, 2, 2), format(this.replicanti, 2, 2),
          format(this.replicanti.divide(Decimal.NUMBER_MAX_VALUE.pow(this.canBeBought)), 2, 2))
        : this.t("pres.replicantiGalaxy.reset", "reset your Replicanti to {0}", formatInt(1));
      return this.t("pres.replicantiGalaxy.message",
        `A Replicanti Galaxy boosts Tickspeed the same way an Antimatter Galaxy does. However, it does not
        increase the cost of Antimatter Galaxies, nor is it affected by multipliers to Antimatter Galaxies specifically.
        It will {0}.`, reductionString);
    }
  },
  methods: {
    update() {
      this.replicanti.copyFrom(player.replicanti.amount);
      this.divideReplicanti = Achievement(126).isUnlocked;
      this.canBeBought = Replicanti.galaxies.gain;
      if (this.replicanti.lt(Number.MAX_VALUE)) this.emitClose();
    },
    handleYesClick() {
      replicantiGalaxy(false);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="replicantiGalaxy"
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
