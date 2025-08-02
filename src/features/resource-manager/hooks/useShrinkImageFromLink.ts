import { useQuery } from "@tanstack/react-query";
import { resourceManagerService } from "../services";

type UseShrinkImageFromLinkParams = {
  url: string;
};

type GetShrinkImageFromLinkQueryKeysParams = UseShrinkImageFromLinkParams;

export function getShrinkImageFromLinkQueryKeys({
  url,
}: GetShrinkImageFromLinkQueryKeysParams) {
  return ["shrinkImageFromLink", url];
}

export const useShrinkImageFromLink = ({
  url,
}: UseShrinkImageFromLinkParams) => {
  return useQuery({
    queryKey: getShrinkImageFromLinkQueryKeys({ url }),
    queryFn: () => resourceManagerService.shrinkImageFromLink({ url }),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
