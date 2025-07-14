import { Cloudinary } from "@cloudinary/url-gen";
import { env } from "@/constants/env";
import { fill } from "@cloudinary/url-gen/actions/resize";

type GetCloudinaryImageUrlParams = {
  publicId: string;
  options?: {
    width?: number;
    height?: number;
    format?: string;
    quality?: string;
  };
};

const cld = new Cloudinary({ cloud: { cloudName: env.CLOUDINARY_NAME } });

export const getCloudinaryImageUrl = ({
  publicId,
  options,
}: GetCloudinaryImageUrlParams) => {
  const image = cld.image(publicId);
  if (options?.width && options.height) {
    image.resize(fill().width(options.width).height(options.height));
  }

  image.format(options?.format ? options.format : "auto");

  image.quality(options?.quality ? options.quality : "auto");

  return image.toURL();
};
