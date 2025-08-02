import type { FC } from "react";

type EmptyFileTitleProps = {
  title: string;
};

export const EmptyFileTitle: FC<EmptyFileTitleProps> = ({ title }) => {
  return <h5 className="text-lg font-medium">{title}</h5>;
};

type EmptyFileSearchDescriptionBasedFolderProps = {
  filename: string;
  folderBased: string;
};

export const EmptyFileSearchDescriptionBasedFolder: FC<
  EmptyFileSearchDescriptionBasedFolderProps
> = ({ filename, folderBased }) => {
  return (
    <p className="max-w-[40%] text-center text-sm text-gray-600 italic">
      Không tìm thấy tài liệu nào có tên{" "}
      <span className="text-foreground underline">{filename}</span> tại thư mục{" "}
      <span className="text-foreground font-medium">{folderBased}</span>, Bạn có
      thể thêm mới tài liệu ngay lúc này với tên tài liệu là{" "}
      <span className="text-foreground underline">{filename}</span> ở thư mục
      này
    </p>
  );
};

type EmptyFileDescriptionFolderBasedProps = {
  folderBased: string;
};

export const EmptyFileDescriptionFolderBased: FC<
  EmptyFileDescriptionFolderBasedProps
> = ({ folderBased }) => {
  return (
    <p className="max-w-[40%] text-center text-sm text-gray-600 italic">
      Không tìm thấy tài liệu nào tại thư mực{" "}
      <span className="text-foreground font-medium">{folderBased}</span>, Bạn có
      thể thêm mới tài liệu ngay lúc này
    </p>
  );
};

type EmptyFileDescriptionFolderRootProps = {
  filename: string;
};

export const EmptyFileDescriptionFolderRoot: FC<
  EmptyFileDescriptionFolderRootProps
> = ({ filename }) => {
  return (
    <p className="max-w-[40%] text-center text-sm text-gray-600 italic">
      Không tìm thấy tài liệu nào có tên{" "}
      <span className="text-foreground underline">{filename}</span>, Bạn có thể
      thêm mới tài liệu ngay lúc này với tên tài liệu là{" "}
      <span className="text-foreground underline">{filename}</span>
    </p>
  );
};

export type UseSearchFileNameValue = {
  nextCursor: string | null;
  searchValue: string;
};
