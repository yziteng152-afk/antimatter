<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "EternityChallengeStartModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    challenge() {
      return EternityChallenge(this.id);
    },
    challengeIsCompleted() {
      return this.challenge.isFullyCompleted;
    },
    message() {
      const rewardClause = this.challengeIsCompleted
        ? ""
        : this.t("misc.challenge.rewardClause", " and gain its reward");
      return this.t("misc.challenge.eternity.message",
        "You will Eternity (if possible) and start a new Eternity within the Challenge, with all the " +
          "Challenge-specific restrictions and modifiers active. To complete the Challenge{0}, you must reach the " +
          "Challenge goal of {1} Infinity Points. You can complete Eternity Challenges up to {2} times, with " +
          "increasing goals and bonuses.",
        rewardClause,
        format(this.challenge.currentGoal),
        formatInt(5));
    },
    entranceLabel() {
      return this.t("misc.challenge.eternity.header", "You are about to enter Eternity Challenge {0}", this.id);
    },
    reward() {
      let rewardDescription = this.challenge._config.reward.description;
      if (typeof rewardDescription === "function") {
        rewardDescription = rewardDescription();
      }
      rewardDescription = this.tr(rewardDescription);
      return this.t("misc.challenge.reward",
        "The reward for completing this challenge is: {0}",
        rewardDescription);
    },
    condition() {
      let conditionOfChallenge = this.challenge._config.description;
      if (typeof conditionOfChallenge === "function") {
        conditionOfChallenge = conditionOfChallenge();
      }
      conditionOfChallenge = this.tr(conditionOfChallenge);
      return this.t("misc.challenge.eternity.condition", "Inside this Eternity Challenge, {0}", conditionOfChallenge);
    }
  },
  created() {
    this.on$(GAME_EVENT.ETERNITY_RESET_AFTER, this.emitClose);
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, this.emitClose);
  },
  methods: {
    handleYesClick() {
      this.challenge.start(true);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="challenges"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
      <br><br>
      {{ condition }}
    </div>
    <div
      v-if="!challengeIsCompleted"
      class="c-modal-message__text"
    >
      <br>
      {{ reward }}
    </div>
    <template #confirm-text>
      {{ t("misc.challenge.begin", "Begin") }}
    </template>
  </ModalWrapperChoice>
</template>
