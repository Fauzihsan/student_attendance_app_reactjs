import React from "react";
import { useState, useEffect } from "react";
import { useSubscription } from "@apollo/client";
import { GET_STUDENTS } from "../../../api/Model/Subscription/GetStudents";
import { GET_STUDENTS_SEARCH } from "../../../api/Model/Subscription/GetSearchStudents";
import { GET_STUDENTS_AKTIF } from "../../../api/Model/Subscription/GetStudentsAktif";
import { GET_STUDENTS_NONAKTIF } from "../../../api/Model/Subscription/GetStudentsNonAktif";
import UpdateModal from "../../ModalUpdate/UpdateModal";

import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";
import DeleteModal from "../../ModalDelete/DeleteModal";

function StudentTable({ filter, search, student }) {
  const [get, setGet] = useState(GET_STUDENTS);
  const { data: dataStudents, loading: fetchStudents } = useSubscription(get, { variables: { prodi: student } });
  const { data: dataSearch, loading: fetchSearch } = useSubscription(GET_STUDENTS_SEARCH, {
    variables: {
      npm: search,
    },
  });

  useEffect(() => {
    if (filter === "aktif") {
      setGet(GET_STUDENTS_AKTIF);
    } else if (filter === "tidak_aktif") {
      setGet(GET_STUDENTS_NONAKTIF);
    } else {
      setGet(GET_STUDENTS);
    }
  }, [filter]);
  return (
    <div className="relative h-80 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-primary-white2 dark:bg-primary-black dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-primary-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              NPM
            </th>
            <th scope="col" className="px-6 py-3">
              Nama
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {fetchStudents || fetchSearch ? (
            <tr>
              <td colSpan={6}>
                <LoadingAnimation />
              </td>
            </tr>
          ) : search === "" ? (
            dataStudents?.students.length !== 0 ? (
              dataStudents?.students.map((student) => (
                <tr key={student.npm} className="dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-primary-white2 dark:hover:bg-gray-700">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4">{student.npm}</td>
                  <td className="px-6 py-4">{student.fullname}</td>
                  <td className="px-6 py-4">{student.is_active === true ? "Aktif" : "Tidak Aktif"}</td>
                  <td className="flex flex-row justify-center gap-x-1 pt-2">
                    <UpdateModal student={student} />
                    <DeleteModal student={student} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <p className="text-center py-3">Data Mahasiswa Kosong</p>
                </td>
              </tr>
            )
          ) : dataSearch?.students.length !== 0 ? (
            dataSearch?.students.map((student) => (
              <tr key={student.npm} className="dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-primary-white2 dark:hover:bg-gray-700">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4">{student.npm}</td>
                <td className="px-6 py-4">{student.fullname}</td>
                <td className="px-6 py-4">{student.is_active === true ? "Aktif" : "Tidak Aktif"}</td>
                <td className="flex flex-row justify-center gap-x-1 pt-2">
                  <UpdateModal student={student} />
                  <DeleteModal />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <p className="text-center py-3">NPM TIDAK DITEMUKAN</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
