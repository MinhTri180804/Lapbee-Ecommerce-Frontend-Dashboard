import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email không được bỏ trống" })
    .email("Địa chỉ email không hợp lệ"),
  password: z
    .string({ required_error: "Mật khẩu không được bỏ trống" })
    .min(6, "Mật khẩu ít nhất 6 kí tự")
    .max(18, "Mật khẩu tối đa 18 kí tự")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Mật khẩu phải ít nhất 1 kí thường, 1 kí tự hoa và 1 số",
    ),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
