import {
  type PropsWithChildren,
  type ComponentProps,
  type FC,
  useState,
  useEffect,
  memo,
} from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getImageDimensions } from "@/utils/getImageDimensions";
import fileEmptyIllustration from "@/assets/Illustrations/empty-file.svg";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { ImageImportFromLink } from "./linkTabContent";

// Components for the section, title, header, and content

type TitleSectionProps = ComponentProps<"h5"> & {
  titleText: string;
};

export const TitleSection: FC<TitleSectionProps> = ({
  titleText,
  className,
  ...props
}) => {
  return (
    <h5
      className={cn("text-foreground text-base font-medium", className)}
      {...props}
    >
      {titleText}
    </h5>
  );
};

type SectionProps = ComponentProps<"section"> & PropsWithChildren & {};

export const Section: FC<SectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className={cn("flex w-full flex-col gap-4", className)} {...props}>
      {children}
    </section>
  );
};

type SectionHeaderProps = ComponentProps<"header"> & PropsWithChildren & {};

export const SectionHeader: FC<SectionHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <header
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </header>
  );
};

type SectionContentProps = ComponentProps<"div"> & PropsWithChildren & {};

export const SectionContent: FC<SectionContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("w-full", className)} {...props}>
      {children}
    </div>
  );
};

// Components for the sheet preview image body and its items

type SheetPreviewImageBodyProps = PropsWithChildren & ComponentProps<"div">;

export const SheetPreviewImageBody: FC<SheetPreviewImageBodyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-7 px-4", className)} {...props}>
      {children}
    </div>
  );
};

type SheetPreviewImageItemProps = PropsWithChildren &
  ComponentProps<"div"> & {
    titleText: string;
  };

export const SheetPreviewImageItem: FC<SheetPreviewImageItemProps> = ({
  children,
  className,
  titleText,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <h5 className="text-foreground text-sm font-semibold">{titleText}</h5>
      {children}
    </div>
  );
};

type SheetPreviewImageSpecsListProps = PropsWithChildren & ComponentProps<"ul">;

export const SheetPreviewImageSpecsList: FC<
  SheetPreviewImageSpecsListProps
> = ({ children, className, ...props }) => {
  return (
    <ul className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {children}
    </ul>
  );
};

type SheetPreviewImageSpecsItemProps = ComponentProps<"li"> &
  PropsWithChildren & {
    titleText: string;
    valueText?: string;
    classTextValue?: string;
  };

export const SheetPreviewImageSpecsItem: FC<
  SheetPreviewImageSpecsItemProps
> = ({
  titleText,
  valueText,
  children,
  className,
  classTextValue,
  ...props
}) => {
  return (
    <li className={cn("grid grid-cols-2 gap-2", className)} {...props}>
      <span className="col-span-1 text-sm font-normal">{titleText}:</span>
      {valueText && !children && (
        <span
          className={cn(
            "text-muted-foreground col-span-1 text-sm wrap-anywhere",
            classTextValue,
          )}
        >
          {valueText}
        </span>
      )}
      {children && children}
    </li>
  );
};

type SheetPreviewImageSpecsDimensionsProps = ComponentProps<"li"> & {
  image: string | File;
};

export const SheetPreviewImageSpecsDimensions: FC<SheetPreviewImageSpecsDimensionsProps> =
  memo(({ image, className, ...props }) => {
    const [isPending, setIsPending] = useState(true);
    const [dimensions, setDimensions] = useState<{
      width: number;
      height: number;
    } | null>(null);

    const imageUrl =
      typeof image === "string" ? image : URL.createObjectURL(image);

    useEffect(() => {
      const fetchDimensions = async () => {
        try {
          const dimensions = await getImageDimensions(image);
          setDimensions(dimensions);
        } catch (error) {
          // TODO: Handle error appropriately
          console.error("Error fetching image dimensions:", error);
        } finally {
          setIsPending(false);
        }
      };

      fetchDimensions();
    }, [image]);

    return (
      <SheetPreviewImageSpecsItem
        className={cn("", className)}
        titleText="Kích thước hình ảnh"
        {...props}
      >
        {isPending ? (
          <Skeleton className="h-4 w-24" />
        ) : dimensions ? (
          <span className="text-muted-foreground col-span-1 text-sm wrap-anywhere">
            <a href={imageUrl} target="_blank" className="underline">
              {dimensions.width} x {dimensions.height}
            </a>
          </span>
        ) : (
          <span className="text-muted-foreground col-span-1 text-sm wrap-anywhere">
            Không xác định
          </span>
        )}
      </SheetPreviewImageSpecsItem>
    );
  });

type EmptyFileProps = ComponentProps<"div"> & {
  titleText: string;
  descriptionText: string;
};

export const EmptyFile: FC<EmptyFileProps> = ({
  titleText,
  descriptionText,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex h-[376px] w-full flex-col items-center justify-center gap-4",
        className,
      )}
      {...props}
    >
      <img src={fileEmptyIllustration} alt="" />
      <div className="flex flex-col gap-2">
        <p className="text-foreground text-center text-sm font-medium">
          {titleText}
        </p>
        <span className="text-center text-xs font-normal text-zinc-500">
          {descriptionText}
        </span>
      </div>
    </div>
  );
};

type ImagePreviewFromURLProps = ComponentProps<"div"> & {
  data: ImageImportFromLink;
  handleRemoveImage: (id: string) => void;
  sheetContentChildren: React.ReactNode;
};

export const ImagePreviewFromURL: FC<ImagePreviewFromURLProps> = ({
  className,
  data,
  handleRemoveImage,
  sheetContentChildren,
  ...props
}) => {
  const handleRemove = () => {
    handleRemoveImage(data.id);
  };

  return (
    <div
      className={cn("relative flex h-full w-full flex-col gap-3", className)}
      {...props}
    >
      <img
        src={data.url}
        alt="Imported from link"
        className="aspect-3/2 rounded-sm object-contain"
      />
      <div
        onClick={handleRemove}
        className="absolute top-2 left-2 cursor-pointer rounded-full bg-white p-1 hover:bg-gray-200"
      >
        <X size={18} />
      </div>
      <Tooltip>
        <TooltipTrigger className="absolute top-2 right-2">
          <Switch />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Tối ưu hình ảnh</p>
        </TooltipContent>
      </Tooltip>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            Xem chi tiết
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md">
          {sheetContentChildren}
        </SheetContent>
      </Sheet>
    </div>
  );
};

type ImagePreviewFromLocalProps = ComponentProps<"div"> & {
  data: ImageImportFromLink;
  handleRemoveImage: (id: string) => void;
  sheetContentChildren: React.ReactNode;
};

export const ImagePreviewFromLocal: FC<ImagePreviewFromLocalProps> = ({
  data,
  handleRemoveImage,
  sheetContentChildren,
  className,
  ...props
}) => {
  const handleRemove = () => {
    handleRemoveImage(data.id);
  };
  return (
    <div
      className={cn("relative flex h-full w-full flex-col gap-3", className)}
      {...props}
    >
      <img
        src={data.url}
        alt="Imported from link"
        className="aspect-3/2 rounded-sm object-contain"
      />
      <div
        onClick={handleRemove}
        className="absolute top-2 left-2 cursor-pointer rounded-full bg-white p-1 hover:bg-gray-200"
      >
        <X size={18} />
      </div>
      <Tooltip>
        <TooltipTrigger className="absolute top-2 right-2">
          <Switch />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Tối ưu hình ảnh</p>
        </TooltipContent>
      </Tooltip>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            Xem chi tiết
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md">
          {sheetContentChildren}
        </SheetContent>
      </Sheet>
    </div>
  );
};
