import type { FileImageFromLink } from "@/contexts/uploadFileManager";
import { memo, type FC, useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import { returnFileSize } from "@/utils/returnFileSize";
import { convertPercentFromRatio } from "@/utils/convertPercentFromRatio";
import {
  SheetPreviewImageSpecsList,
  SheetPreviewImageSpecsItem,
} from "../../../commons";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type OptimizationImageOptionProps = {
  handleChangeSwitch: (checked: boolean) => void;
  conditionOptimizationImage: boolean;
  isOptimization: boolean;
  isRefetchingShrinkImage: boolean;
  optimizeData: FileImageFromLink["optimize"];
};

export const OptimizationImageOption: FC<OptimizationImageOptionProps> = memo(
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
