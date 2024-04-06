import { useState } from "react";

import { ProForm, ProFormGroup, ProFormList, ProFormRadio, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";

export const EditRulePage = () => {
  const [position, setPosition] = useState<"bottom" | "top">("bottom");
  return (
    <PageContainer>
      <ProFormRadio.Group
        fieldProps={{
          value: position,
          onChange: e => setPosition(e.target.value),
        }}
        options={[
          {
            label: "顶部",
            value: "top",
          },
          {
            label: "底部",
            value: "bottom",
          },
        ]}
      />
      <ProForm
        onFinish={async values => {
          console.log("Received values of form:", values);
        }}
      >
        <ProFormList
          name="setting"
          label="配置项"
          rules={[
            {
              required: true,
              validator: async (_, value) => {
                console.log(value);
                if (value && value.length > 0) {
                  return;
                }
                throw new Error("至少要有一项！");
              },
            },
          ]}
          creatorButtonProps={{
            position,
          }}
          initialValue={[]}
        >
          <ProFormGroup key="group">
            <ProFormText
              rules={[
                {
                  required: true,
                },
              ]}
              name="name"
              label="属性名"
            />
            <ProFormSelect
              label="属性类型"
              name="type"
              width="xs"
              valueEnum={{
                select: "单选",
                multi_select: "多选",
                title: "标题",
                number: "数字",
              }}
            />
          </ProFormGroup>
        </ProFormList>
      </ProForm>
    </PageContainer>
  );
};
