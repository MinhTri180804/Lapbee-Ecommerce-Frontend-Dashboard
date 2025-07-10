import type { ResponseSuccess } from "@/types/response";
import type { Brand } from "../types";
import type { Pagination } from "@/types/commons";

export type GetAllParams = {
  pageIndex: number;
  pageSize: number;
  searchValue: string;
};

export interface IBrandApi {
  getAll({
    pageIndex,
    pageSize,
    searchValue,
  }: GetAllParams): Promise<ResponseSuccess<Brand[], Pagination>>;
}
