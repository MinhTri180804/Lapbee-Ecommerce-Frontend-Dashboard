import { Sidebar } from "@/features/resource-manager";
import type { FC, PropsWithChildren } from "react";

type ResourcesManagerLayoutProps = PropsWithChildren & {};

export const ResourcesManagerLayout: FC<ResourcesManagerLayoutProps> = ({
  children,
}) => {
  return (
    <div className="grid h-full grid-cols-12 gap-4">
      <div className="col-span-2">
        <Sidebar />
      </div>

      <div className="col-span-10 flex flex-col gap-6 overflow-auto px-4">
        {children}
      </div>
    </div>
  );
};
