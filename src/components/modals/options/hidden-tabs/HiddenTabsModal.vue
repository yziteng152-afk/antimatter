<script>
import HiddenTabGroup from "@/components/modals/options/hidden-tabs/HiddenTabGroup";
import ModalWrapperOptions from "@/components/modals/options/ModalWrapperOptions";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "HiddenTabsModal",
  components: {
    HiddenTabGroup,
    ModalWrapperOptions,
    PrimaryButton,
  },
  data() {
    return {
      isEnslaved: false,
      isAlmostEnd: false,
    };
  },
  computed: {
    tabs: () => Tabs.currentUIFormat,
  },
  methods: {
    update() {
      this.isEnslaved = Enslaved.isRunning;
      this.isAlmostEnd = Pelle.hasGalaxyGenerator;
    },
    showAllTabs() {
      for (const tab of this.tabs) {
        tab.unhideTab();
        for (const subtab of tab.subtabs)
          subtab.unhideTab();
      }
    }
  },
};
</script>

<template>
  <ModalWrapperOptions class="l-wrapper">
    <template #header>
      {{ t("hidden.title", "Modify Visible Tabs") }}
    </template>
    <div class="c-modal--short">
      {{ t("hidden.instruction1", "Click a button to toggle showing a tab on/off.") }}
      <br>
      {{ t("hidden.instruction2", "Some tabs cannot be hidden, and you cannot hide your current tab.") }}
      <br>
      <!-- eslint-disable-next-line max-len -->
      {{ t("hidden.instruction3", "Unhiding a tab in which all subtabs are hidden will also unhide all subtabs, and hiding all subtabs will also hide the tab.") }}
      <br>
      <div v-if="isAlmostEnd">
        {{ t("hidden.galaxyGenerator", "You cannot hide your tabs after unlocking the Galaxy Generator.") }}
      </div>
      <div v-if="isEnslaved">
        <br>
        <i>{{ t("hidden.enslaved", "You must... see everywhere...") }}</i>
        <br>
        {{ t("hidden.enslavedNote", "(You cannot hide your tabs within this Reality)") }}
      </div>
      <PrimaryButton
        @click="showAllTabs"
      >
        {{ t("hidden.showAllTabs", "Show all tabs") }}
      </PrimaryButton>
      <HiddenTabGroup
        v-for="(tab, index) in tabs"
        :key="index"
        :tab="tab"
        :change-enabled="!isEnslaved && !isAlmostEnd"
        class="l-hide-modal-tab-container"
      />
    </div>
  </ModalWrapperOptions>
</template>

<style scoped>
.l-wrapper {
  width: 62rem;
}

.t-s12 .l-wrapper {
  width: 65rem;
}
</style>