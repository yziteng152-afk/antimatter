<script>
import ModalWrapper from "@/components/modals/ModalWrapper";

import { enumerate } from "@/core/i18n";

export default {
  name: "HotkeysModal",
  components: {
    ModalWrapper
  },
  data() {
    return {
      updateIndicies: [],
      visible: [],
      timeStudyUnlocked: false,
      glyphSacUnlocked: false,
      isElectron: false
    };
  },
  computed: {
    moreShiftKeyInfo() {
      const shiftKeyFunctions = [];
      if (this.timeStudyUnlocked) {
        shiftKeyFunctions.push(this.t("hotkey.shift.buyAllStudies",
          "while buying Time Studies to buy all up until that point"));
        shiftKeyFunctions.push(this.t("hotkey.shift.saveTrees", "to save Time Study Trees"));
      }
      if (this.glyphSacUnlocked) {
        shiftKeyFunctions.push(this.t("hotkey.shift.purgeGlyphs", "to purge Glyphs"));
      }
      const shiftKeyInfo = enumerate(shiftKeyFunctions);
      return (shiftKeyInfo === "")
        ? ""
        : this.t("hotkey.shift.info", "You can hold Shift {0}.", shiftKeyInfo);
    },
    hotkeyCount() {
      return shortcuts.length;
    },
    shortcutNames() {
      return shortcuts.map(x => this.t(`hotkey.name.${x.name}`, x.name));
    },
    shortcutKeys() {
      return shortcuts.map(x => x.keys.map(key => this.format(key)));
    }
  },
  created() {
    for (let i = 0; i < this.hotkeyCount; i++) {
      const visible = shortcuts[i].visible;
      if (typeof visible === "function") {
        this.updateIndicies.push(i);
      } else {
        this.visible[i] = visible;
      }
    }
  },
  methods: {
    update() {
      for (const index of this.updateIndicies) {
        this.$set(this.visible, index, shortcuts[index].visible());
      }
      const progress = PlayerProgress.current;
      this.timeStudyUnlocked = progress.isEternityUnlocked;
      this.glyphSacUnlocked = RealityUpgrade(19).isBought;

      // ElectronRuntime is a global which only exists on Steam (throws a ReferenceError on web)
      try {
        this.isElectron = ElectronRuntime.isActive;
      } catch {
        this.isElectron = false;
      }
    },
    format(x) {
      switch (x) {
        case "mod":
          return "CTRL/⌘";
        default:
          return x.toUpperCase();
      }
    }
  },
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      {{ t("hotkey.title", "Hotkey List") }}
    </template>
    <span class="c-modal-hotkeys l-modal-hotkeys">
      <div class="l-modal-hotkeys__column">
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">
            {{ t("hotkey.buyOneDimension", "Buy 1 Dimension") }}
          </span>
          <kbd>SHIFT</kbd><kbd>1</kbd>-<kbd>SHIFT</kbd><kbd>8</kbd>
        </div>
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">
            {{ t("hotkey.buyTenDimensions", "Buy 10 Dimensions") }}
          </span>
          <kbd>1</kbd>-<kbd>8</kbd>
        </div>
        <div
          v-for="index in hotkeyCount"
          :key="index"
        >
          <span
            v-if="visible[index - 1]"
            class="l-modal-hotkeys-row"
          >
            <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">{{ shortcutNames[index - 1] }}</span>
            <kbd
              v-for="(key, i) in shortcutKeys[index - 1]"
              :key="i"
            >
              {{ key }}
            </kbd>
          </span>
        </div>
      </div>
      <div class="l-modal-hotkeys__column l-modal-hotkeys__column--right">
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">
            {{ t("hotkey.modifierKey", "Modifier Key") }}
          </span>
          <kbd>SHIFT</kbd>
        </div>
        <span class="c-modal-hotkeys__shift-description">
          <!-- eslint-disable-next-line max-len -->
          {{ t("hotkey.shift.description", "Shift is a modifier key that shows additional information on certain things and adjusts the function of certain buttons.") }}
          <br>
          {{ moreShiftKeyInfo }}
        </span>
        <br>
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">
            {{ t("hotkey.autobuyerControls", "Autobuyer Controls") }}
          </span>
          <kbd>ALT</kbd>
        </div>
        <span class="c-modal-hotkeys__shift-description">
          <!-- eslint-disable-next-line max-len -->
          {{ t("hotkey.alt.description1", "Alt is a modifier key that, when pressed in conjunction with any key that has a corresponding autobuyer, will toggle said autobuyer.") }}
          <br>
          <!-- eslint-disable-next-line max-len -->
          {{ t("hotkey.alt.description2", "When pressing both Alt and Shift, you can toggle buying singles or buying max for the Antimatter Dimension and Tickspeed Autobuyers instead.") }}
        </span>
        <br>
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">
            {{ t("hotkey.tabMovement", "Tab Movement") }}
          </span>
          <div>
            <kbd>←</kbd><kbd>↓</kbd><kbd>↑</kbd><kbd>→</kbd>
          </div>
        </div>
        <span class="c-modal-hotkeys__shift-description">
          <!-- eslint-disable-next-line max-len -->
          {{ t("hotkey.tabMovement.description", "Using the Arrow Keys will cycle you through the game's pages. The Up and Down arrows cycle you through tabs, and the Left and Right arrows cycle you through that tab's subtabs.") }}
        </span>
        <br>
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">
            {{ t("hotkey.numpadSupport", "Numpad Support") }}
          </span>
        </div>
        <span class="c-modal-hotkeys__shift-description">
          <!-- eslint-disable-next-line max-len -->
          {{ t("hotkey.numpad.part1", "Due to technical reasons, pressing a numpad key will purchase 10 of a Dimension if possible, but pressing a numpad key with ") }}<kbd>SHIFT</kbd>{{ t("hotkey.numpad.part2", " will not buy a single Dimension. It may instead, depending on your device, cause the page to scroll or change game tabs. ") }}<kbd>ALT</kbd>{{ t("hotkey.numpad.part3", " will still work as expected.") }}
        </span>
        <template v-if="isElectron">
          <br>
          <div class="l-modal-hotkeys-row">
            <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">
              {{ t("hotkey.windowZoom", "Window Zoom") }}
            </span>
            <kbd>-</kbd><kbd>0</kbd><kbd>+</kbd>
          </div>
          <span class="c-modal-hotkeys__shift-description">
            <!-- eslint-disable-next-line max-len -->
            {{ t("hotkey.zoom.part1", "To adjust zoom level, hold ") }}<kbd>ctrl</kbd>{{ t("hotkey.zoom.part2", " and press either ") }}<kbd>-</kbd>{{ t("hotkey.zoom.part3", " or ") }}<kbd>+</kbd>{{ t("hotkey.zoom.part4", " to decrease or increase zoom. ") }}<kbd>ctrl</kbd><kbd>0</kbd>{{ t("hotkey.zoom.part5", " will reset zoom to 100%.") }}
          </span>
          <br>
          <div class="l-modal-hotkeys-row">
            <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">
              {{ t("hotkey.fullscreen", "Fullscreen") }}
            </span>
            <kbd>F10</kbd>
          </div>
          <span class="c-modal-hotkeys__shift-description">
            <!-- eslint-disable-next-line max-len -->
            {{ t("hotkey.fullscreen.part1", "To enter or exit fullscreen, press ") }}<kbd>F10</kbd>{{ t("hotkey.fullscreen.part2", ".") }}
          </span>
        </template>
      </div>
    </span>
  </ModalWrapper>
</template>

<style scoped>
.l-modal-hotkeys__column {
  display: flex;
  flex-direction: column;
  width: 28rem;
}

.l-modal-hotkeys__column--right {
  margin-left: 1rem;
}

.c-modal-hotkeys {
  font-size: 1.25rem;
}

.l-modal-hotkeys {
  display: flex;
  flex-direction: row;
}

.l-modal-hotkeys-row {
  display: flex;
  flex-direction: row;
  line-height: 1.6rem;
  padding-bottom: 0.3rem;
}

.c-modal-hotkeys-row__name {
  text-align: left;
}

.l-modal-hotkeys-row__name {
  flex: 1 1 auto;
}

.c-modal-hotkeys__shift-description {
  text-align: left;
  font-size: 1rem;
}
</style>
