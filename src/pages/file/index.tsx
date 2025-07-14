import {
  FileList,
  FolderList,
  Sidebar,
  useGetRootFolderResources,
  useSearchFileResources,
} from "@/features/resource-manager";
import { useDebounce } from "@/hooks/useDebounce";
import type { File } from "@/types/file";
import { useEffect, useState, type FC } from "react";

export const FileManagerPage: FC = () => {
  return (
    <div className="grid h-full grid-cols-12 gap-4">
      <div className="col-span-2">
        <Sidebar />
      </div>

      <div className="col-span-10 flex flex-col gap-6 overflow-auto px-4">
        <FolderListManager />
        <FileListManager />
      </div>
    </div>
  );
};

const FileListManager: FC = () => {
  const [filesData, setFilesData] = useState<File[]>([]);
  const [searchFilename, setSearchFilename] = useState<string>("");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const searchFilenameDebounce = useDebounce(searchFilename, 500);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const { data, isLoading } = useSearchFileResources({
    nextCursor,
    filename: searchFilenameDebounce,
    maxResult: "10",
  });

  const handleViewMore = async (nextCursor: string) => {
    setNextCursor(nextCursor);
  };

  const handleSearchFile = (value: string) => {
    setSearchFilename(value);
    setNextCursor(null);
    setFilesData([]);
    setIsSearchLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      setFilesData((previous) => [...previous, ...(data?.data || [])]);
      setIsSearchLoading(false);
    }
  }, [data?.data, isLoading]);

  return (
    <FileList
      isSearchLoading={isSearchLoading}
      nextCursor={isLoading ? null : data?.metadata.nextCursor || null}
      isLoading={isLoading}
      handleSearchFile={handleSearchFile}
      handleViewMore={handleViewMore}
      files={filesData}
    />
  );
};

const FolderListManager: FC = () => {
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const { data, isLoading } = useGetRootFolderResources({ nextCursor });

  const handleViewMore = (nextCursor: string) => {
    setNextCursor(nextCursor);
  };

  return (
    <>
      <FolderList
        isLoading={isLoading}
        handleViewMore={handleViewMore}
        folders={data?.data || []}
        nextCursor={isLoading ? null : data?.metadata.nextCursor || null}
      />
    </>
  );
};
