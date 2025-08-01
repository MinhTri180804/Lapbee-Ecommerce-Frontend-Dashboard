import { useQuery } from "@tanstack/react-query";
import { resourceManagerService } from "../services";

export const getQueryKeys = (url: string) => {
  return ["shrinkImageFromLink", url];
};

export const useShrinkImageFromLink = (url: string) => {
  return useQuery({
    queryKey: getQueryKeys(url),
    queryFn: () => resourceManagerService.shrinkImageFromLink({ url }),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
