import React from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { FaRegWindowClose } from "react-icons/fa";
import { IMPORT_USERS } from "../../api/Model/Mutation/Insert/ImportUsers";
import { IMPORT_STUDENTS } from "../../api/Model/Mutation/Insert/ImportStudents";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useSelector, useDispatch } from "react-redux";
import { MODAL_ADD, MODAL_IMPORT } from "../../redux/modalSlice";

function ImportModal({ prodi }) {
  const modalImport = useSelector((state) => state.modal.import);
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [importUsers] = useMutation(IMPORT_USERS);
  const [importStudents, { loading: loadingImport }] = useMutation(IMPORT_STUDENTS, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Mahasiswa Berhasil Dimasukan",
        showConfirmButton: false,
        timer: 1200,
      });

      dispatch(MODAL_ADD(false));
      setStudents([]);
      setUsers([]);
    },
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
        setStudents((students) => [...students, { npm: data.npm.toString(), fullname: data.fullname, study_programs_id: prodi }]);
        setUsers((users) => [...users, { fullname: data.fullname, username: data.npm.toString(), password: data.npm.toString(), study_programs_id: prodi, roles_id: 4 }]);
      });
    });
  };

  const handleImport = () => {
    if (students.length === 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Tidak Ada Data",
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
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
    }
  };

  return (
    <>
      <button
        onClick={() => {
          // setShowModal({ ...showModal, modalAdd: false, modalImport: true });
          dispatch(MODAL_IMPORT(true));
        }}
        data-modal-toggle="large-modal"
        type="button"
        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
      >
        Import Data
      </button>
      {modalImport && (
        <div id="modalImport" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 mx-auto w-full max-w-4xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Tambah Data Mahasiswa Baru</h3>
                <button
                  onClick={() => {
                    dispatch(MODAL_IMPORT(false));
                    setStudents([]);
                    setUsers([]);
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
                  {loadingImport ? <LoadingAnimation /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ImportModal;
