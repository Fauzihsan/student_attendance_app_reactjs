import React from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

function Penjadwalan() {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main lg:px-7 pt-20 lg:text-xl text-xs">
        <h1 className="lg:text-2xl lg:text-left text-lg text-center text-white">Penjadwalan</h1>
      </div>
    </>
  );
}

export default Penjadwalan;
