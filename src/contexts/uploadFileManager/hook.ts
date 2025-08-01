import { useContext } from "react";
import {
  UploadFileManagerActionsContext,
  UploadFileManagerContext,
  UploadFileManagerStateContext,
} from "./context";

export const useUploadFileManagerState = () => {
  const context = useContext(UploadFileManagerStateContext);

  if (!context) {
    throw new Error(
      "useUploadFileManagerState must be used within an UploadFileManagerProvider",
    );
  }

  return context;
};

export const useUploadFileManagerActions = () => {
  const context = useContext(UploadFileManagerActionsContext);

  if (!context) {
    throw new Error(
      "useUploadFileManagerActions must be used within an UploadFileManagerProvider",
    );
  }

  return context;
};

export const useUploadFileManager = () => {
  const context = useContext(UploadFileManagerContext);

  if (!context) {
    throw new Error(
      "useUploadFileManager must be used within an UploadFileManagerProvider",
    );
  }

  return context;
};
