import { Button } from "@/components/ui/button";
import {
  Dropzone,
  type ImagePreview as ImagePreviewType,
} from "@/components/ui/dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import type { ComponentProps, FC } from "react";
import { useState } from "react";
import {
  EmptyFile,
  ImagePreviewFromURL,
  SheetPreviewImageBody,
  SheetPreviewImageItem,
  SheetPreviewImageSpecsDimensions,
  SheetPreviewImageSpecsItem,
  SheetPreviewImageSpecsList,
} from "./commons";

type UploadTabContentProps = {
  mock?: null;
};
export const UploadTabContent: FC<UploadTabContentProps> = () => {
  const [files, setFiles] = useState<ImagePreviewType[]>([]);

  return (
    <>
      <Dropzone
        acceptFiles={["image/apng", "image/jpeg", "image/png"]}
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

      {files.length ? (
        <div className="grid w-full grid-cols-12 gap-3">
          {files.map((file, idx) => (
            <ImageImportFromLocalPreview
              className="col-span-2"
              key={idx}
              data={file}
            />
          ))}
        </div>
      ) : (
        <EmptyFile
          titleText="Chưa có hình ảnh nào được tải lên từ máy tính"
          descriptionText="Bạn có thể chọn hình ảnh muốn tải lên từ máy tính hoặc kéo và thả hình ảnh muốn đăng tải"
        />
      )}
    </>
  );
};

type ImageImportFromLocalPreviewProps = ComponentProps<"div"> & {
  data: ImagePreviewType;
};

const ImageImportFromLocalPreview: FC<ImageImportFromLocalPreviewProps> = ({
  data,
  ...props
}) => {
  const handleRemoveImage = (id: string) => {
    console.log(id);
  };

  console.log(data);

  return (
    <ImagePreviewFromURL
      handleRemoveImage={handleRemoveImage}
      {...props}
      data={{
        id: data.id,
        url: data.imageUrl,
      }}
      sheetContentChildren={<SheetBodyContent data={data} />}
    />
  );
};

type SheetBodyContentProps = {
  data: ImagePreviewType;
};

const SheetBodyContent: FC<SheetBodyContentProps> = ({ data }) => {
  return (
    <>
      <SheetHeader className="shrink-0">
        <SheetTitle>Thông tin hình ảnh</SheetTitle>
        <SheetDescription>
          Thông tin hình ảnh mà bạn thêm bằng đường dẫn
        </SheetDescription>
      </SheetHeader>
      <SheetPreviewImageBody className="grow-1 overflow-y-auto">
        <SheetPreviewImageItem titleText="Tùy chọn">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="optimize-image" className="text-sm">
              Tối ưu hình ảnh
            </label>
            <Switch id="optimize-image" />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="rename-file" className="text-sm">
              Thay đổi tên tệp
            </label>
            <Switch id="rename-file" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="rename-file-input" className="text-sm font-normal">
              Nhập tên mới
            </Label>
            <Input
              id="rename-file-input"
              placeholder="Nhập tên mới cho tệp..."
              className="w-full rounded-sm"
            />
          </div>
        </SheetPreviewImageItem>
        <SheetPreviewImageItem titleText="Hình ảnh">
          <img src={data.imageUrl} className="h-auto w-full object-cover" />
        </SheetPreviewImageItem>
        <SheetPreviewImageItem titleText="Thông tin">
          <SheetPreviewImageSpecsList>
            <SheetPreviewImageSpecsDimensions image={data.imageUrl} />

            <SheetPreviewImageSpecsItem
              titleText="Kích thước"
              valueText={`${data.size.value} ${data.size.type}`}
            />
            <SheetPreviewImageSpecsItem
              titleText="Định dạng"
              valueText={data?.type || "Không xác định"}
            />
            <SheetPreviewImageSpecsItem
              titleText="Tên tệp"
              valueText={data.nameOriginal}
            />
          </SheetPreviewImageSpecsList>
        </SheetPreviewImageItem>
      </SheetPreviewImageBody>
      <SheetFooter className="shrink-0">
        <Button type="submit">Lưu mô tả</Button>
      </SheetFooter>
    </>
  );
};
