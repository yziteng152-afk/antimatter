<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "UpgradeMechanicLockModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    },
    isImaginary: {
      type: Boolean,
      required: true,
    },
    specialLockText: {
      type: String,
      required: false,
      default: null,
    }
  },
  computed: {
    upgradeStr() {
      return this.isImaginary
        ? this.t("save.upgradeLock.imaginary", "Imaginary Upgrade")
        : this.t("save.upgradeLock.reality", "Reality Upgrade");
    },
    lockEvent() {
      return this.specialLockText ?? this.upgrade.lockEvent;
    }
  },
  methods: {
    disableLock() {
      this.upgrade.setMechanicLock(false);
    }
  }
};
</script>

<template>
  <ModalWrapperChoice
    @confirm="disableLock"
  >
    <template #header>
      {{ t("save.upgradeLock.title", "{0} Condition Lock", upgradeStr) }}
    </template>
    <div class="c-modal-message__text">
      {{ t("save.upgradeLock.confirmPrefix", "Are you sure you wish to") }}
      {{ lockEvent }}?
      {{ t("save.upgradeLock.failPrefix", "Doing this right now will cause you to") }}
      <span class="l-emphasis">
        {{ t("save.upgradeLock.failRequirement", "fail the requirement for the {0} \"{1}\"",
             upgradeStr, tr(upgrade.name)) }}
      </span>
      <span :ach-tooltip="upgrade.requirement">
        <i class="fas fa-question-circle" />
      </span>
      <br>
      <br>
      {{ t("save.upgradeLock.explain",
           "Selecting \"Cancel\" will close this modal with no effect, while selecting \"Disable Lock\" will " +
             "disable the requirement check for this upgrade and prevent this message from reappearing unless you " +
             "turn it back on.") }}
      <br>
      <br>
      {{ t("save.upgradeLock.noAction",
           "Neither of these options will perform the action you just attempted, so you will need to try again.") }}
    </div>
    <template #confirm-text>
      {{ t("save.upgradeLock.disable", "Disable Lock") }}
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.l-emphasis {
  font-weight: bold;
  color: var(--color-bad);
}
</style>
