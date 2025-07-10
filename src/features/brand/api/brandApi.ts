import { axiosInstance } from "@/lib/axios";
import type { ResponseError, ResponseSuccess } from "@/types/response";
import { AxiosError } from "axios";
import type { GetAllParams, IBrandApi } from "./interface";
import type { Pagination } from "@/types/commons";
import type { Brand } from "@/types/brand";

export class BrandApi implements IBrandApi {
  private _urlApi = "/brands";

  constructor() {}

  public async getAll({ pageIndex, pageSize, searchValue }: GetAllParams) {
    try {
      const response = await axiosInstance.get<
        Brand,
        ResponseSuccess<Brand[], Pagination>
      >(
        `${this._urlApi}?page=${pageIndex}&limit=${pageSize}&search=${searchValue}`,
      );

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw (error as AxiosError<ResponseError>).response!.data;
      }

      throw error;
    }
  }
}
