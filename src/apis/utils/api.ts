import { axiosInstance } from "@/lib/axios";
import { returnFileSize } from "@/utils/returnFileSize";
import type { FileSize } from "@/types/fileSize";
import type { ResponseSuccess } from "@/types/response";

type GetSizeImageFromUrlParams = {
  url: string;
};

type GetSizeImageFromURLReturn = {
  isUnknown: boolean;
  originalSize: number | null;
  sizeFormat: FileSize | null;
};

interface IUtilsApi {
  getSizeImageFromUrl(
    params: GetSizeImageFromUrlParams,
  ): Promise<GetSizeImageFromURLReturn>;
}

export class UtilsApi implements IUtilsApi {
  private readonly _urlApi = "/utils";
  constructor() {}

  public async getSizeImageFromUrl({
    url,
  }: GetSizeImageFromUrlParams): Promise<GetSizeImageFromURLReturn> {
    const response = await axiosInstance.get<
      { size: number },
      ResponseSuccess<{ size: number }>
    >(`${this._urlApi}/image-size-from-url`, {
      params: {
        url,
      },
    });

    if (response.data.size === 0)
      return {
        isUnknown: true,
        originalSize: null,
        sizeFormat: null,
      };

    return {
      isUnknown: false,
      originalSize: response.data.size,
      sizeFormat: returnFileSize(response.data.size),
    };
  }
}
