<script>
import ExpandingControlBox from "@/components/ExpandingControlBox";
import OpenModalHotkeysButton from "@/components/OpenModalHotkeysButton";
import OptionsButton from "@/components/OptionsButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SelectLanguageDropdown from "@/components/tabs/options-visual/SelectLanguageDropdown";
import SelectNotationDropdown from "@/components/tabs/options-visual/SelectNotationDropdown";
import SelectSidebarDropdown from "@/components/tabs/options-visual/SelectSidebarDropdown";
import SelectThemeDropdown from "@/components/tabs/options-visual/SelectThemeDropdown";
import UpdateRateSlider from "./UpdateRateSlider";

import { LANGUAGES } from "@/core/i18n";

export default {
  name: "OptionsVisualTab",
  components: {
    UpdateRateSlider,
    PrimaryToggleButton,
    ExpandingControlBox,
    OptionsButton,
    OpenModalHotkeysButton,
    SelectThemeDropdown,
    SelectLanguageDropdown,
    SelectNotationDropdown,
    SelectSidebarDropdown
  },
  data() {
    return {
      theme: "",
      notation: "",
      sidebarResource: "",
      headerTextColored: true,
    };
  },
  computed: {
    sidebarDB: () => GameDatabase.sidebarResources,
    themeLabel() {
      return this.t("opt.theme", "Theme: {0}", Themes.find(this.theme).displayName());
    },
    languageLabel() {
      const language = LANGUAGES.find(l => l.id === this.$viewModel.language) ?? LANGUAGES[1];
      return this.t("opt.language", "Language: {0}", language.name);
    },
    notationLabel() {
      return this.t("opt.notation", "Notation: {0}", this.notation);
    },
    sidebarLabel() {
      return this.t("opt.sidebar", "Sidebar (Modern UI): {0}", this.sidebarResource);
    },
    UILabel() {
      return this.t("opt.uiMode", "UI: {0}", this.$viewModel.newUI
        ? this.t("opt.uiModern", "Modern")
        : this.t("opt.uiClassic", "Classic"));
    }
  },
  watch: {
    headerTextColored(newValue) {
      player.options.headerTextColored = newValue;
    },
  },
  methods: {
    update() {
      const options = player.options;
      this.theme = Theme.currentName();
      this.notation = options.notation;
      this.sidebarResource = player.options.sidebarResourceID === 0
        ? this.t("opt.latestResource", "Latest Resource")
        : this.sidebarDB.find(e => e.id === player.options.sidebarResourceID).optionName;
      this.headerTextColored = options.headerTextColored;
    },
  }
};
</script>

<template>
  <div class="l-options-tab">
    <div class="l-options-grid">
      <div class="l-options-grid__row">
        <ExpandingControlBox
          class="l-options-grid__button c-options-grid__notations"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header"
          :label="languageLabel"
        >
          <template #dropdown>
            <SelectLanguageDropdown />
          </template>
        </ExpandingControlBox>
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option_font-large"
          onclick="GameOptions.toggleUI()"
        >
          {{ UILabel }}
        </OptionsButton>
        <UpdateRateSlider />
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.newsOptions.show();"
        >
          {{ t("opt.newsOptions", "Open News Options") }}
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <ExpandingControlBox
          class="l-options-grid__button c-options-grid__notations"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header"
          :label="themeLabel"
        >
          <template #dropdown>
            <SelectThemeDropdown />
          </template>
        </ExpandingControlBox>
        <ExpandingControlBox
          class="l-options-grid__button c-options-grid__notations"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header"
          :label="notationLabel"
        >
          <template #dropdown>
            <SelectNotationDropdown />
          </template>
        </ExpandingControlBox>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.notation.show();"
        >
          {{ t("opt.notationOptions", "Open Exponent Notation Options") }}
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.animationOptions.show();"
        >
          {{ t("opt.animationOptions", "Open Animation Options") }}
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.infoDisplayOptions.show()"
        >
          {{ t("opt.infoDisplayOptions", "Open Info Display Options") }}
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.awayProgressOptions.show()"
        >
          {{ t("opt.awayProgressOptions", "Open Away Progress Options") }}
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.hiddenTabs.show()"
        >
          {{ t("opt.hiddenTabs", "Modify Visible Tabs") }}
        </OptionsButton>
        <PrimaryToggleButton
          v-model="headerTextColored"
          class="o-primary-btn--option l-options-grid__button"
          :label="t('opt.headerTextColored', 'Relative prestige gain text coloring:')"
        />
        <ExpandingControlBox
          v-if="$viewModel.newUI"
          class="l-options-grid__button c-options-grid__notations"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header"
          :label="sidebarLabel"
        >
          <template #dropdown>
            <SelectSidebarDropdown />
          </template>
        </ExpandingControlBox>
      </div>
      <OpenModalHotkeysButton />
    </div>
  </div>
</template>
