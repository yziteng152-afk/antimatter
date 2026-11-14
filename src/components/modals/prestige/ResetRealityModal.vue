<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ResetRealityModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isDoomed: false,
      canReality: false,
    };
  },
  computed: {
    resetTerm() {
      return this.isDoomed
        ? this.t("pres.resetReality.armageddon", "Armageddon")
        : this.t("pres.resetReality.reality", "Reality");
    },
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.canReality = isRealityAvailable();
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true));
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="resetReality"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ t("pres.resetReality.header", "You are about to reset your {0}", resetTerm) }}
    </template>
    <div class="c-modal-message__text">
      {{ t("pres.resetReality.message",
           "This will reset you to the start of your {0}, giving you no rewards from your progress in your " +
             "current {0}.", resetTerm) }}
      <br>
      <br>
      {{ t("pres.resetReality.areYouSure", "Are you sure you want to do this?") }}
      <div
        v-if="canReality"
        class="c-has-rewards"
      >
        <br>
        {{ t("pres.resetReality.canReality",
             "You can currently complete a Reality for all its normal rewards, which you will not receive if you " +
               'Reset here. To get rewards, use the "Make a new Reality" button.') }}
      </div>
      <br>
    </div>
    <template #confirm-text>
      {{ t("pres.resetReality.confirm", "Reset") }}
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-has-rewards {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--color-bad);
}
</style>
