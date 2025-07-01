import type { FC, PropsWithChildren } from "react";

export const AuthFormContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="m-6 flex flex-col gap-4 rounded-md bg-white p-6 xl:w-[30%]">
      {children}
    </div>
  );
};
