import React from "react";
import { FaBars, FaRegWindowClose } from "react-icons/fa";
import "../../pages/AdminPages/AdminPages.css";
import ListMenu from "../Menu/ListMenu";

function Sidebar() {
  return (
    <>
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <FaBars id="btn" className="dark:text-white text-primary-blue" size={20} />
        <FaRegWindowClose id="cancel" className="w-8 dark:text-white text-primary-blue" size={25} />
      </label>

      <div className="sidebar bg-primary-white dark:bg-primary-grey py-3">
        <a href="https://ft.unsur.ac.id" target="__blank" className="flex items-center pl-2.5 mb-5 pt-10 py-2 border-b-2">
          <img src={require("../../assets/img/ftLogo.png")} className="h-6 mr-3 sm:h-7" alt="FT Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Absensi FTUNSUR</span>
        </a>

        <ul className="flex flex-col gap-y-2 py-3 ">
          <ListMenu />
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
