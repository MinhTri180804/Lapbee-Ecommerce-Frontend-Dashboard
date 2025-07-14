import type { File, SearchFile } from "@/types/file";
import type { ResponseSuccess } from "@/types/response";
import type {
  PaginationFileResources,
  PaginationFolderResources,
  PaginationSearchFileResources,
} from "../types";
import type {
  GetRootFileResourcesParams,
  GetRootFolderResourcesParams,
  IResourceManagerApi,
  SearchFileResourcesParams,
} from "./interface";
import { axiosInstance } from "@/lib/axios";
import type { Folder } from "@/types/folder";

const API_URL = "/cloudinary";

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
    >(`${API_URL}/files?${queryParams.join("&")}`);

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
    >(`${API_URL}/folders/root?${queryParams.join("&")}`);

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
      `${API_URL}/files/search?filename=${filename}&maxResult=${maxResult}&${queryParams.join("&")}`,
    );

    return response;
  }
}
