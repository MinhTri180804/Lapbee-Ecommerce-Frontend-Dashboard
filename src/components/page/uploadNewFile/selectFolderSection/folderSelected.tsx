import { type ComponentProps, type FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import folderIcon18 from "@/assets/icons/folder-18.svg";

type FolderSelectedProps = ComponentProps<"div"> & {
  folderPath: string | null;
};

export const FolderSelected: FC<FolderSelectedProps> = ({ folderPath }) => {
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
