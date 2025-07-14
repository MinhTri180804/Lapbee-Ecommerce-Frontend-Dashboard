import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useProfileStore } from "@/store/profile";
import type { Profile } from "@/types/profile";
import { getCloudinaryImageUrl } from "@/utils/getCloudinaryImageUrl";
import * as authApi from "@/apis/auth/api";

export const ProfileNav: FC = () => {
  const profile = useProfileStore.use.data() as Profile;
  const logoutProfile = useProfileStore.use.logout();

  const avatarImage = profile.avatar?.publicId
    ? getCloudinaryImageUrl({
        publicId: profile.avatar.publicId,
        options: {
          width: 36,
          height: 36,
        },
      })
    : "";

  const handleLogout = async () => {
    await authApi.logout();
    logoutProfile();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="flex items-center gap-2">
          <Avatar className="h-[36px] w-[36px]">
            <AvatarImage src={avatarImage} width={36} height={36} />
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
      <DropdownMenuContent
        align="start"
        style={{ width: "var(--radix-popper-anchor-width)" }}
      >
        <DropdownMenuItem>Cài đăt</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
