import { routeName } from "@/constants/routeName";
import { Outlet, type RouteObject } from "react-router";
import { brandRoutes } from "./brand.routes";
import { fileRoutes } from "./file.routes";

const { ROOT, children } = routeName.dashboard.children.management;

export const managementRoutes: RouteObject[] = [
  {
    path: ROOT,
    element: <Outlet />,
    children: [
      {
        path: children.brand.ROOT,
        children: brandRoutes,
      },
      {
        path: children.file.ROOT,
        children: fileRoutes,
      },
    ],
  },
];
