import { LoadingCircleSpinner } from "@/components/loading/loadingCircleSpinner";
import MainLayout from "@/layouts/mainLayout";
import { useProfileStore } from "@/store/profile";
import { useEffect, type FC, type PropsWithChildren } from "react";
import { useLocation, useNavigate, type RouteObject } from "react-router";

type ProtectedRoutesProps = PropsWithChildren;

// eslint-disable-next-line
const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children }) => {
  const profile = useProfileStore.use.data();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!profile) {
      navigate("/", {
        replace: true,
        state: { previousPath: location.pathname },
      });
    }
  }, [navigate, profile, location]);

  return profile !== null ? children : <LoadingCircleSpinner />;
};

export const protectedRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),

    children: [
      {
        path: "testing",
        element: <div>xin chao dang la testing</div>,
      },
    ],
  },
];
