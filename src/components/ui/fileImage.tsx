import type { FC } from "react";

// eslint-disable-next-line
type FileImageProps = {};

export const FileImage: FC<FileImageProps> = () => {
  return (
    <div className="cursor-pointer overflow-hidden rounded-xs transition-shadow duration-150 hover:shadow-sm">
      <div className="relative">
        <img
          src="	https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/files/file-1-320x180.jpg"
          alt=""
        />
        <div className="absolute top-2 left-2 rounded-xs bg-[#3d464d] px-2 py-1 text-xs font-medium text-white uppercase">
          JPG
        </div>
      </div>

      <div className="border-muted flex w-full flex-col items-center justify-center gap-1 rounded-md border-1 px-2 py-3">
        <p className="text-foreground text-sm">mountain-elbrus.jpg</p>
        <p className="text-xs text-gray-500">579.07 KB</p>
      </div>
    </div>
  );
};
