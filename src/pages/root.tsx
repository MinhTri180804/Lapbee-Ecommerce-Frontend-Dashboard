import { Navigate, useLocation } from "react-router";

export const RootPage = () => {
  const location = useLocation();

  return (
    <>
      <Navigate
        to={{
          pathname: "/redirect",
        }}
        state={{ location: location }}
      />
    </>
  );
};
