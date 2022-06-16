import React from "react";
import { useSubscription } from "@apollo/client";
import { GET_CLASS_NAMES } from "../../../api/Model/Subscription/GetClassNames";
import UpdateClassNameModal from "../../Modal/ModalUpdate/UpdateClassNameModal";
import LoadingAnimationXL from "../../LoadingAnimation/LoadingAnimationXL";
import DeleteModal from "../../Modal/ModalDelete/DeleteModal";

function ClassTable() {
  const { data, loading } = useSubscription(GET_CLASS_NAMES);
  let no = 1;

  return (
    <>
      <div className="relative h-80 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-primary-white2 dark:bg-primary-black dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Kelas
              </th>
              <th scope="col" className="px-6 py-3">
                Program Studi
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
            ) : data.class_names.length !== 0 ? (
              data.class_names.map((d) => (
                <tr key={d.id} className="dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-primary-white2 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">{no++}</td>
                  <td className="px-6 py-4">{d.class_name}</td>
                  <td className="px-6 py-4">{d.study_program.study_program_name}</td>
                  <td className="flex flex-row justify-center gap-x-1 pt-2">
                    <UpdateClassNameModal data={d} />
                    <DeleteModal data={d} type={"class"} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <p className="text-center py-3">BELUM ADA KELAS</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ClassTable;
