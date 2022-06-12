import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { AUTH } from "../../../utils/helpers/AuthCookies";
import InsertModal from "../../../components/ModalInsert/InsertModal";
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
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("");
  const filtering = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Sidebar />
      <Header />
      <div className="main bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <h1 className="p-3 lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Kelola Mahasiswa Fakultas Teknik Program Studi {prodi} </h1>
        <div className="bg-primary-white dark:bg-primary-grey text-white p-5 h-max w-full">
          <div className="flex flex-row justify-between items-center py-3">
            <InsertModal student={student.study_programs_id} />

            <div className="w-1/2 flex flex-row items-center gap-x-2">
              <label htmlFor="" className="text-sm">
                Filter
              </label>
              <select
                defaultValue={"all"}
                name="filter"
                onChange={filtering}
                className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={"all"}>Semua Mahasiswa</option>
                <option value={"aktif"}>Mahasiswa Aktif</option>
                <option value={"tidak_aktif"}>Mahasiswa Tidak Aktif</option>
              </select>
            </div>

            <div className="p-4">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cari NPM Mahasiswa"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <StudentTable filter={filter} search={search} student={student.study_programs_id} />
        </div>
      </div>
    </>
  );
}

export default KelolaMahasiswa;
