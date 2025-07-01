type BaseResponse = {
  success: boolean;
  statusCode: number;
  message: string;
};

type DefaultGenericTypeResponse = null;

export type ResponseSuccess<T = DefaultGenericTypeResponse> = BaseResponse & {
  data: T;
};

export type ResponseError<T = DefaultGenericTypeResponse> = BaseResponse & {
  error: {
    code: number;
    name: string;
    details: T;
  };
};
