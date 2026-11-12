<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "PrimaryToggleButton",
  components: {
    PrimaryButton
  },
  props: {
    label: {
      type: String,
      required: false,
      default: ""
    },
    on: {
      type: String,
      required: false,
      default: ""
    },
    off: {
      type: String,
      required: false,
      default: ""
    },
    value: {
      type: Boolean,
      required: true
    },
  },
  computed: {
    displayText() {
      const on = this.on || this.t("common.on", "ON");
      const off = this.off || this.t("common.off", "OFF");
      return `${this.label} ${this.value ? on : off}`.trim();
    }
  },
};
</script>

<template>
  <PrimaryButton
    v-bind="$attrs"
    @click="emitInput(!value)"
  >
    {{ displayText }}
  </PrimaryButton>
</template>

