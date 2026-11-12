<script>
import InformationModalButton from "@/components/modals/InformationModalButton";
import ModalCloseButton from "@/components/modals/ModalCloseButton";

export default {
  name: "InformationModal",
  components: {
    ModalCloseButton,
    InformationModalButton
  },
};
</script>

<template>
  <div class="l-information-modal c-information-modal">
    <ModalCloseButton @click="emitClose" />
    <div class="l-h2p-header">
      <div class="c-h2p-title">
        {{ t("modal.info.title", "About the game") }}
      </div>
    </div>
    <div class="c-info-body">
      {{ t("modal.info.p1",
           "Antimatter Dimensions is an Idle Incremental game created by Finnish developer Hevipelle. " +
             "Originating as a solo project in 2016, it was expanded upon by a large team of developers and " +
             "testers from then on.") }}
      <br>
      <br>
      {{ t("modal.info.p2",
           'The game has unfolding gameplay and multiple prestige layers. The "How to Play" button contains useful ' +
             "information about progressing.") }}
      <br>
      <br>
      {{ t("modal.info.p3",
           "This version was brought to popo by Kong Zeyang, translated into Chinese and further developed by " +
             "Yang Ziteng. For any bugs or guides, feel free to DM yangziteng01. Enjoy the game!") }}
    </div>
    <div class="l-socials">
      <InformationModalButton
        :name="t('modal.info.github', 'GitHub repository')"
        icon="fa-brands fa-github"
        link="https://github.com/IvarK/AntimatterDimensionsSourceCode"
      />
      <InformationModalButton
        :name="t('modal.info.reddit', 'r/AntimatterDimensions')"
        icon="fa-brands fa-reddit-alien"
        link="https://www.reddit.com/r/AntimatterDimensions/"
      />
      <InformationModalButton
        :name="t('modal.info.discord', 'Antimatter Dimensions Discord Server')"
        icon="fa-brands fa-discord"
        link="https://discord.gg/ST9NaXa"
      />
      <InformationModalButton
        :name="t('modal.info.googlePlay', 'Antimatter Dimensions on Google Play')"
        icon="fa-brands fa-google-play"
        link="https://play.google.com/store/apps/details?id=kajfosz.antimatterdimensions"
      />
      <InformationModalButton
        :name="t('modal.info.appStore', 'Antimatter Dimensions on App Store')"
        icon="fa-brands fa-app-store-ios"
        link="https://apps.apple.com/us/app/antimatter-dimensions/id6738206800"
      />
      <InformationModalButton
        :name="t('modal.info.steam', 'Antimatter Dimensions on Steam')"
        icon="fa-brands fa-steam"
        link="https://store.steampowered.com/app/1399720/Antimatter_Dimensions/"
      />
      <InformationModalButton
        :name="t('modal.info.credits', 'Credits')"
        icon="fa-solid fa-users"
        show-modal="credits"
      />
      <InformationModalButton
        :name="t('modal.info.changelog', 'Game Changelog')"
        icon="fa-solid fa-file-lines"
        show-modal="changelog"
      />
    </div>
  </div>
</template>

<style scoped>
.l-information-modal {
  display: flex;
  flex-direction: column;
  /* stylelint-disable-next-line unit-allowed-list */
  width: calc(100vw - 50vh);
  justify-content: space-around;
}

.c-information-modal {
  margin: 0.5rem;
}

.c-info-body {
  text-align: left;
  font-size: 2rem;
  margin: 1rem;
  padding: 0.5rem;
}

.t-s12 .c-info-body {
  font-size: 1.3rem;
  margin: 0;
}

.l-socials {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 7.5rem;
}

.t-s12 .l-socials {
  width: 100%;
  align-self: center;
}
</style>
