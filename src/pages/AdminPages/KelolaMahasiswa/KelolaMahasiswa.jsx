import React from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { useMutation, useQuery } from "@apollo/client";
import { INSERT_STUDENTS } from "../../../api/Model/Mutation/Insert/InsertStudents";
import { INSERT_USERS } from "../../../api/Model/Mutation/Insert/InsertUsers";
import { GET_STUDENTS } from "../../../api/Model/Query/GetStudents";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";
import Swal from "sweetalert2";

function KelolaMahasiswa() {
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const { data: dataStudents, loading: fetchStudents } = useQuery(GET_STUDENTS);
  const [insertUsers] = useMutation(INSERT_USERS);
  const [insertStudents, { loading }] = useMutation(INSERT_STUDENTS, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Mahasiswa Berhasil Dimasukan",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    refetchQueries: [GET_STUDENTS],
  });

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      d.forEach((data) => {
        setStudents((students) => [...students, { npm: data.npm.toString(), fullname: data.fullname, study_programs_id: data.study_programs_id.toString() }]);
        setUsers((users) => [...users, { fullname: data.fullname, username: data.npm.toString(), password: data.npm.toString(), study_programs_id: data.study_programs_id.toString(), roles_id: 4 }]);
      });
    });
  };

  const handleSubmit = () => {
    insertStudents({
      variables: {
        students: students,
      },
    });

    insertUsers({
      variables: {
        users: users,
      },
    });
  };

  if (loading) return <LoadingAnimation />;

  return (
    <>
      <Sidebar />
      <Header />
      <div className="main bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <h1 className="p-3 lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Kelola Mahasiswa</h1>
        <div className="bg-primary-white dark:bg-primary-grey text-white p-5 h-max w-full">
          <div className="flex flex-row justify-between items-center py-3">
            <div className="text-sm flex flex-col gap-y-2 dark:text-white text-primary-grey">
              <label htmlFor="">Import Data Mahasiswa</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  readExcel(file);
                }}
              />
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
                  placeholder="Search for items"
                />
              </div>
            </div>
          </div>
          <div className="relative h-80 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-primary-white2 dark:bg-primary-black dark:text-gray-400">
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
                    Jurusan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {fetchStudents ? (
                  <tr>
                    <td colSpan={6}>
                      <p className="text-center py-3">
                        <LoadingAnimation />
                      </p>
                    </td>
                  </tr>
                ) : dataStudents?.students.length !== 0 ? (
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
                      <td className="px-6 py-4">{student.study_program.study_program_name}</td>
                      <td className="px-6 py-4 text-right">
                        <a href="/#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <p className="text-center py-3">Data Mahasiswa Kosong</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row pt-5 justify-center">
            <button
              onClick={handleSubmit}
              type="button"
              className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default KelolaMahasiswa;
