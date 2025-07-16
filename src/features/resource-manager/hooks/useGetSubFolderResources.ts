import { useQuery } from "@tanstack/react-query";
import { resourceManagerService } from "../services";

type UseGetSubFolderResourcesParams = {
  folder: string;
};

export function getQueryKeys() {
  return ["getSubFolderResources"];
}

export function useGetSubFolderResources({
  folder,
}: UseGetSubFolderResourcesParams) {
  return useQuery({
    queryKey: [getQueryKeys(), folder],
    queryFn: () => resourceManagerService.getSubFolderResources({ folder }),
  });
}
