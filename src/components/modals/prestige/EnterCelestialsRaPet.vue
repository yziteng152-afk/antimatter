<script>
export default {
  name: "EnterCelestialsRaPet",
  props: {
    petId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      isUnlocked: false,
    };
  },
  computed: {
    pet() {
      return Ra.pets.all[this.petId];
    },
    name() {
      return this.tr(this.pet.name);
    },
    color() {
      return `color: ${this.pet.color}`;
    },
    gainText() {
      // We need to special-case the grammar for Nameless
      const isPlural = this.pet.id === "enslaved";
      const gain = isPlural ? "gain" : "gains";
      const has = isPlural ? "have" : "has";
      return this.pet.level === 25
        ? this.t("pres.raPet.allMemories", `${has} regained all Memories`)
        : this.t("pres.raPet.memoryChunks", `${gain} Memory Chunks based on {0}`, this.chunkGain);
    },
    chunkGain() {
      return this.tr(this.pet.chunkGain);
    },
  },
  methods: {
    update() {
      this.isUnlocked = this.pet.isUnlocked;
    }
  },
};
</script>

<template>
  <span
    v-if="isUnlocked"
    :style="color"
  >
    {{ name }} {{ gainText }}.
    <br>
  </span>
</template>
