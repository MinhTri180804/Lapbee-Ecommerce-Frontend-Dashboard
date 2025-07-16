import { FileImage, FileImageSkeleton } from "@/components/ui/fileImage";
import type { File } from "@/types/file";
import React, {
  type ComponentProps,
  type FC,
  type PropsWithChildren,
} from "react";
import emptyFiles from "@/assets/icons/empty-files.svg";
import { cn } from "@/lib/utils";

type FileListProps = {
  files: File[];
  isLoading: boolean;
  isSearchLoading: boolean;
  emptyProps: EmptyFilesProps;
};

export const FileList: FC<FileListProps> = React.memo(
  ({ files, isLoading, isSearchLoading, emptyProps }) => {
    return (
      <>
        <div className="grid grid-cols-6 gap-4">
          {!isSearchLoading &&
            files.length > 0 &&
            files.map((file) => <FileImage data={file} key={file.assetId} />)}

          {(isLoading || isSearchLoading) &&
            Array.from({ length: 10 }).map((_, index) => (
              <FileImageSkeleton key={`skeleton-file-image-${index}`} />
            ))}
        </div>

        {!isSearchLoading && !isLoading && files.length <= 0 && (
          <EmptyFiles {...emptyProps} />
        )}
      </>
    );
  },
);

export type EmptyFilesProps = PropsWithChildren &
  ComponentProps<"div"> & {
    titleEmpty: string | React.ReactNode;
    descriptionEmpty: string | React.ReactNode;
  };

const EmptyFiles: FC<EmptyFilesProps> = ({
  titleEmpty,
  descriptionEmpty,
  className,
  children,
  ...props
}) => {
  const titleState = {
    true: <EmptyFilesTitle titleText={titleEmpty as string} />,
    false: titleEmpty,
  };
  const descriptionState = {
    true: (
      <EmptyFilesDescription descriptionText={descriptionEmpty as string} />
    ),
    false: descriptionEmpty,
  };
  return (
    <div
      className={cn(
        "flex h-fit w-full flex-col items-center justify-center gap-3",
        className,
      )}
      {...props}
    >
      <img src={emptyFiles} width={320} />
      {titleState[`${typeof titleEmpty === "string"}`]}
      {descriptionState[`${typeof descriptionEmpty === "string"}`]}
      {children}
    </div>
  );
};

type EmptyFilesTitleProps = { titleText: string };

const EmptyFilesTitle: FC<EmptyFilesTitleProps> = ({ titleText }) => {
  return <h5 className="text-lg font-medium">{titleText}</h5>;
};

type EmptyFilesDescriptionProps = { descriptionText: string };

const EmptyFilesDescription: FC<EmptyFilesDescriptionProps> = ({
  descriptionText,
}) => {
  return (
    <p className="max-w-[40%] text-center text-sm text-gray-600 italic">
      {descriptionText}
    </p>
  );
};
