<script>
import PrimaryButton from "@/components/PrimaryButton";

import { BACKUP_SLOT_TYPE } from "@/core/storage";

export default {
  name: "BackupEntry",
  components: {
    PrimaryButton
  },
  props: {
    slotData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currTime: 0,
    };
  },
  computed: {
    save() {
      return GameStorage.loadFromBackup(this.slotData.id);
    },
    progressStr() {
      if (!this.save) return this.t("modal.backup.empty", "(Empty)");

      // These will be checked in order; the first nonzero resource will be returned
      const resources = [this.save.celestials.pelle.realityShards,
        this.save.reality.iMCap,
        this.save.reality.realityMachines,
        this.save.eternityPoints,
        this.save.infinityPoints,
        this.save.antimatter
      ];
      const names = [
        this.t("modal.backup.resource.realityShards", "Reality Shards"),
        this.t("modal.backup.resource.imaginaryMachineCap", "Imaginary Machine Cap"),
        this.t("modal.backup.resource.realityMachines", "Reality Machines"),
        this.t("modal.backup.resource.eternityPoints", "Eternity Points"),
        this.t("modal.backup.resource.infinityPoints", "Infinity Points"),
        this.t("modal.backup.resource.antimatter", "Antimatter")
      ];

      for (let index = 0; index < resources.length; index++) {
        const val = new Decimal(resources[index]);
        if (val.gt(0)) {
          return this.t("modal.backup.progress", "{0}: {1}", names[index], formatPostBreak(val, 2));
        }
      }

      // In practice this should never happen, unless a save triggers on the same tick the very first AD1 is bought
      return this.t("modal.backup.noResources", "No resources");
    },
    // Equivalent to slotData.intervalStr(), but built from the raw interval so the unit can be translated
    intervalText() {
      const minutes = this.slotData.interval / 60;
      if (minutes < 60) {
        return minutes === 1
          ? this.t("modal.backup.minute", "{0} minute", formatInt(minutes))
          : this.t("modal.backup.minutes", "{0} minutes", formatInt(minutes));
      }
      const hours = minutes / 60;
      return hours === 1
        ? this.t("modal.backup.hour", "{0} hour", formatInt(hours))
        : this.t("modal.backup.hours", "{0} hours", formatInt(hours));
    },
    slotType() {
      switch (this.slotData.type) {
        case BACKUP_SLOT_TYPE.ONLINE:
          return this.t("modal.backup.slotOnline", "Saves every {0} online", this.intervalText);
        case BACKUP_SLOT_TYPE.OFFLINE:
          return this.t("modal.backup.slotOffline", "Saves after {0} offline", this.intervalText);
        case BACKUP_SLOT_TYPE.RESERVE:
          return this.t("modal.backup.slotReserve", "Pre-loading save");
        default:
          throw new Error("Unrecognized backup save type");
      }
    },
    lastSaved() {
      const lastSave = GameStorage.lastBackupTimes[this.slotData.id]?.date ?? 0;
      return lastSave
        ? this.t("modal.backup.lastSaved", "Last saved: {0} ago",
          TimeSpan.fromMilliseconds(this.currTime - lastSave))
        : this.t("modal.backup.notInUse", "Slot not currently in use");
    },
  },
  methods: {
    update() {
      this.currTime = Date.now();
    },
    load() {
      if (!this.save) return;
      // This seems to be the only way to properly hide the modal after the save is properly loaded,
      // since the offline progress modal appears nearly immediately after clicking the button
      Modal.hide();

      // We still save to the reserve slot even if we're loading from it, so we temporarily store the
      // save-to-be-loaded into a string in this scope so that it doesn't get overwritten by the current save
      const toLoad = this.save;
      GameStorage.saveToReserveSlot();

      GameStorage.ignoreBackupTimer = true;
      GameStorage.offlineEnabled = player.options.loadBackupWithoutOffline ? false : undefined;
      GameStorage.oldBackupTimer = player.backupTimer;
      GameStorage.loadPlayerObject(toLoad);
      GameUI.notify.info(this.t("modal.backup.loadedNotify", "Game loaded from backup slot #{0}",
        this.slotData.id));
      GameStorage.loadBackupTimes();
      GameStorage.ignoreBackupTimer = false;
      GameStorage.offlineEnabled = undefined;
      GameStorage.resetBackupTimer();
      GameStorage.save(true);
    },
  },
};
</script>

<template>
  <div class="c-bordered-entry">
    <h3>{{ t("modal.backup.slotHeader", "Slot #{0}:", slotData.id) }}</h3>
    <span>{{ progressStr }}</span>
    <span>
      {{ slotType }}
    </span>
    <span class="c-fixed-height">{{ lastSaved }}</span>
    <PrimaryButton
      class="o-primary-btn--width-medium"
      :class="{ 'o-primary-btn--disabled' : !save }"
      @click="load()"
    >
      {{ t("modal.backup.load", "Load") }}
    </PrimaryButton>
  </div>
</template>

<style scoped>
.c-bordered-entry {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.1rem;
  border: var(--var-border-width, 0.2rem) solid;
  border-radius: var(--var-border-radius, 0.4rem);
  padding: 0.5rem 0.3rem;
  margin: 0.3rem;
}

.c-fixed-height {
  height: 4rem;
}
</style>
