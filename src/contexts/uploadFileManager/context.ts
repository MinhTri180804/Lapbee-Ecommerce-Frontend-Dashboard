import type { FileImageType } from "@/types/file";
import { createContext } from "react";
import type {
  FileImageFromLink,
  FileImageFromLinkUpload,
  FileImageFromLocal,
} from "./type";
import type { Folder } from "@/types/folder";

export type UploadFileManagerState = {
  folderSelected: Folder | null;
  accessFilesType: FileImageType[];
  filesFromLocal: FileImageFromLocal[];
  filesFromLink: FileImageFromLink[];
  filesImageFromLinkUpload: FileImageFromLinkUpload[];
};

export type UploadFileManagerActions = {
  updateFolderSelected: (folder: Folder | null) => void;
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
  addFileImageFromLinkUpload: (file: FileImageFromLinkUpload) => void;
};

export const UploadFileManagerStateContext =
  createContext<UploadFileManagerState | null>(null);

export const UploadFileManagerActionsContext =
  createContext<UploadFileManagerActions | null>(null);

export const UploadFileManagerContext = createContext<
  (UploadFileManagerState & UploadFileManagerActions) | null
>(null);
