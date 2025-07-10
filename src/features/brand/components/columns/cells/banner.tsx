import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Brand } from "@/types/brand";
import { getCloudinaryImageUrl } from "@/utils/getCloudinaryImageUrl";
import { DialogTrigger } from "@radix-ui/react-dialog";
import type { FC } from "react";

type CellBannerProps = {
  banners: Brand["banners"];
};

const WIDTH: number = 62;
const HEIGHT: number = 42;

const classnamesWrapper = cn(
  `w-[${WIDTH}px] h-[${HEIGHT}px] rounded-sm bg-cover relative`,
);

// const classnamesRestBanners = cn(
//   "absolute top-0 bottom-0  left-0  rounded-sm",
//   `w-[${WIDTH}px] h-[${HEIGHT}px] bg-primary/80 flex justify-center items-center text-sm`,
// );

export const CellBanner: FC<CellBannerProps> = ({ banners }) => {
  const conditionLengthBanners = banners.length > 0;
  const mainBanner = conditionLengthBanners
    ? banners.find((banner) => banner.isMain)
    : banners[0];

  if (banners.length === 0) {
    return <div>Chưa cập nhật</div>;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className={classnamesWrapper}>
          <img
            className="rounded-sm"
            width={WIDTH}
            height={HEIGHT}
            src={getCloudinaryImageUrl({
              publicId: mainBanner?.publicId || banners[0].publicId,
              options: {
                width: WIDTH,
                height: HEIGHT,
              },
            })}
            alt="banner-brand"
          />
        </div>
      </DialogTrigger>
    </Dialog>
  );
};

export const HeaderCellBanner: FC = () => {
  return <div>Ảnh bìa</div>;
};
