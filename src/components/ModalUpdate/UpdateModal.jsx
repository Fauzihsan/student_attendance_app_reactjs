import { useMutation } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegWindowClose } from "react-icons/fa";
import { UPDATE_STUDENT } from "../../api/Model/Mutation/Update/UpdateUser";
import Swal from "sweetalert2";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

function UpdateModal({ student }) {
  const { npm, fullname, is_active } = student;
  const [showModal, setShowModal] = useState(false);

  const INITIAL_STATE = {
    npm,
    fullname,
    is_active,
  };

  const [studentUpdate, setStudentUpdate] = useState(INITIAL_STATE);

  const [updateStudent, { loading }] = useMutation(UPDATE_STUDENT, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Mahasiswa berhasil terupdate",
        showConfirmButton: false,
        timer: 1200,
      });

      setShowModal(false);
      setStudentUpdate(INITIAL_STATE);
      setIsUpdated(false);
    },
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const handleOnChange = (e) => {
    const NAME = e.target.name;
    const VALUE = e.target.value;

    setStudentUpdate({ ...studentUpdate, [NAME]: VALUE });
    setIsUpdated(true);
  };

  const [error, setError] = useState("");
  const handleUpdate = (e) => {
    e.preventDefault();
    if (studentUpdate.fullname === "") {
      setError("Nama Mahasiswa Tidak Boleh Kosong");
    } else if (studentUpdate.fullname === fullname && studentUpdate.is_active === is_active) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Tidak Ada Perubahan",
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      if (isUpdated) {
        updateStudent({
          variables: {
            npm,
            fullname: studentUpdate.fullname,
            is_active: studentUpdate.is_active,
          },
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Tidak Ada Perubahan",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    }
  };

  return (
    <>
      <button
        className="bg-secondary-blue text-white hover:bg-primary-blue p-2 rounded-md"
        onClick={() => {
          setShowModal(true);
          setError("");
        }}
      >
        <BsPencilSquare size={25} />
      </button>

      {showModal && (
        <div id="modalAdd" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 mx-auto w-full max-w-xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Mahasiswa {npm}</h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="large-modal"
                >
                  <FaRegWindowClose id="cancel" className="w-8 dark:text-white text-primary-blue" size={25} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <form onSubmit={handleUpdate}>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="fullname"
                      className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-primary-blue dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      required
                      placeholder=" "
                      autoComplete="off"
                      defaultValue={fullname}
                      onChange={handleOnChange}
                    />
                    <label
                      htmlFor="fullname"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Fullname
                    </label>
                    <p className="text-red-500">{error}</p>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      defaultValue={is_active}
                      name="is_active"
                      onChange={handleOnChange}
                      className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value={is_active} disabled>
                        Status Mahasiswa Saat ini : {is_active === true ? "Aktif" : "Tidak Aktif"}
                      </option>
                      <option value={!is_active}>{!is_active === true ? "Aktifkan" : "Tidak Aktifkan"}</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button type="submit" className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                      {loading ? <LoadingAnimation /> : "Update"}
                    </button>
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

export default UpdateModal;
