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
