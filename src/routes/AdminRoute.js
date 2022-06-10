import React from "react";
import { AUTH } from "../utils/helpers/AuthCookies";
import { Outlet } from "react-router-dom";
import ErrorPage from "../pages/Error/ErrorPage";

function AdminRoute() {
  if ((AUTH.setAuth() && AUTH.getRole() === "1") || AUTH.getRole() === "2" || AUTH.getRole() === "3") return <Outlet />;
  return <ErrorPage code="403" title="Forbidden : You don't have permission to access this page" />;
}

export default AdminRoute;
