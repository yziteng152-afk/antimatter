<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "EternityModal",
  components: {
    ResetModal
  },
  data() {
    return {
      exitingEC: false,
      startingIP: new Decimal(),
      gainedEternityPoints: new Decimal(),
      gainedEternities: new Decimal()
    };
  },
  computed: {
    message() {
      return PlayerProgress.eternityUnlocked()
        ? this.t("pres.eternity.message",
          `Eternity will reset everything except Achievements, Challenge records, and anything under the General header
          on the Statistics tab.`)
        : this.t("pres.eternity.messageFirst",
          `Eternity will reset everything except Achievements, Challenge records, and anything under the General header
          on the Statistics tab. You will also gain an Eternity Point and unlock various upgrades.`);
    },
    gainedEPOnEternity() {
      return this.t("pres.eternity.gained",
        `You will gain {0}
        and {1} on Eternity.`,
        quantify("Eternity", this.gainedEternities, 2), quantify("Eternity Point", this.gainedEternityPoints, 2));
    },
    startWithIP() {
      return this.startingIP.gt(0)
        ? this.t("pres.eternity.startIP", "You will start your next Eternity with {0}.",
          quantify("Infinity Point", this.startingIP, 2))
        : ``;
    },
    eternityChallenge() {
      const ec = EternityChallenge.current;
      if (ec.isFullyCompleted) {
        return this.t("pres.eternity.ecComplete", "Eternity Challenge {0} is already fully completed.", ec.id);
      }
      if (!Perk.studyECBulk.isBought) {
        return this.t("pres.eternity.ecGain", "You will gain one completion of Eternity Challenge {0}.", ec.id);
      }
      const gainedCompletions = ec.gainedCompletionStatus.gainedCompletions;
      return this.t("pres.eternity.ecCompletions", "You will gain {0} for Eternity Challenge {1}.",
        quantifyInt("completion", gainedCompletions), ec.id);
    }
  },
  methods: {
    update() {
      this.exitingEC = EternityChallenge.isRunning;
      this.startingIP = Currency.infinityPoints.startingValue;
      this.gainedEternityPoints = gainedEternityPoints();
      this.gainedEternities = gainedEternities();
    },
    handleYesClick() {
      animateAndEternity();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ResetModal
    :header="exitingEC
      ? t('pres.eternity.ecHeader', 'Complete Eternity Challenge')
      : t('pres.eternity.header', 'You are about to Eternity')"
    :message="message"
    :gained-resources="gainedEPOnEternity"
    :starting-resources="startWithIP"
    :confirm-fn="handleYesClick"
    :alternate-condition="exitingEC"
    :alternate-text="exitingEC ? eternityChallenge : undefined"
    confirm-option="eternity"
  />
</template>
