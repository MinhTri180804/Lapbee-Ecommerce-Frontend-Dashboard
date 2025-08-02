import { useSearchParams } from "react-router";
import type { File } from "@/types/file";
import { useState, useCallback, useMemo, useEffect } from "react";
import {
  FileList,
  ResourcesManagerSectionContentItem,
  useSearchFileResources,
} from "@/features/resource-manager";
import {
  EmptyFileDescriptionFolderRoot,
  type UseSearchFileNameValue,
} from "./commons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const useSearchFileNameDebounce = (
  value: UseSearchFileNameValue,
  delay: number,
) => {
  const [valueDebounce, setValueDebounce] = useState<typeof value>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValueDebounce(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return valueDebounce;
};

export const FileManagerSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filesData, setFilesData] = useState<File[]>([]);
  const [searchFilename, setSearchFilename] = useState<string>(
    searchParams.get("filename") || "",
  );
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const searchFilenameDebounce = useSearchFileNameDebounce(
    useMemo(
      () => ({ searchValue: searchFilename, nextCursor: nextCursor }),
      [searchFilename, nextCursor],
    ),
    500,
  );
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isTriggerLoading, setIsTriggerLoading] = useState(false);

  const { data, isLoading } = useSearchFileResources({
    nextCursor: searchFilenameDebounce.nextCursor,
    filename: searchFilenameDebounce.searchValue,
    maxResult: "10",
    folder: "root",
  });

  const handleViewMore = useCallback(async () => {
    if (data?.metadata.nextCursor) {
      setNextCursor(data?.metadata.nextCursor);
      setIsTriggerLoading(true);
    }
  }, [data?.metadata.nextCursor]);

  const handleSearchFile = useCallback(
    (value: string) => {
      setSearchFilename(value);
      setNextCursor(null);
      setSearchParams((previous) => ({
        ...previous,
        filename: value,
      }));
      setFilesData([]);
      setIsSearchLoading(true);
    },
    [
      setSearchFilename,
      setNextCursor,
      setSearchParams,
      setFilesData,
      setIsSearchLoading,
    ],
  );

  const handleAddNewDocument = () => {};

  useEffect(() => {
    if (!isLoading) {
      setFilesData((previous) => [...previous, ...(data?.data || [])]);
      setIsSearchLoading(false);
      setIsTriggerLoading(false);
    }
  }, [data?.data, isLoading]);

  return (
    <>
      <ResourcesManagerSectionContentItem>
        <Input
          placeholder="Nhập tên tài liệu bạn cần tìm..."
          className="rounded-xs"
          onChange={(e) => handleSearchFile(e.target.value)}
          value={searchFilename}
        />
      </ResourcesManagerSectionContentItem>
      <ResourcesManagerSectionContentItem>
        <FileList
          isSearchLoading={isSearchLoading}
          isLoading={isLoading || isTriggerLoading}
          files={filesData}
          emptyProps={{
            titleEmpty: "Không tìm thấy tài liệu...",
            descriptionEmpty: (
              <EmptyFileDescriptionFolderRoot filename={searchFilename} />
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
          }}
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
