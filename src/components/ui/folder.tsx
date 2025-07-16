import folderSVG from "@/assets/icons/folder.svg";
import folderOpenSVG from "@/assets/icons/folder-open.svg";
import type { Folder as FolderType } from "@/types/folder";
import { type FC } from "react";
import { useSearchParams } from "react-router";
import { Skeleton } from "./skeleton";

type FolderProps = {
  data: FolderType;
};

export const Folder: FC<FolderProps> = ({ data: { name, path } }) => {
  const [, setSearchParams] = useSearchParams();
  const handleClick = () => {
    setSearchParams((previous) => ({
      ...previous,
      folder: path,
    }));
  };

  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center justify-start gap-3 rounded-xs border-1 p-3 transition-shadow duration-150 hover:shadow-sm"
    >
      <img src={folderSVG} alt="folder-icon" width={32} height={32} />
      <p className="text-foreground overflow-hidden text-sm text-ellipsis capitalize">
        {name}
      </p>
    </div>
  );
};

export const FolderSkeleton: FC = () => {
  return (
    <div className="flex cursor-default items-center justify-start gap-3 rounded-sm border p-3">
      <Skeleton className="h-8 w-8 rounded-sm" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
};

type FolderBackProps = {
  name: string;
};

export const FolderBack: FC<FolderBackProps> = ({ name }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    const folderSplit = searchParams.get("folder")!.split("/");
    folderSplit.pop();
    setSearchParams((previous) => ({
      ...previous,
      folder: folderSplit.join("/"),
    }));
  };
  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center justify-start gap-3 rounded-xs border-1 p-3 transition-shadow duration-150 hover:shadow-sm"
    >
      <img src={folderOpenSVG} alt="folder-icon" width={32} height={32} />
      <p className="text-foreground overflow-hidden text-sm text-ellipsis capitalize">
        {name}
      </p>
    </div>
  );
};
