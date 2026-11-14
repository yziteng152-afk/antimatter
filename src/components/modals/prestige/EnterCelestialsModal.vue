<script>
import EnterCelestialsRaPet from "@/components/modals/prestige/EnterCelestialsRaPet";
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "EnterCelestialsModal",
  components: {
    ModalWrapperChoice,
    EnterCelestialsRaPet,
  },
  props: {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      laitelaFastest: 3600,
      teresaBestAM: new Decimal(),
      teresaRunMult: 0,
      effarigDone: false,
      effarigLayer: "",
      enslavedDone: false,
      laitelaTime: "",
    };
  },
  computed: {
    effects() {
      return GameDatabase.celestials.descriptions[this.number].effects().split("\n");
    },
    description() {
      const description = GameDatabase.celestials.descriptions[this.number].description;
      return description ? description() : "";
    },
    topLabel() {
      return this.t("pres.celestials.header", "{0} Reality", this.name);
    },
    message() {
      return this.t("pres.celestials.message", "Perform a Reality reset and enter {0} Reality, in which:", this.name);
    },
    extraLine() {
      switch (this.number) {
        case 0:
          return this.teresaBestAM.eq(1)
            ? this.t("pres.celestials.teresaNoReward",
              `You have not unlocked the reward for Teresa's Reality yet. Unlocking the reward requires
              purchasing the Reality study and completing the Reality for the first time.`)
            : this.t("pres.celestials.teresaBest",
              `Your highest Teresa completion was for {0} antimatter,
              gaining you a {1} multiplier to Glyph Sacrifice power.`,
              format(this.teresaBestAM, 2, 2), formatX(this.teresaRunMult, 2));
        case 1: return this.effarigDone
          ? this.t("pres.celestials.effarigDone", "Effarig is completed!")
          : this.t("pres.celestials.effarigLayer", "You are currently on the {0} Layer.",
            this.t(`pres.layer.${this.effarigLayer}`, this.effarigLayer));
        case 2: return this.enslavedDone
          ? this.t("pres.celestials.enslavedDone", "Have... we... not helped enough...")
          : this.t("pres.celestials.enslavedHelp", "We... can help... Let us... help...");
        case 3: return "";
        case 4: return this.t("pres.celestials.raChunks",
          `Within Ra's Reality, some resources will generate Memory Chunks
          for Celestial Memories based on their amounts:`);
        case 5: return this.laitelaFastest >= 300
          ? this.t("pres.celestials.laitelaIncomplete", "You have not completed Lai'tela at this tier.")
          : this.t("pres.celestials.laitelaFastest", "Your fastest completion on this tier is {0}.",
            this.laitelaTime);
        case 6: return "";
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    }
  },
  methods: {
    update() {
      this.teresaBestAM.copyFrom(player.celestials.teresa.bestRunAM);
      this.teresaRunMult = Teresa.runRewardMultiplier;
      const effarigStage = Effarig.currentStage;
      this.effarigDone = effarigStage === EFFARIG_STAGES.COMPLETED;
      this.effarigLayer = [null, "Infinity", "Eternity", "Reality"][effarigStage];
      this.enslavedDone = Enslaved.isCompleted;
      this.laitelaFastest = player.celestials.laitela.fastestCompletion;
      this.laitelaTime = TimeSpan.fromSeconds(this.laitelaFastest).toStringShort();
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true));
      switch (this.number) {
        case 0: return Teresa.initializeRun();
        case 1: return Effarig.initializeRun();
        case 2: return Enslaved.initializeRun();
        case 3: return V.initializeRun();
        case 4: return Ra.initializeRun();
        case 5: return Laitela.initializeRun();
        case 6: throw new Error(`Attempted to start Pelle through EnterCelestialsModal instead of ArmageddonModal`);
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    },
  },
};
</script>

<template>
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
      <br>
      <br>
      <div class="c-modal-celestial__run-effects">
        <div
          v-for="(effect, i) in effects"
          :key="i"
          class="c-modal-celestial__run-effects__line"
        >
          <b v-if="effect.trim()">&bull;</b>
          <b>&nbsp;</b>
          {{ effect }}
        </div>
      </div>
      <div
        v-if="description"
        class="reality-description"
      >
        <br><br>
        {{ description }}
      </div>
      <br><br>
      <div>
        {{ extraLine }}
      </div>
      <span v-if="number === 4">
        <EnterCelestialsRaPet
          v-for="id in 4"
          :key="id"
          :pet-id="id - 1"
        />
      </span>
    </div>
    <template #confirm-text>
      {{ t("pres.celestials.confirm", "Begin") }}
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-modal-celestial__run-effects {
  display: inline-block;
  max-width: 45rem;
  text-align: left;
}
.c-modal-celestial__run-effects__line {
  display: flex;
  margin-bottom: 0.5rem;
}

.reality-description {
  padding: 0 2rem;
}
</style>