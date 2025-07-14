import { useQuery } from "@tanstack/react-query";
import { resourceManagerService } from "../services";

type UseGetRootFileResourceParams = {
  nextCursor: string | null;
};

export function getQueryKeys() {
  return ["getRootFileResources"];
}

export function useGetRootFileResources({
  nextCursor,
}: UseGetRootFileResourceParams) {
  return useQuery({
    queryKey: [getQueryKeys(), nextCursor],
    queryFn: () => resourceManagerService.getRootFileResources({ nextCursor }),
  });
}
