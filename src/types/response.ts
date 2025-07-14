type BaseResponse = {
  success: boolean;
  statusCode: number;
  message: string;
};

type DefaultGenericTypeResponse = null;
type DefaultGenericTypeMetadataResponse = null;

export type ResponseSuccess<
  T = DefaultGenericTypeResponse,
  D = DefaultGenericTypeMetadataResponse,
> = BaseResponse & {
  data: T;
  metadata: D;
};

export type ResponseError<T = DefaultGenericTypeResponse> = BaseResponse & {
  error: {
    code: number;
    name: string;
    details: T;
  };
};
