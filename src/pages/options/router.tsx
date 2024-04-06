import { Button, Result } from "antd";
import { createMemoryRouter } from "react-router-dom";

import { EditRulePage } from "./EditRule";
import { HomePage } from "./HomePage";
import InputAndView from "./InputInfo";

export const get_router = root =>
  createMemoryRouter([
    {
      path: "/",
      element: root,
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
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/input",
          element: <InputAndView />,
        },
        {
          path: "/edit",
          element: <EditRulePage />,
        },
      ],
    },
  ]);
export const routeMap = {
  path: "/",
  routes: [
    {
      path: "/input",
      name: "Input",
    },
    {
      path: "/edit",
      name: "Edit",
    },
  ],
};
