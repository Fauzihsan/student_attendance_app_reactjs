import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";

function KelolaKelas() {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main lg:p-7 lg:px-7 pt-20 lg:text-xl text-xs">
        <h1 className="lg:text-2xl lg:text-left text-lg text-center text-white">Kelola Kelas</h1>
      </div>
    </>
  );
}

export default KelolaKelas;
