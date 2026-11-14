<script>
import FullScreenAnimationHandler from "@/core/full-screen-animation-handler";

import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ExitDilationModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      tachyonGain: new Decimal(0),
      isDoomed: false
    };
  },
  computed: {
    gainText() {
      if (this.tachyonGain.lte(0)) return this.t("pres.exitDilation.noGain", "not gain anything");
      return this.t("pres.exitDilation.gain", "gain {0}",
        quantify("Tachyon Particle", this.tachyonGain, 2, 1));
    },
    isInEC() {
      return Player.anyChallenge instanceof EternityChallengeState;
    },
    confirmText() {
      return this.isDoomed
        ? this.t("pres.exitDilation.confirmOkay", "Okay")
        : this.t("pres.exitDilation.confirmExit", "Exit");
    }
  },
  methods: {
    update() {
      // We force-close the modal if dilation is inactive because there are a few edge cases which allow it to be
      // opened while switching between dilated/regular. The only thing this results in is an incorrect TP gain value
      if (!player.dilation.active) this.emitClose();
      this.tachyonGain.copyFrom(getTachyonGain(true));
      this.isDoomed = Pelle.isDoomed;
    },
    handleYesClick() {
      if (!player.dilation.active) return;
      const playAnimation = player.options.animations.dilation && !FullScreenAnimationHandler.isDisplaying;
      if (playAnimation) {
        animateAndUndilate();
      } else {
        eternity(false, false, { switchingDilation: true });
      }
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="dilation"
    @confirm="handleYesClick"
  >
    <template #header>
      <span v-if="isDoomed">
        {{ t("pres.exitDilation.doomedHeader", "You cannot exit Dilation while Doomed") }}
      </span>
      <span v-else>
        {{ t("pres.exitDilation.header", "You are about to exit Dilation") }}
      </span>
    </template>
    <div class="c-modal-message__text">
      <span v-if="isDoomed">
        {{ t("pres.exitDilation.doomedBody",
             "Dilation is permanent. You will {0} and reset your current Eternity.", gainText) }}
      </span>
      <span v-else>
        {{ t("pres.exitDilation.body", "If you exit Dilation now, you will {0}.", gainText) }}
      </span>
      <div v-if="isInEC">
        {{ t("pres.exitDilation.ecExit", "You will also exit your current Eternity Challenge as well.") }}
      </div>
      <br>
      {{ t("pres.exitDilation.areYouSure", "Are you sure you want to proceed?") }}
    </div>
    <template #confirm-text>
      {{ confirmText }}
    </template>
  </ModalWrapperChoice>
</template>
