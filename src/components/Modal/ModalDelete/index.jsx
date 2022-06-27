import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { DELETE_STUDENT } from "../../../api/Model/Mutation/Delete/DeleteStudent";
import { DELETE_USER } from "../../../api/Model/Mutation/Delete/DeleteUser";
import { AiOutlineDelete } from "react-icons/ai";
import LoadingAnimation from "../../Loading/LoadingAnimation";
import { DELETE_LECTURER } from "../../../api/Model/Mutation/Delete/DeleteLecturer";
import { DELETE_CLASS_NAME } from "../../../api/Model/Mutation/Delete/DeleteClassName";
import { DELETE_COURSE } from "../../../api/Model/Mutation/Delete/DeleteCourse";
import { DELETE_SCHEDULE } from "../../../api/Model/Mutation/Delete/DeleteSchedule";

function ModalDelete({ data, type }) {
  const [showModal, setShowModal] = useState(false);

  const [studentDelete, setStudentDelete] = useState({ npm: "", fullname: "" });
  const [lecturerDelete, setLecturerDelete] = useState({ nidn: "", fullname: "" });
  const [classNameDelete, setClassNameDelete] = useState({ id: "", class_name: "" });
  const [courseDelete, setCourseDelete] = useState({ course_id: "", course_name: "" });
  const [scheduleDelete, setScheduleDelete] = useState({ id: "", class_name: "", course_name: "" });

  const [deleteStudent, { loading: loadingDeleteStudent }] = useMutation(DELETE_STUDENT, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Mahasiswa Berhasil Dihapus",
        showConfirmButton: false,
        timer: 1200,
      });

      setShowModal(false);
      setStudentDelete("");
    },
  });

  const [deleteLecturer, { loading: loadingDeleteLecturer }] = useMutation(DELETE_LECTURER, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Dosen Berhasil Dihapus",
        showConfirmButton: false,
        timer: 1200,
      });

      setShowModal(false);
      setLecturerDelete("");
    },
  });
  const [deleteClassName, { loading: loadingDeleteClassName }] = useMutation(DELETE_CLASS_NAME, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Kelas Berhasil Dihapus",
        showConfirmButton: false,
        timer: 1200,
      });

      setShowModal(false);
      setClassNameDelete("");
    },
  });
  const [deleteCourse, { loading: loadingDeleteCourse }] = useMutation(DELETE_COURSE, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Mata Kuliah Berhasil Dihapus",
        showConfirmButton: false,
        timer: 1200,
      });

      setShowModal(false);
      setCourseDelete("");
    },
  });
  const [deleteSchedule, { loading: loadingDeleteSchedule }] = useMutation(DELETE_SCHEDULE, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Jadwal & Absensi Berhasil Dihapus",
        showConfirmButton: false,
        timer: 1200,
      });

      setShowModal(false);
      setScheduleDelete("");
    },
  });

  const [deleteUser] = useMutation(DELETE_USER);

  const handleDelete = () => {
    if (type === "student") {
      deleteStudent({
        variables: {
          npm: studentDelete.npm,
        },
      });
      deleteUser({
        variables: {
          username: studentDelete.npm,
        },
      });
    } else if (type === "lecturer") {
      deleteLecturer({
        variables: {
          nidn: lecturerDelete.nidn,
        },
      });
      deleteUser({
        variables: {
          username: lecturerDelete.nidn,
        },
      });
    } else if (type === "class") {
      deleteClassName({
        variables: {
          id: classNameDelete.id,
        },
      });
    } else if (type === "course") {
      deleteCourse({
        variables: {
          course_id: courseDelete.course_id,
        },
      });
    } else if (type === "schedule") {
      deleteSchedule({
        variables: {
          id: scheduleDelete.id,
        },
      });
    }
  };

  const assignValue = () => {
    setShowModal(true);
    if (type === "student") {
      setStudentDelete({ ...studentDelete, npm: data.npm, fullname: data.fullname });
    } else if (type === "lecturer") {
      setLecturerDelete({ ...lecturerDelete, nidn: data.nidn, fullname: data.fullname });
    } else if (type === "class") {
      setClassNameDelete({ ...classNameDelete, id: data.id, class_name: data.class_name });
    } else if (type === "course") {
      setCourseDelete({ ...courseDelete, course_id: data.course_id, course_name: data.course_name });
    } else if (type === "schedule") {
      setScheduleDelete({ ...scheduleDelete, id: data.id, class_name: data.class.class_name, course_name: data.course.course_name });
    }
  };
  return (
    <>
      <button onClick={assignValue} className="bg-secondary-red text-white hover:bg-red-800 p-2 rounded-md">
        <AiOutlineDelete size={25} />
      </button>
      {showModal && (
        <div id="modal-delete" tabIndex="-1" className="flex items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
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
                {type === "student" ? (
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Anda yakin ingin menghapus Mahasiswa <br /> <b>{studentDelete.fullname}</b>
                  </h3>
                ) : type === "lecturer" ? (
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Anda yakin ingin menghapus Dosen <br /> <b>{lecturerDelete.fullname}</b>
                  </h3>
                ) : type === "class" ? (
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Anda yakin ingin menghapus Kelas <br /> <b>{classNameDelete.class_name}</b>
                  </h3>
                ) : type === "course" ? (
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Anda yakin ingin menghapus Mata Kuliah <br /> <b>{courseDelete.course_name}</b>
                  </h3>
                ) : (
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Anda yakin ingin menghapus Jadwal & Absensi untuk Kelas <br />{" "}
                    <b>
                      {scheduleDelete.class_name} - {scheduleDelete.course_name}
                    </b>
                  </h3>
                )}
                <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleDelete}>
                  {loadingDeleteStudent || loadingDeleteLecturer || loadingDeleteClassName || loadingDeleteCourse || loadingDeleteSchedule ? <LoadingAnimation /> : "Hapus"}
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
    </>
  );
}

export default ModalDelete;
