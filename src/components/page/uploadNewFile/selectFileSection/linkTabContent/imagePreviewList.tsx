import { useUploadFileManagerState } from "@/contexts/uploadFileManager";
import type { FC } from "react";
import { EmptyFile } from "../../commons";
import { ImagePreview } from "./imagePreview";

export const ImagePreviewList: FC = () => {
  const { filesFromLink } = useUploadFileManagerState();
  return (
    <div className="grid w-full grid-cols-12 gap-3">
      {filesFromLink.length ? (
        filesFromLink.map((image) => (
          <ImagePreview key={image.id} data={image} />
        ))
      ) : (
        <EmptyFile
          className="col-span-12"
          titleText="Chưa có hình ảnh nào được thêm bằng đường dẫn"
          descriptionText="Bạn có thể chọn đường dẫn hình ảnh muốn thêm vào và đăng tải"
        />
      )}
    </div>
  );
};
