import { Image } from "antd";

import { PageContainer } from "@ant-design/pro-layout";
import icon from "@assets/ico/icon-256.png";

export const HomePage = () => {
  return (
    <PageContainer>
      <div style={{ height: `100%`, width: `100%` }}>
        <div style={{ textAlign: `center` }}>
          <Image width={256} src={icon} />
        </div>
      </div>
    </PageContainer>
  );
};
