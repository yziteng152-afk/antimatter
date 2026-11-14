<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ArmageddonModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isDoomed: false,
      remnantsGain: 0,
      realityShardGain: new Decimal(0),
      nextRealityShardGain: new Decimal(0),
      canArmageddon: false,
    };
  },
  computed: {
    topLabel() {
      if (!this.isDoomed) return this.t("pres.armageddon.headerDoom", "You are about to Doom your Reality");
      return this.t("pres.armageddon.headerReset", "You are about to perform an Armageddon reset");
    },
    message() {
      const isFirstReset = (Currency.remnants.eq(0))
        ? this.t("pres.armageddon.firstReset", "which will produce {0} Reality Shards/s",
          format(this.nextRealityShardGain, 2, 2))
        : this.t("pres.armageddon.nextReset",
          `which will increase your Reality Shards gain from {0}/s
          to {1}/s`,
          format(this.realityShardGain, 2, 2), format(this.nextRealityShardGain, 2, 2));

      return this.t("pres.armageddon.message",
        `Armageddon will start a new Doomed Reality. You will gain
        {0} {1}`, quantify("Remnant", this.remnantsGain, 2, 0), isFirstReset);
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.remnantsGain = Pelle.remnantsGain;
      this.realityShardGain.copyFrom(Pelle.realityShardGainPerSecond);
      this.nextRealityShardGain.copyFrom(Pelle.nextRealityShardGain);
      this.canArmageddon = Pelle.canArmageddon;
    },
    handleYesClick() {
      Pelle.initializeRun();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :option="isDoomed ? 'armageddon' : undefined"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div
      v-if="!isDoomed"
      class="c-modal-message__text"
    >
      {{ t("pres.armageddon.doomWarning",
           "Dooming your Reality will reset everything except Challenge records, Celestial progress and anything " +
             "under the General and Reality header on the Statistics tab. You will not gain any rewards from your " +
             "progress in your current Reality. Dooming your Reality will also purge most of your unprotected " +
             "Glyphs and disable certain game mechanics.") }}
      <br>
      <br>
      {{ t("pres.armageddon.areYouSure", "Are you sure you want to do this?") }}
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
