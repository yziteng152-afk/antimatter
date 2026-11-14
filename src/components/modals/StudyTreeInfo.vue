<script>
export default {
  name: "StudyTreeInfo",
  props: {
    headerText: {
      type: String,
      required: true,
    },
    treeStatus: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="c-tree-info">
    <span
      class="l-tree-info-header"
      v-html="headerText"
    />
    <div
      v-if="treeStatus.firstPaths"
      class="l-modal-import-tree__tree-info-line"
    >
      {{ t("glyph.treeInfo.dimensionSplit", "Dimension Split: {0}", treeStatus.firstPaths) }}
    </div>
    <div
      v-if="treeStatus.secondPaths"
      class="l-modal-import-tree__tree-info-line"
    >
      {{ t("glyph.treeInfo.paceSplit", "Pace Split: {0}", treeStatus.secondPaths) }}
    </div>
    <div
      v-if="treeStatus.ec > 0"
      class="l-modal-import-tree__tree-info-line"
    >
      {{ t("glyph.treeInfo.eternityChallenge", "Eternity Challenge: {0}", treeStatus.ec) }}
      {{ treeStatus.startEC ? t("glyph.treeInfo.willStart", "(will start)") : "" }}
    </div>
  </div>
</template>

<style scoped>
.l-tree-info-header {
  font-size: 1.7rem;
}

.c-tree-info {
  padding: 0.7rem;
}
</style>
