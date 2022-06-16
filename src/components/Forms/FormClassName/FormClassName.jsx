import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { INSERT_CLASS_NAME } from "../../../api/Model/Mutation/Insert/InsertClassNames";
import Swal from "sweetalert2";
import { MODAL_ADD } from "../../../redux/modalSlice";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";

function FormClassName() {
  const id_prodi = useSelector((state) => state.prodi.id);
  const dispatch = useDispatch();
  const INITIAL_STATE = {
    class_name: "",
    study_programs_id: "",
  };

  const [className, setClassName] = useState(INITIAL_STATE);

  const [insertClassNames, { loading: loadingInsert }] = useMutation(INSERT_CLASS_NAME, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Kelas Berhasil Ditambahkan",
        showConfirmButton: false,
        timer: 1200,
      });

      setClassName(INITIAL_STATE);
      dispatch(MODAL_ADD(false));
    },
  });
  const handleInput = (e) => {
    e.preventDefault();
    insertClassNames({
      variables: {
        class_name: className.class_name,
        study_programs_id: id_prodi,
      },
    });
  };

  return (
    <form onSubmit={handleInput}>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="className"
          className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          autoComplete="off"
          value={className.class_name}
          onChange={(e) => {
            setClassName({ ...className, class_name: e.target.value });
          }}
          required
        />
        <label
          htmlFor="className"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Nama Kelas
        </label>
      </div>
      <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button type="submit" className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
          {loadingInsert ? <LoadingAnimation /> : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default FormClassName;
