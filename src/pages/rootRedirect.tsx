import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import * as profileApi from "@/apis/profile/api";
import { useProfileStore } from "@/store/profile";
import { LoadingCircleSpinner } from "@/components/loading/loadingCircleSpinner";

//TODO: Implement animation redirect in here later
export const RootRedirect = () => {
  const navigate = useNavigate();
  const previousPath = useLocation().state?.previousPath;
  const updateProfile = useProfileStore.use.updateData();
  const isLogout = useProfileStore.use.isLoggout();
  const profile = useProfileStore.use.data();

  const DEFAULT_REDIRECT_SUCCESS = previousPath ? previousPath : "/dashboard";
  console.log(DEFAULT_REDIRECT_SUCCESS);

  useEffect(() => {
    const fetchProfile = async () => {
      await profileApi
        .getMe()
        .then((profileData) => {
          updateProfile(profileData);
          navigate(DEFAULT_REDIRECT_SUCCESS);
        })
        .catch(() => {
          //TODO: Implement handle get profile error
          navigate("/auth/login");
        });
    };

    if (!isLogout && !profile) {
      fetchProfile();
    }
    return;
  }, [navigate, updateProfile, DEFAULT_REDIRECT_SUCCESS, isLogout, profile]);

  if (isLogout) {
    return <Navigate to="/auth/login" />;
  }

  if (profile) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return (
    <div>
      <LoadingCircleSpinner />
    </div>
  );
};
