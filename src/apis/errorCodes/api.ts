import { axiosInstance } from "@/lib/axios";
import type { ErrorCodes } from "@/types/errorCodes";

export const getErrorCodes = async (): Promise<ErrorCodes> => {
  const response = await axiosInstance.get("/system/error-codes");
  return response.data;
};
