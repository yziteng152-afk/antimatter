<script>
export default {
  name: "AutomatorDocsIntroPage",
};
</script>

<template>
  <div>
    {{ t("automator.intro.welcome", "Welcome to the Antimatter Dimensions Automator!") }}
    <br>
    <br>
    {{ t("automator.intro.overview", "This page is an introduction page which gives a very broad overview of everything you can do with the Automator. Specific details on various functionality can be found in the How To Play or their respective tabs (when relevant).") }}
    <br>
    <br>
    <b>{{ t("automator.intro.scriptingTitle", "Scripting Language:") }}</b>{{ t("automator.intro.scripting1", " The Automator uses a custom scripting language in order to perform certain game actions for you. Click") }}
    <div class="fas fa-list c-automator-button-icon" />
    {{ t("automator.intro.scripting2", "to bring up a list of available commands. You can also define constants as shorthand names for various values on the") }}
    <div class="fas fa-book c-automator-button-icon" />
    {{ t("automator.intro.scripting3", "page.") }}
    <br>
    <br>
    <b>{{ t("automator.intro.layoutTitle", "Layout:") }}</b>{{ t("automator.intro.layout1", " This Automator itself is split up into two halves; the left half contains your script and controls for starting, stopping, and repeating its execution, and the right half contains Automator information. Clicking") }}
    <div class="fas fa-expand-arrows-alt c-automator-button-icon" />
    {{ t("automator.intro.layout2", "in the top-right corner will expand the Automator to take up the whole browser page for easier editing.") }}
    <br>
    <br>
    <b>{{ t("automator.intro.editorModesTitle", "Editor Modes:") }}</b>{{ t("automator.intro.editorModesBody", " There are two different editors you can use to write your automator scripts - a block-based editor (default) and a text-based editor. You can swap between the two editor types with the switch in the top-right corner of the left half. Note that scripts with errors may not properly convert between the two modes, which can cause part of your script to be deleted.") }}
    <br>
    <br>
    <b>{{ t("automator.intro.makingScriptsTitle", "Making Scripts:") }}</b>{{ t("automator.intro.makingScripts1", " You can switch between multiple scripts or make new scripts using the dropdown on the second row of buttons. The current script can be renamed or deleted with the") }}
    <div class="fas fa-edit c-automator-button-icon" />
    {{ t("automator.intro.makingScripts2", "and") }}
    <div class="fas fa-trash c-automator-button-icon" />
    {{ t("automator.intro.makingScripts3", "buttons. The Automator will always contain at least one script for you to edit; deleting your last one will automatically create a new blank one.") }}
    <br>
    <br>
    <b>{{ t("automator.intro.writingScriptsTitle", "Writing Scripts:") }}</b>{{ t("automator.intro.writingScripts1", " Scripts in the block editor are made by going to the block tab") }}
    <div class="fas fa-cubes c-automator-button-icon" />{{ t("automator.intro.writingScripts2", ", while scripts in the text editor are made by typing into the left half as a text box. In either editor mode, you can also use some smaller premade scripts from the template generator") }}
    <div class="fas fa-file-code c-automator-button-icon" />{{ t("automator.intro.writingScripts3", ". You can undo or redo a limited number of edits using") }}
    <div class="fas fa-arrow-rotate-left c-automator-button-icon" />
    {{ t("automator.intro.writingScripts4", "or") }}
    <div class="fas fa-arrow-rotate-right c-automator-button-icon" />{{ t("automator.intro.writingScripts5", ", or by using the respective hotkeys. Edit history is cleared upon switching, converting, or deleting scripts.") }}
    <br>
    <br>
    <b>{{ t("automator.intro.debuggingTitle", "Debugging:") }}</b>{{ t("automator.intro.debugging1", " The two main tools you have for fixing your scripts are the Error Log") }}
    <div class="fas fa-exclamation-triangle c-automator-button-icon" />
    {{ t("automator.intro.debugging2", "for when you can't get your script to run at all, and the Event Log") }}
    <div class="fas fa-eye c-automator-button-icon" />
    {{ t("automator.intro.debugging3", "for when it runs but doesn't do what you expect it to do.") }}
    <br>
    <br>
    <b>{{ t("automator.intro.importExportTitle", "Importing/Exporting:") }}</b>{{ t("automator.intro.importExport1", " Automator scripts can be exported and imported in text format by using the") }}
    <div class="fas fa-file-export c-automator-button-icon" />
    {{ t("automator.intro.importExport2", "and") }}
    <div class="fas fa-file-import c-automator-button-icon" />
    {{ t("automator.intro.importExport3", "buttons respectively. You can also access additional extended exporting options") }}
    <div class="fas fa-window-restore c-automator-button-icon" />{{ t("automator.intro.importExport4", " if desired.") }}
    <br>
    <br>
    <b>{{ t("automator.intro.scriptSavingTitle", "Script saving:") }}</b>{{ t("automator.intro.scriptSavingBody", " Script changes are not immediately saved to your computer under all conditions; check the Automator How To Play entries for more details. Additionally there are two character limits to reduce lag, shown above the automator panels.") }}
  </div>
</template>

<style scoped>
.c-automator-button-icon {
  padding: 0.3rem 0.8rem;
  width: 3.3rem;
  border: var(--var-border-width, 0.2rem) solid var(--color-automator-controls-border);
  border-radius: var(--var-border-radius, 0.3rem);
  color: var(--color-automator-docs-font);
  background-color: var(--color-automator-controls-inactive);
}
</style>
