import "./novelai";

import refreshOnUpdate from "virtual:reload-on-update-in-view";

// import exampleThemeStorage from "@src/shared/storages/exampleThemeStorage";

refreshOnUpdate("pages/content/injected/toggleTheme");

async function toggleTheme() {
  // console.log("initial theme!", await exampleThemeStorage.get());
  // await exampleThemeStorage.toggle();
  // console.log("toggled theme", await exampleThemeStorage.get());
}

void toggleTheme();
