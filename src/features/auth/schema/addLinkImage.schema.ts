import { z } from "zod";

export const addLinkImageSchema = z.object({
  url: z
    .string({ required_error: "Địa chỉ URL không được bỏ trống" })
    .url("Địa chỉ URL không hợp lệ"),
});

export type AddLinkImageSchemaType = z.infer<typeof addLinkImageSchema>;
