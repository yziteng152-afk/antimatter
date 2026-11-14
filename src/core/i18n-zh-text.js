// Exact-text translations (English display string -> Chinese).
//
// Unlike the keyed dictionary in i18n-zh.js, these entries are matched against the *rendered*
// English text, which is how large data-driven catalogues get translated without editing every
// config entry. Anything not listed here simply renders in English.
//
// Lookup is done by tr() in i18n.js; the game only calls tr() on display text, never on
// identifiers, so a hit or miss can only ever change what the player reads.
import { zhAchievements } from "./i18n-zh-achievements";
import { zhAutomatorDocs } from "./i18n-zh-automator-docs";
import { zhCatchup } from "./i18n-zh-catchup";
import { zhCatchup2 } from "./i18n-zh-catchup2";
import { zhChallenges } from "./i18n-zh-challenges";
import { zhLate } from "./i18n-zh-late";
import { zhUpgrades } from "./i18n-zh-upgrades";

export const zhText = {
  ...zhAchievements,
  ...zhChallenges,
  ...zhCatchup,
  ...zhCatchup2,
  ...zhAutomatorDocs,
  ...zhUpgrades,
  ...zhLate,
};
