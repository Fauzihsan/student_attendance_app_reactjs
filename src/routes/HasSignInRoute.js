import React from "react";
import { Outlet } from "react-router";
import Dashboard from "../pages/AdminPages/Dashboard/Dashboard";
import { AUTH } from "../utils/helpers/AuthCookies";

function HasSignInRoute() {
  console.log(AUTH.getAuth());
  console.log(AUTH.getRole());
  console.log(AUTH.getAuth() === null);
  if (AUTH.setAuth() === false) {
    return <Outlet />;
  } else {
    if (AUTH.getRole() === "1" || AUTH.getRole() === "2" || AUTH.getRole() === "3") {
      return <Dashboard />;
    } else if (AUTH.getRole() === "4") {
      return <Dashboard />;
    } else {
      return <Dashboard />;
    }
  }
}

export default HasSignInRoute;
