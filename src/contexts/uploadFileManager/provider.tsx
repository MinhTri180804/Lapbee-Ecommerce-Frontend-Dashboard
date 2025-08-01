import type { FileImageType } from "@/types/file";
import type { Folder } from "@/types/folder";
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
import type { FileImageFromLocal, FileImageFromLink } from "./type";

type UploadFileManagerProviderProps = PropsWithChildren;

export const UploadFileManagerProvider: FC<UploadFileManagerProviderProps> = ({
  children,
}) => {
  const [folder] = useState<Folder | null>(null);
  const [accessFilesType, setAccessFilesType] = useState<FileImageType[]>([]);

  const [filesFromLocal, setFilesFromLocal] = useState<FileImageFromLocal[]>(
    [],
  );

  const [filesFromLink, setFilesFromLink] = useState<FileImageFromLink[]>([]);

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

  const state = useMemo(
    () => ({
      folder,
      accessFilesType,
      filesFromLocal,
      filesFromLink,
    }),
    [folder, accessFilesType, filesFromLocal, filesFromLink],
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
