import type { FileImageFromLink } from "@/contexts/uploadFileManager";
import { memo, type FC, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import utilsApi from "@/apis/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { RemoveFileAction } from "./removeAction";
import { OptimizationImageAction } from "./optimizationAction";
import { SheetBodyContent } from "./sheetBodyContent";

type ImagePreviewProps = {
  data: FileImageFromLink;
};

export const ImagePreview: FC<ImagePreviewProps> = memo(({ data }) => {
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
          <SheetBodyContent
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
