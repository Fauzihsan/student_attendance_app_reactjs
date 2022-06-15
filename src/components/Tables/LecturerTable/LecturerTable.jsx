import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DELETE_LECTURER } from "../../../api/Model/Mutation/Delete/DeleteLecturer";
import { DELETE_USER } from "../../../api/Model/Mutation/Delete/DeleteUser";
import { GET_LECTURERS } from "../../../api/Model/Subscription/GetLecturers";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import LoadingAnimationXL from "../../LoadingAnimation/LoadingAnimationXL";
import UpdateLecturerModal from "../../ModalUpdate/UpdateLecturerModal";
import { useMutation, useSubscription } from "@apollo/client";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModal from "../../ModalDelete/DeleteModal";
import { GET_LECTURERS_SEARCH } from "../../../api/Model/Subscription/GetSearchLecturers";

function LecturerTable() {
  const search = useSelector((state) => state.search.value);
  const { data: dataLecturers, loading: fetchLecturers } = useSubscription(GET_LECTURERS);
  const { data: dataLecturerSearch, loading: fetchSearch } = useSubscription(GET_LECTURERS_SEARCH, {
    variables: {
      nidn: search,
    },
  });

  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    !fetchLecturers &&
      dataLecturers?.lecturers.forEach((lecturer) => {
        setData((data) => [...data, { nidn: lecturer.nidn, fullname: lecturer.fullname, address: lecturer.address, phone_number: lecturer.phone_number, email: lecturer.email, is_checked: false }]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLecturers?.lecturers]);

  const handleChange = (e) => {
    setData(
      [...data].map((obj) => {
        if (obj.nidn === e.target.value) {
          return {
            ...obj,
            is_checked: !obj.is_checked,
          };
        } else {
          return obj;
        }
      })
    );
  };

  //DELETE MULTIPLE DATA
  const [showModal, setShowModal] = useState(false);
  const [deleteLecturer, { loading: loadingDelete }] = useMutation(DELETE_LECTURER, {
    onCompleted: () => {
      setShowModal(false);
      setData([]);
      setFinishDelete(true);
    },
  });

  const [deleteUser] = useMutation(DELETE_USER);
  const [finishDelete, setFinishDelete] = useState(false);
  const handleDeleteLecturer = () => {
    data.forEach((lecturer) => {
      if (lecturer.is_checked) {
        deleteLecturer({
          variables: {
            nidn: lecturer.nidn,
          },
        });
        deleteUser({
          variables: {
            username: lecturer.nidn,
          },
        });
      }
    });
  };

  return (
    <>
      {finishDelete && (
        <div id="modal-delete" tabIndex="-1" className="flex items-center overflow-y-auto overflow-x-hidden fixed right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
          <div className="relative mx-auto p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setFinishDelete(false)}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <div className="p-6 text-center">
                <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Selesai</h3>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setFinishDelete(false)}
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative h-80 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-primary-white2 dark:bg-primary-black dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  {data.filter((d) => d.is_checked === true).length !== 0 ? (
                    <button
                      onClick={() => {
                        setShowModal(true);
                      }}
                      className="text-red-600"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  ) : (
                    []
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                NIDN
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Nomor Telepon
              </th>
              <th scope="col" className="px-6 py-3">
                Alamat
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchLecturers || fetchSearch ? (
              <tr>
                <td colSpan={6} rowSpan={6}>
                  <LoadingAnimationXL />
                </td>
              </tr>
            ) : search === "" ? (
              data.length !== 0 ? (
                data.map((lecturer) => (
                  <tr key={lecturer.nidn} className="dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-primary-white2 dark:hover:bg-gray-700">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          defaultChecked={lecturer.is_checked}
                          value={lecturer.nidn}
                          onChange={handleChange}
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-table-search-1" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4">{lecturer.nidn}</td>
                    <td className="px-6 py-4">{lecturer.fullname}</td>
                    <td className="px-6 py-4">{lecturer.email}</td>
                    <td className="px-6 py-4">{lecturer.phone_number}</td>
                    <td className="px-6 py-4">{lecturer.address}</td>
                    <td className="flex flex-row justify-center gap-x-1 pt-2">
                      <UpdateLecturerModal data={lecturer} />
                      <DeleteModal data={lecturer} type={"lecturer"} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <p className="text-center py-3">Data Dosen Kosong</p>
                  </td>
                </tr>
              )
            ) : dataLecturerSearch?.lecturers.length !== 0 ? (
              dataLecturerSearch?.lecturers.map((lecturer) => (
                <tr key={lecturer.nidn} className="dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-primary-white2 dark:hover:bg-gray-700">
                  <td className="w-4 p-4"></td>
                  <td className="px-6 py-4">{lecturer.nidn}</td>
                  <td className="px-6 py-4">{lecturer.fullname}</td>
                  <td className="px-6 py-4">{lecturer.email}</td>
                  <td className="px-6 py-4">{lecturer.phone_number}</td>
                  <td className="px-6 py-4">{lecturer.address}</td>
                  <td className="flex flex-row justify-center gap-x-1 pt-2">
                    <UpdateLecturerModal data={lecturer} />
                    <DeleteModal data={lecturer} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <p className="text-center py-3">NIDN TIDAK DITEMUKAN</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div id="modal-delete" tabIndex="-1" className="flex items-center overflow-y-auto overflow-x-hidden fixed right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
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
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Anda yakin ingin menghapus sejumlah
                  <br />
                  <b>{data.filter((d) => d.is_checked === true).length} Dosen</b>
                </h3>
                <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleDeleteLecturer}>
                  {loadingDelete ? <LoadingAnimation /> : "Hapus"}
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

export default LecturerTable;
