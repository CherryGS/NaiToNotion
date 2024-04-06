import { Button, Result, theme } from "antd";
import { createStyles, ThemeProvider } from "antd-style";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createMemoryRouter, RouterProvider } from "react-router-dom";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

import bg from "@assets/img/bg.jpg";

import { HomePage } from "./HomePage";
import InputAndView from "./InputInfo";
// import Options from "@pages/options/Options";
import { OptionPage } from "./Option";

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
    filter: blur(5px);
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
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <OptionPage />
    </ThemeProvider>
  );
};

const router = createMemoryRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
      />
    ),
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/input",
        element: <InputAndView />,
      },
    ],
  },
]);

const root = document.getElementById("root");

createRoot(root).render(
  <>
    <Background />
    <RouterProvider router={router} />
  </>
);
