import { Button } from "antd";
import { useState } from "react";

import { FullscreenOutlined } from "@ant-design/icons";

import type { ConfigProviderProps } from "antd";
type SizeType = ConfigProviderProps["componentSize"];
export const App = () => {
  const [size, setSize] = useState<SizeType>("large");
  return (
    <Button
      type="primary"
      shape="circle"
      size={size}
      style={{ zIndex: `9999`, position: "absolute" }}
      className="drag-handle"
      icon={<FullscreenOutlined />}
    />
  );
};
