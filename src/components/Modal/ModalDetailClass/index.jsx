import React, { useState } from "react";
import { AiOutlineGroup } from "react-icons/ai";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FILTER_MEET_NUMBER } from "../../../redux/filterSlice";
import FilterMeetNumber from "../../FilterMeetNumber";
import AttendanceTable from "../../Tables/AttendanceTable";

function ModalDetailClass({ data }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const INITIAL_VALUE = {
    id: "",
    class_name: "",
  };

  const [assignValue, setAssignValue] = useState(INITIAL_VALUE);
  return (
    <>
      <button
        onClick={() => {
          setAssignValue({ ...assignValue, id: data.id, class_name: data.class.class_name, course_name: data.course.course_name });
          setShowModal(true);
        }}
        className="bg-primary-blue text-white hover:bg-secondary-blue p-2 rounded-md"
      >
        <AiOutlineGroup size={25} />
      </button>
      {showModal && (
        <div id="modalAddStudenttoClass" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 mx-auto w-full max-w-6xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Absensi {assignValue.course_name} - {assignValue.class_name}
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
              <div className="flex px-6 justify-start">
                <FilterMeetNumber />
              </div>
              <div className="p-6">
                <AttendanceTable schedule_data={assignValue} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalDetailClass;
