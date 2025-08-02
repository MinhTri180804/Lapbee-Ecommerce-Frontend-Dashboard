import type { FileImageFromLink } from "@/contexts/uploadFileManager";
import type { FC } from "react";
import { memo, useCallback } from "react";
import { useUploadFileManagerActions } from "@/contexts/uploadFileManager";
import { useUploadFileManagerState } from "@/contexts/uploadFileManager";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SheetDescription } from "@/components/ui/sheet";
import { SheetFooter } from "@/components/ui/sheet";
import {
  SheetPreviewImageBody,
  SheetPreviewImageItem,
  SheetPreviewImageSpecsDimensions,
  SheetPreviewImageSpecsItem,
  SheetPreviewImageSpecsList,
} from "../../../commons";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { FileSize } from "@/types/fileSize";
import { useShrinkImageFromLink } from "@/features/resource-manager";
import { RenameFileImageOption } from "./renameOption";
import { OptimizationImageOption } from "./optimizationOption";

type SheetBodyContentProps = {
  data: FileImageFromLink;
  isLoadingSizeImage: boolean;
  sizeImage: FileSize | null;
  conditionOptimizationImage: boolean;
};

export const SheetBodyContent: FC<SheetBodyContentProps> = memo(
  ({ data, isLoadingSizeImage, sizeImage, conditionOptimizationImage }) => {
    const { updateOptimizationImageFromLink, toggleOptimizationImageFromLink } =
      useUploadFileManagerActions();

    const { filesFromLink } = useUploadFileManagerState();

    const { refetch, isLoading: isRefetchingShrinkImage } =
      useShrinkImageFromLink({ url: data.linkImage });

    const handleChangeSwitchOptimization = useCallback(
      (checked: boolean) => {
        // TODO: Optimization handle logic toggle in here
        toggleOptimizationImageFromLink(data.id, checked);
        if (!data.optimize && checked) {
          refetch().then((responseQuery) => {
            if (responseQuery.isSuccess) {
              updateOptimizationImageFromLink(data.id, responseQuery.data.data);
            }

            //TODO: Handle error
          });
        }
      },
      [
        data,
        refetch,
        updateOptimizationImageFromLink,
        toggleOptimizationImageFromLink,
      ],
    );

    const handleCTest = () => {
      console.log(filesFromLink);
    };

    return (
      <>
        <SheetHeader className="shrink-0">
          <SheetTitle>Thông tin hình ảnh</SheetTitle>
          <SheetDescription>
            Thông tin hình ảnh mà bạn thêm bằng đường dẫn
          </SheetDescription>
        </SheetHeader>
        <SheetPreviewImageBody className="grow-1 overflow-y-auto">
          <SheetPreviewImageItem titleText="Hình ảnh">
            {
              // TODO: Implement component image have hover view full image
            }
            <img
              src={data.linkImage}
              height={224}
              className="aspect-3/2 h-[224px] w-full rounded-sm object-cover"
            />
          </SheetPreviewImageItem>
          <SheetPreviewImageItem titleText="Tùy chọn">
            <OptimizationImageOption
              handleChangeSwitch={handleChangeSwitchOptimization}
              conditionOptimizationImage={conditionOptimizationImage}
              isOptimization={data.isOptimize}
              isRefetchingShrinkImage={isRefetchingShrinkImage}
              optimizeData={data.optimize}
            />

            <RenameFileImageOption data={data} />
          </SheetPreviewImageItem>

          <SheetPreviewImageItem titleText="Thông tin">
            <SheetPreviewImageSpecsList>
              <SheetPreviewImageSpecsDimensions image={data.linkImage} />

              <SheetPreviewImageSpecsItem titleText="Kích thước">
                {isLoadingSizeImage ? (
                  <Skeleton className="h-4 w-20" />
                ) : sizeImage ? (
                  <span className="text-muted-foreground text-sm">{`${sizeImage.value} ${sizeImage.type}`}</span>
                ) : (
                  <span className="text-muted-foreground text-sm">
                    Không xác định
                  </span>
                )}
              </SheetPreviewImageSpecsItem>
              <SheetPreviewImageSpecsItem
                titleText="Định dạng"
                valueText={
                  data.fileInfo?.exp?.toUpperCase() || "Không xác định"
                }
              />
              <SheetPreviewImageSpecsItem
                titleText="Tên tệp"
                valueText={data.fileInfo?.filename || "Không xác định"}
              />
            </SheetPreviewImageSpecsList>
          </SheetPreviewImageItem>
          <SheetPreviewImageItem titleText="Thông tin liên kết">
            <SheetPreviewImageSpecsList>
              <SheetPreviewImageSpecsItem
                titleText="Máy chủ"
                valueText={data.fileInfo?.host || "Không xác định"}
              />
            </SheetPreviewImageSpecsList>
          </SheetPreviewImageItem>
        </SheetPreviewImageBody>
        <SheetFooter className="shrink-0">
          <Button type="submit" onClick={handleCTest}>
            Lưu mô tả
          </Button>
        </SheetFooter>
      </>
    );
  },
);
