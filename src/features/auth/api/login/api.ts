import { axiosInstance } from "@/lib/axios";
import type { LoginSchemaType } from "../../schema";
import { type ResponseError } from "@/types/response";
import { AxiosError } from "axios";

type LoginParams = {
  data: LoginSchemaType;
};

export const login = async ({ data }: LoginParams) => {
  try {
    await axiosInstance.post("/auth/local/login", data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      throw (error as AxiosError<ResponseError>).response!
        .data as ResponseError;
    }
  }
};
