import React from "react";
import { FaBars, FaRegWindowClose } from "react-icons/fa";
import "../../pages/AdminPages/style.css";
import ListMenu from "../Menu/ListMenu";

function Sidebar() {
  return (
    <>
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <FaBars id="btn" className="dark:text-white text-primary-blue" size={20} />
        <FaRegWindowClose id="cancel" className="w-8 dark:text-white text-primary-blue" size={25} />
      </label>

      <div className="sidebar bg-primary-white dark:bg-primary-grey py-14">
        <div className="w-full flex flex-row items-center justify-center">
          <a href="https://ft.unsur.ac.id" target="__blank" className="flex py-5 border-b-2">
            <img src={require("../../assets/img/ftLogo.png")} className="lg:h-12 h-6 mr-3 sm:h-7" alt="FT Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Absensi FTUNSUR</span>
          </a>
        </div>

        <ul className="flex flex-col gap-y-2 py-3 ">
          <ListMenu />
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
