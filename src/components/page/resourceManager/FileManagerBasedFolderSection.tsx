import { useDebounce } from "@/hooks/useDebounce";
import { useSearchParams } from "react-router";
import { useState, useMemo, useEffect } from "react";
import type { File } from "@/types/file";
import {
  ResourcesManagerSectionContentItem,
  useSearchFileResources,
  FileList,
} from "@/features/resource-manager";
import type { EmptyFilesProps } from "@/features/resource-manager/components/fileList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EmptyFileDescriptionFolderBased,
  EmptyFileSearchDescriptionBasedFolder,
  EmptyFileTitle,
  type UseSearchFileNameValue,
} from "./commons";

export const FileManagerBasedFolderSection = () => {
  const [filesData, setFilesData] = useState<File[]>([]);
  const [searchParams] = useSearchParams();
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [searchFilename, setSearchFilename] = useState<string>(
    searchParams.get("filename") || "",
  );
  const searchFilenameDebounce = useDebounce<UseSearchFileNameValue>(
    useMemo(
      () => ({
        searchValue: searchFilename,
        nextCursor,
      }),
      [searchFilename, nextCursor],
    ),
    500,
  );

  const { data, isLoading } = useSearchFileResources({
    nextCursor: searchFilenameDebounce.nextCursor,
    folder: searchParams.get("folder") || "root",
    filename: searchFilenameDebounce.searchValue,
    maxResult: "10",
  });

  useEffect(() => {
    if (!isLoading) {
      setFilesData(data?.data || []);
      setIsSearchLoading(false);
    }

    return () => {
      setFilesData([]);
    };
  }, [data?.data, isLoading]);

  const handleViewMore = () => {};

  const handleAddNewDocument = () => {};

  const handleSearchFile = (value: string) => {
    setSearchFilename(value);
    setNextCursor(null);
    setIsSearchLoading(true);
  };

  const emptyFileState: {
    true: EmptyFilesProps;
    false: EmptyFilesProps;
  } = useMemo(
    () => ({
      true: {
        titleEmpty: <EmptyFileTitle title="Không tìm thấy tài liệu..." />,
        descriptionEmpty: (
          <EmptyFileSearchDescriptionBasedFolder
            filename={searchFilename}
            folderBased={searchParams.get("folder") || "root"}
          />
        ),
        children: (
          <Button
            onClick={handleAddNewDocument}
            className="rounded-sm"
            variant={"outline"}
            size={"lg"}
          >
            Thêm mới tài liệu
          </Button>
        ),
      },
      false: {
        titleEmpty: <EmptyFileTitle title="Không tìm thấy tài liệu..." />,
        descriptionEmpty: (
          <EmptyFileDescriptionFolderBased
            folderBased={searchParams.get("folder") || "root"}
          />
        ),
        children: (
          <Button
            onClick={handleAddNewDocument}
            className="rounded-sm"
            variant={"outline"}
            size={"lg"}
          >
            Thêm mới tài liệu
          </Button>
        ),
      },
    }),
    [searchFilename, searchParams],
  );

  return (
    <>
      <ResourcesManagerSectionContentItem>
        <Input
          placeholder={`Nhập tên tài liệu bạn cần tìm trong thư mục ${searchParams.get("folder") || "root"}...`}
          className="rounded-xs"
          onChange={(e) => handleSearchFile(e.target.value)}
          value={searchFilename}
        />
      </ResourcesManagerSectionContentItem>
      <ResourcesManagerSectionContentItem>
        <FileList
          isSearchLoading={isSearchLoading}
          isLoading={isLoading}
          files={filesData}
          emptyProps={emptyFileState[`${searchFilename !== ""}`]}
        />
      </ResourcesManagerSectionContentItem>
      {data?.metadata.nextCursor !== null && !isLoading && (
        <ResourcesManagerSectionContentItem className="flex w-full justify-center">
          <Button
            onClick={() => handleViewMore()}
            size={"lg"}
            variant={"outline"}
            className="w-64 rounded-xs"
          >
            Tải thêm
          </Button>
        </ResourcesManagerSectionContentItem>
      )}
    </>
  );
};
