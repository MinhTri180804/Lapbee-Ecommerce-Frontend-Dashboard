import { routeName } from "@/constants/routeName";
import { Outlet, type RouteObject } from "react-router";
import { brandRoutes } from "./brand.routes";

const { ROOT, children } = routeName.dashboard.children.management;

export const managementRoutes: RouteObject[] = [
  {
    path: ROOT,
    element: <Outlet />,
    children: [
      {
        path: children.brand.ROOT,
        element: <Outlet />,
        children: brandRoutes,
      },
    ],
  },
];
