<script>
import CosmeticSetDropdown from "@/components/modals/options/glyph-appearance/CosmeticSetDropdown";
import ExpandingControlBox from "@/components/ExpandingControlBox";
import GlyphComponent from "@/components/GlyphComponent";
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "CosmeticSetChoiceModal",
  components: {
    ModalWrapperChoice,
    ExpandingControlBox,
    CosmeticSetDropdown,
    GlyphComponent
  },
  data() {
    return {
      initialSet: "",
      currentSet: "",
    };
  },
  computed: {
    lockedSets() {
      return GlyphAppearanceHandler.lockedSets;
    },
    cosmeticTypes() {
      return CosmeticGlyphTypes.list.filter(t => t.isCosmetic && t.isUnlocked).map(t => t.id);
    },
    setName() {
      return this.currentSet?.name ?? this.t("glyph.cosmetic.noneSelected", "None Selected");
    },
    setContents() {
      const contents = [];
      if (this.symbols) {
        contents.push(this.symbols.length === 1
          ? this.t("glyph.cosmetic.symbolCountOne", "1 symbol")
          : this.t("glyph.cosmetic.symbolCount", "{0} symbols", this.symbols.length));
      }
      if (this.colors) {
        contents.push(this.colors.length === 1
          ? this.t("glyph.cosmetic.colorSchemeCountOne", "1 color scheme")
          : this.t("glyph.cosmetic.colorSchemeCount", "{0} color schemes", this.colors.length));
      }
      return contents.join(this.t("glyph.cosmetic.contentsAnd", " and "));
    },
    symbols() {
      return this.currentSet.symbol;
    },
    colors() {
      return this.currentSet.color;
    },
    glyphIconProps() {
      return {
        size: "3rem",
        "glow-blur": "0.3rem",
        "glow-spread": "0.1rem",
        "text-proportion": 0.66,
      };
    },
  },
  created() {
    this.initialSet = GlyphAppearanceHandler.chosenFromModal;
    GlyphAppearanceHandler.setInModal = this.initialSet;
  },
  methods: {
    update() {
      this.currentSet = GlyphAppearanceHandler.setInModal;
    },
    chooseSet() {
      GlyphAppearanceHandler.chosenFromModal = this.currentSet;
    },
    cancelSet() {
      GlyphAppearanceHandler.chosenFromModal = this.initialSet;
      this.emitClose();
    },
    fakeGlyph(color) {
      return {
        type: "power",
        strength: 1,
        color,
      };
    },
  }
};
</script>

<template>
  <ModalWrapperChoice
    :cancel-fn="cancelSet"
    @confirm="chooseSet"
  >
    <template #header>
      {{ t("glyph.cosmetic.header", "Choose a Glyph Cosmetic Set") }}
    </template>
    <div class="c-center">
      <ExpandingControlBox
        class="o-primary-btn c-dropdown-btn"
      >
        <template #header>
          <div class="c-dropdown-header">
            {{ t("glyph.cosmetic.availableSets", "▼ Available Sets ▼") }}
            <br>
            {{ setName }}
          </div>
        </template>
        <template #dropdown>
          <CosmeticSetDropdown />
        </template>
      </ExpandingControlBox>
      <div v-if="currentSet">
        {{ t("glyph.cosmetic.contains",
             'The "{0}" Set contains the following {1}:', currentSet.name, setContents) }}
        <br>
        <span
          v-for="symbol of symbols"
          :key="symbol"
          class="o-single-symbol"
        >
          {{ symbol }}
        </span>
        <br>
        <span
          v-for="color of colors"
          :key="color"
          class="o-single-glyph"
        >
          <GlyphComponent
            v-bind="glyphIconProps"
            :glyph="fakeGlyph(color)"
          />
        </span>
      </div>
    </div>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-center {
  display: flex;
  flex-direction: column;
  width: 38rem;
  align-items: center;
}

.t-s12 .c-center {
  width: 50rem;
  text-align: center;
}

.c-dropdown-btn {
  width: 24rem;
  margin: 0.3rem;
  padding: 0;
}

.c-dropdown-header {
  height: 5rem;
  padding: 0.5rem;
  user-select: none;
}

.o-single-symbol {
  font-size: 3rem;
}

.o-single-glyph {
  padding: 0.5rem;
}
</style>
