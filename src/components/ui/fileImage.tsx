import { cn } from "@/lib/utils";
import type { File } from "@/types/file";
import { formatTime } from "@/utils/formatTime";
import { getCloudinaryImageUrl } from "@/utils/getCloudinaryImageUrl";
import { returnFileSize } from "@/utils/returnFileSize";
import { XIcon } from "lucide-react";
import React, {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type FC,
  type PropsWithChildren,
} from "react";
import { Link } from "react-router";
import { Button } from "./button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./sheet";

type FileImageProps = {
  data: File;
};

export const FileImage: FC<FileImageProps> = React.memo(({ data }) => {
  const [isViewImage, setIsViewImage] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { displayName, format, bytes, publicId } = data;
  const [imageURL, setImageURL] = useState<string | null>(null);

  const sizeFormat = returnFileSize(bytes);

  useEffect(() => {
    setImageURL(
      getCloudinaryImageUrl({
        publicId: publicId,
        options: {
          width: containerRef.current?.clientWidth,
          height: 139,
        },
      }),
    );
  }, [publicId]);

  const handleClick = () => {
    setIsViewImage(true);
  };

  const handleOpenChange = (value: boolean) => {
    setIsViewImage(value);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="cursor-pointer overflow-hidden rounded-xs transition-shadow duration-150 hover:shadow-sm"
        onClick={handleClick}
      >
        <div className="relative">
          <img
            src={imageURL || undefined}
            loading="lazy"
            alt=""
            height={139}
            className="h-[139px] w-full overflow-hidden bg-cover"
          />
          <div className="absolute top-2 left-2 rounded-xs bg-[#3d464d] px-2 py-1 text-xs font-medium text-white uppercase">
            {format}
          </div>
        </div>

        <div className="border-muted flex w-full flex-col items-center justify-center gap-1 rounded-md border-1 px-2 py-3">
          <div className="text-foreground flex w-full items-center justify-center gap-0 text-sm">
            <div className="max-w-[70%] truncate">{displayName}</div>.
            <div>{format}</div>
          </div>
          <p className="text-xs text-gray-500">
            {sizeFormat.value} {sizeFormat.type}
          </p>
        </div>
      </div>
      <SheetPreviewImage
        isOpen={isViewImage}
        handleOpenChange={handleOpenChange}
        file={data}
      />
    </>
  );
});

export const FileImageSkeleton = () => {
  return (
    <div className="animate-pulse cursor-pointer overflow-hidden rounded-xs">
      <div className="relative h-[139px] w-full rounded-xs bg-gray-200">
        <div className="absolute top-2 left-2 h-4 w-10 rounded-xs bg-gray-300" />
      </div>
      <div className="border-muted flex w-full flex-col items-center justify-center gap-1 rounded-md border-1 px-2 py-3">
        <div className="flex w-full items-center justify-center gap-1 text-sm">
          <div className="h-4 w-[70%] rounded-sm bg-gray-300" />
          <div className="h-4 w-4 rounded-sm bg-gray-300" />
        </div>
        <div className="h-3 w-12 rounded bg-gray-200" />
      </div>
    </div>
  );
};

type SheetPreviewImageProps = {
  isOpen: boolean;
  handleOpenChange: (value: boolean) => void;
  file: File;
};

function expectAssetsFolder(path: string): string[] {
  if (path === "") {
    return ["root"];
  }

  const routes = ["root"];
  path.split("/").forEach((item) => routes.push(item));
  return routes;
}

