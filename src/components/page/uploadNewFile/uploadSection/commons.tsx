import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Download, MoreHorizontal, Trash } from "lucide-react";
import type { ComponentProps, FC, PropsWithChildren } from "react";

type ImageUploadedProps = ComponentProps<"li">;

export const ImageUploaded: FC<ImageUploadedProps> = ({
  className,
  ...props
}) => {
  return (
    <li
      className={cn(
        "flex w-full cursor-pointer items-center justify-between rounded-sm border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-start gap-3">
        <img
          src="https://media.istockphoto.com/id/1371663120/photo/car-driver-rear-view-mirror-sunrise-reflection.jpg?s=612x612&w=0&k=20&c=3KteH0hoXs8u9h8LDhwqqJvKSjjTkmuY7pYrtynCibc="
          alt=""
          width={48}
          height={48}
          className="aspect-square rounded-sm object-contain"
        />
        <div className="flex flex-col items-start gap-1">
          <p className="text-sm font-medium">filename.jpg</p>
          <p className="text-xs font-normal text-zinc-500">12MB</p>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"outline"} size={"icon"} className="size-8">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download />
              Tải về
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <Trash />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
};

interface ImageUploadedListProps
  extends ComponentProps<"ul">,
    PropsWithChildren {}

export const ImageUploadedList: FC<ImageUploadedListProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <ul className={cn("grid w-full grid-cols-12 gap-3", className)} {...props}>
      {children}
    </ul>
  );
};
