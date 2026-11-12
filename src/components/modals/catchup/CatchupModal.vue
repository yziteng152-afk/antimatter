<script>
import { GameProgress, ProgressChecker } from "@/core/storage/progress-checker";

import CatchupGroup from "@/components/modals/catchup/CatchupGroup";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "CatchupModal",
  components: {
    CatchupGroup,
    PrimaryButton,
  },
  props: {
    diff: {
      type: Number,
      required: true
    }
  },
  computed: {
    progressStage: () => ProgressChecker.getProgressStage(player).id,
    suggestedResource() {
      return GameProgress(this.progressStage).suggestedResource;
    },
    timeString() {
      // If diff is zero, that means we opened it up via the button and don't need the text for last opening
      if (!this.diff) return null;
      return this.t("catchup.timeSince", "It has been {0} since you last loaded up the game.",
        TimeSpan.fromMilliseconds(this.diff).toString());
    },
    titleText() {
      return this.diff
        ? this.t("catchup.titleCatchup", "Content Catch-up")
        : this.t("catchup.titleSummary", "Content Summary");
    }
  },
  methods: {
    stageName(stage) {
      return GameProgress(stage).name;
    }
  }
};
</script>

<template>
  <div class="c-modal-away-progress">
    <div class="c-modal-away-progress__header">
      {{ titleText }}
    </div>
    <div>
      {{ timeString }}
      {{ t("catchup.intro", "If you need a refresher, here is a quick summary of all the content you have " +
        "unlocked so far from the beginning of the game, separated into different stages of progression. " +
        "These are only very brief descriptions; you can check the related How To Play entries by clicking the " +
        "contents title or") }} <i class="fas fa-question-circle" />
      {{ t("catchup.introTail", "icons to view more detailed information.") }}
    </div>
    <div
      class="l-catchup-group-container"
      :style="{ 'height' : `${Math.clamp(3 * progressStage + 5, 15, 35)}rem` }"
    >
      <CatchupGroup
        v-for="group of progressStage"
        :key="group"
        :group="group"
        :name="stageName(group)"
      />
    </div>
    <span class="c-suggestion-text">
      {{ t("catchup.suggestion", "Based on your current progression, it will probably be useful to try to " +
        "increase your {0}.", trNorm(suggestedResource)) }}
    </span>
    <div class="l-confirm-padding">
      <PrimaryButton
        @click="emitClose"
      >
        {{ t("catchup.confirm", "Confirm") }}
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.l-catchup-group-container {
  overflow-y: scroll;
  width: 100%;
  text-align: left;
  border: 0.1rem solid var(--color-text);
  border-radius: var(--var-border-radius, 0.4rem);
  margin: 1rem 0;
  padding: 1.5rem;
}

.l-confirm-padding {
  margin: 1rem;
}

.c-suggestion-text {
  font-size: 1.6rem;
  font-weight: bold;
}
</style>
