import { Link, Outlet, useLocation } from "react-router-dom";

import { ProLayout } from "@ant-design/pro-components";
import icon from "@assets/ico/icon-32.png";

import { routeMap } from "./router";

export const OptionPage = () => {
  const location = useLocation();
  return (
    <ProLayout
      title={`NaiToNotion`}
      logo={icon}
      fixedHeader={true}
      pageTitleRender={false}
      location={location}
      route={routeMap}
      menuItemRender={(item, dom) => <Link to={item.path}> {dom} </Link>}
      subMenuItemRender={(item, dom) => <Link to={item.path}> {dom} </Link>}
    >
      <Outlet />
    </ProLayout>
  );
};
