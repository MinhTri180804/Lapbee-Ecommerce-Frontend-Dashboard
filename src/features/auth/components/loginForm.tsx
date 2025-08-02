import { useState, type FC } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchemaType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { EmailField } from "./email.input";
import { PasswordField } from "./password.input";
import * as loginApi from "../api/login/api";
import type { ResponseError } from "@/types/response";
import { AnimatePresence, motion } from "framer-motion";
import { useProfileStore } from "@/store/profile";
import { toast } from "sonner";

export const LoginForm: FC = () => {
  const [globalFormError, setGlobalFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = useProfileStore.use.login();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // TODO: Implement use mutation for auth login api

  const onSubmit = (values: LoginSchemaType) => {
    setGlobalFormError(null);
    const toastLoading = toast.loading("Đang thực hiện đăng nhập");
    loginApi
      .login({
        data: values,
      })
      .then(async () => {
        login();
        toast.success("Đăng nhập thành công", {
          description: "Bạn đã đăng nhập thành công",
        });
        navigate("/");
      })
      .catch((error: ResponseError) => {
        if (error.error.code === 4010) {
          toast.error("Đăng nhập thất bại", {
            description: "Email hoặc mật khẩu không chính xác",
          });
          setGlobalFormError("Email hoặc mật khẩu không chính xác");
          form.setError("email", {
            type: "value",
            message: "",
          });
          form.setError("password", {
            type: "value",
            message: "",
          });
        }
      })
      .finally(() => {
        toast.dismiss(toastLoading);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <EmailField form={form} />
        <PasswordField form={form} />
        <AnimatePresence mode="wait" initial={false}>
          {globalFormError && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-destructive mt-1 text-sm font-medium"
            >
              {globalFormError}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-row-reverse text-sm underline">
          <Link
            to={`/auth/forgot-password`}
            className="hover:text-primary transition duration-300"
          >
            Quên mật khẩu ?
          </Link>
        </div>
        <Button type="submit" className="w-full" size={"lg"}>
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
};
