import type { FileImageType } from "@/types/file";
import { createContext } from "react";
import type { FileImageFromLocal, FileImageFromLink } from "./type";

export type UploadFileManagerState = {
  //   folder: Folder | null;
  accessFilesType: FileImageType[];
  filesFromLocal: FileImageFromLocal[];
  filesFromLink: FileImageFromLink[];
};

export type UploadFileManagerActions = {
  //   setFolder: React.Dispatch<React.SetStateAction<Folder | null>>;
  // setFilesFromLocal: React.Dispatch<React.SetStateAction<FileFromLocal[]>>;
  addFileFromLink: (file: FileImageFromLink) => void;
  removeFileFromLink: (id: string) => void;
  addFileFromLocal: (file: FileImageFromLocal) => void;
  updateOptimizationImageFromLink: (
    id: string,
    optimizationData: FileImageFromLink["optimize"],
  ) => void;
  toggleOptimizationImageFromLink: (id: string, enable: boolean) => void;
  removeFileFromLocal: (id: string) => void;
  getDetailsFileFromLink: (id: string) => FileImageFromLink | undefined;
  setAccessFileType: (filesType: FileImageType[]) => void;
  toggleRenameFileFromLink: (id: string, enable: boolean) => void;
  updateRenameFileFromLink: (id: string, rename: string) => void;
};

export const UploadFileManagerStateContext =
  createContext<UploadFileManagerState | null>(null);

export const UploadFileManagerActionsContext =
  createContext<UploadFileManagerActions | null>(null);

export const UploadFileManagerContext = createContext<
  (UploadFileManagerState & UploadFileManagerActions) | null
>(null);
