import type { ResourceManagerApi } from "../api";

type GetRootFileResourcesParams = {
  nextCursor: string | null;
};

type GetRootFolderResourcesParams = {
  nextCursor: string | null;
};

type SearchFileResourcesParams = {
  nextCursor: string | null;
  folder?: string;
  filename: string;
  maxResult: string;
};

type GetSubFolderResourcesParams = {
  folder: string;
  signal: AbortSignal;
};

type ShrinkImageFromLinkParams = {
  url: string;
};

type UploadImageResourcesFromLinkParams = {
  link: string;
  folderPath: string;
  filename: string;
};

export class ResourceManagerService {
  private _api: ResourceManagerApi;

  constructor(api: ResourceManagerApi) {
    this._api = api;
  }

  public getRootFileResources({ nextCursor }: GetRootFileResourcesParams) {
    return this._api.getRootFileResources({ nextCursor });
  }

  public getRootFolderResources({ nextCursor }: GetRootFolderResourcesParams) {
    return this._api.getRootFolderResources({ nextCursor });
  }

  public searchFileResources({
    nextCursor,
    folder = "root",
    filename,
    maxResult,
  }: SearchFileResourcesParams) {
    return this._api.searchFileResources({
      nextCursor,
      folder,
      filename,
      maxResult,
    });
  }

  public getSubFolderResources({
    folder,
    signal,
  }: GetSubFolderResourcesParams) {
    return this._api.getSubFolderResources({ folder, signal });
  }

  public shrinkImageFromLink({ url }: ShrinkImageFromLinkParams) {
    return this._api.shrinkImageFromLink({ url });
  }
  // public uploadImageResourcesFromLink({}: ) {

  // }
}
