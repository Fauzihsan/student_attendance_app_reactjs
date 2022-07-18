import React, { useState } from "react";
import { UPDATE_CLASS_NAME } from "../../../../api/Model/Mutation/Update/UpdateClassNames";
import LoadingAnimation from "../../../Loading/LoadingAnimation";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";

function ModalUpdateClassName({ data }) {
  const { id, class_name } = data;
  const [showModal, setShowModal] = useState(false);

  const INITIAL_STATE = {
    id,
    class_name,
  };

  const [classNameUpdate, setClassNameUpdate] = useState(INITIAL_STATE);

  const [updateClassName, { loading }] = useMutation(UPDATE_CLASS_NAME, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Kelas berhasil terupdate",
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

    setClassNameUpdate({ ...classNameUpdate, [NAME]: VALUE });
    setIsUpdated(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (classNameUpdate.class_name === class_name) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Tidak Ada Perubahan",
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      if (isUpdated) {
        updateClassName({
          variables: {
            id,
            class_name: classNameUpdate.class_name,
          },
        });
      }
    }
  };

  return (
    <>
      <button
        className="bg-secondary-yellow text-white hover:bg-yellow-500 p-2 rounded-md"
        onClick={() => {
          setShowModal(true);
          setClassNameUpdate(INITIAL_STATE);
        }}
      >
        <BsPencilSquare size={25} />
      </button>

      {showModal && (
        <div id="modalAdd" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 mx-auto w-full max-w-xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Nama Kelas {class_name}</h3>
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
                      name="class_name"
                      className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      autoComplete="off"
                      defaultValue={class_name}
                      onChange={handleOnChange}
                      required
                    />
                    <label
                      htmlFor="class_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Nama Kelas
                    </label>
                  </div>
                  <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button type="submit" className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                      {loading ? <LoadingAnimation /> : "Ubah"}
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

export default ModalUpdateClassName;
