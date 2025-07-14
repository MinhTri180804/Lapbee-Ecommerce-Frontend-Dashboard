import { Button } from "@/components/ui/button";
import { FileImage, FileImageSkeleton } from "@/components/ui/fileImage";
import { Input } from "@/components/ui/input";
import type { File } from "@/types/file";
import { type FC } from "react";

type FileListProps = {
  files: File[];
  nextCursor: string | null;
  handleViewMore: (nextCursor: string) => void;
  handleSearchFile: (value: string) => void;
  isLoading: boolean;
  isSearchLoading: boolean;
};

export const FileList: FC<FileListProps> = ({
  files,
  nextCursor,
  handleSearchFile,
  handleViewMore,
  isLoading,
  isSearchLoading,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-foreground text-base font-medium">Tài liệu</div>

      <Input
        placeholder="Nhập tên tài liệu bạn cần tìm..."
        className="rounded-xs"
        onChange={(e) => handleSearchFile(e.target.value)}
      />

      <div className="grid grid-cols-6 gap-4">
        {!isSearchLoading &&
          (files.length > 0 ? (
            files.map((file) => <FileImage data={file} key={file.assetId} />)
          ) : (
            <div>empty</div>
          ))}

        {(isLoading || isSearchLoading) &&
          Array.from({ length: 10 }).map((_, index) => (
            <FileImageSkeleton key={`skeleton-file-image-${index}`} />
          ))}
      </div>

      {nextCursor !== null && !isLoading && (
        <Button
          onClick={() => handleViewMore(nextCursor)}
          size={"sm"}
          variant={"outline"}
          className="rounded-xs"
        >
          Tải thêm
        </Button>
      )}
    </div>
  );
};
