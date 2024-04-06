import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";

import { PageContainer } from "@ant-design/pro-layout";

export const EditRulePage = () => {
  return (
    <PageContainer>
      <Title>前缀含有</Title>
      <TextArea rows={4} name={`prefix`} />
      <Button onClick={() => {}}>提交</Button>

      <Title>转为小写时完全等于</Title>
      <TextArea rows={4} name={`lower`} />
      <Button onClick={() => {}}>提交</Button>
    </PageContainer>
  );
};
