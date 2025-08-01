import type { File, SearchFile } from "@/types/file";
import type { ResponseSuccess } from "@/types/response";
import type {
  PaginationFileResources,
  PaginationFolderResources,
  PaginationSearchFileResources,
  PaginationSubFolderResources,
  ShrinkImageFromLink,
} from "../types";
import type {
  GetRootFileResourcesParams,
  GetRootFolderResourcesParams,
  GetSubFolderResourcesParams,
  IResourceManagerApi,
  SearchFileResourcesParams,
  ShrinkImageFromLinkParams,
} from "./interface";
import { axiosInstance } from "@/lib/axios";
import type { Folder, SubFolder } from "@/types/folder";

const CLOUDINARY_API_URL = "/cloudinary";
const TINY_PNG_API_URL = "/tinyPNG";

export class ResourceManagerApi implements IResourceManagerApi {
  constructor() {}

  public async getRootFileResources({
    nextCursor,
  }: GetRootFileResourcesParams): Promise<
    ResponseSuccess<File[], PaginationFileResources>
  > {
    const queryParams = [];
    if (nextCursor) {
      queryParams.push(`nextCursor=${nextCursor}`);
    }
    const response = await axiosInstance.get<
      File[],
      ResponseSuccess<File[], PaginationFileResources>
    >(`${CLOUDINARY_API_URL}/files?${queryParams.join("&")}`);

    return response;
  }

  public async getRootFolderResources({
    nextCursor,
  }: GetRootFolderResourcesParams): Promise<
    ResponseSuccess<Folder[], PaginationFolderResources>
  > {
    const queryParams = [];
    if (nextCursor) {
      queryParams.push(`nextCursor=${nextCursor}`);
    }
    const response = await axiosInstance.get<
      Folder,
      ResponseSuccess<Folder[], PaginationFolderResources>
    >(`${CLOUDINARY_API_URL}/folders/root?${queryParams.join("&")}`);

    return response;
  }

  public async searchFileResources({
    nextCursor,
    filename,
    folder,
    maxResult,
  }: SearchFileResourcesParams): Promise<
    ResponseSuccess<SearchFile[], PaginationSearchFileResources>
  > {
    const queryParams = [];
    if (nextCursor) {
      queryParams.push(`nextCursor=${nextCursor}`);
    }

    if (folder !== "root") {
      queryParams.push(`folder=${folder}`);
    }

    const response = await axiosInstance.get<
      SearchFile,
      ResponseSuccess<SearchFile[], PaginationSearchFileResources>
    >(
      `${CLOUDINARY_API_URL}/files/search?filename=${filename}&maxResult=${maxResult}&${queryParams.join("&")}`,
    );

    return response;
  }

  public async getSubFolderResources({
    folder,
  }: GetSubFolderResourcesParams): Promise<
    ResponseSuccess<SubFolder[], PaginationSubFolderResources>
  > {
    const query = folder !== "root" ? `?folder=${folder}` : "";
    const response = await axiosInstance.get<
      SubFolder,
      ResponseSuccess<SubFolder[], PaginationSubFolderResources>
    >(`${CLOUDINARY_API_URL}/folders/sub${query}`);
    return response;
  }

  public async shrinkImageFromLink({ url }: ShrinkImageFromLinkParams) {
    const response = await axiosInstance.post<
      ShrinkImageFromLink,
      ResponseSuccess<ShrinkImageFromLink>
    >(`${TINY_PNG_API_URL}/shrink/from-url`, { url });
    return response;
  }
}
