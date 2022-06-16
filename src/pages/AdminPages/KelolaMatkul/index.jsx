import React from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import InsertModal from "../../../components/Modal/ModalInsert";
import CourseTable from "../../../components/Tables/CourseTable";
import { useSelector } from "react-redux";

function KelolaMatkul() {
  const prodi = useSelector((state) => state.prodi.name);
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <h1 className="p-3 lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Mata Kuliah Fakultas Teknik Program Studi {prodi}</h1>
        <div className="bg-primary-white dark:bg-primary-grey text-white p-5 h-max w-full">
          <div className="flex lg:flex-row flex-col justify-between items-center py-3">
            <InsertModal type={"course"} />
          </div>
          <CourseTable />
        </div>
      </div>
    </>
  );
}

export default KelolaMatkul;
