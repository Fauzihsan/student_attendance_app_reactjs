import React from "react";
import { GET_COURSES } from "../../../api/Model/Subscription/GetCourses";
import ModalUpdateCourse from "../../Modal/ModalUpdate/ModalUpdateCourse";
import ModalDelete from "../../Modal/ModalDelete/";
import { useSubscription } from "@apollo/client";
import LoadingAnimationXL from "../../Loading/LoadingAnimationXL";

function CourseTable() {
  const { data: dataCourse, loading } = useSubscription(GET_COURSES);
  return (
    <>
      <div className="relative h-80 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-primary-white2 dark:bg-primary-black dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Mata Kuliah
              </th>
              <th scope="col" className="px-6 py-3">
                SKS
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} rowSpan={6}>
                  <LoadingAnimationXL />
                </td>
              </tr>
            ) : dataCourse?.courses.length !== 0 ? (
              dataCourse?.courses.map((d) => (
                <tr key={d.course_id} className="dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-primary-white2 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">{d.course_id}</td>
                  <td className="px-6 py-4">{d.course_name}</td>
                  <td className="px-6 py-4">{d.sks}</td>
                  <td className="flex flex-row justify-center gap-x-1 pt-2">
                    <ModalUpdateCourse data={d} />
                    <ModalDelete data={d} type={"course"} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <p className="text-center py-3">BELUM ADA MATA KULIAH</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CourseTable;
