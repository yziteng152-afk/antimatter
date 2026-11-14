<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "BreakInfinityModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      const infinity = formatPostBreak(Number.MAX_VALUE, 2);
      const lines = [
        PlayerProgress.eternityUnlocked()
          ? this.t("pres.breakInfinity.intro",
            "Breaking Infinity will allow you to gain antimatter past {0}.", infinity)
          : this.t("pres.breakInfinity.introRead",
            "Breaking Infinity will allow you to gain antimatter past {0}, and allow you to read numbers past {0}.",
            infinity),
        this.t("pres.breakInfinity.scaling",
          "Dimensions and Tickspeed Upgrades will scale in cost faster after {0} antimatter.", infinity),
        this.t("pres.breakInfinity.ip",
          "You will gain additional Infinity Points on Big Crunch based on antimatter produced over {0}.", infinity),
      ];
      if (!EternityMilestone.keepAutobuyers.isReached) {
        lines.push(this.t("pres.breakInfinity.upgrades",
          "It will also unlock Break Infinity Upgrades and max all Normal Challenge Autobuyers."));
      }
      return lines;
    },
  },
  methods: {
    handleYesClick() {
      breakInfinity();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="false"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ t("pres.breakInfinity.header", "You are Breaking Infinity") }}
    </template>
    <div class="c-modal-message__text">
      <span
        v-for="(line, index) in message"
        :key="index"
      >
        {{ line }} <br>
      </span>
    </div>
    <template #confirm-text>
      {{ t("pres.breakInfinity.confirm", "Break") }}
    </template>
  </ModalWrapperChoice>
</template>
