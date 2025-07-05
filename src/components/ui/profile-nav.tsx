import type { FC } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useProfileStore } from "@/store/profile";
import type { Profile } from "@/types/profile";
import { getCloudinaryImageUrl } from "@/utils/getCloudinaryImageUrl";

export const ProfileNav: FC = () => {
  const profile = useProfileStore.use.data() as Profile;

  const avatarImage = profile.avatar?.publicId
    ? getCloudinaryImageUrl({
        publicId: profile.avatar.publicId,
        options: {
          width: 38,
          height: 38,
        },
      })
    : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2">
          <Avatar className="h-[38px] w-[38px]">
            <AvatarImage src={avatarImage} width={38} height={38} />
            <AvatarFallback>NMT</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-foreground text-sm">
              {profile.firstName} {profile.lastName}
            </div>
            <div className="text-ring text-xs">Quản trị viên</div>
          </div>
        </div>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
