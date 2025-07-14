import { RootRedirect } from "@/pages/rootRedirect";
import type { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { guestRoutes } from "@/routes/guest";
import { protectedRoutes } from "@/routes/protected";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootRedirect,
  },
  ...guestRoutes,
  ...protectedRoutes,
]);

export const Routes: FC = () => {
  return <RouterProvider router={router} />;
};
