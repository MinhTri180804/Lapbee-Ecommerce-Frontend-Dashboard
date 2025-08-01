import utilsApi from "@/apis/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useUploadFileManagerActions,
  useUploadFileManagerState,
} from "@/contexts/uploadFileManager";
import type { FileImageFromLink } from "@/contexts/uploadFileManager/type";
import { useShrinkImageFromLink } from "@/features/resource-manager";
import { cn } from "@/lib/utils";
import type { FileSize } from "@/types/fileSize";
import { convertPercentFromRatio } from "@/utils/convertPercentFromRatio";
import { returnFileSize } from "@/utils/returnFileSize";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import {
  type FC,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  SheetPreviewImageBody,
  SheetPreviewImageItem,
  SheetPreviewImageSpecsDimensions,
  SheetPreviewImageSpecsItem,
  SheetPreviewImageSpecsList,
} from "./commons";

type ImageImportFromLinkPreviewProps = {
  data: FileImageFromLink;
};

export const ImageImportFromLinkPreview: FC<ImageImportFromLinkPreviewProps> =
  memo(({ data }) => {
    const { data: sizeImage, isLoading: isLoadingSizeImage } = useQuery({
      queryKey: ["get-size-image-from-url", data.linkImage],
      queryFn: () => utilsApi.getSizeImageFromUrl({ url: data.linkImage }),
      enabled: !!data.linkImage,
      refetchOnWindowFocus: false,
    });

    const sizeImageMemo = useMemo(() => {
      return sizeImage;
    }, [sizeImage]);

    const conditionOptimizationImage = useMemo(() => {
      if (!sizeImageMemo) return true;
      if (sizeImageMemo.isUnknown) return false;
      if (Number(sizeImageMemo.originalSize) > 5 * 1024 * 1024) return false;
      return true;
    }, [sizeImageMemo]);

    return (
      <div className="relative col-span-2 flex h-full w-full flex-col gap-3">
        <img
          src={data.linkImage}
          alt="Imported from link"
          className="aspect-3/2 rounded-sm object-contain"
        />
        <RemoveFileAction id={data.id} />
        <OptimizationImageAction
          data={data}
          conditionOptimizationImage={conditionOptimizationImage}
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full rounded-sm">
              Xem chi tiết
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md">
            <SheetImageInfo
              data={data}
              isLoadingSizeImage={isLoadingSizeImage}
              sizeImage={sizeImageMemo?.sizeFormat ?? null}
              conditionOptimizationImage={conditionOptimizationImage}
            />
          </SheetContent>
        </Sheet>
      </div>
    );
  });

type SheetImageInfoProps = {
  data: FileImageFromLink;
  isLoadingSizeImage: boolean;
  sizeImage: FileSize | null;
  conditionOptimizationImage: boolean;
};

