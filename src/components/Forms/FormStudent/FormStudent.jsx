import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MODAL_ADD } from "../../../redux/modalSlice";
import { useMutation } from "@apollo/client";
import { INSERT_STUDENT } from "../../../api/Model/Mutation/Insert/InsertStudent";
import { INSERT_USER } from "../../../api/Model/Mutation/Insert/InsertUser";
import ImportModal from "../../ModalInsert/ImportModal";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import Swal from "sweetalert2";

function FormStudent() {
  const id_prodi = useSelector((state) => state.prodi.id);
  const dispatch = useDispatch();
  const INITIAL_STATE = {
    npm: "",
    fullname: "",
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
        timer: 1200,
      });

      setStudent(INITIAL_STATE);
      dispatch(MODAL_ADD(false));
    },
  });

  const handleInputStudent = (e) => {
    e.preventDefault();
    InsertUser({
      variables: {
        user: {
          fullname: student.fullname,
          username: student.npm,
          password: student.npm,
          roles_id: 4,
          study_programs_id: id_prodi,
        },
      },
    });
    insertStudent({
      variables: {
        student: {
          npm: student.npm,
          fullname: student.fullname,
          study_programs_id: id_prodi,
        },
      },
    });
  };
  return (
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
          {loadingInsert ? <LoadingAnimation /> : "Submit"}
        </button>
        <ImportModal />
      </div>
    </form>
  );
}

export default FormStudent;
