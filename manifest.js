import fs from "node:fs";
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: "en",
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: "__MSG_extensionName__",
  version: packageJson.version,
  description: "__MSG_extensionDescription__",
  permissions: ["storage", "sidePanel"],
  side_panel: {
    default_path: "src/pages/sidepanel/index.html",
  },
  options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon/icon-32.png",
  },
  // chrome_url_overrides: {
  //     newtab: 'src/pages/newtab/index.html',
  // },
  icons: {
    16: "icon/icon-16.png",
    32: "icon/icon-32.png",
    48: "icon/icon-48.png",
    64: "icon/icon-64.png",
    128: "icon/icon-128.png",
    256: "icon/icon-256.png",
  },
  content_scripts: [
    {
      matches: ["https://novelai.net/image"],
      js: ["src/pages/contentInjected/index.js"],
      // KEY for cache invalidation
      css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
    {
      matches: ["https://novelai.net/image"],
      js: ["src/pages/contentUI/index.js"],
    },
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "icon/*.png"],
      matches: ["*://*/*"],
    },
  ],
  host_permissions: ["https://*.notion.com/*", "https://telegra.ph/*"],
};

export default manifest;
