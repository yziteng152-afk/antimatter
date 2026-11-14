<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import PrimaryButton from "@/components/PrimaryButton";

const OFFLINE_PROGRESS_TYPE = {
  IMPORTED: 0,
  LOCAL: 1,
  IGNORED: 2,
};

export default {
  name: "ImportSaveModal",
  components: {
    ModalWrapperChoice,
    PrimaryButton
  },
  data() {
    return {
      input: "",
      offlineImport: OFFLINE_PROGRESS_TYPE.IMPORTED,
    };
  },
  computed: {
    saveCheckString() {
      const save = GameSaveSerializer.deserialize(this.input);
      const rawString = GameStorage.checkPlayerObject(save);
      // Keep the length bounded; we don't want the modal to be too big for the screen for particularly bad errors
      return rawString.length > 300 ? `${rawString.slice(0, 297)}...` : rawString;
    },
    player() {
      return this.saveCheckString === "" ? GameSaveSerializer.deserialize(this.input) : undefined;
    },
    progress() {
      return PlayerProgress.of(this.player);
    },
    fileName() {
      return this.player.options.saveFileName;
    },
    antimatter() {
      return this.player.antimatter || this.player.money;
    },
    infinities() {
      // Infinity count data is stored in either player.infinitied or player.infinities based on if the save is before
      // or after the reality update, and this explicit check is needed as it runs before any migration code.
      const infinityData = this.player.infinitied ? this.player.infinitied : this.player.infinities;
      return new Decimal(infinityData);
    },
    hasInput() {
      return this.input !== "";
    },
    inputIsValid() {
      return this.inputIsValidSave || this.inputIsSecret;
    },
    inputIsValidSave() {
      return this.player !== undefined;
    },
    inputIsSecret() {
      return isSecretImport(this.input) || Theme.isSecretTheme(this.input);
    },
    isFromFuture() {
      return this.player.lastUpdate > Date.now();
    },
    lastOpened() {
      const ms = Date.now() - this.player.lastUpdate;
      return this.isFromFuture
        ? this.t("save.import.future", "This save is from {0} in the future.",
          TimeSpan.fromMilliseconds(-ms).toString())
        : this.t("save.import.lastOpened", "This save was last opened {0} ago.",
          TimeSpan.fromMilliseconds(ms).toString());
    },
    offlineType() {
      // We update here in the computed method instead of elsewhere because otherwise it initializes the text
      // to a wrong or undefined setting
      this.updateOfflineSettings();

      switch (this.offlineImport) {
        case OFFLINE_PROGRESS_TYPE.IMPORTED:
          return this.t("save.import.offlineImported", "Using imported save settings");
        case OFFLINE_PROGRESS_TYPE.LOCAL:
          return this.t("save.import.offlineLocal", "Using existing save settings");
        case OFFLINE_PROGRESS_TYPE.IGNORED:
          return this.t("save.import.offlineIgnored", "Will not simulate offline time");
        default:
          throw new Error("Unrecognized offline progress setting for importing");
      }
    },
    offlineDetails() {
      if (this.offlineImport === OFFLINE_PROGRESS_TYPE.IGNORED) {
        return this.t("save.import.offlineNone", "Save will be imported without offline progress.");
      }
      if (!GameStorage.offlineEnabled) {
        return this.t("save.import.offlineDisabled",
          "This setting will not apply any offline progress after importing.");
      }
      if (this.isFromFuture) {
        return this.t("save.import.offlineClock",
          "Offline progress cannot be simulated due to an inconsistent system clock time.");
      }

      const durationInMs = Date.now() - this.player.lastUpdate;
      const ticks = GameStorage.maxOfflineTicks(durationInMs);
      return this.t("save.import.offlineTicks",
        "After importing, will simulate {0} ticks of duration {1} each.",
        formatInt(ticks), TimeSpan.fromMilliseconds(durationInMs / ticks).toStringShort());
    },
    willLoseCosmetics() {
      const currSets = player.reality.glyphs.cosmetics.unlockedFromNG;
      const importedSets = this.player.reality?.glyphs.cosmetics?.unlockedFromNG ?? [];
      return currSets.filter(set => !importedSets.includes(set)).length > 0;
    },
    willLoseSpeedrun() {
      return player.speedrun.isUnlocked && !this.player.speedrun?.isUnlocked;
    }
  },
  mounted() {
    this.$refs.input.select();
  },
  destroyed() {
    // Explicitly setting this to undefined after closing forces the game to fall-back to the stored settings within
    // the player object if this modal is closed - ie. it makes sure actions in the modal don't persist
    GameStorage.offlineEnabled = undefined;
    GameStorage.offlineTicks = undefined;
  },
  methods: {
    changeOfflineSetting() {
      this.offlineImport = (this.offlineImport + 1) % 3;
    },
    updateOfflineSettings() {
      switch (this.offlineImport) {
        case OFFLINE_PROGRESS_TYPE.IMPORTED:
          // These are default values from a new save, used if importing from pre-reality where these props don't exist
          GameStorage.offlineEnabled = this.player.options.offlineProgress ?? true;
          GameStorage.offlineTicks = this.player.options.offlineTicks ?? 1e5;
          break;
        case OFFLINE_PROGRESS_TYPE.LOCAL:
          GameStorage.offlineEnabled = player.options.offlineProgress;
          GameStorage.offlineTicks = player.options.offlineTicks;
          break;
        case OFFLINE_PROGRESS_TYPE.IGNORED:
          GameStorage.offlineEnabled = false;
          break;
      }
    },
    importSave() {
      if (!this.inputIsValid) return;
      this.emitClose();
      GameStorage.import(this.input);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="!inputIsValid"
    :show-confirm="false"
  >
    <template #header>
      {{ t("save.import.title", "Input your save") }}
    </template>
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-import__input"
      @keyup.enter="importSave"
      @keyup.esc="emitClose"
    >
    <div class="c-modal-import__save-info">
      <div v-if="inputIsSecret">
        ???
      </div>
      <template v-else-if="inputIsValidSave">
        <div v-if="fileName">
          {{ t("save.common.fileName", "File name: {0}", fileName) }}
        </div>
        <div>{{ t("save.common.antimatter", "Antimatter: {0}", formatPostBreak(antimatter, 2, 1)) }}</div>
        <div v-if="progress.isInfinityUnlocked">
          {{ t("save.import.infinities", "Infinities: {0}", formatPostBreak(infinities, 2)) }}
        </div>
        <div v-if="progress.isEternityUnlocked">
          {{ t("save.import.eternities", "Eternities: {0}", formatPostBreak(player.eternities, 2)) }}
        </div>
        <div v-if="progress.isRealityUnlocked">
          {{ t("save.import.realities", "Realities: {0}", formatPostBreak(player.realities, 2)) }}
        </div>
        <div v-if="progress.hasFullCompletion">
          {{ t("save.import.fullCompletions", "Full game completions: {0}",
               formatInt(player.records.fullGameCompletions)) }}
        </div>
        <div class="c-modal-import__warning">
          {{ t("save.import.overwriteWarning", "(Your current save file will be overwritten!)") }}
        </div>
        <br>
        <div>
          {{ lastOpened }}
          <div
            class="o-primary-btn"
            @click="changeOfflineSetting"
          >
            {{ t("save.common.offlineProgress", "Offline Progress: {0}", offlineType) }}
          </div>
          <span v-html="offlineDetails" />
        </div>
      </template>
      <div v-else-if="hasInput">
        {{ t("save.import.invalid", "Not a valid save:") }}
        <br>
        {{ saveCheckString }}
      </div>
      <div
        v-if="player"
        class="c-modal-hard-reset-danger"
      >
        <div v-if="willLoseCosmetics">
          <br>
          {{ t("save.import.cosmeticsTied",
               "Glyph cosmetic sets from completing the game are tied to your save.") }}
          <br>
          {{ t("save.import.cosmeticsLose", "Importing this save will cause you to lose some sets.") }}
        </div>
        <div v-if="willLoseSpeedrun">
          <br>
          {{ t("save.import.speedrunLose",
               "You will lose the ability to do a Speedrun, as this save does not have it unlocked.") }}
        </div>
      </div>
    </div>

    <PrimaryButton
      v-if="inputIsValid"
      class="o-primary-btn--width-medium c-modal-message__okay-btn c-modal__confirm-btn"
      @click="importSave"
    >
      {{ t("save.common.import", "Import") }}
    </PrimaryButton>
  </ModalWrapperChoice>
</template>