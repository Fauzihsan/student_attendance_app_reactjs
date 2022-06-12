import React from "react";
import { useState, useEffect } from "react";
import { INSERT_STUDENT } from "../../api/Model/Mutation/Insert/InsertStudent";
import { INSERT_USER } from "../../api/Model/Mutation/Insert/InsertUser";
import { FaRegWindowClose } from "react-icons/fa";
import { AUTH } from "../../utils/helpers/AuthCookies";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import ImportModal from "./ImportModal";

function InsertModal() {
  const [showAddModal, setShowAddModal] = useState(false);

  const INITIAL_STATE = {
    npm: "",
    fullname: "",
    study_programs_id: "",
  };

  const [student, setStudent] = useState(INITIAL_STATE);

  const [InsertUser] = useMutation(INSERT_USER);

  const [insertStudent, { loading: loadingInsert }] = useMutation(INSERT_STUDENT, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Mahasiswa Berhasil Dimasukan",
        showConfirmButton: false,
        timer: 1500,
      });

      setStudent(INITIAL_STATE);
      setShowAddModal(false);
    },
  });

  useEffect(() => {
    if (AUTH.getRole() === "1") {
      setStudent({ ...student, study_programs_id: "55201" });
    } else if (AUTH.getRole() === "2") {
      setStudent({ ...student, study_programs_id: "22201" });
    } else if (AUTH.getRole() === "3") {
      setStudent({ ...student, study_programs_id: "26201" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputStudent = () => {
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
    insertStudent({
      variables: {
        student: {
          npm: student.npm,
          fullname: student.fullname,
          study_programs_id: student.study_programs_id,
        },
      },
    });
  };
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowAddModal(true);
        }}
        className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
        data-modal-toggle="large-modal"
      >
        Tambah
      </button>
      {showAddModal && (
        <div id="modalAdd" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 mx-auto w-full max-w-xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Tambah Data Mahasiswa Baru</h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
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
                      {loadingInsert ? "Tunggu ..." : "Submit"}
                    </button>
                    <ImportModal prodi={student.study_programs_id} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InsertModal;
