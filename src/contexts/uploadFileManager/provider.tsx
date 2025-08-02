import type { FileImageType } from "@/types/file";
import {
  useCallback,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import {
  UploadFileManagerActionsContext,
  UploadFileManagerContext,
  UploadFileManagerStateContext,
} from "./context";
import type {
  FileImageFromLink,
  FileImageFromLinkUpload,
  FileImageFromLocal,
} from "./type";
import type { Folder } from "@/types/folder";

type UploadFileManagerProviderProps = PropsWithChildren;

export const UploadFileManagerProvider: FC<UploadFileManagerProviderProps> = ({
  children,
}) => {
  const [folderSelected, setFolderSelected] = useState<Folder | null>(null);
  const [accessFilesType, setAccessFilesType] = useState<FileImageType[]>([]);

  const [filesFromLocal, setFilesFromLocal] = useState<FileImageFromLocal[]>(
    [],
  );

  const [filesFromLink, setFilesFromLink] = useState<FileImageFromLink[]>([]);

  const [filesImageFromLinkUpload, setFilesImageFromLinkUpload] = useState<
    FileImageFromLinkUpload[]
  >([]);

  // Method related interactive folder
  const updateFolderSelected = useCallback((folderSelected: Folder | null) => {
    setFolderSelected(folderSelected);
  }, []);

  // Method related files from local
  const addFileFromLocal = useCallback((file: FileImageFromLocal) => {
    setFilesFromLocal((prev) => [...prev, file]);
  }, []);

  const removeFileFromLocal = useCallback((id: string) => {
    setFilesFromLocal((prev) => prev.filter((file) => file.id !== id));
  }, []);

  // Method related files from link
  const addFileFromLink = useCallback((file: FileImageFromLink) => {
    setFilesFromLink((prev) => [...prev, file]);
  }, []);

  const removeFileFromLink = useCallback((id: string) => {
    setFilesFromLink((prev) => prev.filter((file) => file.id !== id));
  }, []);

  const updateOptimizationImageFromLink = useCallback(
    (id: string, optimizationData: FileImageFromLink["optimize"]) => {
      setFilesFromLink((prev) =>
        prev.map((file) =>
          file.id === id ? { ...file, optimize: optimizationData } : file,
        ),
      );
    },
    [],
  );

  const toggleOptimizationImageFromLink = useCallback(
    (id: string, enable: boolean) => {
      setFilesFromLink((prev) =>
        prev.map((file) =>
          file.id === id ? { ...file, isOptimize: enable } : file,
        ),
      );
    },
    [],
  );

  const toggleRenameFileFromLink = useCallback(
    (id: string, enable: boolean) => {
      setFilesFromLink((prev) =>
        prev.map((file) =>
          file.id === id ? { ...file, isRename: enable } : file,
        ),
      );
    },
    [],
  );

  const updateRenameFileFromLink = useCallback((id: string, rename: string) => {
    setFilesFromLink((prev) =>
      prev.map((file) =>
        file.id === id
          ? {
              ...file,
              rename: {
                name: rename,
              },
            }
          : file,
      ),
    );
  }, []);

  const getDetailsFileFromLink = useMemo(
    () => (id: string) => filesFromLink.find((file) => file.id === id),
    [filesFromLink],
  );

  // Method related access files type
  const setAccessFileType = useCallback((filesType: FileImageType[]) => {
    setAccessFilesType(filesType);
  }, []);

  // Methods related file image from link upload
  const addFileImageFromLinkUpload = useCallback(
    (file: FileImageFromLinkUpload) => {
      setFilesImageFromLinkUpload((prev) => [...prev, file]);
    },
    [],
  );

  const state = useMemo(
    () => ({
      folderSelected,
      accessFilesType,
      filesFromLocal,
      filesFromLink,
      filesImageFromLinkUpload,
    }),
    [
      folderSelected,
      accessFilesType,
      filesFromLocal,
      filesFromLink,
      filesImageFromLinkUpload,
    ],
  );

  const actions = useMemo(
    () => ({
      addFileFromLink,
      removeFileFromLink,
      addFileFromLocal,
      removeFileFromLocal,
      getDetailsFileFromLink,
      setAccessFileType,
      updateOptimizationImageFromLink,
      toggleOptimizationImageFromLink,
      toggleRenameFileFromLink,
      updateRenameFileFromLink,
      updateFolderSelected,
      addFileImageFromLinkUpload,
    }),
    [
      addFileFromLink,
      removeFileFromLink,
      addFileFromLocal,
      removeFileFromLocal,
      getDetailsFileFromLink,
      setAccessFileType,
      updateOptimizationImageFromLink,
      toggleOptimizationImageFromLink,
      toggleRenameFileFromLink,
      updateRenameFileFromLink,
      updateFolderSelected,
      addFileImageFromLinkUpload,
    ],
  );

  const contextValue = useMemo(
    () => ({ ...state, ...actions }),
    [state, actions],
  );

  return (
    <UploadFileManagerStateContext.Provider value={state}>
      <UploadFileManagerActionsContext.Provider value={actions}>
        <UploadFileManagerContext.Provider value={contextValue}>
          {children}
        </UploadFileManagerContext.Provider>
      </UploadFileManagerActionsContext.Provider>
    </UploadFileManagerStateContext.Provider>
  );
};
