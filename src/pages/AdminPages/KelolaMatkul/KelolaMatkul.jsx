import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";

function KelolaMatkul() {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main lg:px-7 pt-20 lg:text-xl text-xs">
        <h1 className="lg:text-2xl lg:text-left text-lg text-center text-white">Kelola Mata Kuliah</h1>
      </div>
    </>
  );
}

export default KelolaMatkul;
