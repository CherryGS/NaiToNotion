// eslint-disable-next-line import/named
import { Button, Form, FormProps, Input, Space } from "antd";
import React, { useEffect } from "react";

import { get_db_scheme } from "@pages/background/notion/lib";

type props = {
  set_code: CallableFunction;
};
type keys = "app_key" | "db_id";
type mapping = Record<keys, string>;

const InputInfo = ({ set_code }: props) => {
  const [form] = Form.useForm();

  const onFinish: FormProps["onFinish"] = (v: mapping) => {
    const upd: Partial<ChromeLocalStorage> = {
      app_key: v.app_key,
      db_id: v.db_id,
    };
    chrome.storage.local.set(upd).then(() => {
      get_db_scheme(upd.app_key, upd.db_id).then(res => {
        set_code(JSON.stringify(res, null, 2));
      });
    });
  };

  const onFinishFailed: FormProps["onFinishFailed"] = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    chrome.storage.local.get().then((v: ChromeLocalStorage) => {
      form.setFieldValue("app_key", v["app_key"]);
      form.setFieldValue("db_id", v["db_id"]);
      console.log(v);
    });
  };

  useEffect(() => {
    onReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Form.Item
        label="App Key"
        name="app_key"
        rules={[{ required: true, message: "Please input your notion app key!" }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="DB Index"
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
