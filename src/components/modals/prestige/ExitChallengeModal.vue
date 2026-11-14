<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ExitChallengeModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    challengeName: {
      type: String,
      required: true,
    },
    normalName: {
      type: String,
      required: true,
    },
    hasHigherLayers: {
      type: Boolean,
      required: true,
    },
    exitFn: {
      type: Function,
      required: true,
    }
  },
  computed: {
    isCelestial() {
      return this.challengeName.match("Reality");
    },
    isRestarting() {
      return this.isCelestial ? player.options.retryCelestial : player.options.retryChallenge;
    }
  },
  methods: {
    handleYesClick() {
      this.exitFn();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="exitChallenge"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ isRestarting
        ? t("pres.exitChallenge.headerRestart", "You are about to restart {0}", tr(challengeName))
        : t("pres.exitChallenge.headerExit", "You are about to exit {0}", tr(challengeName)) }}
    </template>

    <div class="c-modal-message__text">
      <span v-if="isRestarting">
        {{ t("pres.exitChallenge.restartBody",
             "You will immediately re-enter {0} again after confirming this modal.", tr(challengeName)) }}
      </span>
      <span v-else>
        {{ t("pres.exitChallenge.exitBody",
             "This will place you back into a regular {0} without any restrictions.", tr(normalName)) }}
      </span>
      <span v-if="hasHigherLayers">
        {{ t("pres.exitChallenge.higherLayers",
             "Other effects coming from higher-layer restrictions will still continue to apply.") }}
      </span>
    </div>
    <template #confirm-text>
      {{ isRestarting
        ? t("pres.exitChallenge.confirmRestart", "Restart")
        : t("pres.exitChallenge.confirmExit", "Exit") }}
    </template>
  </ModalWrapperChoice>
</template>
