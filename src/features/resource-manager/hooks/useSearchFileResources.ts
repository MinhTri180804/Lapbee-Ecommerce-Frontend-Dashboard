import { useQuery } from "@tanstack/react-query";
import { resourceManagerService } from "../services";

type UseSearchFileResourcesParams = {
  nextCursor: string | null;
  filename: string;
  folder?: string;
  maxResult: string;
};

export function getQueryKeys() {
  return ["searchFileResources"];
}

export function useSearchFileResources({
  nextCursor,
  filename,
  folder = "root",
  maxResult,
}: UseSearchFileResourcesParams) {
  return useQuery({
    queryKey: [getQueryKeys(), nextCursor, filename, folder, maxResult],
    queryFn: () =>
      resourceManagerService.searchFileResources({
        nextCursor,
        filename,
        folder,
        maxResult,
      }),
  });
}
