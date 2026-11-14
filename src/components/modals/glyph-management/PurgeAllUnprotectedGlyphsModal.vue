<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "PurgeAllUnprotectedGlyphsModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isRefining: false,
      isSacrificing: false,
    };
  },
  computed: {
    refiningSacrificingOrDeleting() {
      if (this.isRefining) return this.t("glyph.common.refine", "Refine");
      if (this.isSacrificing) return this.t("glyph.common.sacrifice", "Sacrifice");
      return this.t("glyph.common.deleteVerb", "delete");
    },
    topLabel() {
      return this.t("glyph.purgeUnprotected.topLabel",
        "You are about to {0} all unprotected Glyphs",
        this.refiningSacrificingOrDeleting);
    },
    message() {
      return this.t("glyph.purgeUnprotected.message",
        "Are you sure you want to {0} all unprotected Glyphs in your inventory?",
        this.refiningSacrificingOrDeleting);
    },
    extraMessage() {
      const action = this.refiningSacrificingOrDeleting;
      if (this.glyphsDeleted === 0) {
        return this.t("glyph.purgeUnprotected.extraNone", "This will {0} no Glyphs.", action);
      }
      if (this.glyphsDeleted === this.glyphsTotal) {
        return this.t("glyph.purgeUnprotected.extraAll", "This will {0} all your Glyphs.", action);
      }
      return this.t("glyph.purgeUnprotected.extraSome",
        "This will {0} {1}/{2} of your Glyphs.",
        action, formatInt(this.glyphsDeleted), formatInt(this.glyphsTotal));
    },

    // These two don't need to be reactive since the modal force-closes itself whenever glyphs change
    glyphsTotal() {
      return Glyphs.inventory.filter(slot => slot !== null).length;
    },
    glyphsDeleted() {
      return Glyphs.autoClean(0, false);
    },
  },
  methods: {
    update() {
      this.isRefining = GlyphSacrificeHandler.isRefining;
      this.isSacrificing = GlyphSacrificeHandler.canSacrifice;
    },
    handleYesClick() {
      Glyphs.deleteAllUnprotected();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="sacrificeAll"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <br>
    <div class="c-modal-hard-reset-danger">
      {{ extraMessage }}
    </div>
  </ModalWrapperChoice>
</template>
