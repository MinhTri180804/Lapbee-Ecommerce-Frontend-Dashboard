import {
  useQuery,
  type QueryKey,
  type UseQueryResult,
} from "@tanstack/react-query";
import { resourceManagerService } from "../services";

type UseGetRootFolderResourcesParams = {
  nextCursor: string | null;
};

export function getRootFolderResourcesQueryKeys({
  nextCursor,
}: UseGetRootFolderResourcesParams): QueryKey {
  return ["getRootFolderResources", nextCursor];
}

export function useGetRootFolderResources({
  nextCursor,
}: UseGetRootFolderResourcesParams): UseQueryResult {
  return useQuery({
    queryKey: getRootFolderResourcesQueryKeys({ nextCursor }),
    queryFn: () =>
      resourceManagerService.getRootFolderResources({ nextCursor }),
  });
}
