import {
  useQuery,
  type UseQueryResult,
  type QueryKey,
} from "@tanstack/react-query";
import { resourceManagerService } from "../services";

type UseGetRootFileResourceParams = {
  nextCursor: string | null;
};

export function getRootFileResourcesQueryKeys({
  nextCursor,
}: UseGetRootFileResourceParams): QueryKey {
  return ["getRootFileResources", nextCursor];
}

export function useGetRootFileResources({
  nextCursor,
}: UseGetRootFileResourceParams): UseQueryResult {
  return useQuery({
    queryKey: getRootFileResourcesQueryKeys({ nextCursor }),
    queryFn: () => resourceManagerService.getRootFileResources({ nextCursor }),
  });
}
