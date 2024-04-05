import { theme } from "antd";
import { ThemeProvider } from "antd-style";
import { createRoot } from "react-dom/client";
import Draggable from "react-draggable";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

// import { listen_element } from "@pages/utils/web";
import { App } from "./app";
import App1 from "./app1";
import injectedStyle from "./ui.css?inline";

refreshOnUpdate("pages/content");

const root = document.createElement("div");
root.id = "ntn-viewer";

// listen_element("//a[@href='/stories']", (n) => {
//   n.
// })
document.body.append(root);

const rootIntoShadow = document.createElement("div");
rootIntoShadow.id = "shadow-root";

const shadowRoot = root.attachShadow({ mode: "open" });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement("style");
styleElement.innerHTML = injectedStyle;
shadowRoot.appendChild(styleElement);

/**
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
 * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
 */

createRoot(rootIntoShadow).render(
  // <ThemeProvider
  //   theme={{
  //     token: {
  //       colorPrimary: "#722ed1",
  //       colorInfo: "#722ed1",
  //       fontSize: 16,
  //     },
  //     algorithm: theme.darkAlgorithm,
  //   }}>
  //   <Draggable
  //     axis="both"
  //     handle=".drag-handle"
  //     defaultPosition={{ x: 0, y: 0 }}
  //     position={null}
  //     grid={[1, 1]}
  //     scale={1}>
  //     <div>
  //       <App />
  //     </div>
  //   </Draggable>
  // </ThemeProvider>
  <App1 />
);
