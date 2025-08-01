import folderSVG from "@/assets/icons/folder.svg";
import { cn } from "@/lib/utils";
import type { Folder as FolderType } from "@/types/folder";
import { memo, useState, type ComponentProps, type FC } from "react";
import { Skeleton } from "./skeleton";
import { Plus } from "lucide-react";
import { Input } from "./input";

type FolderProps = ComponentProps<"div"> & {
  data: FolderType;
};

export const Folder: FC<FolderProps> = memo(
  ({ data: { name }, className, ...props }) => {
    return (
      <FolderUI name={name} sizeIcon={32} className={className} {...props} />
    );
  },
);

type FolderSkeletonProps = ComponentProps<"div">;

export const FolderSkeleton: FC<FolderSkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex cursor-default items-center justify-start gap-3 rounded-sm border p-3",
        className,
      )}
      {...props}
    >
      <Skeleton className="h-8 w-8 rounded-sm" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
};

type FolderBackProps = ComponentProps<"div"> & {
  name: string;
};

export const FolderBack: FC<FolderBackProps> = memo(
  ({ name, className, ...props }) => {
    return (
      <FolderUI name={name} sizeIcon={32} className={className} {...props} />
    );
  },
);

type FolderCreateActionProps = ComponentProps<"div"> & {
  placeholder: string;
};

export const FolderCreateAction: FC<FolderCreateActionProps> = ({
  placeholder,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center justify-start gap-3 rounded-xs border-1 p-3 transition-shadow duration-150 hover:shadow-sm",
        className,
      )}
      {...props}
    >
      <Plus size={32} />
      <p className="text-foreground overflow-hidden text-sm text-ellipsis capitalize">
        {placeholder}
      </p>
    </div>
  );
};

type FolderCreatePlaceholderProps = ComponentProps<"div"> & {
  sizeIcon: number;
  onCreateFolder: (folderName: string) => void;
  onOutsideClick: () => void;
};

export const FolderCreatePlaceholder: FC<FolderCreatePlaceholderProps> = ({
  sizeIcon,
  className,
  onCreateFolder,
  onOutsideClick,
  ...props
}) => {
  const [folderNameValue, setFolderNameValue] = useState<string>("");

  const handleChangeNameFolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderNameValue(e.target.value);
  };

  const handleCreateFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!folderNameValue) return;
    onCreateFolder(folderNameValue);
  };

  const handleOutsideClick = () => {
    onOutsideClick();
  };

  const handleCreateFolderKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      if (!folderNameValue) return;
      onCreateFolder(folderNameValue);
    }
  };

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center justify-start gap-3 rounded-xs border-1 p-3 transition-shadow duration-150 hover:shadow-sm",
        className,
      )}
      {...props}
    >
      <img
        src={folderSVG}
        alt="folder-icon"
        width={sizeIcon}
        height={sizeIcon}
      />
      <form onSubmit={handleCreateFolder}>
        <Input
          className="h-8 rounded-none"
          placeholder="Nhập tên thư mục"
          value={folderNameValue}
          onChange={handleChangeNameFolder}
          onBlur={handleOutsideClick}
          autoFocus
          onKeyDown={handleCreateFolderKeyDown}
        />
      </form>
    </div>
  );
};

type FolderUIProps = ComponentProps<"div"> & {
  name: string;
  sizeIcon: number;
};

export const FolderUI: FC<FolderUIProps> = ({
  name,
  sizeIcon,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center justify-start gap-3 rounded-sm border-1 p-3 transition-shadow duration-150 hover:shadow-sm",
        className,
      )}
      {...props}
    >
      <img
        src={folderSVG}
        alt="folder-icon"
        width={sizeIcon}
        height={sizeIcon}
      />
      <p className="text-foreground overflow-hidden text-sm text-ellipsis">
        {name}
      </p>
    </div>
  );
};
