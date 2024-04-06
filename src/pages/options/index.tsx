import "lxgw-wenkai-webfont/style.css";

import { theme } from "antd";
import { createStyles, ThemeProvider } from "antd-style";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

import bg from "@assets/img/bg.jpg";

// import Options from "@pages/options/Options";
import { OptionPage } from "./Option";
import { get_router } from "./router";

refreshOnUpdate("pages/options");

const useStyles = createStyles(({ css }) => ({
  bgDiv: css`
    background-image: url(${bg});
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fix;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: fixed;
    filter: blur(9px);
    /* z-index: 0; */
  `,
}));

const Background = () => {
  const { styles } = useStyles();
  return <div className={styles.bgDiv}></div>;
};

const Root = () => {
  useEffect(() => {
    const node = document.getElementsByClassName("ant-pro-layout-bg-list")[0];
    node.setAttribute("style", "opacity:0.9");
  }, []);

  return (
    <ThemeProvider
      theme={{
        token: {
          colorPrimary: "#722ed1",
          colorInfo: "#722ed1",
          fontSize: 16,
          fontFamily: `LXGW WenKai Mono`,
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <OptionPage />
    </ThemeProvider>
  );
};

const root = document.getElementById("root");

createRoot(root).render(
  <>
    <Background />
    <RouterProvider router={get_router(<Root />)} />
  </>
);
