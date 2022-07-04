import React from "react";
import "../../../pages/AdminPages/style.css";
import { Link } from "react-router-dom";
import { RiDashboard3Line, RiUser3Line } from "react-icons/ri";

function MenuStudents() {
  return (
    <>
      <Link to="/student " className="hover:bg-primary-blue hover:text-primary-white p-3 dark:text-white text-primary-grey hover:no-underline">
        <div className="flex flex-row items-center">
          <RiDashboard3Line size={20} className="mr-4" />
          Back To Home
        </div>
      </Link>
    </>
  );
}

export default MenuStudents;
