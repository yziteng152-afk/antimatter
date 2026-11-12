<script>
import { DC } from "@/core/constants";

export default {
  name: "AntimatterDimensionProgressBar",
  data() {
    return {
      fill: 0,
      tooltip: "",
      displayPercents: "",
    };
  },
  computed: {
    progressBarStyle() {
      return {
        width: `${(this.fill * 100).toFixed(2)}%`
      };
    }
  },
  methods: {
    // eslint-disable-next-line complexity
    update() {
      this.displayPercents = formatPercents(this.fill, 2);
      const setProgress = (current, goal, tooltip) => {
        this.fill = Math.clampMax(current.pLog10() / Decimal.log10(goal), 1);
        this.tooltip = tooltip;
      };
      const setLinearProgress = (current, goal, tooltip) => {
        this.fill = Math.clampMax(current / goal, 1);
        this.tooltip = tooltip;
      };

      // Goals for challenges and challenge-like runs should come first because numbers will always be much smaller
      // than normal and therefore default filling won't be meaningful. Since challenges get completed or abandoned from
      // the inside outwards, we show the goals in that priority as well. It only makes sense to check cel6 and not the
      // others because pre-cel3 completion it'll default to e4000 and cel4/5 don't have meaningful single goals
      const tip = {
        challenge: this.t("dim.pctChallenge", "Percentage to Challenge goal"),
        nextChallenge: this.t("dim.pctNextChallenge", "Percentage to next Challenge completion"),
        challengeDone: this.t("dim.pctChallengeDone", "This Challenge is already fully completed!"),
        ecGoal: this.t("dim.pctEC", "Percentage to Eternity Challenge goal"),
        tp: this.t("dim.pctTP", "Percentage to gain more TP in Dilation"),
        dilationEternity: this.t("dim.pctEternityInDilation", "Percentage to Eternity in Dilation"),
        destabilized: this.t("dim.pctDestabilized", "Percentage to Destabilized Reality"),
        tesseract: this.t("dim.pctTesseract", "Percentage to next Tesseract"),
        galaxyGenerator: this.t("dim.pctGalaxyGenerator", "Percentage to Galaxy Generator"),
        strike: n => this.t("dim.pctStrike", "Percentage to {0} Strike", n.word, n.num),
        reality: this.t("dim.pctReality", "Percentage to Reality"),
        eternity: this.t("dim.pctEternity", "Percentage to Eternity"),
        infinity: this.t("dim.pctInfinity", "Percentage to Infinity"),
      };
      const strike = (word, num) => tip.strike({ word, num });

      const inSpecialRun = Player.isInAntimatterChallenge || EternityChallenge.isRunning || player.dilation.active ||
        Laitela.isRunning;
      if (inSpecialRun) {
        if (Player.isInAntimatterChallenge) {
          setProgress(Currency.antimatter.value, Player.antimatterChallenge.goal, tip.challenge);
        } else if (EternityChallenge.isRunning) {
          if (Perk.studyECBulk.isBought) {
            // Note: If the EC is fully complete, this prop doesn't exist
            const goal = EternityChallenge.current.gainedCompletionStatus.nextGoalAt;
            if (goal) {
              setProgress(Currency.infinityPoints.value, goal, tip.nextChallenge);
            } else {
              // In a fully completed EC, there's nothing useful we can show so we just pin it at 100% and say so
              setProgress(Currency.infinityPoints.value, 10, tip.challengeDone);
            }
          } else {
            setProgress(Currency.infinityPoints.value, Player.eternityGoal, tip.ecGoal);
          }
        } else if (player.dilation.active) {
          if (player.dilation.lastEP.gt(0)) {
            setProgress(Currency.antimatter.value, getTachyonReq(), tip.tp);
          } else {
            setProgress(Currency.infinityPoints.value, Player.eternityGoal, tip.dilationEternity);
          }
        } else {
          // Lai'tela destabilization; since the progress bar is logarithmically-scaled, we need to pow10 the arguments
          setProgress(Decimal.pow10(player.celestials.laitela.entropy), 10, tip.destabilized);
        }
      } else if (Pelle.isDoomed) {
        if (PelleRifts.recursion.milestones[2].canBeApplied || GalaxyGenerator.spentGalaxies > 0) {
          setProgress(Currency.infinityPoints.value, Tesseracts.nextCost, tip.tesseract);
        } else if (PelleStrikes.dilation.hasStrike) {
          setProgress(Currency.eternityPoints.value, DC.E4000, tip.galaxyGenerator);
        } else if (PelleStrikes.ECs.hasStrike) {
          setLinearProgress(
            (Math.min(Currency.timeTheorems.max.toNumber() / 12900, 1) +
            Math.min(EternityChallenges.completions / 60, 1)) / 2,
            1, strike("fifth", 5));
        } else if (PelleStrikes.eternity.hasStrike) {
          setLinearProgress(Currency.timeTheorems.max.toNumber(), 115, strike("fourth", 4));
        } else if (PelleStrikes.powerGalaxies.hasStrike) {
          setProgress(Currency.infinityPoints.value, Player.eternityGoal, strike("third", 3));
        } else if (PelleStrikes.infinity.hasStrike) {
          if (player.break) {
            setProgress(Currency.infinityPoints.value, 5e11, strike("second", 2));
          } else {
            setProgress(Currency.antimatter.value, Decimal.NUMBER_MAX_VALUE, tip.infinity);
          }
        } else {
          setProgress(Currency.antimatter.value, Decimal.NUMBER_MAX_VALUE, strike("first", 1));
        }
      } else if (Enslaved.isCompleted) {
        // Show all other goals from the top down, starting at features in the highest prestige layer
        setProgress(Currency.infinityPoints.value, Tesseracts.nextCost, tip.tesseract);
      } else if (PlayerProgress.dilationUnlocked()) {
        setProgress(Currency.eternityPoints.value, DC.E4000, tip.reality);
      } else if (InfinityDimension(8).isUnlocked) {
        setProgress(Currency.infinityPoints.value, Player.eternityGoal, tip.eternity);
      } else if (player.break) {
        const text = InfinityDimensions.next().hasIPUnlock
          ? this.t("dim.pctUnlockDimensionType", "Percentage to unlock a new type of Dimension")
          : this.t("dim.pctUnlockInfinityDimension", "Percentage to unlock a new Infinity Dimension");
        const nextID = InfinityDimensions.next();
        if (nextID.ipRequirementReached) {
          setProgress(player.records.thisEternity.maxAM, nextID.amRequirement, text);
        } else {
          setProgress(player.infinityPoints, nextID.ipRequirement, text);
        }
      } else {
        setProgress(Currency.antimatter.value, Decimal.NUMBER_MAX_VALUE, tip.infinity);
      }
    }
  }
};
</script>

<template>
  <div class="c-progress-bar">
    <div
      :style="progressBarStyle"
      class="c-progress-bar__fill"
    >
      <span
        v-tooltip="tooltip"
        class="c-progress-bar__percents"
      >
        {{ displayPercents }}
      </span>
    </div>
  </div>
</template>
