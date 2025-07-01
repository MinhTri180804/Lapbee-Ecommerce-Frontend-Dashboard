import { AuthFormContainer, LoginForm } from "@/features/auth";
import lapbeeLogo from "@/assets/lapbee-logo.svg";
import type { FC } from "react";

export const LoginPage: FC = () => {
  return (
    <AuthFormContainer>
      <div>
        <div className="flex w-full justify-center">
          <img src={lapbeeLogo} width={78} height={72} alt="logo" />
        </div>
      </div>
      <h1 className="text-center text-2xl font-bold">Trang quản trị viên</h1>
      <p className="text-center text-[gray]">
        Đăng nhập với tư cách là quản trị viên
      </p>
      <LoginForm />
    </AuthFormContainer>
  );
};
