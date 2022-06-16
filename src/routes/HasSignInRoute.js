import React from "react";
import { Outlet } from "react-router";
import Dashboard from "../pages/AdminPages/Dashboard";
import HomeLecturer from "../pages/LecturerPages/Home";
import HomeStudent from "../pages/StudentPages/Home";
import { AUTH } from "../utils/helpers/AuthCookies";

function HasSignInRoute() {
  if (AUTH.setAuth() === false) {
    return <Outlet />;
  } else {
    if (AUTH.getRole() === "1" || AUTH.getRole() === "2" || AUTH.getRole() === "3") {
      return <Dashboard />;
    } else if (AUTH.getRole() === "4") {
      return <HomeStudent />;
    } else {
      return <HomeLecturer />;
    }
  }
}

export default HasSignInRoute;
