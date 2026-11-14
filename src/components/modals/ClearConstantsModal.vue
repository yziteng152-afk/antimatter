<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ClearConstantsModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      constantCount: 0,
    };
  },
  methods: {
    update() {
      this.constantCount = Object.keys(player.reality.automator.constants).length;
      if (this.constantCount === 0) this.emitClose();
    },
    deleteConstants() {
      player.reality.automator.constants = {};
      player.reality.automator.constantSortOrder = [];
    }
  }
};
</script>

<template>
  <ModalWrapperChoice
    @confirm="deleteConstants"
  >
    <template #header>
      {{ t("save.clearConstants.title", "Deleting Automator Constants") }}
    </template>
    <div class="c-modal-message__text">
      {{ t("save.clearConstants.confirm",
           "Are you sure you wish to delete all of your currently-defined automator constants?") }}
      <br>
      <span class="l-lost-text">
        {{ constantCount === 1
          ? t("save.clearConstants.deleteOne", "This will irreversibly delete {0} constant!", formatInt(constantCount))
          : t("save.clearConstants.deleteMany", "This will irreversibly delete {0} constants!",
              formatInt(constantCount)) }}
      </span>
    </div>
    <template #confirm-text>
      {{ t("save.clearConstants.deleteAll", "Delete All") }}
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.l-lost-text {
  font-weight: bold;
  color: var(--color-bad);
}
</style>
