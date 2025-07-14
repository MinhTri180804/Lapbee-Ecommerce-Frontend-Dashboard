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
