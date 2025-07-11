import { FileManagerPage } from "@/pages/file";
import type { RouteObject } from "react-router";

export const fileRoutes: RouteObject[] = [
  {
    index: true,
    Component: FileManagerPage,
  },
];
