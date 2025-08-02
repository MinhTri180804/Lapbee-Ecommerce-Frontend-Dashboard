import { GenerateId } from "@/utils/generateId";
import { getInfoImageFromLink } from "@/utils/getInfoImageFromLink";
import type { FileImageFromLink, FileImageFromLinkUpload } from "./type";

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

export const dispatchAddFileImageFromLinkUpload = (file: FileImageFromLink) => {
  const url = file.isOptimize ? file.optimize!.output.url : file.linkImage;
  const filename = file.isRename ? file.rename.name : file.fileInfo.filename!;

  const fileImageFromLinkUpload: FileImageFromLinkUpload = {
    id: file.id,
    state: "pending",
    data: {
      url,
      filename,
      exp: file.fileInfo.exp!,
    },
    uploadedData: null,
  };

  return fileImageFromLinkUpload;
};
