import type { FC } from "react";
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import type { Pagination as PaginationType } from "@/types/commons";
import { SkeletonPaginationLimit, SkeletonPaginationLoading } from "./skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PaginationProps = {
  data: PaginationType | undefined;
  isLoading: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handleSelectPage: (pageSelected: number) => void;
  handleSelectLimit: (limitValue: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  data,
  isLoading,
  handleNextPage,
  handlePreviousPage,
  handleSelectPage,
  handleSelectLimit,
}) => {
  return (
    <div className="flex items-center justify-end gap-8">
      <div className="flex items-center gap-4">
        <p className="text-foreground text-sm">Số lượng trên mỗi trang</p>

        {isLoading ? (
          <SkeletonPaginationLimit />
        ) : (
          <Select
            value={String(data!.limit)}
            onValueChange={(value) => handleSelectLimit(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder={String(data!.limit)} />
            </SelectTrigger>

            <SelectContent>
              {[10, 20, 30, 40, 50].map((item) => (
                <SelectItem key={item} value={String(item)}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <PaginationUI className="mx-0 w-fit">
        <PaginationContent>
          {isLoading ? (
            <SkeletonPaginationLoading />
          ) : (
            <>
              <PaginationItem>
                <PaginationPrevious
                  disabled={!data!.previousPage}
                  className="cursor-pointer disabled:cursor-not-allowed"
                  onClick={handlePreviousPage}
                />
              </PaginationItem>

              {Array.from({ length: data!.totalPage }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handleSelectPage(index + 1)}
                    isActive={data!.currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  disabled={!data!.nextPage}
                  onClick={handleNextPage}
                  className="cursor-pointer disabled:cursor-not-allowed"
                ></PaginationNext>
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </PaginationUI>
    </div>
  );
};
