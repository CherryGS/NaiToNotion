import "lxgw-wenkai-webfont/style.css";

import { useState } from "react";

// eslint-disable-next-line import/named
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { Route } from "@ant-design/pro-layout/lib/typing";
import icon from "@assets/ico/icon-32.png";
import ReactJson from "@microlink/react-json-view";

import InputInfo from "./InputInfo";

const route: Route = {
  path: "/",
  routes: [
    {
      path: "/"
    }
  ]
};

export const OptionPage = () => {
  const [code, _set_code] = useState('{"default": "json"}');

  const set_code = (code: string) => {
    _set_code(code);
  };

  return (
    <ProLayout title={`NaiToNotion`} logo={icon} fixedHeader={true} pageTitleRender={false} route={route}>
      <PageContainer
        content={
          <>
            <InputInfo set_code={set_code} />
            <ReactJson
              src={JSON.parse(code)}
              theme="pop"
              iconStyle="circle"
              style={{ opacity: 1, backgroundColor: `none`, fontFamily: `LXGW WenKai Mono` }}
            />
          </>
        }></PageContainer>
    </ProLayout>
  );
};
