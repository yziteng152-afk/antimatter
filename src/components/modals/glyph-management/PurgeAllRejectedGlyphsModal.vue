<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "PurgeAllRejectedGlyphsModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isRefining: false,
    };
  },
  computed: {
    refiningOrSacrificing() {
      if (this.isRefining) return this.t("glyph.common.refine", "Refine");
      return this.t("glyph.common.sacrifice", "Sacrifice");
    },
    topLabel() {
      return this.t("glyph.purgeRejected.topLabel",
        "You are about to {0} all rejected Glyphs",
        this.refiningOrSacrificing);
    },
    message() {
      const negativeWarning = AutoGlyphProcessor.hasNegativeEffectScore()
        ? this.t("glyph.purgeRejected.negativeWarning",
          " Note that some of your Effect Filter scores are negative, which may cause you to lose some Glyphs " +
          "you normally want to keep.")
        : "";
      return this.t("glyph.purgeRejected.message",
        "Are you sure you want to {0} all rejected Glyphs? This will remove all Glyphs that would be rejected " +
        "by your current Glyph Filter settings.{1}",
        this.refiningOrSacrificing, negativeWarning);
    },
    extraMessage() {
      if (this.glyphsDeleted === 0) {
        return this.t("glyph.purgeRejected.extraNone", "This will remove no Glyphs.");
      }
      if (this.glyphsDeleted === this.glyphsTotal) {
        return this.t("glyph.purgeRejected.extraAll", "This will remove all your Glyphs.");
      }
      return this.t("glyph.purgeRejected.extraSome",
        "This process will remove {0}/{1} Glyphs.",
        this.glyphsDeleted, this.glyphsTotal);
    },

    // These two don't need to be reactive since the modal force-closes itself whenever glyphs change
    glyphsTotal() {
      return Glyphs.inventory.filter(slot => slot !== null).length;
    },
    glyphsDeleted() {
      return Glyphs.deleteAllRejected(false);
    },
  },
  methods: {
    update() {
      this.isRefining = GlyphSacrificeHandler.isRefining;
    },
    handleYesClick() {
      Glyphs.deleteAllRejected(true);
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
