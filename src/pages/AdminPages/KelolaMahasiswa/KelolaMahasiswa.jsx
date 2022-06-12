import React, { useEffect } from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { useMutation, useSubscription } from "@apollo/client";

import { GET_STUDENTS } from "../../../api/Model/Subscription/GetStudents";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";
import Swal from "sweetalert2";
import { FaRegWindowClose } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IMPORT_USERS } from "../../../api/Model/Mutation/Insert/ImportUsers";
import { IMPORT_STUDENTS } from "../../../api/Model/Mutation/Insert/ImportStudents";
import { INSERT_STUDENT } from "../../../api/Model/Mutation/Insert/InsertStudent";
import { AUTH } from "../../../utils/helpers/AuthCookies";
import { INSERT_USER } from "../../../api/Model/Mutation/Insert/InsertUser";
import { DELETE_STUDENT } from "../../../api/Model/Mutation/Delete/DeleteStudent";
import { DELETE_USER } from "../../../api/Model/Mutation/Delete/DeleteUser";
import UpdateModal from "../../../components/UpdateModal";
import { GET_STUDENTS_AKTIF } from "../../../api/Model/Subscription/GetStudentsAktif";
import { GET_STUDENTS_NONAKTIF } from "../../../api/Model/Subscription/GetStudentsNonAktif";
import { GET_STUDENTS_SEARCH } from "../../../api/Model/Subscription/GetSearchStudents";

