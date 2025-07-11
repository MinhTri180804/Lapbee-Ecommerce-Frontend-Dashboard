import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import * as profileApi from "@/apis/profile/api";
import { useProfileStore } from "@/store/profile";
import { LoadingCircleSpinner } from "@/components/loading/loadingCircleSpinner";
import { routeName } from "@/constants/routeName";

const { dashboard, auth } = routeName;

//TODO: Implement animation redirect in here later
export const RootRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.previousPath;
  const updateProfile = useProfileStore.use.updateData();
  const isLogout = useProfileStore.use.isLogout();
  const profile = useProfileStore.use.data();

  const DEFAULT_REDIRECT_SUCCESS = previousPath
    ? previousPath
    : `/${dashboard.children.home.ROOT}`;

  useEffect(() => {
    const fetchProfile = async () => {
      await profileApi
        .getMe()
        .then((profileData) => {
          updateProfile(profileData);
          navigate(
            {
              pathname: DEFAULT_REDIRECT_SUCCESS,
              search: location.state?.searchPreviousPath || "",
            },
            {
              replace: true,
            },
          );
        })
        .catch(() => {
          //TODO: Implement handle get profile error
          navigate(
            {
              pathname: `/${auth.ROOT}/${auth.children.LOGIN}`,
            },
            {
              replace: true,
            },
          );
        });
    };

    if (!isLogout && !profile) {
      fetchProfile();
    }
    return;
  }, [
    navigate,
    updateProfile,
    DEFAULT_REDIRECT_SUCCESS,
    isLogout,
    profile,
    location,
  ]);

  if (isLogout) {
    return <Navigate to={`/${auth.ROOT}/${auth.children.LOGIN}`} replace />;
  }

  if (profile) {
    return (
      <Navigate
        to={{
          pathname: DEFAULT_REDIRECT_SUCCESS,
          search: location.state?.searchPreviousPath || "",
        }}
        replace
      />
    );
  }

  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <LoadingCircleSpinner width={120} height={120} />
    </div>
  );
};
