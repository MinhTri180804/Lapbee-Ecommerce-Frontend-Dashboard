import type { FileImageFromLink } from "@/contexts/uploadFileManager";
import { useUploadFileManagerActions } from "@/contexts/uploadFileManager";
import { useShrinkImageFromLink } from "@/features/resource-manager";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { type FC, useCallback } from "react";

type OptimizationImageActionProps = {
  conditionOptimizationImage: boolean;
  data: FileImageFromLink;
};

export const OptimizationImageAction: FC<OptimizationImageActionProps> = ({
  conditionOptimizationImage,
  data,
}) => {
  const { updateOptimizationImageFromLink, toggleOptimizationImageFromLink } =
    useUploadFileManagerActions();

  const {
    refetch,
    isRefetching: isRefetchingShrinkImage,
    isRefetchError,
  } = useShrinkImageFromLink({ url: data.linkImage });

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