const SheetPreviewImage: FC<SheetPreviewImageProps> = ({
  isOpen,
  handleOpenChange,
  file,
}) => {
  const sizeFile = returnFileSize(file.bytes);
  const routesAssetsFolder = expectAssetsFolder(file.assetFolder);
  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="max-w-full overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Thông tin hình ảnh</SheetTitle>
          <SheetClose>
            <XIcon
              className="size-4 cursor-pointer"
              onClick={() => handleOpenChange(false)}
            />
          </SheetClose>
        </SheetHeader>

        <SheetPreviewImageBody>
          <SheetPreviewImageBodyItem>
            <SheetPreviewImageBodyItemTitle title="Hình ảnh" />
            <SheetPreviewImageBodyItemContent>
              <img
                className="border p-2"
                src={getCloudinaryImageUrl({
                  publicId: file.publicId,
                  options: {
                    width: 367,
                  },
                })}
                alt=""
                width={367}
              />
            </SheetPreviewImageBodyItemContent>
          </SheetPreviewImageBodyItem>

          <SheetPreviewImageBodyItem>
            <SheetPreviewImageBodyItemTitle title="Thông số hình ảnh" />
            <SheetPreviewImageBodyItemContent>
              <SheetPreviewImageSpecsList>
                <SheetPreviewImageSpecsItem title="Kích thước gốc">
                  <a
                    target="_blank"
                    href={file.secureUrl}
                    className="text-foreground text-sm underline"
                  >
                    {file.width} x {file.height}
                  </a>
                </SheetPreviewImageSpecsItem>
                <SheetPreviewImageSpecsItem title="Định dạng ảnh">
                  <p className="text-foreground text-sm uppercase">
                    {file.format}
                  </p>
                </SheetPreviewImageSpecsItem>
                <SheetPreviewImageSpecsItem title="Dung lượng">
                  <p className="text-foreground text-sm">
                    {sizeFile.value} {sizeFile.type}
                  </p>
                </SheetPreviewImageSpecsItem>
                <SheetPreviewImageSpecsItem title="Tên file">
                  <p className="text-foreground text-sm">{file.displayName}</p>
                </SheetPreviewImageSpecsItem>
                <SheetPreviewImageSpecsItem title="Đường dẫn thư mục">
                  <p className="text-foreground text-sm wrap-anywhere transition-colors duration-150">
                    {routesAssetsFolder.map((route, index) => (
                      <>
                        <Link
                          className="hover:text-primary hover:underline"
                          to={route}
                          key={`route-key-${index}`}
                        >
                          {route}
                        </Link>
                        {index !== routesAssetsFolder.length - 1 && (
                          <span> / </span>
                        )}
                      </>
                    ))}
                  </p>
                </SheetPreviewImageSpecsItem>

                <SheetPreviewImageSpecsItem title="Thời gian đăng tải">
                  <p className="text-foreground text-sm">
                    {formatTime({
                      options: {
                        dateStyle: "full",
                      },
                      value: file.createdAt,
                    })}
                  </p>
                </SheetPreviewImageSpecsItem>
              </SheetPreviewImageSpecsList>
            </SheetPreviewImageBodyItemContent>
          </SheetPreviewImageBodyItem>
        </SheetPreviewImageBody>

        <SheetFooter className="sticky bottom-0 bg-white">
          <div className="flex gap-2">
            <Button className="flex-2 rounded-xs">Tải xuống</Button>

            <Button className="flex-1 rounded-xs" variant={"outline"}>
              Xóa
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

type SheetPreviewImageBodyProps = {} & PropsWithChildren;

const SheetPreviewImageBody: FC<SheetPreviewImageBodyProps> = ({
  children,
}) => {
  return <div className="flex flex-col gap-5 px-4">{children}</div>;
};

type SheetPreviewImageBodyItemProps = {} & PropsWithChildren;

const SheetPreviewImageBodyItem: FC<SheetPreviewImageBodyItemProps> = ({
  children,
}) => {
  return <div className="flex flex-col gap-3">{children}</div>;
};

type SheetPreviewImageBodyItemTitleProps = ComponentProps<"div"> & {
  title: string;
};

const SheetPreviewImageBodyItemTitle: FC<
  SheetPreviewImageBodyItemTitleProps
> = ({ title, className, ...props }) => {
  return (
    <div
      {...props}
      className={cn("text-foreground text-sm font-bold", { className })}
    >
      {title}
    </div>
  );
};

type SheetPreviewImageBodyItemContentProps = ComponentProps<"div"> &
  PropsWithChildren;

const SheetPreviewImageBodyItemContent: FC<
  SheetPreviewImageBodyItemContentProps
> = ({ className, children, ...props }) => {
  return (
    <div className={cn({ className })} {...props}>
      {children}
    </div>
  );
};

type SheetPreviewImageSpecsListProps = PropsWithChildren;

const SheetPreviewImageSpecsList: FC<SheetPreviewImageSpecsListProps> = ({
  children,
}) => {
  return <ul className="flex w-full flex-col gap-2">{children}</ul>;
};

type SheetPreviewImageSpecsItemProps = PropsWithChildren & {
  title: string;
};

const SheetPreviewImageSpecsItem: FC<SheetPreviewImageSpecsItemProps> = ({
  title,
  children,
}) => {
  return (
    <li className="grid w-full grid-cols-2">
      <div className="text-foreground col-span-1 content-start text-sm font-medium">
        {title}:
      </div>

      {children}
    </li>
  );
};
