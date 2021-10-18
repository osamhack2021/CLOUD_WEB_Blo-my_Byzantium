import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

export type ProtectedRouteProps = {
  isAuth: boolean;
} & RouteProps;

export default function ProtectedRoute({
  isAuth,
  ...routeProps
}: ProtectedRouteProps) {
  return isAuth ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...routeProps} />
  ) : (
    <Redirect to={{ pathname: "/" }} />
  );
}
