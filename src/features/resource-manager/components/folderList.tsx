import { Button } from "@/components/ui/button";
import { Folder, FolderSkeleton } from "@/components/ui/folder";
import type { Folder as FolderType } from "@/types/folder";
import type { FC } from "react";

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
  return (
    <div className="flex flex-col gap-4">
      <div className="text-foreground text-base font-medium">Thư mục</div>

      <div className="grid grid-cols-6 gap-4">
        {isLoading ? (
          <FolderListLoading />
        ) : (
          folders.map((folder, index) => (
            <Folder key={`folder-key-${index}`} data={folder} />
          ))
        )}
      </div>

      {nextCursor && (
        <Button
          onClick={() => handleViewMore(nextCursor)}
          size={"lg"}
          variant={"outline"}
        >
          Xem thêm
        </Button>
      )}
    </div>
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
