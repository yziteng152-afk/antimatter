<script>
export default {
  name: "StudyStringLine",
  props: {
    tree: {
      type: Object,
      required: true,
    },
    intoEmpty: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    importDestString() {
      return this.intoEmpty
        ? this.t("glyph.studyString.intoEmptyTree", "into an empty Tree")
        : this.t("glyph.studyString.withCurrentTree", "with your current Tree");
    }
  },
  methods: {
    formatTheoremCost(tt, st) {
      const strTT = `${formatWithCommas(tt)} ${this.t("glyph.studyString.ttUnit", "TT")}`;
      const strST = `${formatWithCommas(st)} ${this.t("glyph.studyString.stUnit", "ST")}`;
      return st === 0 ? strTT : `${strTT} + ${strST}`;
    }
  },
};
</script>

<template>
  <div class="l-modal-import-tree__tree-info-line">
    <div v-if="tree.timeTheorems === 0 && tree.spaceTheorems === 0">
      <i>{{ t("glyph.studyString.noNewStudies",
              "Importing this {0} will not purchase any new Time Studies.", importDestString) }}</i>
    </div>
    <div v-else>
      {{ t("glyph.studyString.purchaseHeader", "Importing {0} will purchase:", importDestString) }}
      <br>
      {{ tree.newStudies }}
      {{ t("glyph.studyString.cost",
           "(Cost: {0})", formatTheoremCost(tree.timeTheorems, tree.spaceTheorems)) }}
    </div>
    <br>
  </div>
</template>
