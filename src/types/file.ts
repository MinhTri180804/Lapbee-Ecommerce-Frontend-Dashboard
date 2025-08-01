export type FileImageType =
  | "image/apng"
  | "image/bmp"
  | "image/gif"
  | "image/jpeg"
  | "image/pjpeg"
  | "image/png"
  | "image/svg+xml"
  | "image/tiff"
  | "image/webp"
  | "image/x-icon";

export type File = {
  assetId: string;
  publicId: string;
  format: string;
  resourceType: string;
  createdAt: string;
  bytes: number;
  assetFolder: string;
  displayName: string;
  width: number;
  height: number;
  secureUrl: string;
};

export type SearchFile = File;
