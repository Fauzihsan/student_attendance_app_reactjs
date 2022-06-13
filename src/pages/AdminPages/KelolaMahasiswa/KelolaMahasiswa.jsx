import React, { useEffect } from "react";
import { useState } from "react";
import { AUTH } from "../../../utils/helpers/AuthCookies";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import InsertModal from "../../../components/ModalInsert/InsertModal";
import FilterStudents from "../../../components/FilterStudents/FilterStudents";
import SearchBar from "../../../components/SearchBar/SearchBar";
import StudentTable from "../../../components/Tables/StudentTable/StudentTable";

function KelolaMahasiswa() {
  const INITIAL_STATE = {
    npm: "",
    fullname: "",
    study_programs_id: "",
  };

  const [student, setStudent] = useState(INITIAL_STATE);
  const [prodi, setProdi] = useState("");

  useEffect(() => {
    if (AUTH.getRole() === "1") {
      setProdi("Teknik Informatika");
      setStudent({ ...student, study_programs_id: "55201" });
    } else if (AUTH.getRole() === "2") {
      setProdi("Teknik Sipil");
      setStudent({ ...student, study_programs_id: "22201" });
    } else if (AUTH.getRole() === "3") {
      setProdi("Teknik Industri");
      setStudent({ ...student, study_programs_id: "26201" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <h1 className="p-3 lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Kelola Mahasiswa Fakultas Teknik Program Studi {prodi} </h1>
        <div className="bg-primary-white dark:bg-primary-grey text-white p-5 h-max w-full">
          <div className="flex lg:flex-row flex-col justify-between items-center py-3">
            <InsertModal student={student.study_programs_id} />
            <FilterStudents />
            <SearchBar />
          </div>
          <StudentTable student={student.study_programs_id} />
        </div>
      </div>
    </>
  );
}

export default KelolaMahasiswa;
