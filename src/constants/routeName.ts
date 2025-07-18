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
          resources: {
            ROOT: "tai-nguyen",
            children: {
              file: {
                ROOT: "tep-tin",
                UPLOAD: "them-moi",
                EDIT: "chinh-sua",
              },
              folder: {
                ROOT: "thu-muc",
                CREATE: "them-moi",
                EDIT: "chinh-sua",
              },
            },
          },
        },
      },
      statistic: {
        ROOT: "thong-ke",
      },
    },
  },
};
