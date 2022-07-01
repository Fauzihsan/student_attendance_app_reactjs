import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FILTER_MEET_NUMBER } from "../../../redux/filterSlice";
import { AUTH } from "../../../utils/helpers/AuthCookies";
import PresentTable from "../../Tables/PresentTable";

function ModalSeeAttendance({ data, npm }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-primary-blue rounded-lg hover:bg-secondary-blue focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary-blue dark:hover:bg-secondary-blue dark:focus:ring-blue-800"
      >
        Lihat Absen
        <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </button>
      {showModal && (
        <div id="modalAddStudenttoClass" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 mx-auto w-full max-w-6xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Absensi {AUTH.getFullname()} - {data.course.course_name}
                </h3>

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
              </div>
              <div className="flex flex-col px-6 py-2 justify-start">
                <PresentTable schedule_data={data} npm={npm} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalSeeAttendance;
