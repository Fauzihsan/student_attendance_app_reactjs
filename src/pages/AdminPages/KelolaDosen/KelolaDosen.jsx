import React from "react";
import Header from "../../../components/Header/Header";
import InsertModal from "../../../components/ModalInsert/InsertModal";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import LecturerTable from "../../../components/Tables/LecturerTable/LecturerTable";

function KelolaDosen() {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <h1 className="p-3 lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Kelola Dosen Fakultas Teknik</h1>
        <div className="bg-primary-white dark:bg-primary-grey text-white p-5 h-max w-full">
          <div className="flex lg:flex-row flex-col justify-between items-center py-3">
            <InsertModal type={"lecturer"} />
            <SearchBar type={"lecturer"} />
          </div>
          <LecturerTable />
        </div>
      </div>
    </>
  );
}

export default KelolaDosen;
