import { Image } from "antd";

import { PageContainer } from "@ant-design/pro-layout";
import icon from "@assets/ico/icon-256.png";

export const HomePage = () => {
  return (
    <PageContainer>
      <Image width={256} src={icon} style={{ margin: `0 auto` }} />
    </PageContainer>
  );
};
