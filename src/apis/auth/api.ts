import { axiosInstance } from "@/lib/axios";
import type { ResponseError } from "@/types/response";
import { AxiosError } from "axios";

const API_URL = "/auth/local";

export const logout = async () => {
  try {
    await axiosInstance.post(`${API_URL}/logout`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw (error as AxiosError<ResponseError>).response!.data;
    }
    throw error;
  }
};
