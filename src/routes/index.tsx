import NotFound from "@/feedbacks/notFound";
import { RootRedirect } from "@/pages/rootRedirect";
import type { FC } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { guestRoutes } from "./guest.routes";
import { protectedRoutes } from "./protected.routes";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Outlet,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: RootRedirect,
      },
      ...guestRoutes,
      ...protectedRoutes,
    ],
  },
]);

export const Routes: FC = () => {
  return <RouterProvider router={router} />;
};
