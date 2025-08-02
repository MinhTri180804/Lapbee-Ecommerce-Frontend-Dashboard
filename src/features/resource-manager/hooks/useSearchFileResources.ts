import { useQuery, type QueryKey } from "@tanstack/react-query";
import { resourceManagerService } from "../services";

type UseSearchFileResourcesParams = {
  nextCursor: string | null;
  filename: string;
  folder?: string;
  maxResult: string;
};

type GetSearchFileResourcesQueryKeysParams = UseSearchFileResourcesParams & {
  folder: string;
};

export function getSearchFileResourcesQueryKeys({
  nextCursor,
  filename,
  folder,
  maxResult,
}: GetSearchFileResourcesQueryKeysParams): QueryKey {
  return ["searchFileResources", nextCursor, filename, folder, maxResult];
}

export function useSearchFileResources({
  nextCursor,
  filename,
  folder = "root",
  maxResult,
}: UseSearchFileResourcesParams) {
  return useQuery({
    queryKey: getSearchFileResourcesQueryKeys({
      nextCursor,
      filename,
      folder,
      maxResult,
    }),

    queryFn: () =>
      resourceManagerService.searchFileResources({
        nextCursor,
        filename,
        folder,
        maxResult,
      }),
  });
}
