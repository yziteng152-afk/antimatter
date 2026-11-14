<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "UndoGlyphModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      showStoredGameTime: false,
    };
  },
  methods: {
    update() {
      this.showStoredGameTime = Enslaved.isUnlocked;
    },
    realityInvalidate() {
      this.emitClose();
      Modal.message.show(this.t("glyph.undo.message", "Glyph Undo can only undo with a Reality!"),
        { closeEvent: GAME_EVENT.REALITY_RESET_AFTER });
    },
    handleYesClick() {
      this.emitClose();
      Glyphs.undo();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="glyphUndo"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ t("glyph.undo.header", "You are about to undo equipping a Glyph") }}
    </template>
    <div
      class="c-modal-message__text c-text-wrapper"
    >
      {{ t("glyph.undo.body",
           "The last equipped Glyph will be removed. Reality will be reset, but some things will be restored " +
             "to what they were when it was equipped:") }}
      <br>
      <div class="c-text-wrapper">
        <br>{{ t("glyph.undo.antimatter", "- Antimatter, Infinity Points, and Eternity Points") }}
        <br>{{ t("glyph.undo.dilation", "- Dilation Upgrades, Tachyon Particles, and Dilated Time") }}
        <br>{{ t("glyph.undo.theorems", "- Time Theorems and Eternity Challenge completions") }}
        <br>{{ t("glyph.undo.unlocks", "- Time Dimension and Reality unlocks") }}
        <br>{{ t("glyph.undo.time", "- Time in current Infinity/Eternity/Reality") }}
        <span v-if="showStoredGameTime"><br>{{ t("glyph.undo.storedTime", "- Stored game time") }}</span>
      </div>
      <br>
      {{ t("glyph.undo.note",
           "Note that if you invalidate special requirements for certain things (such as the achievement for " +
             "completing a Reality without producing antimatter), they will remain invalid even after undoing. In " +
             "those cases, you will need to complete the conditions in a single Reality without using undo.") }}
    </div>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-text-wrapper {
  text-align: left;
}
</style>