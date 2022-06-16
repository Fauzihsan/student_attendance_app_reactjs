import React from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

function LihatAbsensi() {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main lg:px-7 pt-20 lg:text-xl text-xs">
        <h1 className="lg:text-2xl lg:text-left text-lg text-center text-white">Lihat Absensi</h1>
      </div>
    </>
  );
}

export default LihatAbsensi;