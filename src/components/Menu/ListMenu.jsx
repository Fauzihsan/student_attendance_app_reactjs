import React from "react";
import { AUTH } from "../../utils/helpers/AuthCookies";
import MenuStudents from "./MenuStudents";
import MenuLecturers from "./MenuLecturers";
import MenuStaff from "./MenuStaff";

function ListMenu() {
  if (AUTH.getRole() === "1" || AUTH.getRole() === "2" || AUTH.getRole() === "3") {
    return <MenuStaff />;
  } else if (AUTH.getRole() === "4") {
    return <MenuStudents />;
  } else if (AUTH.getRole() === "5") {
    return <MenuLecturers />;
  } else {
    return [];
  }
}

export default ListMenu;
