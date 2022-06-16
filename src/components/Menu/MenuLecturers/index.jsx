import React from "react";
import "../../../pages/AdminPages/style.css";
import { Link } from "react-router-dom";
import { RiDashboard3Line, RiUser3Line } from "react-icons/ri";

function MenuLecturers() {
  return (
    <>
      <Link to="/lecturer " className="hover:bg-primary-blue hover:text-primary-white p-3 dark:text-white text-primary-grey hover:no-underline">
        <div className="flex flex-row items-center">
          <RiDashboard3Line size={20} className="mr-4" />
          Dashboard
        </div>
      </Link>

      <Link to="/lecturer/absensi" className="hover:bg-primary-blue hover:text-primary-white p-3 dark:text-white text-primary-grey hover:no-underline">
        <div className="side-menu flex flex-row items-center">
          <RiUser3Line size={20} className="mr-4" />
          Absensi
        </div>
      </Link>
    </>
  );
}

export default MenuLecturers;
