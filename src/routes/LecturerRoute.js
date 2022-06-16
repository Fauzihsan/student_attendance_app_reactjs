import React from "react";
import { AUTH } from "../utils/helpers/AuthCookies";
import { Outlet } from "react-router-dom";
import ErrorPage from "../pages/Error";

function LecturerRoute() {
  if (AUTH.setAuth() && AUTH.getRole() === "5") return <Outlet />;
  return <ErrorPage code="403" title="Forbidden : You don't have permission to access this page" />;
}

export default LecturerRoute;
