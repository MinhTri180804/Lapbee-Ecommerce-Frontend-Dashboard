import { Navigate, type RouteObject } from "react-router";
import { routeName } from "@/constants/routeName";
import { LoginPage } from "@/pages/auth/login";

const { LOGIN } = routeName.auth.children;

export const authRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={LOGIN} replace />,
  },
  {
    path: LOGIN,
    Component: LoginPage,
  },
];
