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
  const previousPath = useLocation().state?.previousPath;
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
          navigate(DEFAULT_REDIRECT_SUCCESS, {
            replace: true,
          });
        })
        .catch(() => {
          //TODO: Implement handle get profile error
          navigate(`/${auth.ROOT}/${auth.children.LOGIN}`);
        });
    };

    if (!isLogout && !profile) {
      fetchProfile();
    }
    return;
  }, [navigate, updateProfile, DEFAULT_REDIRECT_SUCCESS, isLogout, profile]);

  if (isLogout) {
    return <Navigate to={`/${auth.ROOT}/${auth.children.LOGIN}`} replace />;
  }

  if (profile) {
    return <Navigate to={DEFAULT_REDIRECT_SUCCESS} replace />;
  }

  return (
    <div>
      <LoadingCircleSpinner />
    </div>
  );
};
