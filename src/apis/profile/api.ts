import { axiosInstance } from "@/lib/axios";
import type { Profile } from "@/types/profile";
import type { ResponseError, ResponseSuccess } from "@/types/response";
import { AxiosError } from "axios";

export const getMe = async () => {
  try {
    const response = await axiosInstance.get<unknown, ResponseSuccess<Profile>>(
      "/profile",
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw (error as AxiosError<ResponseError>).response!.data;
    }
    throw error;
  }
};
