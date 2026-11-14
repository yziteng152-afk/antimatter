<script>
export default {
  name: "AutomatorDataTransferSingleEntry",
  props: {
    script: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      presets: [],
      constants: [],
      hidePresets: true,
      hideConstants: true,
    };
  },
  computed: {
    presetData: () => player.timestudy.presets,
    constantData: () => player.reality.automator.constants,
    hasPresets() {
      return (this.presets?.length ?? 0) !== 0;
    },
    hasConstants() {
      return (this.constants?.length ?? 0) !== 0;
    },
    presetCountText() {
      return this.presets.length === 1
        ? this.t("automator.dataTransfer.presetRefOne", "References 1 recognized study preset")
        : this.t("automator.dataTransfer.presetRefMany",
          "References {0} recognized study presets", formatInt(this.presets.length));
    },
    constantCountText() {
      return this.constants.length === 1
        ? this.t("automator.dataTransfer.constantRefOne", "References 1 defined constant")
        : this.t("automator.dataTransfer.constantRefMany",
          "References {0} defined constants", formatInt(this.constants.length));
    },
  },
  methods: {
    update() {
      this.presets = AutomatorBackend.getUsedPresets(this.script.id);
      this.constants = AutomatorBackend.getUsedConstants(this.script.id);
    },
    iconClass(state) {
      return state ? "far fa-plus-square" : "far fa-minus-square";
    },
    exportData(id) {
      const toExport = AutomatorBackend.exportFullScriptData(id);
      if (toExport) {
        copyToClipboard(toExport);
        GameUI.notify.automator(this.t("automator.dataTransfer.exportNotify",
          "Exported all data associated with \"{0}\" to your clipboard", this.script.name), 6000);
      } else {
        GameUI.notify.error(this.t("automator.dataTransfer.exportBlank",
          "Could not export data from blank Automator script!"));
      }
    }
  }
};
</script>

<template>
  <div class="l-entry-padding">
    <button
      v-tooltip="t('automator.dataTransfer.exportTooltip', 'Export Full Script Data')"
      class="l-button-margin fas fa-file-export"
      @click="exportData(script.id)"
    />
    <b>{{ t("automator.dataTransfer.scriptName", "Script name: {0}", script.name) }}</b>
    <br>
    <span v-if="hasPresets">
      <span
        :class="iconClass(hidePresets)"
        @click="hidePresets = !hidePresets"
      />
      {{ presetCountText }}
      <span v-if="!hidePresets">
        <div
          v-for="id in presets"
          :key="id"
        >
          <span v-if="presetData[id].name">{{ t("automator.dataTransfer.presetSlotNamed", "\"{0}\" (slot {1}):", presetData[id].name, id + 1) }}</span>
          <span v-else>{{ t("automator.dataTransfer.presetSlot", "Preset slot {0}:", id + 1) }}</span>
          <br>
          <div class="l-value-padding">
            <span v-if="presetData[id].studies">{{ presetData[id].studies }}</span>
            <i v-else>{{ t("automator.dataTransfer.emptyPreset", "Empty Study Preset") }}</i>
          </div>
        </div>
      </span>
    </span>
    <span v-else>
      {{ t("automator.dataTransfer.noPresets", "Does not reference any study presets.") }}
    </span>
    <br>
    <span v-if="hasConstants">
      <span
        :class="iconClass(hideConstants)"
        @click="hideConstants = !hideConstants"
      />
      {{ constantCountText }}
      <span v-if="!hideConstants">
        <div
          v-for="name in constants"
          :key="name"
        >
          "{{ name }}":
          <br>
          <div class="l-value-padding">
            {{ constantData[name] }}
          </div>
        </div>
      </span>
    </span>
    <span v-else>
      {{ t("automator.dataTransfer.noConstants", "Does not reference any defined constants.") }}
    </span>
  </div>
</template>

<style scoped>
.l-entry-padding {
  border: solid 0.1rem var(--color-automator-docs-font);
  border-radius: var(--var-border-radius, 0.5rem);
  overflow-wrap: break-word;
  padding: 1rem 1.5rem;
}

.l-value-padding {
  padding-left: 1.5rem;
}

.l-button-margin {
  margin-right: 1rem;
}
</style>
