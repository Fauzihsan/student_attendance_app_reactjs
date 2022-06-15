import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { UPDATE_LECTURER } from "../../api/Model/Mutation/Update/UpdateLecturers";
import { UPDATE_USER } from "../../api/Model/Mutation/Update/UpdateUsers";
import Swal from "sweetalert2";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegWindowClose } from "react-icons/fa";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

function UpdateLecturerModal({ data }) {
  const { nidn, fullname, email, phone_number, address } = data;
  const [showModal, setShowModal] = useState(false);

  const INITIAL_STATE = {
    nidn,
    fullname,
    email,
    phone_number,
    address,
  };

  const [lecturerUpdate, setLecturerUpdate] = useState(INITIAL_STATE);

  const [updateUser] = useMutation(UPDATE_USER);
  const [updateLecturer, { loading }] = useMutation(UPDATE_LECTURER, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Dosen berhasil terupdate",
        showConfirmButton: false,
        timer: 1200,
      });

      setShowModal(false);
      setIsUpdated(false);
    },
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const handleOnChange = (e) => {
    const NAME = e.target.name;
    const VALUE = e.target.value;

    setLecturerUpdate({ ...lecturerUpdate, [NAME]: VALUE });
    setIsUpdated(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (lecturerUpdate.fullname === fullname && lecturerUpdate.email === email && lecturerUpdate.phone_number === phone_number && lecturerUpdate.address === address) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Tidak Ada Perubahan",
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      if (isUpdated) {
        updateLecturer({
          variables: {
            nidn,
            fullname: lecturerUpdate.fullname,
            email: lecturerUpdate.email,
            phone_number: lecturerUpdate.phone_number,
            address: lecturerUpdate.address,
          },
        });
        updateUser({
          variables: {
            username: nidn,
            password: nidn,
            fullname: lecturerUpdate.fullname,
          },
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
          setLecturerUpdate(INITIAL_STATE);
        }}
      >
        <BsPencilSquare size={25} />
      </button>

      {showModal && (
        <div id="modalAdd" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 mx-auto w-full max-w-xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Dosen {nidn}</h3>
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
                      className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      autoComplete="off"
                      defaultValue={fullname}
                      onChange={handleOnChange}
                      required
                    />
                    <label
                      htmlFor="fullname"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Fullname
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="email"
                      name="email"
                      className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      autoComplete="off"
                      defaultValue={email}
                      onChange={handleOnChange}
                      required
                    />
                    <label
                      htmlFor="email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="number"
                      name="phone_number"
                      className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      autoComplete="off"
                      defaultValue={phone_number}
                      onChange={handleOnChange}
                      required
                    />
                    <label
                      htmlFor="phone_number"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Nomor Telepon
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="address"
                      className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      autoComplete="off"
                      defaultValue={address}
                      onChange={handleOnChange}
                      required
                    />
                    <label
                      htmlFor="address"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Alamat
                    </label>
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

export default UpdateLecturerModal;
