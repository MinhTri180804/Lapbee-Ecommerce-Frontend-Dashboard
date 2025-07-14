import type { FC } from "react";
import folderSVG from "@/assets/icons/folder.svg";
import { Skeleton } from "./skeleton";
import type { Folder as FolderType } from "@/types/folder";
import { useNavigate } from "react-router";

type FolderProps = {
  data: FolderType;
};

export const Folder: FC<FolderProps> = ({ data: { name, path } }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center justify-start gap-3 rounded-xs border-1 p-3 transition-shadow duration-150 hover:shadow-sm"
    >
      <img src={folderSVG} alt="folder-icon" width={32} height={32} />
      <p className="text-foreground text-sm capitalize">{name}</p>
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
