import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetSubFolderResources } from "@/features/resource-manager";
import { cn } from "@/lib/utils";
import type { Folder as FolderType } from "@/types/folder";
import { useEffect, useState, type ComponentProps, type FC } from "react";
import folderIcon18 from "@/assets/icons/folder-18.svg";
import {
  Section,
  SectionContent,
  SectionHeader,
  TitleSection,
} from "./commons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Folder,
  FolderBack,
  FolderCreatePlaceholder,
  FolderSkeleton,
} from "@/components/ui/folder";
import { Button } from "@/components/ui/button";
import { useUploadFileManager } from "@/contexts/uploadFileManager";

type SelectFolderSectionProps = ComponentProps<"section"> & {};

export const SelectFolderSection: FC<SelectFolderSectionProps> = ({
  className,
  ...props
}) => {
  const { folder, setFolder } = useUploadFileManager();
  const [isCreateFolder, setIsCreateFolder] = useState<boolean>(false);
  const [folderPath, setFolderPath] = useState<string>(folder?.path || "root");
  const [folderSelect, setFolderSelect] = useState<FolderType | null>(folder);
  const [folderData, setFolderData] = useState<FolderType[]>([]);

  const { data, isLoading } = useGetSubFolderResources({ folder: folderPath });

  useEffect(() => {
    if (data) {
      setFolderData(data.data);
    }
  }, [data]);

  const handleSelectBreadcrumbFolder = (folderPath: string) => {
    setFolderPath(folderPath);
    setFolderSelect(null);
  };

  const handleClickFolder = (folderData: FolderType) => {
    if (folderData.name === folderSelect?.name) {
      setFolderSelect(null);
      return;
    }
    setFolderSelect(folderData);
  };

  const handleDoubleClickFolder = (folderData: FolderType) => {
    setFolderSelect(null);
    setFolderPath(folderData.path);
  };

  const handleBackFolder = () => {
    const folderSplitPath = folderPath.split("/");

    if (folderSplitPath.length > 1) {
      setFolderPath(
        folderSplitPath.slice(0, folderSplitPath.length - 1).join("/"),
      );
    } else {
      setFolderPath("root");
    }

    setFolderSelect(null);
  };

  const handleClickCreateFolder = () => {
    setIsCreateFolder(true);
  };

  const handleOutsideClickCreateFolder = () => {
    setIsCreateFolder(false);
  };

  const handleCreateFolder = (folderName: string) => {
    const path =
      folderPath === "root" ? folderName : `${folderPath}/${folderName}`;
    setFolderData((prev) => [
      ...prev,
      {
        name: folderName,
        path,
        externalId: "",
      },
    ]);
    setIsCreateFolder(false);
  };

  const handleConfirmSelectFolder = () => {
    setFolder(folderSelect);
  };

  const handleSelectInHere = () => {
    if (folderPath === "root") {
      // Root folder
      setFolder(null);
      return;
    }

    setFolder({
      name: folderPath.split("/")[folderPath.split("/").length - 1],
      path: folderPath,
      externalId: "",
    });
  };

  return (
    <Section className={cn(className)} {...props}>
      <SectionHeader>
        <TitleSection titleText="Chọn thư mục" />
      </SectionHeader>
      <SectionContent>
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex w-full cursor-pointer items-center justify-center rounded-sm border border-dashed border-gray-400 bg-white py-8 text-sm font-medium hover:bg-gray-50">
              <FolderSelected folderPath={folder?.path || null} />
            </div>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-6 overflow-y-auto sm:max-h-[70%] sm:min-h-[50%] sm:max-w-[70%] sm:min-w-[50%]">
            <DialogHeader className="shrink-0">
              <DialogTitle>Chọn thư mục</DialogTitle>
            </DialogHeader>
            <div className="flex max-h-full grow-1 flex-col gap-4 overflow-auto">
              <BreadcrumbFolder
                folderPaths={
                  folderPath.split("/")[0] !== "root"
                    ? folderPath.split("/")
                    : []
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
                    {folderPath !== "root" && (
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
                            folderSelect?.name === folder.name,
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
            <DialogFooter className="shrink-0">
              <Button
                onClick={handleClickCreateFolder}
                type="button"
                className="rounded-sm"
                variant={"outline"}
              >
                Thêm mới thư mục
              </Button>
              <DialogClose asChild>
                {folderSelect ? (
                  <Button
                    onClick={handleConfirmSelectFolder}
                    disabled={!folderSelect}
                    className="rounded-sm"
                  >
                    Xác nhận
                  </Button>
                ) : (
                  <Button className="rounded-sm" onClick={handleSelectInHere}>
                    Ở thư mục này
                  </Button>
                )}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SectionContent>
    </Section>
  );
};

type BreadcrumbFolderProps = ComponentProps<"div"> & {
  folderPaths: string[];
  onSelectBreadcrumb: (folderPath: string) => void;
};

const BreadcrumbFolder: FC<BreadcrumbFolderProps> = ({
  folderPaths,
  onSelectBreadcrumb,
}) => {
  const handleClick = (index: number) => {
    onSelectBreadcrumb(folderPaths.slice(0, index + 1).join("/"));
  };

  const handleClickRoot = () => {
    onSelectBreadcrumb("root");
  };
  return (
    <Breadcrumb className="shrink-0">
      <BreadcrumbList>
        <BreadcrumbItem
          className={cn("cursor-pointer", {
            "text-foreground": folderPaths.length === 0,
          })}
          onClick={handleClickRoot}
        >
          Thư mục gốc
        </BreadcrumbItem>
        {folderPaths.map((folderPath, index) => (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem
              className={cn("cursor-pointer", {
                "text-foreground": folderPaths.length === index + 1,
              })}
              onClick={() => handleClick(index)}
            >
              {folderPath}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

type FolderSelectedProps = {
  folderPath: string | null;
};

const FolderSelected: FC<FolderSelectedProps> = ({ folderPath }) => {
  const folderPathList = folderPath?.split("/") || [];
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <div
            className={cn("flex items-center gap-2", {
              "text-foreground": folderPathList.length === 0,
            })}
          >
            <img src={folderIcon18} alt="" />
            <span>Thư mục gốc</span>
          </div>
        </BreadcrumbItem>
        {folderPathList.map((folderPath, index) => (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem
              className={cn("cursor-pointer", {
                "text-foreground": folderPathList.length === index + 1,
              })}
            >
              <div className="flex items-center gap-2">
                <img src={folderIcon18} alt="" />
                <span>{folderPath}</span>
              </div>
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
