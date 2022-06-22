import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { useMutation, useSubscription } from "@apollo/client";
import { GET_STUDENTS } from "../../../api/Model/Subscription/GetStudents";
import { GET_STUDENTS_SEARCH } from "../../../api/Model/Subscription/GetSearchStudents";
import { GET_STUDENTS_AKTIF } from "../../../api/Model/Subscription/GetStudentsAktif";
import { GET_STUDENTS_NONAKTIF } from "../../../api/Model/Subscription/GetStudentsNonAktif";
import { DELETE_STUDENT } from "../../../api/Model/Mutation/Delete/DeleteStudent";
import { DELETE_USER } from "../../../api/Model/Mutation/Delete/DeleteUser";

import LoadingAnimationXL from "../../Loading/LoadingAnimationXL";
import ModalDelete from "../../Modal/ModalDelete";
import LoadingAnimation from "../../Loading/LoadingAnimation";
import UpdateStudentModal from "../../Modal/ModalUpdate/ModalUpdateStudent";
import { INSERT_STUDENTS_TO_ATTENDANCE } from "../../../api/Model/Mutation/Insert/InsertStudentToAttendance";
import Swal from "sweetalert2";

function StudentTable({ schedule_data, type }) {
  const id_prodi = useSelector((state) => state.prodi.id);
  const filter = useSelector((state) => state.filter.status);
  const search = useSelector((state) => state.search.value);

  const [filterCategory, setFilterCategory] = useState(GET_STUDENTS);
  const { data: dataStudents, loading: fetchStudents } = useSubscription(filterCategory, { variables: { prodi: id_prodi } });
  const { data: dataStudentSearch, loading: fetchSearch } = useSubscription(GET_STUDENTS_SEARCH, {
    variables: {
      npm: search,
      prodi: id_prodi,
    },
  });

  const [data, setData] = useState([]);
  const [listStudents, setListStudents] = useState([]);

  useEffect(() => {
    setData([]);
    setListStudents([]);
    if (filter === "aktif") {
      setFilterCategory(GET_STUDENTS_AKTIF);
    } else if (filter === "tidak_aktif") {
      setFilterCategory(GET_STUDENTS_NONAKTIF);
    } else {
      setFilterCategory(GET_STUDENTS);
    }
    !fetchStudents &&
      dataStudents?.students.forEach((student) => {
        if (type === "insertStudentToAttendance") {
          setListStudents((listStudents) => [...listStudents, { npm: student.npm, fullname: student.fullname, class_id: schedule_data.id, is_checked: false }]);
        } else {
          setData((data) => [...data, { npm: student.npm, fullname: student.fullname, is_active: student.is_active, is_checked: false }]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, dataStudents?.students]);

  const handleChange = (e) => {
    if (type === "insertStudentToAttendance") {
      setListStudents(
        [...listStudents].map((obj) => {
          if (obj.npm === e.target.value) {
            return {
              ...obj,
              is_checked: !obj.is_checked,
            };
          } else {
            return obj;
          }
        })
      );
    } else {
      setData(
        [...data].map((obj) => {
          if (obj.npm === e.target.value) {
            return {
              ...obj,
              is_checked: !obj.is_checked,
            };
          } else {
            return obj;
          }
        })
      );
    }
  };

  //DELETE MULTIPLE DATA
  const [showModal, setShowModal] = useState(false);
  const [ShowModalInsert, setShowModalInsert] = useState(false);
  const [deleteStudent, { loading: loadingDelete }] = useMutation(DELETE_STUDENT, {
    onCompleted: () => {
      setShowModal(false);
      setData([]);
      setFinishDelete(true);
    },
  });

  const [insertStudentToAttendance, { loading: loadingInsert }] = useMutation(INSERT_STUDENTS_TO_ATTENDANCE, {
    onCompleted: () => {
      setShowModalInsert(false);
      setFinishInsert(true);
    },
  });

  const [deleteUser] = useMutation(DELETE_USER);
  const [finishDelete, setFinishDelete] = useState(false);
  const [finishInsert, setFinishInsert] = useState(false);
  const handleDeleteStudent = () => {
    data.forEach((student) => {
      if (student.is_checked) {
        deleteStudent({
          variables: {
            npm: student.npm,
          },
        });
        deleteUser({
          variables: {
            username: student.npm,
          },
        });
      }
    });
  };

  const handleInsertStudentToAttendance = () => {
    // if (listStudents.length === 0) {
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "error",
    //     title: "Tidak Ada Data",
    //     showConfirmButton: false,
    //     timer: 1200,
    //   });
    // }
    //  else {
    listStudents.forEach((student) => {
      if (student.is_checked) {
        insertStudentToAttendance({
          variables: {
            schedules_id: schedule_data.id,
            npm: student.npm,
          },
        });
      }
    });
    // }
  };

  return (
    <>
      {finishDelete ||
        (finishInsert && (
          <div id="modal-delete" tabIndex="-1" className="flex items-center overflow-y-auto overflow-x-hidden fixed right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
            <div className="relative mx-auto p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={() => (type === "insertStudentToAttendance" ? setFinishInsert(false) : setFinishDelete(false))}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
                <div className="p-6 text-center">
                  <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Selesai</h3>
                  <button
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => (type === "insertStudentToAttendance" ? setFinishInsert(false) : setFinishDelete(false))}
                  >
                    Selesai
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

      <div className="relative h-80 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-primary-white2 dark:bg-primary-black dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  {type !== "insertStudentToAttendance" && data.filter((d) => d.is_checked === true).length !== 0 ? (
                    <button
                      onClick={() => {
                        setShowModal(true);
                      }}
                      className="text-red-600"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  ) : (
                    []
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                NPM
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              {type !== "insertStudentToAttendance" && (
                <>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Aksi
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {fetchStudents || fetchSearch ? (
              <tr>
                <td colSpan={6} rowSpan={6}>
                  <LoadingAnimationXL />
                </td>
              </tr>
            ) : search === "" ? (
              data.length !== 0 || listStudents.length !== 0 ? (
                type === "insertStudentToAttendance" ? (
                  listStudents.map((student) => (
                    <tr key={student.npm} className="dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-primary-white2 dark:hover:bg-gray-700">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            defaultChecked={student.is_checked}
                            value={student.npm}
                            onChange={handleChange}
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="checkbox-table-search-1" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4">{student.npm}</td>
                      <td className="px-6 py-4">{student.fullname}</td>
                    </tr>
                  ))
                ) : (
                  data.map((student) => (
                    <tr key={student.npm} className="dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-primary-white2 dark:hover:bg-gray-700">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            defaultChecked={student.is_checked}
                            value={student.npm}
                            onChange={handleChange}
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="checkbox-table-search-1" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4">{student.npm}</td>
                      <td className="px-6 py-4">{student.fullname}</td>
                      <td className="px-6 py-4">{student.is_active === true ? "Aktif" : "Tidak Aktif"}</td>
                      <td className="flex flex-row justify-center gap-x-1 pt-2">
                        <UpdateStudentModal data={student} />
                        <ModalDelete data={student} type={"student"} />
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan={6}>
                    <p className="text-center py-3">Data Mahasiswa Kosong</p>
                  </td>
                </tr>
              )
            ) : dataStudentSearch?.students.length !== 0 ? (
              dataStudentSearch?.students.map((student) => (
                <tr key={student.npm} className="dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-primary-white2 dark:hover:bg-gray-700">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        defaultChecked={student.is_checked}
                        value={student.npm}
                        onChange={handleChange}
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4">{student.npm}</td>
                  <td className="px-6 py-4">{student.fullname}</td>
                  {type !== "insertStudentToAttendance" && (
                    <>
                      <td className="px-6 py-4">{student.is_active === true ? "Aktif" : "Tidak Aktif"}</td>
                      <td className="flex flex-row justify-center gap-x-1 pt-2">
                        <UpdateStudentModal data={student} />
                        <ModalDelete data={student} />
                      </td>
                    </>
                  )}
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
      {type === "insertStudentToAttendance" && (
        <div className="flex justify-center py-5">
          <button
            type="button"
            onClick={handleInsertStudentToAttendance}
            className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            data-modal-toggle="large-modal"
          >
            {loadingInsert ? <LoadingAnimation /> : "Tambah"}
          </button>
        </div>
      )}

      {showModal && (
        <div id="modal-delete" tabIndex="-1" className="flex items-center overflow-y-auto overflow-x-hidden fixed right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
          <div className="relative mx-auto p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setShowModal(false)}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <div className="p-6 text-center">
                <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Anda yakin ingin menghapus sejumlah
                  <br />
                  <b>{data.filter((d) => d.is_checked === true).length} Mahasiswa</b>
                </h3>
                <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleDeleteStudent}>
                  {loadingDelete ? <LoadingAnimation /> : "Hapus"}
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  Batalkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {ShowModalInsert && (
        <div id="modal-delete" tabIndex="-1" className="flex items-center overflow-y-auto overflow-x-hidden fixed right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
          <div className="relative mx-auto p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setShowModalInsert(false)}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <div className="p-6 text-center">
                <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Anda ingin menambahkan
                  <br />
                  <b>
                    {listStudents.filter((c) => c.is_checked === true).length} Mahasiswa ke kelas {schedule_data.class_name}
                  </b>
                </h3>
                <button
                  type="button"
                  className="text-white bg-primary-blue hover:bg-secondary-blue focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={handleInsertStudentToAttendance}
                >
                  {loadingDelete ? <LoadingAnimation /> : "Tambah"}
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setShowModalInsert(false)}
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

export default StudentTable;
