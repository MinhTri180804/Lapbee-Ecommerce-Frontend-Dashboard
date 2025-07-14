import { PaginationItem } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { FC } from "react";

type ListSkeletonPaginationLinkProps = {
  length: number;
};

export const SkeletonPaginationLoading = () => {
  return (
    <>
      <SkeletonPaginationPrevious />
      <ListSkeletonPaginationLink length={3} />
      <SkeletonPaginationPrevious />
    </>
  );
};

export const SkeletonPaginationPrevious = () => {
  return (
    <PaginationItem>
      <Skeleton className="h-8 w-8 rounded-md" />
    </PaginationItem>
  );
};

export const SkeletonPaginationLink = () => {
  return (
    <PaginationItem>
      <Skeleton className="h-8 w-8 rounded-md" />
    </PaginationItem>
  );
};

export const ListSkeletonPaginationLink: FC<
  ListSkeletonPaginationLinkProps
> = ({ length }) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <SkeletonPaginationLink key={`skeleton-${index}`} />
      ))}
    </>
  );
};

export const SkeletonPaginationNext = () => {
  return (
    <PaginationItem>
      <Skeleton className="h-8 w-8 rounded-md" />
    </PaginationItem>
  );
};

export const SkeletonPaginationLimit = () => {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};
