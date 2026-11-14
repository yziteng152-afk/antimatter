<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "LoadGameEntry",
  components: {
    PrimaryButton
  },
  props: {
    saveId: {
      type: Number,
      required: true
    }
  },
  data() {
    const save = GameStorage.saves[this.saveId];
    return {
      antimatter: new Decimal(save ? save.antimatter || save.money : 10),
      fileName: save ? save.options.saveFileName : ""
    };
  },
  computed: {
    isSelected() {
      return GameStorage.currentSlot === this.saveId;
    }
  },
  methods: {
    load() {
      GameStorage.loadSlot(this.saveId);
    },
    formatAntimatter(antimatter) {
      return formatPostBreak(antimatter, 2, 1);
    },
    update() {
      if (this.isSelected) {
        this.antimatter.copyFrom(Currency.antimatter);
      }
    }
  },
};
</script>

<template>
  <div class="l-modal-options__save-record">
    <h3>
      {{ t("save.load.entryTitle", "Save #{0}:", saveId + 1) }}<span v-if="isSelected">
        {{ t("save.load.selected", "(selected)") }}
      </span>
    </h3>
    <span v-if="fileName">{{ t("save.common.fileName", "File name: {0}", fileName) }}</span>
    <span>{{ t("save.common.antimatter", "Antimatter: {0}", formatAntimatter(antimatter)) }}</span>
    <PrimaryButton
      class="o-primary-btn--width-medium"
      @click="load"
    >
      {{ t("save.common.load", "Load") }}
    </PrimaryButton>
  </div>
</template>
