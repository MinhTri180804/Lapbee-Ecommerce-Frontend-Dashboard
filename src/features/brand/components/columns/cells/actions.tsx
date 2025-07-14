import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontalIcon } from "lucide-react";
import type { FC } from "react";

type CellActionsProps = {
  brandId: string;
};

const classnamesIconActions = cn(
  " cursor-pointer text-gray-500 transition-colors duration-150 w-5 h-5",
);

export const CellActions: FC<CellActionsProps> = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontalIcon className={classnamesIconActions} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
          <DropdownMenuItem>Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const HeaderCellActions: FC = () => {
  return <div className="text-center">Hành động</div>;
};
