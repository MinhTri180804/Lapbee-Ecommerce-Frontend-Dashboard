export const routeName = {
  auth: {
    ROOT: "xac-thuc",
    children: {
      LOGIN: "dang-nhap",
      FORGOT_PASSWORD: "quen-mat-khau",
    },
  },
  dashboard: {
    ROOT: "/",
    children: {
      home: {
        ROOT: "trang-chu",
      },
      management: {
        ROOT: "quan-li",
        children: {
          brand: {
            ROOT: "thuong-hieu",
            CREATE: "them-moi",
          },
        },
      },
      statistic: {
        ROOT: "thong-ke",
      },
    },
  },
};
