import { BrandApi } from "../api";

type GetAllParams = {
  pageIndex: number;
  pageSize: number;
  searchValue: string;
};

export class BrandService {
  private _api: BrandApi;
  constructor(api: BrandApi) {
    this._api = api;
  }

  getAll({ pageIndex, pageSize, searchValue }: GetAllParams) {
    return this._api.getAll({ pageIndex, pageSize, searchValue });
  }
}
