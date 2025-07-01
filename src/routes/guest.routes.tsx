import { AuthLayout } from "@/layouts/authLayout";
import { LoginPage } from "@/pages/auth/login";
import { useProfileStore } from "@/store/profile";
import type { Profile } from "@/types/profile";
import type { FC, PropsWithChildren } from "react";
import { Navigate, type RouteObject } from "react-router";

type GuestRoutesProps = PropsWithChildren;

// eslint-disable-next-line
const GuestRoutes: FC<GuestRoutesProps> = ({ children }) => {
  const profile = useProfileStore.use.data() as Profile | null;
  if (profile) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export const guestRoutes: RouteObject[] = [
  {
    path: "auth",
    element: (
      <GuestRoutes>
        <AuthLayout />
      </GuestRoutes>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        Component: LoginPage,
      },
    ],
  },
];
