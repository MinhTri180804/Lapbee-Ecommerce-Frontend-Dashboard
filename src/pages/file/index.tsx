import { Button } from "@/components/ui/button";
import { FileImage } from "@/components/ui/fileImage";
import { Folder } from "@/components/ui/folder";
import { Input } from "@/components/ui/input";
import { Clock, Computer } from "lucide-react";
import type { FC } from "react";

const mockData = [
  {
    path: "avatar",
    name: "avatar",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },
  {
    path: "product",
    name: "product",
  },

  {
    path: "product",
    name: "product",
  },
];

export const FileManagerPage: FC = () => {
  return (
    <div className="grid h-full grid-cols-12 gap-4">
      <div className="col-span-2 flex h-full max-h-full flex-col gap-4 overflow-hidden rounded-xs border p-3">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Button className="w-full rounded-xs" size={"lg"}>
              Thêm tài liệu
            </Button>
            <Button
              className="w-full rounded-xs"
              size={"lg"}
              variant={"outline"}
            >
              Thêm thư mục
            </Button>
          </div>
        </div>

        <div className="flex flex-1 grow-1 flex-col gap-1 overflow-auto">
          <div className="flex cursor-pointer items-center justify-start gap-2 bg-gray-100 p-2 text-sm">
            <Computer size={16} />
            Kho lưu trữ
          </div>

          {Array.from({ length: 2 }).map(() => (
            <div className="flex cursor-pointer items-center justify-start gap-2 p-2 text-sm transition duration-150 hover:bg-gray-100">
              <Clock size={16} />
              Đã xem
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <p>
            Sử dụng <span className="text-foreground font-medium">254 GB</span>{" "}
            của 500 GB
          </p>

          <div className="relative h-2 w-full overflow-hidden rounded-sm bg-gray-300">
            <div className="bg-primary absolute top-0 bottom-0 left-0 w-[40%]"></div>
          </div>
        </div>
        <Button variant={"outline"} className="rounded-xs">
          Xem chi tiết
        </Button>
      </div>

      <div className="col-span-10 flex flex-col gap-6 overflow-auto px-4">
        <div className="flex flex-col gap-4">
          <div className="text-foreground text-base font-medium">Thư mục</div>

          <div className="grid grid-cols-6 gap-4">
            {mockData.map((folder) => (
              <Folder path={folder.path} name={folder.name} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-foreground text-base font-medium">Tài liệu</div>

          <Input
            placeholder="Nhập tên tài liệu bạn cần tìm..."
            className="rounded-xs"
          />

          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 20 }).map(() => (
              <FileImage />
            ))}
          </div>

          <Button size={"lg"} variant={"outline"} className="rounded-xs">
            Tải thêm
          </Button>
        </div>
      </div>
    </div>
  );
};
