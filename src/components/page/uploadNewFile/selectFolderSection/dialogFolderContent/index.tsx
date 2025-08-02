import { useEffect, useState, type FC } from "react";
import { BreadcrumbFolder } from "../breadcrumbFolder";
import {
  Folder,
  FolderBack,
  FolderCreatePlaceholder,
  FolderSkeleton,
} from "@/components/ui/folder";
import { cn } from "@/lib/utils";
import { useUploadFileManagerState, type FolderData } from "@/contexts/uploadFileManager";
import { useGetSubFolderResources } from "@/features/resource-manager";


export const DialogFolderContent: FC = () => {
  const { folderSelected } = useUploadFileManagerState();
  const [folderData, setFolderData] = useState<FolderData[]>([]);
  const [folderPath, setFolderPath] = useState<string[] | null>(
    folderSelected?.path ? folderSelected.path.split("/") : null,
  );

  const handleSelectBreadcrumbFolder = (folderPath: string) => {
    setFolderPath(folderPath.split("/"));
  };

  const { data, isLoading } = useGetSubFolderResources({
    folder: folderPath?.join("/") || "",
    isCreateNew: folderSelected?.isCreateNew || false
  });

  useEffect(() => {
    if (data) {
      const newFolderData = data.data.map((folder) => ({
        ...folder,
        isCreateNew: false,
      }));
      setFolderData(newFolderData);
    }
  }, [data]);

  const handleBackFolder = () => {
    if (folderPath && folderPath.length > 0) {
      setFolderPath(folderPath.slice(0, folderPath.length - 1));
    }
  };

  return (
    <div className="flex max-h-full grow-1 flex-col gap-4 overflow-auto">
      <BreadcrumbFolder
        folderPaths={
          folderPath && folderPath.length > 0 ? folderPath : []
        }
        onSelectBreadcrumb={handleSelectBreadcrumbFolder}
      />

      <div className="grid max-h-full w-full grid-cols-12 gap-3 overflow-y-auto">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, idx) => (
            <FolderSkeleton className="col-span-2" key={idx} />
          ))
        ) : (
          <>
            {folderPath && folderPath.length > 0 && (
              <FolderBack
                name="Quay lại"
                className="col-span-2"
                onClick={handleBackFolder}
              />
            )}
            {folderData?.map((folder, idx) => (
              <Folder
                className={cn("col-span-2 rounded-sm", {
                  "border-primary shadow-lg":
                    folderSelected?.name === folder.name,
                })}
                key={idx}
                data={folder}
                onDoubleClick={() => handleDoubleClickFolder(folder)}
                onClick={() => handleClickFolder(folder)}
              />
            ))}
            {isCreateFolder && (
              <FolderCreatePlaceholder
                className="col-span-2 rounded-sm"
                sizeIcon={32}
                onCreateFolder={handleCreateFolder}
                onOutsideClick={handleOutsideClickCreateFolder}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
