import React, { useEffect } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthDispatch } from "../contexts/AuthContext";

export type ProtectedRouteProps = {
  isAuth: boolean;
} & RouteProps;

export default function ProtectedRoute({
  isAuth,
  ...routeProps
}: ProtectedRouteProps) {
  const loginStatus = window.localStorage.getItem("authInfo");
  return isAuth || loginStatus ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...routeProps} />
  ) : (
    <Redirect to={{ pathname: "/" }} />
  );
}
