import { Link, Outlet, useLocation } from "react-router-dom";

import { ProLayout } from "@ant-design/pro-components";
import icon from "@assets/ico/icon-32.png";

const routeMap = {
  path: "/",
  routes: [
    {
      path: "/home",
      name: "Home",
    },
    {
      path: "/input",
      name: "Input",
    },
  ],
};

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
      menuRender={(prop, dom) => {
        console.log(location);
        console.log(dom);
        return dom;
      }}
      menuItemRender={(item, dom) => <Link to={item.path}> {dom} </Link>}
      subMenuItemRender={(item, dom) => <Link to={item.path}> {dom} </Link>}
    >
      {/* <Link to="/home"> Test</Link> */}
      <Outlet />
    </ProLayout>
  );
};
