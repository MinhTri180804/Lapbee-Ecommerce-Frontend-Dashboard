import { Folder } from "@/components/ui/folder";
import type { FC } from "react";

const mockData = [
  {
    path: "avatar",
    name: "avatar",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },

  {
    path: "product",
    name: "product",
  },
];

// eslint-disable-next-line
type FileManagerPageProps = {};

export const FileManagerPage: FC<FileManagerPageProps> = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-foreground text-base font-medium">Thư mục</div>

      <div className="grid grid-cols-5 gap-4">
        {mockData.map((folder) => (
          <Folder path={folder.path} name={folder.name} />
        ))}
      </div>
    </div>
  );
};
