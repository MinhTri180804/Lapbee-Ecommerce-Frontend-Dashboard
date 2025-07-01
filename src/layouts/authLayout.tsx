import type { FC } from "react";
import { Outlet } from "react-router";

export const AuthLayout: FC = () => {
  return (
    <div className="bg-background-auth-layout flex min-h-dvh min-w-dvw items-center justify-center">
      <Outlet />
    </div>
  );
};