function KelolaMahasiswa() {
  const INITIAL_STATE = {
    npm: null,
    fullname: null,
    study_programs_id: null,
  };
  const [showModal, setShowModal] = useState({
    modalAdd: false,
    modalImport: false,
    modalDelete: false,
  });

  const [search, setSearch] = useState("");
  const [prodi, setProdi] = useState("");
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [student, setStudent] = useState(INITIAL_STATE);
  const [importUsers] = useMutation(IMPORT_USERS);
  const [InsertUser] = useMutation(INSERT_USER);
  const [importStudents, { loading: loadingImport }] = useMutation(IMPORT_STUDENTS, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Mahasiswa Berhasil Dimasukan",
        showConfirmButton: false,
        timer: 1500,
      });

      setShowModal({ ...showModal, modalImport: false });
      setStudents([]);
    },
    refetchQueries: [GET_STUDENTS],
  });

  const [insertStudent, { loading: loadingInsert }] = useMutation(INSERT_STUDENT, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Mahasiswa Berhasil Dimasukan",
        showConfirmButton: false,
        timer: 1500,
      });

      setShowModal({ ...showModal, modalAdd: false });
      setStudent(INITIAL_STATE);
    },
    refetchQueries: [GET_STUDENTS],
  });

  const [deleteStudent, { loading: loadingDelete }] = useMutation(DELETE_STUDENT, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Mahasiswa Berhasil Dihapus",
        showConfirmButton: false,
        timer: 1500,
      });

      setShowModal({ ...showModal, modalDelete: false });
      setStudentDelete("");
    },
    refetchQueries: [GET_STUDENTS],
  });

  const [deleteUser] = useMutation(DELETE_USER);

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
        setStudents((students) => [...students, { npm: data.npm.toString(), fullname: data.fullname, study_programs_id: student.study_programs_id }]);
        setUsers((users) => [...users, { fullname: data.fullname, username: data.npm.toString(), password: data.npm.toString(), study_programs_id: student.study_programs_id, roles_id: 4 }]);
      });
    });
  };

  const handleImport = () => {
    importStudents({
      variables: {
        students: students,
      },
    });

    importUsers({
      variables: {
        users: users,
      },
    });
  };

  useEffect(() => {
    if (AUTH.getRole() === "1") {
      setStudent({ ...student, study_programs_id: "55201" });
      setProdi("Teknik Informatika");
    } else if (AUTH.getRole() === "2") {
      setStudent({ ...student, study_programs_id: "22201" });
      setProdi("Teknik Sipil");
    } else if (AUTH.getRole() === "3") {
      setStudent({ ...student, study_programs_id: "26201" });
      setProdi("Teknik Industri");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputStudent = () => {
    insertStudent({
      variables: {
        student: {
          npm: student.npm,
          fullname: student.fullname,
          study_programs_id: student.study_programs_id,
        },
      },
    });
    InsertUser({
      variables: {
        user: {
          fullname: student.fullname,
          username: student.npm,
          password: student.npm,
          roles_id: 4,
          study_programs_id: student.study_programs_id,
        },
      },
    });
  };

  const [studentDelete, setStudentDelete] = useState({ npm: "", fullname: "" });
  const handleDeleteStudent = () => {
    deleteStudent({
      variables: {
        npm: studentDelete.npm,
      },
    });

    deleteUser({
      variables: {
        npm: studentDelete.npm,
      },
    });
  };

  const [filter, setFilter] = useState("");
  const filtering = (e) => {
    setFilter(e.target.value);
  };

  const [get, setGet] = useState(GET_STUDENTS);

  const { data: dataStudents, loading: fetchStudents } = useSubscription(get);
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

  if (loadingImport) return <LoadingAnimation />;
  if (loadingInsert) return <LoadingAnimation />;

  return (
    <>
      <Sidebar />
      <Header />
      <div className="main bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <h1 className="p-3 lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Kelola Mahasiswa Fakultas Teknik Program Studi {prodi} </h1>
        <div className="bg-primary-white dark:bg-primary-grey text-white p-5 h-max w-full">
          <div className="flex flex-row justify-between items-center py-3">
            <button
              type="button"
              onClick={() => {
                setShowModal({ ...showModal, modalAdd: true });
              }}
              className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
              data-modal-toggle="large-modal"
            >
              Tambah
            </button>

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
                          <button
                            onClick={() => {
                              setShowModal({ ...showModal, modalDelete: true });
                              setStudentDelete({ ...studentDelete, npm: student.npm, fullname: student.fullname });
                            }}
                            className="bg-secondary-red text-white hover:bg-red-800 p-2 rounded-md"
                          >
                            <AiOutlineDelete size={25} />
                          </button>
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
                        <button
                          onClick={() => {
                            setShowModal({ ...showModal, modalDelete: true });
                            setStudentDelete({ ...studentDelete, npm: student.npm, fullname: student.fullname });
                          }}
                          className="bg-secondary-red text-white hover:bg-red-800 p-2 rounded-md"
                        >
                          <AiOutlineDelete size={25} />
                        </button>
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
        </div>
      </div>

      {showModal.modalAdd && (
        <div id="modalAdd" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 mx-auto w-full max-w-xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Tambah Data Mahasiswa Baru</h3>
                <button
                  onClick={() => {
                    setShowModal({ ...showModal, modalAdd: false });
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="large-modal"
                >
                  <FaRegWindowClose id="cancel" className="w-8 dark:text-white text-primary-blue" size={25} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <form onSubmit={handleInputStudent}>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="npm"
                      className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      autoComplete="off"
                      value={student.npm}
                      onChange={(e) => {
                        setStudent({ ...student, npm: e.target.value });
                      }}
                      required
                    />
                    <label
                      htmlFor="npm"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      NPM
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="fullname"
                      className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      autoComplete="off"
                      value={student.fullname}
                      onChange={(e) => {
                        setStudent({ ...student, fullname: e.target.value });
                      }}
                      required
                    />
                    <label
                      htmlFor="fullname"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Fullname
                    </label>
                  </div>

                  <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button type="submit" className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setShowModal({ ...showModal, modalAdd: false, modalImport: true });
                      }}
                      data-modal-toggle="large-modal"
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Import Data
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal.modalImport && (
        <div id="modalImport" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 mx-auto w-full max-w-4xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Tambah Data Mahasiswa Baru</h3>
                <button
                  onClick={() => {
                    setShowModal({ ...showModal, modalImport: false });
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="large-modal"
                >
                  <FaRegWindowClose id="cancel" className="w-8 dark:text-white text-primary-blue" size={25} />
                </button>
              </div>

              <div className="p-6 space-y-6">
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
                <div className="relative h-72 overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-primary-white2 dark:bg-primary-black dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          NPM
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Nama
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.length !== 0 ? (
                        students.map((student) => (
                          <tr key={student.npm} className="dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-primary-white2 dark:hover:bg-gray-700">
                            <td className="px-6 py-4">{student.npm}</td>
                            <td className="px-6 py-4">{student.fullname}</td>
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
              </div>

              <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={handleImport}
                  type="button"
                  className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal.modalDelete && (
        <div id="modal-delete" tabIndex="-1" className="flex items-center overflow-y-auto overflow-x-hidden fixed right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
          <div className="relative mx-auto p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => setShowModal({ ...showModal, modalDelete: false })}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <div className="p-6 text-center">
                <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Anda yakin ingin menghapus data <br /> <b>{studentDelete.fullname}</b>
                </h3>
                <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleDeleteStudent}>
                  {loadingDelete ? "Tunggu ...." : "Hapus"}
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setShowModal({ ...showModal, modalDelete: false })}
                >
                  Batalkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default KelolaMahasiswa;
