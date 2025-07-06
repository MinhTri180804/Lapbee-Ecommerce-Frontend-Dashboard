import { AuthLayout } from "@/layouts/authLayout";
import { useProfileStore } from "@/store/profile";
import type { Profile } from "@/types/profile";
import type { FC, PropsWithChildren } from "react";
import { Navigate, type RouteObject } from "react-router";
import { authRoutes } from "./auth.routes";
import { routeName } from "@/constants/routeName";

type GuestRoutesProps = PropsWithChildren;

const { ROOT } = routeName.auth;

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
    path: ROOT,
    element: (
      <GuestRoutes>
        <AuthLayout />
      </GuestRoutes>
    ),
    children: authRoutes,
  },
];
