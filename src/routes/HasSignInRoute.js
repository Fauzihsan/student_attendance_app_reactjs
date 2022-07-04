import React from "react";
import { Outlet } from "react-router";
import Dashboard from "../pages/AdminPages/Dashboard";
import Absensi from "../pages/LecturerPages/Absensi";
import LihatAbsensi from "../pages/StudentPages/LihatAbsensi";
import { AUTH } from "../utils/helpers/AuthCookies";

function HasSignInRoute() {
  if (AUTH.setAuth() === false) {
    return <Outlet />;
  } else {
    if (AUTH.getRole() === "1" || AUTH.getRole() === "2" || AUTH.getRole() === "3") {
      return <Dashboard />;
    } else if (AUTH.getRole() === "4") {
      return <LihatAbsensi />;
    } else {
      return <Absensi />;
    }
  }
}

export default HasSignInRoute;
