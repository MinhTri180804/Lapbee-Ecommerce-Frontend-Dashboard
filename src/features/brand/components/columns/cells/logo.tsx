import { cn } from "@/lib/utils";
import { getCloudinaryImageUrl } from "@/utils/getCloudinaryImageUrl";
import type { FC } from "react";

type CellLogoProps = {
  publicId: string;
};

const WIDTH: number = 42;
const HEIGHT: number = 42;

export const CellLogo: FC<CellLogoProps> = ({ publicId }) => {
  const urlImage = getCloudinaryImageUrl({
    publicId,
    options: {
      width: WIDTH,
      height: HEIGHT,
    },
  });

  const classnamesWrapper = cn(`w-[${WIDTH}px] h-[${HEIGHT}px] bg-cover`);
  return (
    <div className={classnamesWrapper}>
      <img src={urlImage} width={WIDTH} height={HEIGHT} alt="logo" />
    </div>
  );
};

export const HeaderCellLogo: FC = () => {
  return <div>Logo</div>;
};
