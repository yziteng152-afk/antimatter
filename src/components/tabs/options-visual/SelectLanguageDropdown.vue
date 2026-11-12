<script>
import { LANGUAGES, setLanguage } from "@/core/i18n";

export default {
  name: "SelectLanguageDropdown",
  data() {
    return {
      languages: LANGUAGES,
      currentLanguage: "",
    };
  },
  methods: {
    update() {
      this.currentLanguage = ui.view.language;
    },
    select(language) {
      setLanguage(language.id);
    },
  },
};
</script>

<template>
  <div class="l-select-theme">
    <div class="l-select-theme__inner">
      <div
        v-for="language in languages"
        :key="language.id"
        class="o-primary-btn l-select-theme__item c-select-theme__item"
        :class="{ 'l-select-theme__item--active': language.id === currentLanguage }"
        @click="select(language)"
      >
        {{ language.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.l-select-theme__item--active {
  color: var(--color-reality-light, #6ee7ff);
  font-weight: bold;
}
</style>
