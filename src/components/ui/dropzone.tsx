import type { FileImageType } from "@/types/file";
import type { FileSize } from "@/types/fileSize";
import { convertFileSize } from "@/utils/convertFileSize";
import { GenerateId } from "@/utils/generateId";
import { returnFileSize } from "@/utils/returnFileSize";
import { useRef, type ComponentProps, type DragEvent, type FC } from "react";

type DropzoneProps = {
  fileInputProps: ComponentProps<"input">;
  handleDropFile: (imagesPreview: ImagePreview[]) => void;
  multiFiles?: boolean;
  acceptFiles: FileImageType[];
  limitFileSize: FileSize;
  handleOnChangeFile: (imagesPreview: ImagePreview[]) => void;
};

export type ImagePreview = {
  id: string;
  imageUrl: string;
  isSuccess: boolean | null;
  error: ("size" | "upload" | "type-file")[];
  nameOriginal: string;
  size: FileSize;
  type: string;
  file: File;
};

export const Dropzone: FC<DropzoneProps> = ({
  fileInputProps,
  handleDropFile,
  multiFiles = false,
  acceptFiles,
  limitFileSize,
  handleOnChangeFile,
}) => {
  const inputUploadRef = useRef<HTMLInputElement | null>(null);

  const handleOnChange = () => {
    if (inputUploadRef.current!.files) {
      const files = Array.from(inputUploadRef.current!.files);
      console.log("Files changed:", files);
      const imagesPreview: ImagePreview[] = [
        ...inputUploadRef.current!.files,
      ].map((file) => {
        const error: ImagePreview["error"] = [];
        let isSuccess: ImagePreview["isSuccess"] = null;
        if (
          file.size >
          convertFileSize(limitFileSize.type, limitFileSize.value, "Bytes")
        ) {
          error.push("size");
          isSuccess = false;
        }
        const imageUrl = URL.createObjectURL(file);
        return {
          id: GenerateId.fileImportFromLocal(),
          imageUrl,
          isSuccess,
          error,
          nameOriginal: file.name,
          size: returnFileSize(file.size),
          type: file.type,
          file,
        };
      });

      handleOnChangeFile(imagesPreview);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (multiFiles) {
      const imagesPreview: ImagePreview[] = Array.from(
        event.dataTransfer.files,
      ).map((item) => {
        const error: ImagePreview["error"] = [];
        let isSuccess: ImagePreview["isSuccess"] = null;

        if (!acceptFiles.includes(item.type as FileImageType)) {
          error.push("type-file");
        }

        if (
          item.size >
          convertFileSize(limitFileSize.type, limitFileSize.value, "Bytes")
        ) {
          error.push("size");
        }

        if (error.length > 0) {
          isSuccess = false;
        }

        return {
          id: GenerateId.fileImportFromLocal(),
          isSuccess,
          error,
          imageUrl: URL.createObjectURL(item),
          nameOriginal: item.name,
          size: returnFileSize(item.size),
          type: item.type,
          file: item,
        };
      });
      handleDropFile(imagesPreview);
      return;
    }

    const file = event.dataTransfer.files[0];
    const error: ImagePreview["error"] = [];
    let isSuccess: ImagePreview["isSuccess"] = null;
    if (!acceptFiles.includes(file.type as FileImageType)) {
      error.push("type-file");
    }
    if (
      file.size >
      convertFileSize(limitFileSize.type, limitFileSize.value, "Bytes")
    ) {
      error.push("size");
    }

    if (error.length > 0) {
      isSuccess = false;
    }

    const imagePreview: ImagePreview = {
      id: GenerateId.fileImportFromLocal(),
      isSuccess,
      error,
      imageUrl: URL.createObjectURL(file),
      nameOriginal: file.name,
      size: returnFileSize(file.size),
      type: file.type,
      file,
    };

    handleDropFile([imagePreview]);
  };

  return (
    <div
      className="flex w-full items-center justify-center"
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            {acceptFiles
              .map((value) => value.toUpperCase().split("/")[1])
              .join(" ,")}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Giới hạn kích thước file: {limitFileSize.value} {limitFileSize.type}
          </p>
        </div>
        <input
          onChange={handleOnChange}
          ref={inputUploadRef}
          id="dropzone-file"
          type="file"
          multiple={multiFiles}
          className="hidden"
          accept={acceptFiles.join(", ")}
          size={convertFileSize(
            limitFileSize.type,
            limitFileSize.value,
            "Bytes",
          )}
          {...fileInputProps}
        />
      </label>
    </div>
  );
};
