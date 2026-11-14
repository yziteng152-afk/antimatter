<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "DeleteGlyphModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    idx: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      confirmedDelete: false
    };
  },
  computed: {
    glyph() {
      return Glyphs.findByInventoryIndex(this.idx);
    },
  },
  methods: {
    update() {
      const newGlyph = Glyphs.findByInventoryIndex(this.idx);
      if (this.glyph !== newGlyph && !this.confirmedDelete) {

        // Why is confirmedDelete here: refer to SacrificeGlyphModal.vue

        this.emitClose();
        Modal.message.show(this.t("glyph.common.changedPosition",
          "The selected Glyph changed position or was otherwise changed!"));
      }
    },
    handleYesClick() {
      this.confirmedDelete = true;
      Glyphs.removeFromInventory(this.glyph);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      {{ t("glyph.deleteGlyph.header", "You are about to delete a Glyph") }}
    </template>
    <div class="c-modal-message__text">
      {{ t("glyph.deleteGlyph.body", "Deleting a Glyph will remove the Glyph from your inventory!") }}
      <div class="c-modal-hard-reset-danger">
        {{ t("glyph.deleteGlyph.warning",
             "There is no benefit in deleting a Glyph before you have unlocked Glyph Sacrifice!") }}
      </div>
    </div>
  </ModalWrapperChoice>
</template>
