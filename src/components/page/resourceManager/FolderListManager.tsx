import { useState, useEffect, type FC } from "react";
import { useSearchParams } from "react-router";
import { useGetSubFolderResources } from "@/features/resource-manager";
import { FolderList } from "@/features/resource-manager/components/folderList";

export const FolderListManager: FC = () => {
  const [, setNextCursor] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [folder, setFolder] = useState<string>(
    searchParams.get("folder") || "root",
  );

  const { data, isLoading } = useGetSubFolderResources({
    folder,
  });

  useEffect(() => {
    if (folder !== searchParams.get("folder")) {
      setFolder(searchParams.get("folder") || "root");
    }

    return () => {};
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
