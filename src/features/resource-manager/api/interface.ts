import type { File, SearchFile } from "@/types/file";
import type { ResponseSuccess } from "@/types/response";
import type { Folder, SubFolder } from "@/types/folder";
import type {
  PaginationFileResources,
  PaginationFolderResources,
  PaginationSearchFileResources,
  PaginationSubFolderResources,
} from "../types";

export type GetRootFileResourcesParams = {
  nextCursor: string | null;
};

export type GetRootFolderResourcesParams = {
  nextCursor: string | null;
};

export type SearchFileResourcesParams = {
  nextCursor: string | null;
  filename: string;
  maxResult: string;
  folder: string | "root";
};

export type GetSubFolderResourcesParams = {
  folder: string;
};

export interface IResourceManagerApi {
  getRootFileResources: (
    params: GetRootFileResourcesParams,
  ) => Promise<ResponseSuccess<File[], PaginationFileResources>>;

  getRootFolderResources: (
    params: GetRootFolderResourcesParams,
  ) => Promise<ResponseSuccess<Folder[], PaginationFolderResources>>;

  searchFileResources: (
    params: SearchFileResourcesParams,
  ) => Promise<ResponseSuccess<SearchFile[], PaginationSearchFileResources>>;

  getSubFolderResources: (
    params: GetSubFolderResourcesParams,
  ) => Promise<ResponseSuccess<SubFolder[], PaginationSubFolderResources>>;
}
