import type { FileSize } from "@/types/fileSize";

export const returnFileSize = (size: number): FileSize => {
  if (size < 1e3) {
    return {
      value: size,
      type: "Bytes",
    };
  } else if (size >= 1e3 && size < 1e6) {
    return {
      value: Number((size / 1e3).toFixed(1)),
      type: "KB",
    };
  }
  return {
    value: Number((size / 1e6).toFixed(1)),
    type: "MB",
  };
};
