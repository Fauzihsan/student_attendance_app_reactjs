import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import InsertModal from "../../../components/ModalInsert/InsertModal";
import FilterStudents from "../../../components/FilterStudents/FilterStudents";
import SearchBar from "../../../components/SearchBar/SearchBar";
import StudentTable from "../../../components/Tables/StudentTable/StudentTable";
import { useSelector } from "react-redux";

function KelolaMahasiswa() {
  const name_prodi = useSelector((state) => state.prodi.name);
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <h1 className="p-3 lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Kelola Mahasiswa Fakultas Teknik Program Studi {name_prodi}</h1>
        <div className="bg-primary-white dark:bg-primary-grey text-white p-5 h-max w-full">
          <div className="flex lg:flex-row flex-col justify-between items-center py-3">
            <InsertModal />
            <FilterStudents />
            <SearchBar />
          </div>
          <StudentTable />
        </div>
      </div>
    </>
  );
}

export default KelolaMahasiswa;
