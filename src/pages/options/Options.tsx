// import "@pages/options/Options.css";

import { Layout, Menu, theme, Typography } from "antd";
import React, { useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

import InputInfo from "./InputInfo";

const { Header, Content, Footer, Sider } = Layout;

const Options: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const [code, _set_code] = useState("");

  const set_code = (code: string) => {
    _set_code(code);
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sider breakpoint="lg" collapsedWidth="0" style={{}}>
        <div className="demo-logo-vertical" />
        <Menu mode="inline" defaultSelectedKeys={["4"]} style={{ height: "100%", borderRight: 0 }} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <InputInfo set_code={set_code} />
          <Typography>
            <CopyBlock language="json" text={code} showLineNumbers={true} theme={dracula} />
          </Typography>
        </Content>
        <Footer style={{ textAlign: "center" }}>Test</Footer>
      </Layout>
    </Layout>
  );
};

export default Options;
