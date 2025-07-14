import { useQuery } from "@tanstack/react-query";
import { brandService } from "../services";

type UseGetAllBrandParams = {
  pageIndex: number;
  pageSize: number;
  searchValue: string;
};

export function getQueryKey() {
  return ["me"];
}

export function useGetAllBrand({
  pageIndex,
  pageSize,
  searchValue,
}: UseGetAllBrandParams) {
  return useQuery({
    queryKey: [getQueryKey(), pageIndex, pageSize, `search-${searchValue}`],
    queryFn: () => brandService.getAll({ pageIndex, pageSize, searchValue }),
  });
}
