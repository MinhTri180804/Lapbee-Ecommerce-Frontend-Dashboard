import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileList,
  FolderList,
  ResourcesManagerSection,
  ResourcesManagerSectionContent,
  ResourcesManagerSectionContentItem,
  ResourcesManagerSectionTitle,
  Sidebar,
  useGetSubFolderResources,
  useSearchFileResources,
} from "@/features/resource-manager";
import type { EmptyFilesProps } from "@/features/resource-manager/components/fileList";
import { useDebounce } from "@/hooks/useDebounce";
import type { File } from "@/types/file";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useMemo, useState, type FC } from "react";
import { useSearchParams } from "react-router";

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

type UseSearchFileNameValue = {
  nextCursor: string | null;
  searchValue: string;
};

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

const FileListManager: FC = () => {
  const [searchParams] = useSearchParams();
  const folder = searchParams.get("folder") || null;

  return (
    <Tabs defaultValue="full">
      <ResourcesManagerSection>
        <ResourcesManagerSectionTitle>
          <div className="text-foreground text-base font-medium">Tài liệu</div>
          <TabsList>
            <TabsTrigger value="full">Tất cả</TabsTrigger>
            <TabsTrigger value="basedFolder" disabled={!folder}>
              Dựa theo thư mục
            </TabsTrigger>
          </TabsList>
        </ResourcesManagerSectionTitle>
        <TabsContent value="full">
          <ResourcesManagerSectionContent>
            <FileManagerSection />
          </ResourcesManagerSectionContent>
        </TabsContent>
        <TabsContent value="basedFolder">
          <ResourcesManagerSectionContent>
            <FileManagerBasedFolderSection />
          </ResourcesManagerSectionContent>
        </TabsContent>
      </ResourcesManagerSection>
    </Tabs>
  );
};

const FolderListManager: FC = () => {
  const [, setNextCursor] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [folder, setFolder] = useState<string>(
    searchParams.get("folder") || "root",
  );

  const { data, isLoading } = useGetSubFolderResources({ folder });

  useEffect(() => {
    if (folder !== searchParams.get("folder")) {
      setFolder(searchParams.get("folder") || "root");
    }
  }, [searchParams, folder]);

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

const FileManagerSection = () => {
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

  const handleViewMore = async () => {
    if (data?.metadata.nextCursor) {
      setNextCursor(data?.metadata.nextCursor);
      setIsTriggerLoading(true);
    }
  };

  const handleSearchFile = (value: string) => {
    setSearchFilename(value);
    setNextCursor(null);
    setSearchParams((previous) => ({
      ...previous,
      filename: value,
    }));
    setFilesData([]);
    setIsSearchLoading(true);
  };

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
      <ResourcesManagerSectionContentItem>
        {data?.metadata.nextCursor !== null && !isLoading && (
          <Button
            onClick={() => handleViewMore()}
            size={"sm"}
            variant={"outline"}
            className="rounded-xs"
          >
            Tải thêm
          </Button>
        )}
      </ResourcesManagerSectionContentItem>
    </>
  );
};

const FileManagerBasedFolderSection = () => {
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
  } = {
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
  };

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
      <ResourcesManagerSectionContentItem>
        {data?.metadata.nextCursor !== null && !isLoading && (
          <Button
            onClick={() => handleViewMore()}
            size={"sm"}
            variant={"outline"}
            className="rounded-xs"
          >
            Tải thêm
          </Button>
        )}
      </ResourcesManagerSectionContentItem>
    </>
  );
};

type EmptyFileTitleProps = {
  title: string;
};

const EmptyFileTitle: FC<EmptyFileTitleProps> = ({ title }) => {
  return <h5 className="text-lg font-medium">{title}</h5>;
};

type EmptyFileSearchDescriptionBasedFolderProps = {
  filename: string;
  folderBased: string;
};

const EmptyFileSearchDescriptionBasedFolder: FC<
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

const EmptyFileDescriptionFolderBased: FC<
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

const EmptyFileDescriptionFolderRoot: FC<
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