const SheetImageInfo: FC<SheetImageInfoProps> = memo(
  ({ data, isLoadingSizeImage, sizeImage, conditionOptimizationImage }) => {
    const { updateOptimizationImageFromLink, toggleOptimizationImageFromLink } =
      useUploadFileManagerActions();

    const { filesFromLink } = useUploadFileManagerState();

    const { refetch, isLoading: isRefetchingShrinkImage } =
      useShrinkImageFromLink(data.linkImage);

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

// Actions of ImageImportFromLinkPreview

type RemoveFileActionProps = {
  id: string;
};
const RemoveFileAction: FC<RemoveFileActionProps> = ({ id }) => {
  const { removeFileFromLink } = useUploadFileManagerActions();

  return (
    <div
      onClick={() => removeFileFromLink(id)}
      className="absolute top-2 left-2 cursor-pointer rounded-full bg-white p-1 hover:bg-gray-200"
    >
      <X size={18} />
    </div>
  );
};

type OptimizationImageActionProps = {
  conditionOptimizationImage: boolean;
  data: FileImageFromLink;
};

const OptimizationImageAction: FC<OptimizationImageActionProps> = ({
  conditionOptimizationImage,
  data,
}) => {
  const { updateOptimizationImageFromLink, toggleOptimizationImageFromLink } =
    useUploadFileManagerActions();

  const {
    refetch,
    isRefetching: isRefetchingShrinkImage,
    isRefetchError,
  } = useShrinkImageFromLink(data.linkImage);

  const handleChangeSwitch = useCallback(
    (checked: boolean) => {
      toggleOptimizationImageFromLink(data.id, checked);
      if (checked && !data.optimize) {
        refetch().then((responseQuery) => {
          if (responseQuery.isSuccess) {
            updateOptimizationImageFromLink(data.id, responseQuery.data.data);
          }
        });
      }
    },
    [
      data,
      updateOptimizationImageFromLink,
      refetch,
      toggleOptimizationImageFromLink,
    ],
  );

  return (
    <Tooltip>
      <TooltipTrigger className="absolute top-2 right-2">
        <Switch
          className={cn({
            "cursor-not-allowed":
              !conditionOptimizationImage ||
              isRefetchingShrinkImage ||
              isRefetchError,
            "bg-destructive": isRefetchError,
          })}
          disabled={!conditionOptimizationImage || isRefetchingShrinkImage}
          onCheckedChange={handleChangeSwitch}
          defaultChecked={data.isOptimize}
          checked={data.isOptimize}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">Tối ưu hình ảnh</p>
      </TooltipContent>
    </Tooltip>
  );
};

// Options of SheetImageInfo

type OptimizationImageOptionProps = {
  handleChangeSwitch: (checked: boolean) => void;
  conditionOptimizationImage: boolean;
  isOptimization: boolean;
  isRefetchingShrinkImage: boolean;
  optimizeData: FileImageFromLink["optimize"];
};

const OptimizationImageOption: FC<OptimizationImageOptionProps> = memo(
  ({
    handleChangeSwitch,
    conditionOptimizationImage,
    isOptimization,
    isRefetchingShrinkImage,
    optimizeData,
  }) => {
    const sizeOriginFormat = useMemo(() => {
      return returnFileSize(optimizeData?.input.size ?? 0);
    }, [optimizeData]);

    const sizeOptimizeFormat = useMemo(() => {
      return returnFileSize(optimizeData?.output.size ?? 0);
    }, [optimizeData]);

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="optimize-image" className="text-sm">
            Tối ưu hình ảnh
          </label>
          <Switch
            onCheckedChange={handleChangeSwitch}
            disabled={!conditionOptimizationImage}
            defaultChecked={isOptimization}
            checked={isOptimization}
            id="optimize-image"
          />
        </div>

        {isRefetchingShrinkImage ? (
          <OptimizationImageOptionSkeleton />
        ) : (
          optimizeData && (
            <SheetPreviewImageSpecsList
              className={cn(
                "border-primary rounded-sm rounded-l-none rounded-r-none rounded-b-sm border-1 border-t-0 p-3 pt-1",
                {
                  "opacity-50": !isOptimization,
                },
              )}
            >
              <SheetPreviewImageSpecsItem
                titleText="Kích thước gốc"
                valueText={`${sizeOriginFormat.value} ${sizeOriginFormat.type}`}
              />
              <SheetPreviewImageSpecsItem
                titleText="Kích thước tối ưu"
                valueText={`${sizeOptimizeFormat.value} ${sizeOptimizeFormat.type}`}
              />
              <SheetPreviewImageSpecsItem
                titleText="Giảm bớt"
                valueText={`${convertPercentFromRatio(optimizeData.output.ratio).toFixed(2)} %`}
                classTextValue="text-green-700"
              />
              <SheetPreviewImageSpecsItem titleText="Hình ảnh tối ưu">
                <a
                  href={optimizeData.output.url}
                  className="text-primary text-sm underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Xem hình ảnh
                </a>
              </SheetPreviewImageSpecsItem>
            </SheetPreviewImageSpecsList>
          )
        )}
      </div>
    );
  },
);

type RenameFileImageOptionProps = {
  data: FileImageFromLink;
};

const RenameFileImageOption: FC<RenameFileImageOptionProps> = ({ data }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newName, setNewName] = useState<string>("");
  const { toggleRenameFileFromLink, updateRenameFileFromLink } =
    useUploadFileManagerActions();

  useEffect(() => {
    if (data.isRename && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [data.isRename]);

  const handleChangeNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleUpdateRenameFileFromLink = () => {
    updateRenameFileFromLink(data.id, newName);
  };

  const handleChangeSwitch = (checked: boolean) => {
    toggleRenameFileFromLink(data.id, checked);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="rename-file" className="text-sm">
          Thay đổi tên tệp
        </label>
        <Switch
          id="rename-file"
          defaultChecked={data.isRename}
          checked={data.isRename}
          onCheckedChange={handleChangeSwitch}
        />
      </div>

      <div
        className={cn(
          "border-primary flex flex-col gap-2 rounded-sm rounded-t-none border border-t-0 p-3 pt-1",
          {
            "opacity-50": !data.isRename,
            "cursor-not-allowed": !data.isRename,
          },
        )}
      >
        <Label htmlFor="rename-file-input" className="text-sm font-normal">
          Tên mới
        </Label>
        <div className="flex flex-col items-start gap-2">
          <Input
            ref={inputRef}
            disabled={!data.isRename}
            id="rename-file-input"
            placeholder="Nhập tên mới cho tệp..."
            className="w-full rounded-sm"
            onChange={handleChangeNewName}
            value={newName}
            onBlur={handleUpdateRenameFileFromLink}
          />
          {newName.length === 0 && data.isRename && (
            <p className="text-destructive text-xs">
              Tên mới không được để trống
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const OptimizationImageOptionSkeleton: FC = () => {
  return (
    <SheetPreviewImageSpecsList className="border-primary rounded-sm rounded-l-none rounded-r-none rounded-b-sm border-1 border-t-0 p-3 pt-1">
      <SheetPreviewImageSpecsItem titleText="Kích thước gốc">
        <Skeleton className="h-4 w-20" />
      </SheetPreviewImageSpecsItem>
      <SheetPreviewImageSpecsItem titleText="Kích thước tối ưu">
        <Skeleton className="h-4 w-20" />
      </SheetPreviewImageSpecsItem>
      <SheetPreviewImageSpecsItem titleText="Giảm bớt">
        <Skeleton className="h-4 w-20" />
      </SheetPreviewImageSpecsItem>
      <SheetPreviewImageSpecsItem titleText="Hình ảnh tối ưu">
        <Skeleton className="h-4 w-20" />
      </SheetPreviewImageSpecsItem>
    </SheetPreviewImageSpecsList>
  );
};
