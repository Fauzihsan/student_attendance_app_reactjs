import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { INSERT_LECTURER } from "../../../api/Model/Mutation/Insert/InsertLectuters";
import { INSERT_USER } from "../../../api/Model/Mutation/Insert/InsertUsers";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import Swal from "sweetalert2";
import { MODAL_ADD } from "../../../redux/modalSlice";

function FormLecturer() {
  const id_prodi = useSelector((state) => state.prodi.id);
  const dispatch = useDispatch();
  const INITIAL_STATE = {
    nidn: "",
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
  };

  const [lecturer, setLecturer] = useState(INITIAL_STATE);

  const [InsertUser] = useMutation(INSERT_USER);

  const [insertLecturer, { loading: loadingInsert }] = useMutation(INSERT_LECTURER, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Dosen Berhasil Dimasukan",
        showConfirmButton: false,
        timer: 1200,
      });

      setLecturer(INITIAL_STATE);
      dispatch(MODAL_ADD(false));
    },
    onError: () => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "NIDN TELAH DIGUNAKAN,PERIKSA KEMBALI",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleInputLecturer = (e) => {
    e.preventDefault();
    InsertUser({
      variables: {
        user: {
          fullname: lecturer.fullname,
          username: lecturer.nidn,
          password: lecturer.nidn,
          roles_id: 5,
          study_programs_id: id_prodi,
        },
      },
    });
    insertLecturer({
      variables: {
        lecturer: {
          nidn: lecturer.nidn,
          fullname: lecturer.fullname,
          email: lecturer.email,
          phone_number: lecturer.phone_number,
          address: lecturer.address,
        },
      },
    });
  };
  return (
    <form onSubmit={handleInputLecturer}>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="nidn"
          className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          autoComplete="off"
          value={lecturer.nidn}
          onChange={(e) => {
            setLecturer({ ...lecturer, nidn: e.target.value });
          }}
          required
        />
        <label
          htmlFor="nidn"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          NIDN
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="fullname"
          className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          autoComplete="off"
          value={lecturer.fullname}
          onChange={(e) => {
            setLecturer({ ...lecturer, fullname: e.target.value });
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
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="email"
          className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          autoComplete="off"
          value={lecturer.email}
          onChange={(e) => {
            setLecturer({ ...lecturer, email: e.target.value });
          }}
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
          value={lecturer.phone_number}
          onChange={(e) => {
            setLecturer({ ...lecturer, phone_number: e.target.value });
          }}
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
          value={lecturer.address}
          onChange={(e) => {
            setLecturer({ ...lecturer, address: e.target.value });
          }}
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
          {loadingInsert ? <LoadingAnimation /> : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default FormLecturer;
