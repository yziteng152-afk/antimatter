<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "PurgeGlyphModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    harsh: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    threshold() {
      return this.harsh ? 1 : 5;
    },
    extraMessage() {
      if (this.glyphsDeleted === 0) return this.t("glyph.purge.extraNone", "This will Purge no Glyphs.");
      if (this.glyphsDeleted === this.glyphsTotal) {
        return this.t("glyph.purge.extraAll", "This will Purge all your Glyphs.");
      }
      return this.t("glyph.purge.extraSome",
        "{0} will delete {1}/{2} of your Glyphs.",
        this.harsh ? this.t("glyph.purge.harshPurging", "Harsh Purging") : this.t("glyph.purge.purging", "Purging"),
        formatInt(this.glyphsDeleted), formatInt(this.glyphsTotal));
    },
    explanation() {
      if (this.harsh) {
        return this.t("glyph.purge.harshExplanation",
          "Harsh Purging deletes Glyphs that are strictly worse than any other Glyph in your inventory. For " +
          "example, if a Glyph has all the same effects as another Glyph, but the values of ALL of the effects " +
          "are worse, then it will be deleted.");
      }
      return this.t("glyph.purge.explanation",
        "Purging deletes Glyphs that are strictly worse than other Glyphs, while keeping enough to equip a full " +
        "set with those effects. This behaves like Harsh Purge, except that regular Purge will not delete any " +
        "given Glyph unless it finds five Glyphs which are better (instead of only one).");
    },
    topLabel() {
      return this.t("glyph.purge.header",
        "You are about to {0} your Glyphs",
        this.harsh ? this.t("glyph.purge.harshPurge", "Harsh Purge") : this.t("glyph.purge.purge", "Purge"));
    },

    // These two don't need to be reactive since the modal force-closes itself whenever glyphs change
    glyphsTotal() {
      return Glyphs.inventory.filter(slot => slot !== null).length;
    },
    glyphsDeleted() {
      return Glyphs.autoClean(this.threshold, false);
    },
  },
  methods: {
    handleYesClick() {
      Glyphs.autoClean(this.threshold, true);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="autoClean"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ t("glyph.purge.intro",
           "This could delete Glyphs in your inventory that are good enough that you might want to use them " +
             "later. Purging will Purge Glyphs based on your Purge mode. Are you sure you want to do this?") }}
      <br>
      <br>
      {{ explanation }}
    </div>
    <br>
    <div class="c-modal-hard-reset-danger">
      {{ extraMessage }}
    </div>
  </ModalWrapperChoice>
</template>
