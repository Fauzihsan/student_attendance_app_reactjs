import React from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

function UnduhAbsensi() {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <h1 className="p-3 lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Unduh Absensi</h1>
        <div className="bg-primary-white dark:bg-primary-grey text-white p-5 h-max w-full">
          <div className="flex lg:flex-row flex-col justify-between items-center py-3"></div>
        </div>
      </div>
    </>
  );
}

export default UnduhAbsensi;
