import "@pages/options/index.css";

import { ThemeProvider } from "antd-style";
import { createRoot } from "react-dom/client";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

import Options from "@pages/options/Options";

refreshOnUpdate("pages/options");

const root = createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider
    themeMode={"auto"}
    theme={{
      token: {
        colorPrimary: "#722ed1",
        colorInfo: "#722ed1",
        fontSize: 16,
        wireframe: false
      }
    }}>
    <Options />
  </ThemeProvider>
);
