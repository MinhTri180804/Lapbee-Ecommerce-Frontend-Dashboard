import { LoadingCircleSpinner } from "@/components/loading/loadingCircleSpinner";
import { routeName } from "@/constants/routeName";
import MainLayout from "@/layouts/mainLayout";
import { useProfileStore } from "@/store/profile";
import { useEffect, type FC, type PropsWithChildren } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  type RouteObject,
} from "react-router";
import { managementRoutes } from "./management";
import { homeRoutes } from "./home";

type ProtectedRoutesProps = PropsWithChildren;

const { ROOT } = routeName.dashboard;
const HOME_ROOT = routeName.dashboard.children.home.ROOT;

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
    path: ROOT,
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),

    children: [
      {
        path: HOME_ROOT,
        element: <Outlet />,
        children: homeRoutes,
      },
      ...managementRoutes,
    ],
  },
];
