<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ChangeNameModal",
  components: {
    ModalWrapperChoice,
  },
  data() {
    return {
      input: "",
      actualName: ""
    };
  },
  created() {
    this.input = player.speedrun.name;
    this.actualName = Speedrun.generateName(this.input);
  },
  mounted() {
    this.$refs.input.select();
  },
  methods: {
    updateName() {
      this.actualName = Speedrun.generateName(this.input);
    },
    confirmChange() {
      player.speedrun.name = this.actualName;
      this.emitClose();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice @confirm="confirmChange">
    <template #header>
      {{ t("save.name.title", "Change your Speedrun Player Name") }}
    </template>
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-import__input"
      @keyup="updateName"
      @keyup.enter="confirmChange"
      @keyup.esc="emitClose"
    >
    <i>
      {{ t("save.name.note",
           "This can no longer be changed once the timer starts, and there is a limit of {0} characters.",
           formatInt(40)) }}
    </i>
    <div>
      {{ t("save.name.newName", "Your new name will be {0}", actualName) }}
    </div>
    <template #confirm-text>
      {{ t("save.name.confirm", "Change Name") }}
    </template>
  </ModalWrapperChoice>
</template>
