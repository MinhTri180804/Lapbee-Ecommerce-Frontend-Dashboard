export const routeName = {
  auth: {
    ROOT: "xac-thuc",
    children: {
      LOGIN: "dang-nhap",
      FORGOT_PASSWORD: "quen-mat-khau",
    },
  },
  dashboard: {
    ROOT: "trang-chu",
    children: {
      BRAND: {
        ROOT: "thuong-hieu",
        CREATE: "them-moi",
      },
    },
  },
};
