// eslint-disable-next-line import/named
import { Button, Form, FormProps, Input, Space } from "antd";
import React from "react";

import { get_db_scheme } from "../background/notion";

type FieldType = {
  app_key?: string;
  db_id?: string;
};

interface props {
  set_code: CallableFunction;
}

const InputInfo = ({ set_code }: props) => {
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    console.log("Success:", values);
    chrome.storage.local.set({ app_key: values.app_key, db_id: values.db_id }).then(() => {
      console.log("Set info successfully.");
      get_db_scheme()
        .then(res => {
          set_code(JSON.stringify(res, null, 2));
          alert("OK");
        })
        .catch((e: Error) => {
          console.error(e);
          set_code(e.message);
        });
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  const onReset = async () => {
    const v = await chrome.storage.local.get(["app_key", "db_id"]);
    form.setFieldValue("app_key", v["app_key"]);
    form.setFieldValue("db_id", v["db_id"]);
    console.log("Reset form");
    console.log(v);
  };

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<FieldType>
        label="App Key"
        name="app_key"
        rules={[{ required: true, message: "Please input your notion app key!" }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="Notion Database Index"
        name="db_id"
        rules={[{ required: true, message: "Please input your notion database index!" }]}>
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default InputInfo;
