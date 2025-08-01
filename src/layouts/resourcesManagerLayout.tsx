import { Sidebar } from "@/features/resource-manager";
import type { FC } from "react";
import { Outlet } from "react-router";

export const ResourceManagerLayout: FC = () => {
  return (
    <div className="grid h-full grid-cols-12 gap-4">
      <div className="col-span-2">
        <Sidebar />
      </div>

      <Outlet />
    </div>
  );
};
