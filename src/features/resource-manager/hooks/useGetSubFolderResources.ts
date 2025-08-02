import { useQuery } from "@tanstack/react-query";
import { resourceManagerService } from "../services";

type UseGetSubFolderResourcesParams = {
  folder: string;
};

type GetSubFolderResourcesQueryKeysParams = UseGetSubFolderResourcesParams;

export function getSubFolderResourcesQueryKeys({
  folder,
}: GetSubFolderResourcesQueryKeysParams) {
  return ["getSubFolderResources", folder];
}

export function useGetSubFolderResources({
  folder,
}: UseGetSubFolderResourcesParams) {
  return useQuery({
    queryKey: getSubFolderResourcesQueryKeys({ folder }),
    queryFn: ({ signal }) =>
      resourceManagerService.getSubFolderResources({ folder, signal }),
  });
}
