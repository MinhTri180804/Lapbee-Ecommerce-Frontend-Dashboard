import {
  FileListManager,
  FolderListManager,
} from "@/components/page/resourceManager";
import { type FC } from "react";

export const ResourcesManagerPage: FC = () => {
  return (
    <>
      <FolderListManager />
      <FileListManager />
    </>
  );
};
