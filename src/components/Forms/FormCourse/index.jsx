import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { INSERT_COURSE } from "../../../api/Model/Mutation/Insert/InsertCourse";
import { MODAL_ADD } from "../../../redux/modalSlice";
import LoadingAnimation from "../../Loading/LoadingAnimation";

function FormCourse() {
  const dispatch = useDispatch();
  const INITIAL_STATE = {
    course_id: "",
    course_name: "",
    sks: "",
  };

  const [course, setCourse] = useState(INITIAL_STATE);

  const [insertCourse, { loading: loadingInsert }] = useMutation(INSERT_COURSE, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Mata Kuliah Berhasil Ditambahkan",
        showConfirmButton: false,
        timer: 1200,
      });

      setCourse(INITIAL_STATE);
      dispatch(MODAL_ADD(false));
    },
  });
  const handleInput = (e) => {
    e.preventDefault();
    insertCourse({
      variables: {
        course_id: course.course_id,
        course_name: course.course_name,
        sks: course.sks,
      },
    });
  };

  return (
    <form onSubmit={handleInput}>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="course_id"
          className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          autoComplete="off"
          value={course.course_id}
          onChange={(e) => {
            setCourse({ ...course, course_id: e.target.value });
          }}
          required
        />
        <label
          htmlFor="course_id"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Kode Mata Kuliah
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="course_name"
          className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          autoComplete="off"
          value={course.course_name}
          onChange={(e) => {
            setCourse({ ...course, course_name: e.target.value });
          }}
          required
        />
        <label
          htmlFor="course_name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Nama Mata Kuliah
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="number"
          name="sks"
          className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          autoComplete="off"
          value={course.sks}
          onChange={(e) => {
            setCourse({ ...course, sks: e.target.value });
          }}
          required
        />
        <label
          htmlFor="sks"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Jumlah SKS
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

export default FormCourse;
