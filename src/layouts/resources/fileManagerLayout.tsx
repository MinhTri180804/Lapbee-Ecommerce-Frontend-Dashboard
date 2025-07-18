import { Outlet } from "react-router";

export const ResourcesFileManagerLayout = () => {
  return (
    <div className="h-full w-full overflow-x-auto">
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};
