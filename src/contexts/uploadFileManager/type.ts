import type { UploadedImageResourcesFromLinkResponse } from "@/features/resource-manager";

export type FileImageFromLocal = {
  id: string;
  originalName: string;
  rename: string | null;
  file: File;
};
export type FileImageFromLink = {
  id: string;
  fileInfo: {
    host: string | null;
    filename: string | null;
    exp: string | null;
  };
  rename: {
    name: string;
  };
  isOptimize: boolean;
  isRename: boolean;
  optimize: {
    input: {
      size: number;
      type: string;
    };
    output: {
      size: number;
      ratio: number;
      url: string;
      type: string;
    };
  } | null;
  linkImage: string;
};

export type FileImageFromLinkUpload = {
  id: string;
  state: "pending" | "success" | "error";
  data: {
    url: string;
    filename: string;
    exp: string;
  };
  uploadedData: UploadedImageResourcesFromLinkResponse | null;
};
