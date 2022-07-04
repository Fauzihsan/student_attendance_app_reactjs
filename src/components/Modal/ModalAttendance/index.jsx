import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { AiOutlineGroup } from "react-icons/ai";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_MEET_NUMBER } from "../../../api/Model/Mutation/Update/UpdateMeetNumber";
import { FILTER_MEET_NUMBER } from "../../../redux/filterSlice";
import { MODAL_IS_PRESENT } from "../../../redux/modalSlice";
import FilterMeetNumber from "../../FilterMeetNumber";
import HeaderAttendance from "../../HeaderAttendance";
import LoadingAnimation from "../../Loading/LoadingAnimation";
import AttendanceTable from "../../Tables/AttendanceTable";

function ModalAttendance({ data, role }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const isPresent = useSelector((state) => state.modal.isPresent);

  const [confirmCloseAttendance, setConfirmCloseAttendance] = useState(false);
  const [updateMeetNumber, { loading: loadingMeetNumber }] = useMutation(UPDATE_MEET_NUMBER, {
    variables: {
      meet_number: parseInt(data.meet_number) + 1,
      id: data.id,
    },
  });

  const INITIAL_VALUE = {
    id: "",
    class_name: "",
  };

  const [assignValue, setAssignValue] = useState(INITIAL_VALUE);

  return (
    <>
      {role === "lecturer" ? (
        data.meet_number !== 14 ? (
          <button
            onClick={() => {
              setAssignValue({ ...assignValue, id: data.id, class_name: data.class.class_name, course_name: data.course.course_name, meet_number: data.meet_number + 1 });
              setShowModal(true);
            }}
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-primary-blue rounded-lg hover:bg-secondary-blue focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary-blue dark:hover:bg-secondary-blue dark:focus:ring-blue-800"
          >
            Absen
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        ) : (
          <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-primary-blue rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary-blue dark:focus:ring-blue-800">
            Pertemuan Habis
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        )
      ) : (
        <button
          onClick={() => {
            setAssignValue({ ...assignValue, id: data.id, class_name: data.class.class_name, course_name: data.course.course_name });
            setShowModal(true);
          }}
          className="bg-primary-blue text-white hover:bg-secondary-blue p-2 rounded-md"
        >
          <AiOutlineGroup size={25} />
        </button>
      )}
      {showModal && (
        <div id="modalAddStudenttoClass" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 mx-auto w-full max-w-6xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Absensi {assignValue.course_name} - {assignValue.class_name}
                </h3>
                {role === "lecturer" && isPresent ? (
                  <button
                    onClick={() => {
                      setConfirmCloseAttendance(true);
                    }}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="large-modal"
                  >
                    <FaRegWindowClose id="cancel" className="w-8 dark:text-white text-primary-blue" size={25} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowModal(false);
                      dispatch(FILTER_MEET_NUMBER("1"));
                    }}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="large-modal"
                  >
                    <FaRegWindowClose id="cancel" className="w-8 dark:text-white text-primary-blue" size={25} />
                  </button>
                )}
              </div>
              {data.meet_number !== 15 ? (
                <>
                  <div className="flex px-6 py-2 justify-start">{role === "lecturer" ? <HeaderAttendance meet={assignValue.meet_number} schedule_data={data} /> : <FilterMeetNumber />}</div>
                  <div className="p-6">
                    <AttendanceTable role={role} schedule_data={assignValue} />
                  </div>
                </>
              ) : (
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">PERTEMUAN HABIS</p>
              )}
            </div>
          </div>
        </div>
      )}
      {confirmCloseAttendance && (
        <div id="modal-delete" tabIndex="-1" className="flex items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
          <div className="relative mx-auto p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setConfirmCloseAttendance(false)}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <div className="p-6 text-center">
                <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>

                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Anda yakin ingin menyelesaikan Absensi pertemuan {data.meet_number + 1} ?
                  <br />
                </h3>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={() => {
                    dispatch(MODAL_IS_PRESENT(false));
                    setConfirmCloseAttendance(false);
                    setShowModal(false);
                    data.meet_number !== 14 && updateMeetNumber();
                  }}
                >
                  {loadingMeetNumber ? <LoadingAnimation /> : "Selesai"}
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setConfirmCloseAttendance(false)}
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

export default ModalAttendance;
