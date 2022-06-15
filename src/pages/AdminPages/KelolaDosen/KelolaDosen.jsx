import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import InsertModal from "../../../components/ModalInsert/InsertModal";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { AUTH } from "../../../utils/helpers/AuthCookies";

function KelolaDosen({ prodi }) {
  const INITIAL_STATE = {
    nidn: "",
    fullname: "",
    study_programs_id: "",
  };

  const [lecturer, setLecturer] = useState(INITIAL_STATE);

  useEffect(() => {
    if (AUTH.getRole() === "1") {
      setLecturer({ ...lecturer, study_programs_id: "55201" });
    } else if (AUTH.getRole() === "2") {
      setLecturer({ ...lecturer, study_programs_id: "22201" });
    } else if (AUTH.getRole() === "3") {
      setLecturer({ ...lecturer, study_programs_id: "26201" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <h1 className="p-3 lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Kelola Dosen Fakultas Teknik Program Studi {prodi} </h1>
        <div className="flex lg:flex-row flex-col justify-between items-center py-3">
          <InsertModal lecturer={lecturer.study_programs_id} />
          <SearchBar />
        </div>
        {/* <StudentTable student={student.study_programs_id} /> */}
      </div>
    </>
  );
}

export default KelolaDosen;
