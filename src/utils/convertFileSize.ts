import type { FileSize } from "@/types/fileSize";

export type FileSizeUnit = Pick<FileSize, "type">["type"];

const UNIT_IN_BYTES: Record<FileSizeUnit, number> = {
  Bytes: 1,
  KB: 1024,
  MB: 1024 ** 2,
};

export const convertFileSize = (
  inputType: FileSizeUnit,
  value: number,
  outputType: FileSizeUnit,
) => {
  const bytes = value * UNIT_IN_BYTES[inputType];
  return bytes / UNIT_IN_BYTES[outputType];
};
