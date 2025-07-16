import { Button } from "@/components/ui/button";
import { Folder, FolderBack, FolderSkeleton } from "@/components/ui/folder";
import type { Folder as FolderType } from "@/types/folder";
import type { FC } from "react";
import { useSearchParams } from "react-router";
import {
  ResourcesManagerSection,
  ResourcesManagerSectionContent,
  ResourcesManagerSectionContentItem,
  ResourcesManagerSectionFooter,
  ResourcesManagerSectionTitle,
} from "./resourcesManagerSection";

type FolderListProps = {
  folders: FolderType[];
  nextCursor: string | null;
  handleViewMore: (nextCursor: string) => void;
  isLoading: boolean;
};

export const FolderList: FC<FolderListProps> = ({
  folders,
  nextCursor,
  handleViewMore,
  isLoading,
}) => {
  const [searchParams] = useSearchParams();
  const isRootFolder = (searchParams.get("folder") || "root") === "root";

  return (
    <ResourcesManagerSection>
      <ResourcesManagerSectionTitle>
        <div className="text-foreground text-base font-medium">Thư mục</div>
      </ResourcesManagerSectionTitle>

      <ResourcesManagerSectionContent>
        <ResourcesManagerSectionContentItem className="grid grid-cols-6 gap-4">
          {isLoading ? (
            <FolderListLoading />
          ) : (
            <>
              {!isRootFolder && <FolderBack name="Quay lại" />}
              {folders.map((folder, index) => (
                <Folder key={`folder-key-${index}`} data={folder} />
              ))}
            </>
          )}
        </ResourcesManagerSectionContentItem>
      </ResourcesManagerSectionContent>

      <ResourcesManagerSectionFooter>
        {nextCursor && (
          <Button
            onClick={() => handleViewMore(nextCursor)}
            size={"lg"}
            variant={"outline"}
          >
            Xem thêm
          </Button>
        )}
      </ResourcesManagerSectionFooter>
    </ResourcesManagerSection>
  );
};

const FolderListLoading: FC = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <FolderSkeleton key={`folder-skeleton-key-${index}`} />
      ))}
    </>
  );
};
