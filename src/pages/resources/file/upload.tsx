import { Dropzone, type ImagePreview } from "@/components/ui/dropzone";
import { FileUploadedPreview } from "@/components/ui/fileUploadedPreview";
import { useState } from "react";

export const UploadNewFilePage = () => {
  const [files, setFiles] = useState<ImagePreview[]>([]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Dropzone
        acceptFiles={["image/apng"]}
        multiFiles
        limitFileSize={{
          value: 5,
          type: "MB",
        }}
        fileInputProps={{
          accept: "image/apng",
          multiple: true,
          type: "file",
        }}
        handleDropFile={(imagesPreview) => {
          console.log("Files dropped:", imagesPreview);
        }}
        handleOnChangeFile={(imagesPreview) => {
          console.log("Files changed:", imagesPreview);
          setFiles((prev) => [...prev, ...imagesPreview]);
        }}
      />

      {files.map((file, idx) => (
        <FileUploadedPreview
          key={idx}
          isSuccess={file.isSuccess}
          onClose={() => {
            setFiles((prev) => prev.filter((_, i) => i !== idx));
          }}
          index={idx}
          imageUrl={file.imageUrl}
          fileNameOriginal={file.nameOriginal}
          size={file.size}
          error={file.error}
        />
      ))}
    </div>
  );
};
