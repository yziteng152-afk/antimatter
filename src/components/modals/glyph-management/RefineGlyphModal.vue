<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "RefineGlyphModal",
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
      resourceAmount: 0,
      resourceUnlocked: false,
      gain: 0,
      after: 0,
      cap: 0,
      confirmedRefine: false
    };
  },
  computed: {
    glyph() {
      return Glyphs.findByInventoryIndex(this.idx);
    },
    resource() {
      return GlyphSacrificeHandler.glyphAlchemyResource(this.glyph);
    },
    resourceName() {
      return this.resource.name;
    },
  },
  methods: {
    update() {
      const resource = this.resource;
      this.resourceAmount = resource.amount;
      this.resourceUnlocked = resource.isUnlocked;
      this.gain = GlyphSacrificeHandler.glyphRefinementGain(this.glyph);
      this.cap = GlyphSacrificeHandler.glyphEffectiveCap(this.glyph);

      this.after = this.resourceAmount + this.gain;

      const newGlyph = Glyphs.findByInventoryIndex(this.idx);
      if (this.glyph !== newGlyph && !this.confirmedRefine) {

        // Why is confirmedRefine here: refer to SacrificeGlyphModal.vue

        this.emitClose();
        Modal.message.show(this.t("glyph.common.changedPosition",
          "The selected Glyph changed position or was otherwise changed!"));
      }
    },
    handleYesClick() {
      this.confirmedRefine = true;
      GlyphSacrificeHandler.refineGlyph(this.glyph);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="glyphRefine"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ t("glyph.refine.header", "You are about to refine a Glyph") }}
    </template>
    <div
      v-if="resourceUnlocked"
      class="c-modal-message__text"
    >
      {{ t("glyph.refine.bodyUnlocked",
           "Refining a Glyph will remove the Glyph from your inventory, and in return, you will increase your " +
             "{0} Alchemy resource from {1} to {2}. This Glyph can raise your {0} resource to at most {3}.",
           resourceName, format(resourceAmount, 2, 2), format(after, 2, 2), format(cap, 2, 2)) }}
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      {{ t("glyph.refine.bodyLocked",
           "You cannot gain any {0} alchemy resource because you have not unlocked this Glyph's resource yet. " +
             "You can still refine it anyway, but nothing will happen. Consider sacrificing the Glyph instead.",
           resourceName) }}
    </div>
  </ModalWrapperChoice>
</template>
