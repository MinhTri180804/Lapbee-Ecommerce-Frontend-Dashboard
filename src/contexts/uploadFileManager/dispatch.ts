import { GenerateId } from "@/utils/generateId";
import { getInfoImageFromLink } from "@/utils/getInfoImageFromLink";
import type { FileImageFromLink } from "./type";

export const dispatchAddFileFromLink = (url: string) => {
  const fileInfo = getInfoImageFromLink({ url });
  const fileFromLink: FileImageFromLink = {
    id: GenerateId.fileImportFromLink(),
    linkImage: url,
    optimize: null,
    fileInfo,
    rename: {
      name: "",
    },
    isOptimize: false,
    isRename: false,
  };

  return fileFromLink;
};
