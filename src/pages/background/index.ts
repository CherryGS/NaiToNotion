import "webextension-polyfill";
import "./notion/core";

import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

import { print_message } from "../utils/web";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

print_message();
