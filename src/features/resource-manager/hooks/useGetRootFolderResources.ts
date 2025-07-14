import { useQuery } from "@tanstack/react-query";
import { resourceManagerService } from "../services";

type UseGetRootFolderResourcesParams = {
  nextCursor: string | null;
};

export function getQueryKeys() {
  return ["getRootFolderResources"];
}

export function useGetRootFolderResources({
  nextCursor,
}: UseGetRootFolderResourcesParams) {
  return useQuery({
    queryKey: [getQueryKeys(), nextCursor],
    queryFn: () =>
      resourceManagerService.getRootFolderResources({ nextCursor }),
  });
}
