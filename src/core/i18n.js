import { h2pZh, zh } from "./i18n-zh";
import { zhText } from "./i18n-zh-text";

// Available languages. The id is also what gets stored in player.options.language.
// English is special-cased: it is not a dictionary, it is the hardcoded fallback text which
// every t() call passes in as its second argument. That means a missing or broken translation
// can never produce a blank string, an "undefined", or a crash - it just shows English.
export const LANGUAGES = [
  { id: "zh", name: "简体中文" },
  { id: "en", name: "English" },
];

export const FALLBACK_LANGUAGE = "en";

const dictionaries = { zh };

// Exact-text dictionaries: key is the English string as displayed (see i18n-zh-text.js).
const textDictionaries = { zh: zhText };

// Allow forcing a language through the URL for testing: ?lang=en / ?lang=zh
// Parsed once at load so that calling t() thousands of times per second stays cheap.
const forcedLanguage = (function() {
  try {
    const requested = new URLSearchParams(window.location.search).get("lang");
    return LANGUAGES.some(l => l.id === requested) ? requested : undefined;
  } catch (e) {
    return undefined;
  }
}());

export function getLanguage() {
  if (forcedLanguage !== undefined) return forcedLanguage;
  // Reading ui.view.language (a reactive property) inside t() is deliberate: any template or
  // computed that calls t() automatically becomes dependent on it, so switching languages
  // re-renders exactly the components that display translated text.
  const viewLanguage = typeof ui === "undefined" || ui === null ? undefined : ui.view?.language;
  return viewLanguage || FALLBACK_LANGUAGE;
}

// Translate an exact English display string. Used for data-driven catalogues whose entries are
// plain strings (achievement names, challenge descriptions, ...). Unknown text is returned
// unchanged, so this is always safe to call.
export function tr(text) {
  if (typeof text !== "string") return text;
  const dictionary = textDictionaries[getLanguage()];
  return dictionary?.[text] ?? text;
}

// Same as tr(), but normalizes whitespace first. Data descriptions written as template
// literals carry their source indentation/newlines with them, which would never match a
// hand-written dictionary key; this collapses them to single spaces.
export function trNorm(text) {
  if (typeof text !== "string") return text;
  return tr(text.replace(/\s+/gu, " ").trim());
}

export function isChinese() {
  return getLanguage() === "zh";
}

/**
 * Translate a key.
 * @param {String} key Key into the language dictionary
 * @param {String} fallback English text shown when the key is missing (never omit this)
 * @param {...*} args Values substituted into {0}, {1}, ...
 * @returns {String}
 */
export function t(key, fallback, ...args) {
  const dictionary = dictionaries[getLanguage()];
  let text = dictionary?.[key] ?? fallback ?? key;
  if (args.length > 0) {
    text = text.replace(/\{(\d+)\}/gu, (match, index) => {
      const value = args[Number(index)];
      return value === undefined ? match : String(value);
    });
  }
  return text;
}

// Join a list of already-translated items using the language's own punctuation.
export function enumerate(items) {
  if (items.length === 0) return "";
  if (isChinese()) return items.join("、");
  return typeof makeEnumeration === "function" ? makeEnumeration(items) : items.join(", ");
}

// Translate a tab's visible label. Tab names themselves are NEVER translated in place:
// several parts of the game compare them against English strings for styling and logic
// (for example ClassicSubtabButton's color classes and the Automator's undo/redo checks).
// Only the rendered label goes through here, keyed off the stable tab key.
export function tabLabel(tab) {
  return t(`tab.${tab.key}`, tab.name);
}

// Subtab keys are only unique within a parent tab, so they are namespaced by the parent key.
export function subtabLabel(subtab) {
  const parentKey = subtab._parent?.key;
  return t(`subtab.${parentKey}.${subtab.key}`, subtab.name);
}

// Sidebar currency labels, keyed by the numeric id in GameDatabase.sidebarResources.
export function sidebarResourceLabel(resource) {
  return t(`sidebar.${resource.id}`, resource.resourceName ?? resource.optionName);
}

// How to Play entries are keyed by their English name, which is also used as an identifier
// in several components (e.g. tab.name === "Advanced Glyph Mechanics"), so it must not change.
const H2P_PREFIX = "h2p.";

export function h2pTitle(entry) {
  return t(`${H2P_PREFIX}${entry.name}.title`, entry.alias ?? entry.name);
}

export function h2pBody(entry) {
  const translated = dictionaries[getLanguage()]?.[`${H2P_PREFIX}${entry.name}.body`];
  if (translated !== undefined) return translated;
  return typeof entry.info === "function" ? entry.info() : entry.info;
}

export function setLanguage(language) {
  if (!LANGUAGES.some(l => l.id === language)) return;
  player.options.language = language;
  ui.view.language = language;
  document.documentElement.setAttribute("lang", language === "zh" ? "zh-CN" : "en");
  GameUI.update();
  GameStorage.save();
}

// Exposed for debugging in the console; not part of the global namespace merged at startup.
window.i18n = {
  LANGUAGES,
  getLanguage,
  setLanguage,
  t,
  tr,
  zh,
  zhText,
  h2pZh,
};
