<script>
export default {
  name: "ModalConfirmationCheck",
  props: {
    option: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      setting: true
    };
  },
  computed: {
    confirmation() {
      return ConfirmationTypes[this.option];
    },
    confirmationClass() {
      return {
        "c-modal__confirmation-toggle__checkbox": true,
        "c-modal__confirmation-toggle__checkbox--active": !this.setting
      };
    },
    tooltipText() {
      const name = this.t(`modal.confirm.${this.confirmation.name}`, this.confirmation.name);
      return this.setting
        ? this.t("modal.disableConfirm", "Disable the {0} confirmation", name)
        : this.t("modal.reenableConfirm", "Reenable the {0} confirmation", name);
    },
  },
  created() {
    this.setting = this.confirmation.option;
  },
  methods: {
    toggle() {
      this.setting = !this.setting;
      this.confirmation.option = this.setting;
    }
  }
};
</script>

<template>
  <div
    class="c-modal__confirmation-toggle"
    @click="toggle"
  >
    <div :class="confirmationClass">
      <span
        v-if="!setting"
        class="fas fa-check"
      />
      <div class="c-modal__confirmation-toggle__tooltip">
        {{ tooltipText }}
      </div>
    </div>
    <span class="c-modal__confirmation-toggle__text">
      {{ t("modal.hideConfirmation", "Don't show this message again") }}
    </span>
  </div>
</template>
