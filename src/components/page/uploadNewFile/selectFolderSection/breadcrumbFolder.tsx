import { type ComponentProps, type FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

type BreadcrumbFolderProps = ComponentProps<"div"> & {
  folderPaths: string[];
  onSelectBreadcrumb: (folderPath: string) => void;
};

export const BreadcrumbFolder: FC<BreadcrumbFolderProps> = ({
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
