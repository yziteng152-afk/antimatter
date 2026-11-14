<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "NormalChallengeStartModal",
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
      return NormalChallenge(this.id);
    },
    challengeIsCompleted() {
      return this.challenge.isCompleted;
    },
    message() {
      const rewardClause = this.challengeIsCompleted
        ? ""
        : this.t("misc.challenge.rewardClause", " and gain its reward");
      return this.t("misc.challenge.normal.message",
        "You will Big Crunch (if possible) and start a new Infinity within the Challenge with all the " +
          "Challenge-specific restrictions and modifiers active. To complete the Challenge{0}, you must reach " +
          "Infinity again. You do not start with any Dimension Boosts or Galaxies, regardless of upgrades.",
        rewardClause);
    },
    entranceLabel() {
      return this.t("misc.challenge.normal.header", "You are about to enter Challenge {0}", this.id);
    },
    reward() {
      return this.t("misc.challenge.reward",
        "The reward for completing this challenge is: {0}",
        this.tr(this.challenge._config.reward));
    },
    condition() {
      let conditionOfChallenge = this.challenge._config.description;
      if (typeof conditionOfChallenge === "function") {
        conditionOfChallenge = conditionOfChallenge();
      }
      conditionOfChallenge = this.tr(conditionOfChallenge);
      return this.t("misc.challenge.normal.condition", "Inside this Challenge, {0}", conditionOfChallenge);
    }
  },
  created() {
    this.on$(GAME_EVENT.ETERNITY_RESET_AFTER, this.emitClose);
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, this.emitClose);
  },
  methods: {
    handleYesClick() {
      this.challenge.start();
    },
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
